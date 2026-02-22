import { useState } from 'react';
import {
    HeartHandshake, Scale, CheckCircle, Search,
    Landmark, CircleDollarSign, ArrowUpRight, Ban
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const HOLDINGS = [
    { name: 'Sonatel', sector: 'Télécoms', status: 'Halal', weight: '45%' },
    { name: 'BOA Sénégal', sector: 'Banque Classique', status: 'Haram (Intérêts)', weight: 'Exclu' },
    { name: 'SOGB', sector: 'Agro-Industrie', status: 'Halal', weight: '22%' },
    { name: 'BRAMA', sector: 'Brasserie', status: 'Haram (Alcool)', weight: 'Exclu' },
    { name: 'Sukuk État RCI', sector: 'Obligations', status: 'Sukuk (Certifié)', weight: '33%' },
];

export default function Philanthropy() {
    const [activeTab, setActiveTab] = useState('sharia');
    const [wealth, setWealth] = useState(15000000);

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0f766e, #042f2e)', border: '1px solid #14b8a6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(20,184,166,0.2)' }}>
                        <Scale size={22} color="#5eead4" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Finance Éthique & Philanthropie</h1>
                        <p style={{ marginBottom: 0 }}>Conformité Sharia, purifications et gestion de fondations privées.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #14b8a6', color: '#99f6e4' }}><Ban size={14} style={{ marginRight: 6 }} /> Liste d'exclusion</button>
                    <button className="btn btn-primary" style={{ background: '#0f766e', border: 'none' }}><HeartHandshake size={14} style={{ marginRight: 6 }} /> Initier versement Zakat</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #14b8a6' }}>
                    <div className="stat-icon" style={{ color: '#14b8a6' }}><CheckCircle size={20} /></div>
                    <div className="stat-value" style={{ color: '#5eead4' }}>100%</div>
                    <div className="stat-label">Conformité (Board Islamique)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper)' }}>
                    <div className="stat-icon"><CircleDollarSign size={20} color="var(--kd-copper)" /></div>
                    <div className="stat-value">{formatCurrency(375000, true)}</div>
                    <div className="stat-label">Zakat Estimée (Nisab Atteint)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="stat-icon"><Landmark size={20} color="#f59e0b" /></div>
                    <div className="stat-value">5.8M $</div>
                    <div className="stat-label">Fonds Waqf Sous-Gestion</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['sharia', '⚖️ Sharia Compliance (Screener)'], ['zakat', '🤲 Calculateur Zakat'], ['philanthropy', '🏛️ Dons & Fondations (Waqf)']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'sharia' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Algorithme de Filtrage (Screener)</h3>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Analyse temps réel des bilans et activités des entreprises cotées à la BRVM pour garantir la purification des revenus selon l'AAOIFI.</p>

                        <table className="data-table" style={{ marginTop: 'var(--space-3)' }}>
                            <thead>
                                <tr>
                                    <th>Actif (Sénégal/CI)</th>
                                    <th>Secteur</th>
                                    <th>Avis Sharia Board</th>
                                    <th>Poids Relatif</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HOLDINGS.map(h => (
                                    <tr key={h.name}>
                                        <td style={{ fontWeight: 800 }}>{h.name}</td>
                                        <td style={{ fontSize: 13 }}>{h.sector}</td>
                                        <td>
                                            <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: h.status.includes('Haram') ? 'rgba(239, 68, 68, 0.1)' : 'rgba(20, 184, 166, 0.1)', color: h.status.includes('Haram') ? '#ef4444' : '#14b8a6', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                                {h.status.includes('Haram') ? <Ban size={12} /> : <CheckCircle size={12} />} {h.status}
                                            </span>
                                        </td>
                                        <td style={{ color: h.weight === 'Exclu' ? '#ef4444' : 'var(--text-muted)' }}>{h.weight}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(20, 184, 166, 0.4)', background: 'linear-gradient(180deg, rgba(20,184,166,0.05) 0%, transparent 100%)' }}>
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#5eead4' }}>
                                <CheckCircle size={18} fill="#14b8a6" color="#0a0e17" /> Attestation de Conformité Annuelle
                            </h3>
                        </div>
                        <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                            <Scale size={48} color="#14b8a6" style={{ marginBottom: 16 }} />
                            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Fatwa & Certification Déléguée</div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>Ce portefeuille modèle ("Koppar Halal Fund") est audité semestriellement par des érudits indépendants.<br />Ratio de dettes interest-bearing respectant la limite de 33%.</div>
                            <button className="btn btn-secondary">Télécharger Rapport Sharia Board (PDF)</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'zakat' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Calculateur Automatisé Zakat Al-Maal (2.5%)</h3>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Calcul effectué sur la base d'une année lunaire (Hawl) sur l'ensemble de vos actifs ayant dépassé le seuil minimum (Nisab de ~85g d'or).</p>

                        <div style={{ marginTop: 'var(--space-4)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-primary)' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Liquidités bancaires</span>
                                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>$1,200,000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-primary)' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Actions & Sukuks (Valeur Nette)</span>
                                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>$13,500,000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid var(--border-primary)' }}>
                                <span style={{ color: 'var(--text-muted)' }}>Or physique & Métaux</span>
                                <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>$300,000</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, marginTop: 8 }}>
                                <span style={{ fontWeight: 800, fontSize: 16 }}>Base Zakat Globale</span>
                                <span style={{ fontSize: 18, color: '#10b981', fontWeight: 800, fontFamily: 'monospace' }}>$15,000,000</span>
                            </div>

                            <div style={{ marginTop: 24, padding: 'var(--space-4)', background: 'rgba(200, 121, 65, 0.1)', border: '1px solid var(--kd-copper)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--kd-copper-light)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Montant exigible (2.5%)</div>
                                <div style={{ fontSize: 36, fontWeight: 900, color: 'white', fontFamily: 'monospace' }}>$375,000</div>
                                <button className="btn btn-primary" style={{ marginTop: 16, background: '#10b981', color: 'black', fontWeight: 800 }}>Préparer le transfert</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
