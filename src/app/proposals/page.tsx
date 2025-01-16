'use client'
import { useState, FC, MutableRefObject, useRef } from "react";
// import Loading from "~/Loading";
import { useEffectDelay } from "~/shared/utils";

type SearchQuery = {
	name?: string,
	project?:string,
	page: number, 
	pageSize: number
}


interface ProposalContext{
	search?: MutableRefObject<SearchQuery>
	list?: {name: string, project: string}[]
}

const Proposal: FC = () => {
			// const processSearch = (s: string) => {
			// 	const search: [keyof SearchQuery, string][] = s.split('?')[1].split('&').map(v => v.split('=')) as [keyof SearchQuery, string][]
			// 	return search.reduce((acc: SearchQuery, [key, value]: [keyof SearchQuery, string]) => {
			// 		if (['name', 'project', 'page', 'pageSize'].includes(key)){
			// 			switch (key){
			// 				case 'page':
			// 				case 'pageSize':
			// 					acc[key] = parseInt(value)
			// 					break;
			// 				default:
			// 					acc[key] = value
			// 			}
			// 		}
			// 		return acc;
			// 	}, {page: 0, pageSize: 10} as SearchQuery)
			// }
			const search: ProposalContext["search"] = useRef<SearchQuery>({page: 1, pageSize: 10})
			const [list, setList] = useState<ProposalContext["list"]>()
			console.log(list)
			useEffectDelay({
				onStart: () => {
					if (search.current){
						fetch(
							`https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/proposal${Object.keys(search.current || []).length 
							? `?${Object.entries(search.current!).map(v => `${v[0]}=${v[1]}`).join('&')}`
							: ''
						}`).then( (resp) => {
							resp.json().then(data => {
								console.log(data)
								setList(data)
								window.history.replaceState(null, document.title, "/proposal")
							})
						}
					)}
				}
			}, [search.current?.name, search.current?.project, search.current?.page, search.current?.pageSize])
			return <div></div>
}

export default Proposal;