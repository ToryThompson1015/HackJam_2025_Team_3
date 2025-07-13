var mongoose = require("mongoose");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");

const userSchema = mongoose.Schema(
  {
    firstName: String,
    email: { type: String, unique: true },
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
      enum: ["learner", "admin", "alumni"],
      default: "learner",
    },
    //   cohort: {
    //     type: String,
    //     required: [true, 'Cohort is required'],
    //     trim: true,
    //     enum: [
    //     'Web Dev 2024-Winter', 'Web Dev 2023-Fall', 'Web Dev 2023-Summer', 'Web Dev 2023-Spring',
    //     'Data Analytics 2024-Winter', 'Data Analytics 2023-Fall', 'Data Analytics 2023-Summer', 'Data Analytics 2023-Spring',
    //     'Cybersecurity 2024-Winter', 'Cybersecurity 2023-Fall', 'Cybersecurity 2023-Summer',
    //     'Cloud Computing 2024-Winter', 'Cloud Computing 2023-Fall',
    //     'Software Engineering 2024-Winter', 'Software Engineering 2023-Fall'
    //   ]
    // },
    //   graduationDate: {
    //     type: Date,
    //     required: [true, 'Graduation date is required']
    //   },
    //   Contributions : [{
    //     skill: String,
    //     level: {
    //       type: String,
    //       enum: ['Volunteer', 'participation', 'Donations','mentoring' ],
    //       default: 'participation'
    //     }
    //   }],
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
