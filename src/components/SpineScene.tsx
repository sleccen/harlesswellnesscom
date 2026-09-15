import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import spineAsset from "@/assets/spine.glb.asset.json";

function SpineModel() {
  const { scene } = useThree();
  const [root] = useState(() => new THREE.Group());
  const spinner = useRef<THREE.Group | null>(null);

  useEffect(() => {
    root.rotation.set(0, 0, Math.PI / 2);
    const spin = new THREE.Group();
    spinner.current = spin;
    root.add(spin);

    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(2, 3, 4);
    const fill = new THREE.DirectionalLight(0xffffff, 0.5);
    fill.position.set(-3, -2, -2);
    scene.add(root, ambient, key, fill);

    let disposed = false;
    new GLTFLoader().load(spineAsset.url, (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.getSize(size);
      box.getCenter(center);
      model.position.sub(center);
      const maxAxis = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(3.6 / maxAxis);
      const stretch = 2.6;
      if (size.x >= size.y && size.x >= size.z) model.scale.x *= stretch;
      else if (size.y >= size.z) model.scale.y *= stretch;
      else model.scale.z *= stretch;
      spin.add(model);
    });

    return () => {
      disposed = true;
      scene.remove(root, ambient, key, fill);
    };
  }, [scene, root]);

  useFrame(() => {
    const spin = spinner.current;
    if (!spin) return;
    const target = window.scrollY * 0.01;
    spin.rotation.y += (target - spin.rotation.y) * 0.12;
  });

  return null;
}

export function SpineScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 60 }}
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: "none" }}
    >
      <SpineModel />
    </Canvas>
  );
}

export default SpineScene;
