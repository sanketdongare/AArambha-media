# AArambh Media - Secure Authentication & Admin Panel

A production-ready Next.js application with JWT authentication, role-based access control, and comprehensive admin panel for managing users and bookings.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   
   The `.env.local` file is pre-configured. Update if needed:
   ```env
   MONGODB_URI=mongodb://localhost:27017/aarambh-media
   JWT_SECRET=your-secret-key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Start MongoDB** (if using local installation)
   ```bash
   mongod
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Default Credentials

**Admin Account:**
- Email: `admin@aarambhamedia.com`
- Password: `Admin@123`

**User Account:**
- Email: `user@example.com`
- Password: `User@123`

> ⚠️ **Change admin password immediately in production!**

## ✨ Features

### Authentication
- ✅ JWT-based authentication with httpOnly cookies
- ✅ Secure password hashing (bcryptjs)
- ✅ Role-based access control (user/admin)
- ✅ Protected routes with middleware

### User Features
- ✅ User login and registration
- ✅ Personal dashboard
- ✅ Secure session management

### Admin Features
- ✅ Admin dashboard with statistics
- ✅ User management (view, delete)
- ✅ Booking management (view, update, delete)
- ✅ Search and filtering
- ✅ Real-time status updates

### UI/UX
- ✅ Premium dark theme design
- ✅ Glassmorphism effects
- ✅ Responsive layout (mobile/tablet/desktop)
- ✅ Smooth animations
- ✅ Toast notifications

## 📂 Project Structure

```text
app/
├── page.tsx          # Premium Landing Page
├── signup/           # New User Registration
├── login/            # Secure Entry
├── dashboard/        # Customer Area
└── admin/            # Admin Control Center
├── components/
│   ├── layout/       # Global Header & Footer
│   ├── ui/           # Reusable UI System
│   └── admin/        # Admin Dashboard Modules
└── public/
    └── logo.png      # Integrated Brand Asset
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Admin (Protected)
- `GET /api/admin/users` - List all users
- `GET /api/admin/users/[id]` - Get user by ID
- `DELETE /api/admin/users/[id]` - Delete user
- `GET /api/admin/bookings` - List all bookings
- `PUT /api/admin/bookings/[id]` - Update booking
- `DELETE /api/admin/bookings/[id]` - Delete booking
- `GET /api/admin/stats` - Dashboard statistics

## 🔒 Security

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens in httpOnly cookies (XSS protection)
- Role-based route protection via middleware
- Input validation on all forms
- Secure environment variable handling

## 🎨 Design System

### Colors
- **Primary**: #F5A962 (Orange - brand color)
- **Background**: Dark gradient (#0a0a0f → #1a1a2e)
- **Text**: Off-white (#fcfcfd)

### Fonts
- **Display**: Outfit
- **Body**: Inter

## 🚀 Deployment

1. Update environment variables for production
2. Change admin password
3. Update MongoDB URI to production database
4. Build the application: `npm run build`
5. Deploy to Vercel, Netlify, or your hosting provider

## 📝 License

Private project for AArambh Media.

## 🤝 Support

For questions or issues, contact the development team.

---

**Built with ❤️ using Next.js 15, MongoDB, and JWT**
