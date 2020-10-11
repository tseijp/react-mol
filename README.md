# React-mol
<!--IMGS * 6-->
<!-- ************************* ************************* >
- REFS
    - https://threejs.org/examples/#webgl_loader_pdb
    - https://threejs.org/examples/#css3d_molecules
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
__methane__
```
import {C, H} from 'react-mol'
<C>
  <H/><H/><H/><H/>
</C>
```

__benzene__
```
import {C, H} from 'react-mol'
<Mol>
    <C><H/></C>
    <C><H/></C>
    <C><H/></C>
    <C><H/></C>
    <C><H/></C>
    <C><H/></C>
</Mol>
```

__phenol__
```
import {Mol, C, H} from 'react-mol'
<Mol>
    <C><H/></C>
    <C><H/></C>
    <C><H/></C>
    <C><H/></C>
    <C><H/></C>
    <C>
        <O><H/></O>
    </C>
</Mol>
```
or
```
import {Mol, C, OH, Pheny} from 'react-mol'
<Mol>
    <Pheny/>
    <C><OH/></C>
</Mol>
```
