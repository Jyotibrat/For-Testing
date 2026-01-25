# College Question Paper Hub

A modern, responsive web application for storing and browsing previous year college question papers.

## 🚀 Features

- **Browse & Search**: Find papers by branch, semester, year, or keyword search
- **PDF Viewer**: View papers directly in the browser
- **Light/Dark Mode**: Toggle between themes
- **Admin Panel**: Upload and manage question papers
- **Analytics Dashboard**: Track downloads, views, and popular papers
- **Fast Search**: Autocomplete suggestions for quick access
- **Responsive Design**: Works on mobile, tablet, and desktop

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Context for state management

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- Redis for caching
- Cloudinary for PDF storage
- JWT authentication
- Prometheus metrics

### DevOps
- Nginx reverse proxy
- GitHub Actions CI/CD
- Prometheus + Grafana monitoring

## 📦 Installation

### Prerequisites
- Node.js 20+
- MongoDB (local or Atlas)
- Redis (optional, for caching)
- Cloudinary account

### Backend Setup

```bash
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Seed admin user
npm run seed

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install

# Start development server
npm run dev
```

## 🔑 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/question-paper-hub
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Manual Deployment

1. Build frontend: `cd frontend && npm run build`
2. Build backend: Ready for production
3. Set up Nginx using `nginx/nginx.conf`
4. Configure SSL certificates
5. Start with process manager (PM2)

## 📊 Monitoring

Access Prometheus metrics at `/metrics` endpoint.

Import `monitoring/grafana-dashboard.json` into Grafana for the pre-built dashboard.

## 📁 Project Structure

```
question-paper-hub/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── context/         # Context providers
│   │   └── lib/             # API client
│   └── public/
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth, cache, etc
│   │   └── config/          # Configuration
│   └── server.js
│
├── nginx/                    # Nginx configuration
├── monitoring/               # Prometheus & Grafana
└── .github/workflows/        # CI/CD
```

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS protection
- Helmet security headers

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/papers` | Get papers (with filters) |
| GET | `/api/papers/:id` | Get single paper |
| POST | `/api/papers` | Upload paper (admin) |
| GET | `/api/search` | Search papers |
| GET | `/api/admin/stats` | Dashboard stats |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for educational purposes.
