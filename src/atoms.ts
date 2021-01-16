import * as THREE from 'three'
import {atom} from 'jotai'
export type Atom = THREE.Group | {
    id: number,
    group: THREE.Group,
    color: THREE.Color
}
export const atomsAtom = atom<Atom[]>([])

export const addAtom = atom(null, (get, set, newAtom: Atom) => {
    set(atomsAtom, [...get(atomsAtom), newAtom])
})
export const delAtom = atom(null, (get, set, id: number) => {
    set(atomsAtom, get(atomsAtom).filter(value => value.id!== id))
})
