import Router from "@koa/router";
import search from "./search";

const router = new Router();

router.get("/search", search);

export default router;
