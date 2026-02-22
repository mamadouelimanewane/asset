import { useState } from 'react';
import {
    Ship, Key, Crown, Clock, Plane, Palmtree, Hexagon, Diamond, Wine
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const LIFESTYLE_ASSETS = [
    { class: 'Art & Collections', value: 12500000, maint: 1.2 },
    { class: 'Aviation (Jet)', value: 8500000, maint: 6.5 },
    { class: 'Yachts & Voiliers', value: 4200000, maint: 10.0 },
    { class: 'Vignobles & Domaines', value: 18000000, maint: 3.5 },
];

const PASSPORTS_PROGRAMS = [
    { country: 'Antigua-et-Barbuda', cost: '100 000 USD', time: '4-5 mois', visaFree: 153, desc: 'Donation FDN' },
    { country: 'Sainte-Lucie', cost: '100 000 USD', time: '3-4 mois', visaFree: 147, desc: 'Donation NEF' },
    { country: 'Portugal (Golden Visa)', cost: '500 000 EUR', time: '12-18 mois', visaFree: 188, desc: 'Fonds d\'Inv. (FCR)' },
    { country: 'Émirats Arabes Unis', cost: '2M AED', time: '2 mois', visaFree: 180, desc: 'Immobilier (10 ans)' },
];

export default function Concierge() {
    const [activeTab, setActiveTab] = useState('assets');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', border: '1px solid #818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(129,140,248,0.2)' }}>
                        <Diamond size={22} color="#c7d2fe" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Passion Assets & Conciergerie UHNWI</h1>
                        <p style={{ marginBottom: 0 }}>Gestion des actifs tangibles d'exception, Golden Visas et services de conciergerie privée.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #818cf8', color: '#a5b4fc' }}><Palmtree size={14} style={{ marginRight: 6 }} /> Demander Relocalisation</button>
                    <button className="btn btn-primary" style={{ background: '#6366f1', border: 'none' }}><Crown size={14} style={{ marginRight: 6 }} /> Réserver Concierge</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #6366f1', background: 'rgba(99,102,241,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#a5b4fc' }}><Hexagon size={20} /></div>
                    <div className="stat-value" style={{ color: '#e0e7ff' }}>43.2M FCFA</div>
                    <div className="stat-label">Valeur Est. Actifs Tangibles</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f43f5e' }}>
                    <div className="stat-icon"><Clock size={20} color="#f43f5e" /></div>
                    <div className="stat-value">1.8M FCFA</div>
                    <div className="stat-label">Frais de Maintien Annuels (Opex)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-diamond)' }}>
                    <div className="stat-icon"><Key size={20} color="var(--kd-diamond)" /></div>
                    <div className="stat-value">2</div>
                    <div className="stat-label">Programmes CBI (Passeports) en cours</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['assets', '🎨 Passions & Collections'], ['mobility', '🛂 Mobilité Mondiale (CBI / RBI)'], ['services', '🛎️ Conciergerie Privée']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'assets' && (
                <div className="grid-2-1">
                    <div className="card">
                        <div className="card-header">
                            <h3>Valorisation des Classes Tangibles</h3>
                        </div>
                        <div style={{ height: 260, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={LIFESTYLE_ASSETS} layout="vertical" margin={{ left: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${(v / 1000000).toFixed(0)}M`} />
                                    <YAxis type="category" dataKey="class" stroke="white" fontSize={11} width={80} />
                                    <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ background: '#0f172a', border: '1px solid #6366f1', borderRadius: 8 }} />
                                    <Bar dataKey="value" name="Valorisation" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={28} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(244, 63, 94, 0.4)' }}>
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f43f5e' }}><Clock size={18} /> Budget Opex (Maintien)</h3>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Frais annuels moyens de conservation, assurance, mouillage et révision de la flotte.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {LIFESTYLE_ASSETS.map(ast => (
                                <div key={ast.class} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-primary)' }}>
                                    <span style={{ fontSize: 13, fontWeight: 600 }}>{ast.class}</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontWeight: 800, color: '#fca5a5' }}>{ast.maint}% de la valeur</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>~{((ast.value * ast.maint) / 100).toLocaleString('fr-FR')} FCFA / an</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'mobility' && (
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><GlobeLock size={18} /> Programmes de Citoyenneté par Investissement (CBI) & Golden Visas</h3>
                        <span className="badge badge-diamond">Partenaires Certifiés Henley & Partners</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Optimisation de la mobilité internationale pour les familles n'ayant pas de passeports forts (Schengen, US, UK Entry).</p>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Juridiction</th>
                                <th>Type / Véhicule d'Investissement</th>
                                <th>Coût de Base</th>
                                <th>Délai Procédural</th>
                                <th>Accès Pays (Visa-free)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PASSPORTS_PROGRAMS.map(prog => (
                                <tr key={prog.country}>
                                    <td style={{ fontWeight: 800 }}>{prog.country}</td>
                                    <td style={{ fontSize: 13 }}>{prog.desc}</td>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--kd-success)' }}>{prog.cost}</td>
                                    <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{prog.time}</td>
                                    <td><span style={{ fontSize: 12, fontWeight: 800, padding: '4px 8px', background: 'rgba(99,102,241,0.1)', color: '#818cf8', borderRadius: 4 }}>🌍 {prog.visaFree} Dest.</span></td>
                                    <td><button className="btn btn-secondary btn-sm" style={{ borderColor: '#6366f1', color: '#a5b4fc', fontSize: 11 }}>Ouvrir Dossier</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
