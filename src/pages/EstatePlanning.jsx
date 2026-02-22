import { useState } from 'react';
import {
    Users, ShieldCheck, FileText, Landmark, Key,
    Network, ArrowRight, GitBranch, Binary, Lock
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const SUCCESSION_DATA = [
    { name: 'Scénario Standard (Droit Commun)', impot: 12500000, net: 42500000 },
    { name: 'Démembrement (Usufruit)', impot: 4500000, net: 50500000 },
    { name: 'Holding Familiale (Dutreil/UEMOA)', impot: 1200000, net: 53800000 },
];

const VAULT_DOCS = [
    { name: 'Mandat de Protection Future - Modou', type: 'Contrat Intelligent', status: 'Haché sur Blockchain', date: '12 Jan 2026', size: '12 KB (Hash)' },
    { name: 'Statuts Holding Patrimoniale SC', type: 'Juridique', status: 'Vérifié', date: '04 Fév 2025', size: '2.4 MB' },
    { name: 'Testament Authentique (Copie Numérique)', type: 'Notarié', status: 'Crypté (AES-256)', date: '18 Nov 2024', size: '1.8 MB' },
];

export default function EstatePlanning() {
    const [activeTab, setActiveTab] = useState('tree');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid #c87941', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white' }}>
                        <Landmark size={22} color="#c87941" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Planification Successorale & Family Office</h1>
                        <p style={{ marginBottom: 0 }}>Structuration transgénérationnelle, Fiscalité et Coffre-fort numérique</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary"><Users size={14} style={{ marginRight: 6 }} /> Inviter Membre de la Famille</button>
                    <button className="btn btn-primary"><ShieldCheck size={14} style={{ marginRight: 6 }} /> Activer Protection Legale</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper)' }}>
                    <div className="stat-icon"><Landmark size={20} /></div>
                    <div className="stat-value">55M FCFA</div>
                    <div className="stat-label">Patrimoine Familial Consolidé</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                    <div className="stat-icon"><Network size={20} color="#8b5cf6" /></div>
                    <div className="stat-value">3</div>
                    <div className="stat-label">Générations Impliquées</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981' }}>
                    <div className="stat-icon"><ShieldCheck size={20} color="#10b981" /></div>
                    <div className="stat-value">82%</div>
                    <div className="stat-label">Taux d'Optimisation Fiscale</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['tree', '🌳 Arbre Patrimonial'], ['fiscal', '⚖️ Simulateur Fiscal'], ['vault', '🔐 Coffre-fort Blockchain']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'tree' && (
                <div className="card" style={{ minHeight: 400, background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
                    <div className="card-header" style={{ marginBottom: 'var(--space-4)' }}>
                        <h3>Topologie Structuration (Groupe Familial)</h3>
                        <span className="badge badge-copper">Vue détaillée</span>
                    </div>

                    {/* Visualisation simplifiée de l'arbre */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
                        {/* Parent */}
                        <div style={{ padding: 'var(--space-3)', width: 250, background: 'linear-gradient(180deg, var(--kd-copper-dark), var(--bg-elevated))', border: '1px solid var(--kd-copper)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                            <div style={{ fontWeight: 800, fontSize: 16 }}>Modou Gueye (Patriarche)</div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Usufruitier • 100% Droits de vote</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginTop: 8 }}>Valorisation: 45M FCFA</div>
                        </div>

                        <div style={{ height: 40, width: 2, background: 'var(--kd-copper-light)' }}></div>

                        {/* Holding */}
                        <div style={{ padding: 'var(--space-3)', width: 350, background: 'var(--bg-elevated)', border: '1px solid #8b5cf6', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#8b5cf6', marginBottom: 4 }}>
                                <Landmark size={16} /> <span style={{ fontWeight: 800, fontSize: 14 }}>HOLDING "GUEYE INVEST" (SC)</span>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Démembrement de propriété actif</div>
                        </div>

                        <div style={{ display: 'flex', gap: 150, marginTop: 20, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: -20, left: 100, right: 100, height: 2, background: 'var(--border-primary)' }}></div>
                            {/* Enfant 1 */}
                            <div style={{ position: 'relative', padding: 'var(--space-3)', width: 200, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                <div style={{ position: 'absolute', top: -20, left: '50%', width: 2, height: 20, background: 'var(--border-primary)' }}></div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>Aïssatou Gueye (Fille)</div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Nue-propriétaire (50%)</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--kd-success)', marginTop: 8 }}>Avenir: +22M FCFA</div>
                            </div>
                            {/* Enfant 2 */}
                            <div style={{ position: 'relative', padding: 'var(--space-3)', width: 200, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                <div style={{ position: 'absolute', top: -20, left: '50%', width: 2, height: 20, background: 'var(--border-primary)' }}></div>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>Cheikh Gueye (Fils)</div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Nue-propriétaire (50%)</div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--kd-success)', marginTop: 8 }}>Avenir: +22M FCFA</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'fiscal' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Impact Fiscal : Transmission d'un portefeuille de 55M FCFA</h3>
                        </div>
                        <div style={{ height: 300, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={SUCCESSION_DATA} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                                    <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickFormatter={(v) => `${v / 1000000}M`} />
                                    <YAxis type="category" dataKey="name" stroke="var(--text-muted)" fontSize={11} width={120} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ background: '#0f172a', border: '1px solid var(--border-secondary)' }} />
                                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                                    <Bar dataKey="impot" name="Droits de succession / Impôts" stackId="a" fill="#EF4444" radius={[0, 0, 0, 0]} barSize={24} />
                                    <Bar dataKey="net" name="Capital Net Transmis" stackId="a" fill="#10B981" radius={[0, 4, 4, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'rgba(16, 185, 129, 0.1)', border: '1px dashed rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)' }}>
                            <span style={{ fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: 8 }}><ShieldCheck size={16} /> Recommandation Stratégique</span>
                            <p style={{ margin: '8px 0 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>L'utilisation combinée d'une Holding Structurante (Pacte d'actionnaires) et d'une donation en démembrement de propriété permet d'économiser près de <strong>11.3M FCFA</strong> en droits de mutation par rapport au régime de droit commun (Sénégal/Côte d'Ivoire).</p>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'vault' && (
                <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                    <div className="card-header" style={{ borderBottom: '1px solid var(--border-primary)', paddingBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A78BFA' }}><Lock size={18} /> Digital Vault (Web3 / Blockchain Secured)</h3>
                        <button className="btn btn-primary btn-sm" style={{ background: '#8b5cf6' }}>+ Uploader Document Confidentiel</button>
                    </div>

                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 'var(--space-3) 0' }}>
                        Vos documents testamentaires et pactes d'associés sont hachés cryptographiquement. Leur empreinte (SHA-256) est ancrée sur la blockchain Ethereum, garantissant qu'ils n'ont subi aucune altération depuis leur dépôt, avec des droits d'accès uniquement configurables via Multi-Sig.
                    </p>

                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Document Intitulé</th>
                                    <th>Nature Juridique</th>
                                    <th>Certification (Status)</th>
                                    <th>Poids / Empreinte</th>
                                    <th>Date d'ancrage</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {VAULT_DOCS.map((doc, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: 'white' }}>{doc.name}</td>
                                        <td>{doc.type}</td>
                                        <td>
                                            <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 4, background: doc.status.includes('Blockchain') ? 'rgba(139, 92, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: doc.status.includes('Blockchain') ? '#A78BFA' : '#10B981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                                {doc.status.includes('Blockchain') ? <Binary size={12} /> : <ShieldCheck size={12} />} {doc.status}
                                            </span>
                                        </td>
                                        <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{doc.size}</td>
                                        <td style={{ fontSize: 12 }}>{doc.date}</td>
                                        <td>
                                            <button className="btn btn-ghost btn-sm">Décrypter & Voir <ArrowRight size={14} style={{ marginLeft: 4 }} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
