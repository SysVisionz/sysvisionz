import { NextResponse } from "next/server";

export const byMethod = (methods: {
	[Method in 'GET'| 'POST' | "PUT" | 'DELETE']?: (req: NextApiRequest, res: NextResponse) => void
}) => (req: NextApiRequest, res: NextResponse) => {
	methods[req.method as 'GET' | 'POST' | 'PUT' | 'DELETE']?.(req, res)
}