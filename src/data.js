export const DEMO_NOW_HOUR = 15

export const USER_PROFILE = {
  name: 'Stefani',
  initials: 'S',
}

export const FIRST_HOUR = 6
export const LAST_HOUR = 20
export const HOURS = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => FIRST_HOUR + i)

export const GROUPS = [
  { nama: 'Pagi', rentang: '06.00 sampai 12.00', jam: [6, 7, 8, 9, 10, 11] },
  { nama: 'Siang', rentang: '12.00 sampai 16.00', jam: [12, 13, 14, 15] },
  { nama: 'Sore', rentang: '16.00 sampai 19.00', jam: [16, 17, 18] },
  { nama: 'Malam', rentang: '19.00 sampai 21.00', jam: [19, 20] },
]

export const MAX_DURATION = 3

export const PRICE_LOW = 40000
export const PRICE_MID = 50000
export const PRICE_HIGH = 75000
export const PRICE_NOTE =
  'Harga adalah asumsi desain berdasarkan pengamatan (Rp 40.000, Rp 50.000, dan Rp 75.000), bukan tarif resmi. Di situs asli harga bervariasi menurut lapangan, jam, dan hari.'

export function priceAt(hour, weekend = false) {
  if (hour >= 17) return PRICE_HIGH
  if (hour < 8) return PRICE_MID
  if (weekend && (hour < 10 || hour >= 15)) return PRICE_MID
  return PRICE_LOW
}

export const isWeekendDate = (d) => d.getDay() === 0 || d.getDay() === 6

export const COURTS_BASKET_VOLI = [
  { id: 'A', nama: 'Basket A', foto: 'basket-voli.jpg', untuk: ['Basket'] },
  { id: 'B', nama: 'Basket B', foto: 'basket-voli.jpg', untuk: ['Basket'] },
  { id: 'C', nama: 'Basket/Voli C', foto: 'basket-voli.jpg', untuk: ['Basket', 'Voli'] },
  { id: 'D', nama: 'Basket/Voli D', foto: 'basket-voli.jpg', untuk: ['Basket', 'Voli'] },
]

export const SPORTS = [
  { id: 'sepak-bola', nama: 'Sepak Bola', foto: 'sepak-bola.jpg', ringkas: 'Jumlah lapangan menyusul', harga: null, courts: [] },
  { id: 'basket-voli', nama: 'Basket/Voli', foto: 'basket-voli.jpg', ringkas: '4 lapangan (A sampai D)', harga: PRICE_LOW, courts: COURTS_BASKET_VOLI },
  { id: 'tenis', nama: 'Tenis', foto: 'tenis.jpg', ringkas: 'Jumlah lapangan menyusul', harga: null, courts: [] },
  { id: 'pickleball', nama: 'Pickleball', foto: 'pickleball.jpg', ringkas: 'Jumlah lapangan menyusul', harga: null, courts: [] },
]

const BOOKED = [
  { A: [16, 19], B: [17, 18, 19], C: [15, 20, 6], D: [17, 18] },
  { A: [9, 10, 18], B: [12, 19, 20], C: [16, 17], D: [6, 7, 20] },
  { A: [11, 17, 18, 19], B: [10, 15, 16], C: [19, 20], D: [13, 14, 20] },
]

export const RULES = [
  'Perubahan jadwal tidak bisa dilakukan lewat web. Silakan datang langsung ke konter SARAGA.',
  'Penyewaan lapangan tidak digunakan untuk event olahraga. Untuk event, konfirmasi dulu ke Bagian Pelayanan.',
]
export const CONTACT = 'Kontak Bagian Pelayanan: 022-2511540'

export function slotStatus(dateIdx, courtId, hour) {
  if (dateIdx === 0 && hour < DEMO_NOW_HOUR) return 'lewat'
  if (BOOKED[dateIdx % BOOKED.length][courtId]?.includes(hour)) return 'dipesan'
  return 'tersedia'
}

export function maxDuration(dateIdx, courtId, hour) {
  let n = 0
  while (
    n < MAX_DURATION &&
    hour + n <= LAST_HOUR &&
    slotStatus(dateIdx, courtId, hour + n) === 'tersedia'
  ) n++
  return n
}

export function totalPrice(hour, duration, weekend = false) {
  let sum = 0
  for (let i = 0; i < duration; i++) sum += priceAt(hour + i, weekend)
  return sum
}

export function availableCount(dateIdx, courtId) {
  return HOURS.filter((h) => slotStatus(dateIdx, courtId, h) === 'tersedia').length
}

export function getDays(count = 7) {
  const today = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
    return {
      idx: i,
      date: d,
      weekend: isWeekendDate(d),
      hari: d.toLocaleDateString('id-ID', { weekday: 'short' }),
      tgl: d.getDate(),
      panjang: d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }),
    }
  })
}

export const rupiah = (n) => 'Rp ' + n.toLocaleString('id-ID')
export const jam = (h) => String(h).padStart(2, '0') + '.00'
