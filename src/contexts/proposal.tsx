import { createContext, FC, MutableRefObject, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useSiteNotify } from "./notification";
import { useEffectDelay } from "~/shared/utils";

type Search = {name?: string, project?:string, who?: string[], why?: string, hasSolution?: boolean, page: number, pageSize: number}

interface ProposalContext{
	search?: MutableRefObject<Search>
	list?: {name: string, project: string, get: () => ProposalContext["proposal"]}[]
	proposal?: {
		name: string,
		project: string,
		who: string[],
		example: string,
		why: string,
		hasSolution: boolean,
		solutions?: string[],
		whyBetter?: string[],
	},
	send: (content: ProposalContext["proposal"]) => void;
	select: (name: string) => void
}

const proposalContext = createContext<ProposalContext>({
	send: () => {},
	select: () => {}
})

const ProposalProvider: FC<{children: ReactNode}> = () => {
	const search: ProposalContext["search"] = useRef<Search>({page: 1, pageSize: 10})
	const [proposal, setProposal] = useState<ProposalContext["proposal"]>()
	const [list, setList] = useState<ProposalContext["list"]>()
	const select = (name: string) => fetch(`https://sysvisionz.com/api/proposal?${name}`).then(resp => {
		resp.json().then(data => {
			setProposal(data)
		})
	})
	const send = (content: ProposalContext["proposal"]) => {
		fetch('https://sysvisionz.com/api/proposal', {
			method: 'POST',
			body: JSON.stringify(content)
		}).then(resp => {
			resp.json().then(data => {
				setProposal(data)
			})
		})
	}
	useEffectDelay([search.current?.hasSolution, search.current?.name, search.current?.project, search.current?.who, search.current?.why, search.current?.page])
	.after(() => {
		search && fetch(`https://sysvisionz.com/api/proposal${Object.keys(search.current || []).length 
			? `?${Object.entries(search.current!).map(v => `${v[0]}=${v[1]}`).join('&')}`
			: ''}`).then( (resp) => {
			resp.json().then(data => {
				setList(data)
			})
		})
	})
	return <proposalContext.Provider value={{search, proposal, list, select, send}}>

	</proposalContext.Provider>
} 

export default ProposalProvider