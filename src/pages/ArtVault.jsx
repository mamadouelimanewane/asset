import { useState } from 'react';
import {
    Palette, Gem, ShieldAlert, Award, Camera, CameraResult, Lock, Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const ART_COLLECTION = [
    { id: 'ART-01', item: 'Tableau (Art Contemporain Africain)', artist: 'Omar Ba', valOrig: 45000000, valAct: 85000000, auth: 'Christie\'s Paris', risk: 'Faible', date: '2021' },
    { id: 'ART-02', item: 'Montre de Collection (Vintage)', artist: 'Patek Philippe Nautilus', valOrig: 80000000, valAct: 140000000, auth: 'Certificat Origine', risk: 'Vol / Perte', date: '2019' },
    { id: 'ART-03', item: 'Véhicule de Collection', artist: 'Mercedes 300 SL Gullwing', valOrig: 850000000, valAct: 1100000000, auth: 'Expertise Ind.', risk: 'Incendie', date: '2015' },
    { id: 'ART-04', item: 'Parure Haute Joaillerie', artist: 'Cartier', valOrig: 120000000, valAct: 125000000, auth: 'GIA', risk: 'Vol', date: '2024' },
];

const VALUATION_HISTORY = [
    { year: '2021', val: 1095 },
    { year: '2022', val: 1150 },
    { year: '2023', val: 1280 },
    { year: '2024', val: 1350 },
    { year: '2025', val: 1450 },
];

export default function ArtVault() {
    const [activeTab, setActiveTab] = useState('gallery');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #4c1d95, #2e1065)', border: '1px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
                        <Palette size={22} color="#c4b5fd" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Art & Digital Vault</h1>
                        <p style={{ marginBottom: 0 }}>Coffre-fort visuel des actifs illiquides, expertises certifiées et couverture d'assurance.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #8b5cf6', color: '#c4b5fd' }}><Camera size={14} style={{ marginRight: 6 }} /> Scanner Nouvelle Pièce</button>
                    <button className="btn btn-primary" style={{ background: '#8b5cf6', border: 'none' }}><Gem size={14} style={{ marginRight: 6 }} /> Demander Expertise IA</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6', background: 'rgba(139,92,246,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#c4b5fd' }}><Gem size={20} /></div>
                    <div className="stat-value" style={{ color: '#ddd6fe' }}>1.45Md FCFA</div>
                    <div className="stat-label">Valeur Vénale Globale</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="stat-icon"><Sparkles size={20} color="#10b981" /></div>
                    <div className="stat-value" style={{ color: '#10b981' }}>+355M FCFA</div>
                    <div className="stat-label">Plus-Value Latente (Estimateur IA)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper)' }}>
                    <div className="stat-icon"><ShieldAlert size={20} color="var(--kd-copper)" /></div>
                    <div className="stat-value">100%</div>
                    <div className="stat-label">Pièces Assurées & Expertisées</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['gallery', '🖼️ Galerie Inventaire'], ['valuation', '📈 Valorisation du Marché'], ['insurance', '🛡️ Certituts & Assurance']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'gallery' && (
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Lock size={18} /> Pièces de Collection Sécurisées</h3>
                    </div>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Type de Pièce (Origine)</th>
                                <th>Artiste / Manufacture</th>
                                <th>Prix d'Acquisition</th>
                                <th>Valeur Estimée (Temps Réel)</th>
                                <th>Autorité de Certification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ART_COLLECTION.map(piece => (
                                <tr key={piece.id}>
                                    <td style={{ fontWeight: 800 }}>{piece.item}</td>
                                    <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{piece.artist}</td>
                                    <td style={{ fontSize: 13, color: 'var(--text-secondary)', textDecoration: 'line-through' }}>{(piece.valOrig / 1000000).toLocaleString('fr-FR')}M FCFA</td>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 800, color: '#10b981', fontSize: 15 }}>{(piece.valAct / 1000000).toLocaleString('fr-FR')}M FCFA</td>
                                    <td><span className="badge badge-success"><Award size={12} style={{ marginRight: 4 }} /> {piece.auth}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'valuation' && (
                <div className="card">
                    <div className="card-header">
                        <h3>Évolution de la Valeur Totale (Millions FCFA)</h3>
                        <span className="badge badge-diamond">Sotheby's AI Database Sync</span>
                    </div>
                    <div style={{ height: 300, marginTop: 'var(--space-4)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={VALUATION_HISTORY} margin={{ left: -10 }}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}M`} />
                                <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid #8b5cf6', borderRadius: 8 }} />
                                <Area type="monotone" dataKey="val" name="Valeur Globale (Est.)" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {activeTab === 'insurance' && (
                <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f59e0b' }}><ShieldAlert size={18} /> Revue des Risques & Primes d'Assurance</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Assurez-vous que vos contrats "Tous Risques Sauf" protègent l'entièreté de la plus-value enregistrée sur votre collection.</p>

                    {ART_COLLECTION.map(piece => (
                        <div key={piece.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-tertiary)', borderRadius: 8, marginBottom: 8, borderLeft: '3px solid #f59e0b' }}>
                            <div>
                                <div style={{ fontWeight: 800, fontSize: 13, color: 'white' }}>{piece.artist} — {piece.item}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Risque Couvert: <strong style={{ color: '#f59e0b' }}>{piece.risk}</strong> • Couverture: 100% Valeur Actuelle</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Prime Annuelle</div>
                                <div style={{ fontWeight: 800, fontFamily: 'monospace', color: '#fca5a5' }}>{((piece.valAct * 0.005) / 1000).toLocaleString('fr-FR')} k FCFA</div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-secondary" style={{ marginTop: 16, width: '100%', borderColor: '#f59e0b', color: '#fbbf24' }}>Renégocier Primes d'Assurance</button>
                </div>
            )}
        </div>
    );
}
