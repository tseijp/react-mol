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

export type Drag = {
    hover?: any,
    road?: string,
    settle?: string,
    terrain?: string,
}

export const dragRoadAtom = atom({} as Drag, (...args) => {setDrag(dragRoadAtom, ...args)})

export const dragSettleAtom = atom({} as Drag, (...args) => {setDrag(dragSettleAtom, ...args)})

export const dragTerrainAtom = atom({} as Drag, (...args) => {setDrag(dragTerrainAtom, ...args)})

export const hoverAtom = atom({} as Drag)

export const colorAtom = atom({} as any)

function setDrag (...args: any) {
    const [_dragAtom, get, set, {hover, ...drag}] = args
    hover === undefined
    ? set(_dragAtom, drag)
    : set(hoverAtom, hover)
    get(_dragAtom).hover = hover
}
