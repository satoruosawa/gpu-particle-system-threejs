import * as Three from 'three'

import vertexShader from '../../shader/particle-model-vertex.glsl'
import fragmentShader from '../../shader/particle-model-fragment.glsl'

export default class ParticleModel {
  constructor (size) {
    this.size = size
    this.bufScene = new Three.Scene()
    const geometry = new Three.PlaneBufferGeometry(size, size)
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
        type: Three.FloatType
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
    const data = new Float32Array(this.size * this.size * 4)
    for (let i = 0; i < this.size * this.size; i++) {
      const index = i * 4
      data[index] = 0 // red
      data[index + 1] = 0 // green
      data[index + 2] = 0 // blue
      data[index + 3] = 0 // alpha
    }
    data[0] = 0
    data[2] = 0.002
    const texture = new Three.DataTexture(data, this.size,
      this.size, Three.RGBAFormat, Three.FloatType)
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

  get texture () {
    return this.renderTarget.texture
  }

  get textureSize () {
    return this.size
  }

  get numParticles () {
    return 1
  }
}
