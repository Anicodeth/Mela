// Express
import express from "express";
import cors from "cors"

// App
const app = express();

// Compression to compress requests that pass through the middle wares
import compression from "compression";

// MongoDB Sanitizer to prevent MongoDB Operator Injection.
// const mongoDBSanitizer = require("express-mongo-sanitize");
import mongoDBSanitizer from "express-mongo-sanitize";

// Require GEH
import geh from '../api/geh/index.js'

// Routers

// User routers
import usersRouter from "../api/user/route.js";    //api not done yet
import campaignRouter from "../api/campaign/route.js"

// Use Third party middlewares
app.use(cors())
app.use(compression());
app.use(mongoDBSanitizer());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routers
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/campaigns", campaignRouter);

//use Global error Handler
app.use(geh)

// Export App
export default app;