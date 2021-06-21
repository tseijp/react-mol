import React from 'react'
import {useInstanced} from '../src'
import { renderHook, act } from "@testing-library/react-hooks";
import {Canvas} from '@react-three/fiber'

describe('with canvas', () => {
    it('basic', () => {
        const wrapper = (props: any) => <Canvas {...props}/>
        const ref = React.createRef()
        const props = {}
        const { result } = renderHook(() => useInstanced(props, ref), {wrapper})
        act(() => {
            expect(result.current).toBeTruthy()
        })
        act(() => {
        })
    })
})
