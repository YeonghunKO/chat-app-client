import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      "refreshTokenIdx=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;",
      "accessToken=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;",
    ]);
  }

  return res.send({ message: "successfully deleted cookies" });
}
