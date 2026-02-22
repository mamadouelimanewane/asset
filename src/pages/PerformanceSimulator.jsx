import { useState, useMemo } from 'react';
import {
    TrendingUp, DollarSign, Sliders, BarChart3, PieChart,
    Play, RotateCcw, Download, Zap, AlertTriangle,
    ArrowUpRight, ArrowDownRight, Target, Clock, Info
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const scenarioPresets = [
    { id: 'bull', name: '🐂 Marché haussier', marketReturn: 15, bondReturn: 4, inflationRate: 2.5, recessionProb: 5 },
    { id: 'base', name: '📊 Scénario de base', marketReturn: 10, bondReturn: 3.5, inflationRate: 3.0, recessionProb: 15 },
    { id: 'bear', name: '🐻 Marché baissier', marketReturn: -5, bondReturn: 5, inflationRate: 4.0, recessionProb: 40 },
    { id: 'stagflation', name: '🔥 Stagflation', marketReturn: 2, bondReturn: 2, inflationRate: 7.0, recessionProb: 55 },
    { id: 'crash', name: '💥 Crash sévère', marketReturn: -30, bondReturn: 6, inflationRate: 1.0, recessionProb: 80 },
];

const allocationPresets = [
    { name: 'Agressif', stocks: 90, bonds: 5, cash: 5 },
    { name: 'Croissance', stocks: 70, bonds: 20, cash: 10 },
    { name: 'Équilibré', stocks: 50, bonds: 35, cash: 15 },
    { name: 'Conservateur', stocks: 30, bonds: 50, cash: 20 },
    { name: 'Défensif', stocks: 10, bonds: 60, cash: 30 },
];

export default function PerformanceSimulator() {
    const [initialCapital, setInitialCapital] = useState(1_000_000);
    const [monthlyContrib, setMonthlyContrib] = useState(5_000);
    const [horizon, setHorizon] = useState(10);
    const [stocks, setStocks] = useState(60);
    const [bonds, setBonds] = useState(30);
    const [cash, setCash] = useState(10);
    const [fees, setFees] = useState(0.75);
    const [selectedScenario, setSelectedScenario] = useState('base');
    const [showMonteCarlo, setShowMonteCarlo] = useState(false);

    const scenario = scenarioPresets.find(s => s.id === selectedScenario);

    const simulation = useMemo(() => {
        const annualReturn = (stocks / 100) * scenario.marketReturn + (bonds / 100) * scenario.bondReturn + (cash / 100) * 4.85;
        const netReturn = annualReturn - fees;
        const realReturn = netReturn - scenario.inflationRate;

        const yearlyData = [];
        let nominal = initialCapital;
        let real = initialCapital;
        let totalContrib = initialCapital;

        for (let y = 0; y <= horizon; y++) {
            yearlyData.push({
                year: y,
                nominal: Math.round(nominal),
                real: Math.round(real),
                contributions: Math.round(totalContrib),
            });
            if (y < horizon) {
                nominal = nominal * (1 + netReturn / 100) + monthlyContrib * 12;
                real = real * (1 + realReturn / 100) + monthlyContrib * 12;
                totalContrib += monthlyContrib * 12;
            }
        }

        const totalGainNominal = nominal - totalContrib;
        const totalFeesPaid = yearlyData.reduce((s, d, i) => {
            if (i === 0) return 0;
            return s + d.nominal * fees / 100;
        }, 0);

        return { yearlyData, annualReturn, netReturn, realReturn, totalGainNominal, totalFeesPaid, totalContrib };
    }, [initialCapital, monthlyContrib, horizon, stocks, bonds, cash, fees, scenario]);

    const monteCarlo = useMemo(() => {
        if (!showMonteCarlo) return null;
        const runs = 500;
        const results = [];
        const baseReturn = (stocks / 100) * scenario.marketReturn + (bonds / 100) * scenario.bondReturn + (cash / 100) * 4.85 - fees;
        const volatility = stocks / 100 * 16 + bonds / 100 * 5 + cash / 100 * 1;

        for (let r = 0; r < runs; r++) {
            let val = initialCapital;
            for (let y = 0; y < horizon; y++) {
                const randomReturn = baseReturn + (Math.random() - 0.5) * 2 * volatility;
                val = val * (1 + randomReturn / 100) + monthlyContrib * 12;
            }
            results.push(Math.round(val));
        }
        results.sort((a, b) => a - b);

        return {
            p5: results[Math.floor(runs * 0.05)],
            p25: results[Math.floor(runs * 0.25)],
            p50: results[Math.floor(runs * 0.50)],
            p75: results[Math.floor(runs * 0.75)],
            p95: results[Math.floor(runs * 0.95)],
            min: results[0],
            max: results[results.length - 1],
        };
    }, [showMonteCarlo, initialCapital, monthlyContrib, horizon, stocks, bonds, cash, fees, scenario]);

    const maxVal = Math.max(...simulation.yearlyData.map(d => d.nominal));

    const applyAllocation = (preset) => {
        setStocks(preset.stocks);
        setBonds(preset.bonds);
        setCash(preset.cash);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Simulateur de performance</h1>
                    <p>Projections what-if, analyse de scénarios et simulation Monte Carlo</p>
                </div>
                <div className="btn-group">
                    <button className={`btn ${showMonteCarlo ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => setShowMonteCarlo(!showMonteCarlo)}>
                        <BarChart3 size={14} /> {showMonteCarlo ? 'Masquer Monte Carlo' : 'Monte Carlo (500 sims)'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 'var(--space-4)' }}>
                {/* Panneau de contrôle */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div className="card">
                        <div className="card-header"><h3>⚙️ Paramètres</h3></div>

                        {[
                            { label: 'Capital initial', value: initialCapital, set: setInitialCapital, min: 10000, max: 50000000, step: 50000, fmt: v => formatCurrency(v, true) },
                            { label: 'Versement mensuel', value: monthlyContrib, set: setMonthlyContrib, min: 0, max: 50000, step: 500, fmt: v => formatCurrency(v) },
                            { label: `Horizon (${horizon} ans)`, value: horizon, set: setHorizon, min: 1, max: 40, step: 1, fmt: v => `${v} ans` },
                            { label: `Frais de gestion (${fees}%)`, value: fees, set: setFees, min: 0, max: 2.5, step: 0.05, fmt: v => `${v}%` },
                        ].map(param => (
                            <div key={param.label} style={{ marginBottom: 'var(--space-3)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                                    <span style={{ color: 'var(--text-muted)' }}>{param.label}</span>
                                    <span style={{ fontWeight: 600, color: 'var(--kd-copper-light)' }}>{param.fmt(param.value)}</span>
                                </div>
                                <input type="range" min={param.min} max={param.max} step={param.step}
                                    value={param.value} onChange={e => param.set(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--kd-copper)' }} />
                            </div>
                        ))}
                    </div>

                    <div className="card">
                        <div className="card-header"><h3>📊 Allocation</h3></div>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
                            {allocationPresets.map(p => (
                                <button key={p.name} className="btn btn-ghost btn-sm" style={{ fontSize: 10 }}
                                    onClick={() => applyAllocation(p)}>{p.name}</button>
                            ))}
                        </div>

                        {[
                            { label: 'Actions', value: stocks, set: setStocks, color: 'var(--kd-copper)' },
                            { label: 'Obligations', value: bonds, set: setBonds, color: 'var(--kd-info)' },
                            { label: 'Cash (4.85% APY)', value: cash, set: setCash, color: 'var(--kd-success)' },
                        ].map(a => (
                            <div key={a.label} style={{ marginBottom: 'var(--space-2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                                    <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: a.color, marginRight: 4 }} />{a.label}</span>
                                    <span style={{ fontWeight: 600 }}>{a.value}%</span>
                                </div>
                                <input type="range" min={0} max={100} step={5}
                                    value={a.value} onChange={e => {
                                        const v = Number(e.target.value);
                                        a.set(v);
                                    }}
                                    style={{ width: '100%', accentColor: a.color }} />
                            </div>
                        ))}
                        <div style={{
                            height: 8, borderRadius: 4, display: 'flex', overflow: 'hidden', marginTop: 'var(--space-2)',
                        }}>
                            <div style={{ width: `${stocks}%`, background: 'var(--kd-copper)' }} />
                            <div style={{ width: `${bonds}%`, background: 'var(--kd-info)' }} />
                            <div style={{ width: `${cash}%`, background: 'var(--kd-success)' }} />
                        </div>
                        {stocks + bonds + cash !== 100 && (
                            <div style={{ fontSize: 11, color: 'var(--kd-danger)', marginTop: 4 }}>
                                <AlertTriangle size={11} style={{ marginRight: 4 }} />Total : {stocks + bonds + cash}% (doit être 100%)
                            </div>
                        )}
                    </div>

                    <div className="card">
                        <div className="card-header"><h3>🌍 Scénario de marché</h3></div>
                        {scenarioPresets.map(s => (
                            <label key={s.id} style={{
                                display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                                padding: 'var(--space-2)', marginBottom: 4, cursor: 'pointer',
                                background: selectedScenario === s.id ? 'rgba(200,121,65,0.08)' : 'transparent',
                                borderRadius: 'var(--radius-sm)', border: selectedScenario === s.id ? '1px solid rgba(200,121,65,0.3)' : '1px solid transparent',
                            }}>
                                <input type="radio" name="scenario" checked={selectedScenario === s.id}
                                    onChange={() => setSelectedScenario(s.id)}
                                    style={{ accentColor: 'var(--kd-copper)' }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 500 }}>{s.name}</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                                        Actions {s.marketReturn > 0 ? '+' : ''}{s.marketReturn}% • Oblig. +{s.bondReturn}% • Inflation {s.inflationRate}%
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Résultats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {/* KPIs résultats */}
                    <div className="stat-grid">
                        <div className="stat-card copper">
                            <div className="stat-icon"><DollarSign size={20} /></div>
                            <div className="stat-value">{formatCurrency(simulation.yearlyData[horizon].nominal, true)}</div>
                            <div className="stat-label">Valeur finale (nominale)</div>
                        </div>
                        <div className="stat-card diamond">
                            <div className="stat-icon"><TrendingUp size={20} /></div>
                            <div className="stat-value" style={{ color: simulation.totalGainNominal >= 0 ? 'var(--kd-success)' : 'var(--kd-danger)' }}>
                                {simulation.totalGainNominal >= 0 ? '+' : ''}{formatCurrency(simulation.totalGainNominal, true)}
                            </div>
                            <div className="stat-label">Gain net</div>
                        </div>
                        <div className="stat-card success">
                            <div className="stat-icon"><Target size={20} /></div>
                            <div className="stat-value">{simulation.netReturn.toFixed(1)}%</div>
                            <div className="stat-label">Rendement net annuel</div>
                        </div>
                        <div className="stat-card warning">
                            <div className="stat-icon"><Clock size={20} /></div>
                            <div className="stat-value">{formatCurrency(simulation.yearlyData[horizon].real, true)}</div>
                            <div className="stat-label">Valeur réelle (après inflation)</div>
                        </div>
                    </div>

                    {/* Graphique barres */}
                    <div className="card">
                        <div className="card-header">
                            <h3>📈 Évolution du portefeuille</h3>
                            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                                Rendement brut : {simulation.annualReturn.toFixed(1)}% | Net : {simulation.netReturn.toFixed(1)}% | Réel : {simulation.realReturn.toFixed(1)}%
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 200, padding: 'var(--space-2) 0' }}>
                            {simulation.yearlyData.map((d, i) => {
                                const nomH = Math.max(4, (d.nominal / maxVal) * 180);
                                const contribH = Math.max(2, (d.contributions / maxVal) * 180);
                                return (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <div style={{ fontSize: 8, color: 'var(--text-muted)', marginBottom: 2 }}>
                                            {i % Math.max(1, Math.floor(horizon / 8)) === 0 ? formatCurrency(d.nominal, true) : ''}
                                        </div>
                                        <div style={{ width: '100%', position: 'relative', height: nomH }}>
                                            <div style={{
                                                position: 'absolute', bottom: 0, left: '10%', right: '10%', height: nomH,
                                                background: d.nominal >= d.contributions ? 'var(--kd-copper)' : 'var(--kd-danger)',
                                                borderRadius: '2px 2px 0 0', opacity: 0.8,
                                            }} />
                                            <div style={{
                                                position: 'absolute', bottom: 0, left: '10%', right: '10%', height: contribH,
                                                background: 'rgba(126,184,218,0.3)', borderRadius: '2px 2px 0 0',
                                            }} />
                                        </div>
                                        <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{d.year > 0 ? `A${d.year}` : '0'}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', fontSize: 10, color: 'var(--text-muted)', marginTop: 'var(--space-2)' }}>
                            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--kd-copper)', borderRadius: 2, marginRight: 4 }} />Valeur portefeuille</span>
                            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'rgba(126,184,218,0.3)', borderRadius: 2, marginRight: 4 }} />Contributions cumulées</span>
                        </div>
                    </div>

                    {/* Monte Carlo */}
                    {showMonteCarlo && monteCarlo && (
                        <div className="card" style={{ border: '1px solid rgba(200,121,65,0.2)' }}>
                            <div className="card-header"><h3>🎲 Simulation Monte Carlo (500 scénarios)</h3></div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                                {[
                                    ['Pessimiste (5%)', monteCarlo.p5, 'var(--kd-danger)'],
                                    ['25e percentile', monteCarlo.p25, 'var(--kd-warning)'],
                                    ['Médiane (50%)', monteCarlo.p50, 'var(--kd-copper-light)'],
                                    ['75e percentile', monteCarlo.p75, 'var(--kd-info)'],
                                    ['Optimiste (95%)', monteCarlo.p95, 'var(--kd-success)'],
                                ].map(([label, value, color]) => (
                                    <div key={label} style={{ textAlign: 'center', padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color }}>{formatCurrency(value, true)}</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Distribution visuelle */}
                            <div style={{ position: 'relative', height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--bg-tertiary)' }}>
                                <div style={{
                                    position: 'absolute', left: `${((monteCarlo.p5 - monteCarlo.min) / (monteCarlo.max - monteCarlo.min)) * 100}%`,
                                    width: `${((monteCarlo.p95 - monteCarlo.p5) / (monteCarlo.max - monteCarlo.min)) * 100}%`,
                                    height: '100%', background: 'linear-gradient(90deg, rgba(239,68,68,0.2), rgba(200,121,65,0.3), rgba(52,211,153,0.2))',
                                }} />
                                <div style={{
                                    position: 'absolute', left: `${((monteCarlo.p25 - monteCarlo.min) / (monteCarlo.max - monteCarlo.min)) * 100}%`,
                                    width: `${((monteCarlo.p75 - monteCarlo.p25) / (monteCarlo.max - monteCarlo.min)) * 100}%`,
                                    height: '100%', background: 'rgba(200,121,65,0.15)',
                                }} />
                                <div style={{
                                    position: 'absolute', left: `${((monteCarlo.p50 - monteCarlo.min) / (monteCarlo.max - monteCarlo.min)) * 100}%`,
                                    top: 0, bottom: 0, width: 3, background: 'var(--kd-copper-light)',
                                }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>
                                <span>Min : {formatCurrency(monteCarlo.min, true)}</span>
                                <span>Médiane : {formatCurrency(monteCarlo.p50, true)}</span>
                                <span>Max : {formatCurrency(monteCarlo.max, true)}</span>
                            </div>
                        </div>
                    )}

                    {/* Tableau détaillé */}
                    <div className="card">
                        <div className="card-header"><h3>📋 Détail année par année</h3></div>
                        <table className="data-table" style={{ fontSize: 12 }}>
                            <thead>
                                <tr>
                                    <th>Année</th>
                                    <th>Contributions</th>
                                    <th>Valeur nominale</th>
                                    <th>Valeur réelle</th>
                                    <th>Gain</th>
                                </tr>
                            </thead>
                            <tbody>
                                {simulation.yearlyData.filter((_, i) => i % Math.max(1, Math.floor(horizon / 10)) === 0 || i === horizon).map(d => {
                                    const gain = d.nominal - d.contributions;
                                    return (
                                        <tr key={d.year}>
                                            <td style={{ fontWeight: 600 }}>An {d.year}</td>
                                            <td style={{ fontVariantNumeric: 'tabular-nums' }}>{formatCurrency(d.contributions, true)}</td>
                                            <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: 'var(--kd-copper-light)' }}>{formatCurrency(d.nominal, true)}</td>
                                            <td style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--text-secondary)' }}>{formatCurrency(d.real, true)}</td>
                                            <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600, color: gain >= 0 ? 'var(--kd-success)' : 'var(--kd-danger)' }}>
                                                {gain >= 0 ? '+' : ''}{formatCurrency(gain, true)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Conseil IA */}
                    <div className="card" style={{ border: '1px solid rgba(200,121,65,0.2)', background: 'rgba(200,121,65,0.03)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                            <Zap size={16} style={{ color: 'var(--kd-copper)' }} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--kd-copper-light)' }}>Analyse Diambar AI</span>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            {simulation.netReturn > 8 ? (
                                <p>✅ <strong>Projection favorable.</strong> Avec un rendement net de {simulation.netReturn.toFixed(1)}% et un horizon de {horizon} ans, votre capital devrait croître significativement. L'inflation de {scenario.inflationRate}% réduit le pouvoir d'achat réel de {formatCurrency(simulation.yearlyData[horizon].nominal - simulation.yearlyData[horizon].real, true)} sur la période.</p>
                            ) : simulation.netReturn > 3 ? (
                                <p>⚠️ <strong>Rendement modéré.</strong> Un rendement net de {simulation.netReturn.toFixed(1)}% protège contre l'inflation ({scenario.inflationRate}%) mais génère une croissance limitée. Envisagez d'augmenter l'exposition aux actions de {stocks}% à {Math.min(80, stocks + 15)}% si votre horizon le permet.</p>
                            ) : (
                                <p>🚨 <strong>Attention — Rendement insuffisant.</strong> Avec {simulation.netReturn.toFixed(1)}% net, le portefeuille ne compense pas l'inflation de {scenario.inflationRate}%. La valeur réelle diminue de {formatCurrency(initialCapital - simulation.yearlyData[horizon].real, true)}. Réévaluer l'allocation et les scénarios est critique.</p>
                            )}
                            <p style={{ marginTop: 8 }}>💡 <strong>Frais cumulés sur {horizon} ans :</strong> {formatCurrency(Math.round(simulation.totalFeesPaid), true)}. Avec KD à {fees}%, vous économisez {formatCurrency(Math.round(simulation.totalFeesPaid * (1.25 / fees - 1)), true)} vs un gestionnaire à 1,25%.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
