"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Image, Text, RoundedBox } from "@react-three/drei";
import { achievements } from "@/app/data/achievements";

// ─────────────────────────────────────────────────────────────────
// Coverflow Configuration
// ─────────────────────────────────────────────────────────────────
// Card dimensions maintain 320:420 aspect ratio in 3D units
const CARD_W = 2.4;      // ≈ 320 px  (1 unit ≈ 133 px at camera distance)
const CARD_H = 3.15;     // ≈ 420 px  (ratio 1.3125 — exact 320:420)
const SPACING = 2.95;    // horizontal gap between card centers (40 % wider than default 2.1)
const DEPTH   = 1.2;     // z-push per distance step — adds depth perspective
const ROT_DEG = 35;      // max side-card Y-rotation (degrees)
const ROT_MAX = ROT_DEG * (Math.PI / 180);
const SPRING  = 8;       // lerp stiffness (higher = snappier)

// Scale tiers per requirement
const S_ACTIVE = 1.15;
const S_ADJ    = 0.90;
const S_FAR    = 0.75;

// ─────────────────────────────────────────────────────────────────
// Helper: signed circular distance  (negative = left, positive = right)
// ─────────────────────────────────────────────────────────────────
const sdist = (i: number, active: number, n: number): number => {
  const d = ((i - active + n) % n);
  return d > Math.floor(n / 2) ? d - n : d;
};

// ─────────────────────────────────────────────────────────────────
// CoverflowCard
// ─────────────────────────────────────────────────────────────────
interface CardProps {
  data: { image: string; title: string; id: string | number };
  sd: number;         // signed distance from active
  isActive: boolean;
  onSelect: () => void;
}

const CoverflowCard = ({ data, sd, isActive, onSelect }: CardProps) => {
  const groupRef = useRef<THREE.Group>(null!);
  const matRef   = useRef<THREE.MeshStandardMaterial>(null!);
  const [hov, setHov] = useState(false);

  const ad = Math.abs(sd); // absolute distance

  // ── Target state (reacts to activeIndex changes via props) ──────
  const tX   = sd * SPACING;
  const tZ   = -ad * DEPTH;
  // Clamp rotation: adjacent gets full 35°, farther cards get the same (already at max)
  const tRY  = sd === 0 ? 0 : Math.sign(sd) * Math.min(ROT_MAX, ROT_MAX * Math.min(ad, 1));
  const tSc  = isActive ? S_ACTIVE : ad === 1 ? S_ADJ : S_FAR;
  const tOp  = isActive ? 1.0 : ad === 1 ? 0.85 : 0.62;
  const tEm  = isActive ? 0.55 : hov ? 0.2 : 0.06;

  // ── Animated refs (current interpolated positions) ──────────────
  const ax  = useRef(tX);
  const az  = useRef(tZ);
  const ary = useRef(tRY);
  const asc = useRef(tSc);
  const aop = useRef(tOp);
  const aem = useRef(0.06);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Frame-rate independent exponential spring
    const k = 1 - Math.exp(-SPRING * delta);

    ax.current  = THREE.MathUtils.lerp(ax.current,  tX,  k);
    az.current  = THREE.MathUtils.lerp(az.current,  tZ,  k);
    ary.current = THREE.MathUtils.lerp(ary.current, tRY, k);
    asc.current = THREE.MathUtils.lerp(asc.current, tSc, k);
    aop.current = THREE.MathUtils.lerp(aop.current, tOp, k * 0.65); // opacity slightly slower
    aem.current = THREE.MathUtils.lerp(aem.current, tEm, k * 0.8);

    groupRef.current.position.x = ax.current;
    groupRef.current.position.z = az.current;
    groupRef.current.rotation.y = ary.current;
    groupRef.current.scale.setScalar(asc.current);

    // Update material imperatively (no re-render needed)
    if (matRef.current) {
      matRef.current.opacity = aop.current;
      matRef.current.emissiveIntensity = aem.current;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={onSelect}
      onPointerOver={() => setHov(true)}
      onPointerOut={() => setHov(false)}
    >
      {/* ── Active glow halos (rendered behind card) ── */}
      {isActive && (
        <>
          {/* Purple inner halo */}
          <mesh position={[0, 0, -0.09]}>
            <planeGeometry args={[CARD_W + 0.55, CARD_H + 0.55]} />
            <meshBasicMaterial
              color="#7c3aed"
              transparent
              opacity={0.22}
              depthWrite={false}
            />
          </mesh>
          {/* Gold outer halo */}
          <mesh position={[0, 0, -0.16]}>
            <planeGeometry args={[CARD_W + 1.1, CARD_H + 1.1]} />
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.10}
              depthWrite={false}
            />
          </mesh>
        </>
      )}

      {/* ── Card body (320 × 420 px proportional) ── */}
      <RoundedBox
        args={[CARD_W, CARD_H, 0.06]}
        radius={0.12}
        smoothness={4}
      >
        <meshStandardMaterial
          ref={matRef}
          color={isActive ? "#1a0535" : "#0a0318"}
          metalness={0.55}
          roughness={0.38}
          emissive={isActive ? "#7c3aed" : "#1a0b2e"}
          emissiveIntensity={0.06}
          transparent
          opacity={1.0}
        />
      </RoundedBox>

      {/* ── Achievement image — fills card; only title bar at bottom ── */}
      <Image
        url={data.image}
        scale={[CARD_W - 0.06, CARD_H - 0.54]}
        position={[0, 0.22, 0.05]}
        transparent
        opacity={0.97}
      />

      {/* ── Title text — sits in the bottom strip ── */}
      <Text
        position={[0, -(CARD_H / 2) + 0.22, 0.05]}
        fontSize={0.13}
        color={isActive ? "#D4AF37" : "#AAAAAA"}
        maxWidth={CARD_W - 0.16}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        {data.title}
      </Text>

      {/* ── Soft shadow ellipse beneath card ── */}
      <mesh
        position={[0, -(CARD_H / 2) - 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[CARD_W * 0.52, 0.55, 1]}
      >
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={isActive ? 0.55 : 0.28}
          depthWrite={false}
        />
      </mesh>

      {/* ── Floor reflection strip (fake reflection) ── */}
      <mesh
        position={[0, -(CARD_H / 2) - 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[CARD_W + 0.2, 1.4]} />
        <meshBasicMaterial
          color={isActive ? "#9333EA" : "#1a0b2e"}
          transparent
          opacity={isActive ? 0.09 : 0.03}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// ─────────────────────────────────────────────────────────────────
// Carousel Root  (exported — used by Achievements3D)
// ─────────────────────────────────────────────────────────────────
export const AchievementCarousel = ({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (i: number) => void;
}) => {
  return (
    <group>
      {/* Sort cards so active renders last (on top) */}
      {achievements
        .map((item, i) => ({
          item,
          i,
          sd: sdist(i, activeIndex, achievements.length),
        }))
        .sort((a, b) => Math.abs(b.sd) - Math.abs(a.sd)) // far → near
        .map(({ item, i, sd }) => (
          <CoverflowCard
            key={item.id}
            data={item}
            sd={sd}
            isActive={sd === 0}
            onSelect={() => onSelect(i)}
          />
        ))}

      {/* ── Floor glow plane (reflective ambience) ── */}
      <mesh
        position={[0, -(CARD_H / 2) - 0.06, -1.5]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[24, 6]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.022}
          depthWrite={false}
        />
      </mesh>

      {/* ── Lighting: centered on active card ── */}
      <pointLight
        position={[0, 3.5, 5]}
        intensity={4.5}
        color="#D4AF37"
        distance={16}
        decay={2}
      />
      <pointLight
        position={[0, -1.5, 4]}
        intensity={2.2}
        color="#9333EA"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[0, 0, 2]}
        intensity={1.0}
        color="#ffffff"
        distance={8}
        decay={2}
      />
      <ambientLight intensity={0.32} color="#160830" />
    </group>
  );
};
