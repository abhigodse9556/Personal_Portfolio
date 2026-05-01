import "./globals.css";

export const metadata = {
  title: "Abhishek Godse: Portfolio",
  description: "Software Engineer portfolio for Abhishek Godse.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
