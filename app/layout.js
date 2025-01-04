import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased bg-gray-50`}
      >
        {/* Modern App Bar */}
        <header className="sticky top-0 z-10 bg-white border-b backdrop-blur-sm bg-white/80 supports-[backdrop-filter]:bg-white/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link 
                href="/" 
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <svg 
                  className="w-8 h-8 text-blue-600" 
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
                <h1 className="text-xl font-medium text-gray-900">Quiz App</h1>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Quiz App. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
