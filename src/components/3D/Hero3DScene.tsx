import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { AIBrain, CodeBlock, DataTorus, HoloOctahedron, GlowSphere, ParticleField } from './FloatingObjects';

export function Hero3DScene({ scrollY }: { scrollY: number }) {
    const cameraRef = useRef<any>();

    useEffect(() => {
        if (cameraRef.current) {
            // Scroll-driven camera movement
            const scrollFactor = scrollY / 1000;
            cameraRef.current.position.z = 8 - scrollFactor * 2;
            cameraRef.current.position.y = scrollFactor * 1.5;
        }
    }, [scrollY]);

    return (
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0">
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 8]} fov={50} />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#60A5FA" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A78BFA" />
                    <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={1} color="#F472B6" />

                    {/* Environment */}
                    <Environment preset="city" />

                    {/* 3D Objects */}
                    <AIBrain position={[2, 1, 0]} />
                    <CodeBlock position={[-3, -1, -2]} />
                    <DataTorus position={[3, -2, -3]} />
                    <HoloOctahedron position={[-2, 2, -1]} />

                    {/* Glowing Spheres */}
                    <GlowSphere position={[4, 0, -4]} color="#60A5FA" />
                    <GlowSphere position={[-4, -1, -2]} color="#A78BFA" />
                    <GlowSphere position={[1, 3, -3]} color="#22D3EE" />

                    {/* Particle Field */}
                    <ParticleField />

                    {/* Controls (disabled for user, only for dev) */}
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
