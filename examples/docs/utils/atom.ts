import {atom} from 'jotai'
import DEMOS from '../demos'

export const keys = Object.entries(DEMOS).map(([file, demos]: any) => [file, ...Object.keys(demos)])

export const filenameAtom = atom(
    ['', ''],
    (_, set, [file='', name='']) => {
        if (!file || !name)
            [, file='', name=''] = window.location.pathname.split('/').filter(Boolean)
        else
            window.history.pushState('', '', `/rmol/${file}/${name}`)
        set(filenameAtom, [file, name])
    }
)

filenameAtom.onMount = set => void set([])

export const pageAtom = atom(
    _ => {
        const [file='', name=''] = _(filenameAtom)
        return {
            keys, file, name,
            Demo: ((DEMOS as any)[file] as any || {})[name] || "",
        }
    }
)
