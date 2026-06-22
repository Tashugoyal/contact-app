
import express from "express";
const app = express();
import Contact from "./models/contacts.models.js";
import ContactRoutes from "./routes/contacts.routes.js";
import { contactDB } from "./config/database.js";


const port = process.env.PORT;
contactDB()

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});


app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({extended:false}));
app.use(express.static("assets"));
app.use(express.json());
app.use("/", ContactRoutes);

