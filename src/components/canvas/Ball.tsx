import React, { Suspense, Component, ErrorInfo, ReactNode, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import CanvasLoader from "../Loader";

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class BallErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Ball component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI - simple colored sphere
      return (
        <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[0, 0, 0.05]} />
          <mesh castShadow receiveShadow scale={2.75}>
            <icosahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color='#915EFF'
              polygonOffset
              polygonOffsetFactor={-5}
              flatShading
            />
          </mesh>
        </Float>
      );
    }

    return this.props.children;
  }
}

interface BallProps {
  imgUrl: string;
}

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  
  // Validate the image URL
  const isValidUrl = useCallback((url: string) => {
    try {
      return url && typeof url === 'string' && url.trim() !== '';
    } catch {
      return false;
    }
  }, []);
  
  // If URL is invalid, return fallback immediately
  if (!isValidUrl(imgUrl)) {
    console.warn('Invalid image URL provided:', imgUrl);
    return (
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 0, 0.05]} />
        <mesh castShadow receiveShadow scale={2.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color='#915EFF'
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
        </mesh>
      </Float>
    );
  }
  
  // Use useTexture with proper signature (only 1-2 arguments allowed)
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
          />
        )}
      </mesh>
    </Float>
  );
};

interface BallCanvasProps {
  icon: string;
}

const BallCanvas: React.FC<BallCanvasProps> = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <BallErrorBoundary>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} />
        </BallErrorBoundary>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;