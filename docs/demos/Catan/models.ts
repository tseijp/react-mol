//                    xy=4
//                340\____/ 430
//          *240\____/xy=3\____/*420
//      140\____/ 230\____/ 320\____/ 410
// y=4\____/ 130\____/xy=2\____/ 310\____/ x=4
//____/ y=3\____/ 120\____/ 210\____/ x=3\____
// 041\____/ y=2\____/xy=1\____/ x=2\____/ 401
//____/ 031\____/ y=1\____/ x=1\____/ 301\____
//*042\____/ 021\____/ 000\____/ 201\____/*402
//____/ 032\____/yz=1\____/xz=1\____/ 302\____
// 043\____/yz=2\____/ z=1\____/xz=2\____/ 403
//____/yz=3\____/ 012\____/ 102\____/xz=3\____
//yz=4\____/ 023\____/ z=2\____/ 203\____/xz=4
//    / 034\____/ 013\____/ 103\____/ 304\
//         /*024\____/ z=3\____/*204\
//              / 014\____/ 104\
//                   / z=4\
//5=24 4=18 3=12  2=6  1=1
// an =  a(n-1) map i,j,k => i+ | j+ | k+

const dirs = [
    [ 0, 0], //       ____
    [ 0,-1], //  ____/-1,0\____
    [-1, 0], // /0,-1\____/-1,1\
    [-1, 1], // \____/ ↓↘ \____/
    [ 0, 1], // /1,-1\____/0,+1\
    [ 1, 0], // \____/+1,0\____/
    [ 1,-1], //      \____/
]

export interface Honeycomb {
    terrains: any
    openFloor (i?: number, j?: number): number[][]
    hasFloor (i?: number, j?: number): boolean
}

export class Honeycomb {
    constructor () {
        this.terrains = new Map<number, Map<number, any>>()
        this.hasFloor = this.hasFloor.bind(this)
        this.openFloor = this.openFloor.bind(this)
    }

    openFloor (i=0, j=0) {
        return !this.hasFloor(i, j)
            ? dirs.map(([di, dj]) => [di + i, dj + j])
                  .filter(([di=0, dj=0]) => !this.terrains.get(di)?.has(dj))
            : []
    }

    hasFloor (i=0, j=0) {
        if (this.terrains.get(i)?.has(j)) return true
        if (!this.terrains.has(i))
            this.terrains.set(i, new Map())
        return this.terrains.get(i).set(j, undefined) || false
    }
}
