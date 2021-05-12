import { atom } from 'jotai'
import {Honeycomb} from './models'

export const dissableControlAtom = atom(false)

export type Any = {
    [key: string]: any,
}

export const dragAtom = atom<Any | undefined>(undefined)

export const hoverAtom = atom<Any | undefined>(undefined)

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
