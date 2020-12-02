import React from 'react'
import ReactDOM from 'react-dom'
import {Canvas} from 'react-three-fiber'
import {Helmet} from 'react-helmet-async';
import {Controls} from 'react-three-gui';
import {OrbitControls} from 'drei'
import {HelmetProvider} from 'react-helmet-async'
import {Card, Code, Notes, Split, Trees} from '@tsei/core'
import {unregister, usePage, AppPage}  from './utils'
import {useGrid} from 'use-grid'
import './styles.css'

const STYLES: {[key:string]:React.CSSProperties} = {
    top : {position:"relative",transition:"1s",overflowX:"hidden",minHeight:"100%",},
    item: {position:"relative",height:"100vh",},
    card: {position:"relative",width:"100%",height:"100%"},
    ctrl: {position:"relative",width:"100%",top:0,left:0,margin:0,padding:0},
    note: {}
}
// ************************* COMPONENTS ************************* //
const HookCard = (props:any) => <Card {...props}min={-1} style={STYLES.card} rate={.1} />
const HookCode = (props:any) => <Code {...props}/>
const HookCtrl = (props:any) => <Controls {...props} anchor='top_left' style={STYLES.ctrl} collapsed={true}/>
const HookTree = ({children}: any) => <Trees style={{fontSize:15}}>{children}</Trees>
const HookCanvas = ({children}: any) => (
    <Canvas style={{width:'100%',height:'calc(100vh - 2rem)'}}
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
    const [page, setPage] = usePage<any>(AppPage)
    const trees = React.useMemo(() => page.keys.map((file:string[], i="") =>
        <span key={i}>
            {file.map(name => name && name!=="default" &&
            <span key={name} onClick={() => setPage({file:file[0], name})}>{name}</span>
            )}
        </span>
    ), [page.keys, setPage])
    return (
        <div style={STYLES.top}>
            <Split order={[side, -1]} min={.1} styleItem={STYLES.item}>
                <Notes {...{dark,size}} space="1rem" style={STYLES.note}>
                    <HookCard {...{dark,size}}>
                        <HookCtrl/>
                    </HookCard>
                    <HookCard {...{dark,size}}>
                        <HookTree>{trees}</HookTree>
                    </HookCard>
                </Notes>
                <Notes {...{dark,size}} space="1rem" style={STYLES.note}>
                    <HookCard {...{dark,size}}>
                        <HookCanvas {...{dark,size}}><page.Demo/></HookCanvas>
                    </HookCard>
                    <HookCard {...{dark,size}}>
                        <HookCode code={"HI"}/>
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
