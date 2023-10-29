const crypto = require('crypto')
const nodeMailer = require('nodemailer')
const UsersModel = require('../models/user')

// fucntion to send verification email to user
const sendVerificationEmail = async (email, verificationToken) => {
    // create a transport mailer
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'duythanhpham2603@gmail.com',
        }
    })

    const options = {
        from:'shoeshop.com',
        to:email,
        subject: 'Email verification',
        text:`Please click the following link to verify your email : https://localhost:8000/users/verify/${verificationToken}`
    }

    // send email
    try {
        await transporter.sendMail(options)
    } 
    catch(error) {
        console.log("Failed to send verification email", error)
    }
}

class authController {
    //[GET] /users
    async getUsers(req, res, next) {
       try {
            const users = await UsersModel.find({})
            res.json(users).status(200)
       }
       catch(err)
       {
            next(err)
            res.status(500).json({ "Message": "Error" })
       }
    }

    //[POST] /users/register
    async create(req, res, next){
        try {
            const { username, email, password } = req.body
            // check if email is exist in database
            const existEmail = await UsersModel.find({ email: email })
            if(existEmail) {
                return res.status(400).json({ "Message": "Email is existing" })
            }
            else {
                // create new user
                const newUser = new UsersModel({
                    username,
                    email,
                    password,
                })

                // create verification token
                newUser.verificationToken = crypto.randomBytes(20).toString("hex")

                await newUser.save()

                // send verification email to user
                sendVerificationEmail(newUser.email, newUser.verificationToken)
            }            
        }
        catch(err) {
            next(err)
            res.status(500).json({ "Message" : "Registration failed" })
        }
    }

    //[GET] /users/verify/:verificationToken
    async verifyUser(req, res, next) {
        try {
            const token = req.pagrams.verificationToken
            const user = await UsersModel.findOne({ verificationToken : token })
            if(!user) {
                res.status(404).json({ "Message" : "Invalid verification token" })
            }
            else 
            {
                user.verified = true
                user.verificationToken = undefined
                await user.save()
                res.status(200).json({ "Message" : 'Verify email successfully' })
            }
        }   
        catch(error) {
            res.status(500).json({ "Message" : "Email verificaiton failed" })
        }
    }
}

module.exports = new authController