import { useState } from 'react';
import {
    Hexagon, Wallet, ArrowRightLeft, Activity,
    ShieldCheck, Building, Lock, Globe, Zap, Database, Key,
    TrendingUp, ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const PIE_COLORS = ['#C87941', '#8B5CF6', '#10B981', '#3B82F6'];

const CRYPTO_DATA = [
    { month: 'Jan', value: 45 },
    { month: 'Fév', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Avr', value: 61 },
    { month: 'Mai', value: 59 },
    { month: 'Juin', value: 75 },
    { month: 'Juil', value: 82 },
];

const RWA_ASSETS = [
    { id: 'RWA-DKR-01', name: 'Tour Résidentielle Almadies', type: 'Immobilier', apy: '8.5%', tvl: '2.5M USDT', network: 'Polygon', status: 'Tokenisé', risk: 'Faible' },
    { id: 'RWA-SN-INF', name: 'Centrale Solaire Diamniadio', type: 'Infrastructure', apy: '11.2%', tvl: '5.0M USDC', network: 'Ethereum', status: 'Ouvert', risk: 'Modéré' },
    { id: 'RWA-AGRI-03', name: 'Exploitation Agricole Vallée Fleuve', type: 'Agriculture', apy: '14.0%', tvl: '850K cCFA', network: 'Stellar', status: 'Complet', risk: 'Élevé' },
];

export default function Web3Assets() {
    const [activeTab, setActiveTab] = useState('rwa');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', border: '1px solid #4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(79, 70, 229, 0.4)' }}>
                        <Hexagon size={22} color="#818cf8" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Web3 & Actifs Tokenisés (RWA)</h1>
                        <p style={{ marginBottom: 0 }}>Garde institutionnelle, DeFi et Fractionalisation d'actifs réels</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #4f46e5', color: '#a5b4fc' }}>
                        <Key size={14} style={{ marginRight: 6 }} /> MPC Wallet Manager
                    </button>
                    <button className="btn btn-primary" style={{ background: '#4f46e5', boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)' }}>
                        <Database size={14} style={{ marginRight: 6 }} /> Tokeniser un actif
                    </button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #818cf8', background: 'rgba(79, 70, 229, 0.05)' }}>
                    <div className="stat-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#818cf8' }}><Wallet size={20} /></div>
                    <div className="stat-value" style={{ color: '#c7d2fe' }}>$14.2M</div>
                    <div className="stat-label">AUM Total (On-Chain)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-success)' }}>
                    <div className="stat-icon"><Activity size={20} /></div>
                    <div className="stat-value">11.4%</div>
                    <div className="stat-label">Yield Moyen Global (APY)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper-light)' }}>
                    <div className="stat-icon"><Building size={20} /></div>
                    <div className="stat-value">3</div>
                    <div className="stat-label">Projets RWA Déployés</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--text-secondary)' }}>
                    <div className="stat-icon"><ShieldCheck size={20} /></div>
                    <div className="stat-value">100%</div>
                    <div className="stat-label">Couverture Assurance (Fireblocks)</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['rwa', '🏢 Real World Assets (RWA)'], ['crypto', '🪙 Trésorerie Crypto & Yield'], ['custody', '🔐 Garde Institutionnelle']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'rwa' && (
                <div>
                    <div className="grid-2" style={{ marginBottom: 'var(--space-4)' }}>
                        <div className="card-glass" style={{ border: '1px solid rgba(79, 70, 229, 0.3)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: '#4f46e5', filter: 'blur(80px)', opacity: 0.2 }} />
                            <div className="card-header">
                                <h3 style={{ color: '#a5b4fc' }}>Fractionnalisation Immobilière — Almadies</h3>
                                <span className="badge badge-green" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid #10B981' }}>Live sur Polygon</span>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 32, fontWeight: 900, fontFamily: 'monospace', color: 'white', letterSpacing: 1 }}>2.5M USDT</div>
                                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>TVL (Total Value Locked)</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, borderBottom: '1px solid var(--border-primary)', paddingBottom: 4 }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Smart Contract</span>
                                            <span style={{ color: '#818cf8', fontFamily: 'monospace' }}>0x8a...4b1c <ExternalLink size={10} style={{ display: 'inline' }} /></span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, borderBottom: '1px solid var(--border-primary)', paddingBottom: 4 }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Rendement (Loyer)</span>
                                            <span style={{ color: 'var(--kd-success)', fontWeight: 700 }}>8.5% APY</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Investisseurs (Holders)</span>
                                            <span style={{ color: 'white', fontWeight: 600 }}>142</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: 120, height: 120, position: 'relative' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={[{ value: 85 }, { value: 15 }]} innerRadius={45} outerRadius={55} dataKey="value" stroke="none">
                                                <Cell fill="#4f46e5" />
                                                <Cell fill="rgba(255,255,255,0.05)" />
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: 18, fontWeight: 800 }}>85%</span>
                                        <span style={{ fontSize: 8, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Souscrit</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
                                <button className="btn btn-primary" style={{ flex: 1, background: '#4f46e5' }}>Ouvrir le marché secondaire</button>
                                <button className="btn btn-secondary">Audit technique</button>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header">
                                <h3>Inventaire des Actifs Tokenisés</h3>
                            </div>
                            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                                <table className="data-table" style={{ marginTop: 'var(--space-2)' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ whiteSpace: 'nowrap' }}>Actif</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Type</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>TVL</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Rendement</th>
                                            <th style={{ whiteSpace: 'nowrap' }}>Réseau</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RWA_ASSETS.map(asset => (
                                            <tr key={asset.id}>
                                                <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{asset.name}</td>
                                                <td style={{ fontSize: 11, whiteSpace: 'nowrap' }}>{asset.type}</td>
                                                <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>{asset.tvl}</td>
                                                <td style={{ color: 'var(--kd-success)', fontWeight: 700, whiteSpace: 'nowrap' }}>{asset.apy}</td>
                                                <td style={{ whiteSpace: 'nowrap' }}>
                                                    <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                                                        {asset.network}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'crypto' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Évolution Trésorerie Crypto (USDC / USDT)</h3>
                        </div>
                        <div style={{ height: 280, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={CRYPTO_DATA}>
                                    <defs>
                                        <linearGradient id="cryptoGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#818cf8" stopOpacity={0.4} />
                                            <stop offset="100%" stopColor="#818cf8" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `$${v}k`} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid var(--border-secondary)', borderRadius: 8 }} />
                                    <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} fill="url(#cryptoGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Opportunités de Yield Farming Institutionnel</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                            {[
                                { pool: 'USDC/USDT Stable LP', protocol: 'Curve Finance', network: 'Ethereum', apy: '7.8%', tvl: '$1.2B', risk: 'Faible' },
                                { pool: 'wBTC Staking', protocol: 'Aave V3', network: 'Arbitrum', apy: '4.2%', tvl: '$800M', risk: 'Faible' },
                                { pool: 'Liquid Staking ETH', protocol: 'Lido', network: 'Ethereum', apy: '3.5%', tvl: '$20B', risk: 'Faible' }
                            ].map((yieldOp, idx) => (
                                <div key={idx} style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14 }}>{yieldOp.pool}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', gap: 8, marginTop: 4 }}>
                                            <span>{yieldOp.protocol}</span> • <span>{yieldOp.network}</span> • <span>Risque: {yieldOp.risk}</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: 'var(--kd-success)', fontWeight: 800, fontSize: 16 }}>{yieldOp.apy}</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>TVL: {yieldOp.tvl}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-4)', background: '#4f46e5', border: 'none' }}>Déployer du capital</button>
                    </div>
                </div>
            )}

            {activeTab === 'custody' && (
                <div className="card" style={{ border: '1px solid rgba(16, 185, 129, 0.3)', background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'var(--space-5)' }}>
                        <div style={{ width: 56, height: 56, background: '#10B981', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Lock size={28} />
                        </div>
                        <div>
                            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'white', marginBottom: 4 }}>Cold Storage & MPC (Multi-Party Computation)</h2>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0 }}>Infrastructure de qualité bancaire propulsée par Fireblocks API. Politiques d'approbation M-sur-N strictes.</p>
                        </div>
                    </div>

                    <div className="grid-3">
                        <div style={{ padding: 'var(--space-4)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', borderTop: '3px solid #10B981' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                <ShieldCheck size={20} color="#10B981" />
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#10B981' }}>ACTIF</span>
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Règle de quorum (Tx > $50k)</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Nécessite 3 des 5 fondateurs pour signer cryptographiquement la transaction.</div>
                        </div>
                        <div style={{ padding: 'var(--space-4)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', borderTop: '3px solid var(--kd-copper-light)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                <Globe size={20} color="var(--kd-copper-light)" />
                                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--kd-copper-light)' }}>ACTIF</span>
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Whitelisting d'adresses</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Les retraits ne sont autorisés que vers les adresses de dépôt des exchanges centralisés (Kraken, Binance Insti).</div>
                        </div>
                        <div style={{ padding: 'var(--space-4)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', borderTop: '3px solid #6366f1' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                                <Database size={20} color="#6366f1" />
                                <span style={{ fontSize: 11, fontWeight: 700, color: '#6366f1' }}>AUDIT</span>
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Proof of Reserves</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Génération mensuelle d'arbres de Merkle pour certifier les avoirs off-chain.</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
