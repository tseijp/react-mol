import React from 'react'
import ReactDOM from 'react-dom'
import {useGrid} from 'use-grid'
import {useAtom, Provider} from 'jotai'
import {
    Home,
    pageAtom,
    filenameAtom,
    getTrees,
}  from '../../utils'

function App () {
  const [{keys, Demo}] = useAtom(pageAtom)
  const [[file, name], set] = useAtom(filenameAtom)
  const [[dark, size, side]] = useGrid({init:[0, 0, 0], md:[1, 1, 0], lg:[0, 1.5, 89/233]})
  const children = React.useMemo(() => keys.map(getTrees(set)), [keys, set])

  if (typeof window === 'undefined')
    return null

  return (
    <Home title={file + " " + name}>
      <Home.Split order={Demo? [side, -1]: [1, 0]}>
        <Home.Note>
          <Home.Card {...{dark,size}}><Home.Leva /></Home.Card>
          <Home.Card {...{dark,size}}>
          <Home.Trees {...{dark, children}}/>
          </Home.Card>
        </Home.Note>
        <Home.Note>
          <Home.Card {...{dark,size}}>
            <Home.Canvas {...{dark,size}}>
              <Demo/>
            </Home.Canvas>
          </Home.Card>
        </Home.Note>
      </Home.Split>
    </Home>
  )
}

export default function () {
    return (
        <Provider>
          <App/>
        </Provider>
    )
}
