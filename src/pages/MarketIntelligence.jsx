import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Globe, RefreshCw, Zap, Eye, BarChart3, AlertTriangle } from 'lucide-react';

// ── BRVM Data ──────────────────────────────────────────────────────────────
const BRVM_INDICES = [
    { name: 'BRVM Composite', value: 4_218.73, change: +2.15, changeAbs: +88.71, color: '#52B788' },
    { name: 'BRVM 10', value: 3_102.44, change: +1.87, changeAbs: +57.23, color: '#C87941' },
    { name: 'BRVM Prestige', value: 2_891.18, change: +3.42, changeAbs: +95.51, color: '#7EA9C5' },
];

const STOCKS = [
    { ticker: 'SNTS', name: 'Sonatel', pays: '🇸🇳', prix: 19_500, change: +4.2, vol: 2_840, secteur: 'Télécom', held: 15 },
    { ticker: 'BICC', name: 'BICICI', pays: '🇨🇮', prix: 6_850, change: +1.8, vol: 1_200, secteur: 'Banque', held: 0 },
    { ticker: 'SGBF', name: 'SGB Finance', pays: '🇧🇫', prix: 3_200, change: -0.9, vol: 450, secteur: 'Banque', held: 8 },
    { ticker: 'PALC', name: 'Palm CI', pays: '🇨🇮', prix: 4_750, change: +2.6, vol: 780, secteur: 'Agro', held: 0 },
    { ticker: 'ORAC', name: 'Orange CI', pays: '🇨🇮', prix: 12_200, change: -1.4, vol: 3_100, secteur: 'Télécom', held: 5 },
    { ticker: 'ETIT', name: 'Etiqa CI', pays: '🇨🇮', prix: 775, change: +0.6, vol: 220, secteur: 'Assurance', held: 0 },
];

const SENTIMENT = [
    { source: 'RFI Afrique', headline: 'Le Sénégal maintient son rating B+ malgré des pressions budgétaires', sentiment: 'neutre', impact: 'SNTS', time: '8h' },
    { source: 'Jeune Afrique', headline: 'Orange Sénégal annonce un plan d\'investissement 5G de 200 Mds FCFA', sentiment: 'positif', impact: 'SNTS', time: '2h' },
    { source: 'Bloomberg Africa', headline: 'La BRVM signe sa meilleure semaine depuis 3 mois sur fond de détente des taux', sentiment: 'positif', impact: 'BRVM', time: '15 min' },
    { source: 'BCEAO', headline: 'Le taux directeur maintenu à 3,5% — signal accommodant pour les obligations', sentiment: 'positif', impact: 'OAT', time: '30 min' },
    { source: 'Reuters Africa', headline: 'Volatilité sur les devises CFA liée aux tensions sur le franc français', sentiment: 'négatif', impact: 'FCFA', time: '4h' },
];

const MACRO_INDICATORS = [
    { label: 'PIB Sénégal (prévu 2025)', value: '+8,2%', trend: 'up', desc: 'Découvertes pétrolières Sangomar' },
    { label: 'Inflation UEMOA', value: '3,1%', trend: 'stable', desc: 'Maîtrisée — cible 3% BCEAO' },
    { label: 'OAT 10 ans Sénégal', value: '6,75%', trend: 'down', desc: 'Détente sur le marché obligataire' },
    { label: 'Change USD/FCFA', value: '598,4', trend: 'up', desc: 'Légère dépréciation du FCFA' },
    { label: 'Réserves de change BCEAO', value: '5,2 mois', trend: 'stable', desc: 'Confort de financement extérieur' },
    { label: 'Croissance CEDEAO', value: '+4,8%', trend: 'up', desc: 'Dynamique régionale favorable' },
];

export default function MarketIntelligence() {
    const [activeTab, setActiveTab] = useState('brvm');
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [prices, setPrices] = useState(STOCKS.map(s => ({ ...s })));

    useEffect(() => {
        const i = setInterval(() => {
            setPrices(prev => prev.map(s => ({ ...s, prix: s.prix * (1 + (Math.random() - 0.5) * 0.001), change: s.change + (Math.random() - 0.5) * 0.1 })));
            setLastUpdate(new Date());
        }, 3000);
        return () => clearInterval(i);
    }, []);

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0066B3, #52B788)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(0,102,179,0.4)' }}>📡</div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Intelligence Marché Temps Réel</h1>
                        <p style={{ marginBottom: 0 }}>BRVM live · Sentiment IA · Macroéconomie Afrique · Alertes personnalisées</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--kd-success)', animation: 'pulse 2s infinite' }} />
                        Données live · {lastUpdate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                    <button className="btn btn-ghost btn-sm"><RefreshCw size={13} /> MAJ</button>
                </div>
            </div>

            {/* Indices BRVM */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                {BRVM_INDICES.map(idx => (
                    <div key={idx.name} className="card" style={{ borderTop: `4px solid ${idx.color}`, cursor: 'pointer' }}>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>{idx.name}</div>
                        <div style={{ fontSize: 24, fontWeight: 900, color: idx.color, fontVariantNumeric: 'tabular-nums', marginBottom: 4 }}>{idx.value.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <TrendingUp size={14} color="var(--kd-success)" />
                            <span style={{ fontWeight: 700, color: 'var(--kd-success)', fontSize: 13 }}>+{idx.change}% ({idx.changeAbs > 0 ? '+' : ''}{idx.changeAbs.toFixed(2)})</span>
                        </div>
                        {/* Mini sparkline */}
                        <svg width="100%" height="32" viewBox="0 0 200 32" style={{ marginTop: 8 }}>
                            <polyline points={`${Array.from({ length: 10 }).map((_, i) => `${i * 22},${28 - Math.random() * 20}`).join(' ')} 198,4`} fill="none" stroke={idx.color} strokeWidth="1.5" opacity="0.6" />
                        </svg>
                    </div>
                ))}
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['brvm', '📈 BRVM en direct'], ['sentiment', '🧠 Sentiment IA'], ['macro', '🌍 Macro Afrique']].map(([k, l]) => (
                    <button key={k} className={`tab ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>{l}</button>
                ))}
            </div>

            {activeTab === 'brvm' && (
                <div className="card">
                    <div className="card-header">
                        <h3>📊 Valeurs BRVM — Cours temps réel (simulation)</h3>
                        <span className="badge badge-green">● Live</span>
                    </div>
                    <table className="data-table">
                        <thead><tr><th>Ticker</th><th>Société</th><th>Pays</th><th>Secteur</th><th>Prix (FCFA)</th><th>Var. %</th><th>Volume</th><th>Status</th></tr></thead>
                        <tbody>
                            {prices.map(s => (
                                <tr key={s.ticker}>
                                    <td><span style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: 13, color: 'var(--kd-copper-light)' }}>{s.ticker}</span></td>
                                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                                    <td style={{ fontSize: 16 }}>{s.pays}</td>
                                    <td><span className="tag" style={{ fontSize: 10 }}>{s.secteur}</span></td>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: s.change > 0 ? 'var(--kd-success)' : s.change < 0 ? 'var(--kd-danger)' : 'var(--text-primary)' }}>
                                        {Math.round(s.prix).toLocaleString('fr-FR')}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: s.change > 0 ? 'var(--kd-success)' : s.change < 0 ? 'var(--kd-danger)' : 'var(--text-muted)', fontWeight: 700 }}>
                                            {s.change > 0 ? <TrendingUp size={12} /> : s.change < 0 ? <TrendingDown size={12} /> : null}
                                            {s.change > 0 ? '+' : ''}{s.change.toFixed(2)}%
                                        </div>
                                    </td>
                                    <td style={{ fontFamily: 'monospace', fontSize: 11 }}>{s.vol.toLocaleString()}</td>
                                    <td>
                                        {s.held > 0 ? <span className="badge badge-green">✓ En portefeuille ({s.held})</span> : <button className="btn btn-ghost btn-sm" style={{ fontSize: 10 }}>+ Ordre</button>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'sentiment' && (
                <div>
                    <div style={{ display: 'flex', gap: 'var(--space-5)', marginBottom: 'var(--space-5)' }}>
                        {[['positif', '🟢', 3, 'Bullish'], ['neutre', '⚪', 1, 'Neutre'], ['négatif', '🔴', 1, 'Bearish']].map(([type, ico, count, label]) => (
                            <div key={type} style={{ flex: 1, padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', textAlign: 'center', border: `1px solid ${type === 'positif' ? 'rgba(52,211,153,0.2)' : type === 'négatif' ? 'rgba(239,68,68,0.2)' : 'var(--border-primary)'}` }}>
                                <div style={{ fontSize: 24, marginBottom: 4 }}>{ico}</div>
                                <div style={{ fontWeight: 900, fontSize: 22, color: type === 'positif' ? 'var(--kd-success)' : type === 'négatif' ? 'var(--kd-danger)' : 'var(--text-muted)' }}>{count}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                        {SENTIMENT.map((n, i) => (
                            <div key={i} style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: `1px solid ${n.sentiment === 'positif' ? 'rgba(52,211,153,0.15)' : n.sentiment === 'négatif' ? 'rgba(239,68,68,0.15)' : 'var(--border-primary)'}`, borderLeft: `4px solid ${n.sentiment === 'positif' ? 'var(--kd-success)' : n.sentiment === 'négatif' ? 'var(--kd-danger)' : 'var(--border-primary)'}` }}>
                                <div style={{ flexShrink: 0, padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, height: 'fit-content', background: n.sentiment === 'positif' ? 'rgba(52,211,153,0.1)' : n.sentiment === 'négatif' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.06)', color: n.sentiment === 'positif' ? 'var(--kd-success)' : n.sentiment === 'négatif' ? 'var(--kd-danger)' : 'var(--text-muted)' }}>
                                    {n.sentiment === 'positif' ? '↑' : n.sentiment === 'négatif' ? '↓' : '→'} {n.sentiment}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{n.headline}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.source} · {n.time} · Impact : <strong style={{ color: 'var(--kd-copper-light)' }}>{n.impact}</strong></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'macro' && (
                <div className="grid-2">
                    {MACRO_INDICATORS.map(m => (
                        <div key={m.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: m.trend === 'up' ? 'rgba(52,211,153,0.1)' : m.trend === 'down' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                                {m.trend === 'up' ? '📈' : m.trend === 'down' ? '📉' : '➡️'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{m.label}</div>
                                <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--kd-copper-light)', fontFamily: 'monospace', marginBottom: 2 }}>{m.value}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
