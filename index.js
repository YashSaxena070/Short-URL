const express=require("express");
const path=require("path")
const cookieParser=require("cookie-parser")
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const app=express();
const {restrictToLoggedinUserOnly, checkAuth}=require('./middlewares/auth')
const URL=require("./models/url")

const staticRouter=require("./routes/staticRouter")
const urlRoute=require("./routes/url")
const userRoute=require("./routes/user")

const {connectToMongoDb}=require("./connect");
connectToMongoDb("mongodb://127.0.0.1:27017/short-url").then(()=>{ console.log("mongoDB connected ")})

PORT=process.env.PORT || 8001;

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for EJS templates
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/",checkAuth,staticRouter)
app.use("/user",userRoute)
app.use("/url", restrictToLoggedinUserOnly ,urlRoute)

// URL validation function
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

app.use("/url/:shortId",async (req,res)=>{
    const shortId=req.params.shortId;
    
    try {
        const Entry=await URL.findOneAndUpdate(
            {
                shortId,
            },{
                $push: {
                    visitedHistory:{
                        timestamp: Date.now(),
                    }
                }
            }
        )
        
        if (!Entry) {
            return res.status(404).render('error', { message: 'URL not found' });
        }
        
        // Validate redirect URL to prevent open redirect
        if (!isValidUrl(Entry.redirectedURL)) {
            return res.status(400).render('error', { message: 'Invalid redirect URL' });
        }
        
        res.redirect(Entry.redirectedURL)
    } catch (error) {
        console.error('Redirect error:', error);
        res.status(500).render('error', { message: 'Server error' });
    }
})

app.listen(PORT,()=>console.log(`Server Started at PORT ${PORT}`))