'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

const FoodItems = () => {
  const models = [
    '/models/food1.glb',
    '/models/food2.glb',
    '/models/utensils.glb'
  ].map((model) => {
    const { scene } = useGLTF(model);
    return scene;
  });

  return (
    <>
      {models.map((model, idx) => (
        <primitive 
          key={idx}
          object={model}
          position={[
            Math.sin(Date.now() / 1000 + idx) * 5,
            Math.cos(Date.now() / 1000 + idx) * 3,
            -10 + idx * 2
          ]}
          rotation={[0, Date.now() / 2000 + idx, 0]}
          scale={0.5}
        />
      ))}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

export default function FloatingFood() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <Suspense fallback={null}>
        <FoodItems />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
}