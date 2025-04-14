import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import { ThemeProvider } from './components/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Quiz App",
  description: "Test your knowledge with our interactive quiz!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-text`}
      >
        <ThemeProvider>
          {/* Modern App Bar */}
          <header className="sticky top-0 z-10 bg-surface border-b border-border backdrop-blur-sm bg-surface/80 supports-[backdrop-filter]:bg-surface/60">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <Link 
                  href="/" 
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <svg 
                    className="w-8 h-8 text-primary" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h1 className="text-xl font-medium text-text">Quiz App</h1>
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-surface rounded-lg shadow-sm ">
              {children}
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-auto py-6">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-subtext">
                © {new Date().getFullYear()} Quiz App. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
