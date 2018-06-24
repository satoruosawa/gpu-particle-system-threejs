import * as Three from 'three'

import TexturePass from './TexturePass'
import vertexShader from '../../shader/particle-model-vertex.glsl'
import fragmentShader from '../../shader/particle-model-fragment.glsl'

export default class ParticleModel extends TexturePass {
  constructor (textureSize) {
    const uniforms = {
      prevTexture: { type: 't', value: null },
      textureSize: { type: 'i', value: textureSize }
    }
    const shader = { uniforms, vertexShader, fragmentShader }
    super(textureSize, shader, { isMultipleRenderTargets: true })
    this.numParticles = 10000 // should be less than textureSize * textureSize
    uniforms.prevTexture.value = this.allocateDataTexture(textureSize)
  }

  allocateDataTexture (textureSize) {
    const data = new Float32Array(textureSize * textureSize * 4)
    for (let i = 0; i < textureSize * textureSize; i++) {
      const index = i * 4
      data[index] = this.getRandomArbitrary(-1, 1) // red
      data[index + 1] = this.getRandomArbitrary(-1, 1) // green
      data[index + 2] = this.getRandomArbitrary(-0.002, 0.002) // blue
      data[index + 3] = this.getRandomArbitrary(-0.002, 0.002) // alpha
    }
    const texture = new Three.DataTexture(
      data, textureSize, textureSize, Three.RGBAFormat, Three.FloatType
    )
    texture.needsUpdate = true
    return texture
  }

  getRandomArbitrary (min, max) {
    return Math.random() * (max - min) + min
  }
  render (renderer) {
    super.shiftRenderTarget()
    super.render(renderer)
    this.updateUniforms()
  }

  updateUniforms () {
    const uniforms = this.shaderMaterial_.uniforms
    uniforms.prevTexture.value = this.texture
  }
}
