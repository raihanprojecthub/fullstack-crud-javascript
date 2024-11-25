import multer from 'multer';
import User from "../models/UserModel.js";
import fs from "fs";
import path from 'path';

// Setup multer untuk menyimpan file di folder `uploads`
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: { id: req.params.id }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

export const createUser = [
  upload.single('photoProfile'),
  async (req, res) => {
    try {
      const photoProfile = req.file ? req.file.path : null;
      await User.create({ ...req.body, photoProfile });
      res.status(201).json({ msg: "User Created" });
    } catch (error) {
      console.log(error.message);
    }
  }
];

export const updateUser = [
  upload.single('photoProfile'),
  async (req, res) => {
    try {
      const photoProfile = req.file ? req.file.path : null;
      await User.update(
        { ...req.body, photoProfile },
        { where: { id: req.params.id } }
      );
      res.status(200).json({ msg: "User Updated" });
    } catch (error) {
      console.log(error.message);
    }
  }
];

export const deleteUser = async(req, res)=>{
    const user = await User.findOne({
        where:{
            id : req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "No Data Found"});

    try {
        const filepath = `./uploads/${user.image}`;
        fs.unlinkSync(filepath);
        await User.destroy({
            where:{
                id : req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted Successfuly"});
    } catch (error) {
        console.log(error.message);
    }
}