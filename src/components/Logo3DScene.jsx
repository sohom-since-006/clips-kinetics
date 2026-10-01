"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Logo3DFallback from './Logo3DFallback';

/**
 * Premium 3D Interactive Play Button
 * 
 * Aesthetic:
 * - High-end luxury hardware feel: brushed dark obsidian bezel with champagne gold trim
 * - Precision-faceted optical crystal glass lens with realistic refraction & dispersion
 * - Deep glowing neon amber Play Triangle core (turns ON/OFF on click with spring recoil)
 * - Fine concentric orbital glow halo ring
 * - Smooth pointer tilt with physics damping
 */
function PlayButtonMesh({ isLit, onToggle }) {
  const groupRef = useRef();
  const coreRef = useRef();
  const pointLightRef = useRef();
  const haloRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Precision 3D Play Triangle Shape (Smooth, perfectly balanced proportions)
  const playShape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 0.65;
    const h = 0.8;
    // Right-facing triangle with gentle apex
    s.moveTo(-w * 0.55, -h * 0.5);
    s.lineTo(w * 0.7, 0);
    s.lineTo(-w * 0.55, h * 0.5);
    s.closePath();
    return s;
  }, []);

  // Frame Loop: Smooth mouse tilt, idle levitation, and light recoil animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Pointer-based tilt with smooth damping (lerp)
    const mouseX = state.pointer.x * 0.35;
    const mouseY = -state.pointer.y * 0.3;

    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.08);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.08);

    // Subtle gentle float
    const time = state.clock.getElapsedTime();
    const idleY = Math.sin(time * 1.5) * 0.04;
    const idleZRot = Math.sin(time * 0.8) * 0.015;

    // Apply rotation & position with press depression
    const targetZ = pressed ? -0.15 : 0;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.2);
    groupRef.current.position.y = idleY;
    groupRef.current.rotation.x = targetRotation.current.x;
    groupRef.current.rotation.y = targetRotation.current.y;
    groupRef.current.rotation.z = idleZRot;

    // Slowly rotate outer halo ring
    if (haloRef.current) {
      haloRef.current.rotation.z = time * 0.25;
    }

    // Decay pulse
    if (pulse > 0) {
      setPulse((p) => Math.max(0, p - delta * 3.0));
    }

    // Dynamic light & emission responsiveness
    if (pointLightRef.current) {
      const targetIntensity = isLit ? 3.5 + pulse * 4.0 : 0.2;
      pointLightRef.current.intensity = THREE.MathUtils.lerp(
        pointLightRef.current.intensity,
        targetIntensity,
        0.15
      );
    }

    if (coreRef.current) {
      const baseEmissive = isLit ? 2.6 : 0.25;
      const targetEmissive = baseEmissive + pulse * 2.5;
      coreRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        coreRef.current.material.emissiveIntensity,
        targetEmissive,
        0.15
      );
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setPressed(true);
    setPulse(1.5);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setPressed(false);
    if (onToggle) onToggle();
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      scale={[0.95, 0.95, 0.95]}
      position={[0, 0, 0]}
    >
      {/* Dynamic Warm Golden Core Light */}
      <pointLight
        ref={pointLightRef}
        color={isLit ? "#FFB834" : "#442A08"}
        intensity={isLit ? 3.5 : 0.2}
        distance={7}
        decay={2}
        position={[0.1, 0, 0.35]}
      />

      {/* 1. Outer Chassis: Precision Dark Obsidian Housing Disk */}
      <mesh position={[0, 0, -0.15]}>
        <cylinderGeometry args={[1.35, 1.4, 0.24, 64]} />
        <meshStandardMaterial
          color="#16151B"
          roughness={0.25}
          metalness={0.92}
        />
      </mesh>

      {/* 2. Champagne Gold Bezel Trim Ring */}
      <mesh position={[0, 0, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.32, 0.045, 24, 64]} />
        <meshStandardMaterial
          color={isLit ? "#EF9F27" : "#55442A"}
          emissive={isLit ? "#854F0B" : "#1A1408"}
          emissiveIntensity={isLit ? 0.4 + pulse * 0.5 : 0.05}
          roughness={0.18}
          metalness={0.95}
        />
      </mesh>

      {/* 3. Deep Optical Glass Lens Dome (Faceted Chamfer Front) */}
      <mesh position={[0, 0, 0.04]}>
        <cylinderGeometry args={[1.22, 1.25, 0.16, 64]} />
        <meshPhysicalMaterial
          color={isLit ? "#281E10" : "#100E14"}
          emissive={isLit ? "#523207" : "#050406"}
          emissiveIntensity={isLit ? 0.25 : 0.02}
          roughness={0.06}
          metalness={0.12}
          transmission={0.88}
          thickness={0.9}
          ior={1.52}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transparent={true}
          opacity={0.92}
        />
      </mesh>

      {/* 4. Glowing Neon Amber Play Triangle Core */}
      <mesh ref={coreRef} position={[0.06, 0, 0.15]}>
        <extrudeGeometry
          args={[
            playShape,
            {
              depth: 0.12,
              bevelEnabled: true,
              bevelSegments: 4,
              steps: 2,
              bevelSize: 0.04,
              bevelThickness: 0.04,
            },
          ]}
        />
        <meshStandardMaterial
          color={isLit ? "#FFC466" : "#4A3215"}
          emissive={isLit ? "#FF9E1B" : "#1A1005"}
          emissiveIntensity={isLit ? 2.6 : 0.25}
          roughness={0.12}
          metalness={0.5}
        />
      </mesh>

      {/* 5. Precision Diamond Edge Outline on the Play Button */}
      <lineSegments position={[0.06, 0, 0.28]}>
        <edgesGeometry
          args={[
            new THREE.ExtrudeGeometry(playShape, {
              depth: 0.02,
              bevelEnabled: false,
            }),
          ]}
        />
        <lineBasicMaterial
          color={isLit ? "#FFFFFF" : "#665544"}
          linewidth={2}
          transparent
          opacity={isLit ? 0.9 : 0.3}
        />
      </lineSegments>

      {/* 6. Orbital Accent Halo Ring */}
      <group ref={haloRef} position={[0, 0, -0.05]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.58, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#FAC775"
            emissive="#FAC775"
            emissiveIntensity={isLit ? 1.4 + pulse * 1.5 : 0.15}
            transparent
            opacity={isLit ? 0.75 : 0.2}
            roughness={0.3}
          />
        </mesh>
        {/* Subtle satellite accent bead on halo */}
        <mesh position={[1.58, 0, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* 7. Soft Backplate Ground Contact Shadow Ring */}
      <mesh position={[0, 0, -0.3]}>
        <ringGeometry args={[0.9, 1.7, 48]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}

/**
 * Main 3D Logo / Play Button Component
 */
export default function Logo3DScene({ className = "" }) {
  const [isLit, setIsLit] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Performance: Pause Canvas rendering when hero scrolls out of view
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[250px] sm:h-[300px] lg:h-[340px] flex items-center justify-center select-none cursor-pointer ${className}`}
      aria-label="Interactive 3D Play Button. Click to toggle light."
    >
      {/* Dynamic Radial Ambient Glow behind the button */}
      <div
        className={`absolute w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none transition-all duration-700 ${
          isLit
            ? 'bg-accent/25 opacity-100 scale-105'
            : 'bg-accent/5 opacity-30 scale-90'
        }`}
      />

      <Suspense fallback={<Logo3DFallback isLit={isLit} />}>
        {isVisible ? (
          <Canvas
            dpr={[1, 2]} // Performance-capped DPR
            camera={{ position: [0, 0, 3.8], fov: 42 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="relative z-10 w-full h-full"
          >
            {/* Studio Key & Rim Lights */}
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 4, 3]} intensity={1.8} color="#FFFFFF" />
            <directionalLight position={[-3, -2, -2]} intensity={0.7} color="#FAC775" />
            <directionalLight position={[0, -3, 2]} intensity={0.25} color="#1E1E24" />

            <PlayButtonMesh isLit={isLit} onToggle={() => setIsLit((prev) => !prev)} />
          </Canvas>
        ) : (
          <Logo3DFallback isLit={isLit} />
        )}
      </Suspense>
    </div>
  );
}
