import * as Three from 'three'

import vertexShader from '../../shader/particle-view-vertex.glsl'
import fragmentShader from '../../shader/particle-view-fragment.glsl'

export default class ParticleView {
  constructor (size, particleModel) {
    this.bufScene = new Three.Scene()
    this.bufCamera = new Three.Camera()
    this.uniforms = {
      particleTexture: { type: 't', value: particleModel.texture },
      particleTextureSize: { type: 'i', value: particleModel.textureSize }
    }
    this.shaderMaterial = this.allocateShader()
    this.particleModel = particleModel
    this.allocateParticles()

    this.renderTarget = this.allocateRenderTarget(size)
  }

  allocateShader () {
    return new Three.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    })
  }

  allocateRenderTarget (size) {
    return new Three.WebGLRenderTarget(size, size, {
      minFilter: Three.NearestFilter,
      magFilter: Three.NearestFilter
    })
  }

  allocateParticles () {
    const verticesBase = []
    for (let i = 0; i < this.particleModel.numParticles; i++) {
      const x = i
      const y = 0
      const z = 0
      verticesBase.push(x, y, z)
    }
    const vertices = new Float32Array(verticesBase)
    const geometry = new Three.BufferGeometry()
    geometry.addAttribute('position', new Three.BufferAttribute(vertices, 3))
    const points = new Three.Points(geometry, this.shaderMaterial)
    points.matrixAutoUpdate = true
    this.bufScene = new Three.Scene()
    this.bufScene.add(points)
  }

  render (renderer) {
    this.updateUniforms()
    renderer.render(this.bufScene, this.bufCamera, this.renderTarget)
  }

  updateUniforms () {
    this.uniforms.particleTexture.value = this.particleModel.texture
  }

  get texture () {
    return this.renderTarget.texture
  }
}
