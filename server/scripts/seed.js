import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";
import Course from "../models/Course.js";

dotenv.config();

const courses = [
  { code: "CS101", name: "Introduction to Computer Science", faculty: "Dr. Priya Sharma" },
  { code: "CS202", name: "Database Management Systems", faculty: "Prof. Arjun Rao" },
  { code: "CS303", name: "Web Technologies", faculty: "Dr. Neha Singh" },
  { code: "CS304", name: "Software Engineering", faculty: "Prof. Kiran Kumar" }
];

try {
  await mongoose.connect(process.env.MONGO_URI);

  const adminPassword = await bcrypt.hash("Admin@123", 10);

  await User.updateOne(
    { email: "admin@example.com" },
    {
      $set: {
        name: "System Administrator",
        password: adminPassword,
        role: "admin"
      }
    },
    { upsert: true }
  );

  for (const course of courses) {
    await Course.updateOne(
      { code: course.code },
      { $set: course },
      { upsert: true }
    );
  }

  console.log("Seed completed.");
  console.log("Admin: admin@example.com / Admin@123");
  console.log("Courses inserted/updated:", courses.length);
} catch (error) {
  console.error(error);
} finally {
  await mongoose.disconnect();
}
