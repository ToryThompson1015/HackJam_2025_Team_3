var mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    email: {type: String, unique: true},
    password: String,
    lastName: {
      type: String,
      default: "lastName",
    },
    location: {
      type: String,
      default: "My City",
    },
    role: {
      type: String,
      enum: ["learner", "admin", "hr"],
      default: "learner",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare hashed password with input password
userSchema.methods.comparePassword = async function (password) {
  try {
    return await comparePassword(password, this.password);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};

module.exports = mongoose.model("User", userSchema);
