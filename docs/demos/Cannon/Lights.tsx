import React from 'react'
// import {Atom, Poly, Render} from '../../../src'
import {useFrame} from 'react-three-fiber'
import * as THREE from "three";
const {random} = Math

export const Lights = ({
    color=0xff102a,
    speed=60
}) => {
    const [aOffset, aMetrics] = React.useMemo(() => {
        const aOffset = [];
        const aMetrics = [];
        const sectionWidth = options.roadWidth / options.roadSections;

        for (let i = 0; i < options.nPairs; i++) {
            const radius = random() * 0.1 + 0.1;
            const length = random() * options.length * 0.08 + options.length * 0.02;
            const section = i % 3;
            const sectionX = section * sectionWidth - options.roadWidth / 2 + sectionWidth / 2;
            const carWidth = 0.5 * sectionWidth;
            const offsetX = 0.5 * random();
            const offsetY = radius * 1.3;
            const offsetZ = random() * options.length;

            aOffset.push(sectionX - carWidth / 2 + offsetX);
            aOffset.push(offsetY);
            aOffset.push(-offsetZ);

            aOffset.push(sectionX + carWidth / 2 + offsetX);
            aOffset.push(offsetY);
            aOffset.push(-offsetZ);

            aMetrics.push(radius);
            aMetrics.push(length);

            aMetrics.push(radius);
            aMetrics.push(length);
        }
        return [new Float32Array(aOffset), new Float32Array(aMetrics)]
    }, [])

    const uniforms = React.useMemo(() => ({
        uColor: new THREE.Uniform(new THREE.Color(color)),
        uTravelLength: new THREE.Uniform(options.length),
        uTime: new THREE.Uniform(0),
        uSpeed: new THREE.Uniform(speed)
    }), [color, speed])

    const material = React.useRef<THREE.ShaderMaterial>()
    const geometry = React.useMemo(() => {
        const v1 = new THREE.Vector3(0, 0, 0)
        const v2 = new THREE.Vector3(0, 0, -1)
        const path = new THREE.LineCurve3(v1, v2);
        const base = new THREE.TubeBufferGeometry(path, 25, 1, 8, false)
        const instanced = new THREE.InstancedBufferGeometry().copy(base);
        // instanced.maxInstancedCount = options.nPairs * 2;
        return instanced
    }, [])

    useFrame((_, delta) => {
        if (material.current)
            material.current.uniforms.uTime.value += delta
    })

    return (
        <mesh frustumCulled={false}>
            <primitive attach="geometry" object={geometry}>
                <instancedBufferAttribute
                    array={aOffset}
                    itemSize={3}
                    normalized={false}
                    attachObject={['attributes', 'aOffset']}/>
                <instancedBufferAttribute
                    array={aMetrics}
                    itemSize={2}
                    normalized={false}
                    attachObject={['attributes', 'aMetrics']}/>
            </primitive>
            <shaderMaterial attach="material" ref={material}
                {...{fragmentShader, vertexShader, uniforms}} />
        </mesh>
    )
}

const options = {
    length: 400,
    width: 20,
    roadWidth: 9,
    islandWidth: 2,
    nPairs: 50,
    roadSections: 3
};

const fragmentShader = `
uniform vec3 uColor;
void main() {
    vec3 color = vec3(uColor);
    gl_FragColor = vec4(color,1.);
}
`;

const vertexShader = `
attribute vec3 aOffset;
attribute vec2 aMetrics;
uniform float uTime;
uniform float uSpeed;
uniform float uTravelLength;
void main() {
    vec3 transformed = position.xyz;

    float radius = aMetrics.r;
    float len = aMetrics.g;
    transformed.xy *= radius;
    transformed.z *= len;

    float zOffset = uTime * uSpeed + aOffset.z;
    zOffset = len - mod(zOffset, uTravelLength);

    // transformed.z +=uTime * uSpeed;
    // Keep them separated to make the next step easier!

    transformed.z = transformed.z +zOffset ;
    transformed.xy += aOffset.xy;

    vec4 mvPosition = modelViewMatrix * vec4(transformed,1.);
    gl_Position = projectionMatrix * mvPosition;
}
`;
