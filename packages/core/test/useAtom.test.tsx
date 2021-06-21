import React from 'react'
import { useAtom } from '../src'
import { renderHook, act } from "@testing-library/react-hooks";


describe('useAtom', () => {
    it('basic', () => {
        const props = {}
        const ref = React.createRef()
        const { result } = renderHook(() => useAtom(props, ref))
        act(() => {
            expect(result.current).toBeTruthy()
        })
    })
})
