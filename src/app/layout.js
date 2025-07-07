import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { ConditionalNavbar } from "@/components/ConditionalNavbar";

// SEO Metadata Global dengan penambahan keyword umum
export const metadata = {
  title: {
    default:
      "FWB Plus | Event Organizer & Penyelenggara Acara di Jogja, Semarang",
    template: "%s | FWB Plus Event Organizer",
  },
  description:
    "FWB Plus adalah penyelenggara acara (event organizer) profesional di Jogja dan Semarang. Sebagai EO terpercaya, kami menyediakan jasa untuk corporate gathering, pameran (exhibition), konser, dan penyewaan alat event.",
  keywords: [
    // Brand Keywords
    "fwb plus organizer",
    "fwb plus eo",
    "fwb plus event organizer",

    // Layanan Spesifik
    "jasa event organizer",
    "penyelenggara acara",
    "jasa penyelenggara acara",
    "jasa acara",
    "event organizing",
    "eo & production",
    "vendor event organizer",
    "crew event organizer",
    "contoh event organizer",

    // Keywords Populer
    "event organizer adalah",
    "jenis jenis event organizer",
    "event organizer terbesar di indonesia",
    "event organizer terpercaya",
    "event organizer profesional",
    "tugas event organizer",

    // Keyword Lokal - Jogja
    "event organizer jogja",
    "eo jogja",
    "penyelenggara acara jogja",
    "jasa event organizer jogja",
    "event organizer di jogja",
    "jasa eo jogja",

    // Keyword Lokal - Yogyakarta (alternatif)
    "event organizer yogyakarta",
    "penyelenggara acara yogyakarta",
    "eo yogyakarta",

    // Keyword Lokal - Semarang
    "event organizer semarang",
    "eo semarang",
    "penyelenggara acara semarang",
    "jasa event organizer semarang",
    "jasa eo semarang",
    "eo profesional semarang",

    // Kota Besar (opsional perluasan jangkauan)
    "event organizer jakarta",
    "jasa event organizer jakarta",
    "jasa event organizer surabaya",
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
