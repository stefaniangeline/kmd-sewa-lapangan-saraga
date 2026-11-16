# Sewa Lapangan SARAGA (konsep desain ulang)

Prototype halaman web interaktif untuk tugas akhir KU5009 Digital Multimodal Composition, Kelompok 2.
Alur: pilih olahraga, pilih jadwal (tanggal, lapangan, jam), tinjau sebelum checkout. Pembayaran sengaja tidak dibuat.
Data contoh. Konsep desain mahasiswa, bukan situs resmi ITB atau SARAGA.

## Menjalankan

```bash
npm install
npm run dev        # buka alamat yang muncul, biasanya http://localhost:5173
npm run build      # hasil build ada di folder dist
npm run preview    # mencoba hasil build
```

Stack: React, Vite, Tailwind CSS v4. Font Plus Jakarta Sans dipasang lewat npm, jadi tidak butuh internet saat demo.

## Struktur

| Berkas | Isi |
|---|---|
| `src/data.js` | Semua data contoh: olahraga, lapangan, tarif, jam terpesan, aturan sewa. Ubah di sini, tampilan ikut berubah |
| `src/App.jsx` | Alur tiga langkah dan state pemesanan |
| `src/screens/PilihOlahraga.jsx` | Layar 1 |
| `src/screens/PilihJadwal.jsx` | Layar 2, termasuk slot jam dan panel ringkasan |
| `src/screens/Tinjau.jsx` | Layar 3 |
| `src/components/` | Header, Stepper, Photo, Button, Dialog, Icons |
| `src/index.css` | Palet warna dan gaya dasar (token `@theme`) |
| `public/photos/` | Tempat foto lapangan (lihat README.txt di dalamnya) |

## Cakupan dan aturan data

- Alur lengkap hanya untuk Basket/Voli (lapangan A sampai D). Lapangan A dan B khusus basket, lapangan C dan D bisa basket atau voli dan dipilih di langkah Tinjau.
- Jam operasional 06.00 sampai 21.00 (jam mulai terakhir 20:00, jadi 15 slot per hari).
- Harga memakai asumsi desain (Rp 40.000, Rp 50.000, Rp 75.000 menurut jam dan hari kerja atau akhir pekan), bukan tarif resmi. Tabel dan alasannya ada di `src/data.js` dan di `docs/KONTEKS.md`.

## Yang masih perlu diisi

1. Foto lapangan: taruh di `public/photos/` sesuai nama file. Placeholder otomatis hilang.
2. Konfirmasi ke SARAGA, lalu isi di `src/data.js`: nominal biaya perubahan jadwal, jam kerja Bagian Pelayanan, kontak, arti Free Tiket, jumlah lapangan tiap olahraga, dan tarif asli. Bagian yang belum pasti ditulis "menyusul" supaya tidak tampil sebagai fakta.
3. Jadwal Sepak Bola, Tenis, dan Pickleball: isi `courts` pada `SPORTS` di `src/data.js` dan tambahkan pola jam terpesan. Selama kosong, tombolnya menampilkan pemberitahuan.
4. Setelah hi-fi dari Figma jadi: sesuaikan token warna di `src/index.css` dan tata letak di komponen.

## Deploy

- Vercel: impor repo GitHub, pengaturan bawaan sudah benar (build `npm run build`, output `dist`).
- GitHub Pages: jalankan `npm run build`, lalu publikasikan isi `dist`. Aset memakai jalur relatif (`base: './'`), jadi aman di subfolder.
