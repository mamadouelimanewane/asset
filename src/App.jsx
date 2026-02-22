import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DiambarAI from './components/DiambarAI';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Onboarding from './pages/Onboarding';
import Transfers from './pages/Transfers';
import PortfolioManagement from './pages/PortfolioManagement';
import Trading from './pages/Trading';
import ModelMarketplace from './pages/ModelMarketplace';
import HighYieldCash from './pages/HighYieldCash';
import Billing from './pages/Billing';
import Reporting from './pages/Reporting';
import TaxManagement from './pages/TaxManagement';
import Integrations from './pages/Integrations';
import Compliance from './pages/Compliance';
import SettingsPage from './pages/Settings';
import ClientPortal from './pages/ClientPortal';
import Messaging from './pages/Messaging';
import Notifications from './pages/Notifications';
import CustomDashboard from './pages/CustomDashboard';
import EstatePlanning from './pages/EstatePlanning';
import CRM from './pages/CRM';
import ClientScoring from './pages/ClientScoring';
import EducationHub from './pages/EducationHub';
import GoalsPlanning from './pages/GoalsPlanning';
import ProposalGenerator from './pages/ProposalGenerator';
import AlternativeInvestments from './pages/AlternativeInvestments';
import MultiCurrency from './pages/MultiCurrency';
import AuditTrail from './pages/AuditTrail';
import PerformanceSimulator from './pages/PerformanceSimulator';
import ReportCenter from './pages/ReportCenter';
import DocumentManager from './pages/DocumentManager';
import TaskManager from './pages/TaskManager';
import RiskAnalysis from './pages/RiskAnalysis';
import Philanthropy from './pages/Philanthropy';
import Benchmarking from './pages/Benchmarking';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import DiambarCopilot from './pages/DiambarCopilot';
import BehavioralAI from './pages/BehavioralAI';
import NeuralOptimizer from './pages/NeuralOptimizer';
import AfricanPayments from './pages/AfricanPayments';
import WealthPocket from './pages/WealthPocket';
import Web3Assets from './pages/Web3Assets';
import MarketIntelligence from './pages/MarketIntelligence';
import DigitalTwin from './pages/DigitalTwin';
import ClientExperience from './pages/ClientExperience';
import SecurityNext from './pages/SecurityNext';
import ESGCarbon from './pages/ESGCarbon';
import SystemAdministration from './pages/SystemAdministration';
import './index.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        )}
        <main className={`app-main ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <Header onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/portfolio" element={<PortfolioManagement />} />
            <Route path="/trading" element={<Trading />} />
            <Route path="/marketplace" element={<ModelMarketplace />} />
            <Route path="/cash" element={<HighYieldCash />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/tax" element={<TaxManagement />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/client-portal" element={<ClientPortal />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/custom-dashboard" element={<CustomDashboard />} />
            <Route path="/estate-planning" element={<EstatePlanning />} />
            <Route path="/crm" element={<CRM />} />
            <Route path="/scoring" element={<ClientScoring />} />
            <Route path="/education" element={<EducationHub />} />
            <Route path="/goals" element={<GoalsPlanning />} />
            <Route path="/proposals" element={<ProposalGenerator />} />
            <Route path="/alternatives" element={<AlternativeInvestments />} />
            <Route path="/multi-currency" element={<MultiCurrency />} />
            <Route path="/audit" element={<AuditTrail />} />
            <Route path="/simulator" element={<PerformanceSimulator />} />
            <Route path="/reports" element={<ReportCenter />} />
            <Route path="/documents" element={<DocumentManager />} />
            <Route path="/tasks" element={<TaskManager />} />
            <Route path="/risk" element={<RiskAnalysis />} />
            <Route path="/philanthropy" element={<Philanthropy />} />
            <Route path="/benchmarking" element={<Benchmarking />} />
            <Route path="/executive" element={<ExecutiveDashboard />} />
            <Route path="/copilot" element={<DiambarCopilot />} />
            <Route path="/behavioral" element={<BehavioralAI />} />
            <Route path="/optimizer" element={<NeuralOptimizer />} />
            <Route path="/african-payments" element={<AfricanPayments />} />
            <Route path="/wealth-pocket" element={<WealthPocket />} />
            <Route path="/web3" element={<Web3Assets />} />
            <Route path="/market-intelligence" element={<MarketIntelligence />} />
            <Route path="/digital-twin" element={<DigitalTwin />} />
            <Route path="/client-experience" element={<ClientExperience />} />
            <Route path="/security" element={<SecurityNext />} />
            <Route path="/esg" element={<ESGCarbon />} />
            <Route path="/admin" element={<SystemAdministration />} />
          </Routes>
        </main>
        <DiambarAI />
      </div>
    </BrowserRouter>
  );
}

export default App;
