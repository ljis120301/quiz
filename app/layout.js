import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './components/ThemeProvider';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Net Quiz",
  description: "Network focused quiz web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-text min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Header />
          
          {/* Main Content */}
          <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
            <div className="bg-surface rounded-lg shadow-sm">
              {children}
            </div>
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
