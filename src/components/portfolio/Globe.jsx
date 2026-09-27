import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CITIES, ATTACK_TYPES, toVec, loadLandMask, buildEarthPoints, buildGlow, buildArc } from "./globeUtils";

const MASK = "https://unpkg.com/three-globe/example/img/earth-water.png";

export default function Globe({ onAttack, reduced }) {
  const mountRef = useRef(null);
  const cfg = useRef({ onAttack, reduced });
  cfg.current = { onAttack, reduced };

  useEffect(() => {
    const el = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.3;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    globe.rotation.x = 0.35;
    scene.add(globe, buildGlow());
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 64, 64), new THREE.MeshBasicMaterial({ color: 0x050608 })));
    CITIES.forEach((c) => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.012, 12, 12), new THREE.MeshBasicMaterial({ color: 0xff3e00 }));
      dot.position.copy(toVec(c.lat, c.lon, 1.005));
      globe.add(dot);
    });
    let disposed = false;
    loadLandMask(MASK).then((isLand) => !disposed && globe.add(buildEarthPoints(isLand)));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const attacks = [];
    let lastSpawn = 0;
    let raf;
    const loop = (time) => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const { reduced: rm, onAttack: cb } = cfg.current;
      globe.rotation.y = time * (rm ? 0.00003 : 0.00012) + window.scrollY * 0.0012;
      if (time - lastSpawn > (rm ? 2200 : 650)) {
        lastSpawn = time;
        const a = CITIES[Math.floor(Math.random() * CITIES.length)];
        let b = CITIES[Math.floor(Math.random() * CITIES.length)];
        if (a === b) b = CITIES[(CITIES.indexOf(a) + 3) % CITIES.length];
        const arc = buildArc(a, b);
        globe.add(arc.line, arc.ring);
        attacks.push(arc);
        cb?.({ from: a.n, to: b.n, type: ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)] });
      }
      for (let i = attacks.length - 1; i >= 0; i--) {
        const k = attacks[i];
        k.t += 0.012;
        const head = Math.min(65, Math.floor(k.t * 65));
        const tail = Math.max(0, Math.floor((k.t - 0.6) * 65));
        k.line.geometry.setDrawRange(tail, head - tail);
        if (k.t > 1) {
          k.ring.visible = true;
          const s = 1 + (k.t - 1) * 12;
          k.ring.scale.set(s, s, s);
          k.ring.material.opacity = Math.max(0, 1 - (k.t - 1) * 2.2);
        }
        if (k.t > 1.6) {
          globe.remove(k.line, k.ring);
          k.line.geometry.dispose();
          k.ring.geometry.dispose();
          attacks.splice(i, 1);
        }
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" aria-label="Rotating 3D globe showing simulated cyber attacks between cities" role="img" />;
}