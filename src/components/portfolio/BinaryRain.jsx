import { useEffect, useRef } from "react";

export default function BinaryRain({ active, color = "#FF3E00", speed = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const size = 16;
    let drops = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drops = Array.from({ length: Math.ceil(canvas.width / size) }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);
    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(8,8,10,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${size}px "JetBrains Mono", monospace`;
      drops.forEach((y, i) => {
        const ch = Math.random() > 0.5 ? "1" : "0";
        ctx.fillStyle = Math.random() > 0.96 ? "#E2E8F0" : color;
        ctx.fillText(ch, i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + speed;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active, color, speed]);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}