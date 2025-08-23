import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../models/User";
import Company from '../models/Company';
import Project from '../models/Project';
import { ObjectId } from "mongoose";


export const authenticate = (req: NextApiRequest, level: 'master' | 'admin' | 'mod' | 'user' = 'admin') => {
	const code: string = req.headers["x-auth"] as string;
	return UserModel.findByToken(code)
}

const processProjects = (projects?: {name: string, company?: ObjectId, alert?: boolean, stage?: string}[]): Promise<User<"fe">["projects"]> => new Promise((res, rej) => {
	if (!projects || !projects.length){
		return res([])
	}
	const project = projects.pop();
	if (!project){
		if (projects.length){
			return processProjects(projects).then(projects => {res(projects)}) 
		}
		else {
			return res([])
		}
	}
	const {company, name, alert, stage} = project
	const newProject: {name: string, company?: string, alert?: boolean, stage?: string} = {name, alert, stage}
	return Company.findById(company).lean({name: true}).then((company) => {
		newProject.company = company?.name || ''
		if (projects.length){
			return processProjects(projects).then(projects => {res([...(projects || []), newProject])})
		}
		res ([newProject])
	})
})

export const user = new Proxy({} as {
	fe: (request: NextApiRequest) => Promise<User<'fe'>>,
	be: (request: NextApiRequest) => Promise<User<'be'>>
}, {
	get: (t, p, r) => {
		if (p === 'fe') {
			return (request: SessionedRequest) => new Promise<User<'fe'>>((resolve, reject) => {
				r.be(request).then(async (user: User<'be'>) => {
					const { name, displayName, email, phone, company: theCompany, projects: theProjects } = user;
					const company: User<'fe'>['company'] | null = theCompany && (await Company.findById(theCompany).lean({name: true, website: true, logo: true})) || undefined;
					const projects: User<'fe'>["projects"] = await processProjects(await Project.find({users:{ $or: [{admin: user}, {accounts: user}, {moderator: user}, {user}]}}).lean({name: true, company: true, alert: true, stage: true}))
					resolve({
						name, displayName, email, phone, company, projects
					})
				})
			})
		}
		if (p === 'be') {
			return async (request: SessionedRequest) => {
				return await UserModel.findByToken(request.session.token)
			}
		}
		return new Promise((_resolve, reject) => {
			reject({message: "Invalid user type.", status:400})
		})
	}
})

export class Err {
	res: NextApiResponse
	constructor (res: NextApiResponse) {
		this.res = res;
		this.send = this.send.bind(this)
	}
	
	send():void
	send(status: number): void;
	send(response: {status?: number, message?: string}): void
	send(statusAndOrMessage?: string | number | {status?: number, message?: string}) {
		return (err: Error) => {
			const defaultErrors = (status: number) => {
				return {
				400: "Bad Request",
				401: "Unauthorized",
				402: "Payment Required", 
				403: "Forbidden",
				404: "Not Found",
				405: "Method Not Allowed",
				406: "Not Acceptable",
				407: "Proxy Authentication Required",
				408: "Request Timeout",
				409: "Conflict",
				410: "Gone",
				411: "Length Required",
				412: "Precondition Failed",
				413: "Content Too Large",
				414: "URI Too Long",
				415: "Unsupported Media Type",
				416: "Range Not Satisfiable",
				417: "Expectation Failed",
				418: "I'm a teapot",
				421: "Misdirected Request",
				422: "Unprocessable Content",
				423: "Locked",
				424: "Failed Dependency",
				425: "Too Early",
				426: "Upgrade Required",
				428: "Precondition Required",
				429: "Too Many Requests",
				431: "Request Header Fields Too Large",
				451: "Unavailable For Legal Reasons",
				500: "Internal Server Error",
				501: "Not Implemented",
				502: "Bad Gateway",
				503: "Service Unavailable",
				504: "Gateway Timeout",
				505: "HTTP Version Not Supported",
				506: "Variant Also Negotiates",
				507: "Insufficient Storage",
				508: "Loop Detected",
				510: "Not Extended",
				511: "Network Authentication Required"
		    }[status] || "Unspecified Server Error"
			}
			switch(typeof statusAndOrMessage){
				case 'number':
					this.res.status(statusAndOrMessage).send(defaultErrors(statusAndOrMessage))
					break;
				case 'object':
					this.res.status((statusAndOrMessage as {status?: number, message?: string}).status ?? 500).send((statusAndOrMessage as {status?: number, message?: string} || err.message)?.message ?? 'Server Error')
					break;
				default:
					this.res.status(500).send(err.message ?? defaultErrors(500));
					break;
			}
		}
	}
}