import * as Three from 'three'

import vertexShader from '../../shader/particle-model-vertex.glsl'
import fragmentShader from '../../shader/particle-model-fragment.glsl'

export default class ParticleModel {
  constructor (size) {
    this.size = size
    this.bufScene = new Three.Scene()
    const geometry = new Three.PlaneGeometry(size, size)
    this.uniforms = {
      prevTexture: { type: 't', value: null },
      textureSize: { type: 'i', value: size }
    }
    const shaderMaterial = this.allocateShader()
    const mesh = new Three.Mesh(geometry, shaderMaterial)
    this.bufScene.add(mesh)
    this.bufCamera = new Three.Camera()
    this.numRenderTargets = 2
    this.renderTargetArray = []
    this.renderTargetArray[0] = this.allocateRenderTarget(size)
    this.renderTargetArray[1] = this.allocateRenderTarget(size)
    this.renderTargetIndex = 0

    this.uniforms.prevTexture.value = this.allocateDataTexture()
  }

  allocateRenderTarget (size) {
    return new Three.WebGLRenderTarget(size, size,
      {
        minFilter: Three.NearestFilter,
        magFilter: Three.NearestFilter,
      })
  }

  allocateShader () {
    return new Three.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    })
  }

  allocateDataTexture () {
    const data = new Uint8Array(this.size * this.size * 4)
    for (let i = 0; i < this.size * this.size; i++) {
      const index = i * 4
      data[index] = 0  // r
      data[index + 1] = 0  // g
      data[index + 2] = 0  // b
      data[index + 3] = 0  // a
    }
    data[0] = 255
    const texture = new Three.DataTexture(data, this.size,
      this.size, Three.RGBAFormat, Three.UnsignedByteType)
    texture.needsUpdate = true
    return texture
  }

  render (renderer) {
    this.shiftRenderTarget()
    renderer.render(this.bufScene, this.bufCamera, this.renderTarget)
    this.updateUniforms()
  }

  updateUniforms () {
    this.uniforms.prevTexture.value = this.renderTarget.texture
  }

  shiftRenderTarget () {
    this.renderTargetIndex++
    if (this.renderTargetIndex >= this.numRenderTargets) {
      this.renderTargetIndex = 0
    }
  }

  get renderTarget () {
    return this.renderTargetArray[this.renderTargetIndex]
  }
}
