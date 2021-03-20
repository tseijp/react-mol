import {atom} from 'jotai'
import {Spread} from './utils'

export type AtomObject = Spread<THREE.Group, {
    id: number,
    group: THREE.Group,
    color: THREE.Color
}>

export const atomsAtom = atom<AtomObject[]>([])

export const addAtom = atom(null, (get, set, newAtom: AtomObject) => {
    set(atomsAtom, [...get(atomsAtom), newAtom])
})
export const delAtom = atom(null, (get, set, id: number) => {
    set(atomsAtom, get(atomsAtom).filter(value => value.id!== id))
})
