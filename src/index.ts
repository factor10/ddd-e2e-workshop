import "./env-config";
import app from "./Server";
import Logger from "jet-logger";

const logger = new Logger();

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info("Express server started on port: " + port);
});
