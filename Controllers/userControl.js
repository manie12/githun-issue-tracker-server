import userType from '../Models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const SignUpUser = async (res, req) => {
    const { FirstName, SecondName, Email, Password, ConfirmPassword } = req.body;
    try {
        const existingUser = await userType.findOne({ Email });
        if (existingUser) return res.status(400).json({ message: "user already exist" });

        if (Password !== ConfirmPassword) return res.status(400).json({ message: "Password does not match" });

        const hashedPassword = await bcrypt.hash(Password, 12);

        const result = await userType.create({ Email, Password: hashedPassword, Name: `${FirstName} ${SecondName}` })

        const token = jwt.sign({ Email: result.Email, id: result._id }, 'testtoken', { expiresIn: '1h' });

        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json(error)

    }

}
export const LoginUser = async (res, req) => {
    const { Email, Password } = req.body;

    try {
        const existingUser = await userType.findOne({ Email });

        if (!existingUser) return res.status(400).json({ message: "user Dose Not exist" });

        const isPassWordCorrect = await bcrypt.compare(Password, existingUser.Password);

        if (!isPassWordCorrect) return res.status(400).json({ message: "invalid Password" });

        const token = jwt.sign({ Email: existingUser.Email, id: existingUser._id }, "testToken", { expiresIn: "1hr" });

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json(error)
    }


}