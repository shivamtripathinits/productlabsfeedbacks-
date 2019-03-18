var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

mongoose.connect('mongodb://iiit:hyderabad1@ds017205.mlab.com:17205/iiit');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var feedbackSchema = new mongoose.Schema({
   name: String,
   mobile: String,
   review: String
});

var Feedback = mongoose.model("Feedback", feedbackSchema);



    
app.get('/', (req, res) => {
  res.render('feedback');
});


app.get("/feedbacksub", function(req, res){
    // Get all campgrounds from DB
   
    Feedback.find({}, function(err, allFeedbacks){
       if(err){
           console.log(err);
       } else {
          res.render("feedbacksub",{feedbacks:allFeedbacks});
       }
    });
});

//CREATE - add new campground to DB
app.post("/", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var review = req.body.review;
    var mobile = req.body.mobile;
    console.log(req.body);
    var newFeedback = {name: name, mobile: mobile, review: review};
    // Create a new campground and save to DB
    Feedback.create(newFeedback, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            
            res.redirect("/feedbacksub");
        }
    });
});






app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});