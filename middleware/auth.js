export const requireAuth = (req,res, next) =>{ //Basic authentication access
    if (!req.isAuthenticated()){
        return res.redirect('/login.html');
    
    }
    next();
}

export const requireTA = (req,res,next) =>{ //When an student tries to access to some TA dashboard.
    if(req.user?.role !== "TA"){
        return res.status(403).send("TA Access only");
    }
    next();
}