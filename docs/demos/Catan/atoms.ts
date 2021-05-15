import { atom } from 'jotai'
import {Honeycomb} from './models'

export const dissableControlAtom = atom(false)

export type Base = {
    [key: string]: any,
    road?: string,
    terrain?: string,
    settlement?: string,
}

export const dragAtom = atom(
    {} as Base,
    (get, set, args: any) => {
        const {hover, ...drag} = args || {}
        hover !== undefined
        ? set(hoverAtom, hover)
        : set(dragAtom, drag)
        get(dragAtom).hover = hover
    }
)

export const hoverAtom = atom({} as Base)

export const colorAtom = atom({} as any)

export const hexesAtom = atom(
    [] as any[],
    (get, set, hex: any) => {
        if (hex?.terrian)
            set(hexesAtom, [...get(hexesAtom), hex])
    }
)

export const honeycombAtom = atom(
    new Honeycomb(),
    (get, _set, hex: any) => {
        const honeycomb = get(honeycombAtom)
        if (honeycomb)
            return
    }
)
