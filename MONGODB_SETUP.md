# MongoDB Setup Guide

## Why You Need MongoDB

The "Invalid email or password" error occurs because MongoDB is not installed/running, so the database cannot find your user accounts.

## Option 1: Install MongoDB Locally (Recommended for Development)

### For Windows:

1. **Download MongoDB Community Server**
   - Go to: https://www.mongodb.com/try/download/community
   - Select: Windows → MSI Installer
   - Download and run the installer

2. **Installation Steps**
   - Choose "Complete" installation
   - Install as a service (recommended)
   - Install MongoDB Compass (GUI tool)

3. **Verify Installation**
   ```bash
   mongod --version
   ```

4. **Start MongoDB**
   - If installed as service, it auto-starts
   - Or manually run: `mongod`

5. **Seed the Database**
   ```bash
   cd "C:\Users\Admin\Desktop\AArambh Media"
   npm run seed
   ```

   This creates:
   - Admin: admin@aarambhamedia.com / Admin@123
   - User: user@example.com / User@123

---

## Option 2: Use MongoDB Atlas (Cloud - FREE)

If you don't want to install MongoDB locally, use the free cloud version:

1. **Create Free Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Cluster**
   - Choose "FREE" M0 tier
   - Select a region close to you
   - Click "Create Cluster"

3. **Set Up Database Access**
   - Go to "Database Access"
   - Add New Database User
   - Username: `admin`
   - Password: Choose a strong password
   - User Privileges: "Read and write to any database"

4. **Set Up Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - Or add your specific IP

5. **Get Connection String**
   - Go to "Database"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update .env.local**
   ```env
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aarambh-media?retryWrites=true&w=majority
   # Replace YOUR_PASSWORD with your actual password
   # Replace cluster0.xxxxx with your cluster URL
   ```

7. **Restart Dev Server**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

8. **Seed the Database**
   ```bash
   npm run seed
   ```

---

## Quick Test

After setting up MongoDB:

1. **Visit** http://localhost:3000
2. **Sign Up** with the new signup form
3. **Or Login** with seeded credentials:
   - Admin: `admin@aarambhamedia.com` / `Admin@123`
   - User: `user@example.com` / `User@123`

---

## Troubleshooting

### "Cannot connect to MongoDB"
- **Local**: Make sure MongoDB service is running
- **Atlas**: Check your connection string and password

### "User not found"
- Run `npm run seed` to create default users
- OR signup with a new account

### Port Issues
- MongoDB default port: 27017
- Make sure it's not blocked by firewall

---

## Summary

**Easiest Option**: MongoDB Atlas (cloud, free, no installation)
**Best for Development**: Local MongoDB (faster, offline access)

Choose what works best for you! 🚀
