export const CLIENTS = [
  { name: "Kartika Wijaya", email: "kartika.wijaya@gmail.com", phone: "081234500011", program: "Bahasa Inggris Intensif", totalInvoiced: 24500000, status: "aktif" },
  { name: "Bagus Setiawan", email: "bagus.setiawan@outlook.com", phone: "081234500022", program: "Digital Marketing", totalInvoiced: 18750000, status: "aktif" },
  { name: "Dewi Anggraini", email: "dewi.anggraini@yahoo.com", phone: "081234500033", program: "Desain Grafis", totalInvoiced: 32000000, status: "menunggak" },
  { name: "Farhan Nugraha", email: "farhan.nugraha@gmail.com", phone: "081234500044", program: "Public Speaking", totalInvoiced: 9800000, status: "aktif" },
  { name: "Intan Permatasari", email: "intan.permata@gmail.com", phone: "081234500055", program: "Akuntansi Dasar", totalInvoiced: 15250000, status: "aktif" },
  { name: "Yusuf Maulana", email: "yusuf.maulana@company.co.id", phone: "081234500066", program: "Digital Marketing", totalInvoiced: 27300000, status: "aktif" },
  { name: "Ratna Puspitasari", email: "ratna.puspita@gmail.com", phone: "081234500077", program: "Bahasa Mandarin", totalInvoiced: 12400000, status: "menunggak" },
  { name: "Hendra Gunawan", email: "hendra.gunawan@gmail.com", phone: "081234500088", program: "Excel & Data Analytics", totalInvoiced: 21000000, status: "aktif" },
];

export const BANK_ACCOUNTS = [
  { bank: "BCA", accountName: "Kursus Cendekia Nusantara", accountNumber: "2847-1029-33", type: "Giro Bisnis", balance: 85400000 },
  { bank: "Mandiri", accountName: "Kursus Cendekia Nusantara", accountNumber: "137-00-9284-561", type: "Tabungan Bisnis", balance: 46200000 },
  { bank: "BNI", accountName: "Kursus Cendekia Nusantara", accountNumber: "0192-8371-004", type: "Giro", balance: 18950000 },
];

export const BANK_TRANSACTIONS = [
  { date: "5 Sep 2025", desc: "Pembayaran Invoice INV-2025-0091", account: "BCA", amount: 24500000, type: "masuk" },
  { date: "3 Sep 2025", desc: "Sewa Ruang Kelas - September", account: "Mandiri", amount: -15000000, type: "keluar" },
  { date: "1 Sep 2025", desc: "Gaji Instruktur - September", account: "BCA", amount: -38500000, type: "keluar" },
  { date: "29 Agu 2025", desc: "Pembayaran Invoice INV-2025-0090", account: "BNI", amount: 18750000, type: "masuk" },
  { date: "25 Agu 2025", desc: "Marketing & Promosi Sosial Media", account: "BCA", amount: -6200000, type: "keluar" },
  { date: "22 Agu 2025", desc: "Pembayaran Invoice INV-2025-0089", account: "Mandiri", amount: 32000000, type: "masuk" },
];

// Categorical palette validated for CVD-safe adjacent pairs (see dataviz skill).
export const BUDGET_CATEGORIES = [
  { name: "Gaji Instruktur", planned: 40000000, actual: 38500000, color: "#2a78d6" },
  { name: "Sewa Ruang Kelas", planned: 15000000, actual: 15000000, color: "#eb6834" },
  { name: "Marketing & Promosi", planned: 10000000, actual: 12500000, color: "#1baf7a" },
  { name: "Operasional Kantor", planned: 8000000, actual: 7200000, color: "#eda100" },
  { name: "Perlengkapan Belajar", planned: 6000000, actual: 5400000, color: "#e87ba4" },
  { name: "Lain-lain", planned: 4000000, actual: 3100000, color: "#008300" },
];

export const MONTHS_ID = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

export const MONTHLY_TREND = [
  { month: "Jan", pemasukan: 98000000, pengeluaran: 74000000 },
  { month: "Feb", pemasukan: 102000000, pengeluaran: 76500000 },
  { month: "Mar", pemasukan: 111000000, pengeluaran: 79000000 },
  { month: "Apr", pemasukan: 108000000, pengeluaran: 80200000 },
  { month: "Mei", pemasukan: 121000000, pengeluaran: 83000000 },
  { month: "Jun", pemasukan: 117000000, pengeluaran: 81500000 },
  { month: "Jul", pemasukan: 125000000, pengeluaran: 86000000 },
  { month: "Agu", pemasukan: 132000000, pengeluaran: 88500000 },
  { month: "Sep", pemasukan: 140000000, pengeluaran: 90700000 },
  { month: "Okt", pemasukan: null, pengeluaran: null },
  { month: "Nov", pemasukan: null, pengeluaran: null },
  { month: "Des", pemasukan: null, pengeluaran: null },
];

export const SAVINGS_GOALS = [
  { name: "Renovasi Ruang Kelas", target: 50000000, saved: 32000000, deadline: "Des 2026" },
  { name: "Dana Darurat Operasional", target: 100000000, saved: 76000000, deadline: "Jun 2027" },
  { name: "Proyektor & Perangkat Baru", target: 15000000, saved: 15000000, deadline: "Selesai" },
  { name: "Pelatihan Instruktur", target: 20000000, saved: 8000000, deadline: "Mar 2026" },
];

export const DEBTS = [
  { name: "Pinjaman Modal Bank Mandiri", balance: 45000000, rate: 9.5, minPayment: 2500000 },
  { name: "Cicilan Peralatan Multimedia", balance: 12000000, rate: 0, minPayment: 1000000 },
  { name: "Kartu Kredit Bisnis BCA", balance: 8500000, rate: 24, minPayment: 850000 },
];

export const NET_WORTH_HISTORY = [
  { month: "Apr", aset: 410000000, liabilitas: 95000000 },
  { month: "Mei", aset: 425000000, liabilitas: 90000000 },
  { month: "Jun", aset: 438000000, liabilitas: 86000000 },
  { month: "Jul", aset: 452000000, liabilitas: 81000000 },
  { month: "Agu", aset: 468000000, liabilitas: 74000000 },
  { month: "Sep", aset: 486000000, liabilitas: 65500000 },
];

export const ASSETS = [
  { name: "Kas & Setara Kas", value: 150550000, color: "#2a78d6" },
  { name: "Piutang Invoice", value: 122400000, color: "#eb6834" },
  { name: "Peralatan & Perlengkapan", value: 95000000, color: "#1baf7a" },
  { name: "Investasi", value: 90000000, color: "#eda100" },
  { name: "Properti Sewa Ruang", value: 28050000, color: "#e87ba4" },
];

export const LIABILITIES = [
  { name: "Pinjaman Modal Bank", value: 45000000, color: "#2a78d6" },
  { name: "Cicilan Peralatan", value: 12000000, color: "#eb6834" },
  { name: "Kartu Kredit Bisnis", value: 8500000, color: "#1baf7a" },
];

export const INVESTMENTS = [
  { name: "Reksadana Pasar Uang", type: "Reksadana", amount: 25000000, returnPct: 5.2, color: "#2a78d6" },
  { name: "Deposito Berjangka 12 Bulan", type: "Deposito", amount: 50000000, returnPct: 4.5, color: "#eb6834" },
  { name: "Obligasi Ritel Negara", type: "Obligasi", amount: 15000000, returnPct: 6.1, color: "#1baf7a" },
];

export const PRODUCTS = [
  { name: "Bahasa Inggris Intensif", price: 2500000, duration: "3 bulan", students: 45 },
  { name: "Digital Marketing", price: 3200000, duration: "2 bulan", students: 38 },
  { name: "Desain Grafis", price: 2800000, duration: "3 bulan", students: 29 },
  { name: "Public Speaking", price: 1500000, duration: "1 bulan", students: 52 },
  { name: "Akuntansi Dasar", price: 2100000, duration: "2 bulan", students: 24 },
  { name: "Excel & Data Analytics", price: 2400000, duration: "6 minggu", students: 33 },
];

export const CALENDAR_EVENTS = {
  3: [{ label: "Invoice jatuh tempo — Ratna P.", type: "warning" }],
  5: [{ label: "Pembayaran diterima — Kartika W.", type: "success" }],
  8: [{ label: "Sewa ruang kelas jatuh tempo", type: "warning" }],
  12: [{ label: "Invoice jatuh tempo — Bagus S.", type: "warning" }],
  17: [{ label: "Invoice jatuh tempo — Kartika W.", type: "warning" }],
  20: [{ label: "Cicilan peralatan jatuh tempo", type: "warning" }],
  25: [{ label: "Gajian instruktur", type: "info" }],
};
