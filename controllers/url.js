const URL=require("../models/url")
const shortid=require("shortid")

// URL validation function
function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    
    // Input validation
    if (!body.url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    
    // Validate URL format
    if (!isValidUrl(body.url)) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }
    
    // Check for malicious URLs (basic check)
    const url = new URL(body.url);
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return res.status(400).json({ error: 'Local URLs are not allowed' });
    }
    
    const shortID=shortid();
    await URL.create({
        shortId:shortID,
        redirectedURL:body.url,
        visitedHistory:[],
        createdBy:req.user._id,
    });
    
    return res.render("home",{id:shortID});
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitedHistory.length,
        analytics:result.visitedHistory,
    });
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics,
}
