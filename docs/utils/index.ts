import DEMOS from '../demos'
import CODES from '../codes'
export * from './Page'
export * from './serviceWorker'

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
    Demo: ({file="", name=""}) => get(get(DEMOS, file) || {}, name||"default")||null,
    keys,
}

export const STYLES: {[key:string]:React.CSSProperties} = {
    top : {overflowX:"hidden",minHeight:"100%",},
    card: {width:"100%",height:"100%"},
    ctrl: {position:"relative",width:"100%",top:0,left:0,margin:0,padding:0},
    note: {width:"100%", height:"100%", display:"block", padding:"1rem",}
}

export const COLORS = [
    "aliceblue",
    "aqua",
    "aquamarine",
    "azure",
    "bisque",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "chartreuse",
    "coral",
    "crimson",
    "cyan",
    "darkorange",
    "deeppink",
    "deepskyblue",
    "floralwhite",
    "fuchsia",
    "ghostwhite",
    "gold",
    "green",
    "greenyellow",
    "hotpink",
    "ivory",
    "lavenderblush",
    "lemonchiffon",
    "lightcyan",
    "lightpink",
    "lightsalmon",
    "lightyellow",
    "lime",
    "magenta",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "orange",
    "orangered",
    "papayawhip",
    "peachpuff",
    "pink",
    "red",
    "seashell",
    "snow",
    "springgreen",
    "tomato",
    "white",
    "yellow",
]
