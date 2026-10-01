"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import BulbFallback from './BulbFallback';

/**
 * 3D Procedural Light Bulb Model
 * Created purely from code-defined geometries (Sphere, Cylinders, Extruded Play Triangle).
 * Contains internal point light, smooth cursor tilt, and click flare.
 */
function ProceduralBulb({ isLit, onToggleLit }) {
  const groupRef = useRef();
  const lightRef = useRef();
  const glassRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(0);

  // Play icon shape geometry (Triangle)
  const playShape = React.useMemo(() => {
    const shape = new THREE.Shape();
    const size = 0.45;
    shape.moveTo(-size * 0.5, -size * 0.7);
    shape.lineTo(size * 0.7, 0);
    shape.lineTo(-size * 0.5, size * 0.7);
    shape.closePath();
    return shape;
  }, []);

  // Frame loop for smooth tilt damping, floating hover, and glow flare
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smoothly tilt toward mouse cursor / touch pointer
    const mouseX = state.pointer.x * 0.35;
    const mouseY = -state.pointer.y * 0.35;

    targetRotation.current.x = THREE.MathUtils.lerp(targetRotation.current.x, mouseY, 0.08);
    targetRotation.current.y = THREE.MathUtils.lerp(targetRotation.current.y, mouseX, 0.08);

    // Floating idle oscillation
    const time = state.clock.getElapsedTime();
    const idleY = Math.sin(time * 1.5) * 0.08;

    groupRef.current.rotation.x = targetRotation.current.x;
    groupRef.current.rotation.y = targetRotation.current.y;
    groupRef.current.position.y = idleY;

    // Pulse decay after click
    if (pulse > 0) {
      setPulse((p) => Math.max(0, p - delta * 2.5));
    }

    // Dynamic light intensity lerp
    if (lightRef.current) {
      const baseIntensity = isLit ? 3.5 : 0.6;
      const targetIntensity = baseIntensity + pulse * 4.0;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        0.1
      );
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setPulse(1.2);
    if (onToggleLit) onToggleLit();
  };

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerDown={() => setPulse(1.0)}
      scale={[1.1, 1.1, 1.1]}
      position={[0, 0.2, 0]}
    >
      {/* Internal warm point light */}
      <pointLight
        ref={lightRef}
        color="#FAC775"
        intensity={3.5}
        distance={8}
        decay={2}
        position={[0, 0.4, 0]}
      />

      {/* 1. Glass Dome (Sphere) */}
      <mesh ref={glassRef} position={[0, 0.45, 0]}>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshPhysicalMaterial
          color={isLit ? "#FAC775" : "#3F3E45"}
          emissive={isLit ? "#EF9F27" : "#1A1A20"}
          emissiveIntensity={isLit ? 0.85 + pulse * 0.6 : 0.1}
          roughness={0.15}
          metalness={0.1}
          transmission={0.65}
          thickness={0.5}
          transparent={true}
          opacity={0.88}
        />
      </mesh>

      {/* 2. Central Filament - 3D Play Icon */}
      <mesh position={[0.08, 0.45, 0]}>
        <extrudeGeometry
          args={[
            playShape,
            { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 },
          ]}
        />
        <meshStandardMaterial
          color="#EF9F27"
          emissive="#FAC775"
          emissiveIntensity={isLit ? 1.6 + pulse * 1.5 : 0.2}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* 3. Filament Support Rods (Twin thin metallic wires) */}
      <mesh position={[-0.15, 0.0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 12]} />
        <meshStandardMaterial color="#888780" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0.15, 0.0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.6, 12]} />
        <meshStandardMaterial color="#888780" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* 4. Bulb Neck Transition */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.65, 0.48, 0.35, 32]} />
        <meshPhysicalMaterial
          color={isLit ? "#EF9F27" : "#2C2C34"}
          emissive={isLit ? "#854F0B" : "#111116"}
          emissiveIntensity={0.3}
          roughness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 5. Screw Thread Metal Base (Dark metallic cylinders) */}
      <group position={[0, -0.75, 0]}>
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.09, 32]} />
          <meshStandardMaterial color="#3F3F48" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.47, 0.47, 0.07, 32]} />
          <meshStandardMaterial color="#555562" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.09, 32]} />
          <meshStandardMaterial color="#3F3F48" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.46, 0.46, 0.07, 32]} />
          <meshStandardMaterial color="#555562" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, -0.28, 0]}>
          <cylinderGeometry args={[0.43, 0.43, 0.09, 32]} />
          <meshStandardMaterial color="#2E2E38" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 6. Electrical Contact Point (Bottom Cap) */}
        <mesh position={[0, -0.37, 0]}>
          <cylinderGeometry args={[0.26, 0.18, 0.1, 24]} />
          <meshStandardMaterial color="#1E1E26" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Main 3D Canvas Scene
 * Manages IntersectionObserver, fallback states, and user interaction.
 */
export default function BulbScene({ className = "" }) {
  const [isLit, setIsLit] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  // Pause render loop when scrolled offscreen to conserve CPU/battery
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
      className={`relative w-full h-[290px] sm:h-[390px] lg:h-[480px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing touch-pan-y ${className}`}
      aria-hidden="true"
    >
      {/* Background CSS radial glow for instant atmospheric illumination */}
      <div
        className={`absolute w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isLit
            ? 'bg-accent/25 opacity-100 scale-105'
            : 'bg-accent/5 opacity-40 scale-90'
        }`}
      />

      <Suspense fallback={<BulbFallback />}>
        {isVisible ? (
          <Canvas
            dpr={[1, 2]} // Cap device pixel ratio for mobile performance
            camera={{ position: [0, 0, 3.8], fov: 42 }}
            gl={{ antialias: true, alpha: true }}
            className="relative z-10 w-full h-full"
          >
            {/* Studio lighting */}
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 4, 3]} intensity={1.2} color="#FFFFFF" />
            <directionalLight position={[-3, -2, -2]} intensity={0.4} color="#FAC775" />
            
            <ProceduralBulb isLit={isLit} onToggleLit={() => setIsLit((l) => !l)} />
          </Canvas>
        ) : (
          <BulbFallback />
        )}
      </Suspense>

      {/* Subtle interaction tip */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-text-muted/60 tracking-wider uppercase pointer-events-none">
        Tap or Move Cursor
      </div>
    </div>
  );
}
