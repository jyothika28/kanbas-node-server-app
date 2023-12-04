import express from "express";
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import "dotenv/config";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

//connection string
//const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect('mongodb+srv://Jyothika:Skyhigh100@cluster0.cgj2l7l.mongodb.net/kanbas?retryWrites=true&w=majority');
//mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  }
 ));
 
 const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
  
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
UserRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);