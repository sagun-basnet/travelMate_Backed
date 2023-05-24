import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"; 

export const register = (req,res)=>{
    //check user of exists

    const q = "SELECT * from user_info where email = ?";

    db.query(q,[req.body.email], (err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User already exists!");
        //create a new user
            //hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt)

            const q = "INSERT INTO user_info(`user_name`,`email`,`password`,`user_phone`,`role`) VALUE (?) ";
            const values = [
                req.body.user_name,
                req.body.email,
                hashedPassword,
                req.body.user_phone,
                req.body.role,
            ];
            db.query(q,[values], (err,data) =>{
                if(err) return res.status(500).json(err);
                return res.status(200).json("User has been created..")
            })
    })

}

//============login
export const login = (req,res)=>{
    const q = "SELECT * from user_info where email = ?";

    db.query(q,[req.body.email], (err,data) =>{
        if(err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        // const userRole = req.body.role;
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)

        if(!checkPassword) return res.status(400).json("Wrong Password or Email");

        const token = jwt.sign({user_id:data[0].user_id}, "secretkey");

        const {password,role, ...others} = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })
}

export const logout = (req,res)=>{
    res.clearCookie("accessToken",{
        secure: true,
        sameSite:"none"
    }).status(200).json("User has been logged out..")
}