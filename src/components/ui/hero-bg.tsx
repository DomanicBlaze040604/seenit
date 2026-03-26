"use client"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { EffectComposer, RenderPass, UnrealBloomPass } from "three-stdlib"

export default function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const w = canvas.clientWidth
    const h = canvas.clientHeight

    // ── Scene ──
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x040c1a, 0.00025)

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 2000)
    camera.position.set(0, 20, 100)

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.6

    // ── Post-processing bloom ──
    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    const bloom = new UnrealBloomPass(new THREE.Vector2(w, h), 0.9, 0.4, 0.85)
    composer.addPass(bloom)

    // ═══════════ STARFIELD ═══════════
    const starLayers: THREE.Points[] = []
    const makeStars = (count: number, spread: number, layer: number) => {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      const col = new Float32Array(count * 3)
      const sizes = new Float32Array(count)

      for (let i = 0; i < count; i++) {
        const r = spread * 0.5 + Math.random() * spread
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i * 3 + 2] = r * Math.cos(phi)

        const isGold = Math.random() < 0.18
        if (isGold) {
          col[i * 3] = 1.0; col[i * 3 + 1] = 0.84; col[i * 3 + 2] = 0.0
        } else {
          const t = Math.random()
          col[i * 3]     = 0.08 + t * 0.35
          col[i * 3 + 1] = 0.3  + t * 0.4
          col[i * 3 + 2] = 0.8  + t * 0.2
        }
        sizes[i] = Math.random() * 2.5 + 0.5
      }

      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
      geo.setAttribute("color", new THREE.BufferAttribute(col, 3))
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 p = position;
            float a = time * 0.05 * (1.0 - depth * 0.3);
            mat2 rot = mat2(cos(a), -sin(a), sin(a), cos(a));
            p.xy = rot * p.xy;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if(d > 0.5) discard;
            float a = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, a);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const pts = new THREE.Points(geo, mat)
      scene.add(pts)
      starLayers.push(pts)
    }

    makeStars(4000, 600, 0)
    makeStars(2500, 900, 1)
    makeStars(1500, 1400, 2)

    // ═══════════ NEBULA ═══════════
    const nebGeo = new THREE.PlaneGeometry(6000, 3500, 80, 80)
    const nebMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        c1: { value: new THREE.Color(0x0033ff) },
        c2: { value: new THREE.Color(0xffd700) },
        opacity: { value: 0.25 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElev;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 p = position;
          float elev = sin(p.x * 0.005 + time) * cos(p.y * 0.005 + time) * 30.0;
          p.z += elev;
          vElev = elev;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 c1, c2;
        uniform float opacity, time;
        varying vec2 vUv;
        varying float vElev;
        void main() {
          float mx = sin(vUv.x * 8.0 + time) * cos(vUv.y * 8.0 + time);
          vec3 col = mix(c1, c2, mx * 0.5 + 0.5);
          float a = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          a += vElev * 0.003;
          gl_FragColor = vec4(col, max(a, 0.0));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const nebula = new THREE.Mesh(nebGeo, nebMat)
    nebula.position.z = -900
    scene.add(nebula)

    // ═══════════ MOUNTAIN SILHOUETTES ═══════════
    const mountainLayers = [
      { dist: -50,  height: 55,  color: 0x0a1225, opacity: 1 },
      { dist: -100, height: 75,  color: 0x0d1a35, opacity: 0.85 },
      { dist: -150, height: 95,  color: 0x0f2855, opacity: 0.6 },
    ]
    mountainLayers.forEach(layer => {
      const pts: THREE.Vector2[] = []
      const segs = 60
      for (let i = 0; i <= segs; i++) {
        const x = (i / segs - 0.5) * 1200
        const y = Math.sin(i * 0.12) * layer.height
              + Math.sin(i * 0.05) * layer.height * 0.5
              + Math.random() * layer.height * 0.15 - 100
        pts.push(new THREE.Vector2(x, y))
      }
      pts.push(new THREE.Vector2(600, -400))
      pts.push(new THREE.Vector2(-600, -400))

      const shape = new THREE.Shape(pts)
      const geo = new THREE.ShapeGeometry(shape)
      const mat = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.z = layer.dist
      mesh.position.y = -60
      scene.add(mesh)
    })

    // ═══════════ ATMOSPHERE GLOW ═══════════
    const atmGeo = new THREE.SphereGeometry(550, 32, 32)
    const atmMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform float time;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.,0.,1.)), 2.0);
          vec3 atm = mix(vec3(0.09, 0.28, 0.8), vec3(1.0, 0.84, 0.0), intensity * 0.3);
          atm *= intensity;
          float pulse = sin(time * 1.5) * 0.08 + 0.92;
          gl_FragColor = vec4(atm * pulse, intensity * 0.2);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    })
    scene.add(new THREE.Mesh(atmGeo, atmMat))

    // ═══════════ FLOATING GOLD DUST ═══════════
    const dustCount = 400
    const dustGeo = new THREE.BufferGeometry()
    const dustPos = new Float32Array(dustCount * 3)
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3]     = (Math.random() - 0.5) * 250
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 120
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 120 + 30
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3))
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
      color: 0xffd700, size: 0.7, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }))
    scene.add(dust)

    // ═══════════ SMOOTH CAMERA STATE ═══════════
    const smooth = { x: 0, y: 20, z: 100 }

    // ═══════════ ANIMATE ═══════════
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Update star uniforms
      starLayers.forEach(s => {
        (s.material as THREE.ShaderMaterial).uniforms.time.value = t
      })
      nebMat.uniforms.time.value = t * 0.4
      atmMat.uniforms.time.value = t

      // Dust rotation
      dust.rotation.y = t * 0.04
      dust.rotation.x = Math.sin(t * 0.08) * 0.06

      // Mouse-reactive + floating camera
      const targetX = mouseRef.current.x * 15
      const targetY = 20 + mouseRef.current.y * -8
      smooth.x += (targetX - smooth.x) * 0.03
      smooth.y += (targetY - smooth.y) * 0.03

      camera.position.x = smooth.x + Math.sin(t * 0.1) * 3
      camera.position.y = smooth.y + Math.cos(t * 0.15) * 2
      camera.position.z = 100
      camera.lookAt(0, 10, -600)

      composer.render()
    }
    animate()

    // ── Mouse tracking ──
    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("mousemove", onMouse)

    // ── Resize ──
    const onResize = () => {
      if (!canvas) return
      const cw = canvas.clientWidth
      const ch = canvas.clientHeight
      camera.aspect = cw / ch
      camera.updateProjectionMatrix()
      renderer.setSize(cw, ch)
      composer.setSize(cw, ch)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("mousemove", onMouse)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  )
}
