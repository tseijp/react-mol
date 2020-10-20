# React-mol
<!--IMGS * 6-->
<!-- ************************* ************************* >
- REFS
    - https://threejs.org/examples/#webgl_loader_pdb
    - https://threejs.org/examples/#css3d_molecules
    - https://threejs.org/examples/?q=skinn#webgl_skinning_simple
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
<tr><td>
    <strong>Mol</strong>
</td><td>
    <strong>hierarchy</strong>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/Mol-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/useMol-black.svg"/></a><br/>
</td><td>
    <strong>merging</strong>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/Mols-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/useMols-black.svg"/></a><br/>
</td><td>
    results
</td></tr>
<tr><td><!--************************* Methyl alchol *************************-->
<p align="center">
    <strong>Methyl alcohol</strong>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Card.tsx">
        <img src="https://img.shields.io/badge/C-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Code.tsx">
        <img src="https://img.shields.io/badge/H-black.svg"/></a><br/>
    <a href="https://github.com/tseijp/tseijp/blob/master/core/src/components/Code.tsx">
        <img src="https://img.shields.io/badge/Methil-black.svg"/></a><br/>
</p>
</td><!--*************************--><td>

```javascript
<C>
  <H/><H/><H/><OH/>
</C>
```

</td><!--*************************--><td>

```javascript
<M>
  <OH/>
  <Methil/>
</M>
```

</td></tr>

<tr><td><!--************************* Phenol *************************-->
<p align="center">
    <strong>benzene</strong>
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
  <C><H/><H/></C>
  <C><H/><H/></C>
  <C><H/><H/></C>
  <C><H/><H/></C>
  <C><H/><H/></C>
  <C><OH/>/C>
</M>
```

</td></tr>
<tr><td><!--************************* XXX *************************-->
<p align="center">
    <strong>XXX</strong>
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
