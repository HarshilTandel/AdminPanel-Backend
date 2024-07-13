const User = require("../models/user-model");
const Contact =require("../models/contact-model");
const getAllUsers = async(req,res) => {
    try {
        const users = await User.find({},{password:0});
        console.log(users);
        if(!users || users.length ===0){
            return res.status(404).json({message:"No Users Found"});
        }
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getAllContacts = async (req,res) =>{
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length ===0){
            return res.status(404).json({message:"No Contacs Found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}
const  getUserById = async(req,res) => {
    try {
        const id =req.params.id;
        const data =await User.findOne({_id:id},{password:0});
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req,res) => {
    try {
        const id =req.params.id;
        const updatedUserdata = req.body;
        const updatedData = await User.updateOne({_id:id},{
            $set : updatedUserdata, 
        })
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
};

const  deleteUserById = async(req,res) => {
    try {
        const id =req.params.id;
        await User.deleteOne({_id:id});
        res.status(200).json({message:"User Delted Sucessfully"});
    } catch (error) {
        next(error);
    }
};
const  deleteContactById = async(req,res) => {
    try {
        const id =req.params.id;
        await Contact.deleteOne({_id:id});
        res.status(200).json({message:"Contact Delted Sucessfully"});
    } catch (error) {
        next(error);
    }
};



module.exports ={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};