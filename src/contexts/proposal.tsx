import { headers } from "next/headers";
import { createContext, FC, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { useSiteNotify } from "./notification";

interface ProposalContext{
	name: string,
	project: string,
	who: string,
	example: string,
	why: string,
	hasSolution: boolean,
	solution?: string,
	whyBetter?: string
	send: () => void;
	get: (name: string) => Promise<Proposal>
}

type Proposal = Omit<ProposalContext, 'send' | 'get'>

const proposalContext = createContext<ProposalContext>({
	name: '',
	project: '',
	who: '',
	example: "",
	why: '',
	hasSolution: false,
	send:() => {},
	get: (name) => new Promise<Proposal>((res, rej) => {
		res({} as Proposal)
	})
})

const ProposalProvider: FC<{children: ReactNode}> = () => {
	const proposal = useRef<Proposal>({
		name: '',
		project: '',
		who: '',
		example: '',
		why: '',
		hasSolution: false
	})
	const getProposals()
	const [theProposal, setProposal] = useState<Proposal>()
	const wait = useRef<NodeJS.Timeout | null>(null)
	useEffect(() => {
		if (wait.current){
			clearTimeout(wait.current)
		} else {
			setTimeout(() => {
				clearTimeout(wait.current!);
				wait.current = null;
				get(proposal.current.name).then(v => {
					setProposal(v as Proposal)
				})
			}, 600)
		}
	}, [proposal.current.name, wait.current])
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
	return <proposalContext.Provider value={{...proposal.current,send, get}}>

	</proposalContext.Provider>
} 

export default ProposalProvider