import express from "express";
import { DBConnector } from "./db/database";

import swaggerUi from "swagger-ui-express";
import swaggerDoc from "../swagger-doc";

const cors = require("cors");
require('dotenv-safe').config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

// app.get('/swagger.json', (_req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     res.send(swaggerSpec);
// });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/v1", require("./routes/auth-routes"));


app.listen(port, async () => {
    try {
        await DBConnector.connect();
        return console.log(`Server is listening on ${port}`);
    } catch (err) {
        console.log(err);
        return console.error(`Server error (on ${port})`);
    }
});
