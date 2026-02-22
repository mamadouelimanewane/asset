import { useState } from 'react';
import {
    Briefcase, ArrowUpRight, TrendingUp, Presentation,
    CalendarCheck, Target, Filter, Star, CheckSquare, Layers
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const DEALS = [
    { id: 'DEAL-26-A', name: 'TechHub Dakar (Série A)', sector: 'Fintech', target: 2000000, raised: 1450000, irrsRate: '24%', maturity: '5-7 ans', status: 'Souscription Ouverte' },
    { id: 'DEAL-26-B', name: 'AgriCorp Casamance', sector: 'Agro-industrie', target: 5000000, raised: 5000000, irrsRate: '18%', maturity: '4 ans', status: 'Clôturé (Fermé)' },
    { id: 'DEAL-26-C', name: 'Clinique Privée Abidjan Riviera', sector: 'Santé', target: 3500000, raised: 800000, irrsRate: '15%', maturity: '8 ans', status: 'Early Bird (Privé)' },
];

const MULTIPLE_DATA = [
    { year: 'Année 1', moic: 1.0 },
    { year: 'Année 2', moic: 1.15 },
    { year: 'Année 3', moic: 1.4 },
    { year: 'Année 4', moic: 1.8 },
    { year: 'Année 5', moic: 2.6 }, // Sortie cible
];

export default function AlternativeInvestments() {
    const [activeTab, setActiveTab] = useState('dealroom');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid #c87941', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white' }}>
                        <Briefcase size={22} color="#c87941" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Private Equity & Deal Room</h1>
                        <p style={{ marginBottom: 0 }}>Opportunités Club Deals, Appels de fonds et gestion des illiquides.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary"><Filter size={14} style={{ marginRight: 6 }} /> Filtrer les deals</button>
                    <button className="btn btn-primary">Nouveau Club Deal</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper)' }}>
                    <div className="stat-icon"><Briefcase size={20} /></div>
                    <div className="stat-value">12.5M FCFA</div>
                    <div className="stat-label">Déployé (Capital Appelé)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="stat-icon"><TrendingUp size={20} color="#10b981" /></div>
                    <div className="stat-value" style={{ color: '#10b981' }}>22.4%</div>
                    <div className="stat-label">TRI Moyen Global (Cible)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                    <div className="stat-icon"><Target size={20} color="#8b5cf6" /></div>
                    <div className="stat-value">2.4x</div>
                    <div className="stat-label">MOIC (Multiple sur Investi)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="stat-icon"><CalendarCheck size={20} color="#f59e0b" /></div>
                    <div className="stat-value">1</div>
                    <div className="stat-label">Appel de fonds en attente</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['dealroom', '🤝 Deal Room (Opportunités)'], ['portfolio', '📈 Portefeuille Actif (TRI/MOIC)'], ['capital', '💸 Appels de Fonds & Dist.']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'dealroom' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
                    {DEALS.map(deal => {
                        const progress = (deal.raised / deal.target) * 100;
                        const isOpen = deal.status.includes('Ouverte') || deal.status.includes('Early');
                        return (
                            <div key={deal.id} className="card" style={{ padding: 0, overflow: 'hidden', borderTop: isOpen ? '4px solid var(--kd-copper)' : '4px solid var(--border-primary)', opacity: isOpen ? 1 : 0.7 }}>
                                <div style={{ padding: 'var(--space-4)', position: 'relative' }}>
                                    {deal.status.includes('Early') && <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg, #f59e0b, #d97706)', padding: '4px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: 4 }}><Star size={10} /> EARLY BIRD</div>}
                                    <div style={{ fontSize: 12, color: 'var(--kd-copper-light)', fontWeight: 700, marginBottom: 4 }}>{deal.sector}</div>
                                    <h3 style={{ fontSize: 18, marginBottom: 16, paddingRight: 80 }}>{deal.name}</h3>

                                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 20 }}>
                                        <div>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>TRI Cible</div>
                                            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--kd-success)' }}>{deal.irrsRate}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Horizon (Sortie)</div>
                                            <div style={{ fontSize: 14, fontWeight: 700 }}>{deal.maturity}</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
                                            <span>Levée : {formatCurrency(deal.raised, true)}</span>
                                            <span style={{ fontWeight: 700, color: 'white' }}>{formatCurrency(deal.target, true)}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${progress}%`, background: isOpen ? 'var(--kd-copper)' : 'var(--border-primary)' }} />
                                        </div>
                                        <div style={{ fontSize: 11, textAlign: 'right', marginTop: 4, color: 'var(--text-muted)' }}>{progress.toFixed(0)}% souscrit</div>
                                    </div>
                                </div>
                                <div style={{ background: 'var(--bg-tertiary)', padding: 'var(--space-3)', borderTop: '1px solid var(--border-primary)', display: 'flex', gap: 'var(--space-2)' }}>
                                    <button className="btn btn-secondary" style={{ flex: 1, padding: '8px', fontSize: 13 }}><Presentation size={14} style={{ marginRight: 6 }} /> Pitch Deck</button>
                                    <button className="btn btn-primary" disabled={!isOpen} style={{ flex: 1, padding: '8px', fontSize: 13 }}>S'engager</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {activeTab === 'portfolio' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Courbe en J (Évolution Modélisée du MOIC) - TechHub Dakar</h3>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                            Le Multiple on Invested Capital (MOIC) montre l'évolution de la valorisation de la startup au fil des années, de l'investissement initial à l'hypothèse de sortie au bout de 5 ans.
                        </p>
                        <div style={{ height: 280, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={MULTIPLE_DATA}>
                                    <defs>
                                        <linearGradient id="moicGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${v}x`} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid #8b5cf6', borderRadius: 8 }} />
                                    <Area type="monotone" dataKey="moic" name="Multiple (MOIC)" stroke="#8b5cf6" strokeWidth={3} fill="url(#moicGrad)" activeDot={{ r: 6, fill: '#8b5cf6' }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h3>Positions Illiquides (LP)</h3>
                        </div>
                        <table className="data-table" style={{ marginTop: 'var(--space-2)' }}>
                            <thead>
                                <tr>
                                    <th>Participation</th>
                                    <th>Capital Appelé</th>
                                    <th>Val. Estimée (NAV)</th>
                                    <th>TRI Brut</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>AgriCorp Casamance</td>
                                    <td style={{ fontFamily: 'monospace' }}>250K FCFA</td>
                                    <td style={{ fontFamily: 'monospace', color: 'var(--kd-success)' }}>295K FCFA</td>
                                    <td style={{ fontWeight: 700, color: 'var(--kd-success)' }}>18.0%</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Dakar Logistics Infra Fund</td>
                                    <td style={{ fontFamily: 'monospace' }}>500K FCFA</td>
                                    <td style={{ fontFamily: 'monospace', color: 'var(--kd-success)' }}>680K FCFA</td>
                                    <td style={{ fontWeight: 700, color: 'var(--kd-success)' }}>12.4%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'capital' && (
                <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f59e0b' }}>
                            <CheckSquare size={18} /> Appel de Fonds (Capital Call) en attente
                        </h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 'var(--space-3)' }}>
                        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Avis de prélèvement #CC-2026-04</div>
                                <div style={{ fontSize: 16, fontWeight: 700 }}>AgriCorp Casamance - Tranche 2/3</div>
                                <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>Date limite: 28 Février 2026 (dans 6 jours)</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 24, fontWeight: 900, fontFamily: 'monospace', color: '#f59e0b' }}>7 FCFA5,000</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Solde restant à appeler après : 1 FCFA00,000</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
                            <button className="btn btn-secondary">Télécharger la Notice (PDF)</button>
                            <button className="btn btn-primary" style={{ background: '#f59e0b', color: 'black', fontWeight: 800 }}>Autoriser le prélèvement</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
