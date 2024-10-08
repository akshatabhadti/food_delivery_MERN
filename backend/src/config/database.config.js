import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from '../models/user.model.js';
import { FoodModel } from '../models/food.model.js';
import { sample_users } from '../data.js';
import { sample_foods } from '../data.js';
import bcrypt from 'bcryptjs';
const PASSWORD_HASH_SALT_ROUNDS = 10;

dotenv.config();

mongoose.set('strictQuery', true);

const dbconnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/fooddb");
    await seedUsers();
    await seedFoods();
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

async function seedUsers() {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      console.log('Users seed is already done!');
      return;
    }
  
    for (let user of sample_users) {
      user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
      await UserModel.create(user);
    }
  
    console.log('Users seed is done!');
  }

  async function seedFoods() {
    const foods = await FoodModel.countDocuments();
    if (foods > 0) {
      console.log('Foods seed is already done!');
      return;
    }
  
    for (const food of sample_foods) {
      food.imageUrl = `/foods/${food.imageUrl}`;
      await FoodModel.create(food);
    }
  
    console.log('Foods seed Is Done!');
  }

export default dbconnect;
