# Konteks untuk Angel: kode web dan foto lapangan

Proyek: Merancang Ulang Alur Sewa Lapangan pada Situs Pemesanan Daring SARAGA ITB.
Mata kuliah KU5009 Digital Multimodal Composition, Kelompok 2. Dosen: Dr. Untari Gunta Pertiwi.
Tanggal dokumen: 16 November 2026 (diperbarui pukul 12.55 dengan jadwal hari ini).

Dokumen ini dibuat supaya kamu dan Aurel memegang konteks yang sama. Baca sampai bagian 6, lalu kerjakan bagian 4 dan 5 untuk bagianmu.

## 1. Gambaran proyek

Kami mendesain ulang alur sewa lapangan di situs SARAGA ITB menjadi halaman web interaktif. Alurnya: beranda Sewa Lapangan, pilih olahraga, pilih jadwal (tanggal, lapangan, jam), lalu tinjau pesanan sebelum checkout. Pembayaran sengaja tidak dibuat. Semua data adalah data contoh dan halaman ini adalah konsep mahasiswa, bukan situs resmi ITB atau SARAGA.

Masalah di situs asli (dari tangkapan layar kami):
- Harga baru terlihat setelah beberapa langkah.
- Kebijakan perubahan jadwal berada di bawah tombol Checkout.
- Arti ikon gembok dan jam tidak dijelaskan.
- Harga bervariasi antar lapangan, jam, dan hari tanpa pola yang jelas bagi pengguna.

Solusi di desain baru:
- Harga ditaruh langsung di dalam setiap slot jam.
- Aturan dan biaya perubahan jadwal dipindahkan ke langkah Tinjau, sebelum tombol lanjut.
- Status slot dibedakan dengan pola, ikon, dan teks, bukan hanya warna.
- Ada penanda langkah supaya pengguna tahu posisinya.

Penilaian tugas memakai tiga makna Visual Grammar (Kress dan van Leeuwen, 2006): Representational, Interactive, dan Compositional. Karena itu setiap keputusan tampilan sebaiknya punya alasan yang bisa dijelaskan dengan istilah tersebut (lihat bagian 7).

## 2. Pembagian tugas

| Orang | Tugas |
|---|---|
| Reva dan Jennifer | Desain hi-fi di Figma (sedang dikerjakan) |
| Aurel | Berkas `PilihJadwal.jsx` dan `data.js`, survei responden, laporan |
| Angel | Berkas `PilihOlahraga.jsx` dan `Tinjau.jsx`, folder `public/photos/`, dan foto lapangan |
| Aurel dan Angel | Menyesuaikan kode dengan hi-fi saat sudah jadi |

Supaya tidak bentrok di Git:
- Setiap orang bekerja di branch sendiri, lalu merge lewat pull request.
- Berkas milik orang lain jangan diubah tanpa kabar. Kalau perlu mengubah `App.jsx`, `Header.jsx`, `Stepper.jsx`, atau `index.css`, bilang dulu di grup.
- Kalau perlu data baru, minta Aurel menambahkannya di `data.js`.

## 3. Cakupan

- Alur yang lengkap hanya Basket/Voli (lapangan A sampai D).
- Sepak Bola, Tenis, dan Pickleball muncul sebagai kartu di layar 1. Tombolnya menampilkan pemberitahuan bahwa jadwalnya belum dimuat. Jumlah lapangan dan harganya ditulis "menyusul" karena belum kami ketahui.
- Lapangan A dan B khusus basket. Lapangan C dan D bisa basket atau voli, dan pilihannya dibuat di langkah Tinjau.

## 4. Menjalankan proyek dan struktur berkas

```bash
npm install
npm run dev        # biasanya http://localhost:5173
npm run build      # hasil di folder dist
npm run preview
```

Stack: React, Vite, Tailwind CSS v4. Font Plus Jakarta Sans dipasang lewat npm, jadi tidak butuh internet saat demo. Deploy ke Vercel (pengaturan bawaan) atau GitHub Pages (publikasikan isi `dist`, jalur aset sudah relatif).

| Berkas | Isi | Pemilik |
|---|---|---|
| `src/data.js` | Semua data contoh: olahraga, lapangan, jam, harga, jam terpesan, aturan | Aurel |
| `src/App.jsx` | Alur tiga langkah dan state pemesanan | Bersama |
| `src/screens/PilihOlahraga.jsx` | Layar 1 | Angel |
| `src/screens/PilihJadwal.jsx` | Layar 2 | Aurel |
| `src/screens/Tinjau.jsx` | Layar 3 | Angel |
| `src/components/` | Header, Stepper, Photo, Button, Dialog, Icons | Bersama |
| `src/index.css` | Palet warna dan gaya dasar | Bersama |
| `public/photos/` | Foto lapangan | Angel |

State pemesanan di `App.jsx`: `dateIdx` (hari ke berapa dari hari ini), `courtId`, `hour`, `duration` (1 sampai 3 jam), `usage` (Basket atau Voli untuk lapangan C dan D), dan `agreed` (aturan sudah dicentang).

## 5. Aturan data dan perilaku

### Jam operasional
Buka 06.00, tutup 21.00. Jam mulai terakhir adalah 20:00 (sampai 21:00), jadi ada 15 slot per lapangan per hari. Slot dikelompokkan:

| Kelompok | Rentang | Jam mulai |
|---|---|---|
| Pagi | 06.00 sampai 12.00 | 06, 07, 08, 09, 10, 11 |
| Siang | 12.00 sampai 16.00 | 12, 13, 14, 15 |
| Sore | 16.00 sampai 19.00 | 16, 17, 18 |
| Malam | 19.00 sampai 21.00 | 19, 20 |

### Harga (asumsi desain, bukan tarif resmi)
Di situs asli harga teramati Rp 40.000, Rp 50.000, atau Rp 75.000 dan bervariasi antar lapangan, jam, dan hari. Polanya belum ditemukan. Aturan dasar yang teramati: sekitar Rp 40.000 untuk 06.00 sampai 17.00 dan Rp 75.000 setelahnya sampai 21.00. Untuk prototype kami memakai aturan penyederhanaan berikut:

| Waktu | Hari kerja | Akhir pekan | Alasan asumsi |
|---|---|---|---|
| 06.00 sampai 08.00 | Rp 50.000 | Rp 50.000 | Masih butuh lampu |
| 08.00 sampai 10.00 | Rp 40.000 | Rp 50.000 | Pagi akhir pekan lebih ramai |
| 10.00 sampai 15.00 | Rp 40.000 | Rp 40.000 | Jam sepi |
| 15.00 sampai 17.00 | Rp 40.000 | Rp 50.000 | Sore akhir pekan mulai ramai |
| 17.00 sampai 21.00 | Rp 75.000 | Rp 75.000 | Lampu dan jam paling ramai |

Aturan ada di fungsi `priceAt` pada `data.js`. Tidak ada faktor per lapangan karena polanya belum dipahami. Footnote harga (`PRICE_NOTE`) harus tetap tampil di Layar 2 dan Layar 3. Jangan menulis angka ini sebagai tarif resmi di mana pun, termasuk di laporan dan presentasi.

### Status slot
| Status | Tampilan | Bisa diklik |
|---|---|---|
| Tersedia | Putih, jam dan harga | Ya |
| Dipilih | Biru #217cb7, teks putih, ikon centang, label "Dipilih", cincin hijau limau | Ya |
| Dipesan | Garis diagonal, ikon gembok, teks "Dipesan" | Tidak |
| Terlewat | Garis putus abu, ikon jam, teks "Terlewat" (hanya untuk hari ini) | Tidak |
| Dalam rentang durasi | Biru muda (jika durasi lebih dari 1 jam) | Tidak perlu |

Jam "sekarang" pada data contoh dikunci di `DEMO_NOW_HOUR` (15) supaya tampilan sama setiap demo. Ketersediaan per lapangan diatur di `BOOKED` dalam `data.js`.

### Durasi
1 sampai 3 jam, dibatasi oleh jam berurutan yang masih tersedia pada lapangan yang sama. Total = jumlah harga tiap jam.

### Lapangan C dan D di Layar 3
Kalau lapangan C atau D dipilih, Layar 3 menampilkan blok "Gunakan untuk" dengan dua pilihan: Basket atau Voli. Tombol "Lanjut ke Pembayaran" baru aktif kalau pilihan sudah dibuat dan aturan dicentang. Untuk lapangan A dan B blok ini tidak muncul dan baris Penggunaan otomatis "Basket". Pilihan direset setiap kali lapangan diganti.

### Layar 3
Tombol "Lanjut ke Pembayaran" membuka dialog "Alur berhenti di sini". Pembayaran tidak dibuat.

## 6. Tugasmu

### Foto lapangan
Foto adalah bagian terpenting untuk Interactive Meaning (modalitas tinggi) dan Representational Meaning, dan belum ada satu pun. Target hari ini, Senin 16 November, pukul 15.00 sampai 17.30 selagi masih terang, supaya bisa dipasang sebelum Progress Report 2 dikumpulkan malam ini. Kalau tidak sempat hari ini, tulis "menyusul" di laporan dan ambil besok. Datang pada jam buka (06.00 sampai 21.00) dan sebaiknya pastikan dulu ke Bagian Pelayanan.

Daftar foto yang dibutuhkan, dengan nama file persis seperti ini di `public/photos/`:

| File | Isi | Dipakai di | Rasio tampil |
|---|---|---|---|
| `hero.jpg` | Gambaran umum kompleks lapangan SARAGA | Hero beranda | 16:9 |
| `sepak-bola.jpg` | Lapangan sepak bola | Kartu olahraga | 4:3 |
| `basket-voli.jpg` | Gambaran lapangan basket dan voli | Kartu olahraga dan banner Layar 2 | 4:3 dan sekitar 21:8 |
| `tenis.jpg` | Lapangan tenis | Kartu olahraga | 4:3 |
| `pickleball.jpg` | Lapangan pickleball | Kartu olahraga | 4:3 |
| `basket-a.jpg` | Lapangan Basket A | Kartu lapangan | 4:3 |
| `basket-b.jpg` | Lapangan Basket B | Kartu lapangan dan ringkasan Layar 3 | 4:3 dan sekitar 21:8 |
| `basket-c.jpg` | Lapangan Basket/Voli C | Kartu lapangan | 4:3 |
| `basket-d.jpg` | Lapangan Basket/Voli D | Kartu lapangan | 4:3 |

Total 9 foto. Foto empat olahraga tetap dibutuhkan walau jadwal tiga olahraga lain belum dibuat, supaya beranda terlihat lengkap.

Panduan pengambilan:
- Orientasi lanskap, sejajar tinggi mata (sekitar 150 sampai 170 cm). Ini sesuai konsep eye level angle: pengguna merasa setara dan bisa membayangkan dirinya di lapangan.
- Jangan ada orang yang menatap kamera dan hindari wajah yang terlihat jelas. Lapangan kosong paling aman dan paling mudah dibaca.
- Foto realistis dengan warna natural, tanpa filter berlebihan. Ini yang membuat modalitasnya tinggi.
- Waktu pengambilan sebaiknya seragam (misalnya semua sore hari) supaya satu set foto terlihat konsisten.
- Ambil lebar, subjek di tengah, sisakan ruang sekitar 10 persen di tepi karena foto akan dipotong (crop) ke rasio berbeda.
- Ambil 3 sampai 4 varian per titik, lalu pilih yang terbaik.
- Resolusi sekitar 1600 px pada sisi terpanjang, format `.jpg`. Kompres sampai sekitar 300 KB per foto supaya web cepat dibuka.
- Pastikan Basket A, B, C, dan D bisa dibedakan satu sama lain (misalnya ada papan nama atau penanda lapangan).

Sambil di lokasi, catat hal berikut (tanya ke Bagian Pelayanan atau foto papan informasi). Semuanya masih "menyusul" di web:
1. Biaya perubahan jadwal (nominal) dan jam kerja Bagian Pelayanan.
2. Kontak Bagian Pelayanan (nomor atau tautan).
3. Arti istilah "Free Tiket" di halaman ringkasan situs asli.
4. Arti ikon gembok dan jam di jadwal situs asli (dugaan kami: gembok berarti sudah dipesan, jam berarti waktu terlewat).
5. Harga per jam sebenarnya (kalau ada papan harga, foto saja) dan apakah ada perbedaan harga antar lapangan.
6. Jumlah lapangan untuk sepak bola, tenis, dan pickleball.
7. Apakah tiap lapangan indoor atau outdoor.

### Kode
- `PilihOlahraga.jsx`: hero, empat kartu olahraga, bar aturan, dialog aturan lengkap. Sudah berfungsi dengan placeholder. Tugasmu: menyesuaikan dengan hi-fi dan memasang foto.
- `Tinjau.jsx`: ringkasan, blok Gunakan untuk (lapangan C dan D), aturan, centang, tombol aksi, dialog akhir. Sudah berfungsi. Tugasmu: menyesuaikan dengan hi-fi, mengisi aturan setelah datanya pasti (lewat `RULES` dan `CONTACT` di `data.js`, kabari Aurel), dan memeriksa tampilan di ponsel.
- Komponen `Photo` otomatis menampilkan placeholder "Foto ... menyusul" selama file belum ada. Setelah foto dipasang, cek tiap kartu tidak terpotong aneh.
- Aksesibilitas yang sudah ada dan harus dipertahankan: tombol asli (`button`), `aria-pressed` pada pilihan, `fieldset` pada pilihan penggunaan, fokus yang terlihat, dan teks alternatif pada foto.

## 7. Dasar desain (supaya perubahan tetap sesuai teori)

| Layar | Elemen | Makna | Alasan singkat |
|---|---|---|---|
| 1 | Penanda langkah | Representational (chain of action) | Pemesanan adalah rangkaian tindakan dan posisi pengguna terlihat |
| 1 | Empat kartu olahraga | Representational (conceptual classification) | Sewa lapangan terbagi menjadi empat olahraga yang setara |
| 1 | Foto dan tombol "Lihat jadwal" | Interactive (modalitas tinggi, eye level, aksi utama) | Foto realistis setinggi mata dan satu ajakan yang jelas per kartu |
| 1 | Bar aturan di bawah | Compositional (information value, Real) | Informasi konkret di bawah yang tidak bersaing dengan pilihan |
| 2 | Legenda dan pola slot | Representational (simbol) | Status tidak hanya dibedakan warna |
| 2 | Tanggal, lapangan, jam berurutan | Compositional (Given-New, Ideal-Real) | Pilihan umum di atas, pilihan spesifik di bawah |
| 2 | Harga di dalam slot | Compositional (information value, salience) | Harga ada di titik keputusan |
| 2 | Slot terpilih | Compositional (salience) | Kontras, ikon, dan label membuatnya paling menonjol |
| 2 | Jam dikelompokkan | Compositional (framing) | Pagi, Siang, Sore, Malam memudahkan pemindaian |
| 2 | Panel ringkasan | Compositional (Given-New, center-margin) | Total memakai angka terbesar |
| 3 | Ringkasan pemesanan | Representational (participants, chain of action) | Hasil dua langkah sebelumnya |
| 3 | Total harga | Compositional (salience) | Informasi penentu keputusan |
| 3 | Aturan sebelum tombol | Compositional (center-margin, Ideal-Real) | Kebijakan dipindah dari bawah tombol ke tengah, sebelum aksi |
| 3 | Dua tombol aksi | Interactive (aksi utama dan sekunder) | "Lanjut ke Pembayaran" mencolok, "Ubah jadwal" berupa tombol garis |
| 3 | Pilihan Gunakan untuk | Interactive (engagement) dan Compositional (framing) | Dua pilihan setara berdampingan dalam bingkai sendiri |

## 8. Palet dan aturan kontras

| Token | Warna | Pemakaian |
|---|---|---|
| paper | #fafafa | Latar halaman |
| ink | #12202c | Teks utama |
| muted | #536575 | Teks sekunder |
| line | #d3dce4 | Garis dan batas |
| brand | #217cb7 | Aksi utama dan slot dipilih |
| brand-dark | #185d8a | Hover tombol |
| brand-soft | #e5f1f8 | Latar penekanan lembut |
| lime | #bed817 | Penekanan (harga total, penanda hari ini, label Dipilih) |
| lime-soft | #f1f6c9 | Latar chip lembut |

Aturan penting:
- Teks di atas hijau limau selalu memakai warna gelap (ink). Putih di atas hijau limau kontrasnya sekitar 1,6 banding 1 dan gagal standar WCAG.
- Teks putih di atas biru #217cb7 kontrasnya sekitar 4,5 banding 1, masih lolos untuk teks normal.
- Hijau limau jangan dipakai sebagai warna teks atau ikon kecil di atas putih.
- Warna tidak boleh menjadi satu-satunya pembeda status. Selalu ada pola, ikon, atau teks.

## 9. Hal yang belum pasti

- Tarif resmi dan pola harga asli.
- Biaya perubahan jadwal, jam kerja, dan kontak Bagian Pelayanan.
- Arti Free Tiket dan arti ikon di situs asli.
- Jumlah lapangan dan harga untuk Sepak Bola, Tenis, dan Pickleball.
- Hi-fi final dari Reva dan Jennifer (tata letak dan token bisa berubah).

Bagian yang belum pasti ditulis "menyusul" di web. Jangan ditulis sebagai fakta sebelum terkonfirmasi.

## 10. Jadwal

Deadline Progress Report 2 adalah malam ini pukul 23.59. Batas kelompok pukul 21.00, dan 21.00 sampai 23.59 hanya cadangan.

### Hari ini, Senin 16 November

| Jam | Target | Siapa |
|---|---|---|
| 13.15 sampai 14.30 | Repo dibuat, kode di-push, deploy ke Vercel (tautan web yang bisa dibuka) | Angel |
| 13.15 sampai 17.00 | Hi-fi tiga layar versi desktop | Reva dan Jennifer |
| 15.00 sampai 17.30 | Foto lapangan (9 foto, lihat bagian 6) | Angel |
| 13.15 sampai 17.00 | Uji alur ke 3 sampai 5 orang dan kumpulkan bahan worksheet dari semua anggota | Aurel |
| 17.00 | Pengecekan bersama: hi-fi desktop ada, tautan web hidup, jawaban terkumpul | Semua |
| 17.00 sampai 19.00 | Isi worksheet, pasang foto kalau sudah ada, rapikan hi-fi | Semua |
| 19.00 sampai 20.00 | Periksa worksheet masing-masing (kontribusi dan konsistensi antar anggota) | Semua |
| 20.00 sampai 21.00 | Finalisasi dan kumpul. 21.00 batas keras | Semua |

Kalau pukul 17.00 hi-fi atau foto belum jadi, laporan tetap dikumpulkan dengan yang sudah ada, dan sisanya dicatat di rencana tindak lanjut.

### Setelah hari ini

| Tanggal | Target |
|---|---|
| 17 sampai 18 Nov | Foto yang tertunda, penyesuaian kode dengan hi-fi final |
| 19 Nov | Prototype bisa diklik dari layar 1 sampai 3 dengan foto (bahan Progress Report 3) |
| 20 sampai 24 Nov | Revisi, uji ke calon pengguna, deploy final |
| 25 Nov | Latihan presentasi |
| 26 Nov atau 3 Des | Presentasi UAS (tanggal mengikuti pembagian dosen) |

## 11. Daftar periksa sebelum merge

- Tampilan benar di lebar 1280 dan 390 piksel, tanpa gulir horizontal.
- Alur penuh bisa dijalankan: pilih Basket/Voli, pilih tanggal, lapangan, jam, tinjau, centang aturan, lanjut.
- Lapangan C atau D mewajibkan pilihan Basket atau Voli, lapangan A atau B tidak.
- Footnote "Data contoh" dan "asumsi harga" masih tampil.
- Tidak ada teks yang menyatakan hal tidak pasti sebagai fakta.
- `npm run build` lolos tanpa error.
