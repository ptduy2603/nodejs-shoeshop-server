const crypto = require('crypto')
const UsersModel = require('../models/user')
const ProductModel = require('../models/product')
const jwt = require('jsonwebtoken')

const sendEmail = require('../../untils/sendEmail')

const { SECRET_KEY } = require('../../data/index')

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
            const existEmail = await UsersModel.find({ email })
            if(existEmail.length) {
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
                sendEmail(newUser.email, '[ShoeShop] Verification Email', `Please click the following link to verify your email : http://localhost:8000/users/verify/${newUser.verificationToken}`)
                // sendVerificationEmail(newUser.email, newUser.verificationToken)
                res.status(200).json({ "Message" : 'Create new user successfully' })
            }            
        }
        catch(err) {
            next(err)
            res.status(500).json({ "Message" : "Registration failed" })
        }
    }

    //[GET] /users/verify/:token
    async verifyUser(req, res, next) {
        try {
            const token = req.params.token          
            const user = await UsersModel.findOne({ verificationToken : token })
            if(!user) {
                return res.status(404).json({ "Message" : "Invalid verification token" })
            }
            else 
            {
                user.verified = true
                user.verificationToken = undefined
                await user.save()
                res.status(200).json({ "Message" : 'Verify email successfully!' })
            }
        }   
        catch(error) {
            res.status(500).json({ "Message" : "Email verificaiton failed" })
            console.log("Verify email error", error)
            next(error)
        }
    }

    //[GET] /users/:token
    async getSigleUserInfo(req, res, next) {
        try {
            const { token } = req.params
            const { userId } = jwt.verify(token, SECRET_KEY)
            const user = await UsersModel.findOne({ _id : userId })
            res.status(200).json({ user : user ?? {} })
        }
        catch(err) {
            console.error(err)
            next(err)
        }
    }

    //[POST] users/login
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            // check if user is not exsist
            const user = await UsersModel.findOne({ email })
            if(!user) {
                return res.status(401).json({ "message" : "Your is mail is not exist" })
            }
            
            // check if password is incorrect
            if(user.password !== password) {
                return res.status(400).json({ "message" : "Your password is incorrect" })
            }

            // create JWT return to client and allow user to login
            const token = jwt.sign({
                userId : user._id,
            }, SECRET_KEY)

            res.status(200).json({"message": 'Login successfully', token})
        }
        catch(error) {
            res.status(500).json({ "message" : 'Login failed' })
            console.log("Login error:", error)
            next(error)
        }
    }

    //[POST] users/resetpassword
    async resetPassword(req, res, next) {
        try {
            const email = req.body.email
            // check if email is not exists
            const user = await UsersModel.findOne({ email })
            if(!user) {
                return res.status(400).json({ 'message' : 'your email is not exist' })
            }

            // create OTP code and return to client to verify their reset-password request
            // random OTP from 1000 to 9999
            const otp = Math.floor(Math.random()*8999 + 1000)

            const payload = {
                userId: user._id,
                otp
            }

            const token = jwt.sign(payload, SECRET_KEY + user._id + otp.toString(), { expiresIn : '10m' })          
            sendEmail(email, '[ShoeShop] Reset Your Password', `OTP to reset your password is: ${otp} . Expried in 10 minutes`)
            res.status(200).json({ token, userId: user._id , message: 'Send reset password email successfully' })
        }
        catch(error) {
            res.status(500).json({ 'message': 'reset password failed' })
            console.log('Reset password error', error)
            next(error)
        }
    }

    //[POST] users/resetpassword/:id/:token
    async verifyResetPassword (req, res, next) {
        try {
            const { otp } = req.body
            const { token , id } = req.params
            const payload = jwt.verify(token, SECRET_KEY + id + otp)
            if(payload.userId !== id)
                return res.status(400).json({ 'message' : 'OTP incorrect' })

            const newPayload = {
                userId : id,                
            }

            const newToken = jwt.sign(newPayload, SECRET_KEY + id)
            res.status(200).json({ message: 'verify reset password successfully', token : newToken, userId : id })
        }
        catch(err)
        {
            res.status(401).json({ "message": "Your verificaiton to reset password is not accepted" })
            console.log("Verify reset password error", err)
            next(err)
        }
    }

    //[POST] /users/changepassword/:id/:token 
    async changePassword(req,res,next) {
        try {
            const { id , token } = req.params
            const { password } = req.body
            const payload = jwt.verify(token, SECRET_KEY + id )
            if(payload.userId !== id)
                return res.status(400).json({ "message" : "reset password error" })

            const user = await UsersModel.findOne({ _id : id })
            user.password = password
            
            await user.save()

            const newToken = jwt.sign({ userId : user._id }, SECRET_KEY )
            res.status(200).json({ 'message' : 'reset password successfully', token : newToken})
        }
        catch(error) {
            res.status(500).json({ "message" : "resetpassword error" })
            console.log('Error message: ', error)
            next(error)
        }
    }

    //[POST] /users/delete-account
    async destroy(req, res, next) {
         try {
            const { token } = req.body
            // giải mã token để lấy userId
            const { userId } = jwt.verify(token, SECRET_KEY)
            await UsersModel.deleteOne({ _id : userId })
            res.status(200).json({ "message" : "delete user successfully"})
        }
        catch(error) {
            res.status(400).json({ "message" : "delete user failed" })
            console.log(err)
            next(err)
        }
    }

    //[POST] /users/adjust-password
    async adjustPassword(req, res, next) {
        try {
            const { token, password, newPassword } = req.body
            const { userId } = jwt.verify(token, SECRET_KEY)
            const user = await UsersModel.findOne({ _id : userId })
            if(!user) {
                return res.status(400).json({ "message" : "can't find user" })
            }
            if(user.password != password) {
                return res.status(404).json({ "message" : "old password is incorrect" })
            }

            user.password = newPassword
            await user.save()
            res.status(200).json({ "message" : "adjust password successfully" })
        }
        catch(err)
        {
            res.status(500).json({ "message" : "adjust passowrd error" })
            console.log(err)
            next(err)
        }
    }

    //[GET] users/favourites/:token
    async getFavouriteProducts (req, res, next) {
        try {
            const  { token } = req.params
            const { userId } = jwt.verify(token, SECRET_KEY)
            const user = await UsersModel.findOne({ _id : userId })
            let products = []
            if(user) {
                user?.favourites.forEach(async ( productId ) => {
                    const product = await ProductModel.findOne({ _id : productId })
                    products.push(product)
                })
            }
            res.status(200).json({ "message" : "fetch favourites" , products })
        }
        catch(err) {
            res.status(500).json({ "message" : "get favourites failed" })
            console.log(err)
            next(err)
        }
    }

    //[PATCH] users/update-favourites
    async updateUserFavouriteProducts (req, res, next) {
        try {
            const { token, products } = req.body
            const { userId } = jwt.verify(token, SECRET_KEY)
            await UsersModel.updateOne({ _id : userId }, { favourites : products })
            const user = await UsersModel.findOne({ _id : userId })
            let newProducts = []
            if(user) {
                user?.favourites.forEach(async ( productId ) => {
                    const product = await ProductModel.findOne({ _id : productId })
                    newProducts.push(product)
                })
            }
            res.status(200).json({ products : newProducts })
        }
        catch(err) {
            res.status(500).json({ "message" : "update favourites failed" })
            console.error(err)
            next(err)
        }
    }
}

module.exports = new authController