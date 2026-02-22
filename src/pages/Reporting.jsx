import { useState } from 'react';
import {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend
} from 'recharts';
import { FileText, Download, Mail, Calendar, Eye, Share2, Printer, Zap, LayoutTemplate, MessageSquare, Plus } from 'lucide-react';
import { performanceData, clients } from '../data/mockData';
import { formatCurrency } from '../utils/helpers';

export default function Reporting() {
    const [activeTab, setActiveTab] = useState('performance');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid var(--border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white' }}>
                        <FileText size={22} />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Reporting Institutionnel & Client</h1>
                        <p style={{ marginBottom: 0 }}>Génération automatisée (PDF/Web) avec commentaires Macro générés par Diambar AI</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary"><Calendar size={14} /> Programmation (Cron)</button>
                    <button className="btn btn-primary"><Printer size={14} /> Exporter PDF Batch</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper-light)' }}>
                    <div className="stat-icon"><FileText size={20} /></div>
                    <div className="stat-value">845</div>
                    <div className="stat-label">Rapports générés (YTD)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-info)' }}>
                    <div className="stat-icon"><Mail size={20} /></div>
                    <div className="stat-value">120</div>
                    <div className="stat-label">Envois auto. ce mois</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-success)' }}>
                    <div className="stat-icon"><Eye size={20} /></div>
                    <div className="stat-value">94%</div>
                    <div className="stat-label">Taux d'Ouverture Portail</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                    <div className="stat-icon"><Zap size={20} color="#8B5CF6" /></div>
                    <div className="stat-value">25h</div>
                    <div className="stat-label">Temps économisé / mois</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['performance', '📊 Consolidation BRVM'], ['builder', '🛠️ Studio de Rapports'], ['ai-commentary', '🤖 Diambar AI Commentary']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'performance' && (
                <div>
                    <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                        <div className="card-header">
                            <h3>Surperformance (Alpha) vs Indices UEMOA</h3>
                            <div className="btn-group">
                                <select className="form-select" style={{ width: 180, fontSize: 13 }}>
                                    <option>Benchmark: BRVM Composite</option>
                                    <option>Benchmark: BRVM 30</option>
                                    <option>Benchmark: MSCI EFM Africa</option>
                                </select>
                                <button className="btn btn-secondary btn-sm"><Download size={14} /> Exporter XLS</button>
                            </div>
                        </div>
                        <div style={{ height: 320, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="rpGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#C87941" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#C87941" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="benchGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#64748b" stopOpacity={0.1} />
                                            <stop offset="100%" stopColor="#64748b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${v}%`} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid var(--border-secondary)', borderRadius: 8, fontSize: 12 }} />
                                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 20 }} />
                                    <Area type="monotone" dataKey="portfolio" name="Stratégie Koppar-Diambar" stroke="#C87941" strokeWidth={3} fill="url(#rpGrad)" />
                                    <Area type="monotone" dataKey="benchmark" name="BRVM Composite" stroke="#64748b" strokeWidth={2} fill="url(#benchGrad)" strokeDasharray="6 6" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="grid-3">
                        <div className="card" style={{ gridColumn: 'span 2' }}>
                            <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 'var(--space-4)' }}>Bibliothèque de Templates (Co-branding)</h3>
                            {[
                                { icon: <LayoutTemplate size={24} color="#C87941" />, title: 'Quarterly Executive Summary', desc: 'PDF 4 pages avec Attribution de perf, Allocation Macro et Facturation. Idéal pour Clientèle Privée (HNWI).' },
                                { icon: <LayoutTemplate size={24} color="#10b981" />, title: 'Rapport Institutional ESG', desc: 'Focus Carbone, Score de Gouvernance et Impact local (UEMOA). Requis par les fonds de pension (CIPRES).' },
                                { icon: <LayoutTemplate size={24} color="#8b5cf6" />, title: 'Relevé de Trade Quotidien (Daily)', desc: 'Généré automatiquement à la clôture de la BRVM (15h00 GMT). Envoi par Mail & WhatsApp.' },
                            ].map(item => (
                                <div key={item.title} style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', padding: 'var(--space-3)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', alignItems: 'center' }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700 }}>{item.title}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4, marginTop: 4 }}>{item.desc}</div>
                                    </div>
                                    <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'center' }}>Sélectionner</button>
                                </div>
                            ))}
                        </div>
                        <div className="card" style={{ background: 'var(--bg-tertiary)' }}>
                            <h3 style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 'var(--space-4)' }}>Tâches Batch (Cron)</h3>
                            {[
                                { label: 'Résumé des soldes mensuel (Mail)', status: 'Actif', time: '1er du mois (08:00)' },
                                { label: 'Export PnL Fiscalité Sénégal', status: 'En Attente', time: '30 Mars 2026' },
                                { label: 'Relevé Performance (Portail Client)', status: 'Actif', time: 'Trimestriel' },
                            ].map((item, i) => (
                                <div key={i} style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-2)' }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
                                        <span>Exécution: {item.time}</span>
                                        <span style={{ color: item.status === 'Actif' ? 'var(--kd-success)' : 'var(--kd-warning)' }}>{item.status}</span>
                                    </div>
                                </div>
                            ))}
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-3)', padding: '10px' }}><Plus size={14} /> Nouvel Job Automatique</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'builder' && (
                <div className="card">
                    <div className="card-header">
                        <h3>🛠️ Studio de Rapports Perso</h3>
                    </div>
                    <div className="grid-2">
                        <div className="form-group">
                            <label className="form-label">Client / Compte cible</label>
                            <select className="form-select" style={{ fontSize: 14 }}>
                                <option>Groupe Seck Holdings (Portefeuille Institutionnel)</option>
                                {clients.map(c => <option key={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Période de calcul</label>
                            <select className="form-select" style={{ fontSize: 14 }}>
                                <option>Année à ce jour (YTD)</option>
                                <option>T1 2026</option>
                                <option>Exercice complet 2025</option>
                                <option>Période Libre...</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                        <label className="form-label">Modulaire (Glissez-Déposez pour ordonner)</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
                            {['Résumé Exécutif (IA)', 'Performance Absolue', 'Attribution Sectorielle', 'Métriques de Risque (VaR)', 'Inventaire Détaillé', 'Détails des Frais', 'Cashflow / Dividendes', 'Mouvements Capitaux'].map((s, i) => (
                                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: i < 5 ? '1px solid var(--kd-copper)' : '1px solid var(--border-primary)', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                                    <input type="checkbox" defaultChecked={i < 5} style={{ accentColor: 'var(--kd-copper)', width: 16, height: 16 }} />
                                    {s}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="btn-group" style={{ marginTop: 'var(--space-5)', justifyContent: 'flex-end', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-primary)' }}>
                        <button className="btn btn-secondary"><Eye size={16} style={{ marginRight: 6 }} /> Aperçu Fictif</button>
                        <button className="btn btn-primary" style={{ padding: '8px 24px' }}><Download size={16} style={{ marginRight: 6 }} /> Générer & Télécharger (.PDF)</button>
                    </div>
                </div>
            )}

            {activeTab === 'ai-commentary' && (
                <div className="grid-2">
                    <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)' }}>
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A78BFA' }}><MessageSquare size={18} fill="#A78BFA" /> Génération de Commentaire Macro</h3>
                        </div>
                        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                            L'IA analyse le portefeuille du client et le croise avec les événements récents (BCEAO, BRVM, Actualité ECOWAS) pour rédiger l'introduction du rapport.
                        </p>

                        <div style={{ background: '#0a0e17', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', minHeight: 250, position: 'relative' }}>
                            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                            </div>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: '#e2e8f0', lineHeight: 1.8 }}>
                                <span style={{ color: '#A78BFA', fontWeight: 'bold' }}>[Brouillon IA généré pour Dr. A. Diallo]</span><br /><br />
                                Cher Docteur,<br /><br />
                                Au cours de ce trimestre, votre portefeuille a enregistré une performance nette de <strong style={{ color: 'var(--kd-success)', fontFamily: 'sans-serif' }}>+4.2%</strong>. Cette surperformance par rapport au marché régional s'explique principalement par notre biais tactique sur le secteur des Télécoms (Sonatel), qui a profité d'excellents résultats annuels publiés en Mars.<br /><br />
                                Malgré une légère hausse des taux directeurs de la <strong>BCEAO</strong> (+25 points de base), notre poche obligataire (OAT Sénégal) a bien résisté grâce à une duration volontairement courte. Nous maintenons notre posture défensive sur les valeurs bancaires en attente de clarification réglementaire sur le ratio de solvabilité UEMOA.
                            </div>
                            <div style={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 8 }}>
                                <button className="btn btn-secondary btn-sm"><RefreshCw size={12} style={{ marginRight: 4 }} /> Régénérer</button>
                                <button className="btn btn-primary btn-sm">Insérer dans le rapport ✓</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Pseudo component pour éviter crash d'import si manquant
const RefreshCw = ({ size, ...props }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
