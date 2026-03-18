"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { accessories, baseStyles, bodyBases, outfitThemes, sizeOptions } from "@/data/figure-options";
import type { FigureConfig } from "@/types/figure";

type FigureCanvasProps = {
  config: FigureConfig;
};

function FigureModel({ config }: FigureCanvasProps) {
  const body = bodyBases.find((item) => item.id === config.bodyBase) ?? bodyBases[0];
  const outfit = outfitThemes.find((item) => item.id === config.outfitTheme) ?? outfitThemes[0];
  const base = baseStyles.find((item) => item.id === config.baseStyle) ?? baseStyles[0];
  const size = sizeOptions.find((item) => item.id === config.size) ?? sizeOptions[1];
  const selectedAccessories = accessories.filter((item) => config.accessories.includes(item.id)).slice(0, 3);

  const scaleFactor = useMemo(() => {
    switch (size.id) {
      case "6cm":
        return 0.85;
      case "8cm":
        return 1;
      case "10cm":
        return 1.15;
      case "12cm":
        return 1.28;
      default:
        return 1;
    }
  }, [size.id]);

  const outfitColor = config.outfitColor || outfit.accent;

  return (
    <group scale={scaleFactor}>
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.24, 0]} receiveShadow>
        <cylinderGeometry args={[1.38, base.id === "story" ? 1.78 : 1.45, base.id === "premium" ? 0.34 : 0.24, 48]} />
        <meshStandardMaterial color={base.color} metalness={0.18} roughness={0.72} />
      </mesh>

      <mesh castShadow position={[0, 0.58, 0]}>
        {body.silhouette === "rounded" ? (
          <capsuleGeometry args={[0.52, 1.18, 10, 18]} />
        ) : (
          <boxGeometry args={[1.02, 1.8, 0.68]} />
        )}
        <meshStandardMaterial color={body.accent} metalness={0.08} roughness={0.78} />
      </mesh>

      <mesh castShadow position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.56, 36, 36]} />
        <meshStandardMaterial color="#f0d0b5" roughness={0.94} />
      </mesh>

      <mesh castShadow position={[0, 0.72, 0.35]}>
        <boxGeometry args={[0.95, 1.18, 0.26]} />
        <meshStandardMaterial color={outfitColor} roughness={0.62} />
      </mesh>

      <mesh castShadow position={[-0.72, 0.7, 0]}>
        <capsuleGeometry args={[0.13, 0.9, 6, 10]} />
        <meshStandardMaterial color={outfitColor} roughness={0.64} />
      </mesh>
      <mesh castShadow position={[0.72, 0.7, 0]}>
        <capsuleGeometry args={[0.13, 0.9, 6, 10]} />
        <meshStandardMaterial color={outfitColor} roughness={0.64} />
      </mesh>

      <mesh castShadow position={[-0.28, -0.48, 0]}>
        <capsuleGeometry args={[0.16, 1.05, 6, 10]} />
        <meshStandardMaterial color={outfitColor} roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0.28, -0.48, 0]}>
        <capsuleGeometry args={[0.16, 1.05, 6, 10]} />
        <meshStandardMaterial color={outfitColor} roughness={0.7} />
      </mesh>

      {selectedAccessories.map((item, index) => {
        const positions: [number, number, number][] = [
          [-1.18, 0.42, 0.12],
          [1.14, 0.15, 0.08],
          [0.02, -0.72, 0.82],
        ];

        return (
          <mesh key={item.id} castShadow position={positions[index]}>
            {item.id === "soccer-ball" ? (
              <sphereGeometry args={[0.22, 24, 24]} />
            ) : item.id === "laptop" ? (
              <boxGeometry args={[0.44, 0.08, 0.3]} />
            ) : item.id === "balloons" ? (
              <sphereGeometry args={[0.24, 24, 24]} />
            ) : (
              <boxGeometry args={[0.24, 0.32, 0.24]} />
            )}
            <meshStandardMaterial color={item.color} metalness={0.12} roughness={0.55} />
          </mesh>
        );
      })}
    </group>
  );
}

export function FigureCanvas({ config }: FigureCanvasProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.2, 4.8], fov: 38 }}
      dpr={[1, 1.6]}
      className="h-full w-full"
    >
      <color attach="background" args={["#16110f"]} />
      <fog attach="fog" args={["#16110f", 5, 10]} />
      <ambientLight intensity={1.4} />
      <directionalLight
        castShadow
        position={[4, 6, 4]}
        intensity={1.8}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight position={[-4, 6, 2]} intensity={1.1} angle={0.3} penumbra={0.5} />
      <FigureModel config={config} />
      <OrbitControls enablePan={false} minDistance={4} maxDistance={8} maxPolarAngle={Math.PI / 2.05} />
    </Canvas>
  );
}
