const cors = require("cors");
import app from "./app";
import config from './config';

app.use(cors({ credentials: true, origin: true }));

const port = config.server.port|| 8080;

const callback = (err) => {
  if (err) console.error(err);
  console.log(`server is listening on ${port}`);
  if (config.env === "development") {
    console.log("Turned off SSL");
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
};

app.listen(port, callback);
