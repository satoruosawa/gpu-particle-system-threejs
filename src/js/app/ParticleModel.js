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
    uniforms.prevTexture.value = this.allocateDataTexture(textureSize)
  }

  allocateDataTexture (textureSize) {
    const data = new Float32Array(textureSize * textureSize * 4)
    for (let i = 0; i < textureSize * textureSize; i++) {
      const index = i * 4
      data[index] = 0 // red
      data[index + 1] = 0 // green
      data[index + 2] = 0 // blue
      data[index + 3] = 0 // alpha
    }
    data[0] = 0
    data[2] = 0.002
    const texture = new Three.DataTexture(
      data, textureSize, textureSize, Three.RGBAFormat, Three.FloatType
    )
    texture.needsUpdate = true
    return texture
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

  get numParticles () {
    return 1
  }
}
