/**
 * Hero 3D layer: a COMPASS shipping container, drawn over
 * the stage photos and choreographed along one timeline `t` (0 → stages − 1)
 * that the hero drives from scroll. Stages 0–2 show the real cars instead.
 *
 *   t 3  LOADED      container drops onto the front of the trailer chassis in the
 *   photo, a ramp folds down at the trailer's tail, the real car drives up,
 *   along the empty rear deck and in through the doors, doors close,
 *   then the spreader grips it and lifts it out of frame. During this stage the
 *   camera is solved every frame from an anchor element pinned to the photo's
 *   deck, so the container stays glued to the trailer at any screen size. Stages 4–5 continue
 *   in 2D on the photos (hanging under the crane, then lowered onto the ship).
 *
 * Everything is built from primitives and canvas textures — no model files.
 */
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type HeroScene = {
  /** Target timeline position; the scene eases towards it. */
  setTarget: (t: number) => void;
  /** Pointer position, each −0.5 → 0.5. */
  setPointer: (x: number, y: number) => void;
  setRunning: (running: boolean) => void;
  dispose: () => void;
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => {
  const c = clamp01(x);
  return c * c * (3 - 2 * c);
};
/** 0 → 1 as t moves across [a, b], eased. */
const span = (t: number, a: number, b: number) => smooth((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// Container dimensions (20 ft ISO, metres)
const CL = 6.06;
const CH = 2.59;
const CW = 2.44;
const CONTAINER_X = 6.6;
/** Trailer deck height in the Loaded photo, metres above the yard. */
const DECK = 1.38;
/** Free deck behind the container, from its doors to the trailer's rear end. */
const DECK_FREE = 2.84;
/** Ramp run from the trailer's rear end down to the ground. */
const RAMP = 2.8;
/** The Loaded photo's horizon sits this fraction of a container height above the deck. */
const HORIZON = 0.11;

/* ── Canvas textures ─────────────────────────────────────────────────── */

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function corrugate(g: CanvasRenderingContext2D, w: number, h: number, base: string, vertical = true) {
  g.fillStyle = base;
  g.fillRect(0, 0, w, h);
  const step = 22;
  const n = Math.ceil((vertical ? w : h) / step);
  for (let i = 0; i < n; i++) {
    const p = i * step;
    const grad = vertical
      ? g.createLinearGradient(p, 0, p + step, 0)
      : g.createLinearGradient(0, p, 0, p + step);
    grad.addColorStop(0, "rgba(255,255,255,0.10)");
    grad.addColorStop(0.35, "rgba(255,255,255,0.02)");
    grad.addColorStop(0.55, "rgba(0,0,0,0.28)");
    grad.addColorStop(1, "rgba(255,255,255,0.06)");
    g.fillStyle = grad;
    if (vertical) g.fillRect(p, 0, step, h);
    else g.fillRect(0, p, w, step);
  }
  // grime
  const grime = g.createLinearGradient(0, 0, 0, h);
  grime.addColorStop(0, "rgba(0,0,0,0)");
  grime.addColorStop(1, "rgba(0,0,0,0.35)");
  g.fillStyle = grime;
  g.fillRect(0, 0, w, h);
}

function drawStar(g: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  g.beginPath();
  g.moveTo(cx, cy - r);
  g.quadraticCurveTo(cx + r * 0.06, cy - r * 0.06, cx + r, cy);
  g.quadraticCurveTo(cx + r * 0.06, cy + r * 0.06, cx, cy + r);
  g.quadraticCurveTo(cx - r * 0.06, cy + r * 0.06, cx - r, cy);
  g.quadraticCurveTo(cx - r * 0.06, cy - r * 0.06, cx, cy - r);
  g.fill();
}

function brandMark(g: CanvasRenderingContext2D, x: number, y: number, size: number) {
  g.fillStyle = "rgba(232,235,240,0.9)";
  drawStar(g, x, y, size * 0.42);
  g.font = `700 ${size * 0.62}px "Saira", "Arial Black", sans-serif`;
  g.textBaseline = "middle";
  g.fillText("COMPASS", x + size * 0.62, y + size * 0.02);
  g.font = `600 ${size * 0.2}px "Barlow", Arial, sans-serif`;
  g.fillStyle = "rgba(232,235,240,0.65)";
  g.fillText("CAR EXPORT  ·  DUBAI, U.A.E", x + size * 0.66, y + size * 0.5);
}

/* ── Builders ────────────────────────────────────────────────────────── */

function buildContainer() {
  const root = new THREE.Group();

  const sideTex = canvasTexture(1536, 640, (g) => {
    corrugate(g, 1536, 640, "#27303b");
    brandMark(g, 120, 300, 260);
  });
  const backTex = canvasTexture(640, 640, (g) => corrugate(g, 640, 640, "#27303b"));
  const roofTex = canvasTexture(1536, 640, (g) => {
    corrugate(g, 1536, 640, "#2c3540", false);
    g.save();
    g.translate(768, 320);
    brandMark(g, -560, -10, 300);
    g.restore();
  });
  const doorTex = canvasTexture(512, 1024, (g) => {
    corrugate(g, 512, 1024, "#27303b", false);
    g.fillStyle = "rgba(200,205,212,0.55)";
    for (const x of [130, 380]) g.fillRect(x, 30, 14, 964);
    g.fillStyle = "rgba(0,0,0,0.4)";
    for (const y of [300, 700]) for (const x of [110, 360]) g.fillRect(x, y, 56, 22);
  });

  const outer = (map: THREE.Texture) =>
    new THREE.MeshStandardMaterial({ map, roughness: 0.62, metalness: 0.45 });
  const innerMat = new THREE.MeshStandardMaterial({ color: 0x1a1f26, roughness: 0.9, metalness: 0.2 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x3a2c22, roughness: 0.85 });
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x1b2028, roughness: 0.5, metalness: 0.6 });

  const plane = (w: number, h: number, mat: THREE.Material) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);

  // Side walls (outer branded, inner plain)
  for (const s of [1, -1]) {
    const o = plane(CL, CH, outer(sideTex));
    o.position.set(0, CH / 2, (s * CW) / 2);
    if (s < 0) o.rotation.y = Math.PI;
    root.add(o);
    const i = plane(CL, CH, innerMat);
    i.position.set(0, CH / 2, (s * CW) / 2 - s * 0.02);
    i.rotation.y = s > 0 ? Math.PI : 0;
    root.add(i);
  }
  // Closed front end (+x)
  const end = plane(CW, CH, outer(backTex));
  end.position.set(CL / 2, CH / 2, 0);
  end.rotation.y = Math.PI / 2;
  root.add(end);
  const endIn = plane(CW, CH, innerMat);
  endIn.position.set(CL / 2 - 0.02, CH / 2, 0);
  endIn.rotation.y = -Math.PI / 2;
  root.add(endIn);
  // Roof
  const roof = plane(CL, CW, outer(roofTex));
  roof.rotation.x = -Math.PI / 2;
  roof.position.y = CH;
  root.add(roof);
  const roofIn = plane(CL, CW, innerMat);
  roofIn.rotation.x = Math.PI / 2;
  roofIn.position.y = CH - 0.02;
  root.add(roofIn);
  // Floor
  const floor = plane(CL, CW, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.03;
  root.add(floor);
  const under = plane(CL, CW, frameMat);
  under.rotation.x = Math.PI / 2;
  root.add(under);

  // Frame: corner posts + rails + castings
  const post = new THREE.BoxGeometry(0.12, CH, 0.12);
  const railL = new THREE.BoxGeometry(CL, 0.12, 0.12);
  const railW = new THREE.BoxGeometry(0.12, 0.12, CW);
  const casting = new THREE.BoxGeometry(0.18, 0.12, 0.18);
  for (const x of [-CL / 2, CL / 2]) {
    for (const z of [-CW / 2, CW / 2]) {
      const p = new THREE.Mesh(post, frameMat);
      p.position.set(x, CH / 2, z);
      root.add(p);
      for (const y of [0.06, CH - 0.06]) {
        const c = new THREE.Mesh(casting, frameMat);
        c.position.set(x, y, z);
        root.add(c);
      }
    }
    for (const y of [0.06, CH - 0.06]) {
      const r = new THREE.Mesh(railW, frameMat);
      r.position.set(x, y, 0);
      root.add(r);
    }
  }
  for (const z of [-CW / 2, CW / 2]) {
    for (const y of [0.06, CH - 0.06]) {
      const r = new THREE.Mesh(railL, frameMat);
      r.position.set(0, y, z);
      root.add(r);
    }
  }

  // Doors at the −x end, hinged at the outer edges
  const doors: { pivot: THREE.Group; sign: number }[] = [];
  const doorMat = new THREE.MeshStandardMaterial({ map: doorTex, roughness: 0.6, metalness: 0.45, side: THREE.DoubleSide });
  for (const sign of [1, -1]) {
    const pivot = new THREE.Group();
    pivot.position.set(-CL / 2 - 0.02, 0, (sign * CW) / 2);
    const door = plane(CW / 2, CH, doorMat);
    door.rotation.y = -Math.PI / 2;
    door.position.set(0, CH / 2, (-sign * CW) / 4);
    pivot.add(door);
    root.add(pivot);
    doors.push({ pivot, sign });
  }

  return { root, doors };
}

function buildSpreader() {
  const g = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0xcfd3da, metalness: 0.9, roughness: 0.35 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1e232a, metalness: 0.6, roughness: 0.5 });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(CL * 0.98, 0.16, 0.22), steel);
  g.add(beam);
  for (const x of [-CL * 0.47, CL * 0.47]) {
    const cross = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, CW * 1.04), steel);
    cross.position.x = x;
    g.add(cross);
  }
  const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.36, 0.9), dark);
  head.position.y = 0.26;
  g.add(head);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x23272e, roughness: 0.5, metalness: 0.6 });
  const cableGeo = new THREE.CylinderGeometry(0.05, 0.05, 40, 8);
  cableGeo.translate(0, 20, 0);
  for (const x of [-0.45, 0.45]) {
    for (const z of [-0.32, 0.32]) {
      const c = new THREE.Mesh(cableGeo, cableMat);
      c.position.set(x, 0.4, z);
      c.rotation.z = -x * 0.03;
      g.add(c);
    }
  }
  return g;
}

/* ── Camera path ─────────────────────────────────────────────────────── */

type Key = { pos: [number, number, number]; target: [number, number, number] };
const cameraKeys: Key[] = [
  { pos: [10, 3.4, 12.5], target: [0, 0.9, 0] }, // sourced
  { pos: [0.8, 2.1, 16.5], target: [0, 0.9, 0] }, // inspected
  { pos: [-10, 5, 12], target: [0.6, 1.3, 0] }, // documented
  { pos: [CONTAINER_X, DECK + 0.3, 17], target: [CONTAINER_X, DECK, 0] }, // loaded: replaced by the photo fit when the anchor is present
  { pos: [CONTAINER_X + 8, 0.5, 23], target: [CONTAINER_X, 3.6, 0] }, // hoisted: looking up at the lift, like the crane photo
  { pos: [CONTAINER_X + 14, 9, 21], target: [CONTAINER_X, 4.4, 0] }, // shipped: container sits down among the deck stacks
];

/* ── Scene ───────────────────────────────────────────────────────────── */

export function createHeroScene(
  canvas: HTMLCanvasElement,
  options: {
    reducedMotion: boolean;
    /** Cut-out photo of the real car (transparent PNG, side profile, nose pointing left). */
    carImage?: { src: string; width: number; height: number };
    /** Element pinned over the trailer deck in the Loaded photo (the container's side face). */
    loadedAnchor?: HTMLElement | null;
  },
): HeroScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.75;

  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(6, 10, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fb7d6, 2.4);
  rim.position.set(-8, 4, -6);
  scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xcfd8e6, 0x101216, 0.6));
  // Sodium yard lights, matching the warm night photo on the Loaded stage
  const sodium = new THREE.DirectionalLight(0xffa860, 1.4);
  sodium.position.set(4, 3, 8);
  scene.add(sodium);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 300);

  // Actors
  const { root: container, doors } = buildContainer();
  const cargo = new THREE.Group();
  cargo.add(container);
  cargo.position.x = CONTAINER_X;
  scene.add(cargo);
  // Doors face the trailer's rear (+x, screen right) where the car comes from.
  const doorX = CONTAINER_X + CL / 2;

  // Loading ramp hinged at the trailer's rear end: folds down from upright to the ground.
  const rearX = doorX + DECK_FREE;
  const rampPivot = new THREE.Group();
  const rampLen = Math.hypot(RAMP, DECK);
  const rampAngle = Math.atan2(DECK, RAMP);
  const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(rampLen, 0.07, 2.1),
    new THREE.MeshStandardMaterial({ color: 0x3a4049, metalness: 0.75, roughness: 0.45 }),
  );
  ramp.position.x = rampLen / 2;
  rampPivot.add(ramp);
  rampPivot.position.set(rearX, DECK, 0);
  scene.add(rampPivot);
  /** Surface height under a point on the car's path (yard → ramp → container floor). */
  const groundAt = (x: number) =>
    x <= doorX ? DECK + 0.03 : x <= rearX ? DECK : DECK * clamp01((rearX + RAMP - x) / RAMP);

  const spreader = buildSpreader();
  cargo.add(spreader); // positioned relative to the container, so it always grips it

  // The real car: its cut-out photo on a plane that drives in through the
  // container doors. Once inside, the container walls hide it naturally.
  // Side-profile cut-out: sized by real length (a hatchback is ~4.6 m), height follows.
  const carLengthM = 4.6;
  let carPlane: THREE.Mesh | null = null;
  let carLength = 0;
  if (options.carImage) {
    const { src, width, height } = options.carImage;
    const carHeight = carLengthM * (height / width);
    carLength = carLengthM;
    const geo = new THREE.PlaneGeometry(carLengthM, carHeight);
    geo.translate(0, carHeight / 2, 0);
    const mat = new THREE.MeshBasicMaterial({
      transparent: true,
      alphaTest: 0.04,
      color: 0xe2d8cc, // sit the photo into the warm night scene
      side: THREE.DoubleSide,
    });
    new THREE.TextureLoader().load(src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      mat.map = tex;
      mat.needsUpdate = true;
    });
    carPlane = new THREE.Mesh(geo, mat);
    carPlane.position.z = 0.25;
    carPlane.visible = false;
    scene.add(carPlane);
  }


  // State
  let target = 0;
  let t = 0;
  let px = 0;
  let py = 0;
  let spx = 0;
  let spy = 0;
  let running = true;
  let frame = 0;
  let last = performance.now();
  const tmpPos = new THREE.Vector3();
  const tmpTarget = new THREE.Vector3();
  const loadedKey: Key = { pos: [...cameraKeys[3].pos], target: [...cameraKeys[3].target] };
  const keys = cameraKeys.slice();

  /**
   * Solves the camera so the container's front face lands exactly on the
   * anchor's rectangle (deck edge, length) with the photo's horizon — the
   * anchor moves with the photo, so this tracks its crop, zoom and offsets.
   */
  function fitLoaded() {
    const el = options.loadedAnchor;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const c = canvas.getBoundingClientRect();
    if (!r.width || !c.width || !c.height) return;
    const v = camera.view;
    const ppx = v?.enabled ? v.fullWidth / 2 - v.offsetX : c.width / 2;
    const ppy = v?.enabled ? v.fullHeight / 2 - v.offsetY : c.height / 2;
    const f = c.height / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const deckY = r.bottom - c.top;
    const horizonY = deckY - r.height * HORIZON;
    const centerX = (r.left + r.right) / 2 - c.left;
    const pitch = Math.atan((ppy - horizonY) / f); // looking down by this much
    const below = pitch + Math.atan((deckY - ppy) / f); // deck edge, below the horizontal
    const axis = (f * CL) / r.width; // depth of the deck edge along the view axis
    const dist = (axis * Math.cos(below)) / Math.cos(below - pitch);
    const eyeY = DECK + dist * Math.tan(below);
    const camX = CONTAINER_X - ((centerX - ppx) * axis) / f;
    const camZ = dist + CW / 2;
    loadedKey.pos = [camX, eyeY, camZ];
    loadedKey.target = [camX, eyeY - camZ * Math.tan(pitch), 0];
    keys[3] = loadedKey;
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Frame the action away from the copy: right on wide screens, up on narrow.
    if (w >= 1024) camera.setViewOffset(w, h, -w * 0.17, h * 0.02, w, h);
    else if (w >= 640) camera.setViewOffset(w, h, 0, h * 0.18, w, h);
    else camera.setViewOffset(w, h, 0, h * 0.27, w, h);
    camera.fov = w >= 1024 ? 30 : w >= 640 ? 40 : 50;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  function update() {
    if (t > 1.9 && t < 4.1) fitLoaded();
    const k = Math.min(keys.length - 1, Math.floor(t));
    // Arrive on the trailer before the container lands; hold until it lifts.
    const f = k === 2 ? span(t, 2, 2.5) : k === 3 ? span(t, 3.5, 4) : smooth(t - k);
    const a = keys[k];
    const b = keys[Math.min(keys.length - 1, k + 1)];
    tmpPos.set(lerp(a.pos[0], b.pos[0], f), lerp(a.pos[1], b.pos[1], f), lerp(a.pos[2], b.pos[2], f));
    tmpTarget.set(
      lerp(a.target[0], b.target[0], f),
      lerp(a.target[1], b.target[1], f),
      lerp(a.target[2], b.target[2], f),
    );
    // Pointer steer — off while the container sits on the (static) photo
    const free = 1 - span(t, 2.25, 2.5) * (1 - span(t, 3.5, 3.75));
    tmpPos.x += spx * 1.2 * free;
    tmpPos.y += -spy * 0.8 * free;
    camera.position.copy(tmpPos);
    camera.lookAt(tmpTarget);

    // Lifted straight up and out of frame before the Hoisted photo takes over.
    const lift = span(t, 3.52, 3.85);
    const cargoY = lift * 18;

    // Container: lowered onto the trailer, doors open then close, hoisted.
    const arrive = span(t, 2.05, 2.55);
    cargo.position.y = DECK + (1 - arrive) * 9 + cargoY;
    cargo.rotation.y = Math.PI + lift * 0.3;
    cargo.visible = arrive > 0.001 && lift < 0.99;
    const doorOpen = span(t, 2.35, 2.65) * (1 - span(t, 3.32, 3.46));

    // Ramp folds down once the doors are open, and back up before they close.
    const rampDown = span(t, 2.5, 2.68) * (1 - span(t, 3.28, 3.4));
    rampPivot.visible = cargo.visible && doorOpen > 0.02;
    rampPivot.rotation.z = lerp(Math.PI / 2, -rampAngle, rampDown);

    // Real car rolls in from the right, up the ramp, along the deck and inside.
    // At rest on this stage (t = 3) its nose is inside, the rest still on the deck.
    if (carPlane) {
      const appear = span(t, 2.55, 2.75);
      const drive = span(t, 2.5, 3.3);
      const x = lerp(rearX + RAMP + 2.5, CONTAINER_X - 0.6, drive);
      const half = carLength * 0.3; // roughly half the wheelbase
      const front = groundAt(x - half);
      const rear = groundAt(x + half);
      carPlane.position.x = x;
      carPlane.position.y = (front + rear) / 2 + Math.sin(drive * Math.PI * 6) * 0.015;
      carPlane.rotation.z = -Math.atan2(front - rear, half * 2);
      const mat = carPlane.material as THREE.MeshBasicMaterial;
      mat.opacity = appear;
      carPlane.visible = appear > 0.01 && t < 3.5;
    }
    doors.forEach(({ pivot, sign }) => (pivot.rotation.y = sign * doorOpen * 2.75));

    // Spreader comes down onto the container, lifts it, then leaves.
    const attach = span(t, 3.38, 3.52);
    spreader.visible = attach > 0.001;
    spreader.position.set(0, CH + 0.08 + (1 - attach) * 10, 0);
  }

  function loop() {
    frame = requestAnimationFrame(loop);
    if (!running) return;
    const now = performance.now();
    // Frame-rate independent easing towards the scroll target.
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const ease = options.reducedMotion ? 1 : 1 - Math.exp(-dt * 4.5);
    t += (target - t) * ease;
    const steer = 1 - Math.exp(-dt * 3.5);
    spx += (px - spx) * steer;
    spy += (py - spy) * steer;
    update();
    renderer.render(scene, camera);
  }
  loop();

  return {
    setTarget: (v) => (target = v),
    setPointer: (x, y) => {
      if (options.reducedMotion) return;
      px = x;
      py = y;
    },
    setRunning: (r) => {
      running = r;
      last = performance.now();
    },
    dispose: () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mats = mesh.material ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
        mats.forEach((m) => {
          for (const v of Object.values(m)) if (v instanceof THREE.Texture) v.dispose();
          m.dispose();
        });
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
