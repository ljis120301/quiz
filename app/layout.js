import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';

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
          <Header />
          
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
