import {
    TrendingUp, Users, DollarSign, UserPlus, BarChart3, ArrowUpRight,
    ArrowDownRight, Clock, Activity
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import {
    dashboardStats, performanceData, aumHistoryData,
    sectorAllocation, recentActivity, complianceAlerts
} from '../data/mockData';
import { formatCurrency, formatPercent } from '../utils/helpers';

const statIcons = {
    'Total AUM': TrendingUp,
    'Active Clients': Users,
    'Annual Revenue': DollarSign,
    'New Accounts (MTD)': UserPlus,
    'Avg Return (YTD)': BarChart3,
    'Pending Transfers': Clock,
};

const statLabels = {
    'Total AUM': 'AUM Total',
    'Active Clients': 'Clients actifs',
    'Annual Revenue': 'Revenu annuel',
    'New Accounts (MTD)': 'Nouveaux comptes (mois)',
    'Avg Return (YTD)': 'Rendement moy. (YTD)',
    'Pending Transfers': 'Transferts en attente',
};

const statColors = ['copper', 'diamond', 'success', 'warning', 'copper', 'diamond'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                fontSize: '12px',
            }}>
                <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: 4 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color }}>
                        {p.name}: {typeof p.value === 'number' && p.name.includes('AUM')
                            ? `${p.value}M $`
                            : `${p.value}%`
                        }
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Dashboard() {
    const stats = Object.values(dashboardStats);

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Bienvenue, Moussa 👋</h1>
                    <p>Voici ce qui se passe avec votre portefeuille aujourd'hui.</p>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary btn-sm">
                        <Clock size={14} /> 30 derniers jours
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <Activity size={14} /> Générer un rapport
                    </button>
                </div>
            </div>

            {/* Cartes KPI */}
            <div className="stat-grid">
                {stats.map((stat, i) => {
                    const Icon = statIcons[stat.label];
                    return (
                        <div key={stat.label} className={`stat-card ${statColors[i]}`}>
                            <div className="stat-icon">
                                {Icon && <Icon size={20} />}
                            </div>
                            <div className="stat-value">
                                {stat.label.includes('AUM') ? formatCurrency(stat.value, true) :
                                    stat.label.includes('Revenue') ? formatCurrency(stat.value, true) :
                                        stat.label.includes('Return') ? `${stat.value}%` :
                                            stat.value}
                            </div>
                            <div className="stat-label">{statLabels[stat.label] || stat.label}</div>
                            {stat.change !== 0 && (
                                <div className={`stat-change ${stat.change >= 0 ? 'positive' : 'negative'}`}>
                                    {stat.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                    {formatPercent(stat.change)}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Graphiques */}
            <div className="grid-2" style={{ marginBottom: 'var(--space-4)' }}>
                {/* Historique AUM */}
                <div className="card">
                    <div className="card-header">
                        <h3>Croissance des AUM</h3>
                        <button className="card-action">12 mois</button>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={aumHistoryData}>
                                <defs>
                                    <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#C87941" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#C87941" stopOpacity={0.02} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={(v) => `${v}M $`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="aum"
                                    name="AUM"
                                    stroke="#C87941"
                                    strokeWidth={2.5}
                                    fill="url(#aumGrad)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Performance vs Benchmark */}
                <div className="card">
                    <div className="card-header">
                        <h3>Performance vs Référence</h3>
                        <button className="card-action">YTD</button>
                    </div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={(v) => `${v}%`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{ fontSize: 11, color: 'var(--text-secondary)' }}
                                />
                                <Bar dataKey="portfolio" name="Portefeuille" fill="#C87941" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="benchmark" name="Référence" fill="#7EB8DA" radius={[4, 4, 0, 0]} opacity={0.6} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Ligne du bas */}
            <div className="grid-2-1">
                {/* Activité récente */}
                <div className="card">
                    <div className="card-header">
                        <h3>Activité récente</h3>
                        <button className="card-action">Tout voir</button>
                    </div>
                    <div className="timeline">
                        {recentActivity.slice(0, 6).map((item) => (
                            <div key={item.id} className="timeline-item">
                                <div className="timeline-dot" />
                                <div className="timeline-content">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                            <span style={{ marginRight: 6 }}>{item.icon}</span>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="timeline-time">{item.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Allocation sectorielle + Alertes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div className="card">
                        <div className="card-header">
                            <h3>Allocation sectorielle</h3>
                        </div>
                        <div style={{ height: 200 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sectorAllocation}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {sectorAllocation.map((entry, i) => (
                                            <Cell key={i} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                        contentStyle={{
                                            background: 'var(--bg-elevated)',
                                            border: '1px solid var(--border-secondary)',
                                            borderRadius: 8,
                                            fontSize: 12,
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                            {sectorAllocation.map((s) => (
                                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                                    <span style={{
                                        width: 8, height: 8, borderRadius: 2, background: s.color
                                    }} />
                                    <span style={{ color: 'var(--text-tertiary)' }}>{s.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Alertes de conformité</h3>
                            <span className="badge badge-warning">3</span>
                        </div>
                        {complianceAlerts.map((alert) => (
                            <div key={alert.id} style={{
                                padding: 'var(--space-3)',
                                background: alert.type === 'warning' ? 'var(--kd-warning-bg)' :
                                    alert.type === 'success' ? 'var(--kd-success-bg)' : 'var(--kd-info-bg)',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: 'var(--space-2)',
                                borderLeft: `3px solid ${alert.type === 'warning' ? 'var(--kd-warning)' :
                                        alert.type === 'success' ? 'var(--kd-success)' : 'var(--kd-info)'
                                    }`,
                            }}>
                                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                                    {alert.title}
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                                    {alert.description}
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                                    {alert.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
