# 🎬 Netflix Clone - Full Stack Web Application

![Netflix Clone](https://img.shields.io/badge/NetFlix--Clone-red?style=for-the-badge&logo=netflix)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb)
![TMDB API](https://img.shields.io/badge/TMDB--API-blue?style=flat-square)

A comprehensive full-stack Netflix clone built with modern web technologies, featuring user authentication, movie/TV show browsing, and a responsive Netflix-like streaming interface.

## 🚀 Features

### 🎯 Core Functionality
- **🎪 Netflix-style UI** with dark theme and responsive design
- **🔐 JWT Authentication** - Secure registration, login, and logout
- **🎥 Content Browsing** - Trending, popular, and top-rated movies & TV shows
- **👤 User Profiles** - Account management and preferences
- **🔍 Content Search** - Movie and TV show discovery
- **💖 Watchlist** - Add/remove favorites and personal lists

### 🛠️ Technical Features
- **Next.js 15** with App Router and server-side rendering
- **TypeScript** for type-safe development
- **MongoDB + Mongoose** for robust data management
- **JWT Authentication** with secure HTTP-only cookies
- **TMDB API Integration** with intelligent fallbacks
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Image Optimization** with Next.js Image component

### 🎨 UI/UX Features
- **Hero Banner** with featured content display
- **Horizontal Scrolling** content rows with hover effects
- **Smooth Animations** and professional transitions
- **Movie/TV Cards** with hover states and metadata
- **Navigation Header** with scroll-based visual changes

## 🏗️ Project Structure

```
netflix-clone/
├── 📁 src/
│   ├── 🖥️  app/                    # Next.js App Router
│   │   ├── 📄 layout.tsx           # Root layout with Header
│   │   ├── 🏠 page.tsx             # Homepage with hero & content
│   │   └── 🌐 api/                 # API routes
│   │       ├── 🔐 auth/            # Authentication endpoints
│   │       └── 🎬 movies/          # Content endpoints
│   ├── 🧩 components/              # React components
│   │   ├── 🎟️  Header.tsx          # Navigation component
│   │   └── 🎭 ContentRow.tsx       # Content row component
│   └── 📚 lib/                     # Business logic & utilities
│       ├── 🗃️  models/             # Database schemas
│       ├── 🔑 jwt.ts               # JWT utilities
│       ├── 🛡️  middleware.ts       # Auth middleware
│       ├── 🍃 mongodb.ts           # Database connection
│       └── 🎪 tmdb.ts              # TMDB API wrapper
├── 🔧 next.config.ts                # Next.js configuration
├── 🌐 .env.local                   # Environment variables
└── 📦 package.json                 # Dependencies & scripts
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **MongoDB** Community Server ([Download](https://docs.mongodb.com/manual/installation/))
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/netflix-clone.git
   cd netflix-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with:
   ```env
   MONGO_URI=mongodb://localhost:27017/netflix-clone
   TMDB_API_KEY=your_tmdb_api_key_here
   JWT_SECRET=your_jwt_secret_here
   NEXTAUTH_SECRET=your_nextauth_secret_here
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Get TMDB API Key**
   - Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
   - Create a free account and generate an API key
   - Update `TMDB_API_KEY` in your `.env.local`

5. **Start MongoDB**
   ```bash
   # On macOS with Homebrew
   brew services start mongodb/brew/mongodb-community

   # On Windows/Linux
   # Follow MongoDB installation instructions
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Enjoy your Netflix clone! 🎬

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | User registration | ❌ |
| POST | `/api/auth/login` | User login | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |
| POST | `/api/auth/logout` | User logout | ❌ |

### Content Endpoints

| Method | Endpoint | Description | Mock Fallback |
|--------|----------|-------------|---------------|
| GET | `/api/movies/trending` | Get trending content | ✅ |
| GET | `/api/movies/popular` | Get popular movies | ✅ |
| GET | `/api/movies/toprated?type=tv` | Get top-rated TV shows | ✅ |

### Example API Responses

```json
// GET /api/movies/trending
{
  "results": [
    {
      "id": 9,
      "title": "Dune: Part Two",
      "overview": "Paul Atreides unites...",
      "poster_path": "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      "backdrop_path": "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      "media_type": "movie"
    }
  ],
  "total_pages": 1,
  "page": 1,
  "success": true,
  "mock": true
}
```

## 🛠️ Tech Stack & Dependencies

### Core Technologies
- **Frontend:** Next.js 15, React 18, TypeScript
- **Styling:** Tailwind CSS, Heroicons, Custom CSS
- **Backend:** Next.js API Routes, Node.js
- **Database:** MongoDB with Mongoose ODM

### Key Dependencies
- **Authentication:** `jsonwebtoken`, `bcryptjs`
- **API Integration:** `axios` for TMDB communication
- **Icons:** `@heroicons/react`, `react-icons`
- **Forms:** Custom form handling
- **Images:** Next.js optimized image component

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Database
npm run db:start     # Start MongoDB (if using local)
npm run db:seed      # Seed database with sample data
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically!

### Other Platforms
- **Netlify:** Connect repo and configure build settings
- **Railway:** Add MongoDB database and environment variables
- **Heroku:** Use buildpacks for Next.js deployment

### Environment Setup for Production
```env
MONGO_URI=mongodb+srv://your_mongodb_connection_string
TMDB_API_KEY=your_production_tmdb_key
JWT_SECRET=super_secure_jwt_secret
NEXTAUTH_SECRET=super_secure_nextauth_secret
NEXTAUTH_URL=https://your-deployed-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **The Movie Database (TMDB)** for providing movie data APIs
- **Netflix** for inspiring the beautiful UI/UX design
- **Vercel** for the amazing Next.js platform
- **Community** for open-source inspiration

## 📞 Support

If you loved this project or need help:

- ⭐ Star this repo on GitHub
- 🐛 Create issues for bugs/feature requests
- 💬 Check the [Discussions](https://github.com/yourusername/netflix-clone/discussions) for Q&A

---

**Made with ❤️ by [Your Name]**

*Experience the magic of Netflix at home! 🍿*
