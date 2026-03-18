"use client";

import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
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
  const baseHeight = base.id === "premium" ? 0.34 : 0.24;
  const baseRadius = base.id === "story" ? 1.78 : 1.45;

  return (
    <Float speed={1.2} rotationIntensity={0.16} floatIntensity={0.18}>
      <group scale={scaleFactor}>
        <mesh rotation-x={-Math.PI / 2} position={[0, -1.24, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.38, baseRadius, baseHeight, 64]} />
          <meshPhysicalMaterial color={base.color} metalness={0.18} roughness={0.48} clearcoat={0.36} />
        </mesh>

        <mesh rotation-x={-Math.PI / 2} position={[0, -1.02, 0]} receiveShadow>
          <cylinderGeometry args={[1.02, 1.02, 0.02, 48]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>

        <mesh castShadow position={[0, 0.58, 0]}>
          {body.silhouette === "rounded" ? (
            <capsuleGeometry args={[0.52, 1.18, 10, 18]} />
          ) : (
            <boxGeometry args={[1.02, 1.8, 0.68]} />
          )}
          <meshPhysicalMaterial color={body.accent} metalness={0.08} roughness={0.72} clearcoat={0.1} />
        </mesh>

        <mesh castShadow position={[0, 1.58, 0]}>
          <sphereGeometry args={[0.56, 36, 36]} />
          <meshPhysicalMaterial color="#f0d0b5" roughness={0.88} clearcoat={0.18} />
        </mesh>

        <mesh castShadow position={[0, 0.72, 0.35]}>
          <boxGeometry args={[0.95, 1.18, 0.26]} />
          <meshPhysicalMaterial color={outfitColor} roughness={0.52} clearcoat={0.24} />
        </mesh>

        <mesh castShadow position={[-0.72, 0.7, 0]}>
          <capsuleGeometry args={[0.13, 0.9, 6, 10]} />
          <meshPhysicalMaterial color={outfitColor} roughness={0.56} clearcoat={0.18} />
        </mesh>
        <mesh castShadow position={[0.72, 0.7, 0]}>
          <capsuleGeometry args={[0.13, 0.9, 6, 10]} />
          <meshPhysicalMaterial color={outfitColor} roughness={0.56} clearcoat={0.18} />
        </mesh>

        <mesh castShadow position={[-0.28, -0.48, 0]}>
          <capsuleGeometry args={[0.16, 1.05, 6, 10]} />
          <meshPhysicalMaterial color={outfitColor} roughness={0.6} clearcoat={0.16} />
        </mesh>
        <mesh castShadow position={[0.28, -0.48, 0]}>
          <capsuleGeometry args={[0.16, 1.05, 6, 10]} />
          <meshPhysicalMaterial color={outfitColor} roughness={0.6} clearcoat={0.16} />
        </mesh>

        {selectedAccessories.map((item, index) => {
          const positions: [number, number, number][] = [
            [-1.18, 0.42, 0.12],
            [1.14, 0.15, 0.08],
            [0.02, -0.72, 0.82],
          ];

          return (
            <Float key={item.id} speed={1.8 + index * 0.2} rotationIntensity={0.2} floatIntensity={0.12}>
              <mesh castShadow position={positions[index]}>
                {item.id === "soccer-ball" ? (
                  <sphereGeometry args={[0.22, 24, 24]} />
                ) : item.id === "laptop" ? (
                  <boxGeometry args={[0.44, 0.08, 0.3]} />
                ) : item.id === "balloons" ? (
                  <sphereGeometry args={[0.24, 24, 24]} />
                ) : (
                  <boxGeometry args={[0.24, 0.32, 0.24]} />
                )}
                <meshPhysicalMaterial color={item.color} metalness={0.12} roughness={0.42} clearcoat={0.22} />
              </mesh>
            </Float>
          );
        })}
      </group>
    </Float>
  );
}

export function FigureCanvas({ config }: FigureCanvasProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.1, 4.9], fov: 34 }}
      dpr={[1, 1.6]}
      className="h-[580px] w-full"
      style={{ touchAction: "none" }}
    >
      <color attach="background" args={["#121318"]} />
      <fog attach="fog" args={["#121318", 5.2, 10.2]} />

      <ambientLight intensity={1.25} />
      <hemisphereLight intensity={0.65} groundColor="#0f1014" color="#f5ecdf" />
      <directionalLight
        castShadow
        position={[4, 6, 4]}
        intensity={1.9}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight position={[-4, 6, 2]} intensity={1.2} angle={0.34} penumbra={0.6} color="#f8e6cf" />
      <pointLight position={[0, 2.4, 2.2]} intensity={0.45} color="#d8c2ff" />

      <mesh rotation-x={-Math.PI / 2} position={[0, -1.4, 0]}>
        <circleGeometry args={[2.6, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.035} />
      </mesh>

      <FigureModel config={config} />

      <ContactShadows
        position={[0, -1.38, 0]}
        opacity={0.32}
        scale={6}
        blur={2.4}
        far={4}
        resolution={512}
        color="#000000"
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={8}
        maxPolarAngle={Math.PI / 2.03}
        minPolarAngle={Math.PI / 3.4}
        autoRotate
        autoRotateSpeed={0.75}
      />
    </Canvas>
  );
}
