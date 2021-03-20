<p align="center">

[ ![https://tsei.jp/rmol](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/rmol.mp4.gif) ](
    https://tsei.jp/rmol)

</p>

<br/><br/><hr/><br/><br/>

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

<table>
  <tr valign="top">
    <td>
      <strong><a href="#recipes-of-atom">Atom</a></strong>
      <ul>
        <li><a href="#Recipes-of-mol">Mol</a></li>
        <li><a href="#Recipes-of-flow">Flow</a></li>
        <li><a href="#Recipes-of-tile">Tile</a></li>
        <li><a href="#Recipes-of-spring">Spring</a></li>
      </ul>
    </td>
    <td>
      <strong><a href="#recipes-of-mol">Mol</a></strong>
      <ul>
        <li><a href="#Methyl alcohol">Methyl alcohol</a></li>
        <li><a href="#Polyethylene">Polyethylene</a></li>
        <li><a href="#Acetil-acid">Acetil Acid</a></li>
      </ul>
    </td>
    <td>
      <strong><a href="#recipes-of-flow">Flow</a></strong>
      <ul>
        <li><a href="#Points">Points</a></li>
        <li><a href="#Boxes">Boxes</a></li>
        <li><a href="#Spheres">Spheres</a></li>
        <li><a href="#Dodecas">Dodecas</a></li>
      </ul>
    </td>
    <td>
      <strong><a href="#recipes-of-tile">Tile</a></strong>
      <ul>
        <li><a href="#Basic">Basic</a></li>
      </ul>
    </td>
    <td>
      <strong><a href="#recipes-of-spring">Spring</a></strong>
      <ul>
        <li><a href="#Pieces">Pieces</a></li>
        <li><a href="#Bounds">Bounds</a></li>
        <li><a href="#Pipes">Pipes</a></li>
      </ul>
    </td>
  </tr>
</table>

### Recipes of Atom

<table>
<tr valign="top"><td><br/>

🍡<strong>`<Mol/>`</strong> is a molecular chemistry based simulation component
that covers most cases of organic molecule simulation.
([More Recipes](#recipes-of-mol))

<details><summary>View Code</summary>

```tsx
import React from 'react'
import { Atom } from 'react-mol'

export const Mol = React.forwardRef((props, ref) => {
  const {index: i, angle: a, double:d} = props
  const state = React.useMemo(() => {
    const position = calcMolPos(i, a, d)
    const rotation = eulerVec3(position, [0,1,0])
    return {position, rotation}
  }, [i, a, d])

  const children = React.useMemo(() =>
    React.Children.map(props.children, (child, index) =>
      React.cloneElement(child, {index})
    ), [props.children])

  return <Atom {...props} ref={ref}
               {...state} children={children}/>
})
```

</details>

</td><td>

[![Mol](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/rmol.mp4.gif)](
    https://tsei.jp/rmol)

</td></tr>

<tr valign="top"><td>

🍭<strong>`<Flow/>`</strong>
([More Recipes](#recipes-of-flow))

<details><summary>View Code</summary>

```tsx
import React from 'react'
import { Atom } from 'react-mol'
import { useFrame } from "react-three-fiber"

export const Flow = React.forwardRef((props, forwardRef) => {
  const now = React.useRef(0)
  const ref = React.useRef(null)
  const fun = (value) => typeof value==="function"
  useFrame((_, delta) => {
    if (!ref.current) return
    now.current += delta
    const { position: p, scale: s, args: a,
            rotation: r, color: c } = props
    const args = fun(a)
      ? a(now.current,...ref.current.position.toArray())
      : [ now.current,...(a || []) ]
    p && ref.current.position.set(...(fun(p)? p(...args): p))
    r && ref.current.rotation.set(...(fun(r)? r(...args): r))
    s && ref.current.scale.set(...(fun(s)? s(...args): s))
    c && ref.current.color.set(fun(c)? c(...args): c)
  })
  return <Atom ref={ref}/>
})
```
</details>

</td><td>

[![Points](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/Points.gif)](
    https://tsei.jp/rmol/Flow/Points)

</td></td>
</table>

___What does it look like?___


<table>
<tr valign="top"><td>

🪐<strong>`<Atom/>`</strong>
([live demo](https://tsei.jp/rmol/Basic/Basic)).

</td><td>
    <a href="https://tsei.jp/rmol/Basic/Basic"><img
        src="" /></a>
</td></tr>
</table>

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Atom } from 'react-mol'
import { Canvas, useFrame } from 'react-three-fiber'

function Basic () {
  // This reference will give us direct access to the last instance
  const ref = React.useRef(null)

  // Rotate instance every frame, this is outside of React without overhead
  useFrame(() => {
    ref.current.rotation.x  =
    ref.current.rotation.y  =
    ref.current.rotation.z += 0.025
  })

  return (
    <Instanced>
      <boxBufferGeometry attach="geometry" />
      <meshPhongMaterial attach="material" />
      <Atom color="red" position={[1, -2, -5]} rotation={[0, 0, Math.PI/3]}>
        <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
          <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
            <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
              <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
                <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]}>
                  <Atom color="blue" position={[2, 0, 0]} ref={ref}/>
                </Atom>
              </Atom>
            </Atom>
          </Atom>
        </Atom>
      </Atom>
    </Instanced>
  )
}

ReactDOM.render(
  <Canvas>
    <pointLight   />
    <ambientLight />
    <Basic />
  </Canvas>,
  document.getElementById('root')
)
```


<details>
<summary>Show Recursion Example</summary>

```tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Atom } from 'react-mol'
import { Canvas, useFrame } from 'react-three-fiber'

function Basic () {
  // This reference will give us direct access to the last instance
  const ref = React.useRef(null)

  // Rotate instance every frame, this is outside of React without overhead
  useFrame(() => {
    ref.current.rotation.x  =
    ref.current.rotation.y  =
    ref.current.rotation.z += 0.025
  })

  return (
    <Instanced>
      <Recursion>
        <boxBufferGeometry/>
        <meshPhongMaterial/>
        <Atom color="red" position={[1, -2, -5]} rotation={[0, 0, Math.PI/3]}/>
        {[...Array(5)].map((_, i) =>
          <Atom color="green" position={[2, 0, 1]} rotation={[0, 0, Math.PI/3]} key={i}/>
        )}
        <Atom color="blue" position={[2, 0, 0]} ref={ref}/>
      </Recursion>
    </Instanced>
  )
}

ReactDOM.render(
  <Canvas>
    <pointLight/>
    <ambientLight/>
    <Basic/>
  </Canvas>,
  document.getElementById('root')
)
```

</details>

<br/><br/><hr/><br/><br/>

### Recipes of Mol

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

###### Methyl alcohol
[![CH3](
    https://img.shields.io/badge/CH3-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)
[![OH](
    https://img.shields.io/badge/OH-red.svg)](
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
<Recursion>
  <CH3/>
  <OH/>
</Recursion>
```

</td><td>

[![CH3OH](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/CH3OH.png)](
    https://tsei.jp/rmol/Mol/CH3OH)

</td></tr><!--*************** Acetic acid ***************--><tr><td align="center">

###### Acetil acid
[![CH3](
    https://img.shields.io/badge/CH3-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)
[![COOH](
    https://img.shields.io/badge/COOH-red.svg)](
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
<Recursion>
  <CH3/>
  <COOH/>
</Recursion>
```

</td><td>

[![CH3COOH](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/CH3COOH.png)](
    https://tsei.jp/rmol/Mol/CH3COOH)

</td></tr><!--*************** Polyethylene ***************--><tr><td align="center">

###### Poly ethylene
[![Poly](
    https://img.shields.io/badge/Poly-white.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)
[![CH2](
    https://img.shields.io/badge/CH2-black.svg)](
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
<Recursion>
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
</Recursion>
```

</td><td>

[![Polyethylene](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/CnH2n2.png)](
    https://tsei.jp/rmol/Mol/Polyethylene)

</td></tr></table>

<br/><br/><hr/><br/><br/>

### Recipes of Flow

<table><!--*************** Recipes of Flow ***************--><tr align="center"><td><br/>

[![Flow](
    https://img.shields.io/badge/Flow-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)

</td><td><br/>

[![Code](
    https://img.shields.io/badge/Code-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)

</td><td><br/>

[![Results](
    https://img.shields.io/badge/Results-black.svg)](
    https://tsei.jp/rmol)

</td></tr><tr><td align="center">

###### Points

</td><td>

```tsx
<Instanced position={[-12.5,0,-25]} count={2500}>
  <sphereBufferGeometry/>
  <meshPhongMaterial   />
  {[...Array(2500)].map((_,i) =>
    <Flow key={i} color={colors[i]}
      args={(t,x,_,z) => [
        sin((x+t)/3)+sin((z+t)/2)]}
      position={r => [i%c,r,i/c%c]}
      scale={r => [r/3,r/3,r/3]} />
  )}
</Instanced>
```

</td><td>

[![Points](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/Points.gif)](
    https://tsei.jp/rmol/Flow/Points)

</td></tr><tr><td align="center">

###### Boxes

</td><td>

```tsx
<Instanced count={10**3}>
  <boxBufferGeometry />
  <meshPhongMaterial/>
  {[...Array(1000)].map((_,i) =>
    <Flow key={i} color={colors[i]}
      args={(t,x,y,z) => [
        sin(x/4+t)+sin(y/4+t)+sin(z/4+t) ]}
      position={[i%10-5,i/10%10-5,i/100-5]}
      rotation={r => [0,r*2,r*3]}
      scale={r => [r/4,r/4,r/4]}/>
  )}
</Instanced>
```

</td><td>

[![Boxes](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/Boxes.gif)](
    https://tsei.jp/rmol/Flow/Boxes)

</td></tr><tr><td align="center">

###### Spheres

</td><td>

```tsx
<Instanced count={1000}>
  <sphereBufferGeometry args={[1,32,32]}/>
  <meshPhongMaterial color={0xffffff}/>
  {[...Array(1000)].map((_, i) =>
    <Flow key={i} color={colors[i]}
      args={[...Array(4)].map(() => rand())}
      position={(t,s,x,y,z) => [
        x*40-20 + cos(t*s*6) + sin(t*s*2),
        y*40-20 + sin(t*s*4) + cos(t*s*4),
        z*40-20 + cos(t*s*2) + sin(t*s*6),]}
      scale={(t,s) => Array(3).fill(
              max(.3, cos((t+s*10)*s))*s)}/>
  )}
</Instanced>
```

</td><td>

[![Spheres](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/Spheres.gif)](
    https://tsei.jp/rmol/Flow/Spheres)

</td></tr><tr><td align="center">

###### Dodecas

</td><td>

```tsx
<Instanced count={1000}>
  <dodecahedronBufferGeometry args={[1,0]}/>
  <meshStandardMaterial/>
  {[...Array(1000)].map((_,i) =>
    <Flow key={i} color={colors[i]}
      args={[...Array(4)].map(() => rand())}
      position={(t,s,x,y,z) => [
        ((x-.5)-cos(t*s+x)-sin(t*s/1))*x*100,
        ((y-.5)-sin(t*s+y)-cos(t*s/3))*y*100,
        ((z-.5)-cos(t*s+z)-sin(t*s/5))*z*100,]}
      rotation={(t,s)=>Array(3).fill(cos(t*s))}
      scale={(t,s)=>Array(3).fill(cos(t*s))}/>
  )}
</Instanced>
```

</td><td>

[![Dodecas](
    https://raw.githubusercontent.com/tseijp/react-mol/master/public/Dodecas.gif)](
    https://tsei.jp/rmol/Flow/Dodecas)

</td></tr></table>

<br/><br/><hr/><br/><br/>

### Recipes of Spring

<table><!--*************** Recipes of Spring ***************--><tr align="center"><td><br/>

[![Spring](
    https://img.shields.io/badge/Spring-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)

</td><td><br/>

[![Results](
    https://img.shields.io/badge/Results-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/Atom.tsx)

</td></tr><tr><td>

###### Pieces

</td><td>

[![Pieces](
    https://i.imgur.com/Ca8Ps7B.gif)](
    https://tsei.jp/rmol/Spring/Pieces)
</td></tr><tr><td>

###### Bounds

</td><td>

[![Bounds](
    https://i.imgur.com/tRWK59i.gif)](
    https://tsei.jp/rmol/Spring/Bounds)

</td></tr><tr><td>

###### Pipes

</td><td>

[![Pipes](
    https://i.imgur.com/soxnTL7.gif)](
    https://tsei.jp/rmol/Spring/Pipes)

</td></tr></table>


<!--******************************      ******************************-->
<!--****************************** TODO ******************************-->
<!--******************************      ******************************-->

<details>
<summary>

### Recipes of Tile

</summary>


<table><!--*************** Recipes of Tile ***************--><tr><td><br/>

[![Tile](
    https://img.shields.io/badge/Tile-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)

</td><td><br/>

[![Code](
    https://img.shields.io/badge/Code-black.svg)](
    https://github.com/tseijp/react-mol/blob/master/src/index.tsx)

</td></tr></table>

<br/><br/><hr/><br/><br/>
</details>

<details>
<summary>

### Recipes of Plant

</summary>

__TODO__

<table>
<tr><td>

###### Koch Curve

```tsx
<F recursion LR={[90,90]}>
  <F />
  <F L/>
  <F R/>
  <F L/>
</F>
```

</td></tr>
<tr><td>

###### Meandering Snake

```tsx
<F recursion
   LR={[90,90]}>
  <F />
  <F LL/>
  <F RR/>
  <F L/>
  <F R/>
</F>
```

</td></tr>
<tr><td>

###### Urban Charting

```tsx
<F recursion
   LR={[90,90]}>
  <F/>
  <F LL/>
  <F RR/>
  <F RR/>
  <F LL/>
</F>
```

</table>

</details>
