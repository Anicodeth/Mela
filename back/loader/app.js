// Express
import express from "express";

// App
const app = express();

// Compression to compress requests that pass through the middle wares
import compression from "compression";

// MongoDB Sanitizer to prevent MongoDB Operator Injection.
// const mongoDBSanitizer = require("express-mongo-sanitize");
import mongoDBSanitizer from "express-mongo-sanitize";
// Require GEH
import geh from '../api/geh'
// Routers

// User routers
import usersRouter from "../api/user/route";    //api not done yet
// Use Third party middlewares
app.use(compression());
app.use(mongoDBSanitizer());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use routers
app.use("/api/v1/users", usersRouter);     

//use Global error Handler
app.use(geh)

// Export App
export default app;