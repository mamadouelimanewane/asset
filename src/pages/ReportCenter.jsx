import { useState } from 'react';
import {
    FileText, Download, Calendar, Eye, Send, Printer,
    BarChart3, PieChart, TrendingUp, Users, DollarSign,
    Clock, CheckCircle, RefreshCw, Filter, ChevronRight, Zap
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const reportTypes = [
    {
        id: 'performance', name: 'Rapport de performance', icon: '📈', category: 'Investissements',
        description: 'Performance des portefeuilles par période, benchmark et attribution.',
        frequency: 'Mensuel', lastGenerated: '2025-02-01', pages: 12, format: 'PDF',
    },
    {
        id: 'billing', name: 'Rapport de facturation', icon: '💰', category: 'Finance',
        description: 'Détail des frais facturés par client, AUM-based et fixed-fee.',
        frequency: 'Trimestriel', lastGenerated: '2025-01-15', pages: 8, format: 'PDF + CSV',
    },
    {
        id: 'compliance', name: 'Rapport de conformité', icon: '🛡️', category: 'Réglementaire',
        description: 'Revue des violations, alertes, best execution et Form ADV.',
        frequency: 'Trimestriel', lastGenerated: '2025-01-15', pages: 15, format: 'PDF',
    },
    {
        id: 'tax', name: 'Rapport fiscal', icon: '🧾', category: 'Fiscalité',
        description: 'TLH réalisé, gains/pertes, 1099-DIV, 1099-INT par client.',
        frequency: 'Annuel', lastGenerated: '2025-01-31', pages: 20, format: 'PDF + CSV',
    },
    {
        id: 'client-review', name: 'Revue client trimestrielle', icon: '👤', category: 'Clients',
        description: 'Sommaire personnalisé pour chaque client avec allocation, performance et recommandations.',
        frequency: 'Trimestriel', lastGenerated: '2025-01-10', pages: 6, format: 'PDF',
    },
    {
        id: 'risk', name: 'Rapport de risque', icon: '⚠️', category: 'Risque',
        description: 'VaR, stress tests, corrélations, drawdowns et concentrations.',
        frequency: 'Mensuel', lastGenerated: '2025-02-05', pages: 10, format: 'PDF',
    },
    {
        id: 'aum', name: 'Évolution des AUM', icon: '📊', category: 'Finance',
        description: 'Flux entrants/sortants, croissance organique, nouveaux clients.',
        frequency: 'Mensuel', lastGenerated: '2025-02-01', pages: 5, format: 'PDF + Excel',
    },
    {
        id: 'esg', name: 'Rapport ESG / Impact', icon: '🌍', category: 'ESG',
        description: 'Score ESG du portefeuille, empreinte carbone, alignement ODD.',
        frequency: 'Semestriel', lastGenerated: '2024-12-31', pages: 14, format: 'PDF',
    },
];

const scheduledReports = [
    { reportId: 'performance', nextRun: '2025-03-01', recipients: ['moussa@koppar.com', 'clients-all'], auto: true },
    { reportId: 'billing', nextRun: '2025-04-15', recipients: ['moussa@koppar.com', 'compta@koppar.com'], auto: true },
    { reportId: 'compliance', nextRun: '2025-04-15', recipients: ['moussa@koppar.com', 'cco@koppar.com'], auto: true },
    { reportId: 'client-review', nextRun: '2025-04-10', recipients: ['moussa@koppar.com'], auto: false },
];

const generatedHistory = [
    { id: 'RPT-001', reportType: 'performance', date: '2025-02-01', clients: 187, status: 'sent', size: '2.4 MB' },
    { id: 'RPT-002', reportType: 'risk', date: '2025-02-05', clients: 187, status: 'generated', size: '1.8 MB' },
    { id: 'RPT-003', reportType: 'billing', date: '2025-01-15', clients: 187, status: 'sent', size: '980 KB' },
    { id: 'RPT-004', reportType: 'tax', date: '2025-01-31', clients: 187, status: 'sent', size: '4.2 MB' },
    { id: 'RPT-005', reportType: 'compliance', date: '2025-01-15', clients: 1, status: 'sent', size: '1.5 MB' },
    { id: 'RPT-006', reportType: 'client-review', date: '2025-01-10', clients: 187, status: 'sent', size: '12.6 MB' },
    { id: 'RPT-007', reportType: 'aum', date: '2025-02-01', clients: 1, status: 'generated', size: '620 KB' },
    { id: 'RPT-008', reportType: 'esg', date: '2024-12-31', clients: 1, status: 'sent', size: '3.1 MB' },
];

export default function ReportCenter() {
    const [activeTab, setActiveTab] = useState('catalog');
    const [selectedReport, setSelectedReport] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');

    const categories = [...new Set(reportTypes.map(r => r.category))];
    const filtered = reportTypes.filter(r => filterCategory === 'all' || r.category === filterCategory);

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Centre de rapports</h1>
                    <p>Générez, planifiez et distribuez des rapports professionnels</p>
                </div>
                <button className="btn btn-primary">
                    <FileText size={14} /> Générer un rapport
                </button>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper">
                    <div className="stat-icon"><FileText size={20} /></div>
                    <div className="stat-value">{reportTypes.length}</div>
                    <div className="stat-label">Types de rapports</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><CheckCircle size={20} /></div>
                    <div className="stat-value">{generatedHistory.length}</div>
                    <div className="stat-label">Rapports générés (Q1)</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><Calendar size={20} /></div>
                    <div className="stat-value">{scheduledReports.filter(s => s.auto).length}</div>
                    <div className="stat-label">Rapports automatisés</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><Send size={20} /></div>
                    <div className="stat-value">{generatedHistory.filter(g => g.status === 'sent').length}</div>
                    <div className="stat-label">Envoyés aux clients</div>
                </div>
            </div>

            {/* Onglets */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['catalog', '📚 Catalogue'], ['history', '📋 Historique'], ['schedule', '⏰ Planification']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {/* CATALOGUE */}
            {activeTab === 'catalog' && (
                <div>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
                        <button className={`btn btn-sm ${filterCategory === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setFilterCategory('all')}>Tous ({reportTypes.length})</button>
                        {categories.map(cat => (
                            <button key={cat} className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setFilterCategory(cat)}>{cat}</button>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-4)' }}>
                        {filtered.map(report => (
                            <div key={report.id} className="card" style={{ cursor: 'pointer' }}
                                onClick={() => setSelectedReport(report)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <span style={{ fontSize: 28 }}>{report.icon}</span>
                                        <div>
                                            <h3 style={{ fontSize: 14, fontWeight: 600 }}>{report.name}</h3>
                                            <span className="tag" style={{ fontSize: 9 }}>{report.category}</span>
                                        </div>
                                    </div>
                                </div>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                                    {report.description}
                                </p>
                                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                                    <span><Clock size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />{report.frequency}</span>
                                    <span><FileText size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />{report.pages} pages</span>
                                    <span>{report.format}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                                        Dernier : {new Date(report.lastGenerated).toLocaleDateString('fr-FR')}
                                    </span>
                                    <div className="btn-group">
                                        <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}><Eye size={12} /></button>
                                        <button className="btn btn-primary btn-sm" onClick={e => e.stopPropagation()}>
                                            <Download size={12} /> Générer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* HISTORIQUE */}
            {activeTab === 'history' && (
                <div className="card">
                    <div className="card-header"><h3>Rapports générés</h3></div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Clients couverts</th>
                                <th>Taille</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generatedHistory.map(report => {
                                const rType = reportTypes.find(r => r.id === report.reportType);
                                return (
                                    <tr key={report.id}>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{report.id}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                <span>{rType?.icon}</span>
                                                <span style={{ fontSize: 13 }}>{rType?.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontSize: 12 }}>{new Date(report.date).toLocaleDateString('fr-FR')}</td>
                                        <td style={{ fontWeight: 600 }}>{report.clients}</td>
                                        <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{report.size}</td>
                                        <td>
                                            <span style={{
                                                fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600,
                                                background: report.status === 'sent' ? 'rgba(52,211,153,0.1)' : 'rgba(126,184,218,0.1)',
                                                color: report.status === 'sent' ? 'var(--kd-success)' : 'var(--kd-info)',
                                            }}>{report.status === 'sent' ? 'Envoyé' : 'Généré'}</span>
                                        </td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn btn-ghost btn-sm"><Download size={12} /></button>
                                                <button className="btn btn-ghost btn-sm"><Send size={12} /></button>
                                                <button className="btn btn-ghost btn-sm"><Printer size={12} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* PLANIFICATION */}
            {activeTab === 'schedule' && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                        {scheduledReports.map(sched => {
                            const rType = reportTypes.find(r => r.id === sched.reportId);
                            return (
                                <div key={sched.reportId} className="card">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                            <span style={{ fontSize: 24 }}>{rType?.icon}</span>
                                            <div>
                                                <h3 style={{ fontSize: 14, fontWeight: 600 }}>{rType?.name}</h3>
                                                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{rType?.frequency}</span>
                                            </div>
                                        </div>
                                        <span style={{
                                            fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                            background: sched.auto ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)',
                                            color: sched.auto ? 'var(--kd-success)' : 'var(--kd-warning)',
                                            fontWeight: 600,
                                        }}>{sched.auto ? '✅ Automatique' : '⏸️ Manuel'}</span>
                                    </div>
                                    <div style={{ fontSize: 12, marginBottom: 'var(--space-2)' }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Prochaine génération : </span>
                                        <span style={{ fontWeight: 600 }}>{new Date(sched.nextRun).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                        Destinataires : {sched.recipients.join(', ')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(200,121,65,0.2)', background: 'rgba(200,121,65,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                            <Zap size={14} style={{ color: 'var(--kd-copper)' }} />
                            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--kd-copper-light)' }}>Recommandations Diambar AI</span>
                        </div>
                        {[
                            'Le rapport ESG n\'a pas été régénéré depuis 53 jours. La prochaine publication semestrielle est prévue le 30/06. Planifier une mise à jour intermédiaire renforcerait la transparence.',
                            'Les revues clients trimestrielles n\'ont pas été automatisées. Activer la génération automatique économiserait environ 4h de travail par trimestre.',
                            '2 clients (Aminata Sow, Cheikh Ba) n\'ont pas consulté leur dernier rapport de performance. Relance recommandée par messagerie sécurisée.',
                        ].map((text, i) => (
                            <div key={i} style={{
                                padding: 'var(--space-3)', marginBottom: 'var(--space-2)',
                                background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                                borderLeft: '3px solid var(--kd-copper)',
                                fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5,
                            }}>{text}</div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal détail rapport */}
            {selectedReport && (
                <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
                        <div className="modal-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <span style={{ fontSize: 32 }}>{selectedReport.icon}</span>
                                <div>
                                    <h3>{selectedReport.name}</h3>
                                    <span className="tag">{selectedReport.category}</span>
                                </div>
                            </div>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedReport(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                                {selectedReport.description}
                            </p>
                            <div className="grid-2" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                                {[
                                    ['Fréquence', selectedReport.frequency],
                                    ['Pages', `${selectedReport.pages} pages`],
                                    ['Format', selectedReport.format],
                                    ['Dernière génération', new Date(selectedReport.lastGenerated).toLocaleDateString('fr-FR')],
                                ].map(([label, value]) => (
                                    <div key={label} style={{ padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</div>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{value}</div>
                                    </div>
                                ))}
                            </div>

                            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-2)' }}>Options de génération</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                {[
                                    ['Période', 'Janvier 2025 — Février 2025'],
                                    ['Clients', 'Tous (187)'],
                                    ['Benchmark', 'S&P 500 / Blended 60/40'],
                                    ['Langue', 'Français'],
                                    ['Logo co-brandé', 'Oui'],
                                ].map(([label, value]) => (
                                    <div key={label} style={{
                                        display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2)',
                                        background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', fontSize: 12,
                                    }}>
                                        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                                        <span style={{ fontWeight: 500 }}>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedReport(null)}>Fermer</button>
                            <div className="btn-group">
                                <button className="btn btn-secondary btn-sm"><Eye size={13} /> Aperçu</button>
                                <button className="btn btn-primary btn-sm"><Download size={13} /> Générer maintenant</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
