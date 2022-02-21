import { NextApiRequest, NextApiResponse } from "next";

function Webhooks(request: NextApiRequest, response: NextApiResponse) {
  console.log('evento recebido');

  response.status(200).json({ ok: true })
}

export default Webhooks;