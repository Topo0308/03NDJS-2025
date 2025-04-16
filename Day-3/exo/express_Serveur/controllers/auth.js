import crypto from "crypto",
import user from "../models/user.js";
export async function register(reg, res) {
	const { email, password, isAdmin } = req.body;

	try{
	 const userExist = await user.findOne({ email });
	 if (userExit)
		return status(409).json({
		error: "user already exists",
		}); 

	const hashedPassword = await bccrypt.hash(password, 10);
	const newUser = User.create({
		email,
		password: hashedPassword,
		isAdmin,
        });
	res.status(201).json({
		sucess: true, 
		message: "user registered",
		user: { newUser.email,
		},
	      });
	     } catch (err) {
		res.status.(500).json({
			error: "Register faild",
			});
			});
export async function login(req, res) {
	const { email, password, } = req.body:
		if email 
