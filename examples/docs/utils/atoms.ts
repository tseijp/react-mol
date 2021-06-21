import demo from '../demo'
import {atom} from 'jotai'
import {createElement as el} from 'react'

export const keys = Object.entries(demo).map(([file, d]: any) => [file, ...Object.keys(d)])

export function getTrees (set: any, fontSize="1rem") {
    return (file:string[], i: any) => el(
        'span', {key: i, style: {fontSize}},
        file.map(name => name && name!=="default" &&
            el('span', {key: name, onClick: () => set([file[0], name])}, name)
        )
    )
}

export const pageAtom = atom(
    _ => {
        const [file='', name=''] = _(filenameAtom)
        return {
            keys, file, name,
            Demo: ((demo as any)[file] as any || {})[name] || "",
        }
    }
)

export const filenameAtom = atom(
    ['', ''],
    (_, set, [file='', name='']) => {
        if (typeof window !== 'undefined') {
            if (!file || !name)
                [, file='', name=''] = window.location.hash.split('-').filter(Boolean)
            else
                window.location.hash = `#${file}-${name}`
        }
        set(filenameAtom, [file, name])
    }
)

filenameAtom.onMount = set => void set([])
