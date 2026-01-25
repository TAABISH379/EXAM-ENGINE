# 📝 Exam Engine AI

> **AI-Powered Exam Paper Generator** - Create customized exam papers instantly with the power of Google Gemini AI

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![Google AI](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)

---

## ✨ Features

- 🤖 **AI-Powered Generation** - Leverages Google Gemini AI to create intelligent, curriculum-aligned exam papers
- 🎓 **Multi-Board Support** - Supports CBSE, ICSE, and State Board syllabi
- 📚 **Comprehensive Coverage** - Generate papers for Class 6-12 across all major subjects
- ⚙️ **Customizable Configuration** - Choose subject, chapter, difficulty level, and question types
- 📄 **PDF Export** - Download generated papers as beautifully formatted PDFs
- 🔐 **Secure Authentication** - Google OAuth integration for seamless login
- 🎨 **Premium UI/UX** - Modern, responsive design with glassmorphism and smooth animations
- ⚡ **Fast & Reliable** - Built with Vite for lightning-fast performance

---

## 🚀 Tech Stack

### Frontend
- **React 19.2** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **TailwindCSS 4** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **html2pdf.js** - PDF generation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Google Gemini AI** - AI model for question generation
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Hosting and serverless functions
- **Vercel Analytics** - Performance monitoring

---

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Google AI API Key ([Get one here](https://aistudio.google.com/apikey))

### Clone the Repository
```bash
git clone https://github.com/TAABISH379/EXAM-ENGINE.git
cd EXAM-ENGINE
```

### Install Dependencies

**Root dependencies:**
```bash
npm install
```

**Server dependencies:**
```bash
cd server
npm install
```

**Client dependencies:**
```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file in the `server` directory:

```env
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

---

## 🏃‍♂️ Running Locally

### Development Mode

**Start the backend server:**
```bash
cd server
node index.js
```

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Production Build

**Build the client:**
```bash
npm run build
```

This will create an optimized production build in `client/dist`.

---

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set Environment Variables:**
   - Go to your Vercel project dashboard
   - Navigate to Settings → Environment Variables
   - Add `GOOGLE_AI_API_KEY` and `JWT_SECRET`

5. **Deploy to Production:**
```bash
vercel --prod
```

### Manual Deployment via Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Deploy!

---

## 📖 Usage

1. **Sign Up / Login** - Create an account or login with Google OAuth
2. **Enter Details** - Provide your board, class, and name
3. **Configure Paper** - Select subject, chapter, difficulty, and question types
4. **Generate** - Click "Generate Paper" and let AI do the magic ✨
5. **Download** - Export your paper as a PDF

---

## 🎨 Design Philosophy

**Exam Engine AI** follows a **Zen-Futurism** aesthetic:
- Clean, minimalist interface for stress-free studying
- Glassmorphism and subtle gradients for a premium feel
- Smooth micro-animations for delightful interactions
- Responsive design that works beautifully on all devices

---

## 🛠️ Project Structure

```
EXAM-ENGINE/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── services/         # Business logic (AI service)
│   ├── utils/            # Utility functions
│   ├── data/             # Static data (syllabus)
│   └── index.js          # Server entry point
├── api/                  # Vercel serverless functions
│   └── index.js
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json
```

---

## 🔑 Key Components

### Frontend
- **`Home.jsx`** - Main dashboard with paper generation
- **`ConfigForm.jsx`** - Paper configuration form
- **`PaperView.jsx`** - Generated paper display
- **`Navbar.jsx`** - Navigation bar
- **`AuthContext.jsx`** - Authentication state management

### Backend
- **`aiService.js`** - Google Gemini AI integration
- **`generateRoutes.js`** - Paper generation endpoints
- **`authRoutes.js`** - Authentication endpoints

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Taabish**
- GitHub: [@TAABISH379](https://github.com/TAABISH379)

---

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev) for powering the question generation
- [Vercel](https://vercel.com) for seamless deployment
- [React](https://react.dev) and [Vite](https://vitejs.dev) for the amazing developer experience

---

## 📧 Support

If you have any questions or need help, feel free to open an issue or reach out!

---

<div align="center">
  <p>Made with ❤️ for students everywhere</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
