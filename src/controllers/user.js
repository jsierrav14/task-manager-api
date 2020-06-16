import User from '../models/user';
import sharp from 'sharp';
import {sendEmail, sendCancelEmail} from './email'



const add = async (req, res) => {

    console.log(req.body);
    const user = new User(req.body);

    try {
        await user.save()
        await sendEmail(user.email, user.name)
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });

    } catch (e) {
        res.status(400).send(e);
    }


}

const getProfile = async (req, res) => {
    console.log(req.user);
    res.status(200).send(req.user);
}

const updateUser = async (req, res) => {

    const updates = Object.keys(req.body);
    const alloweUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => alloweUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send('Invalid update')
    }
    try {

       // const user = await User.findById(req.params.id);

        updates.forEach(update => req.user[update] = req.body[update]);

        await req.user.save();
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        res.send(req.user)
    } catch (error) {
        res.status(400).send(error)
    }
}

const deleteUser = async (req, res) => {
    try {

        sendCancelEmail(req.user.email, req.user.name)
        await req.user.remove();

        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send('An error a ocurred')
    }
}
const getById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).send('User cannot found');
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send('An error a ocurred')
    }

}

const uploadProfile =async(req, res)=>{
 const avatar = await sharp(req.file.buffer).resize({height:200, width:150}).png().toBuffer();
 req.user.avatar = avatar;
 await req.user.save();
  res.send('Avatatar was loaded sucessfully')
}

const deleteProfile = async(req, res)=>{
    req.user.avatar = undefined
    await req.user.save()
    res.send('Avatar was delete')
}

const getAvatar = async(req, res)=>{
    try{

        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
         res.status(404).send("Avatar doesn't exits");
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }
}
const uploadDocument =(req, res)=>{
  res.send()
}


const logging = async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token })

    } catch (e) {
        res.status(400).send(e)
    }
}

const logout = async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await req.user.save();

        res.send();

    } catch (error) {
         res.status(500).send();
    }
}

const logoutAll = async(req,res)=>{
   try{
    
    req.users.tokens = [];
    await req.user.save();

   }catch(error){
      res.status(500).send();
   }
}



const UserController = {
    add,
    getProfile,
    getById,
    updateUser,
    uploadProfile,
    deleteUser,
    deleteProfile,
    logging,
    logout,
    logoutAll,
    uploadDocument,
    getAvatar
};

export default UserController;