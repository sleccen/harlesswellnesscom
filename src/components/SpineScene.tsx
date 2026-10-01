import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import spineAsset from "@/assets/spine2.glb.asset.json";

function SpineModel() {
  const gltf = useLoader(GLTFLoader, spineAsset.url);
  const group = useRef<THREE.Group>(null);
  const scene = useRef<THREE.Object3D | null>(null);

  if (!scene.current) {
    const cloned = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.4 / maxAxis;
    // stretch along the model's longest axis so the spine spans the banner
    const stretch = 2.4;
    const axisScale: [number, number, number] = [scale, scale, scale];
    if (size.x >= size.y && size.x >= size.z) axisScale[0] *= stretch;
    else if (size.y >= size.z) axisScale[1] *= stretch;
    else axisScale[2] *= stretch;
    cloned.scale.set(axisScale[0], axisScale[1], axisScale[2]);
    // Center the model: per-axis offsets in world units (the model's own
    // origin can sit far away — this one is ~22 units off center).
    cloned.position.set(
      -center.x * axisScale[0],
      -center.y * axisScale[1],
      -center.z * axisScale[2],
    );
    scene.current = cloned;
    // The uploaded model ships with plain white materials — tint to the
    // Navy Trust palette: vertebrae in primary, discs a shade lighter.
    cloned.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const parentName = (mesh.parent?.name ?? "").toLowerCase();
      const isDisk = parentName.includes("disk");
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.color.set(isDisk ? 0x5a4a94 : 0x392962);
      mat.metalness = 0.15;
      mat.roughness = 0.45;
    });
  }

  useFrame(() => {
    if (!group.current) return;
    const target = window.scrollY * 0.01;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.12;
  });

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <group ref={group}>
        <primitive object={scene.current} />
      </group>
    </group>
  );
}

export function SpineScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 60 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[2, 3, 4]} intensity={1.6} />
      <directionalLight position={[-3, -2, -2]} intensity={0.5} />
      <Suspense fallback={null}>
        <SpineModel />
      </Suspense>
    </Canvas>
  );
}

export default SpineScene;
