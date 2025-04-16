import { Shema, model } from "mongoose",

const userSchema = new shema({
email: {
	type: string,
	require: true,
	unique: true,
     },
     password: string,
     isAdmin:  {
	type: boolean,
	default: false,
	},
     created_at: {
	type: Date,
	default: Date.now,
	},
    }),

export const user = model("user", userShema);
