"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  r: number;
};

function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}

export function NetworkField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let raf = 0;
    let running = true;

    const mouse = { x: -9999, y: -9999, active: false };
    const linkDist = 120;
    const mouseRadius = 150;

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // More dots for denser network across the full viewport
      const count = Math.min(180, Math.max(95, Math.floor((width * height) / 7200)));
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          r: 1.2 + Math.random() * 1.7
        };
      });
    }

    function onMove(event: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.active =
        mouse.x >= -60 &&
        mouse.y >= -60 &&
        mouse.x <= width + 60 &&
        mouse.y <= height + 60;
    }

    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      const dark = isDarkMode();
      const dot = dark ? "rgba(20, 184, 166, 0.8)" : "rgba(37, 99, 235, 0.7)";
      const line = dark ? "20, 184, 166" : "37, 99, 235";

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        p.vx += (p.ox - p.x) * 0.0011;
        p.vy += (p.oy - p.y) * 0.0011;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius;
            p.vx += (dx / dist) * force * 2.5;
            p.vy += (dy / dist) * force * 2.5;
          }
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * (dark ? 0.38 : 0.24);
            ctx!.strokeStyle = `rgba(${line}, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4.5);
        glow.addColorStop(0, dark ? "rgba(20,184,166,0.28)" : "rgba(37,99,235,0.22)");
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * 4.5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = dot;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      if (mouse.active) {
        for (const p of particles) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.4;
            ctx!.strokeStyle = `rgba(${line}, ${alpha})`;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }
        ctx!.fillStyle = dark ? "rgba(20,184,166,0.9)" : "rgba(37,99,235,0.85)";
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = window.requestAnimationFrame(draw);
    }

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    const themeObserver = new MutationObserver(() => {
      // theme read each frame
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
