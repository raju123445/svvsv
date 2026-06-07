"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { FloatingNotes } from "./FloatingNotes";
import { SoundWaveRibbon } from "./SoundWave";
import { Veena3D } from "./Veena3D";
import { AnimatedSoundWaveBackground } from "./AnimatedSoundWaveBackground";
import { Environment, Sparkles, Fog } from "@react-three/drei";

export const ImmersiveScene = () => {
  return (
    <div className="fixed inset-0 -z-20 bg-surface">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, stencil: false, depth: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#03000A"]} />
          <fog attach="fog" args={["#0a0018", 20, 60]} />

          {/* ── Ambient Purple-Gold Lighting ── */}
          <ambientLight intensity={0.3} color="#200840" />

          {/* Hemisphere: purple sky, gold ground */}
          <hemisphereLight
            color="#7C3AED"
            groundColor="#D4AF37"
            intensity={0.8}
          />

          {/* Key light — warm gold from front-top */}
          <spotLight
            position={[15, 20, 12]}
            angle={0.25}
            penumbra={1}
            intensity={3}
            color="#F59E0B"
            castShadow={false}
          />

          {/* Rim light — cool purple from back-left */}
          <pointLight position={[-15, 5, -10]} color="#9333EA" intensity={2.5} />

          {/* Fill light — violet from right */}
          <pointLight position={[12, -5, 5]} color="#A855F7" intensity={1.5} />

          {/* Under light — amber from below */}
          <pointLight position={[0, -10, 0]} color="#D4AF37" intensity={1.2} />

          {/* Center glow */}
          <pointLight position={[0, 2, 5]} color="#EDE9FE" intensity={0.6} />

          {/* ── Animated Wave Background ── */}
          <AnimatedSoundWaveBackground />

          {/* ── Main Instruments ── */}
          <group position={[0, -2, 0]}>
            <Veena3D />
            <SoundWaveRibbon />
          </group>

          {/* ── 50+ Floating Notes ── */}
          <FloatingNotes />

          {/* ── Gold Sparkle Layer ── */}
          <Sparkles
            count={300}
            scale={35}
            size={1.8}
            speed={0.3}
            color="#D4AF37"
            opacity={0.35}
          />

          {/* ── Purple Sparkle Layer ── */}
          <Sparkles
            count={150}
            scale={28}
            size={1.2}
            speed={0.5}
            color="#9333EA"
            opacity={0.2}
          />

          <Environment preset="night" />
        </Suspense>
      </Canvas>

      {/* ── Immersive CSS Overlays ── */}
      {/* Top vignette — deep purple */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0018]/60 via-transparent to-[#050505] pointer-events-none" />

      {/* Radial purple glow at center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(124,58,237,0.2)_0%,transparent_60%)] pointer-events-none" />

      {/* Gold halo bottom-left */}
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-[radial-gradient(ellipse_at_0%_100%,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Violet halo top-right */}
      <div className="absolute top-0 right-0 w-[30vw] h-[30vh] bg-[radial-gradient(ellipse_at_100%_0%,rgba(167,139,250,0.1)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
};
