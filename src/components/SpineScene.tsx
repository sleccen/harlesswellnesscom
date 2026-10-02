import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Component, Suspense, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const SPINE_URL = "/spine_collection_of_thunthu.glb";

function SpineModel() {
  const gltf = useLoader(GLTFLoader, SPINE_URL);
  const viewportWidth = useThree((state) => state.viewport.width);
  const group = useRef<THREE.Group>(null);
  const cloned = gltf.scene.clone(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  const maxAxis = Math.max(size.x, size.y, size.z) || 1;
  // Leave room at both ends, including when the banner narrows on mobile.
  const scale = (viewportWidth * 0.76) / (maxAxis * 2.4);
  const axisScale: [number, number, number] = [scale, scale, scale];
  if (size.x >= size.y && size.x >= size.z) axisScale[0] *= 2.4;
  else if (size.y >= size.z) axisScale[1] *= 2.4;
  else axisScale[2] *= 2.4;
  cloned.scale.set(...axisScale);
  cloned.position.set(-center.x * axisScale[0], -center.y * axisScale[1], -center.z * axisScale[2]);

  useFrame(() => {
    if (!group.current) return;
    const target = window.scrollY * 0.01;
    group.current.rotation.y += (target - group.current.rotation.y) * 0.12;
  });

  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <group ref={group}>
        <primitive object={cloned} />
      </group>
    </group>
  );
}

// If the GLB fails to load (404, network error, corrupt file), swallow the
// error and render nothing so the rest of the page keeps working.
class SpineErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: unknown) {
    console.warn("Spine model failed to load; hiding banner graphic.", error);
  }

  override render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function SpineScene() {
  return (
    <SpineErrorBoundary>
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
    </SpineErrorBoundary>
  );
}

export default SpineScene;
