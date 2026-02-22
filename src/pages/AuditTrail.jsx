import { useState } from 'react';
import {
    Shield, Clock, Search, Filter, Download, Eye,
    User, Activity, AlertTriangle, CheckCircle, XCircle,
    FileText, Lock, Globe, Settings, TrendingUp,
    ChevronRight, ChevronDown, RefreshCw, BarChart3, Zap
} from 'lucide-react';

const auditCategories = [
    { id: 'all', label: 'Tous', icon: '📋', count: 0 },
    { id: 'auth', label: 'Authentification', icon: '🔐', count: 0 },
    { id: 'trading', label: 'Trading', icon: '📈', count: 0 },
    { id: 'client', label: 'Clients', icon: '👤', count: 0 },
    { id: 'compliance', label: 'Conformité', icon: '🛡️', count: 0 },
    { id: 'system', label: 'Système', icon: '⚙️', count: 0 },
    { id: 'data', label: 'Données', icon: '💾', count: 0 },
];

const severityConfig = {
    info: { label: 'Info', color: 'var(--kd-info)', bg: 'rgba(126,184,218,0.1)', icon: Activity },
    success: { label: 'Succès', color: 'var(--kd-success)', bg: 'rgba(52,211,153,0.1)', icon: CheckCircle },
    warning: { label: 'Attention', color: 'var(--kd-warning)', bg: 'rgba(245,158,11,0.1)', icon: AlertTriangle },
    critical: { label: 'Critique', color: 'var(--kd-danger)', bg: 'rgba(239,68,68,0.1)', icon: XCircle },
};

const mockAuditLogs = [
    { id: 'AUD-001', timestamp: '2025-02-22T10:15:32Z', user: 'Moussa Diallo', role: 'Advisor', category: 'trading', severity: 'info', action: 'Ordre exécuté', detail: 'Achat 500 parts VXUS pour le compte C002 (Ousmane N\'Diaye). Montant : 28 750 $. Ordre au marché.', ip: '192.168.1.42', sessionId: 'SES-8a7f3d' },
    { id: 'AUD-002', timestamp: '2025-02-22T10:12:08Z', user: 'Système', role: 'Automatique', category: 'compliance', severity: 'warning', action: 'Alerte conformité', detail: 'Ratio de concentration détecté : C003 (Fatou Diop) détient 22% en AAPL, au-dessus du seuil de 20%. Notification envoyée au CCO.', ip: 'system', sessionId: 'SYS-auto' },
    { id: 'AUD-003', timestamp: '2025-02-22T10:08:45Z', user: 'Moussa Diallo', role: 'Advisor', category: 'client', severity: 'info', action: 'Profil client modifié', detail: 'Mise à jour du profil de risque de C001 (Aminata Sow) : Modéré → Modéré-Agressif. Justification : révision annuelle.', ip: '192.168.1.42', sessionId: 'SES-8a7f3d' },
    { id: 'AUD-004', timestamp: '2025-02-22T09:55:30Z', user: 'Moussa Diallo', role: 'Advisor', category: 'auth', severity: 'success', action: 'Connexion réussie', detail: 'Authentification 2FA vérifiée. Device : Chrome/Win11. Localisation : Dakar, SN.', ip: '192.168.1.42', sessionId: 'SES-8a7f3d' },
    { id: 'AUD-005', timestamp: '2025-02-22T09:52:11Z', user: 'Inconnu', role: 'N/A', category: 'auth', severity: 'critical', action: 'Tentative de connexion échouée', detail: '3 tentatives échouées consécutives pour l\'utilisateur admin@koppar.com. IP bloquée pendant 30 minutes. Géolocalisation : Lagos, NG.', ip: '41.220.144.52', sessionId: 'N/A' },
    { id: 'AUD-006', timestamp: '2025-02-22T09:45:00Z', user: 'Diambar AI', role: 'IA', category: 'trading', severity: 'info', action: 'TLH exécuté', detail: 'Tax-Loss Harvesting automatique : vente VTI (-2 340 $ perte réalisée) et achat ITOT pour C007 (Cheikh K. Ba). Économie fiscale estimée : 936 $.', ip: 'system', sessionId: 'AI-tlh-auto' },
    { id: 'AUD-007', timestamp: '2025-02-22T09:30:15Z', user: 'Système', role: 'Automatique', category: 'system', severity: 'info', action: 'Sauvegarde quotidienne', detail: 'Backup complet de la base de données terminé avec succès. Taille : 2,4 GB. Durée : 45s. Stockage : AWS S3 eu-west-3.', ip: 'system', sessionId: 'SYS-backup' },
    { id: 'AUD-008', timestamp: '2025-02-22T09:15:22Z', user: 'Système', role: 'Automatique', category: 'compliance', severity: 'info', action: 'Rapport ADV généré', detail: 'Rapport Form ADV Part 2 généré automatiquement pour le trimestre Q1 2025. 187 clients couverts. Soumission SEC prévue le 31/03.', ip: 'system', sessionId: 'SYS-report' },
    { id: 'AUD-009', timestamp: '2025-02-21T18:45:10Z', user: 'Moussa Diallo', role: 'Advisor', category: 'data', severity: 'warning', action: 'Export de données', detail: 'Export CSV de la liste clients (187 entrées) incluant : nom, email, AUM, allocation. Format : CSV chiffré. Raison : rapport trimestriel.', ip: '192.168.1.42', sessionId: 'SES-7b6e2c' },
    { id: 'AUD-010', timestamp: '2025-02-21T17:30:00Z', user: 'Moussa Diallo', role: 'Advisor', category: 'client', severity: 'success', action: 'Onboarding complété', detail: 'Nouveau client C009 (Prof. Mamadou Kane) intégré avec succès. Documents KYC validés. Compte courtage IB-C009 créé chez Interactive Brokers.', ip: '192.168.1.42', sessionId: 'SES-7b6e2c' },
    { id: 'AUD-011', timestamp: '2025-02-21T16:20:33Z', user: 'Système', role: 'Automatique', category: 'trading', severity: 'info', action: 'Rééquilibrage déclenché', detail: 'Rééquilibrage automatique pour 12 comptes. Déviation moyenne : 4,2%. Seuil de déclenchement : 5%. 47 ordres générés.', ip: 'system', sessionId: 'SYS-rebal' },
    { id: 'AUD-012', timestamp: '2025-02-21T15:05:45Z', user: 'Moussa Diallo', role: 'Advisor', category: 'compliance', severity: 'success', action: 'Revue best execution', detail: 'Revue trimestrielle de la qualité d\'exécution complétée. 98,3% des ordres exécutés au NBBO ou mieux. Aucune anomalie détectée.', ip: '192.168.1.42', sessionId: 'SES-7b6e2c' },
    { id: 'AUD-013', timestamp: '2025-02-21T14:00:00Z', user: 'Système', role: 'Automatique', category: 'system', severity: 'critical', action: 'API timeout', detail: 'Interactive Brokers API — timeout sur 3 requêtes consécutives (>5s). Basculement automatique vers le flux de secours. Service rétabli à 14:02:15.', ip: 'system', sessionId: 'SYS-monitor' },
    { id: 'AUD-014', timestamp: '2025-02-21T11:30:20Z', user: 'Moussa Diallo', role: 'Advisor', category: 'data', severity: 'info', action: 'Document uploadé', detail: 'Upload du testament notarié de C002 (Ousmane N\'Diaye). Fichier : testament_ndiaye_2025.pdf (1,2 MB). Chiffrement AES-256 appliqué.', ip: '192.168.1.42', sessionId: 'SES-6a5d1b' },
    { id: 'AUD-015', timestamp: '2025-02-21T10:00:00Z', user: 'Moussa Diallo', role: 'Advisor', category: 'auth', severity: 'success', action: 'Connexion réussie', detail: 'Authentification 2FA vérifiée. Device : Chrome/Win11. Localisation : Dakar, SN.', ip: '192.168.1.42', sessionId: 'SES-6a5d1b' },
];

// Enrichir les compteurs
auditCategories.forEach(cat => {
    cat.count = cat.id === 'all' ? mockAuditLogs.length : mockAuditLogs.filter(l => l.category === cat.id).length;
});

export default function AuditTrail() {
    const [logs] = useState(mockAuditLogs);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterSeverity, setFilterSeverity] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedLog, setExpandedLog] = useState(null);
    const [activeTab, setActiveTab] = useState('logs');

    const filtered = logs
        .filter(l => filterCategory === 'all' || l.category === filterCategory)
        .filter(l => filterSeverity === 'all' || l.severity === filterSeverity)
        .filter(l => {
            if (!searchTerm) return true;
            const s = searchTerm.toLowerCase();
            return l.action.toLowerCase().includes(s) || l.detail.toLowerCase().includes(s) || l.user.toLowerCase().includes(s) || l.id.toLowerCase().includes(s);
        });

    const criticalCount = logs.filter(l => l.severity === 'critical').length;
    const warningCount = logs.filter(l => l.severity === 'warning').length;
    const todayCount = logs.filter(l => l.timestamp.startsWith('2025-02-22')).length;
    const uniqueUsers = new Set(logs.map(l => l.user)).size;

    const formatTime = (ts) => {
        const d = new Date(ts);
        return d.toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Audit trail & journalisation</h1>
                    <p>Historique complet des actions — conformité SEC Rule 17a-4 & FINRA 4511</p>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary"><Download size={14} /> Exporter</button>
                    <button className="btn btn-primary"><RefreshCw size={14} /> Actualiser</button>
                </div>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper">
                    <div className="stat-icon"><Activity size={20} /></div>
                    <div className="stat-value">{todayCount}</div>
                    <div className="stat-label">Événements aujourd'hui</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><User size={20} /></div>
                    <div className="stat-value">{uniqueUsers}</div>
                    <div className="stat-label">Utilisateurs actifs</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><AlertTriangle size={20} /></div>
                    <div className="stat-value">{warningCount}</div>
                    <div className="stat-label">Avertissements</div>
                </div>
                <div className="stat-card" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                    <div className="stat-icon" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--kd-danger)' }}><XCircle size={20} /></div>
                    <div className="stat-value" style={{ color: 'var(--kd-danger)' }}>{criticalCount}</div>
                    <div className="stat-label">Événements critiques</div>
                </div>
            </div>

            {/* Onglets */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['logs', '📋 Journal'], ['stats', '📊 Statistiques']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'logs' && (
                <>
                    {/* Filtres */}
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="header-search" style={{ width: 300 }}>
                            <Search size={14} />
                            <input type="text" placeholder="Rechercher dans les logs..."
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>

                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {auditCategories.map(cat => (
                                <button key={cat.id}
                                    className={`btn btn-sm ${filterCategory === cat.id ? 'btn-primary' : 'btn-ghost'}`}
                                    style={{ fontSize: 10 }}
                                    onClick={() => setFilterCategory(cat.id)}>
                                    {cat.icon} {cat.label} ({cat.count})
                                </button>
                            ))}
                        </div>

                        <span style={{ color: 'var(--border-secondary)' }}>|</span>

                        <div style={{ display: 'flex', gap: 4 }}>
                            {['all', 'info', 'success', 'warning', 'critical'].map(sev => (
                                <button key={sev}
                                    className={`btn btn-sm ${filterSeverity === sev ? 'btn-primary' : 'btn-ghost'}`}
                                    style={{ fontSize: 10 }}
                                    onClick={() => setFilterSeverity(sev)}>
                                    {sev === 'all' ? '🔵 Tous' : `${severityConfig[sev].label}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Résultats */}
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                        {filtered.length} événement{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}
                    </div>

                    {/* Liste des logs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        {filtered.map(log => {
                            const sev = severityConfig[log.severity];
                            const SevIcon = sev.icon;
                            const isExpanded = expandedLog === log.id;
                            return (
                                <div key={log.id}
                                    onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                                    style={{
                                        padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius-md)', border: `1px solid ${log.severity === 'critical' ? 'rgba(239,68,68,0.3)' : 'var(--border-primary)'}`,
                                        cursor: 'pointer', borderLeft: `4px solid ${sev.color}`,
                                    }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1 }}>
                                            <SevIcon size={16} style={{ color: sev.color, flexShrink: 0 }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                                    <span style={{ fontWeight: 600, fontSize: 13 }}>{log.action}</span>
                                                    <span style={{
                                                        fontSize: 9, padding: '1px 6px', borderRadius: 'var(--radius-full)',
                                                        background: sev.bg, color: sev.color, fontWeight: 600,
                                                    }}>{sev.label}</span>
                                                    <span className="tag" style={{ fontSize: 9 }}>
                                                        {auditCategories.find(c => c.id === log.category)?.icon} {auditCategories.find(c => c.id === log.category)?.label}
                                                    </span>
                                                </div>
                                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                                                    {log.user} • {formatTime(log.timestamp)}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{log.id}</span>
                                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div style={{
                                            marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)',
                                            borderTop: '1px solid var(--border-primary)',
                                        }}>
                                            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
                                                {log.detail}
                                            </p>
                                            <div style={{ display: 'flex', gap: 'var(--space-5)', fontSize: 11, color: 'var(--text-muted)' }}>
                                                <span><User size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />Rôle : {log.role}</span>
                                                <span><Globe size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />IP : {log.ip}</span>
                                                <span><Lock size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />Session : {log.sessionId}</span>
                                                <span><Clock size={10} style={{ marginRight: 4, verticalAlign: 'middle' }} />{new Date(log.timestamp).toISOString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* STATISTIQUES */}
            {activeTab === 'stats' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header"><h3>Répartition par catégorie</h3></div>
                        {auditCategories.filter(c => c.id !== 'all').map(cat => {
                            const pct = logs.length > 0 ? Math.round(cat.count / logs.length * 100) : 0;
                            return (
                                <div key={cat.id} style={{ marginBottom: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                        <span>{cat.icon} {cat.label}</span>
                                        <span style={{ fontWeight: 600 }}>{cat.count} ({pct}%)</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${pct}%`, background: 'var(--kd-copper)' }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card">
                        <div className="card-header"><h3>Répartition par sévérité</h3></div>
                        {Object.entries(severityConfig).map(([key, config]) => {
                            const count = logs.filter(l => l.severity === key).length;
                            const pct = logs.length > 0 ? Math.round(count / logs.length * 100) : 0;
                            return (
                                <div key={key} style={{ marginBottom: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                        <span style={{ color: config.color }}>{config.label}</span>
                                        <span style={{ fontWeight: 600 }}>{count} ({pct}%)</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${pct}%`, background: config.color }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card">
                        <div className="card-header"><h3>Activité par utilisateur</h3></div>
                        {[...new Set(logs.map(l => l.user))].map(user => {
                            const count = logs.filter(l => l.user === user).length;
                            const lastAction = logs.find(l => l.user === user);
                            return (
                                <div key={user} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-primary)',
                                }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{user}</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{lastAction?.role} • Dernier : {lastAction?.action}</div>
                                    </div>
                                    <span style={{
                                        fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                        background: 'rgba(200,121,65,0.1)', color: 'var(--kd-copper-light)',
                                    }}>{count}</span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(200,121,65,0.2)', background: 'rgba(200,121,65,0.03)' }}>
                        <div className="card-header"><h3>🤖 Analyse de sécurité Diambar AI</h3></div>
                        {[
                            { text: '⚠️ Tentative d\'accès suspecte détectée depuis Lagos (IP 41.220.144.52). Recommandation : renforcer les règles de géoblocage et activer l\'alerte par SMS pour les connexions depuis des pays non habituels.', priority: 'critical' },
                            { text: 'L\'export de données CSV par Moussa Diallo est légitime (rapport trimestriel), mais la fréquence d\'export a augmenté de 40% ce mois. Suggérer l\'activation du DLP (Data Loss Prevention) pour les exports > 100 entrées.', priority: 'warning' },
                            { text: 'Toutes les opérations de trading sont correctement horodatées et traçables. Conformité SEC Rule 17a-4 respectée. Prochain audit interne prévu dans 45 jours.', priority: 'success' },
                            { text: 'Le timeout API IB du 21/02 (14:00-14:02) a été géré par le basculement automatique. Aucune perte de données. Recommandation : augmenter le timeout de 5s à 8s pour réduire les faux positifs.', priority: 'info' },
                        ].map((insight, i) => (
                            <div key={i} style={{
                                padding: 'var(--space-3)', marginBottom: 'var(--space-2)',
                                background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                                borderLeft: `3px solid ${insight.priority === 'critical' ? 'var(--kd-danger)' : insight.priority === 'warning' ? 'var(--kd-warning)' : insight.priority === 'success' ? 'var(--kd-success)' : 'var(--kd-info)'}`,
                                fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5,
                            }}>
                                {insight.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
