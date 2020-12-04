import DEMOS from '../demos'
import CODES from '../codes'


const get = (obj={},key='') => key in obj ? (obj as any)[key] : null
const keys = Object.entries(DEMOS)
    .map(([file, demos]: any) => [file, ...Object.keys(demos)])
export type AppPage = {
    file: string,
    name: string,
    keys: string[],
    code: string,
    Demo: any,
}
export const AppPage = {
    pathname: ({file="", name=""}) => `/rmol/${file}/${!name||name==="default"
            ? ""
            : name + "/"}`,
    file: window.location.pathname.split('/').filter(v=>v).find((_,i)=>i===1)||"",
    name: window.location.pathname.split('/').filter(v=>v).find((_,i)=>i===2)||"",
    code: ({file="", name=""}) => get(get(CODES, file) || {}, name||"default")||"No code",
    Demo: ({file="", name=""}) => get(get(DEMOS, file) || {}, name||"default")||(()=>null),
    keys,
}
export * from './Page'
export * from './serviceWorker'
