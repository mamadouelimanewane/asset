import { useState } from 'react';
import {
    Bell, Check, CheckCheck, Trash2, Filter, Settings,
    TrendingUp, AlertTriangle, DollarSign, Users, RefreshCw,
    FileText, Shield, Zap, Clock, Eye, Archive, X,
    ArrowUpRight, ChevronDown
} from 'lucide-react';

const mockNotifications = [
    // Critiques
    { id: 'n1', category: 'trading', priority: 'critical', title: 'Ordre exécuté — AAPL', description: 'Rééquilibrage Ousmane N\'Diaye : 150 parts AAPL achetées à 228,50 FCFA. Total : 34 275 FCFA.', time: '2025-02-22T09:30:00', read: false, icon: TrendingUp, color: 'var(--kd-success)', actionLabel: 'Voir l\'ordre', actionLink: '/trading' },
    { id: 'n2', category: 'compliance', priority: 'critical', title: 'Alerte de dérive — 3 comptes', description: 'Les portefeuilles d\'Aminata Sow (7,2%), Ousmane N\'Diaye (6,1%) et Cheikh K. Ba (5,8%) dépassent le seuil de 5%.', time: '2025-02-22T09:00:00', read: false, icon: AlertTriangle, color: 'var(--kd-warning)', actionLabel: 'Rééquilibrer', actionLink: '/portfolio' },
    { id: 'n3', category: 'tlh', priority: 'high', title: 'Opportunité TLH détectée', description: 'Diambar AI a identifié 2 nouvelles opportunités de récolte de pertes fiscales. Économie estimée : 4 200 FCFA.', time: '2025-02-22T08:45:00', read: false, icon: DollarSign, color: 'var(--kd-copper-light)', actionLabel: 'Voir les opportunités', actionLink: '/tax' },
    // Hautes
    { id: 'n4', category: 'client', priority: 'high', title: 'Connexion client — Aminata Sow', description: 'Aminata Sow s\'est connectée au portail client et a consulté sa performance YTD et ses documents.', time: '2025-02-22T08:30:00', read: false, icon: Users, color: 'var(--kd-diamond)', actionLabel: 'Voir le profil', actionLink: '/clients' },
    { id: 'n5', category: 'transfer', priority: 'high', title: 'Transfert ACAT en cours', description: 'Le transfert de Cheikh K. Ba depuis TD Ameritrade progresse — étape 3/5 (vérification des positions).', time: '2025-02-22T08:00:00', read: false, icon: RefreshCw, color: 'var(--kd-info)', actionLabel: 'Suivre', actionLink: '/transfers' },
    // Moyennes
    { id: 'n6', category: 'billing', priority: 'medium', title: 'Prochain cycle de facturation', description: 'La facturation T1 pour 142 ménages est programmée pour le 1er avril. Montant estimé : 458 250 FCFA.', time: '2025-02-21T17:00:00', read: true, icon: DollarSign, color: 'var(--kd-copper)', actionLabel: 'Voir la facturation', actionLink: '/billing' },
    { id: 'n7', category: 'report', priority: 'medium', title: 'Rapports mensuels générés', description: '45 résumés de solde mensuels ont été générés et envoyés automatiquement par email et portail.', time: '2025-02-21T14:00:00', read: true, icon: FileText, color: 'var(--kd-diamond-light)', actionLabel: 'Voir les rapports', actionLink: '/reporting' },
    { id: 'n8', category: 'trading', priority: 'medium', title: 'Ordre en attente d\'approbation', description: 'Cheikh K. Ba — Achat 100 parts AMZN à 215,80 FCFA. En attente de validation du conseiller.', time: '2025-02-21T11:00:00', read: true, icon: Clock, color: 'var(--kd-warning)', actionLabel: 'Approuver', actionLink: '/trading' },
    // Informatives
    { id: 'n9', category: 'market', priority: 'info', title: 'Résumé marché — 21 fév. 2025', description: 'S&P 500 : +0,4% | NASDAQ : +0,6% | DOW : +0,2%. Les techs mènent la hausse sur fond de résultats trimestriels solides.', time: '2025-02-21T09:00:00', read: true, icon: TrendingUp, color: 'var(--text-muted)', actionLabel: null, actionLink: null },
    { id: 'n10', category: 'ai', priority: 'info', title: 'Insight Diambar AI', description: 'Vos 3 clients les plus performants ce mois : Ousmane N\'Diaye (+4,2%), Fondation Gueye (+3,8%), Cheikh K. Ba (+3,5%).', time: '2025-02-20T16:00:00', read: true, icon: Zap, color: 'var(--kd-copper-light)', actionLabel: 'Explorer', actionLink: '/' },
    { id: 'n11', category: 'compliance', priority: 'medium', title: 'Échéance réglementaire — ADV', description: 'Rappel : la mise à jour annuelle du formulaire ADV est due dans 30 jours (31 mars 2025).', time: '2025-02-20T10:00:00', read: true, icon: Shield, color: 'var(--kd-info)', actionLabel: 'Voir la conformité', actionLink: '/compliance' },
    { id: 'n12', category: 'client', priority: 'info', title: 'Nouveau message — Fondation Gueye', description: 'La Fondation Modou Gueye a envoyé un message : "Pouvons-nous planifier une revue trimestrielle ?"', time: '2025-02-20T10:00:00', read: true, icon: Users, color: 'var(--kd-diamond)', actionLabel: 'Répondre', actionLink: '/messaging' },
];

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `Il y a ${mins} min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Il y a ${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'Hier';
    return `Il y a ${days} jours`;
}

const priorityConfig = {
    critical: { label: 'Critique', color: 'var(--kd-danger)', bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)' },
    high: { label: 'Haute', color: 'var(--kd-warning)', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.2)' },
    medium: { label: 'Moyenne', color: 'var(--kd-diamond)', bg: 'transparent', border: 'var(--border-primary)' },
    info: { label: 'Info', color: 'var(--text-muted)', bg: 'transparent', border: 'var(--border-primary)' },
};

const categoryLabels = {
    trading: 'Trading', compliance: 'Conformité', tlh: 'Fiscalité', client: 'Clients',
    transfer: 'Transferts', billing: 'Facturation', report: 'Rapports', market: 'Marché', ai: 'Diambar AI',
};

export default function Notifications() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterPriority, setFilterPriority] = useState('all');
    const [showArchived, setShowArchived] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const filtered = notifications.filter(n => {
        if (filterCategory !== 'all' && n.category !== filterCategory) return false;
        if (filterPriority !== 'all' && n.priority !== filterPriority) return false;
        return true;
    });

    const grouped = {};
    filtered.forEach(n => {
        const date = new Date(n.time);
        const today = new Date();
        const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
        let label;
        if (date.toDateString() === today.toDateString()) label = "Aujourd'hui";
        else if (date.toDateString() === yesterday.toDateString()) label = 'Hier';
        else label = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(n);
    });

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotif = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Centre de notifications</h1>
                    <p>Alertes intelligentes priorisées par urgence, catégorie et impact financier</p>
                </div>
                <div className="btn-group">
                    {unreadCount > 0 && (
                        <button className="btn btn-secondary" onClick={markAllAsRead}>
                            <CheckCheck size={14} /> Tout marquer comme lu ({unreadCount})
                        </button>
                    )}
                    <button className="btn btn-primary">
                        <Settings size={14} /> Préférences
                    </button>
                </div>
            </div>

            {/* Résumé par priorité */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                {[
                    { key: 'critical', label: 'Critiques', icon: AlertTriangle, count: notifications.filter(n => n.priority === 'critical' && !n.read).length },
                    { key: 'high', label: 'Hautes', icon: ArrowUpRight, count: notifications.filter(n => n.priority === 'high' && !n.read).length },
                    { key: 'medium', label: 'Moyennes', icon: Bell, count: notifications.filter(n => n.priority === 'medium' && !n.read).length },
                    { key: 'info', label: 'Informatives', icon: Eye, count: notifications.filter(n => n.priority === 'info' && !n.read).length },
                ].map(item => (
                    <div key={item.key}
                        className={`stat-card ${item.key === 'critical' ? 'warning' : item.key === 'high' ? 'copper' : item.key === 'medium' ? 'diamond' : ''}`}
                        style={{ cursor: 'pointer', border: filterPriority === item.key ? '2px solid var(--kd-copper)' : undefined }}
                        onClick={() => setFilterPriority(filterPriority === item.key ? 'all' : item.key)}
                    >
                        <div className="stat-icon"><item.icon size={20} /></div>
                        <div className="stat-value">{item.count}</div>
                        <div className="stat-label">{item.label} non lues</div>
                    </div>
                ))}
            </div>

            {/* Filtres par catégorie */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Filter size={14} style={{ color: 'var(--text-muted)', marginRight: 4 }} />
                {[
                    ['all', 'Toutes'],
                    ['trading', '⚡ Trading'],
                    ['compliance', '🛡️ Conformité'],
                    ['tlh', '💰 Fiscalité'],
                    ['client', '👥 Clients'],
                    ['transfer', '🔄 Transferts'],
                    ['billing', '💵 Facturation'],
                    ['report', '📄 Rapports'],
                    ['market', '📈 Marché'],
                    ['ai', '🤖 IA'],
                ].map(([key, label]) => (
                    <button key={key}
                        className={`btn btn-sm ${filterCategory === key ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ fontSize: 11, padding: '4px 10px' }}
                        onClick={() => setFilterCategory(key)}
                    >{label}</button>
                ))}
            </div>

            {/* Liste groupée par jour */}
            {Object.entries(grouped).map(([dateLabel, notifs]) => (
                <div key={dateLabel} style={{ marginBottom: 'var(--space-5)' }}>
                    <h4 style={{
                        fontSize: 12, fontWeight: 600, color: 'var(--text-muted)',
                        textTransform: 'capitalize', marginBottom: 'var(--space-3)',
                        letterSpacing: '0.05em',
                    }}>
                        {dateLabel} — {notifs.length} notification{notifs.length > 1 ? 's' : ''}
                    </h4>

                    {notifs.map(notif => {
                        const pConfig = priorityConfig[notif.priority];
                        const IconComp = notif.icon;

                        return (
                            <div key={notif.id} style={{
                                display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)',
                                marginBottom: 'var(--space-2)',
                                background: notif.read ? 'var(--bg-primary)' : pConfig.bg,
                                border: `1px solid ${notif.read ? 'var(--border-primary)' : pConfig.border}`,
                                borderRadius: 'var(--radius-md)',
                                borderLeft: `4px solid ${pConfig.color}`,
                                transition: 'all 0.2s',
                                opacity: notif.read ? 0.75 : 1,
                            }}>
                                {/* Icône */}
                                <div style={{
                                    width: 40, height: 40, borderRadius: 'var(--radius-md)',
                                    background: `${notif.color}15`, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    <IconComp size={18} style={{ color: notif.color }} />
                                </div>

                                {/* Contenu */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 2 }}>
                                                {!notif.read && (
                                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: pConfig.color, flexShrink: 0 }} />
                                                )}
                                                <h4 style={{ fontSize: 14, fontWeight: notif.read ? 500 : 600 }}>{notif.title}</h4>
                                            </div>
                                            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                                                {notif.description}
                                            </p>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
                                            <span style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                                {timeAgo(notif.time)}
                                            </span>
                                            <div style={{ display: 'flex', gap: 2 }}>
                                                <span className="tag" style={{ fontSize: 9, padding: '1px 6px' }}>
                                                    {categoryLabels[notif.category]}
                                                </span>
                                                <span style={{
                                                    fontSize: 9, padding: '1px 6px', borderRadius: 'var(--radius-sm)',
                                                    background: `${pConfig.color}20`, color: pConfig.color, fontWeight: 600,
                                                }}>
                                                    {pConfig.label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', alignItems: 'center' }}>
                                        {notif.actionLabel && (
                                            <a href={notif.actionLink} className="btn btn-primary btn-sm" style={{ fontSize: 11, textDecoration: 'none' }}>
                                                {notif.actionLabel}
                                            </a>
                                        )}
                                        {!notif.read && (
                                            <button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}
                                                onClick={() => markAsRead(notif.id)}>
                                                <Check size={12} /> Marquer comme lu
                                            </button>
                                        )}
                                        <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, color: 'var(--text-muted)' }}
                                            onClick={() => deleteNotif(notif.id)}>
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}

            {filtered.length === 0 && (
                <div style={{
                    textAlign: 'center', padding: 'var(--space-8)',
                    color: 'var(--text-muted)',
                }}>
                    <Bell size={48} strokeWidth={1} style={{ marginBottom: 'var(--space-3)', opacity: 0.3 }} />
                    <p style={{ fontSize: 15 }}>Aucune notification pour ce filtre</p>
                </div>
            )}

            {/* Préférences de notification */}
            <div className="card" style={{ marginTop: 'var(--space-5)' }}>
                <div className="card-header">
                    <h3>Canaux de notification</h3>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Catégorie</th>
                            <th style={{ textAlign: 'center' }}>In-app</th>
                            <th style={{ textAlign: 'center' }}>Email</th>
                            <th style={{ textAlign: 'center' }}>Push mobile</th>
                            <th style={{ textAlign: 'center' }}>SMS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['⚡ Exécution d\'ordres', true, true, true, false],
                            ['🛡️ Alertes de dérive', true, true, true, true],
                            ['💰 Opportunités TLH', true, true, false, false],
                            ['💵 Facturation', true, true, false, false],
                            ['👥 Activité clients', true, false, false, false],
                            ['📈 Résumés marché', true, true, false, false],
                            ['📋 Conformité', true, true, true, true],
                            ['🤖 Insights IA', true, false, false, false],
                        ].map(([label, inApp, email, push, sms]) => (
                            <tr key={label}>
                                <td style={{ fontWeight: 500, fontSize: 13 }}>{label}</td>
                                {[inApp, email, push, sms].map((checked, i) => (
                                    <td key={i} style={{ textAlign: 'center' }}>
                                        <input type="checkbox" defaultChecked={checked} style={{ accentColor: 'var(--kd-copper)' }} />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
                    Enregistrer les préférences
                </button>
            </div>
        </div>
    );
}
