import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
// import {MongoClient} from "mongodb"
import mongoose from "mongoose"

const server = express();

server.use(cors());
server.use(express.json());


mongoose.connect("mongodb+srv://mail:123@cluster0.yebgfam.mongodb.net/bulkmail?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log("mongodb connected to cloud")
}).catch((error)=>{
    console.log(error)
  })

const userInfo=mongoose.model("userInfo",{},"userInfo")
 




// Create a test account or replace with real credentials.




server.post("/sendmail", (req, res) => {
  const { msg, emailList } = req.body;

  userInfo.find().then((data)=>{
  // console.log(data[0].toJSON())
  const transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  service: "gmail",
  auth: {
    user: data[0].toJSON().user,
    pass: data[0].toJSON().pass,
  },
});
 new Promise(async function (resolve, reject) {
    try {
      for (var i = 0; i < emailList.length; i++) {
        console.log(emailList[i]);
        await transporter.sendMail({
            from: "masmuthu99@gmail.com",
            to: emailList[i],
            subject: "bulk mail",
            text: msg,
          },
        );
      }
      resolve("success")
    } catch (error) {
      reject(error);
    }
  })
    .then(() => {
      res.send(true);
    })
    .catch(() => {
      res.send(false);
    });

}).catch((error)=>{
  console.log(error)
})


 
});

server.listen(5000, function () {
  console.log("server started");
});
