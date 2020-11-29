import React from 'react'
import ReactDOM from 'react-dom'
import {unregister}  from './utils'
import {HelmetProvider} from 'react-helmet-async'
import {Canvas} from 'react-three-fiber'
import {OrbitControls} from 'drei'
import {Controls} from 'react-three-gui';
import {Helmet} from 'react-helmet-async';
import {useGrid} from 'use-grid'
import {Card, Code, Notes, Split, Trees} from '@tsei/core'

import DEMOS from './demos'
// import CODES from './codes'

const STYLES: {[key:string]:React.CSSProperties} = {
    top : {position:"relative",overflowX:"hidden",minHeight:"100%",},
    item: {position:"relative",height:"100vh",},
    card: {position:"relative",overflow:"hidden",width:"100%",height:"100%"},
    ctrl: {position:"relative",width:"100%",top:0,left:0,margin:0,padding:0},
    note: {}
}
// ************************* COMPONENTS ************************* //
const HookCard = (props:any) => <Card {...props}min={-1} style={STYLES.card} rate={.1} />
const HookCode = (props:any) => <Code {...props}/>
const HookCtrl = (props:any) => <Controls {...props} anchor='top_left' style={STYLES.ctrl} collapsed={true}/>
const HookTree = ({trees}: any) => <Trees style={{fontSize:25}}>{trees}</Trees>
const HookCanvas = ({children}: any) => (
    <Canvas
        style={{position:"relative",top:0, left:0,width:'100%',height:'100%'}}
        pixelRatio={window.devicePixelRatio}
        onCreated={({ gl }) => gl.setClearColor('lightpink')}
        gl={{ alpha: true, antialias: false, logarithmicDepthBuffer: true }}
        camera={{ fov: 75, position: [0, 0, 5] }}>
        <ambientLight intensity={.3} />
        <pointLight position={[ 100, 100, 100]} intensity={2.2} />
        <pointLight position={[-100,-100,-100]} intensity={5} color="pink" />
        <OrbitControls />
        <React.Suspense fallback={null}>
            {children}
        </React.Suspense>
    </Canvas>
)
// ************************* APP ************************* //
function App () {
    const [dark, ] = useGrid<number>({init:0, md:1, lg:0  })
    const [size, ] = useGrid<number>({init:0, md:1, lg:1.5})
    const [side, ] = useGrid({xs:0,lg:89/233})
    // const [page, ] = usePage({})
    const trees = React.useMemo(() =>
        Object.entries(DEMOS).map(([file, values]) =>
        <>{[
            <a href={`/rmol/${file}/`} style={{color:"black"}} key={file}>{file}</a>,
            ...Object.keys(values).map(name => name!=="default" &&
                <a href={`/rmol/${file}/${name}/`} style={{color:"black"}} key={file+name}>{name}</a>
            ).filter(v=>v)
        ]}</>
    ), [])
    return (
        <div style={STYLES.top}>
            <Split order={[side, -1]} min={.1} styleItem={STYLES.item}>
                <Notes {...{dark,size}} space="1rem" style={STYLES.note}>
                    <HookCard {...{dark,size}}>
                        <HookCtrl/>
                    </HookCard>
                    <HookCard {...{dark,size}}>
                        <HookTree {...{trees}} />
                    </HookCard>
                </Notes>
                <Notes {...{dark,size}} space="1rem" style={STYLES.note}>
                    <HookCard {...{dark,size}}>
                        <HookCanvas {...{dark,size}} />
                    </HookCard>
                    <HookCard {...{dark,size}}>
                        <HookCode />
                    </HookCard>
                </Notes>
            </Split>
            <Helmet>
                <title>{window.location.pathname.split('/').slice(-1)[0]}</title>
                <meta charSet="utf-8" />
                <meta name="Hatena::Bookmark" content="nocomment" />
                <link rel="canonical" href="https://tsei.jp/" />
            </Helmet>
        </div>
    )
}

ReactDOM.render(
  <HelmetProvider>
    <App/>
  </HelmetProvider>
, document.getElementById('root'));
unregister();
// TODO DELETE
// import * as HEL from './Hel'
// import * as Mol from './Mol'
// import * as FLOW from './Flow'
// import * as PLANT from './Plant'
// {Object.entries(Mol).map(([k, V]) =>
// <Route path={"/rmol/m/"+k}   component={()=><App><V/></App>} key={k}/> )}
// {Object.entries(HEL).map(([k, V]) =>
// <Route path={"/rmol/h/"+k} component={()=><App><V/></App>} key={k}/> )}
// {Object.entries(FLOW).map(([k, V]) =>
// <Route path={"/rmol/f/"+k} component={()=><App><V/></App>} key={k}/> )}
// <Route path="/rmol/"       component={()=><App><Basic/></App>} exact/>
// <Route path="/rmol/mol/"     component={()=><App><Mol.Random/></App>} exact/>
// <Route path="/rmol/hel/"     component={()=><App><HEL.Archimedes/></App>} exact/>
// <Route path="/rmol/flow/"     component={()=><App><FLOW.Points/></App>} exact/>
// <Route path="/rmol/about/"  component={()=><App><About/></App>} exact/>
// <Route path="/rmol/basic/"  component={()=><App><Basic/></App>} exact/>
