import * as Three from 'three'

import vertexShader from '../../shader/particle-model-vertex.glsl'
import fragmentShader from '../../shader/particle-model-fragment.glsl'

export default class ParticleModel {
  constructor (textureSize) {
    this.textureSize = textureSize
    const geometry = new Three.PlaneBufferGeometry(textureSize, textureSize)
    this.uniforms_ = {
      prevTexture: { type: 't', value: null },
      textureSize: { type: 'i', value: textureSize }
    }
    const shader = {
      uniforms: this.uniforms_,
      vertexShader,
      fragmentShader
    }
    const shaderMaterial = new Three.ShaderMaterial(shader)
    const mesh = new Three.Mesh(geometry, shaderMaterial)
    this.bufScene_ = new Three.Scene()
    this.bufScene_.add(mesh)
    this.bufCamera_ = new Three.Camera()
    this.numRenderTargets_ = 2
    this.renderTargetArray_ = []
    this.renderTargetArray_[0] = this.allocateRenderTarget(textureSize)
    this.renderTargetArray_[1] = this.allocateRenderTarget(textureSize)
    this.renderTargetIndex_ = 0

    this.uniforms_.prevTexture.value = this.allocateDataTexture(textureSize)
  }

  allocateRenderTarget (textureSize) {
    return new Three.WebGLRenderTarget(textureSize, textureSize,
      {
        minFilter: Three.NearestFilter,
        magFilter: Three.NearestFilter,
        type: Three.FloatType
      })
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
    this.shiftRenderTarget()
    renderer.render(this.bufScene_, this.bufCamera_, this.renderTarget_)
    this.updateUniforms()
  }

  updateUniforms () {
    this.uniforms_.prevTexture.value = this.renderTarget_.texture
  }

  shiftRenderTarget () {
    this.renderTargetIndex_++
    if (this.renderTargetIndex_ >= this.numRenderTargets_) {
      this.renderTargetIndex_ = 0
    }
  }

  get renderTarget_ () {
    return this.renderTargetArray_[this.renderTargetIndex_]
  }

  get texture () {
    return this.renderTarget_.texture
  }

  get numParticles () {
    return 1
  }
}
