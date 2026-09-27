import * as THREE from "three";

export const CITIES = [
  { n: "Cairo", lat: 30.04, lon: 31.24 },
  { n: "New York", lat: 40.71, lon: -74.0 },
  { n: "London", lat: 51.5, lon: -0.12 },
  { n: "Moscow", lat: 55.75, lon: 37.62 },
  { n: "Beijing", lat: 39.9, lon: 116.4 },
  { n: "Tokyo", lat: 35.68, lon: 139.69 },
  { n: "São Paulo", lat: -23.55, lon: -46.63 },
  { n: "Sydney", lat: -33.87, lon: 151.21 },
  { n: "Mumbai", lat: 19.07, lon: 72.88 },
  { n: "Lagos", lat: 6.52, lon: 3.38 },
  { n: "Berlin", lat: 52.52, lon: 13.4 },
  { n: "San Francisco", lat: 37.77, lon: -122.42 },
  { n: "Dubai", lat: 25.2, lon: 55.27 },
  { n: "Singapore", lat: 1.35, lon: 103.82 },
  { n: "Toronto", lat: 43.65, lon: -79.38 },
  { n: "Seoul", lat: 37.57, lon: 126.98 },
];

export const ATTACK_TYPES = ["SQL Injection", "DDoS Flood", "Phishing Relay", "Ransomware C2", "Brute Force SSH", "Zero-Day Exploit", "Port Scan", "XSS Payload"];

export function toVec(lat, lon, r) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

// Loads a water mask (water = white) and returns a function isLand(lat, lon)
export function loadLandMask(url) {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = 720;
      c.height = 360;
      const ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const data = ctx.getImageData(0, 0, c.width, c.height).data;
      resolve((lat, lon) => {
        const x = Math.min(c.width - 1, Math.floor(((lon + 180) / 360) * c.width));
        const y = Math.min(c.height - 1, Math.floor(((90 - lat) / 180) * c.height));
        return data[(y * c.width + x) * 4] < 128;
      });
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

export function buildEarthPoints(isLand) {
  const N = 16000;
  const positions = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = ((((i * 137.508) % 360) + 360) % 360) - 180;
    if (isLand ? !isLand(lat, lon) : i % 3 !== 0) continue;
    const v = toVec(lat, lon, 1);
    positions.push(v.x, v.y, v.z);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x00f0ff, size: 0.012, transparent: true, opacity: 0.85 }));
}

export function buildGlow() {
  return new THREE.Mesh(
    new THREE.SphereGeometry(1.18, 64, 64),
    new THREE.ShaderMaterial({
      vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",
      fragmentShader: "varying vec3 vN; void main(){ float i = pow(0.62 - dot(vN, vec3(0.0,0.0,1.0)), 3.0); gl_FragColor = vec4(0.0,0.94,1.0,1.0) * i; }",
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
  );
}

export function buildArc(a, b) {
  const va = toVec(a.lat, a.lon, 1.0);
  const vb = toVec(b.lat, b.lon, 1.0);
  const lift = 1 + va.distanceTo(vb) * 0.45;
  const mid = va.clone().add(vb).normalize().multiplyScalar(lift);
  const pts = new THREE.QuadraticBezierCurve3(va, mid, vb).getPoints(64);
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  geo.setDrawRange(0, 0);
  const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: 0xff3e00, transparent: true, opacity: 0.95 }));
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.01, 0.022, 32),
    new THREE.MeshBasicMaterial({ color: 0xff3e00, transparent: true, side: THREE.DoubleSide })
  );
  ring.position.copy(toVec(b.lat, b.lon, 1.002));
  ring.lookAt(0, 0, 0);
  ring.visible = false;
  return { line, ring, t: 0 };
}