declare type PrivLevel = 'master' | 'admin' | 'mod' | 'client' | 'user' | 'invite';
declare type FCWC<V extends {[key: string]: any} = {}> = import('react').FC<{children: import('react').ReactNode} & V>
declare type Image = {src: string, width: number, height: number};
declare type Address = {
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
};
declare type Name = {
	first: string;
	last: string;
	middle?: string;
};
type mongoose = import('mongoose');
type CoreUser = {
	name?: Name;
	displayName?: string;
	email: string;
	phone?: string;
	privLevel?: PrivLevel;
}
declare type User<T extends 'be' | 'fe'> =  & T extends 'be' ? CoreUser & {
	_id: mongoose.Types.ObjectId;
	createdAt: string;
	updatedAt: string;
	verified: boolean;
	projects: {
		id: mongoose.Types.ObjectId
		name: string
	}[];
	friendList?: mongoose.Types.ObjectId;
	messageList?: mongoose.Types.ObjectId;
	company?: { _id: mongoose.Types.ObjectId, validated: boolean };
} : T extends 'fe' ? CoreUser & {
	avatar?: Image;
	alerts?: {
		type: "message" | "project" | "task";
		message?: {user?: string, subject: string, timestamp: string};
	}[];
	friendsList?: {
		name: string;
		email: string;
		company: string;
	}[]
	projects?: {
		name: string;
		company?: string;
		alert?: boolean;
		stage?: string;
	}[]
	company?: {
		name?: string;
		website?: string;
		logo?: string;
	};
} : {};

type NextApiRequest = import('next').NextApiRequest

declare type SessionedRequest = NextApiRequest & {session: {token: string}}

declare type Middleware<T extends Object | void = void> = (req: NextApiRequest, res: NextApiResponse) => Promise<T>;