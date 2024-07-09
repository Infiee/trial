import Elysia, { t } from "elysia";

export const CommonModel = new Elysia({ name: "Model.Common" }).model({
  "common.badRequest": t.Object({
    message: t.String(),
  }),
});
