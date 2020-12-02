import {PageConfig, Page, URL as U} from './types'
import {joinURL} from '@tsei/core'
// ************************* 👌 use-page 👌 ************************* //
export const equalPathname = (...urls:(U|string|undefined|null|false)[]) =>
    urls.map(u => typeof u==="string"? new URL(u) : u)
        .map(u => u && joinURL(u.pathname, "/"))
        .every((u, _, self) => u===self[0])

export const pageConfig:PageConfig = {onChange:null,}
export const defaultPage = {
    id      :window.location.pathname.split('/').filter(v=>v).find((_,i)=>i===1)||"",
    isHome  :window.location.pathname.split('/').filter(v=>v).length > 1,
    isLocal :window.location.hostname==="localhost",
    protocol:window.location.protocol ||"",
    hostname:window.location.hostname ||"",
    portname:window.location.port     ||"",
    pathname:window.location.pathname ||"",
    search  :window.location.search   ||"",
    hash    :window.location.hash     ||"",
    language:window.navigator.language||"ja",
    urls    :[new URL(window.location.href)],
}
export const joinPage = <T={}>(page:Page<T>):string|string[] => {
    const {protocol,hostname,portname,pathname="",search="",hash=""} = page;
    const arr  =[protocol,hostname,portname,pathname,search,hash]
    const getp =(port:any)=>port?`:${port}`:""
    const geti =(i=0,n:any)=>n instanceof Array?(i<n.length?n[i]:n[n.length-1]):n
    if (arr.every(v=>typeof v==="string"))
        return joinURL(`${protocol}//${hostname}${getp(portname)}/`,pathname as any, search as any)
    const maxLength = arr.map(v=>v instanceof Array?v.length:1).reduce((a,b)=>a>b?a:b)
    return [...Array(maxLength)].map((_,i) =>
        joinURL( `${geti(i,protocol)}//${geti(i,hostname)
            }${getp(geti(i,portname))}/`,geti(i,pathname),geti(i,search) )
    ) as string[]
}
export const normPage = <T extends {}={}>(page:Page<T>) => {
    const state = {...page} as any
    Object.entries(state)
          .sort(([_,val]) => typeof val==="function"?1:-1)
          .forEach(([key,val]: any) => (state[key]=typeof val==="function"?val(state):val))
    const urls = joinPage<T>(state as Page<T>)
    return {...state, urls:urls instanceof Array
      ? urls.map((u:any) => typeof u==="string" ? new URL(u) : u) as U[]
      : [typeof urls==="string" ? new URL(urls) : urls] as U[] } as Page<T>
}
