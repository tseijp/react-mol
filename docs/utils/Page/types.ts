export type Merge<A,B> = {[K in keyof A]:K extends keyof B ? B[K] : A[K] } & B
export type BasicProps<T>  = (()=>T) | T
export type BasicState<T>  = ((pre:T)=>T) | T
export type BasicAction<T> = (fn:BasicState<T>) => void
export type URL = {
    hash: string; hostname: string; search    : string;
    host: string; username: string; protocol  : string;
    href: string; password: string; toString(): string;
    port: string; pathname: string; readonly origin: string;
}
// ************************* 👌 For usePage 👌 ************************* //
export type PageConfig<T={}> = Partial<{
    [key:string]:any,
    onChange:null|(()=>void),
}>
export type DefaultPage<T={}> = {
    [key:string]:any, //config:PageConfig<T>|null, //TODO : DEV
    id:string,language:string,urls:URL[]
    isHome :boolean,protocol:string,hostname:string,hash:string,
    isLocal:boolean,portname:string,pathname:string,search:string,
}
export type MultiPage<T> = {
    [K in keyof T] : null|T[K]
  | ( (p:Page<T>) => null|T[K] )
}
export type Page<T extends {}={}> = Merge<DefaultPage<T>,MultiPage<T>>
