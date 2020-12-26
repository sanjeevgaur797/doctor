var express =require('express');
var router=express.Router();
var pool=require('./pool');
var upload=require('./multer')

router.get('/fetchallstate',function(req,res,next){
    pool.query('select * from states',function(err,result){
        console.log(err)
        if(err)
        { 
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    })
});
router.get('/fetchallcity',function(req,res){
    pool.query("select * from cities where stateid=?",[req.query.did],function(err,result){
        console.log(err)
        if(err){
            console.log(err)
            res.status(500).json([])
        }
        else{
            res.status(200).json(result)
        }
    });
});
module.exports=router;