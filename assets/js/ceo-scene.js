/* ============================================
   CEO Page - Immersive Dubai 3D Scene
   Premium WebGL Visualization
   ============================================ */

'use strict';

class CEOScene {
    constructor() {
        this.canvas = document.getElementById('ceoCanvas');
        if (!this.canvas) return;
        if (typeof THREE === 'undefined') return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
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
        this.camera.position.set(0, 12, 38);
        this.camera.lookAt(0, 6, 0);

        this.group = new THREE.Group();

        this.createSkyline();
        this.createCentralTower();
        this.createFloatingGeometry();
        this.createParticles();
        this.createConnectionNetwork();
        this.createGroundGrid();

        this.scene.add(this.group);
    }

    createSkyline() {
        // Dubai-inspired skyline with varied architecture
        const buildings = [
            { w: 2.5, h: 16, d: 2.5, x: -18, z: -3 },
            { w: 1.8, h: 11, d: 1.8, x: -14, z: -5 },
            { w: 3, h: 22, d: 3, x: -10, z: 0 },
            { w: 2, h: 14, d: 2, x: -6, z: -4 },
            { w: 1.5, h: 9, d: 1.5, x: -3, z: -6 },
            { w: 2.2, h: 18, d: 2.2, x: 4, z: -2 },
            { w: 1.8, h: 13, d: 1.8, x: 8, z: -5 },
            { w: 3, h: 20, d: 3, x: 12, z: 1 },
            { w: 2, h: 10, d: 2, x: 16, z: -3 },
            { w: 1.5, h: 7, d: 1.5, x: 19, z: -6 },
        ];

        this.buildingMeshes = [];

        buildings.forEach((b, i) => {
            const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
            const edges = new THREE.EdgesGeometry(geo);
            const mat = new THREE.LineBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: 0.08 + (Math.random() * 0.08)
            });
            const mesh = new THREE.LineSegments(edges, mat);
            mesh.position.set(b.x, b.h / 2, b.z);
            mesh.userData = {
                baseY: b.h / 2,
                phase: i * 0.5,
                speed: 0.2 + Math.random() * 0.15
            };
            this.buildingMeshes.push(mesh);
            this.group.add(mesh);
        });
    }

    createCentralTower() {
        // Iconic Burj-inspired central tower
        const segments = 12;
        const towerGroup = new THREE.Group();

        // Main spire
        const spireGeo = new THREE.CylinderGeometry(0.3, 2.5, 35, segments);
        const spireEdges = new THREE.EdgesGeometry(spireGeo);
        const spireMat = new THREE.LineBasicMaterial({
            color: 0xD4A853,
            transparent: true,
            opacity: 0.2
        });
        const spire = new THREE.LineSegments(spireEdges, spireMat);
        spire.position.y = 17.5;
        towerGroup.add(spire);

        // Ring accents around tower
        for (let i = 0; i < 5; i++) {
            const y = 5 + i * 6;
            const radius = 2.5 - (i * 0.4);
            const ringGeo = new THREE.TorusGeometry(radius, 0.02, 4, segments);
            const ringMat = new THREE.MeshBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: 0.1
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.position.y = y;
            ring.rotation.x = Math.PI / 2;
            towerGroup.add(ring);
        }

        towerGroup.position.set(0, 0, 2);
        this.centralTower = towerGroup;
        this.group.add(towerGroup);
    }


    createFloatingGeometry() {
        // Elegant floating diamonds and shapes representing luxury
        this.floatingGems = [];
        const count = this.isMobile ? 8 : 18;

        for (let i = 0; i < count; i++) {
            let geo;
            const r = Math.random();

            if (r < 0.5) {
                // Diamond shape
                geo = new THREE.OctahedronGeometry(0.3 + Math.random() * 0.4);
            } else if (r < 0.8) {
                // Cube
                const s = 0.2 + Math.random() * 0.3;
                geo = new THREE.BoxGeometry(s, s, s);
            } else {
                // Icosahedron
                geo = new THREE.IcosahedronGeometry(0.25 + Math.random() * 0.3, 0);
            }

            const edges = new THREE.EdgesGeometry(geo);
            const mat = new THREE.LineBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: 0.1 + Math.random() * 0.15
            });
            const mesh = new THREE.LineSegments(edges, mat);

            mesh.position.set(
                (Math.random() - 0.5) * 45,
                Math.random() * 28 + 4,
                (Math.random() - 0.5) * 25
            );

            mesh.userData = {
                rotSpeedX: (Math.random() - 0.5) * 0.015,
                rotSpeedY: (Math.random() - 0.5) * 0.02,
                floatSpeed: 0.2 + Math.random() * 0.3,
                floatOffset: Math.random() * Math.PI * 2,
                baseY: mesh.position.y
            };

            this.floatingGems.push(mesh);
            this.group.add(mesh);
        }
    }

    createParticles() {
        // Gold dust particles
        const count = this.isMobile ? 150 : 400;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 70;
            positions[i + 1] = Math.random() * 40;
            positions[i + 2] = (Math.random() - 0.5) * 40;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const mat = new THREE.PointsMaterial({
            color: 0xD4A853,
            size: 0.05,
            transparent: true,
            opacity: 0.35,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(geo, mat);
        this.group.add(this.particles);
    }

    createConnectionNetwork() {
        // Flowing energy lines connecting the buildings
        const lineCount = this.isMobile ? 4 : 8;

        for (let i = 0; i < lineCount; i++) {
            const points = [];
            const segs = 30;

            for (let j = 0; j <= segs; j++) {
                const t = j / segs;
                const x = (t - 0.5) * 50;
                const y = Math.sin(t * Math.PI * 1.5 + i * 0.7) * 4 + 12 + (i * 2);
                const z = Math.cos(t * Math.PI * 2 + i * 0.3) * 8;
                points.push(new THREE.Vector3(x, y, z));
            }

            const curve = new THREE.CatmullRomCurve3(points);
            const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
            const mat = new THREE.LineBasicMaterial({
                color: 0xD4A853,
                transparent: true,
                opacity: 0.03 + (i * 0.008)
            });
            const line = new THREE.Line(geo, mat);
            this.group.add(line);
        }
    }

    createGroundGrid() {
        // Subtle ground reflection grid
        const size = 60;
        const divisions = 30;
        const gridGeo = new THREE.BufferGeometry();
        const positions = [];
        const step = size / divisions;

        for (let i = -size / 2; i <= size / 2; i += step) {
            positions.push(-size / 2, 0, i, size / 2, 0, i);
            positions.push(i, 0, -size / 2, i, 0, size / 2);
        }

        gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const gridMat = new THREE.LineBasicMaterial({
            color: 0xD4A853,
            transparent: true,
            opacity: 0.025
        });
        const grid = new THREE.LineSegments(gridGeo, gridMat);
        this.group.add(grid);
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

        // Smooth mouse tracking
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.025;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.025;

        // Rotate scene with mouse
        if (this.group) {
            this.group.rotation.y += (this.mouse.x * 0.12 - this.group.rotation.y) * 0.02;
            this.group.rotation.x += (this.mouse.y * 0.04 - this.group.rotation.x) * 0.02;
        }

        // Animate buildings breathing
        if (this.buildingMeshes) {
            this.buildingMeshes.forEach(mesh => {
                mesh.position.y = mesh.userData.baseY +
                    Math.sin(time * mesh.userData.speed + mesh.userData.phase) * 0.12;
            });
        }

        // Central tower slow rotation
        if (this.centralTower) {
            this.centralTower.rotation.y = time * 0.03;
        }

        // Floating gems animation
        if (this.floatingGems) {
            this.floatingGems.forEach(gem => {
                gem.rotation.x += gem.userData.rotSpeedX;
                gem.rotation.y += gem.userData.rotSpeedY;
                gem.position.y = gem.userData.baseY +
                    Math.sin(time * gem.userData.floatSpeed + gem.userData.floatOffset) * 0.6;
            });
        }

        // Particle field rotation
        if (this.particles) {
            this.particles.rotation.y = time * 0.01;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize scene
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        setTimeout(() => new CEOScene(), 200);
    }
});
