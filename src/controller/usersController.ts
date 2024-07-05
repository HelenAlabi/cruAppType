import express, { request } from "express";

import { UsersModel } from "../db/users";

class UsersController{



    getAllUsers = async (request: express.Request, response : express.Response)=>{
        try {
            const users = await UsersModel.find();
            return response.status(200).json({data: users});
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    getUser = async (request: express.Request, response : express.Response)=>{
        try {
            const {id} = request.params;
            const user = await UsersModel.findById(id);
            return response.status(200).json({data: user});
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    createUser = async (request: express.Request, response : express.Response)=>{
        try {
            const {name, email, role} = request.body;
            const user = new UsersModel({
                name,
                email,
                role,
            });
            await  user.save();
            return response.status(200).json({data : user  , message: "User Created Successfully"});
        } catch (error) {
            return response.sendStatus(400);
        }
    }


    updateUser = async (request: express.Request, response : express.Response)=>{
        try {
            const {id} = request.params;
            const {name, email, role} = request.body;

            const user = await UsersModel.findById(id);
            if(user){
                user.name = name;
                user.email = email;
                user.role = role;
                await  user.save();
                return response.status(200).json({data : user  , message: "User Updated successfully"});
            }
            return response.sendStatus(400);
        } catch (error) {
            return response.sendStatus(400);
            
        }
    }

    deleteUser = async (request: express.Request, response : express.Response)=>{
        try {
            const {id} = request.params;
             await UsersModel.findByIdAndDelete({_id: id});
            return response.status(200).json({ message:"User Deleted"});
        } catch (error) {
            return response.sendStatus(400);
        }
    }
}

export default new UsersController();