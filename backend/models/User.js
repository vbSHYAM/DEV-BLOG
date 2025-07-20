const mongoose = require('mongoose');
// Library to hash and compare passwords securely
const bcrypt = require('bcryptjs');

// ! User schema defines the structure of user documents in MongoDB
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    // This adds two auto-managed fields: createdAt & updatedAt
}, {timestamps: true});


// ! This is a Mongoose middleware function that runs before saving a user.
userSchema.pre('save', async function (next) {
    // checks if password is modified. If not modified (during profile update) skip hashing
  if (!this.isModified('password')) return next();
    // Generates salt with 10 rounds
    // ! A salt is a random string added to a password before hashing. Makes hashes unique even for same passwords
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ! Password comparison method
// It compares a plain password (like one entered in login form) with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);