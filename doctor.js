var express = require('express');
var router = express.Router();
var pool=require('./pool');
var upload=require('./multer');
const { response } = require('express');


/* GET home page. */
router.get('/interface', function(req, res, next) {
  if(! req.session.ses_admin){
  res.render('login',{msg:''});
  }
  else{
    res.render('doctor',{msg:''})
  }
 
});

router.post('/submit',upload.single('pic'),function(req,res,next){
  console.log(req.body)
  console.log(req.file)
 
  var dname=req.body.fn+" "+req.body.ln
  pool.query('insert into doctor(name,dob,state,city,zip,address,email,number1,number2,gender,picture)values(?,?,?,?,?,?,?,?,?,?,?)',[
    dname,req.body.dob,req.body.st,req.body.ct,req.body.zip,req.body.add,req.body.em,req.body.cn,req.body.an,req.body.ge,req.file.filename],function(err,result)
    {
      if(err){
        
      res.render('doctor',{msg:'Fail This Record'})}
      else{
      res.render('abc',{msg:'Success This Record'})}
    })
})
router.get('/displayall',function(req,res){
  if(! req.session.ses_admin){
    res.render('login',{msg:''})
  } else{
  pool.query('select d. *,(select statename from states S where S.stateid=d.state) as statename,(select cityname from cities DD where DD.cityid=d.city) as cityname  from doctor d',function(err,result){
    if(err)
    {
      res.render('displayall',{data:[]})
    }
    else{
      res.render('displayall',{data:result})
    }
  })
}
})
router.get('/doctorbyid',function(req,res,next){
  pool.query('select D.*,(select statename from states S where S.stateid=D.state) as statename,(select cityname from cities DD where DD.cityid=D.city) as cityname  from doctor D where doctorid=? ',[req.query.did],function(err,result)
  {
    if(err)
    {
      console.log(err)
      res.render('doctorbyid',{data:[]})

    }
    else{
      console.log(result)
    res.render('doctorbyid',{data:result})
    }
  })
})

router.get('/editdelete',function(req,res,next){
  if(req.query.btn=="Edit")
  {
      pool.query("update doctor  set name=?,dob=?,state=?,city=?,zip=?,address=?,email=?,number1=?,number2=?,gender=? where doctorid=?",[req.query.fn,req.query.dob,req.query.st,req.query.ct,req.query.zip,req.query.add,req.query.em,req.query.cn,req.query.an,req.query.ge,req.query.id],function(err,result){
          if(err){
              console.log(err)
              res.redirect("displayall")
          }
          else{
              res.redirect("/doctor/displayall")
          }
      });
  }
  else{
      pool.query("delete from doctor where doctorid=?" ,[req.query.id],function(err,result){
          if(err)
          {
              console.log(err)
              res.redirect("displayall")
          }
          else
          {
              res.redirect("displayall")
          }
      })
        }
})

router.get('/editpicture',function(req,res){
  pool.query("select * from doctor   where doctorid=?",[req.query.did],function(err,result){
    if(err)
    {
      res.redirect("displayall");

    }
    else
    {
      res.render("editpicture",{data:result})
    }
  })
})

router.post('/updatepicture',upload.single('picture'),function(req,res,next){
  pool.query("update doctor set picture=?   where doctorid=?",[req.file.filename,req.body.id],function(err,result){
    if(err)
    {
      console.log(err)
      res.redirect("displayall");

    }
    else
    {
      res.redirect("displayall")
    }
  })
})

router.get('/searching',function(req,res,next){
  if(! req.session.ses_admin){
    res.render('login',{msg:''});
    }
  res.render('searching');
});
router.get('/search',function(req,res){
  if(! req.session.ses_admin){
    res.render('login',{msg:''});
    }
    else
  q="select * from doctor where name like '%"+req.query.pat+"%'"

  pool.query(q,function(err,result){

    if(err){
      console.log(err)
     return res.status(500).json([])

    }
    else{
      return res.status(200).json(result)
    }
  })
})
module.exports = router;
