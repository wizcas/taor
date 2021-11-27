import Koa from "koa";
import Router from "@koa/router";
import wallhaven from "../libs/wallhaven";

const app = new Koa();
const router = new Router({
    prefix: "/api",
});

async function cors(ctx, next) {
    const { response } = ctx;
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, Accept");
    response.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    response.set("Access-Control-Allow-Credentials", "true");
    if (ctx.method == "OPTIONS") {
        ctx.status = 200;
    } else {
        await next();
    }
}

router.get("", (ctx) => {
    ctx.body = "taor API";
});
router.get("/hello", (ctx, next) => {
    ctx.body = "hello world!";
});

router.use("/wallhaven", wallhaven.routes(), wallhaven.allowedMethods());

app.use(cors).use(router.routes()).use(router.allowedMethods());

export default app;
