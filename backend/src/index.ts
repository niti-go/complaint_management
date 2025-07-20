import express from "express";
import cors from "cors";
import complaintsRouter from "./routes/complaints";
//import supabaseTestRouter from "./routes/supabase-test";
import dotenv from "dotenv";
dotenv.config();

console.log("Starting server....hehe")

//Main entry point of my backend server
//starts the express server
//specifies the port the server listens on
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running lalala!");
});

app.use("/complaints", complaintsRouter);
//app.use("/supabase", supabaseTestRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}\nlocalhost:${PORT}`);
});

// import pool from './db';

// app.get('/test-db', async (req, res) => {
//   const result = await pool.query('SELECT NOW()');
//   res.send(result.rows[0]);
// });