
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";



export const metadata = {
  title: "FWB+ | Event Organizer",
  description: "Event Organizer Profesional untuk Berbagai Acara",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}