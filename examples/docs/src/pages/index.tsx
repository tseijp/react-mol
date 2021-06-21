import React from 'react'
import ReactDOM from 'react-dom'
import Layout from '@theme/Layout'
import BrowserOnly from '@docusaurus/BrowserOnly';
import {Leva} from 'leva'
import {Canvas} from '@react-three/fiber'
import {useGrid} from 'use-grid'
import {useAtom, Provider} from 'jotai'
import {Card, Split, Trees} from '@tsei/core'
import {pageAtom, filenameAtom, getTrees, styles, colors}  from '../../utils'

// ************************* COMPONENTS ************************* //
const HookSplit = (props: any) => <Split {...props}/>
const HookNote = (props:any) => <div {...props} style={styles.note}/>
const HookCard = (props:any) => <Card {...props} min={-1} style={styles.card} rate={.1} />
const HookCtrl = (props:any) => <Leva fill flat hideTitleBar titleBar={{drag:false}} {...props} style={styles.ctrl}/>
const HookTree = (props: any) => <Trees {...props} size={.5}/>
const HookCanvas = ({children, height='calc(100vh - 2rem)'}: any) => (
  <Canvas
    onCreated={({gl}: any) => gl.setClearColor(colors[~~(Math.random()*colors.length)])}
    camera={{fov: 75, position: [0, 0, 5]}}
    style={{width: '100%', height}}
    gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
    <ambientLight intensity={.3} />
    <pointLight position={[ 100, 100, 100]} intensity={2.5} />
    <React.Suspense fallback={null}>
      <BrowserOnly fallback={null}>
        {() => children}
      </BrowserOnly>
    </React.Suspense>
  </Canvas>
)

function App () {
  const [, update] = React.useState(0)
  const [{keys, Demo}] = useAtom(pageAtom)
  const [[file, name], set] = useAtom(filenameAtom)
  const [dark, size, side] = useGrid({init:[0, 0, 0], md:[1, 1, 0], lg:[0, 1.5, 89/233]})[0]
  const trees = React.useMemo(() => keys.map(getTrees(set)), [keys, set])

  if (typeof window === 'undefined')
    return null

  return (
    <Layout
        title={file + " " + name}
        style={styles.top}>
      <HookSplit order={Demo? [side, -1]: [1, 0]} min={.1}>
        <HookNote>
          <HookCard {...{dark,size}}><HookCtrl/></HookCard>
          <HookCard {...{dark,size}}><HookTree {...{dark}}>{trees}</HookTree></HookCard>
        </HookNote>
        <HookNote>
          <HookCard {...{dark,size}}>
            <HookCanvas {...{dark,size}}>
              <Demo/>
            </HookCanvas>
          </HookCard>
          <button onClick={() => update(v => v++)}>update</button>
        </HookNote>
      </HookSplit>
    </Layout>
  )
}

export default function () {
    return (
        <Provider>
          <App/>
        </Provider>
    )
}