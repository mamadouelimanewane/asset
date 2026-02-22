import { useState } from 'react';
import {
    BarChart3, TrendingUp, TrendingDown, DollarSign,
    Target, Award, ArrowUpRight, ArrowDownRight, Info,
    Calendar, Filter, Activity, Zap
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/helpers';

const benchmarks = [
    { id: 'sp500', name: 'S&P 500', return1m: 2.8, return3m: 8.5, returnYTD: 4.2, return1y: 22.1, return3y: 10.5, return5y: 14.8 },
    { id: 'msci', name: 'MSCI World', return1m: 2.1, return3m: 7.2, returnYTD: 3.8, return1y: 18.5, return3y: 9.2, return5y: 12.1 },
    { id: 'agg', name: 'Bloomberg Agg', return1m: 0.5, return3m: 1.2, returnYTD: 0.8, return1y: 4.2, return3y: -1.5, return5y: 1.8 },
    { id: 'em', name: 'MSCI Emerging', return1m: 1.2, return3m: 3.8, returnYTD: 2.1, return1y: 12.5, return3y: 3.8, return5y: 6.2 },
    { id: 'brvm', name: 'BRVM Composite', return1m: 0.8, return3m: 2.5, returnYTD: 1.5, return1y: 8.2, return3y: 5.1, return5y: 4.8 },
];

const kdPerformance = { name: 'Koppar-Diambar (moy.)', return1m: 2.4, return3m: 7.8, returnYTD: 4.0, return1y: 17.2, return3y: 11.8, return5y: 13.5 };

const peerComparison = [
    { name: 'Koppar-Diambar', aum: 61_500_000, clients: 187, avgReturn: 17.2, fees: 0.75, sharpe: 1.42, rank: 1 },
    { name: 'WM Banque Atlantique', aum: 320_000_000, clients: 1200, avgReturn: 11.5, fees: 1.5, sharpe: 0.85, rank: 4 },
    { name: 'Oragroup Private', aum: 180_000_000, clients: 450, avgReturn: 13.8, fees: 1.25, sharpe: 1.05, rank: 3 },
    { name: 'NSIA Gestion', aum: 95_000_000, clients: 310, avgReturn: 14.2, fees: 1.1, sharpe: 1.12, rank: 2 },
    { name: 'CGF Bourse', aum: 42_000_000, clients: 180, avgReturn: 9.8, fees: 1.8, sharpe: 0.72, rank: 5 },
];

export default function Benchmarking() {
    const [period, setPeriod] = useState('return1y');
    const [activeTab, setActiveTab] = useState('performance');

    const periodLabels = { return1m: '1 Mois', return3m: '3 Mois', returnYTD: 'YTD', return1y: '1 An', return3y: '3 Ans', return5y: '5 Ans' };

    return (
        <div className="page-content">
            <div className="page-header">
                <div><h1>Benchmark & comparaisons</h1><p>Performance relative, classement par pairs et attribution de rendement</p></div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper"><div className="stat-icon"><TrendingUp size={20} /></div><div className="stat-value">{kdPerformance[period] > 0 ? '+' : ''}{kdPerformance[period]}%</div><div className="stat-label">Performance KD ({periodLabels[period]})</div></div>
                <div className="stat-card diamond"><div className="stat-icon"><Target size={20} /></div><div className="stat-value">+{(kdPerformance[period] - benchmarks[0][period]).toFixed(1)}%</div><div className="stat-label">Alpha vs S&P 500</div></div>
                <div className="stat-card success"><div className="stat-icon"><Award size={20} /></div><div className="stat-value">#1</div><div className="stat-label">Classement pairs Afrique</div></div>
                <div className="stat-card warning"><div className="stat-icon"><Activity size={20} /></div><div className="stat-value">1.42</div><div className="stat-label">Ratio de Sharpe</div></div>
            </div>

            <div style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-4)' }}>
                {Object.entries(periodLabels).map(([key, label]) => (
                    <button key={key} className={`btn btn-sm ${period === key ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setPeriod(key)}>{label}</button>
                ))}
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['performance', '📈 Performance relative'], ['peers', '🏆 Classement pairs']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'performance' && (
                <div className="card">
                    <div className="card-header"><h3>Performance comparée ({periodLabels[period]})</h3></div>
                    {/* KD en premier */}
                    <div style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-3)', background: 'rgba(200,121,65,0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(200,121,65,0.2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--kd-copper-light)' }}>⭐ {kdPerformance.name}</span>
                            <span style={{ fontSize: 18, fontWeight: 800, color: kdPerformance[period] >= 0 ? 'var(--kd-success)' : 'var(--kd-danger)' }}>{kdPerformance[period] >= 0 ? '+' : ''}{kdPerformance[period]}%</span>
                        </div>
                        <div className="progress-bar" style={{ height: 10 }}>
                            <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(5, kdPerformance[period] * 3 + 20))}%`, background: 'var(--kd-copper)' }} />
                        </div>
                    </div>

                    {benchmarks.map(b => {
                        const diff = kdPerformance[period] - b[period];
                        return (
                            <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', marginBottom: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontWeight: 500, fontSize: 13 }}>{b.name}</span>
                                        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 700, fontSize: 14 }}>{b[period] >= 0 ? '+' : ''}{b[period]}%</span>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: diff > 0 ? 'var(--kd-success)' : 'var(--kd-danger)' }}>{diff > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {diff > 0 ? '+' : ''}{diff.toFixed(1)}%</span>
                                        </div>
                                    </div>
                                    <div className="progress-bar" style={{ height: 6 }}>
                                        <div className="progress-fill" style={{ width: `${Math.min(100, Math.max(5, b[period] * 3 + 20))}%`, background: 'var(--kd-info)', opacity: 0.6 }} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeTab === 'peers' && (
                <div className="card">
                    <div className="card-header"><h3>🏆 Classement des gestionnaires — Afrique de l'Ouest</h3></div>
                    <table className="data-table">
                        <thead><tr><th>#</th><th>Gestionnaire</th><th>AUM</th><th>Clients</th><th>Rendement</th><th>Frais</th><th>Sharpe</th></tr></thead>
                        <tbody>
                            {peerComparison.sort((a, b) => a.rank - b.rank).map(peer => (
                                <tr key={peer.name} style={{ background: peer.name === 'Koppar-Diambar' ? 'rgba(200,121,65,0.06)' : undefined }}>
                                    <td><span style={{ fontSize: 18 }}>{peer.rank === 1 ? '🥇' : peer.rank === 2 ? '🥈' : peer.rank === 3 ? '🥉' : `#${peer.rank}`}</span></td>
                                    <td style={{ fontWeight: peer.name === 'Koppar-Diambar' ? 700 : 500, color: peer.name === 'Koppar-Diambar' ? 'var(--kd-copper-light)' : undefined }}>{peer.name}</td>
                                    <td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(peer.aum, true)}</td>
                                    <td>{peer.clients}</td>
                                    <td style={{ fontWeight: 700, color: 'var(--kd-success)' }}>+{peer.avgReturn}%</td>
                                    <td style={{ color: peer.fees <= 0.75 ? 'var(--kd-success)' : peer.fees >= 1.5 ? 'var(--kd-danger)' : 'var(--text-primary)' }}>{peer.fees}%</td>
                                    <td style={{ fontWeight: 700, color: 'var(--kd-copper-light)' }}>{peer.sharpe}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
