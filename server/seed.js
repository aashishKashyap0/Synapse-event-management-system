const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./src/models/User");

// Load environment variables
dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // Clear existing users
    await User.deleteMany();
    console.log("🗑️  Cleared existing users");

    const passwordHash = await bcrypt.hash("password123", 10);

    const users = [
      {
        name: "Student User",
        email: "student@college.edu",
        passwordHash,
        role: "STUDENT",
        department: "Computer Science"
      },
      {
        name: "Coordinator User",
        email: "coordinator@college.edu",
        passwordHash,
        role: "COORDINATOR",
        department: "Computer Science"
      },
      {
        name: "HOD User",
        email: "hod@college.edu",
        passwordHash,
        role: "HOD",
        department: "Computer Science"
      }
    ];

    await User.insertMany(users);

    console.log("✅ Demo users created successfully!");
    console.log("\n📝 Login Credentials:");
    console.log("Student: student@college.edu / password123");
    console.log("Coordinator: coordinator@college.edu / password123");
    console.log("HOD: hod@college.edu / password123");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seedUsers();
