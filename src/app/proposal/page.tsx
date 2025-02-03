'use client'
import { FC, useEffect, useState } from "react";
import { useSiteNotify } from "../../contexts/notification";


interface ProposalProps{
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
			// const [name, setName] = useState<string>()
			const notify = useSiteNotify()
			const select = ({name, project}: {
				name: string,
				project?: string
			}) => {
				const headers = project ? new Headers([
					['name', name],
					['project', project]
				]) : new Headers([
					['name', name]
				])
				return fetch(`https://${process.env.NEXT_PUBLIC_HOSTNAME}/api/proposal`, {
					method: 'GET',
					headers
				}).then(resp => {
					resp.json().then(data => {
						setProposal(data)
					})
				})
			}
			// const send = () => {
			// 	fetch(`https://${process.env.NEXT_PUBLIC_HOSTNAME}.com/api/proposal`, {
			// 		method: 'POST',
			// 		body: JSON.stringify(proposal)
			// 	}).then(resp => {
			// 		resp.json().then(data => {
			// 			setProposal(data)
			// 		})
			// 	})
			// }
			useEffect(() => {
				const searchValues = window.location.search.substring(1).split('&').reduce((values: {name: string, project?: string}, v) => {
					const [key, value] = v.split('=')
					values[key as 'name' | 'project'] = value
					return values;
				}, {} as {name: string, project?: string})
				if (typeof window !== 'undefined') {
					const name = window.location.search.substring(1).split('&').find(v => v.match(/^name=/))?.split('=')[1]
					if (name){
						select(searchValues)
					} else {
						notify.error('proposals must have both a project and a name')
					}
				}
			}, [notify])
			console.log(proposal)
			return <div>
				
			</div>
}

export default Proposal;