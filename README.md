# React-mol
<!--IMGS * 6-->
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
    - useMols -> useMol -> Mol -> Example
<!   ************************* ************************* -->

## Quick started
- `create-react-app myapp`
- `cd myapp`
- `npm i -S react-mol`
- open browser and visit [localhost:3000](http://localhost:3000)
- ~Now you can go to our [demo](https://tsei.jp/react-mol), and try its usage.~

## Available API
- `useMol({})`
- `useMols(length, {}, {}, {})`

## Simple example


<table>
<tr><td><p align="center">
    <strong>Mol</strong>
</p></td><td><p align="center">
    <strong>hierarchy</strong><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/Mol-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/useMol-black.svg"/></a><br/>
</p></td><td><p align="center">
    <strong>merging</strong><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/Mols-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/useMols-black.svg"/></a><br/>
</p></td><td><p align="center">
    results
</p></td></tr>
<tr><td><!--************************* Methyl alchol *************************-->
<p align="center">
    <strong>Methyl alcohol</strong><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Code.tsx">
        <img src="https://img.shields.io/badge/H-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Code.tsx">
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
  <OH/>
  <CH3/>
</M>
```

</td></tr>

<tr><td><!--************************* Phenol *************************-->
<p align="center">
    <strong>benzene</strong><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Code.tsx">
        <img src="https://img.shields.io/badge/H-black.svg"/></a><br/>
</p>
</td><!--*************************--><td>

```javascript
<C>
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
<M>
  <C>
    <H/><H/>
  </C>
  <C>
    <H/><H/>
  </C>
  <C>
    <H/><H/>
  </C>
  <C>
    <H/><H/>
  </C>
  <C>
    <H/><H/>
  </C>
  <C>
    <OH/>
  </C>
</M>
```

</td></tr>
<tr><td><!--************************* XXX *************************-->
<p align="center">
    <strong>XXX</strong><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Code.tsx">
        <img src="https://img.shields.io/badge/H-black.svg"/></a><br/>
</p>
</td><!--*************************--><td>

```javascript
```

</td><!--*************************--><td>

```javascript
```
</tr></table><!--*************************  *************************-->
