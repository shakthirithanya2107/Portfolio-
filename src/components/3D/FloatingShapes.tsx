import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface FloatingShapeProps {
    position: [number, number, number];
    color: string;
    speed?: number;
}

export function FloatingCube({ position, color, speed = 1 }: FloatingShapeProps) {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01 * speed;
            meshRef.current.rotation.y += 0.01 * speed;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>
    );
}

export function FloatingSphere({ position, color, speed = 1 }: FloatingShapeProps) {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005 * speed;
            meshRef.current.rotation.y += 0.005 * speed;
            meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.4;
            meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.6, 32, 32]} />
            <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </mesh>
    );
}

export function FloatingTorus({ position, color, speed = 1 }: FloatingShapeProps) {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.008 * speed;
            meshRef.current.rotation.z += 0.008 * speed;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 1.2) * 0.35;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <torusGeometry args={[0.5, 0.2, 16, 100]} />
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.2} />
        </mesh>
    );
}

export function FloatingOctahedron({ position, color, speed = 1 }: FloatingShapeProps) {
    const meshRef = useRef<Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.012 * speed;
            meshRef.current.rotation.y += 0.012 * speed;
            meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed * 0.8) * 0.3;
            meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * speed * 0.6) * 0.15;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[0.7]} />
            <meshStandardMaterial color={color} metalness={0.4} roughness={0.3} />
        </mesh>
    );
}
