import { useState } from 'react';
import { LineChart, PieChart, Activity, TrendingUp, TrendingDown, DollarSign, Filter, Download, Zap, RefreshCw, Layers, Shield } from 'lucide-react';

const PORTFOLIO_POSITIONS = [
    { asset: 'Sonatel (SNTS)', classe: 'Actions', zone: 'BRVM', quantite: 12500, pmp: 17200, last: 19500, pnlPct: +13.37, pnlAbs: 28750000, value: 243750000, color: '#C87941' },
    { asset: 'OAT Sénégal 6.5% 2028', classe: 'Obligations', zone: 'UEMOA', quantite: 5000, pmp: 10000, last: 10150, pnlPct: +1.50, pnlAbs: 7500000, value: 50750000, color: '#7EA9C5' },
    { asset: 'FCP Emergence Actions', classe: 'Fonds Commun', zone: 'UEMOA', quantite: 3200, pmp: 25000, last: 24200, pnlPct: -3.20, pnlAbs: -2560000, value: 77440000, color: '#F87171' },
    { asset: 'Orange CI (ORAC)', classe: 'Actions', zone: 'BRVM', quantite: 8000, pmp: 11000, last: 12200, pnlPct: +10.91, pnlAbs: 9600000, value: 97600000, color: '#C87941' },
    { asset: 'USDC Yield (DeFi)', classe: 'Cash & Eq', zone: 'Global', quantite: 150000, pmp: 600, last: 605, pnlPct: +0.83, pnlAbs: 750000, value: 90750000, color: '#52B788' },
    { asset: 'Tour Sunu (RWA)', classe: 'Alternatifs', zone: 'Sénégal', quantite: 50, pmp: 500000, last: 525000, pnlPct: +5.00, pnlAbs: 1250000, value: 26250000, color: '#A78BFA' },
];

const ALLOCATION_CLASSES = [
    { name: 'Actions (BRVM)', value: 58, color: '#C87941' },
    { name: 'Obligations souveraines', value: 18, color: '#7EA9C5' },
    { name: 'Cash & Liquidités (FX / DeFi)', value: 16, color: '#52B788' },
    { name: 'Alternatifs (Immo/RWA)', value: 8, color: '#A78BFA' },
];

const PERF_HISTORY = [
    { month: 'Jan', val: 512 }, { month: 'Fév', val: 535 }, { month: 'Mar', val: 530 },
    { month: 'Avr', val: 545 }, { month: 'Mai', val: 568 }, { month: 'Juin', val: 560 },
    { month: 'Juil', val: 580 }, { month: 'Aoû', val: 586 },
];

function fmt(v) { return v.toLocaleString('fr-FR'); }

export default function PortfolioManagement() {
    const [activeTab, setActiveTab] = useState('overview');

    const totalValue = PORTFOLIO_POSITIONS.reduce((s, p) => s + p.value, 0);
    const totalPnLAbs = PORTFOLIO_POSITIONS.reduce((s, p) => s + p.pnlAbs, 0);
    const totalPnLPct = (totalPnLAbs / (totalValue - totalPnLAbs)) * 100;

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0f172a, #334155)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(15,23,42,0.4)', color: 'white' }}>
                        <Layers size={22} />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Portfolio Management System (PMS)</h1>
                        <p style={{ marginBottom: 0 }}>Gestion d'actifs · Vue PnL temps réel · Allocation multidevises & RWA</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn-ghost"><Download size={14} /> Export XLS</button>
                    <button className="btn btn-primary"><RefreshCw size={14} /> Rééquilibrage Auto</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-success)' }}>
                    <div className="stat-icon"><DollarSign size={20} /></div>
                    <div className="stat-value">{fmt(totalValue)} FCFA</div>
                    <div className="stat-label">AUM Total Géré</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper-light)' }}>
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-value" style={{ color: 'var(--kd-success)' }}>+{totalPnLPct.toFixed(2)}%</div>
                    <div className="stat-label">Performance Latente YTD</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-info)' }}>
                    <div className="stat-icon"><Activity size={20} /></div>
                    <div className="stat-value" style={{ color: 'var(--kd-success)' }}>+{fmt(totalPnLAbs)}</div>
                    <div className="stat-label">Plus-value Latente (FCFA)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #A78BFA' }}>
                    <div className="stat-icon"><Shield size={20} /></div>
                    <div className="stat-value">Faible</div>
                    <div className="stat-label">Profil de Risque (Vol. 11.2%)</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['overview', '📊 Vue d\'ensemble'], ['holdings', '📋 Positions (Holdings)'], ['analytics', '📈 Analytique & Attribution']].map(([k, l]) => (
                    <button key={k} className={`tab ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>{l}</button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="grid-2" style={{ marginBottom: 'var(--space-5)', alignItems: 'stretch' }}>
                    {/* Evolution Chart */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-header">
                            <h3>📈 Évolution des capitaux (Millions FCFA)</h3>
                            <div className="btn-group">
                                <button className="btn btn-ghost btn-sm active">YTD</button>
                                <button className="btn btn-ghost btn-sm">1 An</button>
                                <button className="btn btn-ghost btn-sm">3 Ans</button>
                            </div>
                        </div>
                        <div style={{ flex: 1, position: 'relative', marginTop: 'var(--space-4)', minHeight: 200 }}>
                            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="rgba(82, 183, 136, 0.3)" />
                                        <stop offset="100%" stopColor="rgba(82, 183, 136, 0)" />
                                    </linearGradient>
                                </defs>
                                {/* Lignes de grille horizontales */}
                                {[0, 1, 2, 3].map(i => (
                                    <line key={i} x1="20" y1={180 - i * 50} x2="590" y2={180 - i * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                ))}
                                {PERF_HISTORY.map((p, i) => (
                                    <text key={i} x={i * 80 + 20} y={198} fontSize={10} fill="rgba(255,255,255,0.4)">{p.month}</text>
                                ))}
                                <polyline
                                    points={PERF_HISTORY.map((p, i) => `${i * 80 + 30},${200 - (p.val - 500) * 2}`).join(' ')}
                                    fill="none" stroke="var(--kd-success)" strokeWidth="3"
                                />
                                <polyline
                                    points={`20,200 FCFA{PERF_HISTORY.map((p, i) => `${i * 80 + 30},${200 - (p.val - 500) * 2}`).join(' ')} 590,200`}
                                    fill="url(#chartGrad)"
                                />
                                {PERF_HISTORY.map((p, i) => (
                                    <circle key={i} cx={i * 80 + 30} cy={200 - (p.val - 500) * 2} r="4" fill="white" stroke="var(--kd-success)" strokeWidth="2" />
                                ))}
                            </svg>
                        </div>
                    </div>

                    {/* Allocation */}
                    <div className="card">
                        <div className="card-header">
                            <h3>🥧 Allocation Stratégique par Classe d'Actifs</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
                            {ALLOCATION_CLASSES.map(alloc => (
                                <div key={alloc.name}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <div style={{ width: 10, height: 10, borderRadius: '50%', background: alloc.color }} />
                                            <span style={{ fontWeight: 600, fontSize: 13 }}>{alloc.name}</span>
                                        </div>
                                        <span style={{ fontWeight: 800, fontFamily: 'monospace' }}>{alloc.value}%</span>
                                    </div>
                                    <div className="progress-bar" style={{ height: 8 }}>
                                        <div className="progress-fill" style={{ width: `${alloc.value}%`, background: alloc.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 'var(--space-5)', padding: 'var(--space-3)', background: 'rgba(200,121,65,0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(200,121,65,0.2)', fontSize: 13, color: 'var(--kd-copper-light)' }}>
                            <Zap size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} />
                            <strong>Diambar AI :</strong> La surpondération Actions BRVM (+5% vs cible) est justifiée par la dynamique haussière actuelle du secteur télécom. Le portefeuille est modélisé à un Sharpe de 1.45.
                        </div>
                    </div>
                </div>
            )}

            {(activeTab === 'holdings' || activeTab === 'analytics') && (
                <div className="card" style={{ overflowX: 'auto' }}>
                    <div className="card-header">
                        <h3>📋 Inventaire des Positions Ouvertes (Holdings)</h3>
                        <div className="header-search" style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '4px 8px', display: 'flex', alignItems: 'center' }}>
                            <Filter size={14} style={{ marginRight: 6 }} color="var(--text-muted)" />
                            <input type="text" placeholder="Filtrer ISIN, Ticker, Classe..." style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: 12, width: 220 }} />
                        </div>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Actif (Symbole)</th>
                                <th>Typologie / Zone</th>
                                <th style={{ textAlign: 'right' }}>Quantité Titres</th>
                                <th style={{ textAlign: 'right' }}>PRU (FCFA)</th>
                                <th style={{ textAlign: 'right' }}>Dernier Cours</th>
                                <th style={{ textAlign: 'right' }}>Investi Brut</th>
                                <th style={{ textAlign: 'right' }}>Valorisation Actuelle</th>
                                <th style={{ textAlign: 'right' }}>Latente Absolue</th>
                                <th style={{ textAlign: 'right' }}>Poids %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PORTFOLIO_POSITIONS.map((pos, i) => {
                                const poids = ((pos.value / totalValue) * 100).toFixed(1);
                                return (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 700, fontSize: 13 }}>{pos.asset}</td>
                                        <td>
                                            <span className="tag" style={{ background: `${pos.color}15`, color: pos.color, fontWeight: 700, padding: '2px 6px', fontSize: 10 }}>{pos.classe}</span>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{pos.zone}</div>
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>{fmt(pos.quantite)}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{fmt(pos.pmp)}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>{fmt(pos.last)}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--text-muted)' }}>{fmt(pos.quantite * pos.pmp)}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, fontSize: 13, color: 'var(--kd-copper-light)' }}>{fmt(pos.value)}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: pos.pnlAbs > 0 ? 'var(--kd-success)' : 'var(--kd-danger)' }}>
                                                {pos.pnlAbs > 0 ? '+' : ''}{fmt(pos.pnlAbs)}
                                            </div>
                                            <div style={{ fontFamily: 'monospace', fontWeight: 600, fontSize: 11, color: pos.pnlPct > 0 ? 'var(--kd-success)' : 'var(--kd-danger)', marginTop: 2 }}>
                                                {pos.pnlPct > 0 ? <TrendingUp size={10} style={{ verticalAlign: 'baseline' }} /> : <TrendingDown size={10} style={{ verticalAlign: 'baseline' }} />} {pos.pnlPct > 0 ? '+' : ''}{pos.pnlPct.toFixed(2)}%
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>
                                            {poids}%
                                            <div className="progress-bar" style={{ height: 4, marginTop: 4, width: '100%' }}>
                                                <div className="progress-fill" style={{ width: `${poids}%`, background: pos.color, marginLeft: 'auto' }} />
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
