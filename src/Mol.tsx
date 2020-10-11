import {useMol, UseMolProps} from './useMol'
export type MolProps <S extends object> = unknown & UseMolProps & {
    children: (props:MolProps<S>) => JSX.Element | null
}
export function Mol <S extends object> (props:MolProps<S>) : JSX.Element | null
export function Mol <S extends object> (props:{
    bond:number
} & Omit<MolProps<S>, 'bond'>) : JSX.Element | null

export function Mol ({children, ...props} : any) {
    return children(useMol(props))
}
