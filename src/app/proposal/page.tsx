'use client'
import { FC, useEffect, useState } from "react";
import { useSiteNotify } from "../../contexts/notification";
import { useSearch } from "~/shared/utils";


interface ProposalProps{
	company?: string,
	
	name: string,
	project: string,
	who: string[],
	example: string,
	why: string,
	hasSolution: boolean,
	solutions?: string[],
	whyBetter?: string[],
}

const Proposal: FC = () => {
	const [proposal, setProposal] = useState<ProposalProps>()
	const [edited, SetEdited] = useState<Partial<ProposalProps>>({})
	const notify = useSiteNotify()
	const search = useSearch()
	useEffect(() => {
		fetch(
			`https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/proposal${search.toSearchString()}`
		).then(res => res.json()).then(data => {
			if (data){
				setProposal(data)
			}
		})
	}, [search])
	return <div>
		const
	</div>
}

export default Proposal;