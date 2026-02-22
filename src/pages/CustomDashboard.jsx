import { useState } from 'react';
import {
    LayoutDashboard, Plus, Save, RotateCcw, Eye, Grid3X3,
    TrendingUp, Users, DollarSign, RefreshCw, Shield, Zap,
    BarChart3, PieChart, Activity, Clock, FileText, Calculator,
    ArrowUpDown, X, Check, ChevronDown, Grip, Settings
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, BarChart, Bar, PieChart as RPieChart, Pie, Cell
} from 'recharts';
import {
    dashboardStats, aumHistoryData, performanceData, sectorAllocation,
    recentActivity, clients, recentTrades, complianceAlerts
} from '../data/mockData';
import { formatCurrency, formatPercent } from '../utils/helpers';

/* ── Définition des widgets disponibles ── */
const WIDGET_CATALOG = [
    { id: 'kpi_aum', title: 'AUM Total', category: 'KPI', icon: DollarSign, size: 'sm', defaultOn: true },
    { id: 'kpi_clients', title: 'Clients actifs', category: 'KPI', icon: Users, size: 'sm', defaultOn: true },
    { id: 'kpi_revenue', title: 'Revenu annuel', category: 'KPI', icon: TrendingUp, size: 'sm', defaultOn: true },
    { id: 'kpi_return', title: 'Rendement moyen YTD', category: 'KPI', icon: Activity, size: 'sm', defaultOn: true },
    { id: 'kpi_pending', title: 'Ordres en attente', category: 'KPI', icon: Clock, size: 'sm', defaultOn: false },
    { id: 'kpi_accounts', title: 'Nouveaux comptes', category: 'KPI', icon: Plus, size: 'sm', defaultOn: false },
    { id: 'chart_aum', title: 'Croissance AUM', category: 'Graphique', icon: BarChart3, size: 'lg', defaultOn: true },
    { id: 'chart_perf', title: 'Performance vs Référence', category: 'Graphique', icon: TrendingUp, size: 'lg', defaultOn: true },
    { id: 'chart_sector', title: 'Allocation sectorielle', category: 'Graphique', icon: PieChart, size: 'md', defaultOn: true },
    { id: 'list_activity', title: 'Activité récente', category: 'Liste', icon: Activity, size: 'md', defaultOn: true },
    { id: 'list_trades', title: 'Derniers ordres', category: 'Liste', icon: Zap, size: 'lg', defaultOn: false },
    { id: 'list_alerts', title: 'Alertes de conformité', category: 'Liste', icon: Shield, size: 'md', defaultOn: true },
    { id: 'list_top_clients', title: 'Top clients par AUM', category: 'Liste', icon: Users, size: 'md', defaultOn: false },
    { id: 'kpi_tlh', title: 'Pertes TLH récoltées', category: 'KPI', icon: Calculator, size: 'sm', defaultOn: false },
    { id: 'kpi_billing', title: 'Facturation T1', category: 'KPI', icon: FileText, size: 'sm', defaultOn: false },
];

const TEMPLATES = [
    { id: 'default', name: '🏠 Par défaut', widgets: WIDGET_CATALOG.filter(w => w.defaultOn).map(w => w.id) },
    { id: 'cio', name: '📊 Vue CIO', widgets: ['kpi_aum', 'kpi_return', 'kpi_clients', 'kpi_tlh', 'chart_perf', 'chart_aum', 'chart_sector', 'list_alerts'] },
    { id: 'commercial', name: '💼 Vue commerciale', widgets: ['kpi_clients', 'kpi_accounts', 'kpi_aum', 'kpi_revenue', 'list_top_clients', 'list_activity', 'chart_aum'] },
    { id: 'compliance', name: '🛡️ Vue conformité', widgets: ['kpi_pending', 'kpi_clients', 'list_alerts', 'list_trades', 'list_activity'] },
    { id: 'minimal', name: '⚡ Minimaliste', widgets: ['kpi_aum', 'kpi_return', 'chart_perf', 'list_activity'] },
];

/* ── Composants de rendu des widgets ── */
function KPIWidget({ widgetId }) {
    const data = {
        kpi_aum: { value: formatCurrency(245_800_000, true), change: '+3,2%', label: 'AUM Total', positive: true },
        kpi_clients: { value: '187', change: '+5', label: 'Clients actifs', positive: true },
        kpi_revenue: { value: formatCurrency(1_832_500, true), change: '+8,4%', label: 'Revenu annuel', positive: true },
        kpi_return: { value: '14,7%', change: '+2,1%', label: 'Rendement moyen YTD', positive: true },
        kpi_pending: { value: '2', change: '', label: 'Ordres en attente', positive: null },
        kpi_accounts: { value: '12', change: '+20%', label: 'Nouveaux comptes (MTD)', positive: true },
        kpi_tlh: { value: formatCurrency(51_820, true), change: '+34 opérations', label: 'Pertes TLH récoltées (YTD)', positive: true },
        kpi_billing: { value: formatCurrency(458_250, true), change: '142 ménages', label: 'Facturation T1', positive: null },
    };
    const d = data[widgetId] || data.kpi_aum;
    return (
        <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--kd-copper-light)', marginBottom: 4, fontVariantNumeric: 'tabular-nums' }}>
                {d.value}
            </div>
            {d.change && (
                <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: d.positive === true ? 'var(--kd-success)' : d.positive === false ? 'var(--kd-danger)' : 'var(--text-muted)',
                }}>
                    {d.positive === true ? '▲ ' : d.positive === false ? '▼ ' : ''}{d.change}
                </span>
            )}
        </div>
    );
}

function ChartAUM() {
    return (
        <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={aumHistoryData}>
                    <defs>
                        <linearGradient id="cdAumG" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#C87941" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#C87941" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={10} />
                    <YAxis stroke="var(--text-muted)" fontSize={10} tickFormatter={v => `${v}M`} />
                    <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-secondary)', borderRadius: 8, fontSize: 11 }} formatter={v => `${v}M $`} />
                    <Area type="monotone" dataKey="aum" name="AUM" stroke="#C87941" strokeWidth={2} fill="url(#cdAumG)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

function ChartPerf() {
    return (
        <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={10} />
                    <YAxis stroke="var(--text-muted)" fontSize={10} tickFormatter={v => `${v}%`} />
                    <Tooltip contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-secondary)', borderRadius: 8, fontSize: 11 }} />
                    <Bar dataKey="portfolio" name="Portefeuille" fill="#C87941" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="benchmark" name="Référence" fill="#7EB8DA" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

function ChartSector() {
    return (
        <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RPieChart>
                    <Pie data={sectorAllocation} cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2} dataKey="value">
                        {sectorAllocation.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                    </Pie>
                    <Tooltip formatter={v => `${v}%`} contentStyle={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-secondary)', borderRadius: 8, fontSize: 11 }} />
                </RPieChart>
            </ResponsiveContainer>
        </div>
    );
}

function ListActivity() {
    return (
        <div>
            {recentActivity.slice(0, 5).map(a => (
                <div key={a.id} style={{ display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-primary)' }}>
                    <span style={{ fontSize: 18 }}>{a.icon}</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, lineHeight: 1.4 }}>{a.description}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ListTrades() {
    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ fontSize: 12 }}>
                <thead><tr><th>Client</th><th>Symbole</th><th>Action</th><th>Parts</th><th>Total</th></tr></thead>
                <tbody>
                    {recentTrades.slice(0, 5).map(t => (
                        <tr key={t.id}>
                            <td>{t.client.split(' ').slice(0, 2).join(' ')}</td>
                            <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--kd-copper-light)', fontWeight: 600 }}>{t.ticker}</td>
                            <td><span style={{ color: t.action === 'Buy' ? 'var(--kd-success)' : 'var(--kd-danger)' }}>{t.action === 'Buy' ? 'Achat' : 'Vente'}</span></td>
                            <td>{t.shares}</td>
                            <td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(t.total)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function ListAlerts() {
    return (
        <div>
            {complianceAlerts.map(a => (
                <div key={a.id} style={{
                    padding: 'var(--space-3)', marginBottom: 'var(--space-2)',
                    background: a.type === 'warning' ? 'rgba(245,158,11,0.06)' : a.type === 'success' ? 'rgba(52,211,153,0.06)' : 'rgba(126,184,218,0.06)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: `3px solid ${a.type === 'warning' ? 'var(--kd-warning)' : a.type === 'success' ? 'var(--kd-success)' : 'var(--kd-info)'}`,
                }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{a.description}</div>
                </div>
            ))}
        </div>
    );
}

function ListTopClients() {
    const sorted = [...clients].sort((a, b) => b.aum - a.aum).slice(0, 5);
    return (
        <div>
            {sorted.map((c, i) => (
                <div key={c.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-primary)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', width: 20 }}>#{i + 1}</span>
                        <span style={{ fontSize: 13 }}>{c.name}</span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--kd-copper-light)', fontVariantNumeric: 'tabular-nums' }}>
                        {formatCurrency(c.aum, true)}
                    </span>
                </div>
            ))}
        </div>
    );
}

const WIDGET_RENDERERS = {
    kpi_aum: (id) => <KPIWidget widgetId={id} />,
    kpi_clients: (id) => <KPIWidget widgetId={id} />,
    kpi_revenue: (id) => <KPIWidget widgetId={id} />,
    kpi_return: (id) => <KPIWidget widgetId={id} />,
    kpi_pending: (id) => <KPIWidget widgetId={id} />,
    kpi_accounts: (id) => <KPIWidget widgetId={id} />,
    kpi_tlh: (id) => <KPIWidget widgetId={id} />,
    kpi_billing: (id) => <KPIWidget widgetId={id} />,
    chart_aum: () => <ChartAUM />,
    chart_perf: () => <ChartPerf />,
    chart_sector: () => <ChartSector />,
    list_activity: () => <ListActivity />,
    list_trades: () => <ListTrades />,
    list_alerts: () => <ListAlerts />,
    list_top_clients: () => <ListTopClients />,
};

/* ── Composant principal ── */
export default function CustomDashboard() {
    const [activeWidgets, setActiveWidgets] = useState(
        WIDGET_CATALOG.filter(w => w.defaultOn).map(w => w.id)
    );
    const [editMode, setEditMode] = useState(false);
    const [showCatalog, setShowCatalog] = useState(false);
    const [activeTemplate, setActiveTemplate] = useState('default');

    const toggleWidget = (widgetId) => {
        setActiveWidgets(prev =>
            prev.includes(widgetId) ? prev.filter(id => id !== widgetId) : [...prev, widgetId]
        );
    };

    const applyTemplate = (templateId) => {
        const tmpl = TEMPLATES.find(t => t.id === templateId);
        if (tmpl) {
            setActiveWidgets([...tmpl.widgets]);
            setActiveTemplate(templateId);
        }
    };

    const moveWidget = (index, direction) => {
        const newWidgets = [...activeWidgets];
        const targetIndex = index + direction;
        if (targetIndex < 0 || targetIndex >= newWidgets.length) return;
        [newWidgets[index], newWidgets[targetIndex]] = [newWidgets[targetIndex], newWidgets[index]];
        setActiveWidgets(newWidgets);
    };

    // Organiser les widgets actifs par taille pour le grid
    const kpiWidgets = activeWidgets.filter(id => WIDGET_CATALOG.find(w => w.id === id)?.size === 'sm');
    const otherWidgets = activeWidgets.filter(id => WIDGET_CATALOG.find(w => w.id === id)?.size !== 'sm');

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Tableau de bord personnalisé</h1>
                    <p>Configurez votre vue avec les widgets de votre choix</p>
                </div>
                <div className="btn-group">
                    <button
                        className={`btn ${editMode ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => { setEditMode(!editMode); setShowCatalog(false); }}
                    >
                        {editMode ? <><Check size={14} /> Terminer</> : <><Settings size={14} /> Personnaliser</>}
                    </button>
                    {editMode && (
                        <button className="btn btn-secondary" onClick={() => setShowCatalog(!showCatalog)}>
                            <Plus size={14} /> Ajouter un widget
                        </button>
                    )}
                </div>
            </div>

            {/* Barre de templates */}
            <div style={{
                display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-5)',
                padding: 'var(--space-3)', background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)',
                alignItems: 'center', flexWrap: 'wrap',
            }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 'var(--space-2)' }}>
                    <Grid3X3 size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                    Modèles :
                </span>
                {TEMPLATES.map(tmpl => (
                    <button key={tmpl.id}
                        className={`btn btn-sm ${activeTemplate === tmpl.id ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ fontSize: 11 }}
                        onClick={() => applyTemplate(tmpl.id)}
                    >
                        {tmpl.name}
                    </button>
                ))}
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {activeWidgets.length} widget{activeWidgets.length > 1 ? 's' : ''} actif{activeWidgets.length > 1 ? 's' : ''}
                </span>
            </div>

            {/* Catalogue de widgets (mode édition) */}
            {showCatalog && (
                <div className="card" style={{ marginBottom: 'var(--space-5)', border: '2px solid var(--kd-copper-glow)' }}>
                    <div className="card-header">
                        <h3>📦 Catalogue de widgets</h3>
                        <button className="btn btn-ghost btn-sm" onClick={() => setShowCatalog(false)}><X size={14} /></button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
                        {WIDGET_CATALOG.map(widget => {
                            const isActive = activeWidgets.includes(widget.id);
                            const IconComp = widget.icon;
                            return (
                                <div key={widget.id}
                                    onClick={() => toggleWidget(widget.id)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                        padding: 'var(--space-3)', borderRadius: 'var(--radius-md)',
                                        background: isActive ? 'rgba(200,121,65,0.1)' : 'var(--bg-tertiary)',
                                        border: `1px solid ${isActive ? 'var(--kd-copper)' : 'var(--border-primary)'}`,
                                        cursor: 'pointer', transition: 'all 0.15s',
                                    }}
                                >
                                    <div style={{
                                        width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                                        background: isActive ? 'var(--kd-copper)' : 'var(--bg-secondary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <IconComp size={16} style={{ color: isActive ? 'white' : 'var(--text-muted)' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 12, fontWeight: 500 }}>{widget.title}</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{widget.category} • {widget.size === 'sm' ? 'Petit' : widget.size === 'md' ? 'Moyen' : 'Grand'}</div>
                                    </div>
                                    <div style={{
                                        width: 20, height: 20, borderRadius: 4,
                                        border: `2px solid ${isActive ? 'var(--kd-copper)' : 'var(--border-secondary)'}`,
                                        background: isActive ? 'var(--kd-copper)' : 'transparent',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {isActive && <Check size={12} style={{ color: 'white' }} />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Grille des KPI widgets */}
            {kpiWidgets.length > 0 && (
                <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                    {kpiWidgets.map((widgetId, idx) => {
                        const widget = WIDGET_CATALOG.find(w => w.id === widgetId);
                        const IconComp = widget.icon;
                        return (
                            <div key={widgetId} className="stat-card copper" style={{ position: 'relative' }}>
                                {editMode && (
                                    <div style={{
                                        position: 'absolute', top: 6, right: 6,
                                        display: 'flex', gap: 2,
                                    }}>
                                        <button className="btn btn-ghost btn-sm" style={{ padding: 2 }}
                                            onClick={() => moveWidget(activeWidgets.indexOf(widgetId), -1)}>
                                            <ArrowUpDown size={10} />
                                        </button>
                                        <button className="btn btn-ghost btn-sm" style={{ padding: 2, color: 'var(--kd-danger)' }}
                                            onClick={() => toggleWidget(widgetId)}>
                                            <X size={10} />
                                        </button>
                                    </div>
                                )}
                                <div className="stat-icon"><IconComp size={20} /></div>
                                {WIDGET_RENDERERS[widgetId](widgetId)}
                                <div className="stat-label">{widget.title}</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Grille des widgets grands et moyens */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: 'var(--space-4)',
            }}>
                {otherWidgets.map((widgetId, idx) => {
                    const widget = WIDGET_CATALOG.find(w => w.id === widgetId);
                    const IconComp = widget.icon;
                    return (
                        <div key={widgetId} className="card" style={{
                            gridColumn: widget.size === 'lg' ? 'span 1' : undefined,
                            position: 'relative',
                            border: editMode ? '2px dashed var(--border-secondary)' : undefined,
                        }}>
                            {editMode && (
                                <div style={{
                                    position: 'absolute', top: 10, right: 10,
                                    display: 'flex', gap: 4, zIndex: 2,
                                }}>
                                    <button className="btn btn-ghost btn-sm" style={{ padding: '2px 4px' }}
                                        onClick={() => moveWidget(activeWidgets.indexOf(widgetId), -1)}>
                                        ↑
                                    </button>
                                    <button className="btn btn-ghost btn-sm" style={{ padding: '2px 4px' }}
                                        onClick={() => moveWidget(activeWidgets.indexOf(widgetId), 1)}>
                                        ↓
                                    </button>
                                    <button className="btn btn-ghost btn-sm" style={{ padding: '2px 4px', color: 'var(--kd-danger)' }}
                                        onClick={() => toggleWidget(widgetId)}>
                                        <X size={12} />
                                    </button>
                                </div>
                            )}
                            <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    {editMode && <Grip size={14} style={{ color: 'var(--text-muted)', cursor: 'grab' }} />}
                                    <IconComp size={16} style={{ color: 'var(--kd-copper-light)' }} />
                                    <h3 style={{ fontSize: 14, fontWeight: 600 }}>{widget.title}</h3>
                                </div>
                            </div>
                            {WIDGET_RENDERERS[widgetId](widgetId)}
                        </div>
                    );
                })}
            </div>

            {activeWidgets.length === 0 && (
                <div style={{
                    textAlign: 'center', padding: 'var(--space-8)',
                    color: 'var(--text-muted)',
                }}>
                    <LayoutDashboard size={48} strokeWidth={1} style={{ marginBottom: 'var(--space-3)', opacity: 0.3 }} />
                    <p style={{ fontSize: 15 }}>Aucun widget sélectionné</p>
                    <p style={{ fontSize: 12, marginBottom: 'var(--space-4)' }}>Cliquez sur "Personnaliser" puis "Ajouter un widget" pour commencer</p>
                    <button className="btn btn-primary" onClick={() => { setEditMode(true); setShowCatalog(true); }}>
                        <Plus size={14} /> Ajouter des widgets
                    </button>
                </div>
            )}
        </div>
    );
}
