'use client'
import { createContext, FC, MutableRefObject, ReactNode, useRef, useState } from "react";
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
	console.log(process.env.NEXT_PUBLIC_HOSTNAME)
	const select = (name: string) => fetch(`https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/proposal?${name}`).then(resp => {
		resp.json().then(data => {
			setProposal(data)
		})
	})
	const send = (content: ProposalContext["proposal"]) => {
		fetch(`https://${process.env.NEXT_PUBLIC_HOSTNAME}.com/api/proposal`, {
			method: 'POST',
			body: JSON.stringify(content)
		}).then(resp => {
			resp.json().then(data => {
				setProposal(data)
			})
		})
	}
	useEffectDelay({
		triggers: [search.current?.hasSolution, search.current?.name, search.current?.project, search.current?.who, search.current?.why, search.current?.page],
		onStart: () => {
			if (search){fetch(`https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/proposal${Object.keys(search.current || []).length 
				? `?${Object.entries(search.current!).map(v => `${v[0]}=${v[1]}`).join('&')}`
				: ''}`).then( (resp) => {
				resp.json().then(data => {
					setList(data)
				})
			})}
		}
	})
	return <proposalContext.Provider value={{search, proposal, list, select, send}}>

	</proposalContext.Provider>
} 

export default ProposalProvider