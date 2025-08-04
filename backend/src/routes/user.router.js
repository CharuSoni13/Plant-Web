const express = require("express")
const bcrypt = require("bcrypt")
const userModel = require("../models/user.model")

const router = express.Router()

// Google Sign-In endpoint
router.post("/google-signin", async (req, res) => {
    const { uid, email, displayName, providerId } = req.body

    try {
        if (!uid || !email) {
            return res.status(400).json({ message: "UID and email are required" })
        }

        // Check if user already exists
        let user = await userModel.findOne({ uid: uid })

        if (user) {
            // Update last login
            user.lastLogin = new Date()
            await user.save()
            
            return res.status(200).json({
                message: "Login successful",
                user: {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.username,
                    providerId: user.providerId,
                    role: user.role,
                    isActive: user.isActive
                }
            })
        }

        // Create new user with default role as 'user'
        const newUser = new userModel({
            uid: uid,
            username: displayName || email.split('@')[0],
            email: email,
            providerId: providerId || 'google.com',
            isGoogleUser: true,
            role: 'user' // Default role for new users
        })

        await newUser.save()
        
        res.status(201).json({
            message: "User created successfully",
            user: {
                uid: newUser.uid,
                email: newUser.email,
                displayName: newUser.username,
                providerId: newUser.providerId,
                role: newUser.role,
                isActive: newUser.isActive
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
})

// Get user profile
router.get("/profile/:uid", async (req, res) => {
    try {
        const user = await userModel.findOne({ uid: req.params.uid })
        
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.username,
                providerId: user.providerId,
                isGoogleUser: user.isGoogleUser,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error: error.message })
    }
})

// Update user role (admin only)
router.patch("/update-role/:uid", async (req, res) => {
    const { role } = req.body

    try {
        if (!role || !['user', 'admin'].includes(role)) {
            return res.status(400).json({ message: "Valid role (user/admin) is required" })
        }

        const user = await userModel.findOne({ uid: req.params.uid })
        
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        user.role = role
        await user.save()

        res.status(200).json({
            message: "User role updated successfully",
            user: {
                uid: user.uid,
                email: user.email,
                displayName: user.username,
                role: user.role
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error: error.message })
    }
})

// Get all users (admin only)
router.get("/all", async (req, res) => {
    try {
        const users = await userModel.find({}).sort({ createdAt: -1 })
        
        res.status(200).json({
            users: users.map(user => ({
                uid: user.uid,
                email: user.email,
                displayName: user.username,
                providerId: user.providerId,
                isGoogleUser: user.isGoogleUser,
                role: user.role,
                isActive: user.isActive,
                createdAt: user.createdAt,
                lastLogin: user.lastLogin
            }))
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error", error: error.message })
    }
})

module.exports = router