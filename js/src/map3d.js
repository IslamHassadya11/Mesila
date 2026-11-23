// Mesila 3D campus map. Bundled by esbuild into js/map3d.js (npm run build:3d) and loaded only when the 3D map opens.
// The app passes everything in projected map units (1 unit ≈ 1 km): x grows east, y grows south.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export function supported() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}

const LAND_H = 4;          // thickness of the country slab
const COL_MIN = 2, COL_MAX = 38;

export function create(el, o) {
  const CX = o.center[0], CY = o.center[1];
  const W = (x) => x - CX, Z = (y) => y - CY;
  let colors = o.colors, raf = 0, alive = true, selId = o.sel || null, hovId = null, t0 = performance.now();
  const reduced = !!o.reduced;

  // renderer, scene, camera
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.tabIndex = 0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', o.label || '3D map of campuses');
  const wrap = document.createElement('div'); wrap.className = 'm3';
  const labels = document.createElement('div'); labels.className = 'm3l';
  wrap.appendChild(renderer.domElement); wrap.appendChild(labels); el.appendChild(wrap);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 1, 4000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08;
  controls.maxPolarAngle = 1.34; controls.minDistance = 25; controls.maxDistance = 1100;
  controls.screenSpacePanning = false;
  controls.listenToKeyEvents(renderer.domElement);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x111122, 0.7); scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xffffff, 1.25); sun.position.set(-160, 320, 200); scene.add(sun);
  scene.add(new THREE.AmbientLight(0xffffff, 0.22));

  // land: the outline extruded into a slab, with a neon tube along the coast and border
  const shape = new THREE.Shape(o.outline.map(([x, y]) => new THREE.Vector2(W(x), -Z(y))));
  const landGeo = new THREE.ExtrudeGeometry(shape, { depth: LAND_H, bevelEnabled: false });
  landGeo.rotateX(-Math.PI / 2);
  const landTop = new THREE.MeshStandardMaterial({ roughness: 0.82, metalness: 0.12 });
  const landSide = new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.2 });
  const land = new THREE.Mesh(landGeo, [landTop, landSide]); scene.add(land);
  const edgePts = o.outline.map(([x, y]) => new THREE.Vector3(W(x), LAND_H + 0.05, Z(y)));
  const edgeCurve = new THREE.CatmullRomCurve3(edgePts, true, 'centripetal', 0.2);
  const edgeMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const edge = new THREE.Mesh(new THREE.TubeGeometry(edgeCurve, 420, 0.42, 6, true), edgeMat); scene.add(edge);

  // a floor grid out to the horizon
  let grid = null;
  function makeGrid() {
    if (grid) { scene.remove(grid); grid.geometry.dispose(); grid.material.dispose(); }
    grid = new THREE.GridHelper(2400, 120, new THREE.Color(colors.a1), new THREE.Color(colors.a2));
    grid.position.y = -0.6; grid.material.transparent = true; grid.material.opacity = colors.dark ? 0.16 : 0.22;
    grid.material.depthWrite = false; scene.add(grid);
  }

  // campus columns: height = programs open to the student there
  const max = Math.max(1, ...o.places.map((p) => p.value));
  const pick = [], cols = {};
  const colGroup = new THREE.Group(); scene.add(colGroup);
  for (const p of o.places) {
    const h = COL_MIN + (COL_MAX - COL_MIN) * (p.value / max);
    const uni = p.type === 'uni';
    const geo = uni ? new THREE.BoxGeometry(3.6, h, 3.6) : new THREE.CylinderGeometry(1.35, 1.35, h, 24);
    const c = new THREE.Color(p.color);
    const mat = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.55, roughness: 0.35, metalness: 0.25 });
    const m = new THREE.Mesh(geo, mat); m.position.set(W(p.x), LAND_H + h / 2, Z(p.y)); m.userData.id = p.id;
    const capGeo = uni ? new THREE.BoxGeometry(3.9, 0.6, 3.9) : new THREE.CylinderGeometry(1.55, 1.55, 0.6, 24);
    const capMat = new THREE.MeshBasicMaterial({ color: c.clone().lerp(new THREE.Color('#ffffff'), 0.35), toneMapped: false });
    const cap = new THREE.Mesh(capGeo, capMat); cap.position.set(W(p.x), LAND_H + h + 0.3, Z(p.y)); cap.userData.id = p.id;
    colGroup.add(m); colGroup.add(cap); pick.push(m, cap);
    cols[p.id] = { p, m, cap, h, mat, capMat, base: c };
  }

  // the selected campus gets a ring; home gets a beacon; a light travels the route between them
  const ringMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9, side: THREE.DoubleSide, toneMapped: false });
  const ring = new THREE.Mesh(new THREE.RingGeometry(3.6, 4.6, 64), ringMat); ring.rotation.x = -Math.PI / 2; ring.visible = false; scene.add(ring);
  const hx = W(o.home.x), hz = Z(o.home.y);
  const beaconMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 60, 12, 1, true), beaconMat); beacon.position.set(hx, LAND_H + 30, hz); scene.add(beacon);
  const homeRingMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.8, side: THREE.DoubleSide, toneMapped: false });
  const homeRing = new THREE.Mesh(new THREE.RingGeometry(2.2, 3, 48), homeRingMat); homeRing.rotation.x = -Math.PI / 2; homeRing.position.set(hx, LAND_H + 0.12, hz); scene.add(homeRing);
  const homeDot = new THREE.Mesh(new THREE.SphereGeometry(1.2, 20, 14), beaconMat.clone()); homeDot.material.opacity = 1; homeDot.position.set(hx, LAND_H + 1.2, hz); scene.add(homeDot);

  const routes = new THREE.Group(); scene.add(routes);
  const trainMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const train = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 12), trainMat); train.visible = false; scene.add(train);
  let selCurve = null;
  function arc(a, b, lift) {
    const mid = a.clone().add(b).multiplyScalar(0.5); mid.y += lift;
    return new THREE.QuadraticBezierCurve3(a, mid, b);
  }
  function drawRoutes() {
    routes.children.forEach((m) => { m.geometry.dispose(); m.material.dispose(); });
    routes.clear(); selCurve = null;
    const home = new THREE.Vector3(hx, LAND_H + 1, hz);
    const near = o.places.map((p) => ({ p, d: Math.hypot(W(p.x) - hx, Z(p.y) - hz) })).sort((a, b) => a.d - b.d).slice(0, 4);
    const ids = new Set(near.map((n) => n.p.id)); if (selId && cols[selId]) ids.add(selId);
    for (const id of ids) {
      const c = cols[id]; if (!c) continue;
      const end = new THREE.Vector3(W(c.p.x), LAND_H + 1, Z(c.p.y));
      const d = home.distanceTo(end); if (d < 1.5) continue;
      const curve = arc(home, end, 6 + d * 0.32), sel = id === selId;
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(sel ? colors.a4 : colors.a3), transparent: true, opacity: sel ? 0.95 : 0.35, toneMapped: false, depthWrite: false });
      routes.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, sel ? 0.42 : 0.22, 8, false), mat));
      if (sel) selCurve = curve;
    }
    train.visible = !!selCurve && !reduced;
  }

  // bloom
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.9, 0.55, 0.18);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // labels, projected every frame
  const tags = {};
  function tag(id, text, value, c, cls) {
    const s = document.createElement('span'); s.className = cls || ''; s.style.setProperty('--c', c);
    s.textContent = text; if (value != null) { const b = document.createElement('b'); b.textContent = value; s.appendChild(b); }
    labels.appendChild(s); tags[id] = s; return s;
  }
  for (const p of o.places) tag(p.id, p.label, p.value, p.color, p.type === 'uni' ? 'uni' : 'col');
  tag('__home', o.home.label, null, colors.a3, 'home');
  const v3 = new THREE.Vector3();
  const box = {};
  function placeLabels() {
    const w = renderer.domElement.clientWidth, h = renderer.domElement.clientHeight, dist = camera.position.distanceTo(controls.target);
    const cand = [];
    for (const id in tags) {
      const s = tags[id];
      let show, x, y, zTop, pr;
      if (id === '__home') { x = hx; y = LAND_H + 6; zTop = hz; show = true; pr = 2; }
      else {
        const c = cols[id]; x = W(c.p.x); y = LAND_H + c.h + 2.5; zTop = Z(c.p.y);
        show = id === selId || id === hovId || c.p.type === 'uni' || dist < 260;
        pr = id === selId ? 0 : id === hovId ? 1 : c.p.type === 'uni' ? 3 : 4;
        pr -= c.p.value / 10000;
      }
      v3.set(x, y, zTop).project(camera);
      if (!show || v3.z > 1 || Math.abs(v3.x) > 1.05 || Math.abs(v3.y) > 1.05) { s.style.display = 'none'; continue; }
      cand.push({ id, s, pr, px: (v3.x + 1) / 2 * w, py: (1 - v3.y) / 2 * h, z: v3.z });
    }
    cand.sort((a, b) => a.pr - b.pr);
    const placed = [];
    for (const c of cand) {
      let b = box[c.id];
      if (!b) { c.s.style.display = ''; b = box[c.id] = [c.s.offsetWidth || 60, c.s.offsetHeight || 22]; }
      const r = [c.px - b[0] / 2 - 2, c.py - b[1] - 6, c.px + b[0] / 2 + 2, c.py - 2];
      if (c.pr > 1 && placed.some((q) => r[0] < q[2] && r[2] > q[0] && r[1] < q[3] && r[3] > q[1])) { c.s.style.display = 'none'; continue; }
      placed.push(r);
      c.s.style.display = '';
      c.s.classList.toggle('sel', c.id === selId);
      c.s.style.transform = `translate(${c.px.toFixed(1)}px,${c.py.toFixed(1)}px) translate(-50%,-100%)`;
      c.s.style.zIndex = String(1000 - placed.length);
    }
  }

  // picking
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  let down = null;
  function hit(ev) {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const i = ray.intersectObjects(pick, false)[0];
    return i ? i.object.userData.id : null;
  }
  const onDown = (ev) => { down = [ev.clientX, ev.clientY]; };
  const onUp = (ev) => {
    if (!down) return; const moved = Math.hypot(ev.clientX - down[0], ev.clientY - down[1]); down = null;
    if (moved < 6) { const id = hit(ev); if (id && o.onPick) o.onPick(id); }
  };
  let mvPending = false, lastMv = null;
  const onMove = (ev) => {
    lastMv = ev; if (mvPending) return; mvPending = true;
    requestAnimationFrame(() => { mvPending = false; if (!lastMv) return; hovId = hit(lastMv); renderer.domElement.style.cursor = hovId ? 'pointer' : ''; });
  };
  renderer.domElement.addEventListener('pointerdown', onDown);
  renderer.domElement.addEventListener('pointerup', onUp);
  renderer.domElement.addEventListener('pointermove', onMove);
  renderer.domElement.addEventListener('pointerleave', () => { hovId = null; });

  // camera moves
  let fly = null;
  function viewFor(key) {
    const r = o.regions[key] || o.regions.all, tgt = new THREE.Vector3(W(r.x), 0, Z(r.y)), el = 0.95;
    return { tgt, pos: tgt.clone().add(new THREE.Vector3(r.dist * 0.18, r.dist * Math.sin(el), r.dist * Math.cos(el))) };
  }
  function flyTo(key, instant) {
    const v = viewFor(key);
    if (instant || reduced) { camera.position.copy(v.pos); controls.target.copy(v.tgt); controls.update(); return; }
    fly = { from: camera.position.clone(), fromT: controls.target.clone(), to: v.pos, toT: v.tgt, t: performance.now() };
  }

  // colours (called again whenever the theme changes)
  function restyle(c) {
    colors = c;
    scene.background = new THREE.Color(c.sea);
    scene.fog = new THREE.Fog(new THREE.Color(c.sea), 700, 1700);
    landTop.color.set(c.dark ? new THREE.Color(c.land).lerp(new THREE.Color(c.a2), 0.16) : new THREE.Color(c.land)); landTop.emissive = c.dark ? new THREE.Color(c.a1).multiplyScalar(0.05) : new THREE.Color(0, 0, 0);
    landSide.color.set(c.dark ? new THREE.Color(c.land).lerp(new THREE.Color(c.a2), 0.25) : new THREE.Color(c.land).multiplyScalar(0.9));
    landSide.emissive = new THREE.Color(c.a3).multiplyScalar(c.dark ? 0.18 : 0.04);
    edgeMat.color.set(c.coast);
    hemi.color.set(c.dark ? new THREE.Color(c.a2).lerp(new THREE.Color('#ffffff'), 0.6) : '#ffffff');
    hemi.groundColor.set(c.sea); hemi.intensity = c.dark ? 0.55 : 1.0;
    sun.intensity = c.dark ? 1.1 : 1.6;
    ringMat.color.set(c.a4); beaconMat.color.set(c.a3); homeRingMat.color.set(c.a3); homeDot.material.color.set(c.a3); trainMat.color.set(c.a4);
    for (const id in cols) cols[id].mat.emissiveIntensity = c.dark ? 0.55 : 0.12;
    const g = c.glow;                       // 0..1 from the theme's glow slider
    bloom.strength = c.dark ? 0.25 + g * 1.4 : g * 0.25;
    bloom.threshold = c.dark ? 0.14 : 0.7;
    renderer.toneMappingExposure = c.dark ? 1.0 : 1.05;
    tags.__home && tags.__home.style.setProperty('--c', c.a3);
    makeGrid(); drawRoutes();
  }

  function select(id) {
    selId = id && cols[id] ? id : null;
    for (const k in cols) cols[k].mat.emissiveIntensity = (colors.dark ? 0.55 : 0.12) * (k === selId ? 2.2 : 1);
    if (selId) { const c = cols[selId]; ring.position.set(W(c.p.x), LAND_H + 0.15, Z(c.p.y)); ring.visible = true; } else ring.visible = false;
    drawRoutes();
  }

  function resize() {
    const w = el.clientWidth || 300, h = el.clientHeight || 300;
    renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(el);

  function frame(now) {
    if (!alive) return;
    raf = requestAnimationFrame(frame);
    if (document.hidden) return;
    if (fly) {
      const k = Math.min(1, (now - fly.t) / 900), e = 1 - Math.pow(1 - k, 3);
      camera.position.lerpVectors(fly.from, fly.to, e); controls.target.lerpVectors(fly.fromT, fly.toT, e);
      if (k >= 1) fly = null;
    }
    controls.update();
    const t = (now - t0) / 1000;
    if (!reduced) {
      const s = 1 + 0.5 * ((t * 0.8) % 1); homeRing.scale.set(s, s, s); homeRingMat.opacity = 0.9 * (1 - ((t * 0.8) % 1));
      ring.rotation.z = t * 0.6;
      if (selCurve) { train.position.copy(selCurve.getPoint((t * 0.35) % 1)); }
    }
    placeLabels();
    composer.render();
  }

  restyle(colors); select(selId); resize(); flyTo(o.view || 'all', true);
  raf = requestAnimationFrame(frame);

  return {
    restyle, select, flyTo,
    dispose() {
      alive = false; cancelAnimationFrame(raf); ro.disconnect(); controls.dispose();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointermove', onMove);
      scene.traverse((m) => { if (m.geometry) m.geometry.dispose(); if (m.material) [].concat(m.material).forEach((x) => x.dispose()); });
      composer.dispose && composer.dispose(); renderer.dispose(); wrap.remove();
    },
  };
}
