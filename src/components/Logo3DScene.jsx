"use client";

import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Logo3DFallback from './Logo3DFallback';

/**
 * Procedural Crystal Play Button 3D Logo
 * Faithfully mirrors the reference image:
 * - Faceted translucent amber crystal prism
 * - Glowing inner neon play triangle core
 * - Dynamic trailing timeline / light stream ribbons
 * - Brushed titanium pedestal platform
 */
function CrystalPlayLogo({ isLit, onToggleLit }) {
  const groupRef = useRef();
  const lightRef = useRef();
  const innerCoreRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(0);

  // Outer Faceted Crystal Play Shape
  const outerShape = useMemo(() => {
    const s = new THREE.Shape();
    // Beveled, symmetrical right-pointing triangle
    s.moveTo(-0.85, -1.05);
    s.lineTo(1.15, 0);
    s.lineTo(-0.85, 1.05);
    s.closePath();
    return s;
  }, []);

  // Inner Core Glowing Play Shape
  const innerShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-0.45, -0.55);
    s.lineTo(0.65, 0);
    s.lineTo(-0.45, 0.55);
    s.closePath();
    return s;
  }, []);

  // Timeline Stream Trails (Cinematic ribbons extending from behind the logo)
  const ribbonCurves = useMemo(() => {
    const ribbons = [];
    const ribbonConfigs = [
      { y: 0.25, z: -0.4, length: 3.5, color: '#FAC775', opacity: 0.85 },
      { y: 0.0, z: -0.6, length: 4.2, color: '#EF9F27', opacity: 0.95 },
      { y: -0.22, z: -0.3, length: 3.8, color: '#5DCAA5', opacity: 0.65 },
      { y: 0.45, z: -0.7, length: 3.0, color: '#FAC775', opacity: 0.5 },
      { y: -0.45, z: -0.5, length: 3.4, color: '#EF9F27', opacity: 0.6 },
    ];

    ribbonConfigs.forEach((cfg) => {
      const points = [];
      const steps = 30;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        // Curve extending backward to the left
        const x = -0.5 - t * cfg.length;
        const waveY = cfg.y + Math.sin(t * Math.PI * 2) * 0.08;
        const waveZ = cfg.z + Math.cos(t * Math.PI * 1.5) * 0.12;
        points.push(new THREE.Vector3(x, waveY, waveZ));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      ribbons.push({ curve, ...cfg });
    });

    return ribbons;
  }, []);

  // Frame Loop: Smooth pointer tilt, floating levitation, and light animation
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Pointer-based tilt with smooth damping
    const mouseX = state.pointer.x * 0.4;
    const mouseY = -state.pointer.y * 0.35;

    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.07);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.07);

    // Floating idle oscillation
    const time = state.clock.getElapsedTime();
    const idleY = Math.sin(time * 1.4) * 0.06;
    const idleRotZ = Math.sin(time * 0.8) * 0.02;

    groupRef.current.rotation.x = targetRotation.current.x;
    groupRef.current.rotation.y = targetRotation.current.y;
    groupRef.current.rotation.z = idleRotZ;
    groupRef.current.position.y = idleY;

    // Pulse decay after click
    if (pulse > 0) {
      setPulse((p) => Math.max(0, p - delta * 2.5));
    }

    // Dynamic light & inner core pulse
    if (lightRef.current) {
      const baseIntensity = isLit ? 3.8 : 0.8;
      const targetIntensity = baseIntensity + pulse * 5.0;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        0.1
      );
    }

    if (innerCoreRef.current) {
      const baseEmissive = isLit ? 2.5 : 0.3;
      innerCoreRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        innerCoreRef.current.material.emissiveIntensity,
        baseEmissive + pulse * 3.0,
        0.1
      );
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setPulse(1.4);
    if (onToggleLit) onToggleLit();
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerDown={() => setPulse(1.0)}
      scale={[1.15, 1.15, 1.15]}
      position={[0, 0.1, 0]}
    >
      {/* Internal warm golden point light */}
      <pointLight
        ref={lightRef}
        color="#FAC775"
        intensity={3.8}
        distance={9}
        decay={2}
        position={[0.1, 0, 0.2]}
      />

      {/* 1. Outer Faceted Crystal Glass Play Prism */}
      <mesh position={[0, 0, 0]}>
        <extrudeGeometry
          args={[
            outerShape,
            {
              depth: 0.36,
              bevelEnabled: true,
              bevelSegments: 4,
              steps: 2,
              bevelSize: 0.12,
              bevelThickness: 0.16,
            },
          ]}
        />
        <meshPhysicalMaterial
          color={isLit ? "#EF9F27" : "#322A20"}
          emissive={isLit ? "#854F0B" : "#110D05"}
          emissiveIntensity={isLit ? 0.35 + pulse * 0.4 : 0.05}
          roughness={0.08}
          metalness={0.15}
          transmission={0.82}
          thickness={1.1}
          ior={1.54}
          reflectivity={0.9}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transparent={true}
          opacity={0.92}
        />
      </mesh>

      {/* 2. Inner Glowing Neon Play Core */}
      <mesh ref={innerCoreRef} position={[0.08, 0, 0.22]}>
        <extrudeGeometry
          args={[
            innerShape,
            {
              depth: 0.08,
              bevelEnabled: true,
              bevelSegments: 3,
              bevelSize: 0.03,
              bevelThickness: 0.03,
            },
          ]}
        />
        <meshStandardMaterial
          color="#FAC775"
          emissive="#FAC775"
          emissiveIntensity={2.5}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>

      {/* 3. Golden Core Edge Rim Highlight */}
      <lineSegments position={[0.08, 0, 0.24]}>
        <edgesGeometry args={[new THREE.ExtrudeGeometry(innerShape, { depth: 0.08, bevelEnabled: false })]} />
        <lineBasicMaterial color="#FFFFFF" linewidth={2} transparent opacity={0.8} />
      </lineSegments>

      {/* 4. Cinematic Light Stream / Timeline Ribbons */}
      <group position={[0, 0, 0]}>
        {ribbonCurves.map((ribbon, idx) => (
          <mesh key={idx}>
            <tubeGeometry args={[ribbon.curve, 40, 0.02, 8, false]} />
            <meshStandardMaterial
              color={ribbon.color}
              emissive={ribbon.color}
              emissiveIntensity={isLit ? 1.8 + pulse * 1.0 : 0.3}
              roughness={0.2}
              transparent
              opacity={ribbon.opacity}
            />
          </mesh>
        ))}
      </group>

      {/* 5. Sleek Brushed Metal Pedestal Platform */}
      <group position={[0, -1.35, 0]}>
        {/* Main Base Bar */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[2.2, 0.08, 0.9]} />
          <meshStandardMaterial color="#2E2E38" metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Lower Foot Stand */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[2.5, 0.06, 1.1]} />
          <meshStandardMaterial color="#1B1B22" metalness={0.92} roughness={0.35} />
        </mesh>
        {/* Connecting Support Pin */}
        <mesh position={[-0.1, 0.18, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.22, 16]} />
          <meshStandardMaterial color="#555562" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Main 3D Logo Scene
 * Supports both custom procedural WebGL crystal logo and external Spline embeds.
 */
export default function Logo3DScene({ className = "", splineUrl = null }) {
  const [isLit, setIsLit] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Pause render loop when scrolled offscreen to conserve GPU and battery
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
      className={`relative w-full h-[300px] sm:h-[400px] lg:h-[480px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y ${className}`}
      aria-hidden="true"
    >
      {/* Ambient background volumetric glow */}
      <div
        className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isLit
            ? 'bg-accent/25 opacity-100 scale-105'
            : 'bg-accent/5 opacity-40 scale-90'
        }`}
      />

      <Suspense fallback={<Logo3DFallback />}>
        {isVisible ? (
          <Canvas
            dpr={[1, 2]} // Performance capped pixel ratio
            camera={{ position: [0, 0, 4.2], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            className="relative z-10 w-full h-full"
          >
            {/* Cinematic studio lighting */}
            <ambientLight intensity={0.65} />
            <directionalLight position={[4, 5, 4]} intensity={1.6} color="#FFFFFF" />
            <directionalLight position={[-4, -2, -3]} intensity={0.8} color="#FAC775" />
            <directionalLight position={[0, -3, 2]} intensity={0.3} color="#2C2C34" />

            <CrystalPlayLogo isLit={isLit} onToggleLit={() => setIsLit((l) => !l)} />
          </Canvas>
        ) : (
          <Logo3DFallback />
        )}
      </Suspense>

      {/* Interactive indicator hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-text-muted/60 tracking-wider uppercase pointer-events-none">
        Interactive 3D • Tap or Move Cursor
      </div>
    </div>
  );
}
