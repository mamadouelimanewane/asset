import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Users, Briefcase, LineChart, Receipt,
    ArrowLeftRight, FileText, Calculator, Store, Landmark,
    Settings, ChevronsLeft, ChevronsRight, Zap, Shield, HelpCircle, MessageCircle, Bell,
    Grid3X3, GitBranch, Target, Award, BookOpen, Gem, Globe, Eye, Sliders, BarChart3,
    FolderOpen, CheckSquare, AlertTriangle, Heart, Trophy, Crown,
    Sparkles, Brain, Cpu, Smartphone
} from 'lucide-react';

const navSections = [
    {
        title: '🌟 Modules Premium',
        items: [
            { to: '/wealth-pocket', icon: Smartphone, label: 'Wealth Pocket' },
            { to: '/web3', icon: Globe, label: 'Web3 & RWA' },
            { to: '/market-intelligence', icon: LineChart, label: 'Intelligence Marché' },
            { to: '/digital-twin', icon: Brain, label: 'Digital Twin' },
            { to: '/client-experience', icon: Sparkles, label: 'Expérience Client' },
            { to: '/security', icon: Shield, label: 'Sécurité Next-Gen' },
            { to: '/esg', icon: Target, label: 'ESG & Carbone' },
        ],
    },
    {
        title: '🤖 IA Générative',
        items: [
            { to: '/copilot', icon: Sparkles, label: 'Diambar Copilot' },
            { to: '/behavioral', icon: Brain, label: 'Hyper-Perso IA' },
            { to: '/optimizer', icon: Cpu, label: 'Neural Optimizer' },
        ],
    },
    {
        title: 'Aperçu',
        items: [
            { to: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
            { to: '/custom-dashboard', icon: Grid3X3, label: 'Dashboard perso.' },
            { to: '/executive', icon: Crown, label: 'Vue exécutive' },
        ],
    },
    {
        title: 'Gestion Clients',
        items: [
            { to: '/clients', icon: Users, label: 'Clients', badge: '187' },
            { to: '/scoring', icon: Award, label: 'Scoring clients' },
            { to: '/onboarding', icon: Briefcase, label: 'Intégration' },
            { to: '/transfers', icon: ArrowLeftRight, label: 'Transferts & ACATs', badge: '4' },
            { to: '/messaging', icon: MessageCircle, label: 'Messagerie', badge: '3' },
            { to: '/crm', icon: Target, label: 'CRM Pipeline', badge: '6' },
            { to: '/proposals', icon: FileText, label: 'Propositions' },
            { to: '/tasks', icon: CheckSquare, label: 'Tâches' },
            { to: '/philanthropy', icon: Heart, label: 'Philanthropie' },
        ],
    },
    {
        title: 'Investissements',
        items: [
            { to: '/portfolio', icon: LineChart, label: 'Gestion de portefeuille' },
            { to: '/trading', icon: Zap, label: 'Trading' },
            { to: '/marketplace', icon: Store, label: 'Place de marché' },
            { to: '/cash', icon: Landmark, label: 'Cash haut rendement' },
            { to: '/goals', icon: Target, label: 'Objectifs de vie' },
            { to: '/alternatives', icon: Gem, label: 'Alternatifs' },
            { to: '/multi-currency', icon: Globe, label: 'Multi-devises' },
            { to: '/simulator', icon: Sliders, label: 'Simulateur' },
            { to: '/risk', icon: AlertTriangle, label: 'Analyse de risque' },
            { to: '/benchmarking', icon: Trophy, label: 'Benchmark' },
        ],
    },
    {
        title: 'Opérations',
        items: [
            { to: '/billing', icon: Receipt, label: 'Facturation' },
            { to: '/reporting', icon: FileText, label: 'Rapports' },
            { to: '/tax', icon: Calculator, label: 'Gestion fiscale' },
            { to: '/estate-planning', icon: GitBranch, label: 'Succession' },
            { to: '/reports', icon: BarChart3, label: 'Rapports avancés' },
            { to: '/documents', icon: FolderOpen, label: 'Documents' },
            { to: '/african-payments', icon: Globe, label: 'Paiements Africains' },
        ],
    },
    {
        title: 'Système',
        items: [
            { to: '/integrations', icon: Zap, label: 'Intégrations', badge: '6' },
            { to: '/notifications', icon: Bell, label: 'Notifications', badge: '5' },
            { to: '/compliance', icon: Shield, label: 'Conformité' },
            { to: '/audit', icon: Eye, label: 'Audit trail' },
            { to: '/settings', icon: Settings, label: 'Paramètres' },
            { to: '/education', icon: BookOpen, label: 'Centre éducatif' },
        ],
    },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen, setMobileMenuOpen }) {
    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-brand">
                <div className="brand-icon">KD</div>
                <div className="brand-text">
                    <h1>Koppar-Diambar</h1>
                    <span>Plateforme Patrimoniale</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navSections.map((section) => (
                    <div key={section.title}>
                        <div className="nav-section-title">{section.title}</div>
                        {section.items.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.to === '/'}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                            >
                                <span className="nav-icon">
                                    <item.icon size={18} />
                                </span>
                                <span className="nav-text">{item.label}</span>
                                {item.badge && <span className="nav-badge">{item.badge}</span>}
                            </NavLink>
                        ))}
                    </div>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="sidebar-toggle" onClick={onToggle}>
                    {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
                </button>
            </div>
        </aside>
    );
}
