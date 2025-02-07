const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, unique: true },
  email: { type: String, required: true, },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },

  // ✅ Purchased Classes Field Added
  purchasedClasses: [
    {
      title: { type: String, required: true },
      teacher: { type: String, required: true },
      date: { type: String, required: true },
      image: { type: String },
      description: { type: String }
    }
  ],

}, { timestamps: true });

// ✅ Password hashing
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Method to compare passwords
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ✅ Generate Reset Password Token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and save to the database
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes

  return resetToken;
};

// ✅ Add Purchased Class to User (Helper Method)
UserSchema.methods.addPurchasedClass = async function (classData) {
  this.purchasedClasses.push(classData);
  await this.save();
  return this.purchasedClasses;
};

module.exports = mongoose.model('User', UserSchema);
