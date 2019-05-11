import "reflect-metadata"; // this shim is required
import { useExpressServer } from "routing-controllers";
import consola from "consola";
import morgan from "morgan";
import express from "express";
const { Nuxt, Builder } = require("nuxt");

import { UserController } from "./UserController";

async function start() {
  let config = require("../../frontend/nuxt.config.js");
  config.dev = !(process.env.NODE_ENV === "production");
  config.srcDir = "../frontend/";
  config.buildDir = "../frontend/.nuxt";
  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  const app = express();

  app.use(morgan("combined"));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
    } else {
      nuxt.render(req, res, next);
    }
  });

  useExpressServer(app, {
    controllers: [UserController],
    routePrefix: "api"
  });

  // app.use(/^(?!\/api).+$/, nuxt.render);

  consola.info(`start listen at ${3000}`);
  // run express application on port 3000
  app.listen(3000);
}
start();
