const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const nodemailer = require('nodemailer/');

let transporter = nodemailer.createTransport({
  host: 'imap.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ksinghal235@gmail.com', // generated ethereal user
    pass: 'Kapil@13465' // generated ethereal password
  }, tls: {
    rejectUnauthorized: false
  },
});

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
      const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    user.save()
    .then( result => {
      transporter.sendMail({
        from: '"Kapil Singhal" <ksinghal235@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Email sent?</b>' // html body
      } .catch(console.error)
      // , (error, info) => {
      //   if(error) {
      //     return console.log(err);
      //   }
        // console.log('setup scyss');
      // }
      );
      res.status(201).json({
        message: "User Created!",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: {
          message: "Invalid authentication credentials!"
        }
      });
    });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email }) .then (user => {
    if (!user) {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then (result => {
    if (!result) {
      return res.status(401).json({
        message: 'Auth Failed'
      });
    }
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: "1h" });
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id
    });
  })
  .catch(error => {
    return res.status(401).json({
      message: 'Invalid authentication credentials!'
    });
  })
}
