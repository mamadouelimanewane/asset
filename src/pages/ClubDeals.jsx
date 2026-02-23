import { useState } from 'react';
import {
    Users, Target, Network, Layers, ShieldCheck, Lock, ArrowRightCircle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

const CLUB_DEALS = [
    { id: 'CD-01', name: 'TechHub Dakar (Série A)', sector: 'Venture Capital', target: 2500000000, committed: 1800000000, investors: 6, status: 'Souscription Ouverte' },
    { id: 'CD-02', name: 'Ferme Solaire Diourbel', sector: 'Infrastructures', target: 5000000000, committed: 5000000000, investors: 14, status: 'Clôturé / Déployé' },
    { id: 'CD-03', name: 'Logistique Portuaire (SPV)', sector: 'Private Equity', target: 8000000000, committed: 3200000000, investors: 3, status: 'Soft Commits' },
];

const FUNDING_PROGRESS = [
    { name: 'TechHub Dakar', raised: 1800, target: 2500 },
    { name: 'Logistique SPV', raised: 3200, target: 8000 },
];

export default function ClubDeals() {
    const [activeTab, setActiveTab] = useState('deals');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #064e3b, #022c22)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(16,185,129,0.3)' }}>
                        <Network size={22} color="#34d399" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Syndication & Club Deals</h1>
                        <p style={{ marginBottom: 0 }}>Réseau privé d'investissement, SPV et tour de table entre clients (Co-Investissement).</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #10b981', color: '#6ee7b7' }}><Layers size={14} style={{ marginRight: 6 }} /> Structurer un SPV</button>
                    <button className="btn btn-primary" style={{ background: '#10b981', border: 'none', color: '#022c22' }}><Target size={14} style={{ marginRight: 6 }} /> Proposer un Deal</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981', background: 'rgba(16,185,129,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#34d399' }}><Target size={20} /></div>
                    <div className="stat-value" style={{ color: '#a7f3d0' }}>5.0Md FCFA</div>
                    <div className="stat-label">Engagements (Soft Commits) en cours</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                    <div className="stat-icon"><Layers size={20} color="#3b82f6" /></div>
                    <div className="stat-value">3</div>
                    <div className="stat-label">Deals Actifs dans la Data Room</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper)' }}>
                    <div className="stat-icon"><Users size={20} color="var(--kd-copper)" /></div>
                    <div className="stat-value">23</div>
                    <div className="stat-label">LPs (Investisseurs Qualifiés) Inscrits</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['deals', '🏢 Deals Ouverts (Data Room)'], ['progress', '📊 Levées de Fonds'], ['legal', '⚖️ Juridique & SPV']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'deals' && (
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Lock size={18} /> Opportunités Exclusives (Non-Publiques)</h3>
                    </div>

                    <div className="grid-2">
                        {CLUB_DEALS.filter(d => d.status !== 'Clôturé / Déployé').map(deal => (
                            <div key={deal.id} style={{ border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', background: 'var(--bg-tertiary)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div>
                                        <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>{deal.name}</h4>
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{deal.sector}</span>
                                    </div>
                                    <span className="badge badge-warning">{deal.status}</span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Levée Cible</span>
                                    <span style={{ fontWeight: 800, fontFamily: 'monospace' }}>{(deal.target / 1000000).toLocaleString('fr-FR')}M FCFA</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 16 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Abonné (Commits)</span>
                                    <span style={{ fontWeight: 800, color: '#10b981', fontFamily: 'monospace' }}>{(deal.committed / 1000000).toLocaleString('fr-FR')}M FCFA</span>
                                </div>

                                <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, marginBottom: 16 }}>
                                    <div style={{ width: `${(deal.committed / deal.target) * 100}%`, height: '100%', background: '#10b981', borderRadius: 3 }}></div>
                                </div>

                                <div style={{ display: 'flex', gap: 8 }}>
                                    <button className="btn btn-secondary btn-sm" style={{ flex: 1, fontSize: 11 }}><Lock size={12} style={{ marginRight: 4 }} /> Data Room</button>
                                    <button className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: 11, background: '#10b981', color: '#000' }}>S'engager</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'progress' && (
                <div className="card">
                    <div className="card-header">
                        <h3>Progression de la Syndication (en Millions FCFA)</h3>
                    </div>
                    <div style={{ height: 300, marginTop: 'var(--space-4)' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={FUNDING_PROGRESS} layout="vertical" margin={{ left: 40, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${v}M`} />
                                <YAxis type="category" dataKey="name" stroke="white" fontSize={12} width={100} />
                                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ background: '#0a0e17', borderRadius: 8, border: '1px solid var(--border-primary)' }} />
                                {/* Target line trick */}
                                <Bar dataKey="target" name="Cible" fill="rgba(255,255,255,0.1)" radius={[0, 4, 4, 0]} barSize={24} />
                                <Bar dataKey="raised" name="Levé (Engagé)" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} style={{ transform: 'translateY(-24px)' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {activeTab === 'legal' && (
                <div className="card" style={{ border: '1px solid rgba(59, 130, 246, 0.4)', background: 'linear-gradient(180deg, rgba(59,130,246,0.05) 0%, transparent 100%)' }}>
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#60a5fa' }}><ShieldCheck size={18} /> Génération de SPV (Special Purpose Vehicle)</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Lorsqu'un Club Deal est entièrement souscrit, l'IA juridique de Diambar formalise l'entité regroupant les investisseurs.</p>

                    <div style={{ padding: 'var(--space-4)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <Layers size={48} color="#60a5fa" style={{ marginBottom: 16 }} />
                        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Statuts & Pacte d'actionnaires automatisés</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>La structure 'Logistique Portuaire SPV' a rassemblé ses 3,2Md FCFA.<br />Les statuts de la SAS de syndication sont prêts pour signature électronique.</div>
                        <button className="btn btn-primary" style={{ background: '#3b82f6', border: 'none' }}><ArrowRightCircle size={16} style={{ marginRight: 6 }} /> Lancer la constitution</button>
                    </div>
                </div>
            )}
        </div>
    );
}
