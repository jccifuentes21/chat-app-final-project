const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    const emailCheck = await User.findOne({ email });

    if (usernameCheck) {
      return res.json({ msg: "Username already used", status: false });
    }
    if (emailCheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    delete user.password;
    req.session.user = user;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Password not valid");
      return res.json({ msg: "Incorrect username or password", status: false });
    }

    console.log("User found");
    delete user.password;
    req.session.user = user;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    req.session = null;
    return res.json({ status: true });
  } catch (error) {
    next(error);
  }
};

module.exports.checkLogin = async (req, res, next) => {
  try {
    if (req.session.user) {
      console.log(req.session.user)
      return res.json({ status: true, user: req.session.user });
    }
    return res.json({ status: false });
  } catch (error) {
    next(error);
  }
};

module.exports.setUser = async (req, res, next) => {
  console.log('set user')
  const { user } = req.body;
  try{
    if(req.session.user){
      req.session.user = user;
      return res.json({status: true});
    }
  }catch(error){
    console.log(error);
  }
};
