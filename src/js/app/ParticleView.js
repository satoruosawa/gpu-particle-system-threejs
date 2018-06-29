import * as Three from 'three'

import TexturePass from './TexturePass'
import vertexShader from '../../shader/particle-view-vertex.glsl'
import fragmentShader from '../../shader/particle-view-fragment.glsl'

export default class ParticleView extends TexturePass {
  constructor (particleModel) {
    const uniforms = {
      particleTexture: { type: 't', value: particleModel.texture },
      particleTextureSize: { type: 'i', value: particleModel.textureSize.width }
    }
    const shader = {
      transparent: true,
      uniforms,
      vertexShader,
      fragmentShader
    }
    super(shader)
    this.bufScene_.add(
      this.allocatePoints(particleModel.numParticles, this.shaderMaterial_)
    )
    this.particleModel_ = particleModel
    this.bufCamera_ = new Three.PerspectiveCamera(
      30, window.innerWidth / window.innerHeight, 0.01, 200
    )
    this.bufCamera_.position.z = 1
  }

  allocatePoints (numPoints, material) {
    const data = new Float32Array(numPoints * 3).fill(0)
    for (let i = 0; i < numPoints; i++) {
      const index = i * 3
      data[index] = i // x
      data[index + 1] = 0 // y
      data[index + 2] = 0 // z
    }
    const geometry = new Three.BufferGeometry()
    geometry.addAttribute('position', new Three.BufferAttribute(data, 3))
    const points = new Three.Points(geometry, material)
    points.matrixAutoUpdate = true
    return points
  }

  render (renderer) {
    this.bufScene_.rotation.x += 0.001
    this.bufScene_.rotation.z += 0.001
    this.updateUniforms()
    super.render(renderer)
  }

  updateUniforms () {
    const uniforms = this.shaderMaterial_.uniforms
    uniforms.particleTexture.value = this.particleModel_.texture
  }

  get bufCamera () {
    return this.bufCamera_
  }

  get scene () {
    return this.bufScene_
  }
}
