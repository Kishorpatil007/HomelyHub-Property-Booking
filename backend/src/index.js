import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/userRoutes.js";
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";

import connectDB from "./utils/db.js";

const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.ORIGIN_ACCESS_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("HomelyHub is running");
});

app.use("/api/v1/rent/user", router);
app.use("/api/v1/rent/listing", propertyRouter);
app.use("/api/v1/rent/user/booking", bookingRouter);
app.use("/api/v1/rent/trip", tripRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`App is running on port no: ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start", error);
  }
};

startServer();