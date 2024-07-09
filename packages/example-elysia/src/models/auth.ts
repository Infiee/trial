import { createUser, selectUser } from "@/db/schema";
import Elysia, { t } from "elysia";
import { CommonModel } from "./common";

export const AuthModel = new Elysia({ name: "Model.Auth" })
  .use(CommonModel)
  .model({
    "auth.login.dto": t.Omit(createUser, ["id"]),
    "auth.login.response": t.Object({
      success: t.Boolean(),
      data: selectUser,
    }),
  });
