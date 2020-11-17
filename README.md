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
    - calc of CH3OH: (H)-(O)-(CH3)
        - now : (H: parent)-(O: me)-(CH3: calc child): using O and CH3
        - next: (H: parent)-(O: calc me)-(CH3: not using child): using H and O
    - returned props is multi kind of type
        - plan1: calc return single data: Props<T> => Props<T>
        - plan2: assign multi Props type: Props<S,T> => [Props<S>,Props<T>,...]
    ― functional props
          - Atom position={[t => [t, t, t]]}
        if (typeof c==="function") c = c(time.current)
        if (typeof p==="function") c = c(time.current)
        if (typeof r==="function") c = c(time.current)
        if (typeof s==="function") c = c(time.current)
    - count instaned length
          - const count = Object.keys(instances.current).length
<!   ****************************** ****************************** -->
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
<p align="center">️

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

<table>
<tr><td align="center"><br/>

[![Atom](
    https://img.shields.io/badge/Atom-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)

</td><td align="center"><br/>

[![Results](
    https://img.shields.io/badge/Results-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)

</td></tr>
<tr><td>

```javascript
const Mol =(props)=> (
  <Atom length={2} {...props} calc={calcMol}>
    <meshPhongMaterial      attach="material" />
    <sphereBufferGeometry   attach="geometry"
                            args  ={[1,32,32]}/>
    <meshPhongMaterial      attach="material" />
    <cylinderBufferGeometry attach="geometry"
                         args={[.05,.05,1,10]}/>
    {props.children}
  </Atom>
)
```

</td><td>

[![Mol](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/rmol.mp4.gif)](
    https://tsei.jp/rmol)

</td></tr>
<tr><td>

```javascript
const Hel =(props)=> (
  <Atom length={1} {...props} calc={calcHel}>
    <meshPhongMaterial  attach="material" />
    <boxBufferGeometry  attach="geometry"
                        args={[1,1,1]} />
    {props.children}
  </Atom>
)
```

</td></td>
</table>

## Recipes of Mol(Molecule)

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

```javascript
<C>
  <H/>
  <H/>
  <H/>
  <OH/>
</C>
```

</td><td>

```javascript
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

```javascript
<C>
  <CH3/>
  <O double/>
  <OH/>
</C>
```

</td><td>

```javascript
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

</td><td>

```javascript
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


## Recipes of Hel(Helix)
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
