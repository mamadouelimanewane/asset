import { useState } from 'react';
import {
    Sprout, Globe, Activity, CloudLightning, ChevronRight,
    Leaf, Target, ArrowUpRight, BarChart3, Wind
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const ESG_SCORE_DATA = [
    { name: 'Environnement', value: 78, color: '#10B981' },
    { name: 'Social', value: 85, color: '#8B5CF6' },
    { name: 'Gouvernance', value: 92, color: '#F59E0B' },
];

const ODD_ALIGNMENT = [
    { name: '🎯 Éducation', invest: 15 },
    { name: '🔋 Énergies', invest: 35 },
    { name: '💧 Eau propre', invest: 20 },
    { name: '🏭 Ind. Durable', invest: 30 },
];

export default function ESGCarbon() {
    const [activeTab, setActiveTab] = useState('portfolio');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #064e3b, #022c22)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white' }}>
                        <Leaf size={22} color="#10b981" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Impact ESG & Marché Carbone</h1>
                        <p style={{ marginBottom: 0 }}>Reporting RSE institutionnel, Scoring Carbone et compensation certifiée</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #10b981', color: '#6ee7b7' }}><Wind size={14} style={{ marginRight: 6 }} /> Bourse Carbone (UEMOA)</button>
                    <button className="btn btn-primary" style={{ background: '#10b981' }}>Générer Rapport SFDR</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981', background: 'rgba(16,185,129,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#10b981' }}><Sprout size={20} /></div>
                    <div className="stat-value" style={{ color: '#6ee7b7' }}>85/100</div>
                    <div className="stat-label">Score ESG Global (AA+)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #c87941' }}>
                    <div className="stat-icon"><CloudLightning size={20} color="#c87941" /></div>
                    <div className="stat-value">25.4</div>
                    <div className="stat-label">Empreinte CO2 (tCO2e / M$)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                    <div className="stat-icon"><Target size={20} color="#8b5cf6" /></div>
                    <div className="stat-value">62%</div>
                    <div className="stat-label">Alignement Objectifs (ODD)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--text-secondary)' }}>
                    <div className="stat-icon"><Globe size={20} /></div>
                    <div className="stat-value">450</div>
                    <div className="stat-label">Crédits compensés (YTD)</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['portfolio', '📊 ESG du Portefeuille'], ['carbon', '💨 Trading Carbone'], ['impact', '🌍 Impact & ODD']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'portfolio' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Répartition détaillée du Score ESG</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', height: 250, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={ESG_SCORE_DATA} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                                        {ESG_SCORE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: '#0a0e17', borderRadius: 8, border: 'none' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 13 }}>
                            {ESG_SCORE_DATA.map(d => (
                                <div key={d.name} style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'var(--text-secondary)' }}>{d.name}</div>
                                    <div style={{ fontWeight: 800, color: d.color }}>{d.value}/100</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Controverses & Exclusions Sectorielles</h3>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Filtres de conformité appliqués sur l'univers d'investissement BRVM.</p>

                        <div style={{ marginTop: 'var(--space-3)' }}>
                            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: '#EF4444' }}>🔴 Tolérance Zéro (Exclus)</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Tabac, Armement, Charbon thermique</div>
                                </div>
                                <span style={{ fontWeight: 800, color: 'white' }}>0%</span>
                            </div>

                            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: '#F59E0B' }}>🟡 Sous Surveillance (Watchlist)</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Exploration Pétrolière Gazo-Côtière (Sénégal)</div>
                                </div>
                                <span style={{ fontWeight: 800, color: '#F59E0B' }}>4.5%</span>
                            </div>

                            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', borderLeft: '2px solid #10b981' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: '#10B981' }}>🟢 Allocation Best-in-Class</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Télécoms, Infras Durables (Financement Vert)</div>
                                </div>
                                <span style={{ fontWeight: 800, color: '#10B981' }}>82.1%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'carbon' && (
                <div className="card" style={{ border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#10b981' }}><Wind size={20} /> Market-Place: Compensation Carbone Africaine</h3>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Achetez directement des certificats de réduction d'émissions (VERs) labellisés Gold Standard issus de projets locaux certifiés.</p>

                    <table className="data-table" style={{ marginTop: 'var(--space-4)' }}>
                        <thead>
                            <tr>
                                <th>Projet Locatif</th>
                                <th>Pays</th>
                                <th>Méthodologie</th>
                                <th>Prix / tCO2e</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Cuisines Améliorées (Foyers)</td>
                                <td>🇸🇳 Sénégal</td>
                                <td>Efficacité Énergétique</td>
                                <td style={{ fontWeight: 800, color: 'var(--kd-success)', fontFamily: 'monospace' }}>$12.50</td>
                                <td><button className="btn btn-primary btn-sm" style={{ background: '#10b981' }}>Compenser</button></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Reforestation Mangrove du Sine Saloum</td>
                                <td>🇸🇳 Sénégal</td>
                                <td>Séquestration Biologique</td>
                                <td style={{ fontWeight: 800, color: 'var(--kd-success)', fontFamily: 'monospace' }}>$24.00</td>
                                <td><button className="btn btn-primary btn-sm" style={{ background: '#10b981' }}>Compenser</button></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 600 }}>Centrale Solaire Zagtouli</td>
                                <td>🇧🇫 Burkina Faso</td>
                                <td>Énergie Renouvelable</td>
                                <td style={{ fontWeight: 800, color: 'var(--kd-success)', fontFamily: 'monospace' }}>$8.20</td>
                                <td><button className="btn btn-primary btn-sm" style={{ background: '#10b981' }}>Compenser</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'impact' && (
                <div className="card">
                    <div className="card-header">
                        <h3>Alignement avec les ODD (Nations Unies)</h3>
                    </div>
                    <div style={{ height: 260, marginTop: 'var(--space-3)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ODD_ALIGNMENT} layout="vertical" margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${v}%`} />
                                <YAxis type="category" dataKey="name" stroke="white" fontSize={13} fontWeight={600} width={100} />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ background: '#0f172a', border: '1px solid #c87941', borderRadius: 8 }} />
                                <Bar dataKey="invest" fill="var(--kd-copper)" radius={[0, 4, 4, 0]} barSize={28} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}
