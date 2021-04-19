import React from 'react'
import ReactDOM from 'react-dom'
import {Helmet} from 'react-helmet-async';
import {OrbitControls} from '@react-three/drei'
import {HelmetProvider} from 'react-helmet-async'
import {Controls} from 'react-three-gui';
import {unregister, usePage, AppPage, STYLES, COLORS}  from './utils'
import {Card, Split, Trees} from '@tsei/core'
import {useGrid} from 'use-grid'
import {Code} from '@tsei/mdmd'
import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

// ************************* COMPONENTS ************************* //
const HookNote = (props:any) => <div {...props} style={STYLES.note}/>
const HookCard = (props:any) => <Card {...props} min={-1} style={STYLES.card} rate={.1} />
const HookCode = (props:any) => props.code && <Code {...props}/>
const HookCtrl = (props:any) => <Controls {...props} anchor='top_left' style={STYLES.ctrl}/>
const HookTree = ({children}: any) => <Trees size={.5}>{children}</Trees>
const HookCanvas = ({children}: any) => (
    <Controls.Canvas pixelRatio={window.devicePixelRatio}
            onCreated={({gl}: any) => gl.setClearColor(COLORS[~~(Math.random()*COLORS.length)])}
            camera={{fov: 75, position: [0, 0, 5]}}
            style={{width: '100%', height: 'calc(100vh - 2rem)'}}
            gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
        <ambientLight intensity={.3} />
        <pointLight position={[ 100, 100, 100]} intensity={2.5} />
        <pointLight position={[-100,-100, 100]} intensity={5} color="pink" />
        <OrbitControls {...({} as any)}/>
        <React.Suspense fallback={null}>
            {React.useMemo(() => children, [children])}
        </React.Suspense>
    </Controls.Canvas>
)
// ************************* APP ************************* //
function App () {
    const [dark] = useGrid<number>({init:0, md:1, lg:0  })
    const [size] = useGrid<number>({init:0, md:1, lg:1.5})
    const [side] = useGrid({xs:0,lg:89/233})
    const [page, setPage] = usePage<any>(AppPage)
    const order = React.useMemo(() => page.Demo? [side, -1]: [1, 0], [page.Demo, side])
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
        </HookNote>
    )
    return (
        <div style={STYLES.top}>
            <Split order={order} min={.1}>
                <HookNote>
                    <HookCard {...{dark,size}}><HookCtrl/></HookCard>
                    <HookCard {...{dark,size}}><HookTree>{trees}</HookTree></HookCard>
                    <HookCard {...{dark,size}}><HookCode code={page.code}/></HookCard>
                </HookNote>
                <HookNote>
                    <HookCard {...{dark,size}}>
                        <HookCanvas {...{dark,size}}>
                            <page.Demo/>
                        </HookCanvas>
                    </HookCard>
                </HookNote>
            </Split>
            <Helmet>
                <title>{page.file} {page.name}</title>
                <meta charSet="utf-8" />
                <meta name="Hatena::Bookmark" content="nocomment" />
                <link rel="canonical" href="https://tsei.jp/" />
            </Helmet>
        </div>
    )
}

ReactDOM.render(
  <HelmetProvider>
    <Controls.Provider>
      <App/>
    </Controls.Provider>
  </HelmetProvider>
, document.getElementById('root'));
unregister();
