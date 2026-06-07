"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

const SYMBOLS = ["♩", "♫", "♬", "♭", "♯", "𝄞", "♪", "𝄢", "𝄡"];
const COLORS_GOLD   = ["#D4AF37", "#F59E0B", "#FCD34D", "#FBBF24"];
const COLORS_PURPLE = ["#9333EA", "#A855F7", "#C084FC", "#7C3AED", "#E9D5FF"];

interface NoteData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  symbol: string;
  colorBase: string;
  colorTarget: string;
  phaseOffset: number;
  speed: number;
}

const MusicalNote = ({ data }: { data: NoteData }) => {
  const textRef = useRef<any>(null!);

  useFrame(({ clock }) => {
    if (!textRef.current) return;
    const t = clock.getElapsedTime() * data.speed + data.phaseOffset;

    // Cycle opacity: breathe between 0.15 and 0.65
    const opacity = 0.15 + (Math.sin(t) * 0.5 + 0.5) * 0.5;
    textRef.current.fillOpacity = opacity;

    // Color cycling between gold and purple families
    const lerp = (Math.sin(t * 0.3) * 0.5 + 0.5);
    const c1 = new THREE.Color(data.colorBase);
    const c2 = new THREE.Color(data.colorTarget);
    c1.lerp(c2, lerp);
    textRef.current.color = c1;
  });

  return (
    <Float
      speed={1.5 + Math.random() * 2}
      rotationIntensity={0.8 + Math.random()}
      floatIntensity={2 + Math.random() * 2}
    >
      <Text
        ref={textRef}
        position={data.position}
        rotation={data.rotation}
        scale={data.scale}
        color={data.colorBase}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.3}
        fontSize={1}
      >
        {data.symbol}
      </Text>
    </Float>
  );
};

export const FloatingNotes = () => {
  const notes = useMemo<NoteData[]>(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      const isGold = i % 2 === 0;
      return {
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 20 - 5,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          (Math.random() - 0.5) * 0.5,
        ] as [number, number, number],
        scale: 0.6 + Math.random() * 2.2,
        symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        colorBase: isGold
          ? COLORS_GOLD[Math.floor(Math.random() * COLORS_GOLD.length)]
          : COLORS_PURPLE[Math.floor(Math.random() * COLORS_PURPLE.length)],
        colorTarget: isGold
          ? COLORS_PURPLE[Math.floor(Math.random() * COLORS_PURPLE.length)]
          : COLORS_GOLD[Math.floor(Math.random() * COLORS_GOLD.length)],
        phaseOffset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
      };
    });
  }, []);

  return (
    <group>
      {notes.map((note, i) => (
        <MusicalNote key={i} data={note} />
      ))}
    </group>
  );
};
