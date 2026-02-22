import { useState } from 'react';
import { Receipt, Calendar, FileText, Download, Send, Zap, CreditCard, DollarSign, Activity, Wallet, Smartphone, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const INVOICES = [
    { id: 'FAC-2026-0045', client: 'Groupe Seck Holdings', amount: 4500000, date: '2026-02-15', dueDate: '2026-03-01', status: 'Pending', method: 'Virement UEMOA (SICA-STAR)' },
    { id: 'FAC-2026-0044', client: 'Dr. Abdoulaye Diallo', amount: 125000, date: '2026-02-10', dueDate: '2026-02-25', status: 'Paid', method: 'Wave Business' },
    { id: 'FAC-2026-0043', client: 'Teranga Ventures', amount: 2850000, date: '2026-02-05', dueDate: '2026-02-20', status: 'Late', method: 'Virement SWIFT' },
    { id: 'FAC-2026-0042', client: 'Adja Mbacké', amount: 85000, date: '2026-02-01', dueDate: '2026-02-15', status: 'Paid', method: 'Orange Money Pro' },
    { id: 'FAC-2026-0041', client: 'Clinique de l\'Espoir', amount: 1560000, date: '2026-01-28', dueDate: '2026-02-12', status: 'Paid', method: 'Prélèvement AUM' }
];

export default function Billing() {
    const [activeTab, setActiveTab] = useState('invoices');

    const totalRevenue = 145000000;
    const pendingRevenue = INVOICES.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + i.amount, 0);

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #047857)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(16,185,129,0.4)', color: 'white' }}>
                        <Receipt size={22} />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Facturation & Opérations (Billing)</h1>
                        <p style={{ marginBottom: 0 }}>Paiements Connectés (Wave, Orange, UEMOA), Prélèvement AUM Auto</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary"><Download size={14} /> Export Comptable (SYSCOHADA)</button>
                    <button className="btn btn-primary"><FileText size={14} /> Générer Facture</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-success)', background: 'rgba(16,185,129,0.05)' }}>
                    <div className="stat-icon"><DollarSign size={20} color="#10b981" /></div>
                    <div className="stat-value" style={{ color: '#10b981' }}>{formatCurrency(totalRevenue, true)}</div>
                    <div className="stat-label">Revenu Encaissé (YTD)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-warning)' }}>
                    <div className="stat-icon"><Activity size={20} color="#F59E0B" /></div>
                    <div className="stat-value">{formatCurrency(pendingRevenue, true)}</div>
                    <div className="stat-label">En Attente de Recouvrement</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                    <div className="stat-icon"><Smartphone size={20} color="#8B5CF6" /></div>
                    <div className="stat-value">68%</div>
                    <div className="stat-label">Part Payée via Mobile Money</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper-light)' }}>
                    <div className="stat-icon"><ShieldCheck size={20} /></div>
                    <div className="stat-value">100%</div>
                    <div className="stat-label">Conformité BCEAO</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['invoices', '🧾 Centre de Facturation'], ['methods', '💳 Moyens de Paiements'], ['analytics', '📊 Trésorerie & Revenus']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'invoices' && (
                <div className="card" style={{ padding: 0 }}>
                    <div className="card-header" style={{ borderBottom: '1px solid var(--border-primary)', padding: 'var(--space-3)' }}>
                        <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, margin: 0 }}>Dernières Factures Émises</h3>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>N° Facture</th>
                                <th>Client (Comptable)</th>
                                <th>Montant (FCFA)</th>
                                <th>Date d'émission</th>
                                <th>Échéance</th>
                                <th>Méthode Auto</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {INVOICES.map(inv => (
                                <tr key={inv.id}>
                                    <td style={{ fontWeight: 800, fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{inv.id}</td>
                                    <td style={{ fontWeight: 600 }}>{inv.client}</td>
                                    <td style={{ fontWeight: 700, fontFamily: 'monospace', color: 'var(--kd-copper-light)' }}>{formatCurrency(inv.amount, true)}</td>
                                    <td style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(inv.date).toLocaleDateString('fr-FR')}</td>
                                    <td style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(inv.dueDate).toLocaleDateString('fr-FR')}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600 }}>
                                            {inv.method.includes('Wave') ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} /> :
                                                inv.method.includes('Orange') ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }} /> :
                                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--kd-copper)' }} />}
                                            {inv.method}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge badge-${inv.status === 'Paid' ? 'green' : inv.status === 'Late' ? 'red' : 'yellow'}`} style={{ padding: '4px 8px', fontSize: 11, fontWeight: 700 }}>
                                            {inv.status === 'Paid' ? 'PAYÉ ✓' : inv.status === 'Late' ? 'EN RETARD !' : 'EN ATTENTE'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-ghost btn-sm" title="Télécharger"><Download size={13} /></button>
                                            <button className="btn btn-ghost btn-sm" title="Relance WhatsApp"><Send size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'methods' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>🔗 Agrégation de Paiements (Afrique de l'Ouest)</h3>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>Connectez vos comptes pour l'encaissement automatique des frais de performance et de gestion.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid #3b82f6', borderRadius: 'var(--radius-md)', background: 'rgba(59, 130, 246, 0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16 }}>W</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14 }}>Wave Business (API)</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Encaissement B2C (Clients Particuliers) • Frais : 1%</div>
                                    </div>
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ color: '#10b981', border: '1px solid #10b981' }}>Connecté ✓</button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid #f97316', borderRadius: 'var(--radius-md)', background: 'rgba(249, 115, 22, 0.05)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f97316', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16 }}>OM</div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14 }}>Orange Money Pro</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Encaissement B2B & Mass Payouts • Frais : 1.5%</div>
                                    </div>
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ color: '#10b981', border: '1px solid #10b981' }}>Connecté ✓</button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--bg-secondary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Wallet size={20} /></div>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14 }}>Prélèvement Automatique (AUM)</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Déduction intra-compte (Dépôts BNI/ECOBANK)</div>
                                    </div>
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ color: '#10b981', border: '1px solid #10b981' }}>Actif ✓</button>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.02)' }}>
                        <div className="card-header">
                            <h3 style={{ color: '#F59E0B', display: 'flex', alignItems: 'center', gap: 8 }}><Zap size={18} /> Alertes Recouvrements Diambar</h3>
                        </div>
                        <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #ef4444' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Teranga Ventures - En Souffrance (5j)</div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
                                    La facture <strong>FAC-2026-0043 (2.85M FCFA)</strong> a dépassé l'échéance. Le client effectue d'habitude ses virements les lundis matins.
                                </div>
                                <button className="btn btn-primary btn-sm" style={{ marginTop: 8, padding: '4px 12px', fontSize: 11, background: '#ef4444', border: 'none' }}>Générer Lien de Paiement Rapide</button>
                            </div>
                            <div style={{ background: 'var(--bg-elevated)', padding: 'var(--space-3)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #10b981' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>Optimisation Fiscale SYSCOHADA</div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>
                                    Vous avez 3 factures pro-forma en attente. Les valider avant le 1er Mars permet d'optimiser le report de TVA à déclarer sur Impots.sn.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'analytics' && (
                <div className="card">
                    <div className="card-header">
                        <h3>📈 Croissance du Chiffre d'Affaires (Commissions de Gestion & Surperf.)</h3>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>En millions de FCFA — Année 2026</span>
                    </div>
                    <div style={{ height: 260, position: 'relative', marginTop: 'var(--space-4)' }}>
                        <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="var(--kd-copper)" />
                                    <stop offset="100%" stopColor="rgba(200, 121, 65, 0.2)" />
                                </linearGradient>
                            </defs>
                            {/* Grilles H */}
                            {[0, 1, 2, 3].map(i => (
                                <line key={`h-${i}`} x1="30" y1={180 - i * 50} x2="580" y2={180 - i * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                            ))}
                            {/* Barres (Jan -> Dec) */}
                            {Array.from({ length: 12 }).map((_, i) => {
                                const val = 20 + Math.random() * 80 + (i * 5); // Mock data up
                                const h = val;
                                return (
                                    <g key={`bar-${i}`}>
                                        <rect x={45 + i * 45} y={180 - h} width="20" height={h} fill="url(#barGrad)" rx="2" className="chart-bar" style={{ transition: 'all 0.5s ease' }} />
                                        <text x={55 + i * 45} y="195" fill="var(--text-muted)" fontSize="9" textAnchor="middle">
                                            {['Jn', 'Fv', 'Mr', 'Av', 'Ma', 'Jn', 'Jl', 'Ao', 'Sp', 'Oc', 'Nv', 'Dc'][i]}
                                        </text>
                                    </g>
                                )
                            })}
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}
