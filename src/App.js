import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AnnualDashboardPage from "./pages/AnnualDashboardPage";
import InvoiceDashboardPage from "./pages/InvoiceDashboardPage";
import KlienPage from "./pages/KlienPage";
import BankAccountPage from "./pages/BankAccountPage";
import BudgetPage from "./pages/BudgetPage";
import DistributionPage from "./pages/DistributionPage";
import CalendarPage from "./pages/CalendarPage";
import SinkingFundsPage from "./pages/SinkingFundsPage";
import DebtCalculatorPage from "./pages/DebtCalculatorPage";
import NetWorthPage from "./pages/NetWorthPage";
import InvestmentPage from "./pages/InvestmentPage";
import ChallengePage from "./pages/ChallengePage";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<AnnualDashboardPage />} />
        <Route path="/invoices" element={<InvoiceDashboardPage />} />
        <Route path="/klien" element={<KlienPage />} />
        <Route path="/bank" element={<BankAccountPage />} />
        <Route path="/anggaran" element={<BudgetPage />} />
        <Route path="/distribusi" element={<DistributionPage />} />
        <Route path="/kalender" element={<CalendarPage />} />
        <Route path="/dana-cadangan" element={<SinkingFundsPage />} />
        <Route path="/kalkulator-utang" element={<DebtCalculatorPage />} />
        <Route path="/kekayaan-bersih" element={<NetWorthPage />} />
        <Route path="/investasi" element={<InvestmentPage />} />
        <Route path="/tantangan" element={<ChallengePage />} />
        <Route path="/produk-layanan" element={<ProductsPage />} />
        <Route path="/laporan" element={<ReportsPage />} />
        <Route path="/pengaturan" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
