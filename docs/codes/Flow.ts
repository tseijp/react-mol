export const Points = `
<Render position={[-12.5,0,-25]} max={2500}>
  <sphereBufferGeometry/>
  <meshPhongMaterial   />
  {Array(2500).fill(0).map((_,i) =>
    <Flow key={i} color={colors[i]}
      args={(t,x,_,z) => [
        sin((x+t)/3)+sin((z+t)/2)]}
      position={r => [i%c,r,i/c%c]}
      scale={r => [r/3,r/3,r/3]} />
  )}
</Render>
`
export const Boxes = `
<Render max={10**3}>
  <boxBufferGeometry />
  <meshPhongMaterial/>
  {Array(1000).fill(0).map((_,i) =>
    <Flow key={i} color={colors[i]}
      args={(t,x,y,z) => [
        sin(x/4+t)+sin(y/4+t)+sin(z/4+t) ]}
      position={[i%10-5,i/10%10-5,i/100-5]}
      rotation={r => [0,r*2,r*3]}
      scale={r => [r/4,r/4,r/4]}/>
  )}
</Render>
`
export const Spheres = `
<Render max={1000}>
  <sphereBufferGeometry args={[1,32,32]}/>
  <meshPhongMaterial color={0xffffff}/>
  {Array(1000).fill(0).map((_, i) =>
    <Flow key={i} color={colors[i]}
      args={[...Array(4)].map(() => rand())}
      position={(t,s,x,y,z) => [
        x*40-20 + cos(t*s*6) + sin(t*s*2),
        y*40-20 + sin(t*s*4) + cos(t*s*4),
        z*40-20 + cos(t*s*2) + sin(t*s*6),]}
      scale={(t,s) => Array(3).fill(
              max(.3, cos((t+s*10)*s))*s)}/>
  )}
</Render>
`
export const Particles = `
<Render max={c}>
  <dodecahedronBufferGeometry args={[0.2, 0]} />
  <meshPhongMaterial />
  {Array(c).fill(0).map((_, i) =>
    <Flow key={i} color={colors[i]}
        args={[...Array(5)].map(() => rand(100,-50))}
        position={(t,s,f,x,y,z) => [
            x + cos(t*s*f/50) + sin(t*s/50)*f/10,
            y + sin(t*s*f/50) + cos(t*s/50)*f/10,
            z + cos(t*s*f/50) + sin(t*s/50)*f/10,]}
        scale={t => Array(3).fill(Math.cos(t)) as Vec3}/>
  )}
</Render>
`
export const Dodecas = `
<Render max={1000}>
  <dodecahedronBufferGeometry args={[1,0]}/>
  <meshStandardMaterial/>
  {Array(1000).fill(0).map((_,i) =>
    <Flow key={i} color={colors[i]}
      args={[...Array(4)].map(_ => rand())}
      position={(t,s,x,y,z) => [
        ((x-.5)-cos(t*s+x)-sin(t*s/1))*x*100,
        ((y-.5)-sin(t*s+y)-cos(t*s/3))*y*100,
        ((z-.5)-cos(t*s+z)-sin(t*s/5))*z*100,]}
      rotation={(t,s)=>Array(3).fill(cos(t*s))}
      scale={(t,s)=>Array(3).fill(cos(t*s))}/>
  )}
</Render>
`
