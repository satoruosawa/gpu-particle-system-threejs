import * as Three from 'three'
import ParticleModel from './ParticleModel'
import ParticleView from './ParticleView'

export default class App {
  constructor () {
    const size = 512
    const geometry = new Three.PlaneGeometry(size, size)
    const material = new Three.MeshBasicMaterial()
    this.appMesh = new Three.Mesh(geometry, material)

    this.particleModel = new ParticleModel(size)
    this.particleView = new ParticleView(size, this.particleModel)
    material.map = this.particleView.texture
  }

  render (renderer) {
    this.particleModel.render(renderer)
    this.particleView.render(renderer)
  }

  get mesh () {
    return this.appMesh
  }
}
