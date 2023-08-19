import app from "./app";
import { connectToDb } from "./db";

connectToDb((error) => {
  if (!error) {
    app.listen(3333, () => {
      console.log("app listening on port 3333");
    });
  }
});
