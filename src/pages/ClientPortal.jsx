import {
    TrendingUp, DollarSign, BarChart3, Download, FileText, Eye
} from 'lucide-react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { performanceData } from '../data/mockData';

const clientHoldings = [
    { ticker: 'VOO', name: 'Vanguard S&P 500 ETF', shares: 120, price: 523.10, value: 62_772, gain: 12_340, pct: 14.2 },
    { ticker: 'AAPL', name: 'Apple Inc', shares: 200, price: 228.50, value: 45_700, gain: 8_200, pct: 8.5 },
    { ticker: 'MSFT', name: 'Microsoft Corp', shares: 80, price: 415.30, value: 33_224, gain: 5_680, pct: 6.2 },
    { ticker: 'BND', name: 'Vanguard Total Bond ETF', shares: 300, price: 72.45, value: 21_735, gain: 1_020, pct: 4.1 },
    { ticker: 'GOOGL', name: 'Alphabet Inc', shares: 100, price: 178.90, value: 17_890, gain: 3_450, pct: 3.3 },
];

export default function ClientPortal() {
    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Aperçu du portail client</h1>
                    <p>Expérience co-brandée desktop et mobile pour vos clients</p>
                </div>
                <button className="btn btn-primary">
                    <Eye size={14} /> Prévisualiser en tant que client
                </button>
            </div>

            {/* Vue client */}
            <div className="card" style={{
                border: '2px solid var(--kd-copper)',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: 0, right: 0,
                    background: 'var(--kd-copper)', color: 'white',
                    padding: '4px 16px', borderRadius: '0 0 0 var(--radius-md)',
                    fontSize: 11, fontWeight: 600,
                }}>
                    VUE CLIENT
                </div>

                <div style={{ padding: 'var(--space-5)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                        <div style={{
                            width: 50, height: 50, borderRadius: 'var(--radius-full)',
                            background: 'linear-gradient(135deg, var(--kd-copper), var(--kd-diamond))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, fontWeight: 700, color: 'white',
                        }}>AS</div>
                        <div>
                            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Bienvenue, Aminata 👋</h2>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Votre portefeuille se porte bien</p>
                        </div>
                    </div>

                    <div className="stat-grid">
                        <div className="stat-card copper">
                            <div className="stat-icon"><DollarSign size={20} /></div>
                            <div className="stat-value">2,45M $</div>
                            <div className="stat-label">Valeur totale du portefeuille</div>
                            <div className="stat-change positive">+3,2% ce mois</div>
                        </div>
                        <div className="stat-card success">
                            <div className="stat-icon"><TrendingUp size={20} /></div>
                            <div className="stat-value">+14,7%</div>
                            <div className="stat-label">Rendement YTD</div>
                        </div>
                        <div className="stat-card diamond">
                            <div className="stat-icon"><BarChart3 size={20} /></div>
                            <div className="stat-value">125K $</div>
                            <div className="stat-label">Trésorerie (Haut rendement)</div>
                            <div className="stat-change positive">4,85% TAE</div>
                        </div>
                    </div>

                    {/* Graphique performance */}
                    <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                        <div className="card-header">
                            <h3>Performance de vos investissements</h3>
                            <select className="form-select" style={{ width: 120 }}>
                                <option>12 mois</option>
                                <option>YTD</option>
                                <option>Depuis le début</option>
                            </select>
                        </div>
                        <div style={{ height: 250 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="cpGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#C87941" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#C87941" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${v}%`} />
                                    <Tooltip contentStyle={{
                                        background: 'var(--bg-elevated)',
                                        border: '1px solid var(--border-secondary)',
                                        borderRadius: 8, fontSize: 12,
                                    }} />
                                    <Area type="monotone" dataKey="portfolio" name="Votre Portefeuille"
                                        stroke="#C87941" strokeWidth={2.5} fill="url(#cpGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Positions */}
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-primary)' }}>
                            <h3 style={{ fontSize: 15, fontWeight: 600 }}>Vos positions</h3>
                        </div>
                        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th style={{ whiteSpace: 'nowrap' }}>Symbole</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Nom</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Parts</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Cours</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Valeur</th>
                                        <th style={{ whiteSpace: 'nowrap' }}>Plus/Moins-value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clientHoldings.map(h => (
                                        <tr key={h.ticker}>
                                            <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--kd-copper-light)', whiteSpace: 'nowrap' }}>
                                                {h.ticker}
                                            </td>
                                            <td style={{ whiteSpace: 'nowrap' }}>{h.name}</td>
                                            <td style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{h.shares}</td>
                                            <td style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{h.price.toFixed(2)} $</td>
                                            <td style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                                                {h.value.toLocaleString('fr-FR')} $
                                            </td>
                                            <td style={{ whiteSpace: 'nowrap' }}>
                                                <span style={{ color: h.gain >= 0 ? 'var(--kd-success)' : 'var(--kd-danger)', fontWeight: 600 }}>
                                                    +{h.gain.toLocaleString('fr-FR')} $ ({h.pct}%)
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Documents */}
                    <div className="card" style={{ marginTop: 'var(--space-4)' }}>
                        <div className="card-header">
                            <h3>Documents</h3>
                        </div>
                        {[
                            'Résumé investissement T4 2024.pdf',
                            'Relevé de solde janvier 2025.pdf',
                            'Accord sur le barème de frais.pdf',
                            'Formulaire fiscal 1099-B.pdf',
                        ].map((doc, i) => (
                            <div key={doc} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: 'var(--space-3)', borderBottom: '1px solid var(--border-primary)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <FileText size={16} style={{ color: 'var(--kd-copper-light)' }} />
                                    <span style={{ fontSize: 13 }}>{doc}</span>
                                </div>
                                <button className="btn btn-ghost btn-sm"><Download size={14} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
