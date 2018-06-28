import * as Three from 'three'

import TexturePass from './TexturePass'
import vertexShader from '../../shader/particle-model-vertex.glsl'
import fragmentShader from '../../shader/particle-model-fragment.glsl'

export default class ParticleModel extends TexturePass {
  constructor (textureSize, numParticles) {
    const uniforms = {
      prevTexture: { type: 't', value: null },
      textureSize: { type: 'i', value: textureSize }
    }
    const shader = { uniforms, vertexShader, fragmentShader }
    super(textureSize, shader, { multipleRenderTargets: true })
    this.numParticles = numParticles
    uniforms.prevTexture.value = this.allocateDataTexture(textureSize)
  }

  allocateDataTexture (textureSize) {
    const data = this.allocateClearData(textureSize)
    for (let i = 0; i < this.numParticles; i++) {
      const index = i * 4
      data[index] = this.getRandomArbitrary(-1, 1)
      data[index + 1] = this.getRandomArbitrary(-1, 1)
      data[index + 2] = this.getRandomArbitrary(-0.001, 0.001)
      data[index + 3] = this.getRandomArbitrary(-0.001, 0.001)
    }
    const texture = new Three.DataTexture(
      data, textureSize, textureSize, Three.RGBAFormat, Three.FloatType
    )
    texture.needsUpdate = true
    return texture
  }

  allocateClearData(textureSize) {
    const data = new Float32Array(textureSize * textureSize * 4)
    for (let i = 0; i < textureSize * textureSize; i++) {
      const index = i * 4
      data[index] = 0 // red
      data[index + 1] = 0 // green
      data[index + 2] = 0 // blue
      data[index + 3] = 0 // alpha
    }
    return data
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
