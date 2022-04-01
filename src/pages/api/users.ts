import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const url =
  "https://my-json-server.typicode.com/codeedu/live-imersao-fullcycle7-nextjs/users";

type ResponseData = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData[]>
) {
  const { data } = await axios.get(url);
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
  res.status(200).send(data);
}

//Cloud Flare Workers - Edge Computing

//cache state-while