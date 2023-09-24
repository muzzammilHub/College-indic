const User = require("../models/user");

//code for register
exports.register = async (req, res)=>{
    try {

        const {name, email, password} = req.body;

        console.log(name, email, password);

        let user = await User.findOne({email});
        if(user) 
            return res.status(400).json({ success: false, message: "User already exists"})

            user = await User.create({
                name, 
                email, 
                password,
            });    
        
            const token = await user.generateToken();

            const options = {
                expires: new Date(Date.now() + 10*24*60*60*1000),
                httpOnly: true
            } 
    
            return res.status(201).cookie("token", token, options).json({
                    success: true,
                    user,
                    token
                })    

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// code for login
exports.login = async function(req, res){
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email}).select("+password");

        if(!user){
            return res.status(400).json({
                    success: false, 
                    message: "User not exist"
                })
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res .status(400).json({
                    success: false,
                    message: "password doesnot match"
                });
        }

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 10*24*60*60*1000),
            httpOnly: true
        } 

        return res.status(200).cookie("token", token, options).json({
                success: true,
                user,
                token
            })
    } catch (error) {
        return res.status(500).json({
                success: false,
                message: error.message
            })
    }
}


exports.logout = async (req, res)=>{

    try {
        return res.status(200).cookie("token",null, {
            expires: new Date(Date.now()), 
            httpOnly: true
        }).json({
            success: true,
            message: "successfully logout"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}