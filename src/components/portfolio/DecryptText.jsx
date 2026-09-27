import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#01ABCDEFX$%&";

export default function DecryptText({ text, className = "", delay = 0, speed = 45, start = true }) {
  const [out, setOut] = useState(() => text.replace(/\S/g, "\u00A0"));
  const ran = useRef(false);

  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    let frame = 0;
    let iv;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        frame++;
        const revealed = Math.floor(frame / 2);
        setOut(
          text
            .split("")
            .map((c, i) => (c === " " ? " " : i < revealed ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
            .join("")
        );
        if (revealed >= text.length) clearInterval(iv);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [text, delay, speed, start]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}