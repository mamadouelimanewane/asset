import { Search, Bell, Settings, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles = {
    '/': 'Tableau de bord',
    '/clients': 'Clients',
    '/onboarding': 'Intégration clients',
    '/transfers': 'Transferts & ACATs',
    '/portfolio': 'Gestion de portefeuille',
    '/trading': 'Trading',
    '/marketplace': 'Place de marché',
    '/cash': 'Cash haut rendement',
    '/billing': 'Facturation',
    '/reporting': 'Rapports',
    '/tax': 'Gestion fiscale',
    '/integrations': 'Intégrations',
    '/compliance': 'Conformité',
    '/settings': 'Paramètres',
    '/client-portal': 'Portail client',
    '/messaging': 'Messagerie sécurisée',
    '/notifications': 'Centre de notifications',
    '/custom-dashboard': 'Dashboard personnalisé',
    '/estate-planning': 'Planification successorale',
    '/crm': 'CRM — Pipeline commercial',
    '/scoring': 'Scoring & segmentation',
    '/education': 'Centre éducatif',
    '/goals': 'Objectifs de vie',
    '/proposals': 'Générateur de propositions',
    '/alternatives': 'Investissements alternatifs',
    '/multi-currency': 'Multi-devises & change',
    '/audit': 'Audit trail & journalisation',
    '/simulator': 'Simulateur de performance',
    '/reports': 'Centre de rapports',
    '/documents': 'Gestion documentaire',
    '/tasks': 'Gestion des tâches',
    '/risk': 'Analyse de risque avancée',
    '/philanthropy': 'Philanthropie & impact',
    '/benchmarking': 'Benchmark & comparaisons',
    '/executive': 'Tableau de bord exécutif',
    '/copilot': 'Diambar Copilot — IA Patrimoniale',
    '/behavioral': 'Hyper-Personnalisation IA',
    '/optimizer': 'Neural Portfolio Optimizer',
    '/african-payments': '🌍 Paiements Africains Natifs',
    '/wealth-pocket': '📱 Wealth Pocket',
    '/web3': '⛓️ Web3 & Actifs Tokenisés',
    '/market-intelligence': '📡 Intelligence Marché',
    '/digital-twin': '🧠 Digital Twin',
    '/client-experience': '✨ Expérience Client',
    '/security': '🔐 Sécurité Next-Gen',
    '/esg': '🌿 ESG & Impact Africain',
};

export default function Header({ onMobileMenuToggle }) {
    const location = useLocation();
    const title = pageTitles[location.pathname] || 'Koppar-Diambar';

    return (
        <header className="app-header">
            <div className="header-left">
                <button
                    className="header-btn mobile-toggle"
                    onClick={onMobileMenuToggle}
                    id="mobile-menu-btn"
                >
                    <Menu size={18} />
                </button>
                <div>
                    <h2>{title}</h2>
                    <div className="header-breadcrumb">
                        <span>Koppar-Diambar</span>
                        <span>/</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{title}</span>
                    </div>
                </div>
            </div>
            <div className="header-right">
                <div className="header-search">
                    <Search size={14} />
                    <input type="text" placeholder="Rechercher clients, portefeuilles..." />
                    <kbd style={{
                        fontSize: '10px',
                        padding: '1px 6px',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '4px',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-primary)'
                    }}>⌘K</kbd>
                </div>
                <button className="header-btn" id="notifications-btn">
                    <Bell size={16} />
                    <span className="badge-dot"></span>
                </button>
                <button className="header-btn" id="settings-btn">
                    <Settings size={16} />
                </button>
                <div className="header-avatar" id="user-avatar">MD</div>
            </div>
        </header>
    );
}
