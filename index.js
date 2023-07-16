const express = require("express");
const connection = require("./connection/db");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require('./routes/taskRoutes');
const app = express();
app.use(express.json());
app.use(cors());


app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);
app.listen(process.env.port, async () => {
    await connection;
    console.log("connected to monogodb")
})