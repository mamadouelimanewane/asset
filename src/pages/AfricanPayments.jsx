import { useState } from 'react';
import {
    MapPin, ArrowRightLeft, Globe, TrendingUp, Shield, Activity, RefreshCcw
} from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const FOREX_RATES = [
    { pair: 'XOF / USD', rate: 0.0016, trend: 'up', change: '+0.12%', alert: false },
    { pair: 'XOF / EUR', rate: 0.0015, trend: 'flat', change: '0.00%', alert: false },
    { pair: 'NGN / USD', rate: 0.00063, trend: 'down', change: '-2.45%', alert: true }, // Volatilité sur le Naira
    { pair: 'GHS / USD', rate: 0.078, trend: 'up', change: '+0.4%', alert: false },
];

const HEDGING_POSITIONS = [
    { id: 'H-01', type: 'Forward', pair: 'XOF/NGN', amount: 500000000, maturity: '2025-06-30', strike: 2.34, current: 2.50, pnl: -12000000 },
    { id: 'H-02', type: 'Options (Call)', pair: 'USD/XOF', amount: 2000000, maturity: '2025-12-31', strike: 600, current: 605, pnl: 10000000 },
];

const VOLATILITY_DATA = [
    { month: 'Jan', xof: 0.5, ngn: 15.2, ghs: 5.4 },
    { month: 'Fév', xof: 0.5, ngn: 18.5, ghs: 6.1 },
    { month: 'Mar', xof: 0.5, ngn: 12.0, ghs: 4.8 },
    { month: 'Avr', xof: 0.5, ngn: 22.1, ghs: 7.2 }, // Pic de volatilité
];

export default function AfricanPayments() {
    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #166534, #14532d)', border: '1px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(34,197,94,0.3)' }}>
                        <MapPin size={22} color="#86efac" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Trésorerie Panafricaine & Hedging</h1>
                        <p style={{ marginBottom: 0 }}>Gestion des flux transfrontaliers, couverture de risque de change UEMOA/CEMAC/Hors-Zone.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #22c55e', color: '#86efac' }}><RefreshCcw size={14} style={{ marginRight: 6 }} /> Sync Banques Locales</button>
                    <button className="btn btn-primary" style={{ background: '#22c55e', border: 'none', color: '#000' }}><Shield size={14} style={{ marginRight: 6 }} /> Couvrir (Hedge) une position</button>
                </div>
            </div>

            <div className="grid-2-1">
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Globe size={18} /> Taux de Change & Alertes de Volatilité</h3>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Paire de Devises</th>
                                <th>Taux Spot</th>
                                <th>Var. 24h</th>
                                <th>Statut Risque</th>
                            </tr>
                        </thead>
                        <tbody>
                            {FOREX_RATES.map((fx, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 800 }}>{fx.pair}</td>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{fx.rate.toFixed(5)}</td>
                                    <td>
                                        <span style={{ color: fx.trend === 'up' ? '#10b981' : fx.trend === 'down' ? '#ef4444' : 'var(--text-muted)' }}>
                                            {fx.change}
                                        </span>
                                    </td>
                                    <td>
                                        {fx.alert ? <span className="badge badge-danger">Haute Volatilité</span> : <span className="badge badge-success">Stable</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Volatilité Historique (%)</h3>
                    </div>
                    <div style={{ height: 250, marginTop: 'var(--space-4)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={VOLATILITY_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} />
                                <Tooltip contentStyle={{ background: '#0a0e17', borderRadius: 8, border: '1px solid #22c55e' }} />
                                <Bar dataKey="ngn" name="Naira (NGN)" fill="#ef4444" radius={[2, 2, 0, 0]} barSize={20} />
                                <Line type="monotone" dataKey="xof" name="FCFA (Peg EUR)" stroke="#10b981" strokeWidth={3} dot={false} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginTop: 'var(--space-4)' }}>
                <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Shield size={18} color="#f59e0b" /> Positions de Couverture (Hedging) Actives</h3>
                </div>
                <div className="grid-2">
                    {HEDGING_POSITIONS.map(pos => (
                        <div key={pos.id} style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <div style={{ fontSize: 15, fontWeight: 800 }}>{pos.type} sur {pos.pair}</div>
                                <span className={pos.pnl >= 0 ? 'badge badge-success' : 'badge badge-danger'}>
                                    PnL: {pos.pnl >= 0 ? '+' : ''}{(pos.pnl / 1000000).toLocaleString('fr-FR')}M
                                </span>
                            </div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>
                                Notionnel Protégé : <strong style={{ color: 'white' }}>{pos.amount.toLocaleString('fr-FR')} {pos.pair.split('/')[0]}</strong>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Strike: {pos.strike} (Actuel: {pos.current})</span>
                                <span>Échéance: {pos.maturity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
