import express from "express";
import cors from "cors";

import carRoute from "./routes/car";

class App {
  public server;

  constructor() {
    this.server = express();
    this.server.use(express.json());
    this.server.use(cors());

    this.routes();
  }

  routes() {
    this.server.use("/car", carRoute);
  }
}

export default new App().server;
