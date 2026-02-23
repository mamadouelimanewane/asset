import { useState } from 'react';
import {
    Building, MapPin, Key, Home, PieChart as PieChartIcon,
    TrendingUp, Plus, Hammer, Wrench
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const PROPERTIES = [
    { id: 'PR-1', name: 'Tour Zenith', city: 'Dakar', type: 'Bureau', val: 1250000000, yield: '8.5%', occupation: 100 },
    { id: 'PR-2', name: 'Villa Plateau', city: 'Dakar', type: 'Résidentiel', val: 850000000, yield: '5.2%', occupation: 100 },
    { id: 'PR-3', name: 'Riviera Mall', city: 'Abidjan', type: 'Commercial', val: 2400000000, yield: '11.0%', occupation: 85 },
    { id: 'PR-4', name: 'Appartement 16e', city: 'Paris', type: 'Résidentiel', val: 1850000000, yield: '3.1%', occupation: 0 },
];

const YIELD_DATA = [
    { month: 'S1', res: 4.5, com: 9.2, off: 7.8 },
    { month: 'S2', res: 4.8, com: 9.8, off: 8.1 },
    { month: 'S3', res: 4.9, com: 10.5, off: 8.5 },
    { month: 'S4', res: 5.1, com: 11.0, off: 8.5 },
];

const TYPE_ALLOCATION = [
    { name: 'Résidentiel', value: 42, color: '#3b82f6' },
    { name: 'Commercial', value: 38, color: '#10b981' },
    { name: 'Bureau (Tertiaire)', value: 20, color: '#f59e0b' },
];

export default function RealEstate() {
    const [activeTab, setActiveTab] = useState('portfolio');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e3a8a, #0f172a)', border: '1px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
                        <Building size={22} color="#93c5fd" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Real Estate & PropTech</h1>
                        <p style={{ marginBottom: 0 }}>Gestion globale du parc immobilier, rendements locatifs et valorisation de marché.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #3b82f6', color: '#93c5fd' }}><Plus size={14} style={{ marginRight: 6 }} /> Ajouter un Bien</button>
                    <button className="btn btn-primary" style={{ background: '#3b82f6', border: 'none' }}><PieChartIcon size={14} style={{ marginRight: 6 }} /> Bilan Foncier</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6', background: 'rgba(59,130,246,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#93c5fd' }}><Home size={20} /></div>
                    <div className="stat-value" style={{ color: '#bfdbfe' }}>6.35Md FCFA</div>
                    <div className="stat-label">Valeur du Parc Immobilier</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="stat-icon"><TrendingUp size={20} color="#10b981" /></div>
                    <div className="stat-value">7.8%</div>
                    <div className="stat-label">Rendement Locatif (Moy.)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="stat-icon"><Key size={20} color="#f59e0b" /></div>
                    <div className="stat-value">91%</div>
                    <div className="stat-label">Taux d'Occupation Global</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['portfolio', '🏘️ Inventaire & Biens'], ['yield', '📈 Rendements & Cash-Flow'], ['maintenance', '🛠️ Travaux & Rénovation']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'portfolio' && (
                <div className="grid-2-1">
                    <div className="card">
                        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={18} /> Registre Foncier International</h3>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nom du Bien</th>
                                    <th>Localisation</th>
                                    <th>Type</th>
                                    <th>Valorisation (Est.)</th>
                                    <th>Taux d'Occup.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PROPERTIES.map(prop => (
                                    <tr key={prop.id}>
                                        <td style={{ fontWeight: 800 }}>{prop.name}</td>
                                        <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{prop.city}</td>
                                        <td><span className={`badge ${prop.type === 'Résidentiel' ? 'badge-info' : prop.type === 'Commercial' ? 'badge-success' : 'badge-warning'}`}>{prop.type}</span></td>
                                        <td style={{ fontFamily: 'monospace', fontWeight: 700 }}>{formatCurrency(prop.val, true)}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3 }}>
                                                    <div style={{ width: `${prop.occupation}%`, height: '100%', background: prop.occupation === 100 ? '#10b981' : prop.occupation > 50 ? '#f59e0b' : '#ef4444', borderRadius: 3 }}></div>
                                                </div>
                                                <span style={{ fontSize: 11 }}>{prop.occupation}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Répartition par Classe (Valeur)</h3>
                        </div>
                        <div style={{ height: 250, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={TYPE_ALLOCATION} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={3} dataKey="value" stroke="none">
                                        {TYPE_ALLOCATION.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: '#0a0e17', borderRadius: 8, border: 'none' }} formatter={(val) => `${val}%`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
                            {TYPE_ALLOCATION.map(a => (
                                <div key={a.name} style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{a.name}</div>
                                    <div style={{ fontWeight: 800, color: a.color }}>{a.value}%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'yield' && (
                <div className="card">
                    <div className="card-header">
                        <h3>Évolution des Rendements Locatifs (Net)</h3>
                        <span className="badge badge-success">Commercial en forte hausse</span>
                    </div>
                    <div style={{ height: 300, marginTop: 'var(--space-4)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={YIELD_DATA} margin={{ left: -10 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}%`} />
                                <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid var(--border-primary)', borderRadius: 8 }} />
                                <Bar dataKey="res" name="Résidentiel" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="off" name="Bureaux" fill="#f59e0b" radius={[2, 2, 0, 0]} />
                                <Bar dataKey="com" name="Commercial" fill="#10b981" radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {activeTab === 'maintenance' && (
                <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f59e0b' }}><Hammer size={18} /> Tableau de Bord des Rénovations</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Planification des CapEx (Dépenses en Capital) pour le maintien en condition et la valorisation du parc.</p>

                    <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: 8, borderLeft: '3px solid #ef4444' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <div style={{ fontWeight: 800, fontSize: 13 }}>Appartement 16e (Paris) - Refit Complet</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#ef4444' }}>- 250M FCFA</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Urgent: Propriété inoccuppée. Devis validé, début des travaux le mois prochain pour remise en location (Yield ciblé: 4.5%).</div>
                    </div>

                    <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: 8, borderLeft: '3px solid #f59e0b' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <div style={{ fontWeight: 800, fontSize: 13 }}>Riviera Mall (Abidjan) - Réfection Climatisation Centrale</div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>- 45M FCFA</div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Planifié Q3 2026. Maintien des normes environnementales et confort locatif.</div>
                    </div>
                </div>
            )}
        </div>
    );
}
