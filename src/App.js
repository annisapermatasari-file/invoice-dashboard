import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import InvoiceDashboardPage from "./pages/InvoiceDashboardPage";
import KlienPage from "./pages/KlienPage";
import PaymentsPage from "./pages/PaymentsPage";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/invoices" element={<InvoiceDashboardPage />} />
        <Route path="/klien" element={<KlienPage />} />
        <Route path="/pembayaran" element={<PaymentsPage />} />
        <Route path="/produk-layanan" element={<ProductsPage />} />
        <Route path="/laporan" element={<ReportsPage />} />
        <Route path="/pengaturan" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
