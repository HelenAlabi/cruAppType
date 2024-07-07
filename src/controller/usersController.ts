import express, { request } from "express";

import { UsersModel } from "../db/users";

class UsersController{


   //GET ALL USERS
    getAllUsers = async (request: express.Request, response: express.Response) => {
        try {
            const users = await UsersModel.find();
            return response.status(200).json({ data: users });
        } catch (error) {
            console.error('Error fetching users:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    };



       //GET INDIVIDUAL

    getUser = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
    
            // Find the user by ID
            const user = await UsersModel.findById(id);
            if (!user) {
                return response.status(404).json({ error: 'Not Found', message: 'User not found' });
            }
    
            return response.status(200).json({ data: user });
        } catch (error) {
            console.error('Error fetching user:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    };
          

         //CREATING USER

    createUser = async (request: express.Request, response : express.Response) => {
        try {
            const { name, email, role } = request.body;
            if (!name || !email || !role) {
                return response.status(400).json({ error: 'Bad Request', message: 'All fields are required' });
            }
            const user = new UsersModel({ name, email, role });
            await user.save();
            return response.status(200).json({ data: user, message: "User Created Successfully" });
        } catch (error) {
            console.error('Error creating user:', error);
            return response.status(400).json({ error: 'Bad Request', message: error });
        }
    };


       //UPDATE USER

    updateUser = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const { name, email, role } = request.body;
    
            // VALIDATION
            if (!name || !email || !role) {
                return response.status(400).json({ error: 'Bad Request', message: 'All fields are required' });
            }
    
            // FIND BY IT ID
            const user = await UsersModel.findById(id);
            if (user) {
                user.name = name;
                user.email = email;
                user.role = role;

                await user.save();
                return response.status(200).json({ data: user, message: "User Updated Successfully" });
            }
    
            
            return response.status(404).json({ error: 'Not Found', message: 'User not found' });
        } catch (error) {
            console.error('Error updating user:', error);
            return response.status(400).json({ error: 'Bad Request'});
        }
    }

     deleteUser = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
    
            // Find the user by ID
            const user = await UsersModel.findById(id);
            if (!user) {
                return response.status(404).json({ error: 'Not Found', message: 'User not found' });
            }
    
            // Delete the user
            await UsersModel.findByIdAndDelete(id);
    
            return response.status(200).json({ message: "User Deleted Successfully" });
        } catch (error) {
            console.error('Error deleting user:', error);
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default new UsersController();