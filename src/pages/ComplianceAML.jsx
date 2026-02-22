import { useState } from 'react';
import {
    ShieldAlert, Search, GlobeLock, UserX, AlertTriangle, FileWarning, Fingerprint, Activity
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const RISK_SCORE_DATA = [
    { name: 'Risque Faible', value: 65, color: '#10B981' },
    { name: 'Risque Moyen', value: 25, color: '#F59E0B' },
    { name: 'Risque Élevé', value: 10, color: '#EF4444' },
];

const TX_MONITORING = [
    { time: '08:00', volume: 12 },
    { time: '10:00', volume: 45 },
    { time: '12:00', volume: 28 },
    { time: '14:00', volume: 80 }, // Alert triggered here
    { time: '16:00', volume: 35 },
    { time: '18:00', volume: 15 },
];

const ALERTS = [
    { id: 'AL-901', client: 'M. Sarr', type: 'Sanction Check (OFAC)', status: 'Alerte Rouge', date: 'Il y a 10 min', desc: 'Correspondance partielle avec liste SDN.' },
    { id: 'AL-902', client: 'Groupe Kassé', type: 'Virement Inhabituel', status: 'Investigation', date: 'Hier, 14:30', desc: 'Virement sortant \u003E 50M FCFA vers juridiction offshore (Îles Vierges).' },
    {
        id: 'AL-903', client: 'Ami Ndiaye', type: 'KYC Expiré', status: 'Avertissement', date: 'Il y a 2 jours', desc: 'Carte d\\'identité nationale expirée.Gel des retraits imminent.' },
    { id: 'AL-904', client: 'Dr. Fall', type: 'Statut PEP (Politique)', status: 'Revue Annuelle', date: 'Il y a 5 jours', desc: 'Nomination récente au gouvernement. Diligence renforcée requise.' },
];

export default function ComplianceAML() {
    const [activeTab, setActiveTab] = useState('monitoring');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #7f1d1d, #450a0a)', border: '1px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(239,68,68,0.2)' }}>
                        <ShieldAlert size={22} color="#fca5a5" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Conformité & LCB-FT</h1>
                        <p style={{ marginBottom: 0 }}>Lutte Anti-Blanchiment, Screening OFAC/ONU et Surveillance des Transactions (CENTIF).</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #ef4444', color: '#fca5a5' }}><FileWarning size={14} style={{ marginRight: 6 }} /> Générer Déclaration de Soupçon (STR)</button>
                    <button className="btn btn-primary" style={{ background: '#ef4444', border: 'none' }}><GlobeLock size={14} style={{ marginRight: 6 }} /> Actualiser Listes de Sanctions</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #ef4444', background: 'rgba(239,68,68,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#fca5a5' }}><AlertTriangle size={20} /></div>
                    <div className="stat-value" style={{ color: '#fef2f2' }}>14</div>
                    <div className="stat-label">Alertes Critiques en Suspens</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="stat-icon"><UserX size={20} color="#f59e0b" /></div>
                    <div className="stat-value">5</div>
                    <div className="stat-label">PEP (Diligence Renforcée)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="stat-icon"><Fingerprint size={20} color="#10b981" /></div>
                    <div className="stat-value">98.5%</div>
                    <div className="stat-label">Dossiers KYC/KYB à Jour</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['monitoring', '🔍 Surveillance Transactions'], ['screening', '🌐 Screening (Sanctions & PEP)'], ['reports', '📑 Rapports Réglementaires']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'monitoring' && (
                <div className="grid-2-1">
                    <div className="card">
                        <div className="card-header">
                            <h3>Volume des Transactions (Détection IA)</h3>
                            <span className="badge badge-warning">Seuil d'Anomalie: Moyenne + 2 SD</span>
                        </div>
                        <div style={{ height: 260, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={TX_MONITORING}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="time" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: '#0a0e17', borderRadius: 8, border: '1px solid #ef4444' }} />
                                    <Line type="monotone" dataKey="volume" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#0a0e17', stroke: '#ef4444', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#ef4444' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                        <div className="card-header">
                            <h3 style={{ color: '#fca5a5', display: 'flex', alignItems: 'center', gap: 8 }}><Activity size={18} /> File d'Alertes IA</h3>
                        </div>
                        <div style={{ marginTop: 'var(--space-3)' }}>
                            {ALERTS.map(alert => (
                                <div key={alert.id} style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', marginBottom: 8, borderLeft: `3px solid ${alert.status.includes('Rouge') ? '#ef4444' : alert.status.includes('Investigation') ? '#f59e0b' : 'var(--text-muted)'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <div style={{ fontWeight: 800, fontSize: 13 }}>{alert.client}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{alert.date}</div>
                                    </div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 4 }}>{alert.type}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4 }}>{alert.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'screening' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Répartition Globale du Risque Clients</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', height: 250, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={RISK_SCORE_DATA} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={2} dataKey="value" stroke="none">
                                        {RISK_SCORE_DATA.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                                    </Pie>
                                    <Tooltip contentStyle={{ background: '#0a0e17', borderRadius: 8, border: 'none' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, fontSize: 13 }}>
                            {RISK_SCORE_DATA.map(d => (
                                <div key={d.name} style={{ textAlign: 'center' }}>
                                    <div style={{ color: 'var(--text-secondary)' }}>{d.name}</div>
                                    <div style={{ fontWeight: 800, color: d.color }}>{d.value}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Bases de Données Interrogées (API)</h3>
                        </div>
                        <table className="data-table" style={{ marginTop: 'var(--space-4)' }}>
                            <thead>
                                <tr>
                                    <th>Fournisseur / Liste</th>
                                    <th>Cible</th>
                                    <th>Statut de Sync.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Dow Jones Risk & Compliance</td>
                                    <td>PEP Mondiaux & Médias Négatifs</td>
                                    <td><span className="badge badge-success">À jour (Il y a 1h)</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>OFAC (Trésor US)</td>
                                    <td>Sanctions & SDN List</td>
                                    <td><span className="badge badge-success">À jour (En temps réel)</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>ONU - Conseil de Sécurité</td>
                                    <td>Résolutions Terrorisme</td>
                                    <td><span className="badge badge-success">À jour (Il y a 6h)</span></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Gendarmerie Nationale (UEMOA)</td>
                                    <td>Fugitifs & Interdits Bancaires</td>
                                    <td><span className="badge badge-warning">En cours (Synchronisation lente)</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
