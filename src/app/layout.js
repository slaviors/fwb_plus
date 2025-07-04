import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";

// SEO Metadata Global dengan penambahan keyword umum
export const metadata = {
  title: {
    default: "FWB Plus | Event Organizer & Penyelenggara Acara di Jogja, Semarang",
    template: "%s | FWB Plus Event Organizer",
  },
  description: "FWB Plus adalah penyelenggara acara (event organizer) profesional di Jogja dan Semarang. Sebagai EO terpercaya, kami menyediakan jasa untuk corporate gathering, pameran (exhibition), konser, dan penyewaan alat event.",
  keywords: [
    // Brand
    "fwb plus organizer",
    "fwb plus eo",
    "fwb plus event organizer",
    // Keyword Umum
    "event organizer",
    "penyelenggara acara",
    "jasa event organizer",
    "jasa eo",
    "eo & production",
    // Keyword Lokal Jogja
    "event organizer jogja",
    "eo jogja",
    "penyelenggara acara jogja",
    "eo terpercaya jogja",
    "jasa eo jogja",
    // Keyword Lokal Semarang
    "event organizer semarang",
    "eo semarang",
    "penyelenggara acara semarang",
    "eo profesional semarang",
  ],
  authors: [{ name: "FWB Plus Event Organizer" }],
  creator: "FWB Plus Event Organizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}