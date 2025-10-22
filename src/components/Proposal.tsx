'use client'
import { ChangeEvent, Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import { useSiteNotify } from "~/contexts/notification";
import { cleanObject } from "~/shared/FE";
import { useDelay } from "~/shared/FE";
import ChangingInput from "./Input";


export interface ProposalProps{
	name?: string,
	project?: string | null | undefined,
	clients?: {name: string, why: string}[],
	useCases?: string[],
	example?: string,
	why?: string,
	hasSolution?: boolean,
	solutions?: {company: string, solution: string, whyBetter: string}[],
}

type CheckboxChangeEvent = ChangeEvent<HTMLInputElement> & {target: ChangeEvent<HTMLInputElement>["target"] & {checked: boolean} }

const Proposal: FC<ProposalProps> = (projectOrProposal) => {
	const notify = useSiteNotify()
	const [name, setName] = useState<ProposalProps['name']>()
	const [example, setExample] = useState<ProposalProps['example']>()
	const [project, setTheProject] = useState<ProposalProps['project'] | null>()
	const [hasSolution, setHasSolution] = useState<ProposalProps['hasSolution']>()
	const [solutions, setSolutions] = useState<ProposalProps['solutions']>()
	const [why, setWhy] = useState<ProposalProps['why']>()
	const [clients, setClients] = useState<ProposalProps['clients']>()
	const [useCases, setUseCases] = useState<ProposalProps['useCases']>()
	const [editing, setEditing] = useState<keyof Omit<ProposalProps, 'who'|'solutions'|'whyBetter'|'clients'|'useCases'> | {[K in 'solutions' | 'clients' | 'useCases']?: number} | null>(null)
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
	console.log(save)
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
		const changed: Omit<Partial<ProposalProps>, 'solutions' | 'clients'> & {
			solutions?: Partial<Required<ProposalProps>['solutions'][number]>[]
			clients?: Partial<Required<ProposalProps>['clients'][number]>[]
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
	}, [projectOrProposal, name, example, project, hasSolution, solutions, why, clients, useCases])
	const setProject = useDelay<[Partial<ProposalProps>]>({
		onStart: (newProposal) => {
			const modified: keyof ProposalProps = Object.keys(newProposal)[1] as keyof ProposalProps
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
	console.log(setProject)

	const setValue = <T extends keyof ProposalProps>(k: T, i?: T extends 'clients' | 'solutions' | 'useCases' ? number : never, key?: T extends 'clients' ? keyof Required<ProposalProps>['clients'][number] : T extends 'solutions' ? keyof Required<ProposalProps>['solutions'][number] : never) => {
		function propose (evt: ChangeEvent<HTMLTextAreaElement> ): void
		function propose (evt: ChangeEvent<HTMLInputElement> ): void
		function propose (evt: ChangeEvent<HTMLInputElement> & {target: ChangeEvent<HTMLInputElement>["target"] & {checked: boolean} } ): void
		function propose (value: string): void;
		function propose (value: boolean): void;
		function propose (evtOrValue: string | boolean | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | CheckboxChangeEvent ): void {
			const val = (evtOrValue as CheckboxChangeEvent).target?.checked || (evtOrValue as ChangeEvent<HTMLInputElement>).target?.value || (evtOrValue as string | boolean)
			switch(k){
				case 'clients':
					const clients: Required<ProposalProps>['clients'] = proposal[k as 'clients'] as Required<ProposalProps>['clients']
					clients[i as number] = {...clients[i as number], [key as 'name' | 'why']: val}
					proposal.clients = clients
					break;
				case 'solutions':
					const solutions: Required<ProposalProps>['solutions'] = proposal[k as 'solutions'] as Required<ProposalProps>['solutions']
					solutions[i as number] = {...solutions[i as number], [key as 'company' | 'solution' | 'whyBetter']: val}
					proposal.solutions = solutions;
					break;
				case 'useCases':
					const useCases: Required<ProposalProps>['useCases'] = proposal[k as 'useCases'] as Required<ProposalProps>['useCases']
					useCases[i as number] = val as string
					proposal.useCases = useCases
					break;
				case 'hasSolution':
					proposal.hasSolution = val as typeof proposal.hasSolution
					break;
				case 'project':
					proposal.project = val as typeof proposal.project
				default:
					proposal[k as Exclude<keyof ProposalProps, 'project' | 'clients' | 'solutions' | 'useCases' | 'hasSolution'>] = val as keyof typeof proposal[Exclude<keyof ProposalProps, 'project' | 'clients' | 'solutions' | 'useCases' | 'hasSolution'>]
			}
		}
		return propose
	}

	const map: {[K in keyof ProposalProps]: Dispatch<SetStateAction<ProposalProps[K] | undefined>>} = {
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
		[K in keyof ProposalProps]: K extends 'useCases' | 'clients' | 'solutions' ? boolean[] : boolean
	}, {
		apply: (_t, _thisArg, [target]: [keyof ProposalProps]) => {
			switch (target){
				case 'useCases':
				case 'clients':
				case 'solutions':
					throw "Edit requires index specification for this target."
				default:
					setEditing(target)
			}
		},
		get: (_t, p: keyof ProposalProps) => {
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
	console.log(edit)
	return <div>
		{typeof project === 'string' && <ChangingInput value={project} save={setValue('project')} />}
		{<ChangingInput label="name" value={name || ''} save={setValue('name')} />}
		{(project === null || project) && name ? <>
			<h3>Why should we build this?</h3> 
			{<ChangingInput value={why || ''} save={() => setValue('why')} />}
		</> : null}
		<div><h3>Potential Clients</h3>
		{clients && clients.map(client => <p key={client.name}>{client.name}</p>)}
		</div>
	</div>
}

export default Proposal;