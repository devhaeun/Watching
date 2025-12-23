import QueryProvider from "@/providers/QueryProvier";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          <div className="h-screen">
            <div className="w-full fixed z-11">
              <Navbar />
            </div>
            <div className="bg-black min-h-full flex flex-col relative px-10 pt-22 pb-5">
              {children}
            </div>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
