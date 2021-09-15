import Koa from "koa";
import search from "./search";

const app = new Koa();

app.get("/search", search);

export default app;
