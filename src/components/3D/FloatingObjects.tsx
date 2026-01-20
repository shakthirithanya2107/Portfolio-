import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Octahedron } from '@react-three/drei';
import * as THREE from 'three';

// Floating AI Brain
export function AIBrain({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color="#60A5FA"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

// Code Block Cube
export function CodeBlock({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.008;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <Box ref={meshRef} args={[1.2, 1.2, 1.2]} position={position}>
                <meshStandardMaterial
                    color="#A78BFA"
                    metalness={0.7}
                    roughness={0.3}
                    emissive="#A78BFA"
                    emissiveIntensity={0.2}
                />
            </Box>
        </Float>
    );
}

// Data Torus
export function DataTorus({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.z += 0.005;
        }
    });

    return (
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.6}>
            <Torus ref={meshRef} args={[1, 0.4, 16, 100]} position={position}>
                <meshStandardMaterial
                    color="#22D3EE"
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#22D3EE"
                    emissiveIntensity={0.3}
                />
            </Torus>
        </Float>
    );
}

// Holographic Octahedron
export function HoloOctahedron({ position }: { position: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
    });

    return (
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
            <Octahedron ref={meshRef} args={[1]} position={position}>
                <meshStandardMaterial
                    color="#F472B6"
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#F472B6"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.8}
                />
            </Octahedron>
        </Float>
    );
}

// Glowing Sphere
export function GlowSphere({ position, color }: { position: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <Float speed={3} rotationIntensity={0.2} floatIntensity={1}>
            <Sphere ref={meshRef} args={[0.5, 32, 32]} position={position}>
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.6}
                />
            </Sphere>
        </Float>
    );
}

// Particle Field
export function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null);
    const particleCount = 200;

    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y += 0.0005;
            particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#60A5FA"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}
