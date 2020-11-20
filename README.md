<!-- ****************************** ****************************** >
- REFS
    - https://threejs.org/examples/#webgl_loader_pdb
    - https://threejs.org/examples/#css3d_molecules
    - https://threejs.org/examples/#webgl_skinning_simple
    - instancing
        - https://threejs.org/examples/#webgl_buffergeometry_lines
        - https://threejs.org/examples/#webgl_instancing_raycast
        - https://threejs.org/examples/#webgl_postprocessing_sao
- TODO
    - multi threading using Work
    - ISSUE
- ISSUE
    - Recursion cant get children as array if child is redefined as <OH/>
    ― functional props
        - Atom position={[t => [t, t, t]]}
        if (typeof c==="function") c = c(time.current)
        if (typeof p==="function") c = c(time.current)
        if (typeof r==="function") c = c(time.current)
        if (typeof s==="function") c = c(time.current)
    - count instaned length in Render.tsx
          - const count = Object.keys(instances.current).length
<!   ****************************** ****************************** -->
<p align="center">

[ ![https://tsei.jp/rmol](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/rmol.mp4.gif) ](
    https://tsei.jp/rmol)

</p>
<br/>
<br/>
<br/>
<p align="center">️

<!--TODO-->

[![build-✔](
    https://img.shields.io/badge/build-✔-green.svg)](
    https://github.com/tseijp/react-mol)
[![types-✔-](
    https://img.shields.io/badge/types-✔-yellow.svg)](
    https://github.com/tseijp/react-mol)
[![demos-✔](
    https://img.shields.io/badge/demos-✔-red.svg)](
    https://github.com/tseijp/react-mol)
[![license-MIT](
    https://img.shields.io/badge/license-MIT-green.svg)](
    https://github.com/tseijp/react-mol)
[![npm-package](
    https://badge.fury.io/js/react-mol.svg)](
    https://www.npmjs.com/package/react-mol)
[![tweet](
    https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp)](
    https://twitter.com/intent/tweet?url=https://tsei.jp/rmol/&text=🍡A+molecular+chemistry+based+simulation+library)

</p>

__Installation__
- `npm i three react-three-fiber react-mol`

__Quick started__
- `git clone https://github.com/tseijp/react-mol`
- `cd react-mol`
- `npm i`
- `npm start`
- open browser and visit [localhost:3000](http://localhost:3000)
- Now you can go to our [demo](https://tsei.jp/rmol), and try its usage.

<br/><br/><hr/><br/><br/>

# Recipes

__Recipes of Atom__

<table>
<tr><td><br/>

🍡<strong>`<Mol/>`</strong> is a molecular chemistry based simulation component
that covers most cases of organic molecule simulation.
<details><summary>View Code</summary>

```tsx
import {calcMol, mergedGeometry} from 'react-mol'

const Mol =(props)=> (
  <Atom {...props} calc={calcMol} geometry={mergedGeometry}>
    <meshPhongMaterial attach="material" />
    {props.children}
  </Atom>
)
```

</details>

</td><td>

[![Mol](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/rmol.mp4.gif)](
    https://tsei.jp/rmol)

</td></tr>
<tr><td>
<details><summary>View Code</summary>

~~🧬<strong>`<Hel/>`</strong> is TODO~~

</details>

</td></td>
</table>

__What does it look like?__

<table>
<tr><td>

🍡<strong>`<Atom/>`</strong> is TODO
(~~[live demo](https://tsei.jp/rmol/basic)~~).

</td><td>
    <a href="https://tsei.jp/rmol/basic"><img
        src="" /></a>
</td></tr>
</table>

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Atom, Poly } from 'react-mol'
import { Canvas, useFrame } from 'react-three-fiber'

function BasicExample () {
  // This reference will give us direct access to the last instance
  const instance = React.useRef<any>(null)

  // Rotate instance every frame, this is outside of React without overhead
  useFrame(() => {
    instance.current.rotation.x  =
    instance.current.rotation.y  =
    instance.current.rotation.z += 0.025
  })

  return (
    <Atom color="red" position={[1,-2,-10]} rotation={[0,0,Math.PI/3]}>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" />
      <Poly n={10}>
        {next =>
          <Atom color="green" position={[2,0,1]} rotation={[0,0,Math.PI/3]}>
            {next || <Atom color="blue" position={[2,0,0]} ref={instance}/>}
          </Atom>
        }
      </Poly>
    </Atom>
  )
}

ReactDOM.render(
  <Canvas>
    <pointLight   />
    <ambientLight />
    <BasicExample />
  </Canvas>,
  document.getElementById('root')
)
```
<details>
<summary>Show Recursion Example</summary>

```tsx
/* ~~same~~ */

function BasicExample () {
  // This reference will give us direct access to the last instance
  const instance = React.useRef<any>(null)

  // Rotate instance every frame, this is outside of React without overhead
  useFrame(() => {
    instance.current.rotation.x  =
    instance.current.rotation.y  =
    instance.current.rotation.z += 0.025
  })

  return (
    <Atom recursion>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" />
      <Atom color="red" position={[1, -2, -10]} rotation={[0,  0,  Math.PI/3]}/>
      {Array(10).fill(0).map((_, i) =>
        <Atom key={i} color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}/>
      )}
      <Atom ref={ref} color="blue" position={[2,0,0]}/>
    </Atom>
  )
}

/* ~~same~~ */
```

</details>

<br/><br/><hr/><br/><br/>

__Recipes of Mol (Molecule)__

<table><!--*************** Recipes of Mol ***************--><tr align="center"><td><br/>

[![Mol](
    https://img.shields.io/badge/Mol-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)

</td><td><br/>

[![Hierarchy](
    https://img.shields.io/badge/Hierarchy-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)

</td><td><br/>

[![Recurtion](
    https://img.shields.io/badge/Recurtion-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)

</td><td><br/>

[![Results](
    https://img.shields.io/badge/Results-black.svg)](
    https://tsei.jp/rmol)

</td></tr><!--*************** Methyl alchol ***************--><tr><td align="center">

__Methyl__  
__alcohol__  
[![H](
    https://img.shields.io/badge/H-white.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![OH](
    https://img.shields.io/badge/OH-red.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![C](
    https://img.shields.io/badge/C-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![CH3](
    https://img.shields.io/badge/CH3-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  

</td><td>

```tsx
<C>
  <H/>
  <H/>
  <H/>
  <OH/>
</C>
```

</td><td>

```tsx
<Mol recursion>
  <CH3/>
  <OH/>
</Mol>
```

</td><td>

[![CH3OH](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/CH3OH.png)](
    https://tsei.jp/rmol/CH3OH)

</td></tr><!--*************** Acetic acid ***************--><tr><td align="center">

__Acetil__  
__acid__  
[![O](
    https://img.shields.io/badge/O-red.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![OH](
    https://img.shields.io/badge/OH-red.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![CH3](
    https://img.shields.io/badge/CH3-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![COOH](
    https://img.shields.io/badge/COOH-white.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  

</td><td>

```tsx
<C>
  <CH3/>
  <O double/>
  <OH/>
</C>
```

</td><td>

```tsx
<Mol recursion>
  <CH3/>
  <COOH/>
</Mol>
```

</td><td>

[![CH3COOH](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/CH3COOH.png)](
    https://tsei.jp/rmol/CH3COOH)

</td></tr><!--*************** Polyethylene ***************--><tr><td align="center">

__Poly__  
__ethylene__  
[![H](
    https://img.shields.io/badge/H-white.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![Poly](
    https://img.shields.io/badge/Poly-white.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![CH2](
    https://img.shields.io/badge/CH2-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  
[![CH3](
    https://img.shields.io/badge/CH3-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)  

</td><td>

```tsx
<H>
  <Poly n={100}}>
  {next =>
    <CH2>
      <CH2>
      {next||<H/>}
      </CH2>
    </CH2>
  }
  </Poly>
</H>
```

</td><td>

```tsx
<Mol recursion>
  <H/>
  {Array(200)
  .fill(0)
  .map((_,i) =>
    <C key={i}>
      <H/>
      <H/>
    </C>
  )}
  <H/>
</Mol>
```

</td><td>

[![Polyethylene](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/CnH2n2.png)](
    https://tsei.jp/rmol/Polyethylene)

</td></tr><!--***************  ***************--></table>

<br/><br/><hr/><br/><br/>

__Recipes of Hel (Helix)__
<table><!--*************** Recipes of Hel ***************--><tr><td><br/>

[![Hel](
    https://img.shields.io/badge/Hel-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)

</td><td><br/>

[![Hierarchy](
    https://img.shields.io/badge/Hierarchy-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)

</td><td><br/>

[![Recurtion](
    https://img.shields.io/badge/Recurtion-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)


</td></tr><!--***************  ***************--></table>
