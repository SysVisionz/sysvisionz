'use client'
import { useState, FC, MutableRefObject } from "react";
// import Loading from "~/Loading";
import { useEffectDelay } from "~/shared/FE/debounceUtils";
import useSearch from 'use-search-hook'

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
	const search = useSearch<{name: string, project: string, page: number, pageSize: number}>()
	const [list, setList] = useState<ProposalContext["list"]>()
	useEffectDelay({
		onStart: () => {
			const querystring = new URLSearchParams(location.search).toString()
			fetch(
				`https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/proposal${querystring}`
			).then(res => res.json()).then(data => {
				setList(data)
			})
		}
	}, [search.name, search.project, search.page, search.pageSize])
	console.table(list)
	return <div></div>
}

export default Proposal;