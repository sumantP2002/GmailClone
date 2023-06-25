//we will create express server
//we will run this using node js using(npm start)
import express from "express";
import routes from "./routes/route.js";
import Connection from "./database/db.js";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
//initialised express

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json({ extended: true}));
//if empty is hit then it go to routes and match for other
console.log('reached');
app.use('/', routes);
//where we want to run server
app.use(express.static(path.join(__dirname, "./mygmail/build")));
// by next line i am saying after making build of frontend transfer it to 
app.get('*', function(_, res){
    res.sendFile(path.join(__dirname, "./mygmail/build/index.html"), function(err){
        res.status(500).send(err);
    })
})
const PORT = process.env.PORT || 8000;
Connection();
app.listen(PORT, () => console.log(`Server is started on PORT ${PORT}`));