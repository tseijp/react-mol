import React from 'react'
import ReactDOM from 'react-dom'
import {Leva} from 'leva'
import {Helmet} from 'react-helmet-async';
import {Canvas} from '@react-three/fiber'
import {useGrid} from 'use-grid'
import {HelmetProvider} from 'react-helmet-async'
import {useAtom, Provider} from 'jotai'
import {Card, Split, Trees} from '@tsei/core'
import {pageAtom, filenameAtom, getTrees, unregister, STYLES, COLORS}  from './utils'

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

// ************************* COMPONENTS ************************* //
const HookNote = (props:any) => <div {...props} style={STYLES.note}/>
const HookCard = (props:any) => <Card {...props} min={-1} style={STYLES.card} rate={.1} />
const HookCode = (props:any) => props.code// && <Code {...props}/>
const HookCtrl = (props:any) => <Leva fill flat hideTitleBar titleBar={{drag:false}} {...props} style={STYLES.ctrl}/>
const HookTree = (props: any) => <Trees {...props} size={.5}/>
const HookCanvas = ({children, height='calc(100vh - 2rem)'}: any) => (
  <Canvas
    onCreated={({gl}: any) => gl.setClearColor(COLORS[~~(Math.random()*COLORS.length)])}
    camera={{fov: 75, position: [0, 0, 5]}}
    style={{width: '100%', height}}
    gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
    <ambientLight intensity={.3} />
    <pointLight position={[ 100, 100, 100]} intensity={2.5} />
    <React.Suspense fallback={null}>
      {React.useMemo(() => children, [children])}
    </React.Suspense>
  </Canvas>
)

function App () {
  const [, update] = React.useState(0)
  const [dark, size, side] = useGrid({init:[0, 0, 0], md:[1, 1, 0], lg:[0, 1.5, 89/233]})[0]
  const [[file, name], set] = useAtom(filenameAtom)
  const [{keys, code, Demo}] = useAtom(pageAtom)
  const trees = React.useMemo(() => keys.map(getTrees(set)), [keys, set])

  if (window.location.hash)
    return <HookCanvas height='100%'><Demo/></HookCanvas>

  return (
    <div style={STYLES.top}>
      <Split order={Demo? [side, -1]: [1, 0]} min={.1}>
        <HookNote>
          <HookCard {...{dark,size}}><HookCtrl/></HookCard>
          <HookCard {...{dark,size}}><HookTree {...{dark}}>{trees}</HookTree></HookCard>
          <HookCard {...{dark,size}}><HookCode code={code}/></HookCard>
        </HookNote>
        <HookNote>
          <HookCard {...{dark,size}}>
            <HookCanvas {...{dark,size}}>
              <Demo/>
            </HookCanvas>
          </HookCard>
          <button onClick={() => update(v => v++)}>update</button>
        </HookNote>
      </Split>
      <Helmet>
        <title>{file} {name}</title>
        <meta charSet="utf-8" />
        <meta name="Hatena::Bookmark" content="nocomment" />
        <link rel="canonical" href="https://tsei.jp/rmol" />
      </Helmet>
    </div>
  )
}

ReactDOM.render(
  <HelmetProvider>
    <Provider>
      <App/>
    </Provider>
  </HelmetProvider>
, document.getElementById('root'));
unregister();
