import React from 'react'
import ReactDOM from 'react-dom'
import {Canvas} from 'react-three-fiber'
import {Helmet} from 'react-helmet-async';
import {OrbitControls} from 'drei'
import {HelmetProvider} from 'react-helmet-async'
import {Controls, ControlsProvider} from 'react-three-gui';
import {unregister, usePage, AppPage}  from './utils'
import {Card, Split, Trees} from '@tsei/core'
import {useGrid} from 'use-grid'
import {Code} from '@tsei/mdmd'
import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const STYLES: {[key:string]:React.CSSProperties} = {
    top : {overflowX:"hidden",minHeight:"100%",},
    card: {width:"100%",height:"100%"},
    ctrl: {position:"relative",width:"100%",top:0,left:0,margin:0,padding:0},
    note: {width:"100%", height:"100%", display:"block", padding:"1rem",}
}
// ************************* COMPONENTS ************************* //
const HookNote = (props:any) => <div {...props} style={STYLES.note}/>
const HookCard = (props:any) => <Card {...props} min={-1} style={STYLES.card} rate={.1} />
const HookCode = (props:any) => props.code && <Code {...props}/>
const HookCtrl = (props:any) => <Controls {...props} anchor='top_left' style={STYLES.ctrl} collapsed={true}/>
const HookTree = ({children}: any) => <Trees>{children}</Trees>
const HookCanvas = ({children}: any) => (
    <Canvas pixelRatio={window.devicePixelRatio}
            onCreated={({gl}) => gl.setClearColor('lightpink')}
            camera={{fov: 75, position: [0, 0, 5]}}
            style={{width: '100%', height: 'calc(100vh - 2rem)'}}
            gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
        <ambientLight intensity={.3} />
        <pointLight position={[ 100, 100, 100]} intensity={2.2} />
        <pointLight position={[-100,-100,-100]} intensity={5} color="pink" />
        <OrbitControls />
        <React.Suspense fallback={null}>
            {React.useMemo(() => children, [children])}
        </React.Suspense>
    </Canvas>
)
// ************************* APP ************************* //
function App () {
    const [,set] = React.useState(0)
    const [dark] = useGrid<number>({init:0, md:1, lg:0  })
    const [size] = useGrid<number>({init:0, md:1, lg:1.5})
    const [side] = useGrid({xs:0,lg:89/233})
    const [page, setPage] = usePage<any>(AppPage)
    const trees = React.useMemo(() => page.keys.map((file:string[], i="") =>
        <span key={i} style={{fontSize:"1rem"}}>
            {file.map(name => name && name!=="default" &&
            <span key={name} onClick={() => setPage({file:file[0], name})}>{name}</span>
            )}
        </span>
    ), [page.keys, setPage])
    if (page.hash==="#app")
        return (
        <HookNote>
            <HookCard {...{dark,size}}>
                <HookCanvas {...{dark,size}}><page.Demo/></HookCanvas>
            </HookCard>
            <button onClick={()=>set(p=>p+1)}>Render</button>
        </HookNote>
    )
    return (
        <div style={STYLES.top}>
            <Split order={page.Demo? [side, -1]: [1, 0]} min={.1}>
                <HookNote>
                    <HookCard {...{dark,size}}><HookCtrl/></HookCard>
                    <HookCard {...{dark,size}}><HookTree>{trees}</HookTree></HookCard>
                    <HookCard {...{dark,size}}><HookCode code={page.code}/></HookCard>
                    <button onClick={()=>set(p=>p+1)}>Render</button>
                </HookNote>
                <HookNote>
                    <HookCard {...{dark,size}}>
                        <HookCanvas {...{dark,size}}><page.Demo/></HookCanvas>
                    </HookCard>
                </HookNote>
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
    <ControlsProvider>
      <App/>
    </ControlsProvider>
  </HelmetProvider>
, document.getElementById('root'));
unregister();
