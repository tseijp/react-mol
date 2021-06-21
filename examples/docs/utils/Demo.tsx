import React, {Suspense} from 'react'
import Layout from '@theme/Layout'
import {Canvas} from '@react-three/fiber'
// import {Leva} from 'leva'
// import {useGrid} from 'use-grid'
// import {useAtom, Provider} from 'jotai'
// import {Card, Split, Trees} from '@tsei/core'
// import {pageAtom, filenameAtom, getTrees, STYLES, colors}  from './utils'

import {colors} from './colors'

const handleCreated = ({gl}: any) => gl.setClearColor(colors[Math.random()*colors.length << 0])

export function Demo (props: any) {
    const {as} = props
    const hash = useHash()
    return (
        <Layout>
          <Canvas
            onCreated={handleCreated}
            style={{width: '100%', height: 'calc(100vh - 50px)'}}
            gl={{alpha: true, antialias: false, logarithmicDepthBuffer: true}}>
            <Suspense fallback={null}>
              {React.createElement(as[hash] || 'group')}
            </Suspense>
            <ambientLight intensity={.3} />
            <pointLight position={[ 100, 100, 100]} intensity={2.5} />
          </Canvas>
        </Layout>
    )
}

export function useHash () {
    const [hash, set] = React.useState('')
    React.useEffect(() => {
        if (hash === '')
            set(window.location.hash.split('#').join('') || 'default')
    }, [hash])

    return hash
}
