const shortid=require("shortid")
const URL=require("../models/url");

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(404).json({error: "url is required"})
    const shortId=shortid();
    
    await URL.create({
        shortId:shortId,
        redirectedURL:body.url,
        vistedHistory:[],
        createdBy: req.user._id,
    })
    return res.render("home",{
        id:shortId
    });
    return res.json({id:shortId})
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId})
    return res.json({
        totalClicks:result.visitedHistory.length,
        analytics:result.visitedHistory,
    })
}
module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}
