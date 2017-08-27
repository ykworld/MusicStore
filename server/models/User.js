const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
  email: {
    type: String,
    required:[true, 'Email is required!'],
    match: [emailRegex, 'You have entered an invalid email address.'],
    trim: true,
    unique: true, 
  },
  lastName: {
    type: String,
    required:[true, 'Last Name is required!'],
    trim: true
  },
  firstName: {
    type: String,
    required:[true, 'First Name is required!'],
    trim: true
  },
  password: {
    type: String,
    required:[true, 'Password is required!'],
    select: false
  },
  address: [{
    type: Schema.Types.ObjectId,
    ref: 'address'
  }],
  createAt: {
    type: Date,
    default: Date.now()
  },
  updateAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.virtual('passwordConfirmation')
  .get(() => { 
    return this._passwordConfirmation; 
  })
  .set((value) => { 
    this._passwordConfirmation = value; 
  });

UserSchema.virtual('originalPassword')
  .get(() => { 
    return this._originalPassword; 
  })
  .set((value) => { 
    this._originalPassword = value; 
  });

UserSchema.virtual('currentPassword')
  .get(() => { 
    return this._currentPassword; 
  })
  .set((value) => { 
    this._currentPassword = value; 
  });

UserSchema.virtual('newPassword')
  .get(() => { 
    return this._newPassword; 
  })
  .set((value) => { 
    this._newPassword = value; 
  });

// password validation
UserSchema.path("password").validate(function(v) {
  const user = this;
  console.log(user);
  
  // create user
  if (user.isNew) {
    if (!user.passwordConfirmation) {
      user.invalidate("passwordConfirmation", "Password Confirmation is required!");
    }
    if (user.password !== user.passwordConfirmation) {
      user.invalidate("passwordConfirmation", "Password Confirmation does not matched!");
    }
  }
 
  // update user
  if (!user.isNew) {
    if (!user.currentPassword) {
     user.invalidate("currentPassword", "Current Password is required!");
    }
    if (user.currentPassword && user.currentPassword != user.originalPassword){
     user.invalidate("currentPassword", "Current Password is invalid!");
    }
    if (user.newPassword !== user.passwordConfirmation) {
      user.invalidate("passwordConfirmation", "Password Confirmation does not matched!");
    }
  }
});

// hash password
UserSchema.pre("save", function(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  } else {
    user.password = bcrypt.hashSync(user.password);
    return next();
  }
});

// model methods
UserSchema.methods.authenticate = function(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};
 
const User = mongoose.model('user', UserSchema);

module.exports = User;