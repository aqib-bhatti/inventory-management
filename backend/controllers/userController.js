import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { collections } from '../db.js';
import { signupSchema } from '../authValidator.js';
import { loginSchema } from '../authValidator.js';

export const signup = async (req, res) => {
  //  console.log('Received body:', req.body)
  try {
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.issues.map((err) => ({
          path: err.path,
          message: err.message,
        })),
      });
    }

    const { name, email, password, role } = validationResult.data;

    const existingUser = await collections.user().findOne({ email });
    if (existingUser) {
      // ✅ Yahan json body add kiya gaya hai
      return res.status(400).json({ error: 'email is already registered' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await collections.user().insertOne({
      name,
      email,
      password: hashPassword,
      role,
      createAt: new Date(),
    });

    res.status(201).json({
      success: true,
      insertId: result.insertId,
      message: 'account is registered',
    });
  } catch (err) {
    console.error('Signup Error:', err); 
    res.status(500).json({
      success: false,
      error: err.message || JSON.stringify(err) || 'Internal Server Error',
    });
  }
};

// login

export const login = async (req, res) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;

    const user = await collections.user().findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // 👇 JWT ke payload me user-agent include karo
    const payload = {
      id: user._id,
      role: user.role,
      ua: req.headers["user-agent"], 
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

//     res.cookie("token", token, {
//   httpOnly: true,
//   secure: false,  
//   sameSite: "Lax",
//   maxAge: 24 * 60 * 60 * 1000, // 1 day
// });

// res.json({
//   success: true,
//   user: {
//     id: user._id,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//   },
// });
  } catch (err) {
    if (err.errors) {
      return res.status(400).json({ success: false, errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};



export const getProfile = async (req, res) => {
  try {
    const user = await collections.user().findOne({ _id: new ObjectId(String(req.user.id)) }, { projection: { password: 0 } });
    if (!user) {
      return res.status(404).json({ error: 'user not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// reset password

export const resetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Old or new Password required' });
    }
    const user = await collections.user().findOne({ _id: new ObjectId(String(req.user.id)) });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    await collections.user().updateOne({ _id: new ObjectId(String(req.user.id)) }, { $set: { password: hashPassword } });
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await collections.user().find({}).project({ password: 0 }).toArray();

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const objectId = new ObjectId(String(userId));

    const userToDelete = await collections.user().findOne({ _id: objectId });

    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (userToDelete.role === 'superadmin') {
      return res.status(403).json({ error: 'Super admin cannot be deleted.' });
    }

    const result = await collections.user().deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
};
