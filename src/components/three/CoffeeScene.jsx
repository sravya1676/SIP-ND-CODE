import { Float, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

function CupGroup() {
  const group = useRef();
  const beans = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ angle: (i / 14) * Math.PI * 2, radius: 1.6 + (i % 4) * 0.18, y: 0.25 + (i % 5) * 0.16 })), []);
  useFrame(({ pointer, clock }) => {
    if (!group.current) return;
    group.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.2;
    group.current.rotation.x = pointer.y * 0.08;
  });
  return (
    <group ref={group}>
      <mesh position={[0, -0.55, 0]} receiveShadow>
        <cylinderGeometry args={[1.35, 1.45, 0.14, 64]} />
        <meshStandardMaterial color="#E8D8C6" roughness={0.55} />
      </mesh>
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.78, 0.56, 1.05, 64, 1, true]} />
        <meshStandardMaterial color="#F7F2EA" roughness={0.32} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.08, 64]} />
        <meshStandardMaterial color="#3B2418" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[0.78, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.32, 0.055, 16, 48, Math.PI * 1.45]} />
        <meshStandardMaterial color="#F7F2EA" roughness={0.35} />
      </mesh>
      {beans.map((bean, index) => (
        <Float key={index} speed={1.2} rotationIntensity={0.8} floatIntensity={0.4}>
          <mesh castShadow position={[Math.cos(bean.angle) * bean.radius, bean.y, Math.sin(bean.angle) * bean.radius]} rotation={[0.8, bean.angle, 0.4]}>
            <capsuleGeometry args={[0.06, 0.18, 6, 12]} />
            <meshStandardMaterial color="#3B2418" roughness={0.6} />
          </mesh>
        </Float>
      ))}
      {[0, 1, 2].map((item) => (
        <Float key={item} speed={0.8 + item * 0.2} floatIntensity={0.3}>
          <mesh position={[item * 0.16 - 0.16, 1.0 + item * 0.15, 0]} rotation={[0, 0, item * 0.5]}>
            <torusGeometry args={[0.18 + item * 0.05, 0.012, 8, 40, Math.PI * 1.2]} />
            <meshStandardMaterial color="#C9795E" transparent opacity={0.28} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function CoffeeScene() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-white to-beige shadow-soft sm:h-[520px]">
      <Suspense fallback={<div className="grid h-full place-items-center text-coffee/60">Brewing the scene...</div>}>
        <Canvas shadows dpr={[1, 1.6]}>
          <PerspectiveCamera makeDefault position={[0, 1.1, 4]} fov={42} />
          <ambientLight intensity={1.2} />
          <directionalLight castShadow position={[3, 4, 3]} intensity={2} shadow-mapSize={[1024, 1024]} />
          <CoffeeSceneLights />
          <CupGroup />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.68, 0]} receiveShadow>
            <circleGeometry args={[3.2, 64]} />
            <meshStandardMaterial color="#F1C7B4" roughness={0.7} />
          </mesh>
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </Suspense>
    </div>
  );
}

function CoffeeSceneLights() {
  return <pointLight position={[-3, 2, 2]} color="#F1C7B4" intensity={3} />;
}
