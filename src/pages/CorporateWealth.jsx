import { useState } from 'react';
import {
    Building2, Users, Banknote, Briefcase, BarChart4, MoveUpRight, AlertCircle, PieChart
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const CASH_FORECAST = [
    { period: 'Ce mois', reserve: 450000000, ebitda: 120000000 },
    { period: 'T+1', reserve: 475000000, ebitda: 115000000 },
    { period: 'T+2', reserve: 520000000, ebitda: 130000000 },
    { period: 'T+3', reserve: 560000000, ebitda: 145000000 },
    { period: 'T+4', reserve: 510000000, ebitda: 120000000 }, // Dividendes versés
    { period: 'T+5', reserve: 535000000, ebitda: 125000000 },
];

const ESOP_PROGRAMS = [
    { id: 'ESOP-2025', desc: 'Attribution gratuite (Management)', action: 'Actions', pool: '2.5%', vesting: '4 Ans', participants: 12, status: 'Vesting' },
    { id: 'BSPCE-A', desc: 'Bons de Souscription (Tech Team)', action: 'Options', pool: '1.0%', vesting: '3 Ans', participants: 8, status: 'Exerçable' },
    { id: 'PERCO', desc: 'Plan Épargne Retraite (Global)', action: 'FCP', pool: '-', vesting: 'Retraite', participants: 145, status: 'Actif' },
];

export default function CorporateWealth() {
    const [activeTab, setActiveTab] = useState('treasury');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0f172a, #020617)', border: '1px solid #64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(100,116,139,0.3)' }}>
                        <Building2 size={22} color="#94a3b8" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Corporate Wealth & Holdings</h1>
                        <p style={{ marginBottom: 0 }}>Gestion de la trésorerie excédentaire B2B et de l'actionnariat salarié (ESOP/BSPCE).</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #64748b' }}><Briefcase size={14} style={{ marginRight: 6 }} /> Créer Plan ESOP</button>
                    <button className="btn btn-primary" style={{ background: '#334155', border: 'none' }}><Banknote size={14} style={{ marginRight: 6 }} /> Placer Excédents (TCN)</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                    <div className="stat-icon" style={{ color: '#3b82f6' }}><Banknote size={20} /></div>
                    <div className="stat-value" style={{ color: '#93c5fd' }}>450M FCFA</div>
                    <div className="stat-label">Trésorerie Oisive (Non-placée)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="stat-icon"><BarChart4 size={20} color="#10b981" /></div>
                    <div className="stat-value">6.8%</div>
                    <div className="stat-label">Rendement Tréso. (Annualisé)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper)' }}>
                    <div className="stat-icon"><Users size={20} color="var(--kd-copper)" /></div>
                    <div className="stat-value">3.5%</div>
                    <div className="stat-label">Capital dilué (Managers)</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['treasury', '💰 Trésorerie d\'Entreprise'], ['esop', '📈 Actionnariat Salarié (LTI)']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'treasury' && (
                <div className="grid-2-1">
                    <div className="card">
                        <div className="card-header">
                            <h3>Prévision IA du Cash-Flow (6 mois)</h3>
                            <span className="badge badge-success">Optimisation possible: +150M</span>
                        </div>
                        <div style={{ height: 260, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={CASH_FORECAST} margin={{ left: -10 }}>
                                    <defs>
                                        <linearGradient id="colorReserve" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="period" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${(v / 1000000)}M`} />
                                    <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid #3b82f6', borderRadius: 8 }} />
                                    <Area type="monotone" dataKey="ebitda" name="Gen. Cash (EBITDA)" stroke="#10b981" fillOpacity={0} strokeWidth={2} />
                                    <Area type="monotone" dataKey="reserve" name="Réserves Cumulées" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReserve)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(59, 130, 246, 0.4)' }}>
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#60a5fa' }}><MoveUpRight size={18} /> Opportunités de Placement Court-Terme</h3>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>L'IA recommande de placer 150M FCFA oisifs (non-nécessaires à l'exploitation) sur les supports suivants :</p>

                        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: 12, borderLeft: '3px solid #10b981' }}>
                            <div style={{ fontWeight: 800, fontSize: 13 }}>Titres de Créances Négociables (TCN) - Sonatel</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Maturité 3 mois • Rendement net : <strong style={{ color: '#10b981' }}>5.40%</strong></div>
                        </div>

                        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #60a5fa' }}>
                            <div style={{ fontWeight: 800, fontSize: 13 }}>Compte à Terme (CAT) - BOA Sénégal</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Sans risque • Blocage 6 mois • Rendement net : <strong style={{ color: '#60a5fa' }}>4.85%</strong></div>
                        </div>

                        <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)', width: '100%', background: '#3b82f6', border: 'none' }}>Exécuter l'arbitrage (150M FCFA)</button>
                    </div>
                </div>
            )}

            {activeTab === 'esop' && (
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><PieChart size={18} /> Plans d'Intéressement à Long Terme (LTI)</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Fidélisez votre top-management en les associant à la croissance de votre Holding via des vesting automatisés par Smart-Contract.</p>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Plan / Cohorte</th>
                                <th>Type de Titre</th>
                                <th>Pool Réservé</th>
                                <th>Calendrier de Vesting</th>
                                <th>Participants</th>
                                <th>Statut Légal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ESOP_PROGRAMS.map(prog => (
                                <tr key={prog.id}>
                                    <td>
                                        <div style={{ fontWeight: 800 }}>{prog.id}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{prog.desc}</div>
                                    </td>
                                    <td style={{ fontSize: 13 }}>{prog.action}</td>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#fca5a5' }}>{prog.pool}</td>
                                    <td style={{ fontSize: 13 }}>{prog.vesting} <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>(+1 an Cliff)</span></td>
                                    <td><span style={{ fontSize: 12, fontWeight: 800, padding: '4px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>👤 {prog.participants} Cadres</span></td>
                                    <td>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 4, background: prog.status === 'Vesting' ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)', color: prog.status === 'Vesting' ? '#60A5FA' : '#10B981' }}>
                                            {prog.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
