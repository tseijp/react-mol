import { atom } from 'jotai'
import {Honeycomb} from './models'

export const dissableControlAtom = atom(false)

export const honeycombAtom = atom(
    new Honeycomb(),
    (get, _set) => {
        const honeycomb = get(honeycombAtom)
        if (honeycomb)
            return
    }
)

export type Drag = {[key: string]: any, hover?: any}

export const colorAtom = atom({} as any)

export const hoverAtom = atom({} as Drag)

export const dragRobberAtom = atom({} as Drag, (...args) => {setDrag(dragRobberAtom, ...args)})

export const dragRoadAtom = atom({} as Drag, (...args) => {setDrag(dragRoadAtom, ...args)})

export const dragSettleAtom = atom({} as Drag, (...args) => {setDrag(dragSettleAtom, ...args)})

export const dragTerrainAtom = atom({} as Drag, (...args) => {setDrag(dragTerrainAtom, ...args)})

export const dragUserAtom = atom({} as Drag, (...args) => {setDrag(dragUserAtom, ...args)})

function setDrag (_dragAtom: any, ...args: any) {
    const [get, set, {hover, ...drag}] = args
    hover === undefined
    ? set(_dragAtom, drag)
    : set(hoverAtom, hover)
    get(_dragAtom).hover = hover
}
