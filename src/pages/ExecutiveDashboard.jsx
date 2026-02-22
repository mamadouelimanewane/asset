import { useState, useMemo } from 'react';
import {
    Crown, TrendingUp, DollarSign, Users, Activity,
    BarChart3, PieChart, ArrowUpRight, ArrowDownRight,
    Globe, Target, CheckCircle, AlertTriangle, Zap, Calendar,
    Building2, Network, ShieldCheck, Briefcase
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ComposedChart, Bar, Line, Legend, Doughnut, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { formatCurrency, formatPercent } from '../utils/helpers';

const AUM_REVENUE_DATA = [
    { month: 'T1 25', aum: 48.5, rev: 0.85 },
    { month: 'T2 25', aum: 52.1, rev: 0.92 },
    { month: 'T3 25', aum: 56.8, rev: 1.05 },
    { month: 'T4 25', aum: 61.2, rev: 1.15 },
    { month: 'T1 26', aum: 68.5, rev: 1.35 },
    { month: 'T2 26 (Est)', aum: 75.0, rev: 1.50 },
];

const ASSET_ALLOCATION = [
    { name: 'Titres BRVM (Actions)', value: 45, color: '#C87941' },
    { name: 'Obligations UEMOA', value: 30, color: '#10B981' },
    { name: 'Liquidités (HYC)', value: 15, color: '#8B5CF6' },
    { name: 'Actifs Alternatifs (RWA)', value: 10, color: '#F59E0B' },
];

const FIRM_RISK_PROFILE = [
    { subject: 'Liquidité', A: 120, fullMark: 150 },
    { subject: 'Crédit (Contrepartie)', A: 98, fullMark: 150 },
    { subject: 'Marché (Volatilité)', A: 86, fullMark: 150 },
    { subject: 'Opérationnel', A: 45, fullMark: 150 },
    { subject: 'Réglementaire (CREPMF)', A: 30, fullMark: 150 },
    { subject: 'Cyber-Sécurité', A: 65, fullMark: 150 },
];

export default function ExecutiveDashboard() {
    const [timeframe, setTimeframe] = useState('YTD');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #451a03, #78350f)', border: '1px solid #d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(217, 119, 6, 0.3)' }}>
                        <Crown size={22} color="#fcd34d" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Executive Command Center</h1>
                        <p style={{ marginBottom: 0 }}>Vue Consolidée Direction Générale • Actifs, Revenus & Risques</p>
                    </div>
                </div>
                <div className="btn-group">
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginRight: 16 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }}></span>
                        Données en temps réel (BRVM / API)
                    </span>
                    <button className="btn btn-secondary"><Calendar size={14} style={{ marginRight: 6 }} /> Trimestre en cours</button>
                    <button className="btn btn-primary" style={{ background: 'linear-gradient(to right, #C87941, #a35d2d)', border: 'none' }}>Générer Rapport C.A.</button>
                </div>
            </div>

            {/* TOP KPIs - FIRM WIDE */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="card-glass" style={{ borderTop: '3px solid #C87941', padding: 'var(--space-4)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Building2 size={100} /></div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>AUM Global (Actifs)</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: 'white', fontFamily: 'monospace' }}>68.5M FCFA</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: 'var(--kd-success)', fontWeight: 700 }}>
                        <TrendingUp size={16} /> +12.4% (vs T4)
                    </div>
                </div>

                <div className="card-glass" style={{ borderTop: '3px solid #10B981', padding: 'var(--space-4)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Activity size={100} /></div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Revenus Nette (YTD)</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: 'white', fontFamily: 'monospace' }}>1.35M FCFA</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: 'var(--kd-success)', fontWeight: 700 }}>
                        <TrendingUp size={16} /> +17.3% (vs T4)
                    </div>
                </div>

                <div className="card-glass" style={{ borderTop: '3px solid #8B5CF6', padding: 'var(--space-4)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Network size={100} /></div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Marge Opérationnelle</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: 'white', fontFamily: 'monospace' }}>42.8%</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: 'var(--kd-success)', fontWeight: 700 }}>
                        <CheckCircle size={16} /> Objectif: >40% atteint
                    </div>
                </div>

                <div className="card-glass" style={{ borderTop: '3px solid #F59E0B', padding: 'var(--space-4)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}><Users size={100} /></div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Clients Actifs (UHNWI)</div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: 'white', fontFamily: 'monospace' }}>142</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, fontSize: 13, color: 'var(--kd-copper-light)', fontWeight: 700 }}>
                        <Briefcase size={16} /> NNA: +8.2M FCFA (Nouveaux capitaux)
                    </div>
                </div>
            </div>

            <div className="grid-2-1" style={{ marginBottom: 'var(--space-5)' }}>
                {/* Evolution AUM / Revenus */}
                <div className="card">
                    <div className="card-header">
                        <h3>Trajectoire Financière : AUM & Revenus Consolidés</h3>
                    </div>
                    <div style={{ height: 320, marginTop: 'var(--space-4)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={AUM_REVENUE_DATA}>
                                <defs>
                                    <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#C87941" stopOpacity={0.2} />
                                        <stop offset="100%" stopColor="#C87941" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="left" stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${v}M`} tickLine={false} axisLine={false} />
                                <YAxis yAxisId="right" orientation="right" stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${v}M`} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid var(--border-primary)', borderRadius: 8 }} />
                                <Legend wrapperStyle={{ paddingTop: 20, fontSize: 12 }} />
                                <Area yAxisId="left" type="monotone" dataKey="aum" name="AUM (Actifs sous gestion)" fill="url(#aumGrad)" stroke="#C87941" strokeWidth={3} />
                                <Bar yAxisId="right" dataKey="rev" name="Revenus Générés (Fees)" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Radar Risque Macro */}
                <div className="card">
                    <div className="card-header">
                        <h3>Empreinte de Risque (Global Firm)</h3>
                    </div>
                    <div style={{ height: 250, marginTop: 'var(--space-2)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={FIRM_RISK_PROFILE}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="Exposition de la Firme" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'rgba(16, 185, 129, 0.05)', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(16, 185, 129, 0.3)' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}><ShieldCheck size={14} /> Stress Test "Black Swan" validé</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>La firme est résiliente à une chute de 30% des marchés actions BRVM. Liquidité robuste.</div>
                    </div>
                </div>
            </div>

            <div className="grid-3">
                {/* Allocation globale */}
                <div className="card">
                    <div className="card-header"><h3>Allocation des Actifs (Tous Portefeuilles)</h3></div>
                    <div style={{ display: 'flex', alignItems: 'center', height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={ASSET_ALLOCATION} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                                    {ASSET_ALLOCATION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: '#0a0e17', border: 'none', borderRadius: 8, fontSize: 12 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {ASSET_ALLOCATION.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                                    <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                                </div>
                                <div style={{ fontWeight: 700 }}>{item.value}%</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Objectifs / OKRs Strategiques */}
                <div className="card">
                    <div className="card-header"><h3>Objectifs Stratégiques (OKRs Q1)</h3></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                        {[
                            { title: 'Ouverture Bureau Abidjan', progress: 85, color: '#10B981', status: 'En bonne voie' },
                            { title: 'Agrément OPCVM (CREPMF)', progress: 60, color: '#F59E0B', status: 'En attente retour' },
                            { title: 'Mise en prod du Token Immobilier (RWA)', progress: 100, color: '#8B5CF6', status: 'Déployé' },
                            { title: 'Recrutement 2 Banquiers Privés Senior', progress: 25, color: '#EF4444', status: 'Retard' },
                        ].map((okr, idx) => (
                            <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                                    <span style={{ fontWeight: 600 }}>{okr.title}</span>
                                    <span style={{ color: okr.color, fontWeight: 700 }}>{okr.progress}%</span>
                                </div>
                                <div className="progress-bar" style={{ height: 6, background: 'var(--bg-tertiary)' }}>
                                    <div className="progress-fill" style={{ width: `${okr.progress}%`, background: okr.color, borderRadius: 3 }} />
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Statut: {okr.status}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* IA CEO Copilot */}
                <div className="card" style={{ border: '1px solid rgba(200, 121, 65, 0.4)', background: 'linear-gradient(180deg, rgba(200, 121, 65, 0.05) 0%, transparent 100%)' }}>
                    <div className="card-header" style={{ borderBottom: '1px solid rgba(200, 121, 65, 0.2)', paddingBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--kd-copper-light)' }}><Zap size={18} fill="var(--kd-copper-light)" /> CEO Copilot — Diambar AI</h3>
                    </div>
                    <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        <div style={{ padding: 'var(--space-3)', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--kd-success)' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Opportunité d'Upsell Détectée</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>Les réserves de liquidité du <strong>Groupe Seck</strong> ont doublé le mois dernier (1.2M FCFA inutilisés). Déclenchez la proposition "Dette Privée Africaine" (Taux: 9.5%). Probabilité de conversion: 88%.</div>
                            <button className="btn btn-primary btn-sm" style={{ marginTop: 8, padding: '4px 12px', fontSize: 10 }}>Générer le mandat automatisé</button>
                        </div>

                        <div style={{ padding: 'var(--space-3)', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #EF4444' }}>
                            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Alerte Churn (Risque Départ)</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>M. N'Diaye n'a pas ouvert ses 3 derniers rapports de performance et a retiré 50k$ la semaine dernière.</div>
                            <button className="btn btn-secondary btn-sm" style={{ marginTop: 8, padding: '4px 12px', fontSize: 10 }}>Planifier un déjeuner urgemment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
