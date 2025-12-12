import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.post("/user", (req, res) => {
  const { user, phone, email } = req.body;

  return res.json({
    username: user,
    phone,
    email
  });
});

export const handler = serverless(app);
