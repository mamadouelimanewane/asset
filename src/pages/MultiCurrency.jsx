import { useState } from 'react';
import {
    Coins, ArrowRightLeft, Globe, Activity, TrendingUp, Zap,
    ShieldAlert, LineChart, Banknote
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const FX_EXPOSURE = [
    { currency: 'XOF (Franc CFA)', volume: 68000000, risk: 'Low', volatility: 'Pegged (EUR)', flag: '🇸🇳' },
    { currency: 'USD (US Dollar)', volume: 24500000, risk: 'High', volatility: '1.2% (30D)', flag: '🇺🇸' },
    { currency: 'EUR (Euro)', volume: 15200000, risk: 'Low', volatility: 'Pegged (XOF)', flag: '🇪🇺' },
    { currency: 'NGN (Naira)', volume: 3800000, risk: 'Extreme', volatility: '14.5% (30D)', flag: '🇳🇬' },
];

const USD_XOF_RATES = [
    { date: 'J-5', rate: 602.4 },
    { date: 'J-4', rate: 604.1 },
    { date: 'J-3', rate: 608.5 },
    { date: 'J-2', rate: 610.2 },
    { date: 'Hier', rate: 609.5 },
    { date: 'Auj.', rate: 612.8 }, // Tendance haussière du dollar
];

export default function MultiCurrency() {
    const [activeTab, setActiveTab] = useState('exposure');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a, #172554)', border: '1px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
                        <Coins size={22} color="#60a5fa" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Trésorerie Actes & Multi-Devises (FX)</h1>
                        <p style={{ marginBottom: 0 }}>Hedging IA, Swaps de change et contrôle de l'exposition globale Ouest-Africaine.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #3b82f6', color: '#93c5fd' }}><ArrowRightLeft size={14} style={{ marginRight: 6 }} /> Réaliser Swap</button>
                    <button className="btn btn-primary" style={{ background: '#3b82f6', border: 'none' }}><Globe size={14} style={{ marginRight: 6 }} /> Paiement Cross-Border</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59,130,246,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#60a5fa' }}><Banknote size={20} /></div>
                    <div className="stat-value" style={{ color: '#bfdbfe' }}>111.5M $</div>
                    <div className="stat-label">Valeur Consolidée (Equiv. USD)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
                    <div className="stat-icon"><ShieldAlert size={20} color="#ef4444" /></div>
                    <div className="stat-value">22%</div>
                    <div className="stat-label">Trésorerie non couverte (Risk)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                    <div className="stat-icon"><Activity size={20} color="#8b5cf6" /></div>
                    <div className="stat-value">-1.4M $</div>
                    <div className="stat-label">Impact PnL dû au Change (M-1)</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['exposure', '📊 Matrice d\'Exposition'], ['hedging', '🤖 Hedging & Stratégies IA']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'exposure' && (
                <div className="card">
                    <div className="card-header">
                        <h3>Ventilation du Risque de Change</h3>
                    </div>
                    <table className="data-table" style={{ marginTop: 'var(--space-3)' }}>
                        <thead>
                            <tr>
                                <th>Devise</th>
                                <th>Volume Net Ouvert</th>
                                <th>Volatilité</th>
                                <th>Niveau de Risque</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FX_EXPOSURE.map(fx => (
                                <tr key={fx.currency}>
                                    <td style={{ fontWeight: 800 }}>{fx.flag} {fx.currency}</td>
                                    <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{fx.volume.toLocaleString('en-US')}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{fx.volatility}</td>
                                    <td>
                                        <span style={{ fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 12, background: fx.risk === 'Low' ? 'rgba(16,185,129,0.1)' : fx.risk === 'High' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)', color: fx.risk === 'Low' ? '#10B981' : fx.risk === 'High' ? '#F59E0B' : '#EF4444', textTransform: 'uppercase' }}>
                                            {fx.risk}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'hedging' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Tendance USD/XOF (Franc CFA)</h3>
                            <span className="badge badge-copper">Spot: 612.8</span>
                        </div>
                        <div style={{ height: 260, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={USD_XOF_RATES}>
                                    <defs>
                                        <linearGradient id="fxGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid #3b82f6', borderRadius: 8 }} />
                                    <Area type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={3} fill="url(#fxGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.4)', background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)' }}>
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A78BFA' }}>
                                <Zap size={18} fill="#A78BFA" /> Stratégie Diambar AI (Recommandation)
                            </h3>
                        </div>
                        <div style={{ marginTop: 'var(--space-4)' }}>
                            <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                                L'intelligence artificielle a détecté une hausse soutenue du Dollar Américain en raison des politiques monétaires de la FED, face à un Franc CFA (Euro) atone.<br /><br />
                                Votre exposition nette de <strong>24.5M USD</strong> engendre un risque de pertes latentes en cas de correction brutale ou de politique BCE divergente.
                            </p>

                            <div style={{ padding: 'var(--space-3)', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #10b981', marginTop: 'var(--space-3)' }}>
                                <div style={{ fontWeight: 800, fontSize: 13, color: '#10b981' }}>Action Suggérée : Souscrire un FX Forward (Contrat à Terme)</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Vente à terme de 10M USD contre EUR à échéance 3 mois. Prime estimée: 0.15%.</div>
                            </div>

                            <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-4)', background: '#8b5cf6', border: 'none' }}>Exécuter couverture (Routing FX)</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
