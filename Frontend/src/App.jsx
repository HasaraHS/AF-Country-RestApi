import React, { useEffect, useRef } from 'react'
import Globe from 'react-globe.gl'
import * as THREE from 'three'

const World = () => {
  const globeEl = useRef()

  useEffect(() => {
    const globe = globeEl.current

    if (!globe) return

    // Auto-rotate the globe
    globe.controls().autoRotate = true
    globe.controls().autoRotateSpeed = 0.35

    // Add animated clouds
    const CLOUDS_IMG_URL = '/clouds.png' // ensure this image is inside /public folder
    const CLOUDS_ALT = 0.004
    const CLOUDS_ROTATION_SPEED = -0.006 // degrees per frame

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      )
      globe.scene().add(clouds)

      const rotateClouds = () => {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180
        requestAnimationFrame(rotateClouds)
      }
      rotateClouds()
    })
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0 }}>
      <Globe
        ref={globeEl}
        animateIn={false}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
      />
    </div>
  )
}

export default World
