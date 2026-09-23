# Anirban Ghosh — Portfolio Web Application

A responsive, production-ready portfolio website combining **creative video editing** with **modern web development**.

This project was built to showcase my work as a **Video Editor & Visual Storyteller**, while also demonstrating my skills as a **Computer Science & Engineering student** through frontend development, backend APIs, database integration, cloud services, security practices, Git/GitHub and deployment. 

---

## 🚀 Live Project

**Production:**  
https://your-live-url.vercel.app

---

## 👨‍💻 About the Project

This is my personal portfolio and full-stack web project.

The website allows visitors to:

- Explore my video-editing portfolio
- Filter projects by category
- Preview and watch videos
- Learn about my skills and experience
- Submit project inquiries
- Select project type and video format
- Submit website/editing feedback
- Connect through email, Instagram and LinkedIn

The project is designed with a **dark cinematic visual language**, responsive layouts and interactive UI while maintaining a technically structured backend.

---

# ✦ Main Portfolio Categories

- 🎬 Cinematic & Storytelling
- ⚽ Sports Editing
- 📢 Promotional Content
- 💍 Wedding Films

The portfolio currently contains **16 selected video projects**.

---

# 💻 Technical Highlights

This project demonstrates practical software-development concepts including:

### Frontend
- HTML5
- CSS3
- JavaScript
- Responsive Web Design
- Mobile-first interaction patterns
- Smooth scrolling
- Interactive navigation
- Dynamic filtering
- Video preview handling
- Fullscreen video modal

### Backend
- Vercel Serverless Functions
- Node.js
- REST-style API endpoints
- Form submission handling

### Database
- Supabase
- PostgreSQL
- Contact/inquiry storage
- Feedback storage
- Row Level Security (RLS)

### Cloud / Deployment
- Vercel
- GitHub
- Cloudinary
- Environment variables
- Production deployment

### Development Workflow
- Git
- GitHub
- VS Code
- Local development with Vercel CLI

---

# 🎨 UI / UX Features

The website was designed with a focus on both aesthetics and usability.

### Desktop
- Cinematic hero section
- Editorial typography
- Interactive portfolio cards
- Category filtering
- Smooth hover interactions
- Responsive content layout

### Mobile
- Responsive layout
- Slide-in navigation
- Close button
- Tap-outside menu closing
- Swipe-right navigation closing
- Compact portfolio previews
- Mobile-friendly inquiry forms

---

# 🎥 Video Portfolio

Portfolio videos are hosted through **Cloudinary** instead of being stored directly inside the Git repository.

This provides:

- Faster media delivery
- Reduced Git repository size
- Cloud-based video hosting
- Video transformation/optimization
- Streaming directly from Cloudinary

---

# 📩 Project Inquiry System

Visitors can submit project inquiries through the website.

### Inquiry fields

- Name
- Email / Phone
- Project Type
- Video Format
- Project Message

### Project Types

- Cinematic
- Sports
- Promo
- Wedding
- Others

### Video Formats

- Short-form Video
- Long-form Video

Submissions are stored in the Supabase database.

---

# 💬 Feedback System

The website also includes an optional feedback system.

Visitors can provide feedback about:

- Website design
- Editing skills
- Both

Feedback is stored in Supabase for future improvement.

---

# 🗄️ Database Structure

## `contact_messages`

```text
id
name
contact
subject
video_format
message
created_at
