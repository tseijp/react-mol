import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import {useMols} from './useMols'
describe('useSpring', () => {
    let mol: any
    let set: any
    const [update, context] = createUpdater(({args}) => {
        const result = useMols(...args)
        mol = result[0]
        set = result[1]
        return null
    })
    describe('basic', () => {
        it('0', () => {
            update({x: 0})
            expect(mol).toBe(null)
        })
    })
})

function createUpdater(Component: React.ComponentType<{ args: [any, any?] }>) {
    const update = (...args:any) => null
    const context = {}
    return [update, context] as const
}
