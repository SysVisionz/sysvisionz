import { NextRequest, NextResponse } from "next/server";
import { byMethod } from "~/shared/BE/requests";

const user = byMethod({
  GET: (req, res) => {
    return 'hello'
  }
})

export default user