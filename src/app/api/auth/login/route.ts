import { NextApiRequest, NextApiResponse } from "next";
import { Configuration } from "../../core/configuration";

type Data = {
    message: string;
};
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        res.status(200).json({ message: Configuration.SUCCESS_REQUEST });
    } else {
        res.status(405).json({ message: Configuration.ERROR_REQUEST });
    }
}
