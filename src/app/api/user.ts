import { NextApiRequest, NextApiResponse } from "next";


export async function get(req: NextApiRequest, res: NextApiResponse<string>) {
  console.log(req, res)
  res.send('hello')
}