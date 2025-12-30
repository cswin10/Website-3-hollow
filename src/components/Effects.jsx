import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

export default function Effects({ intensity = 1 }) {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5 * intensity}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration
        offset={new Vector2(0.0005 * intensity, 0.0005 * intensity)}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Vignette
        offset={0.3}
        darkness={0.7 * intensity}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={0.03 * intensity}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  );
}
