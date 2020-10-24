import {
    addVec3,
    scaleVec3,
    calcPosition.
    calcRotation
} from '../src'
describe('addVec3', () => {
    it('basic', () => {
        expect(addVec3([1,0,0], [0,1,0])).toStrictEqual([.5,.5,0])
        expect(addVec3([1,0,0], [0,1,0], [ 1,1])).toStrictEqual([1,1,0])
        expect(addVec3([1,0,0], [0,1,0], [-1,1])).toStrictEqual([-1,1,0])
    })
})
describe('scaleVec3', () => {
    it('basic', () => {
        expect(scaleVec3([3,0,0], [0,4,0])).toStrictEqual([.5,5,.5])
    })
})
// describe('calcPosition', () => {
//     it('H2O', () => {
//         expect(calcPosition(
//             {position:[0,0,0], element:6, children:Array(2)},
//             {position:[0,0,0], element:1}
//         )).toStrictEqual([.5,5,.5])
//     })
// })
