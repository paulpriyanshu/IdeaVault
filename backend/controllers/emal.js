const nodemailer =require('nodemailer');
const {google}=require('googleapis');

// const oAuth2client = new google.auth.OAuth2(
//    CLIENT_ID,
//    CLIENT_SECRET,
//    REDIRECT_URI
// )
//oAuth2client.setCredentials({refresh_token:REFRESH_TOKEN})
const sendEmail =async options=>{
    //const ACCESS_TOKEN = await oAuth2client.getAccessToken();
    //console.log(ACCESS_TOKEN)
    const transporter = nodemailer.createTransport({
       service:'gmail',
       host: "smpt.gmail.com",
       port: 465,
       secure: true,
       
        
        auth:{
            
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
            
            
        },
       
    })
  const mailOptions = {
    from:'IdeaVault2024@gmail.com',
     to: options.email,
     subject: "this is a test",
     text: options.message
   
  }

    await transporter.sendMail(mailOptions)
 
}
module.exports = sendEmail