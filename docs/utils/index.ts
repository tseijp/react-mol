
import DEMOS from '../demos'
import CODES from '../codes'

export const STYLES: {[key:string]:React.CSSProperties} = {
    top : {position:"relative",overflowX:"hidden",minHeight:"100%",},
    item: {position:"relative",height:"100vh",},
    card: {position:"relative",overflow:"hidden",width:"100%",height:"100%"},
    ctrl: {position:"relative",width:"100%",top:0,left:0,margin:0,padding:0},
    note: {}
}
const get = (obj={},key='') => key in obj ? (obj as any)[key] : null
const keys = Object.entries(DEMOS)
    .map(([file, demos]: any) => [file, ...Object.keys(demos)])

export type AppPage = {
    file: string,
    name: string,
    keys: string[],
    Demo: any,
    code: any
}
export const AppPage = {
    pathname: ({file="", name=""}) => `/rmol/${file}/${!name||name==="default"
            ? ""
            : name + "/"}`,
    file: window.location.pathname.split('/').filter(v=>v).find((_,i)=>i===1)||"",
    name: window.location.pathname.split('/').filter(v=>v).find((_,i)=>i===2)||"",
    code: ({file="", name=""}) => get(get(CODES, file) || {}, name||"default"||"No code"),
    Demo: ({file="", name=""}) => get(get(DEMOS, file) || {}, name||"default")||(()=>null),
    keys,
}
export * from './Page'
export * from './serviceWorker'
