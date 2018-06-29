import * as Three from 'three'
import Controls from 'three-trackballcontrols'
import Stats from 'stats-js'

import App from './app/App'
import '../css/index.scss'

// stats
const stats = new Stats()
stats.domElement.style.position = 'absolute'
stats.domElement.style.left = '0px'
stats.domElement.style.top = '0px'
document.body.appendChild(stats.domElement)

// renderer
const renderer = new Three.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

if (!renderer.getContext().getExtension('OES_texture_float')) {
  window.alert('The WebGL implementation must support the respective extensions OES_texture_float')
}

// app
const app = new App()

// controls
const controls = new Controls(app.bufCamera, renderer.domElement)
controls.rotateSpeed = 5.0
controls.zoomSpeed = 2.2
controls.panSpeed = 1
controls.dynamicDampingFactor = 0.3

// animate
const animate = () => {
  window.requestAnimationFrame(animate)
  controls.update()
  app.render(renderer)
  stats.update()
}

animate()
