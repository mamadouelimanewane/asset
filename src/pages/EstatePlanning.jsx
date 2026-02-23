import { useState } from 'react';
import {
    GitBranch, Users, ShieldAlert, FileText, Calculator,
    Home, Building, Landmark, Percent, ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const HEIRS = [
    { id: 'H1', name: 'Moussa Ndiaye', relation: 'Conjoint(e)', share: 50, taxRate: 5, age: 62 },
    { id: 'H2', name: 'Aminata Ndiaye', relation: 'Enfant', share: 25, taxRate: 15, age: 34 },
    { id: 'H3', name: 'Ibrahima Ndiaye', relation: 'Enfant', share: 25, taxRate: 15, age: 29 },
];

const ASSETS = [
    { name: 'Immobilier', value: 2500000000, color: '#3b82f6' },
    { name: 'Liquidités', value: 800000000, color: '#10b981' },
    { name: 'Parts Entreprise', value: 4200000000, color: '#f59e0b' },
    { name: 'Actifs Alternatifs', value: 1500000000, color: '#8b5cf6' },
];

export default function EstatePlanning() {
    const [activeTab, setActiveTab] = useState('overview');
    const totalAssets = ASSETS.reduce((sum, item) => sum + item.value, 0);
    const estimatedTax = totalAssets * 0.18; // 18% moyenne simulée

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #4c1d95, #312e81)', border: '1px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
                        <GitBranch size={22} color="#c4b5fd" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Planification Successorale & Estate</h1>
                        <p style={{ marginBottom: 0 }}>Simulation des droits de mutation, démembrement et optimisation de la transmission.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #8b5cf6', color: '#c4b5fd' }}><FileText size={14} style={{ marginRight: 6 }} /> Éditer Testament</button>
                    <button className="btn btn-primary" style={{ background: '#8b5cf6', border: 'none' }}><Calculator size={14} style={{ marginRight: 6 }} /> Simuler SCI/Holding</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59,130,246,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#93c5fd' }}><Landmark size={20} /></div>
                    <div className="stat-value" style={{ color: '#bfdbfe' }}>{formatCurrency(totalAssets, true)}</div>
                    <div className="stat-label">Masse Successorale Nette</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #ef4444' }}>
                    <div className="stat-icon"><ShieldAlert size={20} color="#ef4444" /></div>
                    <div className="stat-value" style={{ color: '#fca5a5' }}>{formatCurrency(estimatedTax, true)}</div>
                    <div className="stat-label">Droits de Succession Estimés (Pire Cas)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="stat-icon"><Percent size={20} color="#10b981" /></div>
                    <div className="stat-value" style={{ color: '#a7f3d0' }}>- 45%</div>
                    <div className="stat-label">Économie Potentielle via Démembrement</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['overview', '🌳 Arbre & Quotités'], ['optimization', '⚙️ Stratégies d\'Optimisation'], ['documents', '📁 Actes Notariés']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="grid-2-1">
                    <div className="card">
                        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Users size={18} /> Bénéficiaires et Héritiers Réservataires</h3>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Lien de Parenté</th>
                                    <th>Quote-part légale</th>
                                    <th>Valeur Estimée</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HEIRS.map(heir => (
                                    <tr key={heir.id}>
                                        <td style={{ fontWeight: 800 }}>{heir.name} <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{heir.age} ans</div></td>
                                        <td><span className="badge badge-info">{heir.relation}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                                                    <div style={{ width: `${heir.share}%`, height: '100%', background: '#8b5cf6', borderRadius: 3 }}></div>
                                                </div>
                                                <span style={{ fontSize: 11 }}>{heir.share}%</span>
                                            </div>
                                        </td>
                                        <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#10b981' }}>
                                            {formatCurrency(totalAssets * (heir.share / 100), true)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Composition du Patrimoine</h3>
                        </div>
                        <div style={{ height: 250, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={ASSETS} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                                        {ASSETS.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip formatter={(value) => formatCurrency(value, true)} contentStyle={{ background: '#0a0e17', borderRadius: 8, border: 'none' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'optimization' && (
                <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.4)' }}>
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#c4b5fd' }}><Calculator size={18} /> Scénarios de Transmission Assistés par IA</h3>
                    </div>

                    <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: 16, borderLeft: '3px solid #10b981' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <div style={{ fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Home size={16} color="#10b981" /> Donation-Partage avec Démembrement de Propriété
                            </div>
                            <span className="badge badge-success">Recommandé</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                            Le Donateur (62 ans) donne la Nue-Propriété du parc immobilier à ses enfants, en conservant l'Usufruit (loyers).
                            La valeur imposable de la nue-propriété est réduite à 50% selon le barème fiscal, économisant massivement sur les droits finaux.
                        </p>
                        <div style={{ marginTop: 16, padding: 12, background: 'rgba(0,0,0,0.2)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Droits Prévus Actuels</div>
                                <div style={{ fontWeight: 800, color: '#ef4444' }}>~450M FCFA</div>
                            </div>
                            <ArrowRight size={16} color="var(--text-muted)" />
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Droits Après Démembrement</div>
                                <div style={{ fontWeight: 800, color: '#10b981', fontSize: 18 }}>~210M FCFA</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #3b82f6' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <div style={{ fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Building size={16} color="#3b82f6" /> Apport à une Holding (Transmission d'Entreprise)
                            </div>
                            <span className="badge badge-info">Action Requise</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                            Sécurisation des parts de la société opérationnelle dans une holding familiale avec pacte Dutreil (si applicable).
                            Cela évite le démantèlement de l'entreprise pour payer l'impôt successoral.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
