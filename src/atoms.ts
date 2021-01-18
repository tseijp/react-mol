import {atom} from 'jotai'
import {AtomObject} from './types'

export const atomsAtom = atom<AtomObject[]>([])

export const addAtom = atom(null, (get, set, newAtom: AtomObject) => {
    set(atomsAtom, [...get(atomsAtom), newAtom])
})
export const delAtom = atom(null, (get, set, id: number) => {
    set(atomsAtom, get(atomsAtom).filter(value => value.id!== id))
})
