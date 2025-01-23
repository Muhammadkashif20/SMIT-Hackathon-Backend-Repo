import express from "express";
const app = express();
const PORT = 4000;
console.log("Hello Backend");

app.listen(PORT, () => console.log("Port is Running ON =>", PORT));
