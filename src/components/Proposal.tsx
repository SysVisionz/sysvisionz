'use client'
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState } from "react";
import { useSiteNotify } from "~/contexts/notification";
import icons from '~/icons'
import { cleanObject, makeHeaders, useDelay } from "~/shared/utils";


interface Proposal{
	name?: string,
	project?: string | null | undefined,
	clients?: {name: string, why: string}[],
	useCases?: string[],
	example?: string,
	why?: string,
	hasSolution?: boolean,
	solutions?: {company: string, solution: string, whyBetter: string}[],
}

const Proposal: FC<Proposal> = (projectOrProposal) => {
	console.log(icons.environment.bulb)	
	const notify = useSiteNotify()
	const [name, setName] = useState<Proposal['name']>()
	const [example, setExample] = useState<Proposal['example']>()
	const [project, setTheProject] = useState<Proposal['project'] | null>()
	const [hasSolution, setHasSolution] = useState<Proposal['hasSolution']>()
	const [solutions, setSolutions] = useState<Proposal['solutions']>()
	const [why, setWhy] = useState<Proposal['why']>()
	const [clients, setClients] = useState<Proposal['clients']>()
	const [useCases, setUseCases] = useState<Proposal['useCases']>()
	const [editing, setEditing] = useState<keyof Omit<Proposal, 'who'|'solutions'|'whyBetter'|'clients'|'useCases'> | {[K in 'solutions' | 'clients' | 'useCases']?: number} | null>(null)
	const save = () => {
		if ([name, example, project, hasSolution, solutions, why, clients, useCases].every(v => v !== undefined)){
			fetch('/api/proposal', {
				method: projectOrProposal ? 'PATCH' : 'POST',
				body: JSON.stringify({
					type: project === 'null' ? 'project' : 'feature',
					example,
					...(project !== null ? {project} : {}),
					hasSolution,
					solutions,
					why,
					clients,
					useCases
				})
			})
		} else {
			notify.error(`Please fill out all fields before submitting the ${project === null ? 'project' : 'feature'} proposal${projectOrProposal ? ' update' : ''}`)
		}
	}
	const proposalChange = useMemo(() => {
		const curr = cleanObject({
			name,
			example,
			project,
			hasSolution,
			solutions,
			why,
			clients,
			useCases
		})
		if (!projectOrProposal){
			return curr
		}
		const changed: Omit<Partial<Proposal>, 'solutions' | 'clients'> & {
			solutions?: Partial<Required<Proposal>['solutions'][number]>[]
			clients?: Partial<Required<Proposal>['clients'][number]>[]
		} = {}
		for (const i in curr){
			switch(i){
				case 'clients':
				case 'solutions':
					for (const v in curr[i]){
						const key = Number(v)
						for (const k in curr[i][key]){
							if (
								curr[i][key][k as keyof ({ name: string; why: string; } | { company: string; solution: string; whyBetter: string; })] 
								!== projectOrProposal?.[i]?.[key][k as keyof ({ name: string; why: string; } | { company: string; solution: string; whyBetter: string; })]
							)
							if (!changed[i]){
								changed[i] = []
							}
							if (!changed[i]![key]){
								changed[i]![key] = {}
							}
							changed[i]![key][k as keyof ({ name: string; why: string; } | { company: string; solution: string; whyBetter: string; })] = curr[i][key][k as keyof ({ name: string; why: string; } | { company: string; solution: string; whyBetter: string; })]
						}
					}
					break;
				case 'useCases':
					for (const i in curr.useCases){
						if (curr.useCases[i as keyof typeof curr.useCases] !== projectOrProposal.useCases?.[i as keyof typeof projectOrProposal.useCases]){
							if (!changed.useCases){
								changed.useCases = [];
							}
							changed.useCases![Number(i)] = curr.useCases[Number(i)]
						}
					}
					break;
				case 'project':
					if (curr.project !== projectOrProposal.project){
						changed.project = curr.project
					}
					break;
				case 'example':
				case 'why':
				case 'name':
					if (curr[i] !== projectOrProposal[i]){
						changed[i] = curr[i]
					}
					break;
				case 'hasSolution':
					if (curr[i] !== projectOrProposal[i]){
						changed[i] = curr[i]
					}
			}
		}
	}, [name, example, project, hasSolution, solutions, why, clients, useCases])
	const setProject = useDelay<[Partial<Proposal>]>({
		onStart: (newProposal) => {
			const modified: keyof Proposal = Object.keys(newProposal)[1] as keyof Proposal
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			proposal[modified] = newProposal[modified] as any
		},
		onEnd: () => {
			fetch('/api/proposal', {
				method: projectOrProposal ? 'PATCH' : 'POST',
				body: JSON.stringify(projectOrProposal ? {proposal: {project: projectOrProposal.project, name: projectOrProposal.name}, change: proposalChange} : proposal)
			}).then((resp) => {
				resp.json().then((body) => {
					if (resp.status === 200){
						notify.success(body.message)
					}
				})
			})
		},
		resets: true,
		rerunOnStart: true

	})

	const setValue = <T extends keyof Proposal>(k: T, i?: T extends 'clients' | 'solutions' | 'useCases' ? number : never, key?: T extends 'clients' ? keyof Required<Proposal>['clients'][number] : T extends 'solutions' ? keyof Required<Proposal>['solutions'][number] : never) => {
		function propose (evt: ChangeEvent<HTMLTextAreaElement> ): void
		function propose (evt: ChangeEvent<HTMLInputElement> ): void
		function propose (evt: ChangeEvent<HTMLInputElement> & {target: ChangeEvent<HTMLInputElement>["target"] & {checked: boolean} } ): void
		function propose (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement> & {target: ChangeEvent<HTMLInputElement>["target"] & {checked: boolean} } ): void {
			switch(k){
				case 'clients':
					const clients: Required<Proposal>['clients'] = proposal[k as 'clients'] as Required<Proposal>['clients']
					clients[i as number] = {...clients[i as number], [key as 'name' | 'why']: evt.target.value}
					proposal.clients = clients
					break;
				case 'solutions':
					const solutions: Required<Proposal>['solutions'] = proposal[k as 'solutions'] as Required<Proposal>['solutions']
					solutions[i as number] = {...solutions[i as number], [key as 'company' | 'solution' | 'whyBetter']: evt.target.value}
					proposal.solutions = solutions;
					break;
				case 'useCases':
					const useCases: Required<Proposal>['useCases'] = proposal[k as 'useCases'] as Required<Proposal>['useCases']
					useCases[i as number] = evt.target.value
					proposal.useCases = useCases
					break;
				case 'hasSolution':
					proposal.hasSolution = (evt.target as HTMLInputElement & {checked: boolean}).checked
					break;
				case 'project':
					proposal.project = evt.target.value
				default:
					proposal[k as Exclude<keyof Proposal, 'project' | 'clients' | 'solutions' | 'useCases' | 'hasSolution'>] = evt.target.value
			}
		}
		return propose
	}

	const map: {[K in keyof Proposal]: Dispatch<SetStateAction<Proposal[K] | undefined>>} = {
		name: setName,
		project: setTheProject,
		example: setExample,
		hasSolution: setHasSolution,
		solutions: setSolutions,
		why: setWhy,
		clients: setClients,
		useCases: setUseCases
	}

	const proposal = new Proxy({...projectOrProposal, ...proposalChange}, {
		get: (t, p) => {
			return t[p as keyof typeof t]
		},
		set: (_t, p, v) => {
			map[p as keyof typeof map]?.(v)
			return true;
		}
	})
	const edit = new Proxy((() => {}) as {
		(): (target: string) => void
	} & {
		[K in keyof Proposal]: K extends 'useCases' | 'clients' | 'solutions' ? boolean[] : boolean
	}, {
		apply: (_t, _thisArg, [target]: [keyof Proposal]) => {
			switch (target){
				case 'useCases':
				case 'clients':
				case 'solutions':
					throw "Edit requires index specification for this target."
				default:
					setEditing(target)
			}
		},
		get: (_t, p: keyof Proposal) => {
			switch (p){
				case 'useCases':
				case 'clients':
				case 'solutions':
					return new Proxy((() => {}) as {
						(): (target: number) => void
					} & {
						[i: number]: boolean
					}, {
						apply: (_t, _thisArg, [target]: [number]) => {
							setEditing({[p as 'clients' | 'useCases' | 'solutions']: target})
						},
						get: (_t, targ) => {
							return editing &&  (editing as {[K in 'clients' | 'useCases' | 'solutions']: number})[p as 'clients' | 'useCases' | 'solutions'] === Number(targ)
						}
					})
				default:
					return editing === p
			}
		}
	})
	return <div>
		{project !== null && editing === 'project' ? <input value={project} onChange={setValue('project')} /> : <span>{project}</span>}
		{editing === 'name' ?  <input value={name} onChange={setValue('name')} /> : <span>{name}</span>}
		{(project === null || project) && name ? <>
			<h3>Why should we build this?</h3> 
			{edit.why ? <textarea value={why} onChange={setValue('why')} /> : <p>{why}</p>}
		</> : null}
		<div><h3>Potential Clients</h3>
		{clients && clients.map(client => <p>{client.name}</p>)}
		</div>
		{editing === 'name' ? <input value={name} onChange={setValue('name')} /> : <span>{name}</span>}
		{editing === 'name' ? <input value={name} onChange={setValue('name')} /> : <span>{name}</span>}
		{editing === 'name' ? <input value={name} onChange={setValue('name')} /> : <span>{name}</span>}
		{editing === 'name' ? <input value={name} onChange={setValue('name')} /> : <span>{name}</span>}
		{editing === 'name' ? <input value={name} onChange={setValue('name')} /> : <span>{name}</span>}
	</div>
}

export default Proposal;