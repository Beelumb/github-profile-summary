# GitHub Profile Summary

A sleek, interactive web app that displays GitHub user profiles with detailed analytics and insights.

## 🌟 Features

- **User Profile Lookup**: Search for any GitHub user and view their profile information
- **Repository Analytics**:
  - View all public repositories
  - Language distribution pie chart
  - Stars per language breakdown
  - Largest repositories by size
  - Top repositories by stars
- **User README**: Displays the profile README from users who have one
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Data**: Fetches live data from the GitHub API

## 🚀 Live Demo

Visit the live site: [GitHub Profile Summary](https://beelumb.github.io/github-profile-summary/)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/beelumb/github-profile-summary.git
cd github-profile-summary
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser


## 📂 Project Structure

```
src/
├── components/       # Reusable React components
│   ├── Divider.tsx
│   ├── LanguagePie.tsx
│   ├── RepoCard.tsx
│   └── UserInfo.tsx
├── hooks/           # Custom React hooks
│   ├── useGitHubUser.ts
│   ├── useGitHubRepos.ts
│   ├── useGitHubContributions.ts
│   └── useUserReadMe.ts
├── pages/           # Page components
│   ├── Home.tsx
│   └── UserPage.tsx
├── services/        # API services
│   └── githubService.ts
├── lib/             # Utilities
│   └── utils.ts
├── types/           # TypeScript types
│   └── types.ts
└── App.tsx          # Main App component
```

## 🔑 Environment Variables

The app uses the public GitHub API. No authentication is required, but you can add:

- `VITE_GITHUB_TOKEN` - (Optional) GitHub personal access token for higher rate limits

## 🌐 API

This project uses the public GitHub REST API:
- User information: `/users/{username}`
- Repositories: `/users/{username}/repos`
- User README: `/repos/{username}/{username}/readme`

Rate limits: 60 requests/hour (unauthenticated), 5,000 requests/hour (authenticated)

## 🚀 Deployment

The project is deployed to GitHub Pages using GitHub Actions. On every push to `main`:
1. Dependencies are installed
2. Project is built
3. Built files are uploaded to GitHub Pages
4. Deployment is published

No additional configuration needed—just push to `main` and the CI/CD pipeline handles the rest!

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 👨‍💻 Author

**Beelumb**  
[GitHub Profile](https://github.com/beelumb)

## React Compiler

