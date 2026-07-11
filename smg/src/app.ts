import express from "express";
import routes from "./routes";
import path from "path";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use("/api", routes);

app.get("/", (req, res) => {
    res.json({
        message: "Inventory API is running 🚀",
    });
});

app.use(errorHandler);
export default app;