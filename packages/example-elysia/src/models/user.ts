import { createUser, selectUser } from "@/db/schema";
import Elysia, { t } from "elysia";
import { CommonModel } from "./common";

export const UserModel = new Elysia({ name: "Model.User" })
  .use(CommonModel)
  .model({
    "user.create.dto": t.Omit(createUser, ["id"]),
    "user.create.response": t.Object({
      success: t.Boolean(),
      data: selectUser,
    }),

    "user.findAll.query": t.Object({
      page: t.Optional(t.Numeric({ default: 1, minimum: 1 })),
      limit: t.Optional(t.Numeric({ default: 10, minimum: 1 })),
    }),
    "user.findAll.response": t.Object({
      success: t.Boolean(),
      data: t.Array(createUser),
    }),
  });
