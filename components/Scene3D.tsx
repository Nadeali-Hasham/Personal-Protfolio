"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Grid,
  Points,
  PointMaterial,
  Stars,
  Text3D,
  Sparkles,
} from "@react-three/drei";
import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import helvetikerBold from "three/examples/fonts/helvetiker_bold.typeface.json";

type SceneVariant =
  | "hero"
  | "about"
  | "experience"
  | "work"
  | "services"
  | "testimonials"
  | "contact"
  | "footer";

const labels: Record<SceneVariant, string> = {
  hero: "NAH",
  about: "ABOUT",
  experience: "CODE",
  work: "WORK",
  services: "SERVICES",
  testimonials: "TRUST",
  contact: "CONTACT",
  footer: "NAH",
};

const colors: Record<SceneVariant, [string, string, string]> = {
  hero: ["#14b8a6", "#2563eb", "#b7791f"],
  about: ["#14b8a6", "#b7791f", "#2563eb"],
  experience: ["#2563eb", "#14b8a6", "#f8fafc"],
  work: ["#7c3aed", "#14b8a6", "#b7791f"],
  services: ["#2563eb", "#14b8a6", "#b7791f"],
  testimonials: ["#b7791f", "#2563eb", "#14b8a6"],
  contact: ["#14b8a6", "#2563eb", "#f8fafc"],
  footer: ["#14b8a6", "#b7791f", "#2563eb"],
};

const extrudedFont = helvetikerBold as unknown as string;

function ParticleField({
  count,
  radius,
  color,
}: {
  count: number;
  radius: number;
  color: string;
}) {
  const positions = useMemo(() => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      points[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.52;
      points[i * 3 + 2] = r * Math.cos(phi);
    }
    return points;
  }, [count, radius]);
  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.07;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        color={color}
        transparent
        opacity={0.78}
        size={0.043}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

function NetworkLines({
  color,
  radius = 3.6,
  count = 34,
}: {
  color: string;
  radius?: number;
  count?: number;
}) {
  const positions = useMemo(() => {
    const nodes = Array.from({ length: count }, () => {
      const x = (Math.random() - 0.5) * radius * 2;
      const y = (Math.random() - 0.5) * radius * 1.15;
      const z = -1.8 + (Math.random() - 0.5) * radius;
      return new THREE.Vector3(x, y, z);
    });
    const lines: number[] = [];
    nodes.forEach((node, index) => {
      const next = nodes[(index + 3) % nodes.length];
      const near = nodes[(index + 9) % nodes.length];
      lines.push(node.x, node.y, node.z, next.x, next.y, next.z);
      if (index % 2 === 0)
        lines.push(node.x, node.y, node.z, near.x, near.y, near.z);
    });
    return new Float32Array(lines);
  }, [count, radius]);
  const ref = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.035;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.38} />
    </lineSegments>
  );
}

function HologramPanel({
  color,
  position,
  width = 4.2,
  height = 1.55,
}: {
  color: string;
  position: [number, number, number];
  width?: number;
  height?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });
  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[width, height, 12, 4]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.14}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SectionText({
  variant,
  position = [0, 0, 0],
}: {
  variant: SceneVariant;
  position?: [number, number, number];
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const palette = colors[variant];
  const size = variant === "hero" ? 0.82 : 0.46;
  const depth = variant === "hero" ? 0.18 : 0.1;
  const plateWidth = labels[variant].length * size * 0.72 + 0.7;
  const plateHeight = size * 1.35;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      hovered
        ? state.pointer.x * 0.7
        : Math.sin(state.clock.elapsedTime * 0.6) * 0.12,
      0.06,
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      hovered ? -state.pointer.y * 0.35 : 0,
      0.06,
    );
    const s = hovered ? 1.12 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh position={[0, 0, -0.16]} receiveShadow>
        <planeGeometry args={[plateWidth, plateHeight]} />
        <meshBasicMaterial
          color="#020617"
          transparent
          opacity={hovered ? 0.72 : 0.58}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Center>
        <Text3D
          font={extrudedFont}
          size={size}
          height={depth}
          curveSegments={16}
          bevelEnabled
          bevelThickness={0.018}
          bevelSize={0.014}
          bevelSegments={5}
          castShadow
          receiveShadow
        >
          {labels[variant]}
          <meshStandardMaterial
            color="#e0f2fe"
            roughness={0.16}
            metalness={0.62}
            emissive={palette[0]}
            emissiveIntensity={hovered ? 0.55 : 0.28}
          />
        </Text3D>
      </Center>
      <Center position={[0.035, -0.035, -0.07]}>
        <Text3D
          font={extrudedFont}
          size={size}
          height={0.035}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.006}
          bevelSize={0.004}
          bevelSegments={2}
        >
          {labels[variant]}
          <meshBasicMaterial color="#020617" transparent opacity={0.5} />
        </Text3D>
      </Center>
    </group>
  );
}

function Shape({
  geometry,
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  geometry: "box" | "ico" | "dodeca" | "octa" | "torus";
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.006 * speed;
    ref.current.rotation.y += 0.009 * speed;
    ref.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.16;
    const next = hovered ? scale * 1.25 : scale;
    ref.current.scale.lerp(new THREE.Vector3(next, next, next), 0.1);
  });

  return (
    <FloatShell speed={1.25 * speed}>
      <mesh
        ref={ref}
        position={position}
        scale={scale}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {geometry === "box" ? <boxGeometry args={[0.7, 0.7, 0.7]} /> : null}
        {geometry === "ico" ? <icosahedronGeometry args={[0.6, 1]} /> : null}
        {geometry === "dodeca" ? (
          <dodecahedronGeometry args={[0.62, 0]} />
        ) : null}
        {geometry === "octa" ? <octahedronGeometry args={[0.62, 0]} /> : null}
        {geometry === "torus" ? (
          <torusKnotGeometry args={[0.45, 0.13, 110, 14]} />
        ) : null}
        <meshStandardMaterial
          color={color}
          roughness={0.18}
          metalness={0.55}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </mesh>
    </FloatShell>
  );
}

function FloatShell({
  children,
  speed,
}: {
  children: React.ReactNode;
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 0.08;
    ref.current.rotation.z =
      Math.sin(state.clock.elapsedTime * speed * 0.7) * 0.035;
  });
  return <group ref={ref}>{children}</group>;
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      state.pointer.x * 0.25,
      0.035,
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      -state.pointer.y * 0.16,
      0.035,
    );
    ref.current.position.x = THREE.MathUtils.lerp(
      ref.current.position.x,
      state.pointer.x * 0.24,
      0.03,
    );
  });
  return <group ref={ref}>{children}</group>;
}

// ✅ FIXED: InteractiveParticles with proper useEffect import
function InteractiveParticles() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x +=
      (mouse.current.y * 0.02 - ref.current.rotation.x) * 0.05;
    ref.current.rotation.y +=
      (mouse.current.x * 0.02 - ref.current.rotation.y) * 0.05;
  });

  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 2;
    }
    return pos;
  }, []);

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        color="#14b8a6"
        transparent
        opacity={0.6}
        size={0.05}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

// ✅ FIXED: HeroWorld with all components properly typed
function HeroWorld() {
  const c = colors.hero;
  return (
    <ParallaxGroup>
      <Sparkles
        count={400}
        scale={[8, 4, 6] as [number, number, number]}
        size={0.4}
        speed={0.5}
        color={c[0]}
      />
      <ParticleField count={3000} radius={8.5} color={c[0]} />
      <NetworkLines color={c[1]} radius={4.6} count={46} />
      <Stars radius={52} depth={25} count={1400} factor={4} fade speed={0.65} />
      <HologramPanel
        color={c[1]}
        position={[0.1, 0.15, 0.78]}
        width={3.6}
        height={1.35}
      />
      <SectionText variant="hero" position={[0.2, 0.15, 1.05]} />
      <Shape
        geometry="torus"
        position={[-2.7, 1.1, -1.4]}
        color={c[0]}
        scale={1.05}
        speed={1.1}
      />
      <Shape
        geometry="ico"
        position={[2.3, -0.3, -1]}
        color={c[1]}
        scale={0.9}
        speed={1.35}
      />
      <Shape
        geometry="dodeca"
        position={[0.8, 1.9, -2.1]}
        color={c[2]}
        scale={0.72}
        speed={0.9}
      />
      <Shape
        geometry="octa"
        position={[-0.8, -1.35, -1.2]}
        color={c[0]}
        scale={0.64}
        speed={1.55}
      />
      <InteractiveParticles />
    </ParallaxGroup>
  );
}

function AboutWorld() {
  const c = colors.about;
  return (
    <ParallaxGroup>
      <SectionText variant="about" position={[0, 1.45, 0.55]} />
      <NetworkLines color={c[0]} radius={3.2} count={28} />
      {[0, 1, 2, 3, 4, 5].map((item) => {
        const angle = (item / 6) * Math.PI * 2;
        return (
          <Shape
            key={item}
            geometry={item % 2 ? "dodeca" : "ico"}
            position={[
              Math.cos(angle) * 2.1,
              Math.sin(angle) * 0.85,
              -1.2 + Math.sin(angle) * 0.4,
            ]}
            color={c[item % 3]}
            scale={0.42}
            speed={0.8 + item * 0.1}
          />
        );
      })}
      <mesh rotation={[0.9, 0.2, 0]} position={[0, -0.45, -1.4]}>
        <torusGeometry args={[2.15, 0.01, 12, 180]} />
        <meshBasicMaterial color={c[1]} transparent opacity={0.35} />
      </mesh>
    </ParallaxGroup>
  );
}

function ServicesWorld() {
  const c = colors.services;
  return (
    <ParallaxGroup>
      <SectionText variant="services" position={[0, 1.45, 0.45]} />
      <NetworkLines color={c[1]} radius={3.2} count={24} />
      {[-1.8, -0.6, 0.6, 1.8].map((x, index) => (
        <Shape
          key={x}
          geometry="box"
          position={[x, -0.3 + (index % 2) * 0.45, -1.3]}
          color={c[index % 3]}
          scale={0.56}
          speed={1 + index * 0.18}
        />
      ))}
      <Grid
        position={[0, -1.35, -1.8]}
        args={[5.5, 3.2]}
        cellSize={0.45}
        cellThickness={0.45}
        cellColor={c[1]}
        sectionColor={c[0]}
        fadeDistance={5}
        fadeStrength={1.2}
      />
    </ParallaxGroup>
  );
}

function WorkWorld() {
  const c = colors.work;
  return (
    <ParallaxGroup>
      <SectionText variant="work" position={[0, 1.45, 0.45]} />
      <NetworkLines color={c[0]} radius={3.6} count={30} />
      <Grid
        position={[0, -0.95, -1.9]}
        args={[7, 4]}
        cellSize={0.38}
        cellThickness={0.35}
        cellColor={c[1]}
        sectionColor={c[0]}
        fadeDistance={6}
        fadeStrength={1}
      />
      {[-1.6, 0, 1.6].map((x, index) => (
        <mesh
          key={x}
          position={[x, 0.05, -1.2]}
          rotation={[0.12, -0.2 + index * 0.2, 0]}
        >
          <boxGeometry args={[1.05, 0.62, 0.06]} />
          <meshStandardMaterial
            color={c[index]}
            roughness={0.24}
            metalness={0.45}
            emissive={c[index]}
            emissiveIntensity={0.08}
          />
        </mesh>
      ))}
    </ParallaxGroup>
  );
}

function ContactWorld() {
  const c = colors.contact;
  const ring = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ring.current) return;
    ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.28) * 0.4;
    ring.current.rotation.y = state.clock.elapsedTime * 0.18;
  });
  return (
    <ParallaxGroup>
      <SectionText variant="contact" position={[0, 1.45, 0.5]} />
      <NetworkLines color={c[1]} radius={3.2} count={26} />
      <group ref={ring}>
        {[1.2, 1.8, 2.45].map((radius, index) => (
          <mesh
            key={radius}
            rotation={[Math.PI / 2 + index * 0.35, index * 0.62, 0]}
            position={[0, -0.05, -1.2]}
          >
            <torusGeometry args={[radius, 0.012, 16, 180]} />
            <meshBasicMaterial
              color={c[index]}
              transparent
              opacity={0.34 - index * 0.05}
            />
          </mesh>
        ))}
      </group>
      <ParticleField count={800} radius={4.5} color={c[0]} />
    </ParallaxGroup>
  );
}

function DefaultWorld({ variant }: { variant: SceneVariant }) {
  const c = colors[variant];
  return (
    <ParallaxGroup>
      <SectionText variant={variant} position={[0, 1.45, 0.5]} />
      <NetworkLines color={c[1]} radius={3.1} count={22} />
      <ParticleField count={650} radius={4.4} color={c[0]} />
      <Shape
        geometry="octa"
        position={[-1.7, -0.2, -1.4]}
        color={c[0]}
        scale={0.45}
        speed={1.1}
      />
      <Shape
        geometry="torus"
        position={[1.6, 0.2, -1.1]}
        color={c[1]}
        scale={0.48}
        speed={0.9}
      />
    </ParallaxGroup>
  );
}

function World({ variant }: { variant: SceneVariant }) {
  const c = colors[variant];
  return (
    <>
      <ambientLight intensity={0.78} />
      <directionalLight position={[4, 5, 5]} intensity={1.65} castShadow />
      <spotLight
        position={[0, 3.5, 4]}
        angle={0.42}
        penumbra={0.65}
        intensity={2.4}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-4, 1.5, 2]} color={c[0]} intensity={2.8} />
      <pointLight position={[3, -2, -3]} color={c[1]} intensity={2.1} />
      {variant === "hero" ? <HeroWorld /> : null}
      {variant === "about" ? <AboutWorld /> : null}
      {variant === "services" ? <ServicesWorld /> : null}
      {variant === "work" ? <WorkWorld /> : null}
      {variant === "contact" ? <ContactWorld /> : null}
      {["experience", "testimonials", "footer"].includes(variant) ? (
        <DefaultWorld variant={variant} />
      ) : null}
    </>
  );
}

function SceneCanvas({
  variant,
  opacity = "opacity-60",
}: {
  variant: SceneVariant;
  opacity?: string;
}) {
  return (
    <div className={`pointer-events-auto absolute inset-0 ${opacity}`}>
      <Canvas
        shadows
        camera={{
          position: [0, 0.55, variant === "hero" ? 6.2 : 5.5],
          fov: variant === "hero" ? 48 : 54,
        }}
        dpr={[1, 1.6]}
      >
        <Suspense fallback={null}>
          <World variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function HeroScene() {
  return <SceneCanvas variant="hero" opacity="opacity-100" />;
}

export function SectionScene({ variant }: { variant: SceneVariant }) {
  return (
    <SceneCanvas
      variant={variant}
      opacity={variant === "footer" ? "opacity-60" : "opacity-70"}
    />
  );
}

export function ContactScene() {
  return <SceneCanvas variant="contact" opacity="opacity-55" />;
}
