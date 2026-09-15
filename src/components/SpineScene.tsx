import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import spineAsset from "@/assets/spine.glb.asset.json";

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
    cloned.position.sub(center);
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxAxis;
    cloned.scale.setScalar(scale);
    // stretch along the model's longest axis so the spine spans the banner
    const stretch = 1.9;
    if (size.x >= size.y && size.x >= size.z) cloned.scale.x *= stretch;
    else if (size.y >= size.z) cloned.scale.y *= stretch;
    else cloned.scale.z *= stretch;
    scene.current = cloned;
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
      camera={{ position: [0, 0, 3.4], fov: 60 }}
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
