const nodeMailler = require('nodemailer')

// function to send email to user
async function sendEmail(email, subject , content) {
    const transporter = nodeMailler.createTransport({
        service: 'gmail',
        auth: {
            user: 'duythanhpham2603@gmail.com',
            pass: 'yaleomwvobnsdvgv'
        }
    })

    const options = {
        from:'duythanhpham2603@gmail.com',
        to:email,
        subject: subject,
        text: content,
    }

    // send email
    try {
        await transporter.sendMail(options)
    } 
    catch(error) {
        console.log("Failed to send verification email", error)
    }
}

module.exports = sendEmail