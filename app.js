//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =require("mongoose");
const _ =require('lodash');
const  mongodb =require('mongodb');
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const PORT=process.env.PORT || 3000;
const app = express();
mongoose.connect('mongodb+srv://HasanNaim:1234567800@blog.snn8wlc.mongodb.net/BlogData',
{UseNewUrlParser:true}
).then(function(){

  console.log("Mongo connected successfuly");
  
  
  }).catch(function(err){
  
  
  console.log("Error connecting to mongo "+err);
  
  
  
  });
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let MessageArray=[];
let posts=[];

const itemSchema ={

name:String,
content:String
}

const BlogList =mongoose.model("Post", itemSchema);



app.get("/" ,function(req,res){
  
   BlogList.find({}).then(function(){

    res.render("home" ,{HomeContent:homeStartingContent , posts: posts });



   }).catch(function(err){


console.log(`there is an erorr ${err}`);

   });

/*
      BlogList.inserOne()
      .then(function(){
  
        console.log("Success");
  
     ;
 
  
      })
      .catch(function(error){
  
        console.log(error);
  
  
      });*/


   
   
  




});

app.get("/about" ,function(req,res){


  res.render("about" ,{HomeContent:aboutContent});
  
  
  });
  
  app.get("/contact" ,function(req,res){


    res.render("contact" ,{HomeContent:contactContent});
    
    
    });
  app.get("/compose" ,function(req,res){


    res.render("compose");
  });

  app.post("/compose" ,function(req,res){

     const post= new BlogList
({
    name :req.body.PostTitle,
    content:req.body.PostBody}
);
    post.save().then(function(){

res.redirect("/");

    })
posts.push(post);
console.log(posts);






  });

app.get("/posts/:postName",function(req,res){
 const reqTitle= _.lowerCase(req.params.postName);
MessageArray.forEach(function(post){

const storedTitle=  _.lowerCase(post.title)
if(reqTitle === storedTitle){

  console.log("Matched")

res.render("post" , {
titles: post.title
,


content: post.content

});
}

});




});


app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
