import connectDb from "@/utils/connectDb";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb();
  res.status(200).json("Yaa");
}
