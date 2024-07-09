import { OpenAPIHono } from "@hono/zod-openapi";
import { prettyJSON } from "hono/pretty-json";
import { bootstrap } from "./setup";

import authRoute from "./routes/auth";
import userRoute from "./routes/user";

const app = new OpenAPIHono();

bootstrap(app);

app.use(prettyJSON());

app.route("/auth", authRoute);
app.route("/users", userRoute);

export default app;
