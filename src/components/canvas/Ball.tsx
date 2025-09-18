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
      // Enhanced fallback UI
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
  imgUrl: string | null | undefined;
}

// Simple fallback ball component  
const FallbackBall: React.FC = () => (
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

const Ball: React.FC<BallProps> = ({ imgUrl }) => {
  // Validate the image URL
  const isValidUrl = useCallback((url: string | null | undefined): boolean => {
    try {
      // First check if url exists and is a string
      if (!url || typeof url !== 'string') {
        return false;
      }
      
      // Now safely call trim since we know url is a valid string
      const trimmedUrl = url.trim();
      
      // Check if trimmed URL is not empty and has valid format
      return trimmedUrl !== '' && 
             (trimmedUrl.startsWith('http') || 
              trimmedUrl.startsWith('/') || 
              trimmedUrl.startsWith('data:'));
    } catch (error) {
      console.warn('URL validation error:', error);
      return false;
    }
  }, []);
  
  // If URL is invalid, return fallback immediately
  if (!isValidUrl(imgUrl)) {
    console.warn('Invalid image URL provided:', imgUrl);
    return <FallbackBall />;
  }

  let texture = null;
  
  try {
    // Attempt to load texture - we know imgUrl is valid string at this point
    [texture] = useTexture([imgUrl as string]);
  } catch (error) {
    console.warn('Texture loading failed for:', imgUrl, error);
    return <FallbackBall />;
  }
  
  // If texture didn't load properly, show fallback
  if (!texture) {
    return <FallbackBall />;
  }

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
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={texture}
        />
      </mesh>
    </Float>
  );
};

interface BallCanvasProps {
  icon: string | null | undefined;
  enableRotation?: boolean;
}

const BallCanvas: React.FC<BallCanvasProps> = ({ icon, enableRotation = false }) => {
  // Add additional safety check for icon prop
  const safeIcon = icon || '';
  
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <BallErrorBoundary>
          <OrbitControls 
            enableZoom={false} 
            enableRotate={enableRotation}
            enablePan={false}
          />
          <Ball imgUrl={safeIcon} />
        </BallErrorBoundary>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;