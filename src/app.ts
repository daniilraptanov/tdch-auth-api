import express from "express";
import { swaggerOptions } from "../swagger-settings";
import { DBCreator } from "./db/database";
import { AuthValidator } from "./middleware/auth-validator";

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const cors = require("cors");
require('dotenv-safe').config();

const port = process.env.PORT;
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(cors());
app.use(express.json());

app.get('/swagger.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1", require("./routes/auth-routes"));
app.use("/api/v1", AuthValidator.auth, require("./routes/template-routes"));


app.listen(port, async () => {
    try {
        const dbCreator = await DBCreator.getInstance();

        if (!dbCreator) {
            throw Error("database error");
        }
        return console.log(`server is listening on ${port}`);
    } catch (err) {
        console.log(err);
        return console.error(`server error (on ${port})`);
    }
});
