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
    // Brand & Variasi Nama
    "FWB Plus",
    "FWB Plus EO",
    "FWB Plus Event Organizer",
    "FWB Plus Jogja",
    "FWB Plus Semarang",
    "fwbplus.com",

    // Umum: Event Organizer
    "event organizer",
    "jasa event organizer",
    "penyelenggara acara",
    "jasa EO",
    "EO terpercaya",
    "EO profesional",
    "event planner",
    "event management",
    "organizer acara",
    "jasa penyelenggara acara",
    "vendor event organizer",
    "crew event organizer",
    "jenis event organizer",
    "contoh event organizer",

    // Berdasarkan Lokasi: Jogja / Yogyakarta
    "event organizer jogja",
    "EO jogja",
    "penyelenggara acara jogja",
    "jasa EO jogja",
    "wedding organizer jogja",
    "event organizer yogyakarta",
    "EO yogyakarta",
    "penyelenggara acara yogyakarta",
    "EO terpercaya jogja",
    "jasa event organizer jogja",
    "EO di jogja",

    // Berdasarkan Lokasi: Semarang
    "event organizer semarang",
    "EO semarang",
    "penyelenggara acara semarang",
    "jasa EO semarang",
    "wedding organizer semarang",
    "EO terpercaya semarang",
    "event organizer terbaik semarang",

    // Berdasarkan Layanan
    "corporate gathering",
    "corporate event",
    "meeting perusahaan",
    "pameran",
    "exhibition",
    "wedding organizer",
    "konser musik",
    "festival musik",
    "launching produk",
    "grand opening",
    "seminar",
    "workshop",
    "family gathering",
    "ulang tahun",
    "anniversary",
    "event komunitas",
    "pernikahan outdoor",

    // Jasa Penunjang Event
    "sewa alat event",
    "sewa sound system",
    "sewa lighting",
    "sewa panggung",
    "sewa tenda acara",
    "sewa kursi dan meja event",
    "rental alat event jogja",
    "jasa dekorasi event",
    "jasa catering event",
    "jasa dokumentasi event",
    "MC event jogja",
    "host event semarang",
    "talent event organizer",
    "manpower event",
    "booth event custom",

    // Keyword Pencarian Populer Google
    "event organizer adalah",
    "event organizer artinya",
    "event organizer jakarta",
    "event organizer terbaik di indonesia",
    "event organizer logo",
    "jasa event organizer terbaik",
    "jasa event organizer surabaya",
    "jasa event organizer inaproc",
    "jasa event organizer katalog",
    "jasa dokumentasi acara",
    "jasa dekorasi acara",
    "jasa MC acara",
    "jasa foto acara",
    "jasa penyelenggara acara jakarta",

    // Kepercayaan dan Kualitas
    "event organizer terpercaya",
    "event organizer profesional",
    "event organizer murah",
    "EO terbaik jogja",
    "EO terbaik semarang",
    "jasa event berkualitas",
    "EO berpengalaman",
    "jasa event organizer full service",
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
