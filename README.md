This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


``

# Project Configuration Guide

## Environment Configuration

This project uses `next.config.js` to store the API URL and API KEY during development. However, for production deployment, these values must be moved to the environment variables.

### Development
In the development environment, the API URL and API KEY are stored within `next.config.js`:
```javascript
module.exports = {
  env: {
    API_URL: "https://dev.example.com/api",
    API_KEY: "your-development-api-key",
  },
};
```

### Production
For production, ensure that these values are placed in a `.env` file or set as system environment variables:
```env
NEXT_PUBLIC_API_URL=https://prod.example.com/api
NEXT_PUBLIC_API_KEY=your-production-api-key
```

Then, access them in your Next.js application using:
```javascript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
```

### Navigation
The application supports navigation between pages using swipe gestures for a smoother user experience.

### Important Notes
- Never commit API keys or sensitive information to your repository.
- Use `.gitignore` to exclude `.env` files from version control.
- Ensure that your hosting provider supports environment variables and correctly configures them before deploying.

For further details, check the Next.js documentation on [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables).

`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
