import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { FloatingCube, FloatingSphere, FloatingTorus, FloatingOctahedron } from './FloatingShapes';

export function Scene3D() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-60">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#E6D9FF" />
                <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#FFD6E8" />

                {/* Floating Shapes */}
                <FloatingSphere position={[-3, 2, 0]} color="#FFD6E8" speed={0.8} />
                <FloatingCube position={[3, -1, -2]} color="#E6D9FF" speed={1.2} />
                <FloatingTorus position={[0, -2, -1]} color="#D9E8FF" speed={1} />
                <FloatingOctahedron position={[-2, -1, 1]} color="#D6F5E8" speed={0.9} />
                <FloatingSphere position={[2, 2, -3]} color="#FFE5D9" speed={1.1} />
                <FloatingCube position={[-1, 0, 2]} color="#FFF4D6" speed={0.7} />
                <FloatingTorus position={[1, 1, 1]} color="#FFD9D9" speed={1.3} />
                <FloatingOctahedron position={[0, 3, -2]} color="#E8D6FF" speed={0.85} />
            </Canvas>
        </div>
    );
}
