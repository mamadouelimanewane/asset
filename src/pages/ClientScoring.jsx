import { useState } from 'react';
import {
    Users, Star, TrendingUp, TrendingDown, AlertTriangle,
    Award, Target, Clock, DollarSign, Activity, Eye,
    Filter, ChevronDown, ArrowUpRight, ArrowDownRight,
    Heart, UserPlus, Phone, Mail, BarChart3, Zap
} from 'lucide-react';
import { clients } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

/* ── Scoring enrichi pour chaque client ── */
const clientScores = [
    {
        clientId: 'C001', name: 'Aminata Sow', aum: 2_450_000,
        profitability: 78, growth: 65, engagement: 82, referral: 45, retention: 70,
        overallScore: 72, tier: 'Silver',
        revenue: 20_825, costToServe: 4_200, lastLogin: '2025-02-22', loginFreq: 12,
        meetingsYTD: 3, emailsOpened: 85, referralsGiven: 1,
        riskFlags: ['Portefeuille surexposé en actions (75% vs 60% cible)'],
        opportunities: ['Augmenter les versements 529 pour les enfants'],
        trend: 'up',
    },
    {
        clientId: 'C002', name: 'Ousmane N\'Diaye', aum: 5_800_000,
        profitability: 92, growth: 88, engagement: 95, referral: 90, retention: 96,
        overallScore: 93, tier: 'Gold',
        revenue: 43_500, costToServe: 5_100, lastLogin: '2025-02-21', loginFreq: 22,
        meetingsYTD: 5, emailsOpened: 95, referralsGiven: 3,
        riskFlags: [],
        opportunities: ['Présenter la planification successorale avancée', 'Proposer les investissements alternatifs'],
        trend: 'up',
    },
    {
        clientId: 'C003', name: 'Fatou Diop Industries', aum: 18_500_000,
        profitability: 96, growth: 72, engagement: 68, referral: 55, retention: 88,
        overallScore: 82, tier: 'Gold',
        revenue: 120_250, costToServe: 12_000, lastLogin: '2025-02-15', loginFreq: 6,
        meetingsYTD: 4, emailsOpened: 60, referralsGiven: 1,
        riskFlags: ['Engagement en baisse — connexions portail en recul de 30%'],
        opportunities: ['Revue stratégique de la trésorerie d\'entreprise', 'Migration vers le cash haut rendement'],
        trend: 'stable',
    },
    {
        clientId: 'C004', name: 'Ibrahima Fall', aum: 1_200_000,
        profitability: 42, growth: 50, engagement: 55, referral: 20, retention: 60,
        overallScore: 46, tier: 'Bronze',
        revenue: 6_000, costToServe: 3_800, lastLogin: '2025-02-10', loginFreq: 4,
        meetingsYTD: 1, emailsOpened: 50, referralsGiven: 0,
        riskFlags: ['Ratio coût/revenu élevé (63%)', 'Faible engagement'],
        opportunities: ['Proposer une formation via le centre éducatif'],
        trend: 'down',
    },
    {
        clientId: 'C005', name: 'Aissatou Konaté', aum: 890_000,
        profitability: 35, growth: 20, engagement: 15, referral: 10, retention: 25,
        overallScore: 22, tier: 'Bronze',
        revenue: 4_450, costToServe: 3_200, lastLogin: '2024-12-01', loginFreq: 0,
        meetingsYTD: 0, emailsOpened: 20, referralsGiven: 0,
        riskFlags: ['⚠️ Risque d\'attrition élevé — inactive depuis 83 jours', 'Aucune connexion portail ce trimestre'],
        opportunities: ['Appel de réengagement urgent'],
        trend: 'down',
    },
    {
        clientId: 'C006', name: 'Fondation Modou Gueye', aum: 35_000_000,
        profitability: 98, growth: 85, engagement: 90, referral: 70, retention: 95,
        overallScore: 91, tier: 'Platinum',
        revenue: 192_500, costToServe: 15_000, lastLogin: '2025-02-19', loginFreq: 18,
        meetingsYTD: 6, emailsOpened: 92, referralsGiven: 2,
        riskFlags: [],
        opportunities: ['Proposer le fonds orienté donateur (DAF) supplémentaire', 'Revue successorale du dirigeant'],
        trend: 'up',
    },
    {
        clientId: 'C007', name: 'Cheikh K. Ba', aum: 3_750_000,
        profitability: 85, growth: 92, engagement: 88, referral: 75, retention: 85,
        overallScore: 86, tier: 'Gold',
        revenue: 30_000, costToServe: 4_500, lastLogin: '2025-02-21', loginFreq: 20,
        meetingsYTD: 4, emailsOpened: 88, referralsGiven: 2,
        riskFlags: [],
        opportunities: ['Transfert ACAT en cours — préparer l\'allocation post-transfert'],
        trend: 'up',
    },
    {
        clientId: 'C008', name: 'Mariama Tall', aum: 950_000,
        profitability: 45, growth: 60, engagement: 70, referral: 30, retention: 72,
        overallScore: 56, tier: 'Silver',
        revenue: 4_750, costToServe: 3_000, lastLogin: '2025-01-28', loginFreq: 5,
        meetingsYTD: 1, emailsOpened: 65, referralsGiven: 0,
        riskFlags: ['Nouvelle cliente — surveiller l\'intégration'],
        opportunities: ['Proposer l\'ajout d\'un IRA pour la diversification fiscale'],
        trend: 'up',
    },
];

const tierConfig = {
    Platinum: { color: '#E5E7EB', bg: 'linear-gradient(135deg, #1a1a2e, #374151)', icon: '💎', min: 90 },
    Gold: { color: '#FBBF24', bg: 'linear-gradient(135deg, #451a03, #78350f)', icon: '🥇', min: 75 },
    Silver: { color: '#94A3B8', bg: 'linear-gradient(135deg, #1e293b, #334155)', icon: '🥈', min: 50 },
    Bronze: { color: '#C87941', bg: 'linear-gradient(135deg, #1c1917, #44403c)', icon: '🥉', min: 0 },
};

function ScoreRadar({ scores, size = 140 }) {
    const dims = [
        { key: 'profitability', label: 'Rentabilité', angle: -90 },
        { key: 'growth', label: 'Croissance', angle: -18 },
        { key: 'engagement', label: 'Engagement', angle: 54 },
        { key: 'referral', label: 'Parrainage', angle: 126 },
        { key: 'retention', label: 'Rétention', angle: 198 },
    ];
    const cx = size / 2, cy = size / 2, r = size / 2 - 20;
    const toXY = (angle, val) => ({
        x: cx + r * (val / 100) * Math.cos(angle * Math.PI / 180),
        y: cy + r * (val / 100) * Math.sin(angle * Math.PI / 180),
    });
    const points = dims.map(d => toXY(d.angle, scores[d.key]));
    const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

    return (
        <svg width={size} height={size} style={{ display: 'block', margin: '0 auto' }}>
            {[20, 40, 60, 80, 100].map(level => {
                const pts = dims.map(d => toXY(d.angle, level));
                return <polygon key={level} points={pts.map(p => `${p.x},${p.y}`).join(' ')}
                    fill="none" stroke="var(--border-primary)" strokeWidth={0.5} opacity={0.4} />;
            })}
            {dims.map(d => {
                const end = toXY(d.angle, 100);
                return <line key={d.key} x1={cx} y1={cy} x2={end.x} y2={end.y}
                    stroke="var(--border-primary)" strokeWidth={0.5} opacity={0.3} />;
            })}
            <polygon points={points.map(p => `${p.x},${p.y}`).join(' ')}
                fill="rgba(200,121,65,0.15)" stroke="var(--kd-copper)" strokeWidth={1.5} />
            {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={3} fill="var(--kd-copper)" />
            ))}
            {dims.map(d => {
                const lbl = toXY(d.angle, 120);
                return <text key={d.key} x={lbl.x} y={lbl.y} textAnchor="middle" dominantBaseline="middle"
                    fontSize={8} fill="var(--text-muted)">{d.label}</text>;
            })}
        </svg>
    );
}

export default function ClientScoring() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedClient, setSelectedClient] = useState(null);
    const [sortBy, setSortBy] = useState('overallScore');
    const [sortDir, setSortDir] = useState('desc');
    const [filterTier, setFilterTier] = useState('all');

    const sorted = [...clientScores]
        .filter(c => filterTier === 'all' || c.tier === filterTier)
        .sort((a, b) => sortDir === 'desc' ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy]);

    const avgScore = Math.round(clientScores.reduce((s, c) => s + c.overallScore, 0) / clientScores.length);
    const atRisk = clientScores.filter(c => c.retention < 40).length;
    const totalRevenue = clientScores.reduce((s, c) => s + c.revenue, 0);
    const avgROI = Math.round(totalRevenue / clientScores.reduce((s, c) => s + c.costToServe, 0) * 100) / 100;

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Scoring & segmentation</h1>
                    <p>Analyse multi-dimensionnelle de la valeur, l'engagement et le potentiel de chaque client</p>
                </div>
                <div className="btn-group">
                    <button className="btn btn-primary">
                        <Zap size={14} /> Recalculer les scores
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper">
                    <div className="stat-icon"><Award size={20} /></div>
                    <div className="stat-value">{avgScore}/100</div>
                    <div className="stat-label">Score moyen</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><DollarSign size={20} /></div>
                    <div className="stat-value">{formatCurrency(totalRevenue, true)}</div>
                    <div className="stat-label">Revenu total clients</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-value">{avgROI}x</div>
                    <div className="stat-label">ROI moyen (revenu/coût)</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><AlertTriangle size={20} /></div>
                    <div className="stat-value">{atRisk}</div>
                    <div className="stat-label">Clients à risque d'attrition</div>
                </div>
            </div>

            {/* Segmentation visuelle par tier */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)',
                marginBottom: 'var(--space-5)',
            }}>
                {Object.entries(tierConfig).map(([tier, config]) => {
                    const count = clientScores.filter(c => c.tier === tier).length;
                    const tierAUM = clientScores.filter(c => c.tier === tier).reduce((s, c) => s + c.aum, 0);
                    const isActive = filterTier === tier;
                    return (
                        <div key={tier}
                            onClick={() => setFilterTier(filterTier === tier ? 'all' : tier)}
                            style={{
                                padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)',
                                background: config.bg, cursor: 'pointer', textAlign: 'center',
                                border: isActive ? `2px solid ${config.color}` : '2px solid transparent',
                                transition: 'all 0.2s',
                            }}>
                            <div style={{ fontSize: 28 }}>{config.icon}</div>
                            <div style={{ fontSize: 16, fontWeight: 700, color: config.color, marginTop: 4 }}>{tier}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Score ≥ {config.min}</div>
                            <div style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>{count}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                {formatCurrency(tierAUM, true)} AUM
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Onglets */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['overview', 'Classement'], ['radar', 'Analyse radar'], ['alerts', 'Alertes & Opportunités']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {/* CLASSEMENT */}
            {activeTab === 'overview' && (
                <div className="card">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Client</th>
                                <th>Tier</th>
                                <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('overallScore'); setSortDir(d => d === 'desc' ? 'asc' : 'desc'); }}>
                                    Score global {sortBy === 'overallScore' && (sortDir === 'desc' ? '↓' : '↑')}
                                </th>
                                <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('profitability'); setSortDir(d => d === 'desc' ? 'asc' : 'desc'); }}>
                                    Rentabilité {sortBy === 'profitability' && (sortDir === 'desc' ? '↓' : '↑')}
                                </th>
                                <th style={{ cursor: 'pointer' }} onClick={() => { setSortBy('engagement'); setSortDir(d => d === 'desc' ? 'asc' : 'desc'); }}>
                                    Engagement {sortBy === 'engagement' && (sortDir === 'desc' ? '↓' : '↑')}
                                </th>
                                <th>Tendance</th>
                                <th>AUM</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sorted.map((c, i) => {
                                const tc = tierConfig[c.tier];
                                return (
                                    <tr key={c.clientId} onClick={() => setSelectedClient(c)} style={{ cursor: 'pointer' }}>
                                        <td style={{ fontWeight: 700, color: 'var(--text-muted)' }}>#{i + 1}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                <span style={{ fontWeight: 500 }}>{c.name}</span>
                                                {c.riskFlags.length > 0 && <AlertTriangle size={12} style={{ color: 'var(--kd-warning)' }} />}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                fontSize: 11, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                                border: `1px solid ${tc.color}40`, color: tc.color, fontWeight: 600,
                                            }}>{tc.icon} {c.tier}</span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                <div style={{
                                                    width: 50, height: 6, borderRadius: 3, background: 'var(--bg-tertiary)',
                                                }}>
                                                    <div style={{
                                                        width: `${c.overallScore}%`, height: '100%', borderRadius: 3,
                                                        background: c.overallScore >= 75 ? 'var(--kd-success)' : c.overallScore >= 50 ? 'var(--kd-warning)' : 'var(--kd-danger)',
                                                    }} />
                                                </div>
                                                <span style={{ fontWeight: 700, fontSize: 14 }}>{c.overallScore}</span>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: 600, fontSize: 13 }}>{c.profitability}</td>
                                        <td style={{ fontWeight: 600, fontSize: 13 }}>{c.engagement}</td>
                                        <td>
                                            {c.trend === 'up' && <ArrowUpRight size={16} style={{ color: 'var(--kd-success)' }} />}
                                            {c.trend === 'down' && <ArrowDownRight size={16} style={{ color: 'var(--kd-danger)' }} />}
                                            {c.trend === 'stable' && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>→</span>}
                                        </td>
                                        <td style={{ fontWeight: 600, color: 'var(--kd-copper-light)', fontVariantNumeric: 'tabular-nums' }}>
                                            {formatCurrency(c.aum, true)}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}><Phone size={12} /></button>
                                                <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}><Mail size={12} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* RADAR */}
            {activeTab === 'radar' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                    {sorted.map(c => {
                        const tc = tierConfig[c.tier];
                        return (
                            <div key={c.clientId} className="card" style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => setSelectedClient(c)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                                    <h4 style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</h4>
                                    <span style={{
                                        fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                        border: `1px solid ${tc.color}40`, color: tc.color, fontWeight: 600,
                                    }}>{tc.icon} {c.tier}</span>
                                </div>
                                <ScoreRadar scores={c} />
                                <div style={{
                                    fontSize: 24, fontWeight: 800, marginTop: 'var(--space-2)',
                                    color: c.overallScore >= 75 ? 'var(--kd-success)' : c.overallScore >= 50 ? 'var(--kd-warning)' : 'var(--kd-danger)',
                                }}>{c.overallScore}/100</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Score global</div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ALERTES & OPPORTUNITÉS */}
            {activeTab === 'alerts' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header"><h3>⚠️ Alertes et risques</h3></div>
                        {clientScores.filter(c => c.riskFlags.length > 0).map(c => (
                            <div key={c.clientId} style={{ marginBottom: 'var(--space-4)' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                                    {c.name}
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>Score: {c.overallScore}</span>
                                </div>
                                {c.riskFlags.map((flag, i) => (
                                    <div key={i} style={{
                                        padding: 'var(--space-2) var(--space-3)', marginBottom: 4,
                                        background: 'rgba(239,68,68,0.06)', borderRadius: 'var(--radius-sm)',
                                        borderLeft: '3px solid var(--kd-danger)', fontSize: 12, color: 'var(--text-secondary)',
                                    }}>
                                        {flag}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <div className="card-header"><h3>💡 Opportunités</h3></div>
                        {clientScores.filter(c => c.opportunities.length > 0).map(c => (
                            <div key={c.clientId} style={{ marginBottom: 'var(--space-4)' }}>
                                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                                    {c.name}
                                    <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>AUM: {formatCurrency(c.aum, true)}</span>
                                </div>
                                {c.opportunities.map((opp, i) => (
                                    <div key={i} style={{
                                        padding: 'var(--space-2) var(--space-3)', marginBottom: 4,
                                        background: 'rgba(52,211,153,0.06)', borderRadius: 'var(--radius-sm)',
                                        borderLeft: '3px solid var(--kd-success)', fontSize: 12, color: 'var(--text-secondary)',
                                    }}>
                                        {opp}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal détails client */}
            {selectedClient && (
                <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 550 }}>
                        <div className="modal-header">
                            <h3>{selectedClient.name}</h3>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedClient(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                                <ScoreRadar scores={selectedClient} size={180} />
                                <div style={{ fontSize: 28, fontWeight: 800, color: selectedClient.overallScore >= 75 ? 'var(--kd-success)' : selectedClient.overallScore >= 50 ? 'var(--kd-warning)' : 'var(--kd-danger)' }}>
                                    {selectedClient.overallScore}/100
                                </div>
                                <span style={{
                                    fontSize: 12, padding: '3px 12px', borderRadius: 'var(--radius-full)',
                                    border: `1px solid ${tierConfig[selectedClient.tier].color}40`,
                                    color: tierConfig[selectedClient.tier].color, fontWeight: 600,
                                }}>{tierConfig[selectedClient.tier].icon} {selectedClient.tier}</span>
                            </div>

                            <div className="grid-2" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                                {[
                                    ['Revenu annuel', formatCurrency(selectedClient.revenue)],
                                    ['Coût de service', formatCurrency(selectedClient.costToServe)],
                                    ['ROI', `${(selectedClient.revenue / selectedClient.costToServe).toFixed(1)}x`],
                                    ['Connexions/mois', selectedClient.loginFreq],
                                    ['RDV cette année', selectedClient.meetingsYTD],
                                    ['Emails ouverts', `${selectedClient.emailsOpened}%`],
                                    ['Parrainages', selectedClient.referralsGiven],
                                    ['Dernière connexion', new Date(selectedClient.lastLogin).toLocaleDateString('fr-FR')],
                                ].map(([label, value]) => (
                                    <div key={label} style={{ padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</div>
                                        <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 4, marginBottom: 'var(--space-4)' }}>
                                {[
                                    ['Rent.', selectedClient.profitability],
                                    ['Crois.', selectedClient.growth],
                                    ['Engag.', selectedClient.engagement],
                                    ['Parr.', selectedClient.referral],
                                    ['Rétent.', selectedClient.retention],
                                ].map(([label, val]) => (
                                    <div key={label} style={{ textAlign: 'center', padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: val >= 75 ? 'var(--kd-success)' : val >= 50 ? 'var(--kd-warning)' : 'var(--kd-danger)' }}>{val}</div>
                                        <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedClient(null)}>Fermer</button>
                            <button className="btn btn-primary"><Phone size={13} /> Contacter</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
