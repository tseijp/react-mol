<!-- ************************* ************************* >
- REFS
    - https://threejs.org/examples/#webgl_loader_pdb
    - https://threejs.org/examples/#css3d_molecules
    - https://threejs.org/examples/#webgl_skinning_simple
    - instancing
        - https://threejs.org/examples/#webgl_buffergeometry_lines
        - https://threejs.org/examples/#webgl_instancing_raycast
        - https://threejs.org/examples/#webgl_postprocessing_sao
- TODO
    - multi threading
    - benzene
    - CSSRenderer
<!   ************************* ************************* -->
<p align="center">
    <a href="https://tsei.jp/rmol">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/master/public/rmol.mp4.gif" /></a>
</p>
<br/>
<br/>
<br/>
<p align="center">️
    🍡<strong>react-mol</strong> is a molecular chemistry based simulation library
    that covers most cases of organic molecule simulation.
</p>

<p align="center">
    <a href="https://github.com/tseijp/react-mol">
        <img alt="build"src="https://img.shields.io/badge/build-✔-green.svg"/></a>
    <a href="https://github.com/tseijp/react-mol">
        <img alt="types"src="https://img.shields.io/badge/types-✔-yellow.svg"/></a>
    <a href="https://github.com/tseijp/react-mol">
        <img alt="demos"src="https://img.shields.io/badge/demos-✔-red.svg"/></a>
    <a href="https://github.com/tseijp/react-mol">
        <img alt="license MIT" src="https://img.shields.io/badge/license-MIT-green.svg"/></a>
    <a href="https://www.npmjs.com/package/react-mol">
        <img src="https://badge.fury.io/js/react-mol.svg" alt="npm version" height="18"/></a>
    <a href="https://twitter.com/intent/tweet?url=https://tsei.jp/rmol/&text=🍡A molecular chemistry based simulation library" >
        <img alt="tweet" src="https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftseijp"/></a>
</p>

## Installation
- `npm i react-mol`

## Quick started
- `git clone https://github.com/tseijp/react-mol`
- `cd react-mol`
- `npm i`
- `npm start`
- open browser and visit [localhost:3000](http://localhost:3000)
- Now you can go to our [demo](https://tsei.jp/rmol), and try its usage.

## Examples of simulation

### Molecular simulation

<table>
<tr><td>
<p align="center"><br/>
    <a href="https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx">
        <img src="https://img.shields.io/badge/Atom-black.svg"/></a>
<br/></p>
</td><td>
<p align="center"><br/>
    <a href="https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx">
        <img src="https://img.shields.io/badge/Results-black.svg"/></a>
<br/></p>
</td></tr>
<tr><td>

```javascript
import React from 'react'
import {Atom, calcMol} from 'react-mol'
export const Mol = ({children, ...props}) => (
  <Atom length={2} {...props} calc={calcMol}>
    <meshPhongMaterial      attach="material" />
    <sphereBufferGeometry   attach="geometry"
                            args ={[1,32,32]}/>
    <meshPhongMaterial      attach="material" />
    <cylinderBufferGeometry attach="geometry"
                            args ={[.05,.05,1,10]}/>
    {children}
  </Atom>
)
```
</td></tr>
<tr><td>

```javascript
import React from 'react'
import {Atom, calcHel} from 'react-mol'
export const Hel = ({children, ...props}) => (
  <Atom length={1} {...props} calc={calcHel}>
    <meshPhongMaterial  attach="material" />
    <boxBufferGeometry  attach="geometry"
                        args={[1,1,1]} />
    {children}
  </Atom>
)
```
</td></td>
</table>


## Recipes of Molecular

<table>
<tr><td>
<p align="center"><br/>
    <a href="https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx">
        <img src="https://img.shields.io/badge/Mol-black.svg"/></a>
<br/></p>
</td><td>
<p align="center"><br/>
    <a href="https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx">
        <img src="https://img.shields.io/badge/Hierarchy-black.svg"/></a>
<br/></p>
</td><td>
<p align="center"><br/>
    <a href="https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx">
        <img src="https://img.shields.io/badge/Recurtion-black.svg"/></a>
<br/></p>
</td><td>
<p align="center"><br/>
    <a href="https://tsei.jp/rmol">
        <img src="https://img.shields.io/badge/Results-black.svg"/></a>
<br/></p>
</td></tr>
<tr><td align="center"><!--************************* Methyl alchol *************************-->
<strong>Methyl</strong><br/>
<strong>alcohol</strong><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/H-white.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/OH-red.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/CH3-black.svg"/></a><br/>
</td><!--*************************--><td>

```javascript
<C>
  <H/>
  <H/>
  <H/>
  <OH/>
</C>
```

</td><!--*************************--><td>

```javascript
<Mol>
  <CH3/>
  <OH/>
</Mol>
```

</td><!--*************************--><td>
    <a href="https://tsei.jp/rmol/CH3OH">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/master/public/CH3OH.png" width="240" /></a>
</td></tr>
<tr><td align="center"><!--************************* Acetic acid *************************-->
<strong>Acetic</strong><br/>
<strong>acid</strong><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/O-red.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/OH-red.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/CH3-black.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/COOH-white.svg"/></a><br/>
</td><!--*************************--><td>

```javascript
<C>
  <CH3/>
  <O double/>
  <OH/>
</C>
```

</td><!--*************************--><td>

```javascript
<Mol>
  <CH3/>
  <COOH/>
</Mol>
```

</td><!--*************************--><td>
    <a href="https://tsei.jp/rmol/CH3COOH">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/master/public/CH3COOH.png" width="240" /></a>
</td></tr>
<tr><td align="center"><!--************************* Polyethylene *************************-->
<strong>Poly</strong><br/>
<strong>ethylene</strong><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/H-white.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/Poly-white.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/CH2-black.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/CH3-black.svg"/></a><br/>
</td><!--*************************--><td>

```javascript
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

</td><!--*************************--><td>

```javascript
<Mol>
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

</td><!--*************************--><td>
    <a href="https://tsei.jp/rmol/Polyethylene">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/master/public/CnH2n2.png" width="240" /></a>
</td></tr>
<!-- tr><td align="center" --><!--************************* Benzene *************************-->
<!-- strong>Benzene</strong><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/H-white.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/CH-black.svg"/></a><br/>
<a href="https://github.com/tseijp/react-mol/blob/master/src/index.tsx">
    <img src="https://img.shields.io/badge/C6H5-black.svg"/></a><br/>
</td --><!--*************************--><!-- td>

```javascript
<CH ring>
  <CH ring>
    <CH ring>
      <CH ring>
        <CH ring>
          <CH ring>
          </CH>
        </CH>
      </CH>
    </CH>
  </CH>
</CH>
```

</td --><!--*************************--><!-- td>

```javascript
<Mol>
{Array(6)
.fill(0)
.map((_,i) =>
  <C ring
    key={i}/>
    <H/>
  </C>
)}
</Mol>
```

</td></tr -->
</table><!--*************************  *************************-->
