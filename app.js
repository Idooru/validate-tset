import express from "express";
import morgan from "morgan";

import validRouter from "./routes/index.js";

const app = express();

app.set("port", process.env.PORT || 1234);
app.use(morgan("dev"));
app.use(express.json());

app.use("/valid", validRouter);

app.use((req, res, next) => {
    res.sendStatus(404);
});

app.use((err, req, res, next) => {
    console.errror(err);
    res.sendStatus(500);
});

app.listen(app.get("port"), () => {
    console.log(`server is running at http://localhost:${app.get("port")}`);
});
