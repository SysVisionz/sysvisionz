import { headers } from "next/headers";
import { createContext, FC, MutableRefObject, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useSiteNotify } from "./notification";
import { useEffectDelay } from "@/app/shared/utils";

type Search = {name?: string, project?:string, who?: string[], why?: string, hasSolution?: boolean}

interface ProposalContext{
	search?: MutableRefObject<Search | undefined>
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
		send: () => void;
	},
	select: (name: string) => void
}

const proposalContext = createContext<ProposalContext>({
	select: () => void
})

const ProposalProvider: FC<{children: ReactNode}> = () => {
	const search: ProposalContext["search"] = useRef<Search>()
	const delay = useRef<NodeJS.Timeout | null>()
	const [proposal, setProposal] = useState<ProposalContext["proposal"]>()
	const [list, setList] = useState<ProposalContext["list"]>()
	const wait = useRef<NodeJS.Timeout | null>(null)
	const set = () => {
		delay.current && clearTimeout(delay.current){
			
		}
	}

	useEffectDelay(500, [search.current?.hasSolution, search.current?.name, search.current?.project, search.current?.who, search.current?.why]).after(() => {
			search && fetch(`https://sysvisionz.com/api/proposal${Object.keys(search.current || []).length 
				? `?${Object.entries(search.current!).map(v => `${v[0]}=${v[1]}`).join('&')}`
				: ''}`).then( (resp) => {
				resp.json().then(proposal => {
					proposal && setProposal(proposal)
				})
			})
	})
	useEffect(() => {
	}, [search.current?.name, search.current?.project, search.current?.who, search.current?.why, search.current?.hasSolution])
	const send = () => {

	}
	const get = (name: string) => new Promise<Proposal>((res, rej) => {
		fetch('https://sysvisionz.com/proposal', {headers: {
			name: name
		}}).then( (resp) => {
			resp.json().then(proposal => res(proposal))
		}).catch(err => {
			useSiteNotify().error(typeof err === 'object' ? err.message : err)
		})
	})
	return <proposalContext.Provider value={{search, proposal, list, selectProposal}}>

	</proposalContext.Provider>
} 

export default ProposalProvider