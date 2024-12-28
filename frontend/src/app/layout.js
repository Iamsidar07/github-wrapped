import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Github Wrapped",
  description: "My version of github_wrapped",
  og: {
    title: "Github Wrapped",
    description: "My version of github_wrapped",
    image: "/og.png",
    type: "website",
    url: "https://github-wrapped-ten.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Github Wrapped",
    description: "My version of github_wrapped",
    image: "/og.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <main className="flex relative min-h-screen flex-col items-center justify-center p-4">
          <Navbar />
          <div className="absolute inset-0 -z-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_0px),linear-gradient(to_bottom,#80808012_1px,transparent_0px)] bg-[size:50px_50px]"></div>
          {children}
        </main>
      </body>
    </html>
  );
}
