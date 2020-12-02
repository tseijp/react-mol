/** ************************* USE PAGE *************************
 * This is a hook to record the URL of the Restfl API
 *   - `const [page, set] = usePage({id:null,home:({id})=>!id}, config)`
 *   - `const onClick=()=>set({id:90}, config)`
 *   - ```
 *     {Page, id:null}  <=data=> (DB1 : URL1 by id), (DB2 : URL2 by id)
 *          | change id
 *          |  => change URLs by id (e.g. /api to /api/90)
 *          v  => change user state (e.g. home:true to home:false)
 *     {New Page, id:90}
 *     ```
 * # ***** usePage API Configs *****
 * ## Props Values
 *   - `const _ = usePage(@initPage, @config)`
 *   - @initPage = {
 *         @isHome  :boolean
 *         @isLocal :boolean
 *         @id      :string e.g. 2
 *         @protocol:string e.g. "https:"
 *         @hostname:string e.g. "localhost"
 *         @portname:string e.g. "3000"   or ["3000"(npm), "8000"(django)]
 *         @pathname:string e.g. "/note/" or ["/note/", "/api/note/"]
 *         @search  :string e.g. "/note/" or ["/note/", "/api/note/"]
 *         @hash    :string e.g. "#note"  or ["#note"]
 *   - @config = {TODO}
 *   - type MultiPage<T=any> = T|T[]|((p:Page)=>T|T[])
 * ## Return Values
 *   - @page : {...@initPage(as T|T[]),
 *         @url ?: from initPage parameters    e.g. "http..." or ["http...", ...more]
 *         @XXX ?: any value you set when init e.g. @home:true
 *   - @set   : (args) => void ( setState )
 ** ************************* ********* *************************/
import {useEffect, useState, useCallback, useRef} from 'react'
import {pageConfig as defaultConf, defaultPage, normPage} from './utils'
import {Page , PageConfig as Conf, BasicProps, BasicState, BasicAction} from './types'
export const usePage = <T extends {}={}>(
    props :BasicProps<Partial<Page<T>>>,//BasicProps<Page<T>>,
    config:BasicProps<Partial<Conf<T>>>={},
): [Page<T>, BasicAction<Partial<Page<T>>>] => {
    if (typeof props==="function") props  = props()
    if (typeof config==="function")config = config()
    const pageRef = useRef<Page<T>>({...defaultPage, ...props } as Page<T>)
    const confRef = useRef<Conf<T>>({...defaultConf, ...config} as Conf<T>)
    const [p,set] = useState<Page<T>>( normPage(pageRef.current) )
    const setPage = useCallback((state:BasicState<Partial<Page<T>>>) => {
        if (typeof state==="function")
            state = state(pageRef.current as Partial<Page<T>>)
        pageRef.current = {...pageRef.current, ...state}
        set(pre => {
            const newPage = normPage(pageRef.current)
            if (pre.pathname===newPage.pathname)
                return newPage
            window.history.pushState('', '',
                newPage.pathname instanceof Array
                  ? newPage.pathname[0] || ''
                  : newPage.pathname    || '')
            console.log(newPage.pathname)
            return  newPage
        })
    }, [set])
    useEffect(() => {
        const {onChange} = confRef.current
        typeof onChange==="function" && onChange()
    }, [p.id])
    return [p, setPage]
}
