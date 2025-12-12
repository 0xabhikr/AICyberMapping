import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.post("/user", (req, res) => {
  const { user, phone, email } = req.body;

  return res.json({
    username: user,
    phone: phone,
    email: email
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
