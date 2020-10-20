// TODO
export type MolValue<S extends object> = {
    bond: number
}
export type UseMolsProps = {
    bond: number
}
export type SetMols = () => null

export function useMols <T extends object> (
    length: 1|2|3|4,
    ...props:UseMolsProps[]
) : [MolValue<T>, SetMols]

export function useMols (length=1, ...props:any) {
    const set = () => null
    const mols = {bond: 0}
    return [mols, set]
}
