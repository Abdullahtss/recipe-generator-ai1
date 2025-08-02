'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useState } from 'react';

function FoodModel({ modelPath, position, rotationOffset }: { 
  modelPath: string; 
  position: [number, number, number]; 
  rotationOffset: number;
}) {
  const { scene } = useGLTF(modelPath);
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(Date.now() / 2000 + rotationOffset);
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [rotationOffset]);
  
  return (
    <primitive 
      object={scene}
      position={position}
      rotation={[0, rotation, 0]}
      scale={0.5}
    />
  );
}

const FoodItems = () => {
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState<[number, number, number][]>([]);
  
  const models = [
    { path: '/models/food1.glb', offset: 0 },
    { path: '/models/food2.glb', offset: 1 },
    { path: '/models/utensils.glb', offset: 2 }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Calculate positions on client side only
    const updatePositions = () => {
      const newPositions = models.map((_, idx) => [
        Math.sin(Date.now() / 1000 + idx) * 5,
        Math.cos(Date.now() / 1000 + idx) * 3,
        -10 + idx * 2
      ] as [number, number, number]);
      setPositions(newPositions);
    };
    
    updatePositions();
    const interval = setInterval(updatePositions, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </>
    );
  }

  return (
    <>
      {models.map((model, idx) => (
        <FoodModel
          key={idx}
          modelPath={model.path}
          position={positions[idx] || [0, 0, -10 + idx * 2]}
          rotationOffset={model.offset}
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