import { NextRequest, NextResponse } from "next/server";

export const byMethod = (methods: {
	[Method in 'GET'| 'POST' | "PUT" | 'DELETE']?: (req: NextRequest, res: NextResponse) => void
}) => (req: NextRequest, res: NextResponse) => {
	methods[req.method as 'GET' | 'POST' | 'PUT' | 'DELETE']?.(req, res)
}