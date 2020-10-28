<!-- ************************* ************************* >
- REFS
    - https://threejs.org/examples/#webgl_loader_pdb
    - https://threejs.org/examples/#css3d_molecules
    - https://threejs.org/examples/#webgl_skinning_simple
    - instancing
        - https://threejs.org/examples/#webgl_buffergeometry_lines
        - https://threejs.org/examples/#webgl_instancing_raycast
        - https://threejs.org/examples/#webgl_postprocessing_sao
<!   ************************* ************************* -->
<p align="center">
    <a href="https://tsei.jp/rmol">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/main/public/rmol.mp4.gif" /></a>
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
- `git clone https://github.com/tseijp/rmol`
- `cd react-mol`
- `npm i`
- `npm start`
- open browser and visit [localhost:3000](http://localhost:3000)
- Now you can go to our [demo](https://tsei.jp/rmol), and try its usage.

## Recipes

<table>
<tr><td><p align="center"><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/Mol-black.svg"/></a><br/>
</p></td><td><p align="center"><br/>
    <strong>hierarchy</strong><br/>
</p></td><td><p align="center"><br/>
    <strong>merging</strong><br/>
</p></td><td><p align="center"><br/>
    <strong>results</strong><br/>
</p></td></tr>
<tr><td><!--************************* Methyl alchol *************************-->
<p align="center">
    <strong>Methyl alcohol</strong><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/H-white.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/OH-red.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/CH3-black.svg"/></a><br/>
</p>
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
<M>
  <CH3/>
  <OH/>
</M>
```

</td><!--*************************--><td>
    <a href="https://tsei.jp/rmol/CH3OH">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/main/public/CH3OH.png" width="240" /></a>
</td></tr>
<tr><td><!--************************* Acetic acid *************************-->
<p align="center">
    <strong>Acetic acid</strong><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/O-red.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/OH-red.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/CH3-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/COOH-white.svg"/></a><br/>
</p>
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
<M>
  <CH3/>
  <COOH/>
</M>
```
</td><!--*************************--><td>
    <a href="https://tsei.jp/rmol/CH3COOH">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/main/public/CH3COOH.png" width="240" /></a>
</td></tr>
<tr><td><!--************************* Polypropylene *************************-->
<p align="center">
    <strong>Polypropylene</strong><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/H-white.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/CH2-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/CH3-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/Poly-black.svg"/></a><br/>
</p>
</td><!--*************************--><td>

```javascript
<H>
  <Poly poly={100}}>
  {(child, props)=>
    <C {...props}>
      <C>{child||
        <H/>}
        <H/>
        <CH3/>
      </C>
      <H/><H/>
    </C>
  }
  </Poly>
</H>

```

</td><!--*************************--><td>

```javascript
<M>
  <H/>
  {Array(200)
  .fill(0)
  .map((_,i) =>
    <CH2 key=<i>>
  )}
  <H/>
</M>
```
</td><!--*************************--><td>
    <a href="https://tsei.jp/rmol/Polyethylene">
        <img src="https://raw.githubusercontent.com/tseijp/react-mol/main/public/CnH2n2.png" width="240" /></a>
</td></tr>
<tr><td><!--************************* Phenol *************************-->
<p align="center">
    <strong>benzene</strong><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/H-white.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/CH2-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/C6H11-black.svg"/></a><br/>
</p>
</td><!--*************************--><td>

```javascript
<C ring>
  <C>
    <C>
      <C>
        <C>
          <C/>
          <OH/>
        </C>
        <H/><H/>
      </C>
      <H/><H/>
    </C>
    <H/><H/>
  </C>
  <H/><H/>
</C>
```

</td><!--*************************--><td>

```javascript
<M ring>
  <CH2/>
  <CH2/>
  <CH2/>
  <CH2/>
  <CH2/>
  <C>
    <OH/>
  </C>
</M>
```

<p>or</p>

```javascript
<M ring>
  <C6H11/>
  <OH/>
</M>
```

</td></tr>
<tr><td><!--************************* XXX *************************-->
<p align="center">
    <strong>XXX</strong><br/>
    <a href="https://github.com/tseijp/react-mol/blob/main/src/index.tsx">
        <img src="https://img.shields.io/badge/H-white.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
</p>
</td><!--*************************--><td>

```javascript
```

</td><!--*************************--><td>

```javascript
```

</tr></table><!--*************************  *************************-->
