import * as Three from 'three'
import ParticleModel from './ParticleModel'

export default class App {
  constructor () {
    const size = 512
    const geometry = new Three.PlaneGeometry(size, size)
    const material = new Three.MeshBasicMaterial()
    this.appMesh = new Three.Mesh(geometry, material)

    this.particleModel = new ParticleModel(size)
    material.map = this.particleModel.renderTarget.texture
  }

  render (renderer) {
    this.particleModel.render(renderer)
  }

  get mesh () {
    return this.appMesh
  }
}
