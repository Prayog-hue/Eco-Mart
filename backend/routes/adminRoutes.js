const express = require("express");
const User = require('../models/User');
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router()

//@route GEt /api/admin/users
//desc get all users (Admin Only)
//access Private/Admin
router.get("/",protect, async(req,res)=>{
try {
    const users = await User.find({})
    res.json(users)
} catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error"})
    
}
})

//@route POSt /api/admin/users
//@desc Add a new user (admin Only)
//access Private/Admin
router.post("/", protect, isAdmin, async(req,res)=>{
    const{ name, email, password, role} = req.body

    try {
        let user = await User.findOne({email})
        if(user){
            res.status(400).json({message: "User Already exists"})
        }
        user= new User({
            name, 
            email,
            password,
           role: role || "customer"
          })

          await user.save()
          res.status(201).json({message: " User Created successfully", user})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error"})
    }
})

//route PUT /api/admin/users/:id
//desc update user info
//acccess private/admin
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();
      res.json({ message: "User Updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error1", error: error.message  });
  }
});

//route DELETE /api/admin/users/:id
//desc delete a user 
//access private/admin 
router.delete("/:id", protect, isAdmin, async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(user){
            await user.deleteOne()
            res.json({Message: "User deleted successfully"})

        }
        else{
            res.status(404).json({message: "user not found"})

        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Server Error", error:error.message})
    }
})



module.exports = router;