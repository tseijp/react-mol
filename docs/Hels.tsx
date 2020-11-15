import React from 'react'
import {Poly, Hel} from '../src'

export const Archimedes =()=> (
    <Poly n={100}>
        {next =>
            <Hel>
                {next}
            </Hel>
        }
    </Poly>
)
export const Fermat =()=> (
    <Hel>
    </Hel>
)
export const Power =()=> (
    <Hel>
    </Hel>
)
