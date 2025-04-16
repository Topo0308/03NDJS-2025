import mongoose from "mongoose"
mongoose

.connect("mongodb://localhost:27017/<db_hub>")
.then(() => console.log("connected"))
.cath ((err) => console.error("connection erro:", err));


