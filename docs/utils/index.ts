import React, {createElement as el} from 'react'
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import * as THREE from 'three';
export * from './serviceWorker'
export * from './atom'

export function molGeometry () {
    const arr = new THREE.Matrix4().makeTranslation(0,-1/2,0)
    const sph = new THREE.SphereBufferGeometry(.3, 32, 32)
    const cyl = new THREE.CylinderBufferGeometry(.1,.1,1,10)
    cyl.applyMatrix4(arr);
    return BufferGeometryUtils.mergeBufferGeometries([cyl, sph])
}


export function getTrees (set: any, fontSize="1rem") {
    return (file:string[], i: any) => el(
        'span', {key: i, style: {fontSize}},
        file.map(name => name && name!=="default" &&
            el('span', {key: name, onClick: () => set([file[0], name])}, name)
        )
    )
}

export const STYLES: {[key:string]:React.CSSProperties} = {
    top : {
        overflowX:"hidden",
        minHeight:"100%",
    },
    card: {
        width:"100%",
        height:"100%"
    },
    ctrl: {
        position:"relative",
        width:"100%",
        top:0,
        left:0,
        margin:0,
        padding:0
    },
    note: {
        width:"100%",
        height:"100%",
        display:"block",
        padding:"1rem",
    },
}

export const COLORS = [
    "aliceblue",
    "aqua",
    "aquamarine",
    "azure",
    "bisque",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "chartreuse",
    "coral",
    "crimson",
    "cyan",
    "darkorange",
    "deeppink",
    "deepskyblue",
    "floralwhite",
    "fuchsia",
    "ghostwhite",
    "gold",
    "green",
    "greenyellow",
    "hotpink",
    "ivory",
    "lavenderblush",
    "lemonchiffon",
    "lightcyan",
    "lightpink",
    "lightsalmon",
    "lightyellow",
    "lime",
    "magenta",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "orange",
    "orangered",
    "papayawhip",
    "peachpuff",
    "pink",
    "red",
    "seashell",
    "snow",
    "springgreen",
    "tomato",
    "white",
    "yellow",
]
