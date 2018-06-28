import * as Three from 'three'
import Stats from 'stats-js'

import App from './app/App'
import '../css/index.scss'

const stats = new Stats()

stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'
document.body.appendChild(stats.domElement)

// scene
const scene = new Three.Scene()

// camera
const camera = new Three.OrthographicCamera(
  window.innerWidth / -2, window.innerWidth / 2,
  window.innerHeight / 2, window.innerHeight / -2,
  -1000, 1000
)
camera.position.set(0, 0, 100)

// renderer
const renderer = new Three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

if (!renderer.getContext().getExtension('OES_texture_float')) {
  window.alert('The WebGL implementation must support the respective extensions OES_texture_float')
}

// app
const app = new App()
scene.add(app.mesh)

// animate
const animate = () => {
  window.requestAnimationFrame(animate)
  app.render(renderer)
  renderer.render(scene, camera)
  stats.update()
}

animate()
