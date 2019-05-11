import "reflect-metadata"; // this shim is required
import { createExpressServer } from "routing-controllers";
import consola from "consola";
import morgan from "morgan";
const { Nuxt, Builder } = require("nuxt");

import { UserController } from "./UserController";

async function start() {
  let config = require("../../frontend/nuxt.config.js");
  config.dev = !(process.env.NODE_ENV === "production");
  config.srcDir = "../frontend/";
  const nuxt = new Nuxt(config);

  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  // creates express app, registers all controller routes and returns you express app instance
  const app = createExpressServer({
    controllers: [UserController] // we specify controllers we want to use
  });

  app.use(morgan("combined"));

  app.use(nuxt.render);

  consola.info(`start listen at ${3000}`);
  // run express application on port 3000
  app.listen(3000);
}
start();
