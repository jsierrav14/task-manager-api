const sgMail =  require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENGRID_API_KEY)



export const sendEmail = async(email,name) =>{
   try{ 
       const msg = {
        to:email,
        from:'jsierrav14@gmail.com',
        subject:'Thanks for joining in!',
        text:`Welcome to the app, ${name}`,
        html:'<strong>To easy</strong>'
    }
    await sgMail.send(msg)
}catch(e){
    console.log(e)
}
}

const sendCancelEmail = async(email,name)=>{
    try{
     const msg = {
        to:email,
        from:'jsierrav14@gmail.com',
        subject:`Goodbye ${name}`,
        text:`thanks for used this app`,
        html:'<strong>To easy</strong>'
     }
    }catch(e){

    }

}



export default sendCancelEmail;