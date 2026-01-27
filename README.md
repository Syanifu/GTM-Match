# GTM Match

A modern community marketplace where go-to-market professionals discover and solve real GTM challenges.

## Features

- **Problem Discovery**: Browse and search GTM problems with detailed metrics and context
- **Battle-Tested Solutions**: Get proven solutions from practitioners with implementation details
- **Community-Driven**: Connect with GTM professionals and build reputation
- **Tool Directory**: Explore tools used by successful GTM teams
- **Benchmarking**: Compare your metrics against industry standards
- **Leaderboard**: Recognize top contributors and rising stars

## Tech Stack

- **Framework**: Next.js 16.1.4 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.19
- **UI Components**: shadcn/ui (Radix UI)
- **Forms**: React Hook Form + Zod validation
- **Rich Text**: Tiptap editor
- **Charts**: Recharts
- **State**: Zustand with persist
- **Icons**: Lucide React
- **Dates**: date-fns
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gtm-match
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Project Structure

```
gtm-match/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── auth/              # Auth pages (signin, signup)
│   │   ├── problems/          # Problem pages
│   │   ├── profile/           # Profile pages
│   │   ├── tools/             # Tools pages
│   │   ├── leaderboard/       # Leaderboard page
│   │   ├── benchmarking/      # Benchmarking dashboard
│   │   └── ...                # Other pages
│   ├── components/
│   │   ├── layout/            # Navbar, Footer, Search, Notifications
│   │   ├── shared/            # Reusable components
│   │   ├── problems/          # Problem-specific components
│   │   ├── solutions/         # Solution-specific components
│   │   ├── comments/          # Comment components
│   │   ├── profile/           # Profile components
│   │   ├── tools/             # Tool components
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── mock-data/         # Mock data for development
│   │   ├── schemas/           # Zod validation schemas
│   │   └── utils.ts           # Utility functions
│   ├── stores/                # Zustand state stores
│   ├── types/                 # TypeScript type definitions
│   └── app/globals.css        # Global styles
├── public/                     # Static assets
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── components.json            # shadcn/ui configuration
└── tsconfig.json              # TypeScript configuration
```

## Key Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero and trending problems |
| `/problems` | Browse all problems with filters |
| `/problems/[id]` | Problem detail with solutions and comments |
| `/problems/new` | Post a new problem (5-step form) |
| `/solutions/[problemId]/new` | Submit a solution |
| `/profile/[username]` | User profile with activity |
| `/profile/edit` | Edit profile settings |
| `/tools` | Tool directory with search |
| `/tools/[slug]` | Tool detail page |
| `/leaderboard` | Community leaderboard |
| `/benchmarking` | Metrics benchmarking dashboard |
| `/auth/signin` | Sign in page |
| `/auth/signup` | Sign up page |

## Features in Detail

### Global Search (⌘K)
Press `Cmd+K` (or `Ctrl+K` on Windows) to open the global search modal. Search across:
- Problems
- Solutions
- Users
- Tools

### Notifications
Click the bell icon to view notifications including:
- New comments on your problems
- Upvotes on your solutions
- Accepted solutions
- Badge achievements

### Rich Text Editor
Powered by Tiptap with support for:
- Bold, italic, code formatting
- Lists (ordered and unordered)
- Blockquotes
- Links
- Headings

### Mobile Navigation
Hamburger menu on mobile devices with full navigation and user menu integration.

### Form Validation
All forms use Zod schemas for validation:
- Auth forms
- Problem submission (5 steps)
- Solution submission
- Profile editing

### Responsive Design
Mobile-first approach with breakpoints:
- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1280px+

## Development

### Mock Data
The application uses mock data for development. Real data will be fetched from a backend API in production.

Mock data files:
- `src/lib/mock-data/problems.ts`
- `src/lib/mock-data/solutions.ts`
- `src/lib/mock-data/users.ts`
- `src/lib/mock-data/tools.ts`

### State Management
Zustand stores with localStorage persistence:
- **Auth Store**: User authentication state
- **Notification Store**: Notifications and unread count
- **Search Store**: Search modal state and recent searches

### Adding New Components
shadcn/ui components can be added with:
```bash
npx shadcn@latest add <component-name>
```

### Styling
Use Tailwind CSS utility classes. CSS variables are defined in `globals.css` for theming.

Custom animations available:
- `.animate-fade-in`
- `.animate-slide-up`
- `.animate-pulse-scale`
- `.animate-stagger`
- `.hover-scale`
- `.hover-shadow`

## Accessibility

- Skip navigation link (keyboard users)
- ARIA labels on interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Focus management
- Color contrast compliance (WCAG AA)

## Performance

- Optimized package imports
- Image optimization with Next.js Image
- Code splitting by route
- Compressed assets
- React Strict Mode
- Turbopack for fast refresh

## Testing

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for comprehensive testing guidelines.

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Other Platforms
Build the application and deploy the `.next` folder:
```bash
npm run build
```

## Environment Variables

Create a `.env.local` file for local development:
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Auth (example with NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# File Upload
NEXT_PUBLIC_UPLOAD_URL=your-upload-service

# Analytics
NEXT_PUBLIC_GA_ID=your-ga-id
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and feature requests, please open an issue on GitHub.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tiptap](https://tiptap.dev/)
- [Recharts](https://recharts.org/)

---

Built with ❤️ for the GTM community
