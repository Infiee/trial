import { authController } from "@/controllers/auth";
import { userController } from "./controllers/user";

import "./setup";
import { app } from "./setup";

app
  .state("counter", 0)
  .group("/api", (app) => app.use(authController).use(userController))
  .listen(3333);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
