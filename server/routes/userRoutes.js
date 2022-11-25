const {
  register,
  login,
  setAvatar,
  getAllUsers,
  logout,
  checkLogin,
  setUser
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allUsers/:id", getAllUsers);
router.get("/logout", logout);
router.get("/checkLogin", checkLogin);
router.post("/setUser", setUser)

module.exports = router;
