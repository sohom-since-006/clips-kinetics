"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import Logo3DFallback from './Logo3DFallback';

/**
 * Mathematically Centered Rounded Play Triangle
 * Centroid is strictly at (0, 0) so rotation & tilt never wobble.
 */
function createRoundedPlayShape(scale = 1.0) {
  const shape = new THREE.Shape();

  // Primary control coordinates for a sleek, golden-ratio play triangle
  // Centroid: (0.76 - 0.38 - 0.38) / 3 = 0.00
  const tipX = 0.76 * scale;
  const tipY = 0;
  const backX = -0.38 * scale;
  const topY = 0.58 * scale;
  const bottomY = -0.58 * scale;

  // Arc transition points
  const rBack = 0.14 * scale;
  const rTip = 0.15 * scale;

  // Start at bottom of left vertical edge
  shape.moveTo(backX, bottomY + rBack);

  // 1. Straight left edge going up
  shape.lineTo(backX, topY - rBack);

  // 2. Top-left rounded corner
  shape.quadraticCurveTo(backX, topY, backX + rBack * 0.9, topY - rBack * 0.35);

  // 3. Top sloped edge heading towards tip
  shape.lineTo(tipX - rTip * 1.1, tipY + rTip * 0.65);

  // 4. Front tip rounded corner
  shape.quadraticCurveTo(tipX, tipY, tipX - rTip * 1.1, tipY - rTip * 0.65);

  // 5. Bottom sloped edge heading towards bottom-left
  shape.lineTo(backX + rBack * 0.9, bottomY + rBack * 0.35);

  // 6. Bottom-left rounded corner
  shape.quadraticCurveTo(backX, bottomY, backX, bottomY + rBack);

  shape.closePath();
  return shape;
}

/**
 * 3D Play Button Mesh with luxury metallic finish,
 * glowing filament core (bulblike), and physical tactile recoil.
 */
function PlayButtonMesh({ isLit, onToggle }) {
  const groupRef = useRef();
  const outerMeshRef = useRef();
  const innerMeshRef = useRef();
  const pointLightRef = useRef();
  const rimLightRef = useRef();
  const frontLightRef = useRef();

  const targetRotation = useRef({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const [pulse, setPulse] = useState(0);

  // Shapes: Outer sculpted bezel and recessed inner core
  const outerShape = useMemo(() => createRoundedPlayShape(1.0), []);
  const innerShape = useMemo(() => createRoundedPlayShape(0.72), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Fluid pointer tracking (mouse on desktop, touch on mobile)
    const mouseX = state.pointer.x * 0.32;
    const mouseY = -state.pointer.y * 0.28;

    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.07);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.07);

    // Natural breathing idle motion
    const t = state.clock.getElapsedTime();
    const idleY = Math.sin(t * 1.3) * 0.035;
    const idleZRot = Math.sin(t * 0.8) * 0.015;

    // Tactile push recoil on press
    const targetZ = pressed ? -0.16 : 0;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.22);
    groupRef.current.position.y = idleY;
    groupRef.current.rotation.x = targetRotation.current.x;
    groupRef.current.rotation.y = targetRotation.current.y;
    groupRef.current.rotation.z = idleZRot;

    // Decay recoil pulse
    if (pulse > 0) {
      setPulse((p) => Math.max(0, p - delta * 2.8));
    }

    // Dynamic Central Point Light (Radiating warm bulb glow)
    const filamentBreathe = isLit ? Math.sin(t * 3.0) * 0.3 : 0;
    if (pointLightRef.current) {
      const targetIntensity = isLit ? 5.2 + pulse * 5.0 + filamentBreathe : 0.05;
      pointLightRef.current.intensity = THREE.MathUtils.lerp(
        pointLightRef.current.intensity,
        targetIntensity,
        0.1
      );
    }

    // Rim light intensity
    if (rimLightRef.current) {
      const targetRim = isLit ? 2.0 : 0.45;
      rimLightRef.current.intensity = THREE.MathUtils.lerp(
        rimLightRef.current.intensity,
        targetRim,
        0.1
      );
    }

    // Front fill light
    if (frontLightRef.current) {
      const targetFront = isLit ? 2.0 : 2.2;
      frontLightRef.current.intensity = THREE.MathUtils.lerp(
        frontLightRef.current.intensity,
        targetFront,
        0.1
      );
    }

    // Outer Bezel Material interpolation
    if (outerMeshRef.current) {
      const targetEmissive = isLit ? 1.5 + pulse * 2.0 : 0.0;
      outerMeshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        outerMeshRef.current.material.emissiveIntensity,
        targetEmissive,
        0.1
      );
      const targetRoughness = isLit ? 0.20 : 0.32;
      outerMeshRef.current.material.roughness = THREE.MathUtils.lerp(
        outerMeshRef.current.material.roughness,
        targetRoughness,
        0.1
      );
    }

    // Inner Glowing Core Material interpolation (Bulb filament glow)
    if (innerMeshRef.current) {
      const innerTargetEmissive = isLit ? 3.8 + pulse * 4.0 + filamentBreathe * 0.8 : 0.0;
      innerMeshRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        innerMeshRef.current.material.emissiveIntensity,
        innerTargetEmissive,
        0.12
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
      scale={[1.1, 1.1, 1.1]}
      position={[0, 0, 0]}
    >
      {/* Central Radiating Warm Point Light (Like an incandescent bulb core) */}
      <pointLight
        ref={pointLightRef}
        color={isLit ? "#FF9E1B" : "#243242"}
        intensity={isLit ? 5.2 : 0.05}
        distance={8}
        decay={2}
        position={[0.08, 0, 0.45]}
      />

      {/* Rim light for sculptural metallic definition */}
      <pointLight
        ref={rimLightRef}
        color={isLit ? "#FFDF9E" : "#E2E8F0"}
        intensity={isLit ? 2.0 : 0.45}
        distance={6}
        decay={2}
        position={[-0.6, 0.5, -0.6]}
      />

      {/* Front directional fill light */}
      <directionalLight
        ref={frontLightRef}
        color={isLit ? "#FFF5E6" : "#F8FAFC"}
        intensity={isLit ? 2.0 : 2.2}
        position={[2, 3, 4]}
      />

      {/* ═══ 1. Outer Sculpted Metallic Bezel ═══ */}
      <mesh ref={outerMeshRef} position={[0, 0, 0]}>
        <extrudeGeometry
          args={[
            outerShape,
            {
              depth: 0.18,
              bevelEnabled: true,
              bevelSegments: 14,
              steps: 2,
              bevelSize: 0.07,
              bevelThickness: 0.07,
            },
          ]}
        />
        <meshPhysicalMaterial
          color={isLit ? "#D49B35" : "#CBD5E1"}
          emissive={isLit ? "#B26E08" : "#000000"}
          emissiveIntensity={isLit ? 1.5 : 0.0}
          roughness={isLit ? 0.20 : 0.32}
          metalness={0.92}
          clearcoat={0.95}
          clearcoatRoughness={0.08}
          reflectivity={0.9}
        />
      </mesh>

      {/* ═══ 2. Recessed Inner Glowing Core (Bulblike Filament Inset) ═══ */}
      <mesh ref={innerMeshRef} position={[0.02, 0, 0.12]}>
        <extrudeGeometry
          args={[
            innerShape,
            {
              depth: 0.07,
              bevelEnabled: true,
              bevelSegments: 8,
              steps: 1,
              bevelSize: 0.03,
              bevelThickness: 0.03,
            },
          ]}
        />
        <meshPhysicalMaterial
          color={isLit ? "#FFAE26" : "#64748B"}
          emissive={isLit ? "#FF8800" : "#0F172A"}
          emissiveIntensity={isLit ? 3.8 : 0.0}
          roughness={isLit ? 0.10 : 0.45}
          metalness={isLit ? 0.85 : 0.7}
          clearcoat={isLit ? 1.0 : 0.2}
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* ═══ 3. Ambient Ground Drop Shadow ═══ */}
      <mesh position={[0, -0.85, 0.05]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.1, 0.42, 1]}>
        <circleGeometry args={[0.7, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={isLit ? 0.35 : 0.18}
        />
      </mesh>
    </group>
  );
}

/**
 * Main 3D Logo / Play Button Component
 * Synchronized with global ThemeContext.
 */
export default function Logo3DScene({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
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
      className={`relative w-full flex items-center justify-center select-none ${className}`}
    >
      {/* 3D Canvas Box */}
      <div
        className="relative w-full h-[230px] sm:h-[280px] lg:h-[330px] flex items-center justify-center cursor-pointer touch-none"
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D Play Button. Click to toggle light and theme."
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
          }
        }}
      >
        {/* Dynamic Ambient Bulb Glow Halo behind button */}
        <div
          className={`absolute w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full pointer-events-none transition-all duration-700 ${
            isDark
              ? 'bg-accent/40 blur-[85px] sm:blur-[105px] scale-110 opacity-100'
              : 'bg-slate-300/30 blur-[50px] scale-80 opacity-0'
          }`}
        />

        <Suspense fallback={<Logo3DFallback isLit={isDark} />}>
          {isVisible ? (
            <Canvas
              dpr={[1, 2]}
              camera={{ position: [0, 0, 3.4], fov: 42 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              className="relative z-10 w-full h-full pointer-events-auto"
            >
              {/* Studio ambient illumination */}
              <ambientLight intensity={isDark ? 0.35 : 0.65} />

              {/* Overhead highlight */}
              <directionalLight position={[0, 5, 2]} intensity={0.6} color="#FFFFFF" />

              {/* Left rim light */}
              <directionalLight position={[-4, 1, 2]} intensity={0.5} color={isDark ? "#FFD68A" : "#CBD5E1"} />

              <PlayButtonMesh isLit={isDark} onToggle={toggleTheme} />
            </Canvas>
          ) : (
            <Logo3DFallback isLit={isDark} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
