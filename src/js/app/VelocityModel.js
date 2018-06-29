import * as Three from 'three'

import TexturePass from './TexturePass'
import vertexShader from '../../shader/velocity-model-vertex.glsl'
import fragmentShader from '../../shader/velocity-model-fragment.glsl'
import * as Random from '../module/Random'

export default class VelocityModel extends TexturePass {
  constructor (textureSize, numParticles) {
    const uniforms = {
      prevVelocityTexture: { type: 't', value: null },
      prevPositionTexture: { type: 't', value: null },
      textureSize: { type: 'i', value: textureSize }
    }
    const shader = { uniforms, vertexShader, fragmentShader }
    super(textureSize, shader, { multipleRenderTargets: true })
    this.bufScene_.add(this.allocateMesh(textureSize, this.shaderMaterial_))
    this.numParticles = numParticles
    this.prevVelocityTexture_ = this.allocateVelocityTexture(textureSize)
    this.positionModel = null
  }

  allocateVelocityTexture (textureSize) {
    const data = new Float32Array(textureSize * textureSize * 4).fill(0)
    for (let i = 0; i < this.numParticles; i++) {
      const index = i * 4
      data[index] = Random.arbitrary(-0.001, 0.001) // vx
      data[index + 1] = Random.arbitrary(-0.001, 0.001) // vy
      data[index + 2] = Random.arbitrary(-0.001, 0.001) // vz
      data[index + 3] = 0
    }
    const texture = new Three.DataTexture(
      data, textureSize, textureSize, Three.RGBAFormat, Three.FloatType
    )
    texture.needsUpdate = true
    return texture
  }

  render (renderer) {
    this.updateUniforms()
    super.shiftRenderTarget()
    super.render(renderer)
    this.prevVelocityTexture_ = this.texture
  }

  updateUniforms () {
    const uniforms = this.shaderMaterial_.uniforms
    uniforms.prevVelocityTexture.value = this.prevVelocityTexture_
    uniforms.prevPositionTexture.value = this.positionModel.texture
  }
}
