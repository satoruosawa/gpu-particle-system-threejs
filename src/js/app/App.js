import * as Three from 'three'
import ParticleMap from './ParticleMap'

export default class App {
  constructor () {
    const size = 512
    const geometry = new Three.PlaneGeometry(size, size)
    const material = new Three.MeshBasicMaterial()
    this.appMesh = new Three.Mesh(geometry, material)

    this.particleMap = new ParticleMap(size)
    material.map = this.particleMap.renderTarget.texture
  }

  render (renderer) {
    this.particleMap.render(renderer)
  }

  get mesh () {
    return this.appMesh
  }
}
