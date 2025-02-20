'use client'
import { useState, FC, MutableRefObject, useRef } from "react";
// import Loading from "~/Loading";
import { useEffectDelay, useSearch } from "~/shared/utils";

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
	const search = useSearch<SearchQuery>()
	const [list, setList] = useState<ProposalContext["list"]>()
	useEffectDelay({
		onStart: () => {
			fetch(
				`https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/proposal${search.toSearchString()}`
			).then(res => res.json()).then(data => {
				setList(data)
			})
		}
	}, [search.name, search.project, search.page, search.pageSize])
	console.table(list)
	return <div></div>
}

export default Proposal;