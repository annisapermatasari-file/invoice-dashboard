export const MONTHS_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export const INVOICES = [
  {
    id: "INV-2025-0091",
    client: "Kartika Wijaya",
    email: "kartika.wijaya@gmail.com",
    issued: "3 Sep 2025",
    due: "17 Sep 2025",
    amount: 24500000,
    status: "lunas",
  },
  {
    id: "INV-2025-0090",
    client: "Bagus Setiawan",
    email: "bagus.setiawan@outlook.com",
    issued: "29 Agu 2025",
    due: "12 Sep 2025",
    amount: 18750000,
    status: "pending",
  },
  {
    id: "INV-2025-0089",
    client: "Dewi Anggraini",
    email: "dewi.anggraini@yahoo.com",
    issued: "22 Agu 2025",
    due: "5 Sep 2025",
    amount: 32000000,
    status: "jatuh_tempo",
  },
  {
    id: "INV-2025-0088",
    client: "Farhan Nugraha",
    email: "farhan.nugraha@gmail.com",
    issued: "18 Agu 2025",
    due: "1 Sep 2025",
    amount: 9800000,
    status: "lunas",
  },
  {
    id: "INV-2025-0087",
    client: "Intan Permatasari",
    email: "intan.permata@gmail.com",
    issued: "14 Agu 2025",
    due: "28 Agu 2025",
    amount: 15250000,
    status: "lunas",
  },
  {
    id: "INV-2025-0086",
    client: "Yusuf Maulana",
    email: "yusuf.maulana@company.co.id",
    issued: "9 Agu 2025",
    due: "23 Agu 2025",
    amount: 27300000,
    status: "pending",
  },
  {
    id: "INV-2025-0085",
    client: "Ratna Puspitasari",
    email: "ratna.puspita@gmail.com",
    issued: "2 Agu 2025",
    due: "16 Agu 2025",
    amount: 12400000,
    status: "jatuh_tempo",
  },
];

export const CLIENTS = [
  { name: "Kartika Wijaya", email: "kartika.wijaya@gmail.com", phone: "081234500011", program: "Bahasa Inggris Intensif", city: "Jakarta", leadSource: "Website", totalInvoiced: 24500000, status: "aktif" },
  { name: "Bagus Setiawan", email: "bagus.setiawan@outlook.com", phone: "081234500022", program: "Digital Marketing", city: "Bandung", leadSource: "Referrals", totalInvoiced: 18750000, status: "aktif" },
  { name: "Dewi Anggraini", email: "dewi.anggraini@yahoo.com", phone: "081234500033", program: "Desain Grafis", city: "Surabaya", leadSource: "Social Media", totalInvoiced: 32000000, status: "menunggak" },
  { name: "Farhan Nugraha", email: "farhan.nugraha@gmail.com", phone: "081234500044", program: "Public Speaking", city: "Jakarta", leadSource: "Referrals", totalInvoiced: 9800000, status: "aktif" },
  { name: "Intan Permatasari", email: "intan.permata@gmail.com", phone: "081234500055", program: "Akuntansi Dasar", city: "Yogyakarta", leadSource: "Website", totalInvoiced: 15250000, status: "aktif" },
  { name: "Yusuf Maulana", email: "yusuf.maulana@company.co.id", phone: "081234500066", program: "Digital Marketing", city: "Jakarta", leadSource: "Social Media", totalInvoiced: 27300000, status: "aktif" },
  { name: "Ratna Puspitasari", email: "ratna.puspita@gmail.com", phone: "081234500077", program: "Bahasa Mandarin", city: "Medan", leadSource: "Networking Events", totalInvoiced: 12400000, status: "menunggak" },
  { name: "Hendra Gunawan", email: "hendra.gunawan@gmail.com", phone: "081234500088", program: "Excel & Data Analytics", city: "Bandung", leadSource: "Website", totalInvoiced: 21000000, status: "aktif" },
];

// Received payments, linked to invoices. Some invoices are only part-paid.
export const PAYMENTS = [
  { client: "Kartika Wijaya", invoiceId: "INV-2025-0091", invoiceTotal: 24500000, date: "5 Sep 2025", amount: 24500000, method: "Transfer Bank", notes: "Lunas" },
  { client: "Bagus Setiawan", invoiceId: "INV-2025-0090", invoiceTotal: 18750000, date: "2 Sep 2025", amount: 10000000, method: "Transfer Bank", notes: "Pembayaran tahap 1" },
  { client: "Farhan Nugraha", invoiceId: "INV-2025-0088", invoiceTotal: 9800000, date: "20 Agu 2025", amount: 9800000, method: "QRIS", notes: "Lunas" },
  { client: "Intan Permatasari", invoiceId: "INV-2025-0087", invoiceTotal: 15250000, date: "16 Agu 2025", amount: 15250000, method: "Transfer Bank", notes: "Lunas" },
  { client: "Yusuf Maulana", invoiceId: "INV-2025-0086", invoiceTotal: 27300000, date: "11 Agu 2025", amount: 15000000, method: "Kartu Kredit", notes: "Pembayaran tahap 1" },
];

// Categorical palette validated for CVD-safe adjacent pairs (see dataviz skill).
export const STATUS_CHART_COLORS = {
  lunas: "#1baf7a",
  pending: "#eda100",
  jatuh_tempo: "#e34948",
};

export const MONTHLY_INVOICES = [
  { month: "Jan", jumlah: 5, nominal: 61000000 },
  { month: "Feb", jumlah: 6, nominal: 74500000 },
  { month: "Mar", jumlah: 7, nominal: 88000000 },
  { month: "Apr", jumlah: 6, nominal: 79500000 },
  { month: "Mei", jumlah: 8, nominal: 96000000 },
  { month: "Jun", jumlah: 7, nominal: 91000000 },
  { month: "Jul", jumlah: 8, nominal: 104000000 },
  { month: "Agu", jumlah: 9, nominal: 115750000 },
  { month: "Sep", jumlah: 7, nominal: 140000000 },
  { month: "Okt", jumlah: null, nominal: null },
  { month: "Nov", jumlah: null, nominal: null },
  { month: "Des", jumlah: null, nominal: null },
];

export const LEAD_SOURCES = [
  { name: "Website", value: 3, color: "#2a78d6" },
  { name: "Referrals", value: 2, color: "#eb6834" },
  { name: "Social Media", value: 2, color: "#1baf7a" },
  { name: "Networking Events", value: 1, color: "#eda100" },
];

export const PRODUCTS = [
  { name: "Bahasa Inggris Intensif", price: 2500000, duration: "3 bulan", students: 45 },
  { name: "Digital Marketing", price: 3200000, duration: "2 bulan", students: 38 },
  { name: "Desain Grafis", price: 2800000, duration: "3 bulan", students: 29 },
  { name: "Public Speaking", price: 1500000, duration: "1 bulan", students: 52 },
  { name: "Akuntansi Dasar", price: 2100000, duration: "2 bulan", students: 24 },
  { name: "Excel & Data Analytics", price: 2400000, duration: "6 minggu", students: 33 },
];
