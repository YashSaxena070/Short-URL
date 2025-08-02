const express=require("express");
const path=require("path")
const cookieParser=require("cookie-parser")
const app=express();
const {restrictToLoggedinUserOnly, checkAuth}=require('./middlewares/auth')
const URL=require("./models/url")

const staticRouter=require("./routes/staticRouter")
const urlRoute=require("./routes/url")
const userRoute=require("./routes/user")

const {connectToMongoDb}=require("./connect");
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>{ console.log("mongoDB connected ")})

PORT=8001;

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/",checkAuth,staticRouter)
app.use("/user",userRoute)
app.use("/url", restrictToLoggedinUserOnly ,urlRoute)
app.use("/url/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    const Entry=await URL.findOneAndUpdate(
        {
            shortId,
        },{
            $push: {
                visitedHistory:{
                    timestamp
                    : Date.now(),
                }
            }
        }
    )
    res.redirect(Entry.redirectedURL)
    
})

app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`))