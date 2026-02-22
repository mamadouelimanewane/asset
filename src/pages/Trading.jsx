import { useState, useEffect } from 'react';
import { Zap, ArrowUpDown, Clock, CheckCircle, Search, Crosshair, BarChart2, Hash, AlertTriangle, ChevronRight, Layers } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const BRVM_ORDER_BOOK = [
    { price: 19500, size: 450, total: 450, type: 'ask' },
    { price: 19495, size: 1200, total: 1650, type: 'ask' },
    { price: 19485, size: 850, total: 2500, type: 'ask' },
    { price: 19470, size: 300, total: 2800, type: 'ask' },
    { price: null, size: null, total: null, type: 'spread', spread: 'Spread: 15 FCFA (0.07%)' },
    { price: 19455, size: 1500, total: 1500, type: 'bid' },
    { price: 19440, size: 600, total: 2100, type: 'bid' },
    { price: 19435, size: 2300, total: 4400, type: 'bid' },
    { price: 19420, size: 1000, total: 5400, type: 'bid' },
];

const RECENT_EXECUTIONS = [
    { id: 'ORD-89A12', date: 'Aujourd\'hui, 11:42', symbol: 'SNTS', side: 'Achat', type: 'VWAP Algo', qty: 2500, px: 19462.5, status: 'Exécuté', venue: 'BRVM DMA' },
    { id: 'ORD-89A11', date: 'Aujourd\'hui, 10:15', symbol: 'ORAC', side: 'Vente', type: 'Limite', qty: 800, px: 12200, status: 'Exécuté', venue: 'BRVM DMA' },
    { id: 'ORD-89A10', date: 'Aujourd\'hui, 09:30', symbol: 'BICC', side: 'Achat', type: 'Au marché', qty: 150, px: 6850, status: 'Approuvé (Compliance)', venue: 'Internalized' },
    { id: 'ORD-89A09', date: 'Hier, 14:20', symbol: 'BOAS', side: 'Achat', type: 'TWAP Algo', qty: 5000, px: 9150, status: 'Partiel (80%)', venue: 'BRVM DMA' },
];

export default function Trading() {
    const [activeTab, setActiveTab] = useState('ticket');
    const [ticketState, setTicketState] = useState({ symbol: 'SNTS', side: 'buy', qty: '', type: 'limit', px: '19455', algo: 'none' });
    const [livePrice, setLivePrice] = useState(19460);

    useEffect(() => {
        const int = setInterval(() => {
            setLivePrice(prev => prev + (Math.random() - 0.5) * 10);
        }, 1500);
        return () => clearInterval(int);
    }, []);

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(16,185,129,0.4)', color: 'white' }}>
                        <Zap size={22} />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Order Management System (OMS)</h1>
                        <p style={{ marginBottom: 0 }}>Direct Market Access BRVM · Exécution Algorithmique · Carnet d'ordres L2</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <span className="badge badge-green" style={{ padding: '8px 16px', fontSize: 13, fontWeight: 700 }}><CheckCircle size={14} style={{ display: 'inline', marginRight: 6 }} /> BRVM Connecté</span>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #10B981', background: 'rgba(16,185,129,0.05)' }}>
                    <div className="stat-icon"><Crosshair size={20} color="#10B981" /></div>
                    <div className="stat-value" style={{ color: '#10B981' }}>98.5%</div>
                    <div className="stat-label">Taux d'exécution (Fill Rate)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper-light)' }}>
                    <div className="stat-icon"><BarChart2 size={20} /></div>
                    <div className="stat-value">12.4 M FCFA</div>
                    <div className="stat-label">Volume de Trading (Auj.)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                    <div className="stat-icon"><Zap size={20} color="#8B5CF6" /></div>
                    <div className="stat-value">14 ms</div>
                    <div className="stat-label">Latence DMA BRVM</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #F59E0B' }}>
                    <div className="stat-icon"><Clock size={20} color="#F59E0B" /></div>
                    <div className="stat-value">3</div>
                    <div className="stat-label">Ordres Actifs (Working)</div>
                </div>
            </div>

            <div className="grid-2-1" style={{ alignItems: 'start', marginBottom: 'var(--space-5)' }}>
                {/* TICKET D'ORDRE & CHART */}
                <div>
                    {/* Header Marché SNTS */}
                    <div className="card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                                <div style={{ width: 40, height: 40, background: '#C87941', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: 14 }}>SNTS</div>
                                <div>
                                    <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>Sonatel Sénégal</h2>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ISIN: SN0000000022 · Secteur: Télécommunications</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 28, fontWeight: 900, color: livePrice > 19460 ? 'var(--kd-success)' : 'var(--kd-danger)', fontFamily: 'monospace' }}>
                                    {Math.round(livePrice).toLocaleString('fr-FR')} FCFA
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--kd-success)' }}>+140 (0.72%) Auj.</div>
                            </div>
                        </div>
                        {/* SVG Sparkline Ligne du jour */}
                        <div style={{ height: 60, marginTop: 'var(--space-3)' }}>
                            <svg width="100%" height="100%" viewBox="0 0 400 60" preserveAspectRatio="none">
                                <polyline points="0,50 50,45 100,55 150,30 200,35 250,20 300,25 350,15 400,10" fill="none" stroke="var(--kd-success)" strokeWidth="2.5" />
                                <circle cx="400" cy="10" r="4" fill="var(--kd-success)" />
                            </svg>
                        </div>
                    </div>

                    <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                        <button className={`tab ${activeTab === 'ticket' ? 'active' : ''}`} onClick={() => setActiveTab('ticket')}>🎟️ Order Ticket</button>
                        <button className={`tab ${activeTab === 'blotter' ? 'active' : ''}`} onClick={() => setActiveTab('blotter')}>📋 Order Blotter (Exécutions)</button>
                    </div>

                    {activeTab === 'ticket' && (
                        <div className="card" style={{ borderTop: `4px solid ${ticketState.side === 'buy' ? '#10B981' : '#EF4444'}` }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 'var(--space-4)' }}>
                                <button
                                    style={{ flex: 1, padding: '12px', fontSize: 15, fontWeight: 700, borderRadius: 8, border: 'none', background: ticketState.side === 'buy' ? '#10B981' : 'var(--bg-secondary)', color: 'white', cursor: 'pointer', transition: '0.2s' }}
                                    onClick={() => setTicketState(s => ({ ...s, side: 'buy' }))}>ACHAT</button>
                                <button
                                    style={{ flex: 1, padding: '12px', fontSize: 15, fontWeight: 700, borderRadius: 8, border: 'none', background: ticketState.side === 'sell' ? '#EF4444' : 'var(--bg-secondary)', color: 'white', cursor: 'pointer', transition: '0.2s' }}
                                    onClick={() => setTicketState(s => ({ ...s, side: 'sell' }))}>VENTE</button>
                            </div>

                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Type d'ordre</label>
                                    <select className="form-select" value={ticketState.type} onChange={e => setTicketState(s => ({ ...s, type: e.target.value }))} style={{ fontSize: 14 }}>
                                        <option value="market">Marché (MKT)</option>
                                        <option value="limit">Limite (LMT)</option>
                                        <option value="stop">Stop Loss</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>Execution Algo (Diambar AI)</label>
                                    <select className="form-select" value={ticketState.algo} onChange={e => setTicketState(s => ({ ...s, algo: e.target.value }))} style={{ fontSize: 14, border: ticketState.algo !== 'none' ? '1px solid #8B5CF6' : undefined, color: ticketState.algo !== 'none' ? '#A78BFA' : undefined }}>
                                        <option value="none">Routage Direct (DMA)</option>
                                        <option value="vwap">VWAP (Volume-Weighted)</option>
                                        <option value="twap">TWAP (Time-Weighted)</option>
                                        <option value="iceberg">Iceberg Order (Caché)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Quantité (Titres)</label>
                                    <input className="form-input" type="number" placeholder="ex: 1000" value={ticketState.qty} onChange={e => setTicketState(s => ({ ...s, qty: e.target.value }))} style={{ fontSize: 18, fontFamily: 'monospace' }} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Prix Limite (FCFA)</label>
                                    <input className="form-input" type="number" disabled={ticketState.type === 'market'} value={ticketState.type === 'market' ? '' : ticketState.px} onChange={e => setTicketState(s => ({ ...s, px: e.target.value }))} style={{ fontSize: 18, fontFamily: 'monospace', opacity: ticketState.type === 'market' ? 0.3 : 1 }} />
                                </div>
                            </div>

                            {ticketState.algo !== 'none' && (
                                <div style={{ padding: 'var(--space-3)', background: 'rgba(139,92,246,0.1)', borderRadius: 'var(--radius-sm)', border: '1px dashed rgba(139,92,246,0.5)', marginTop: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#A78BFA' }}><Zap size={14} /> Intelligence Algorithmique Activée</div>
                                    <p style={{ margin: '4px 0 0 0', fontSize: 11, color: 'var(--text-secondary)' }}>L'ordre sera découpé en tranches pour minimiser l'impact sur le marché illiquide de la BRVM. Estimation d'économie de slippage : <strong>24 500 FCFA</strong>.</p>
                                </div>
                            )}

                            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>
                                    <span>Valeur notionnelle estimée</span>
                                    <span style={{ fontFamily: 'monospace', color: 'white' }}>{ticketState.qty ? formatCurrency(Number(ticketState.qty) * (ticketState.type === 'market' ? livePrice : Number(ticketState.px)), true) : '0 FCFA'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
                                    <span>Commission (Institutionnelle 0.15%)</span>
                                    <span style={{ fontFamily: 'monospace', color: 'var(--kd-success)' }}>Inclus</span>
                                </div>
                                <button
                                    className="btn"
                                    style={{ width: '100%', padding: '16px', fontSize: 16, fontWeight: 900, letterSpacing: 1, background: ticketState.side === 'buy' ? '#10B981' : '#EF4444', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}
                                >
                                    TRANSMETTRE {ticketState.side === 'buy' ? 'ACHAT' : 'VENTE'} (ENTER ↵)
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'blotter' && (
                        <div className="card" style={{ padding: 0 }}>
                            <table className="data-table">
                                <thead><tr><th>ID</th><th>Heure</th><th>Ordre</th><th>Type</th><th>Détails Execution</th><th>Statut</th></tr></thead>
                                <tbody>
                                    {RECENT_EXECUTIONS.map(ex => (
                                        <tr key={ex.id}>
                                            <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{ex.id}</td>
                                            <td style={{ fontSize: 11 }}>{ex.date}</td>
                                            <td>
                                                <span style={{ fontWeight: 800, color: ex.side === 'Achat' ? '#10B981' : '#EF4444', marginRight: 8 }}>{ex.side}</span>
                                                <span style={{ fontWeight: 800 }}>{ex.symbol}</span>
                                            </td>
                                            <td><span className="tag" style={{ border: ex.type.includes('Algo') ? '1px solid #8B5CF6' : undefined, color: ex.type.includes('Algo') ? '#A78BFA' : undefined }}>{ex.type}</span></td>
                                            <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{ex.qty} @ {ex.px}</td>
                                            <td>
                                                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 12, fontWeight: 700, background: ex.status.includes('Exécuté') ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: ex.status.includes('Exécuté') ? '#10B981' : '#F59E0B' }}>
                                                    {ex.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* ORDER BOOK L2 */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div className="card-header" style={{ borderBottom: '1px solid var(--border-primary)', padding: 'var(--space-3)' }}>
                        <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5 }}><Layers size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'text-bottom' }} /> Carnet d'Ordres L2 (SNTS)</h3>
                    </div>
                    <div style={{ background: '#0a0e17' }}>
                        <div style={{ display: 'flex', padding: '8px 16px', fontSize: 10, color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 700, textTransform: 'uppercase' }}>
                            <div style={{ flex: 1 }}>Prix (FCFA)</div>
                            <div style={{ flex: 1, textAlign: 'right' }}>Volume</div>
                            <div style={{ flex: 1, textAlign: 'right' }}>Cumul</div>
                        </div>
                        {BRVM_ORDER_BOOK.map((lvl, i) => {
                            if (lvl.type === 'spread') {
                                return (
                                    <div key={i} style={{ padding: '8px 16px', textAlign: 'center', fontSize: 11, background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', fontWeight: 600 }}>
                                        {lvl.spread}
                                    </div>
                                )
                            }
                            const maxTotal = 5400;
                            const depthPct = (lvl.total / maxTotal) * 100;
                            return (
                                <div key={i} style={{ display: 'flex', padding: '6px 16px', fontSize: 12, fontFamily: 'monospace', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: `${depthPct}%`, background: lvl.type === 'ask' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', zIndex: 0 }} />
                                    <div style={{ flex: 1, color: lvl.type === 'ask' ? '#EF4444' : '#10B981', fontWeight: 700, zIndex: 1 }}>{lvl.price.toLocaleString('fr-FR')}</div>
                                    <div style={{ flex: 1, textAlign: 'right', color: 'white', zIndex: 1 }}>{lvl.size}</div>
                                    <div style={{ flex: 1, textAlign: 'right', color: 'var(--text-muted)', zIndex: 1 }}>{lvl.total}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
