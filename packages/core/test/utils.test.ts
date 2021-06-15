import {
    mergeVec3,
    scaleVec3,
} from '../src'
describe('mergeVec3', () => {
    it('basic', () => {
        expect(mergeVec3([.5,.5], [1,0,0], [0,1,0])).toStrictEqual([.5,.5,0])
        expect(mergeVec3([ 1, 1], [1,0,0], [0,1,0])).toStrictEqual([1,1,0])
        expect(mergeVec3([-1, 1], [1,0,0], [0,1,0])).toStrictEqual([-1,1,0])
    })
})
describe('scaleVec3', () => {
    it('basic', () => {
        expect(scaleVec3([3,4,0])).toStrictEqual([.5,5,.5])
    })
})
