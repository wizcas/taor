import * as http from "../../http";
import { wallhavenAPI } from "./const";

export default async function search(req, res) {
    const { query } = req;
    const data = await http.get(wallhavenAPI.search, { params: query });
    res.status(200).json(data);
}
