import { useState } from 'react';
import {
    AlertTriangle, Shield, TrendingDown, BarChart3,
    PieChart, Activity, Target, Zap, Info, Eye
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/helpers';

const riskMetrics = {
    portfolioVaR: { daily: -185_000, monthly: -820_000, annual: -2_850_000, confidence: 95 },
    maxDrawdown: { current: -8.2, worst: -18.5, avgRecovery: '4.2 mois' },
    beta: 0.85, sharpe: 1.42, sortino: 1.95, trackingError: 2.8,
    concentration: { top5: 32, top10: 48, singleMax: 8.5, sectorMax: 22 },
};

const stressTests = [
    { name: 'COVID-19 (Mars 2020)', impact: -28.5, recovery: '5 mois', probability: 'Faible', color: 'var(--kd-danger)' },
    { name: 'Hausse taux +200bps', impact: -12.3, recovery: '3 mois', probability: 'Modérée', color: 'var(--kd-warning)' },
    { name: 'Crise émergents', impact: -18.7, recovery: '6 mois', probability: 'Faible', color: 'var(--kd-danger)' },
    { name: 'Dévaluation FCFA 15%', impact: -9.2, recovery: '2 mois', probability: 'Très faible', color: 'var(--kd-warning)' },
    { name: 'Récession modérée US', impact: -15.8, recovery: '8 mois', probability: 'Modérée', color: 'var(--kd-danger)' },
    { name: 'Inflation >8%', impact: -6.5, recovery: '12 mois', probability: 'Faible', color: 'var(--kd-warning)' },
];

const riskAlerts = [
    { level: 'high', text: 'Concentration sectorielle Tech à 22% — seuil d\'alerte atteint (max 20%).', action: 'Réduire exposition AAPL/MSFT de 2%.' },
    { level: 'medium', text: 'Corrélation USD/ZAR en hausse (0.72 → 0.85). Risque de change accru sur l\'exposition sud-africaine.', action: 'Envisager un hedge NDF sur le ZAR.' },
    { level: 'low', text: 'VaR 95% dans les limites normales. Ratio de Sharpe en amélioration (1.35 → 1.42 ce mois).', action: 'Aucune action requise.' },
];

export default function RiskAnalysis() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="page-content">
            <div className="page-header">
                <div><h1>Analyse de risque avancée</h1><p>VaR, stress tests, drawdowns et matrices de corrélation</p></div>
                <button className="btn btn-primary"><Activity size={14} /> Lancer stress test</button>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper"><div className="stat-icon"><AlertTriangle size={20} /></div><div className="stat-value">{formatCurrency(riskMetrics.portfolioVaR.daily)}</div><div className="stat-label">VaR journalière (95%)</div></div>
                <div className="stat-card diamond"><div className="stat-icon"><TrendingDown size={20} /></div><div className="stat-value">{riskMetrics.maxDrawdown.current}%</div><div className="stat-label">Drawdown actuel</div></div>
                <div className="stat-card success"><div className="stat-icon"><Target size={20} /></div><div className="stat-value">{riskMetrics.sharpe}</div><div className="stat-label">Ratio de Sharpe</div></div>
                <div className="stat-card warning"><div className="stat-icon"><BarChart3 size={20} /></div><div className="stat-value">{riskMetrics.beta}</div><div className="stat-label">Beta portefeuille</div></div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['overview', '📊 Vue d\'ensemble'], ['stress', '💥 Stress Tests'], ['alerts', '🚨 Alertes']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header"><h3>Value at Risk (VaR)</h3></div>
                        {[['Journalière', riskMetrics.portfolioVaR.daily], ['Mensuelle', riskMetrics.portfolioVaR.monthly], ['Annuelle', riskMetrics.portfolioVaR.annual]].map(([label, value]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3)', marginBottom: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <span style={{ fontSize: 13 }}>{label}</span>
                                <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--kd-danger)' }}>{formatCurrency(value)}</span>
                            </div>
                        ))}
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>Niveau de confiance : {riskMetrics.portfolioVaR.confidence}% — Méthode historique 252 jours</div>
                    </div>
                    <div className="card">
                        <div className="card-header"><h3>Métriques de risque</h3></div>
                        {[['Beta portefeuille', riskMetrics.beta, 'vs S&P 500'], ['Ratio de Sharpe', riskMetrics.sharpe, 'Risque-ajusté'], ['Ratio de Sortino', riskMetrics.sortino, 'Downside risk'], ['Tracking Error', `${riskMetrics.trackingError}%`, 'vs Benchmark'], ['Drawdown max historique', `${riskMetrics.maxDrawdown.worst}%`, 'Pire période'], ['Récupération moyenne', riskMetrics.maxDrawdown.avgRecovery, 'Temps de recouvrement']].map(([label, value, sub]) => (
                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-primary)', fontSize: 13 }}>
                                <div><span style={{ fontWeight: 500 }}>{label}</span><br /><span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{sub}</span></div>
                                <span style={{ fontWeight: 700, color: 'var(--kd-copper-light)' }}>{value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="card" style={{ gridColumn: '1 / -1' }}>
                        <div className="card-header"><h3>Concentration du portefeuille</h3></div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)' }}>
                            {[['Top 5 positions', `${riskMetrics.concentration.top5}%`, riskMetrics.concentration.top5 > 30 ? 'var(--kd-warning)' : 'var(--kd-success)'], ['Top 10 positions', `${riskMetrics.concentration.top10}%`, 'var(--kd-info)'], ['Position max', `${riskMetrics.concentration.singleMax}%`, riskMetrics.concentration.singleMax > 10 ? 'var(--kd-warning)' : 'var(--kd-success)'], ['Secteur max', `${riskMetrics.concentration.sectorMax}%`, riskMetrics.concentration.sectorMax > 20 ? 'var(--kd-danger)' : 'var(--kd-success)']].map(([label, value, color]) => (
                                <div key={label} style={{ textAlign: 'center', padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                    <div style={{ fontSize: 24, fontWeight: 800, color }}>{value}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'stress' && (
                <div className="card">
                    <div className="card-header"><h3>Scénarios de stress</h3></div>
                    <table className="data-table">
                        <thead><tr><th>Scénario</th><th>Impact estimé</th><th>Temps de récupération</th><th>Probabilité</th><th>Barre d'impact</th></tr></thead>
                        <tbody>
                            {stressTests.map(test => (
                                <tr key={test.name}>
                                    <td style={{ fontWeight: 600, fontSize: 13 }}>{test.name}</td>
                                    <td style={{ fontWeight: 700, color: 'var(--kd-danger)', fontSize: 15 }}>{test.impact}%</td>
                                    <td style={{ fontSize: 12 }}>{test.recovery}</td>
                                    <td><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: test.probability === 'Modérée' ? 'rgba(245,158,11,0.1)' : 'rgba(52,211,153,0.08)', color: test.probability === 'Modérée' ? 'var(--kd-warning)' : 'var(--text-muted)', fontWeight: 600 }}>{test.probability}</span></td>
                                    <td><div className="progress-bar" style={{ height: 8 }}><div className="progress-fill" style={{ width: `${Math.abs(test.impact) * 3}%`, background: test.color }} /></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'alerts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {riskAlerts.map((alert, i) => (
                        <div key={i} className="card" style={{ borderLeft: `4px solid ${alert.level === 'high' ? 'var(--kd-danger)' : alert.level === 'medium' ? 'var(--kd-warning)' : 'var(--kd-info)'}` }}>
                            <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 'var(--space-2)' }}>{alert.text}</p>
                            <p style={{ fontSize: 12, color: 'var(--kd-copper-light)', fontWeight: 600 }}>💡 Action : {alert.action}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
