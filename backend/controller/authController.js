import UserModel from "../model/AuthModel.js";

let Register = async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false, 
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({   
                success: false,
                message: "User already exists"
            });
        }   
        const newUser = await UserModel.create({ username, email, password });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
}

let Login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        if (!email || !password) {
            return res.status(400).json({
                success: false, 
                message: "Email and password are required"
            });
        }   
        const user = await UserModel.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        }); 
    }
}

export { Register, Login }