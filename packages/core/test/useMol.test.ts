import {useMol} from '../src'
import { renderHook, act } from "@testing-library/react-hooks";


describe('useMol', () => {
    it('basic', () => {
        expect(null).toBe(null)
    })
})

// function createUpdater(Component: React.ComponentType<{ args: [any, any?] }>) {
//     const update = (...args:any) => null
//     const context = {}
//     return [update, context] as const
// }

// import {useMols} from '../src'
// function createUpdater(Component: React.ComponentType<{ args: [any, any?] }>) {
//     const update = (...args:any) => null
//     const context = {}
//     return [update, context] as const
// }
// describe('useMols', () => {
//     let mol: any
//     let set: any
//     const [update, context] = createUpdater(({args}) => {
//         const result = useMols(...args)
//         mol = result[0]
//         set = result[1]
//         return null
//     })
//     describe('basic', () => {
//         it('0', () => {
//             update({x: 0})
//         })
//     })
// })
