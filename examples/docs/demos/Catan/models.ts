const {random} = Math
const defaultRate = {hills:3, forest:4, mountains:3, fields:4, pasture:4}
const defaultRoll = {2:1, 3:2, 4:2, 5:2, 6:2, 8:2, 9:2, 10:2, 11:2, 12:2}

export class Honeycomb {
    #map = new Map<string, any>()
    #rate = new Map<string, number>()
    #roll = new Map<number, number>()

    constructor ({rate=defaultRate, roll=defaultRoll}={}) {
        Object.entries(rate).forEach(([v, i]) => void this.#rate.set( v, i))
        Object.entries(roll).forEach(([v, i]) => void this.#roll.set(+v, i))
        this.get = this.get.bind(this)
        this.set = this.set.bind(this)
        this.token = this.token.bind(this)
        this.terrain = this.terrain.bind(this)
        this.randomGet = this.randomGet.bind(this)
    }

    get (...$: number[]): any {
        return this.#map.get(`${$}`)
            || this.#map.set(`${$}`, {$}).get(`${$}`)
    }

    set (args: any, ...$: number[]) {
        return this.#map.set(`${$}`, {...this.get(...$), ...args})
    }

    token (...$: number[]): number {
        const [token, value] = this.randomGet(this.#roll)
        if (value < 0 && this.#roll.delete(token))
            return this.token(...$)
        this.#roll.set(token, value)
        this.set({token}, ...$)
        return token
    }

    terrain (...$: number[]): string {
        const [terrain, value] = this.randomGet(this.#rate)
        if (value < 0 && this.#rate.delete(terrain))
                return this.terrain(...$)
        this.#rate.set(terrain, value)
        this.set({terrain}, ...$)
        return terrain
    }

    randomGet (map: any): [any, number] {
        const key = Array.from(map.keys())[~~(map.size*random())],
            value = (map.get(key) || 1) - 1 // 0, 1, 2 ...
        return [key, value]
    }
}
//                    xy=4
//                340\____/ 430
//           240\____/xy=3\____/ 420
//      140\____/ 230\____/ 320\____/ 410
//↖y=4\____/ 130\____/xy=2\____/ 310\____/x=4↗
//____/↖y=3\____/ 120\____/ 210\____/x=3↗\____
// 041\____/↖y=2\____/xy=1\____/x=2↗\____/ 401
//____/ 031\____/↖y=1\____/x=1↗\____/ 301\____
//*042\____/ 021\____/↓↖0↗\____/ 201\____/*402
//____/ 032\____/yz=1\____/xz=1\____/ 302\____
// 043\____/yz=2\____/↓z=1\____/xz=2\____/ 403
//____/yz=3\____/ 012\____/ 102\____/xz=3\____
//yz=4\____/ 023\____/↓z=2\____/ 203\____/xz=4
//    / 034\____/ 013\____/ 103\____/ 304\
//         / 024\____/↓z=3\____/ 204\
//              / 014\____/ 104\
//                   /↓z=4\
//5=24 4=18 3=12  2=6  1=1
// an =  a(n-1) map i,j,k => i+ | j+ | k+
//
// hasFloor (i=0, j=0) {
//     if (this.terrains.get(i)?.has(j)) return true
//     if (!this.terrains.has(i))
//         this.terrains.set(i, new Map())
//     return this.terrains.get(i).set(j, undefined) || false
// }
// const dirs = [
//     [ 0, 0], //       ____
//     [ 0,-1], //  ____/-1,0\____
//     [-1, 0], // /0,-1\____/-1,1\
//     [-1, 1], // \____/ ↓↘ \____/
//     [ 0, 1], // /1,-1\____/0,+1\
//     [ 1, 0], // \____/+1,0\____/
//     [ 1,-1], //      \____/
// ]
