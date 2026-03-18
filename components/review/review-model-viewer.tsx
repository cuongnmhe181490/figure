"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { FigureCanvas } from "@/components/configurator/figure-canvas";
import type { FigureConfig } from "@/types/figure";

type ReviewModelViewerProps = {
  config: FigureConfig;
  modelUrl?: string;
};

function UploadedModel({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1.8} position={[0, -1.15, 0]} />;
}

export function ReviewModelViewer({ config, modelUrl }: ReviewModelViewerProps) {
  if (!modelUrl) {
    return <FigureCanvas config={config} className="h-[560px] w-full" autoRotate={false} />;
  }

  return (
    <Canvas camera={{ position: [0, 1.2, 5.4], fov: 30 }} className="h-[560px] w-full" style={{ touchAction: "none" }}>
      <color attach="background" args={["#121318"]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 6, 4]} intensity={1.8} />
      <spotLight position={[-4, 6, 1]} intensity={1.1} angle={0.35} penumbra={0.7} color="#f8e6cf" />
      <Suspense fallback={null}>
        <UploadedModel modelUrl={modelUrl} />
        <Environment preset="studio" />
      </Suspense>
      <ContactShadows position={[0, -1.45, 0]} opacity={0.28} scale={7.2} blur={2.8} far={4.5} />
      <OrbitControls enableDamping dampingFactor={0.08} minDistance={3.5} maxDistance={9} />
    </Canvas>
  );
}
