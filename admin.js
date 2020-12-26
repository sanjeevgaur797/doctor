var express = require('express');
var router = express.Router();
var pool=require('./pool');
const session = require('express-session');


/* GET home page. */
router.get('/adminlogin', function(req, res, next) {
  res.render('login',{msg:''});
 
});
router.get('/adminlogout',function(req,res,next){
    req.session.destroy()
    res.redirect('/adm/adminlogin');
});
router.post('/checklogin',function(req,res,next){
    pool.query("select * from admins where email=? and password=?",[req.body.email,req.body.password],function(err,result){
        if(err)
        {
            res.render('login',{msg:"server error"});
        }
        else{
            if(result.length==1)
            {
                req.session.ses_admin=result
                res.render('dashboard',{data:req.session.ses_admin})
            }
            else{
               
             res.render('login',{msg:"invalid user id and password"})
        }
    }
    })
    
})

module.exports= router;