import * as Three from 'three'

export default class App {
  constructor() {
    const geometry = new Three.BoxGeometry(100, 100, 100)
    const material = new Three.MeshBasicMaterial({ color: 0x00ff00 })
    this.appMesh = new Three.Mesh(geometry, material)
  }

  render(renderer) {
    this.appMesh.rotation.x += 0.1
    this.appMesh.rotation.y += 0.1
  }

  get mesh() {
    return this.appMesh
  }
}
