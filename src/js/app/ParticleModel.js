import * as Three from 'three'

import vertexShader from '../../shader/particle-model-vertex.glsl'
import fragmentShader from '../../shader/particle-model-fragment.glsl'

export default class ParticleModel {
  constructor (size) {
    this.bufScene = new Three.Scene()
    const geometry = new Three.PlaneGeometry(size, size)
    this.uniforms = {
      prevTexture: { type: 't', value: null },
      textureSize: { type: 'f', value: size }
    }
    const shaderMaterial = this.allocShader()
    const mesh = new Three.Mesh(geometry, shaderMaterial)
    this.bufScene.add(mesh)
    this.bufCamera = new Three.Camera()
    this.numRenderTargets = 2
    this.renderTargetArray = []
    this.renderTargetArray[0] = new Three.WebGLRenderTarget(size, size)
    this.renderTargetArray[1] = new Three.WebGLRenderTarget(size, size)
    this.renderTargetIndex = 0
  }

  allocShader () {
    return new Three.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    })
  }

  render (renderer) {
    this.updateUniforms()
    this.shiftRenderTarget()
    renderer.render(this.bufScene, this.bufCamera, this.renderTarget)
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
