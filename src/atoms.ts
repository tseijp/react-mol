import {atom} from 'jotai'
import {Atom} from './types'
export const atomsAtom = atom<Atom[]>([])

export const addAtom = atom(null, (get, set, newAtom: Atom) => {
    set(atomsAtom, [...get(atomsAtom), newAtom])
})
export const delAtom = atom(null, (get, set, id: number) => {
    set(atomsAtom, get(atomsAtom).filter(value => value.id!== id))
})
