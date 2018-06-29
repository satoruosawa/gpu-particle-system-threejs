import * as Three from 'three'

import TexturePass from './TexturePass'
import vertexShader from '../../shader/position-model-vertex.glsl'
import fragmentShader from '../../shader/position-model-fragment.glsl'

export default class PositionModel extends TexturePass {
  constructor (textureSize, numParticles) {
    const uniforms = {
      prevVelocityTexture: { type: 't', value: null },
      prevPositionTexture: { type: 't', value: null },
      textureSize: { type: 'i', value: textureSize }
    }
    const shader = { uniforms, vertexShader, fragmentShader }
    super(textureSize, shader, { multipleRenderTargets: true })
    this.numParticles = numParticles
    this.prevPositionTexture_ = this.allocatePositionTexture(textureSize)
    this.velocityModel = null
  }

  allocatePositionTexture (textureSize) {
    const data = this.allocateClearData(textureSize)
    for (let i = 0; i < this.numParticles; i++) {
      const index = i * 4
      data[index] = this.getRandomArbitrary(-1, 1) // x
      data[index + 1] = this.getRandomArbitrary(-1, 1) // y
      data[index + 2] = this.getRandomArbitrary(-1, 1) // z
      data[index + 3] = 0
    }
    const texture = new Three.DataTexture(
      data, textureSize, textureSize, Three.RGBAFormat, Three.FloatType
    )
    texture.needsUpdate = true
    return texture
  }

  allocateClearData (textureSize) {
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
    this.updateUniforms()
    super.shiftRenderTarget()
    super.render(renderer)
    this.prevPositionTexture_ = this.texture
  }

  updateUniforms () {
    const uniforms = this.shaderMaterial_.uniforms
    uniforms.prevVelocityTexture.value = this.velocityModel.texture
    uniforms.prevPositionTexture.value = this.prevPositionTexture_
  }
}
