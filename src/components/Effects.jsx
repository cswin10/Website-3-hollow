import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.7}
        luminanceSmoothing={0.9}
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
