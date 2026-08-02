/* ============================================
   ARJUN REALTY - Three.js WebGL Scenes
   Immersive 3D Interactive Backgrounds
   ============================================ */

'use strict';

/* === Hero Scene - Cinematic Warehouse Grid === */
class HeroScene {
    constructor() {
        this.canvas = document.getElementById('heroCanvas');
        if (!this.canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.clock = new THREE.Clock();
        this.isMobile = window.innerWidth < 768;

        this.init();
        this.addEventListeners();
        this.animate();
    }

    init() {
        this.camera.position.set(0, 12, 40);
        this.camera.lookAt(0, 2, 0);

        this.mainGroup = new THREE.Group();

        // Create immersive warehouse-like architecture
        this.createGrid();
        this.createBuildings();
        this.createFloatingElements();
        this.createParticleField();
        this.createAmbientLines();

        this.scene.add(this.mainGroup);
        this.mainGroup.rotation.y = -0.2;
    }

    createGrid() {
        // Premium floating grid
        const gridSize = 60;
        const divisions = 40;
        const gridGeo = new THREE.BufferGeometry();
        const positions = [];
        const step = gridSize / divisions;

        for (let i = -gridSize / 2; i <= gridSize / 2; i += step) {
            positions.push(-gridSize / 2, 0, i, gridSize / 2, 0, i);
            positions.push(i, 0, -gridSize / 2, i, 0, gridSize / 2);
        }

        gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const gridMat = new THREE.LineBasicMaterial({
            color: 0xD4A853,
            transparent: true,
            opacity: 0.04
        });
        const grid = new THREE.LineSegments(gridGeo, gridMat);
        this.mainGroup.add(grid);
    }

    createBuildings() {
        // Warehouse-inspired wireframe buildings
        const buildings = [
            { w: 8, h: 5, d: 12, x: -15, z: -5 },
            { w: 6, h: 8, d: 6, x: -5, z: -12 },
            { w: 10, h: 4, d: 14, x: 8, z: -8 },
            { w: 5, h: 12, d: 5, x: 18, z: 2 },
            { w: 12, h: 6, d: 8, x: -10, z: 10 },
            { w: 4, h: 15, d: 4, x: 0, z: 5 },
            { w: 7, h: 3, d: 10, x: 12, z: 12 },
        ];

        this.buildingMeshes = [];

        buildings.forEach((b, i) => {
            const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
            const edges = new THREE.EdgesGeometry(geo);
            const mat = new THREE.LineBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: 0.12 + (i * 0.02)
            });
            const mesh = new THREE.LineSegments(edges, mat);
            mesh.position.set(b.x, b.h / 2, b.z);
            mesh.userData = { baseY: b.h / 2, speed: 0.3 + Math.random() * 0.2 };
            this.buildingMeshes.push(mesh);
            this.mainGroup.add(mesh);
        });
    }


    createFloatingElements() {
        // Floating geometric shapes (represents packages/logistics)
        this.floatingObjects = [];
        const shapes = this.isMobile ? 12 : 25;

        for (let i = 0; i < shapes; i++) {
            let geo;
            const type = Math.random();
            const size = Math.random() * 0.6 + 0.2;

            if (type < 0.4) {
                geo = new THREE.BoxGeometry(size, size, size);
            } else if (type < 0.7) {
                geo = new THREE.OctahedronGeometry(size * 0.7);
            } else {
                geo = new THREE.TetrahedronGeometry(size * 0.6);
            }

            const edges = new THREE.EdgesGeometry(geo);
            const mat = new THREE.LineBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: Math.random() * 0.25 + 0.05
            });
            const mesh = new THREE.LineSegments(edges, mat);

            mesh.position.set(
                (Math.random() - 0.5) * 50,
                Math.random() * 20 + 3,
                (Math.random() - 0.5) * 40
            );

            mesh.userData = {
                rotSpeed: (Math.random() - 0.5) * 0.02,
                floatSpeed: Math.random() * 0.4 + 0.2,
                floatOffset: Math.random() * Math.PI * 2,
                baseY: mesh.position.y
            };

            this.floatingObjects.push(mesh);
            this.mainGroup.add(mesh);
        }
    }

    createParticleField() {
        const count = this.isMobile ? 200 : 600;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 80;
            positions[i * 3 + 1] = Math.random() * 35;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
            sizes[i] = Math.random() * 2 + 0.5;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
            color: 0xD4A853,
            size: 0.06,
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geo, mat);
        this.mainGroup.add(this.particles);
    }

    createAmbientLines() {
        // Flowing connection lines (represent logistics routes)
        const lineCount = this.isMobile ? 3 : 6;

        for (let i = 0; i < lineCount; i++) {
            const points = [];
            const segments = 20;

            for (let j = 0; j <= segments; j++) {
                const t = j / segments;
                points.push(new THREE.Vector3(
                    (t - 0.5) * 60,
                    Math.sin(t * Math.PI * 2 + i) * 3 + 8 + i * 2,
                    Math.cos(t * Math.PI + i * 0.5) * 10 - 5
                ));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(50));
            const mat = new THREE.LineBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: 0.06 + (i * 0.01)
            });
            const line = new THREE.Line(geo, mat);
            this.mainGroup.add(line);
        }
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
        }, { passive: true });

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const time = this.clock.getElapsedTime();

        // Smooth mouse interpolation
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.03;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.03;

        // Main group rotation follows mouse
        if (this.mainGroup) {
            this.mainGroup.rotation.y += (this.mouse.x * 0.15 - this.mainGroup.rotation.y) * 0.02;
            this.mainGroup.rotation.x += (this.mouse.y * 0.05 - this.mainGroup.rotation.x) * 0.02;
        }

        // Animate floating objects
        if (this.floatingObjects) {
            this.floatingObjects.forEach(obj => {
                obj.rotation.x += obj.userData.rotSpeed;
                obj.rotation.y += obj.userData.rotSpeed * 0.7;
                obj.position.y = obj.userData.baseY + Math.sin(time * obj.userData.floatSpeed + obj.userData.floatOffset) * 0.8;
            });
        }

        // Subtle building breathing
        if (this.buildingMeshes) {
            this.buildingMeshes.forEach((mesh, i) => {
                mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.speed + i) * 0.15;
            });
        }

        // Rotate particle field
        if (this.particles) {
            this.particles.rotation.y = time * 0.015;
        }

        this.renderer.render(this.scene, this.camera);
    }
}


/* === About Scene - Abstract Data Visualization === */
class AboutScene {
    constructor() {
        this.canvas = document.getElementById('aboutCanvas');
        if (!this.canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(55, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 100);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0a0a10, 1);

        this.clock = new THREE.Clock();
        this.mouse = { x: 0, y: 0 };
        this.init();
        this.addEventListeners();
        this.animate();
    }

    init() {
        this.camera.position.set(0, 0, 12);
        this.camera.lookAt(0, 0, 0);

        // Ambient lighting
        const ambientLight = new THREE.AmbientLight(0xD4A853, 0.2);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xD4A853, 0.8, 25);
        pointLight.position.set(5, 5, 8);
        this.scene.add(pointLight);

        // Central torus knot - represents complexity & excellence
        const torusGeo = new THREE.TorusKnotGeometry(2.2, 0.4, 128, 16, 2, 3);
        const torusMat = new THREE.MeshPhongMaterial({
            color: 0xD4A853,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
            emissive: 0xD4A853,
            emissiveIntensity: 0.05
        });
        this.torusKnot = new THREE.Mesh(torusGeo, torusMat);
        this.scene.add(this.torusKnot);

        // Outer wireframe sphere - represents global reach
        const sphereGeo = new THREE.IcosahedronGeometry(4, 1);
        const sphereEdges = new THREE.EdgesGeometry(sphereGeo);
        this.sphere = new THREE.LineSegments(
            sphereEdges,
            new THREE.LineBasicMaterial({ color: 0xD4A853, transparent: true, opacity: 0.08 })
        );
        this.scene.add(this.sphere);

        // Orbiting rings
        this.rings = [];
        for (let i = 0; i < 4; i++) {
            const ringGeo = new THREE.TorusGeometry(3.2 + i * 0.6, 0.01, 8, 80);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: 0.12 - i * 0.02
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2 + i * 0.25;
            ring.rotation.y = i * 0.4;
            this.rings.push(ring);
            this.scene.add(ring);
        }

        // Inner particles (data points)
        const particleCount = 150;
        const pGeo = new THREE.BufferGeometry();
        const pPositions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            const radius = 2 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            pPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
            pPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
            pPositions[i + 2] = radius * Math.cos(phi);
        }

        pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
        const pMat = new THREE.PointsMaterial({
            color: 0xD4A853,
            size: 0.04,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        this.innerParticles = new THREE.Points(pGeo, pMat);
        this.scene.add(this.innerParticles);
    }

    addEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        }, { passive: true });

        // Handle resize with ResizeObserver for container-aware sizing
        const resizeObserver = new ResizeObserver(() => {
            const width = this.canvas.clientWidth;
            const height = this.canvas.clientHeight;
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
        });
        resizeObserver.observe(this.canvas.parentElement);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const time = this.clock.getElapsedTime();

        // Rotate central element
        if (this.torusKnot) {
            this.torusKnot.rotation.x = time * 0.15 + this.mouse.y * 0.3;
            this.torusKnot.rotation.y = time * 0.2 + this.mouse.x * 0.3;
        }

        // Rotate outer sphere
        if (this.sphere) {
            this.sphere.rotation.y = time * 0.05;
            this.sphere.rotation.x = time * 0.03;
        }

        // Animate rings
        this.rings.forEach((ring, i) => {
            ring.rotation.z = time * (0.08 + i * 0.03);
            ring.rotation.x = Math.PI / 2 + Math.sin(time * 0.2 + i) * 0.15 + i * 0.25;
        });

        // Rotate inner particles
        if (this.innerParticles) {
            this.innerParticles.rotation.y = time * 0.08;
            this.innerParticles.rotation.x = time * 0.04;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

/* === Initialize All Scenes === */
document.addEventListener('DOMContentLoaded', () => {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') return;

    // Delay scene initialization for performance
    setTimeout(() => {
        new HeroScene();
    }, 100);

    setTimeout(() => {
        new AboutScene();
    }, 500);
});
