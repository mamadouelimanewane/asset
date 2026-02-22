import { useState } from 'react';
import {
    FileSignature, Calculator, FileText, CheckCircle2,
    UploadCloud, History, Download, ArrowRight
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TAX_CALENDAR = [
    { id: 'TX-01', obligation: 'IRVM (Dividendes)', entite: 'Holding S.A.', montant: '12 500 000 FCFA', deadline: 'Le 15 du mois M+1', status: 'Payé', proof: true },
    { id: 'TX-02', obligation: 'Plus-Values Mobilières', entite: 'Moussa Ndiaye (PP)', montant: '4 280 000 FCFA', deadline: '30 Avril 2026', status: 'À Calculer', proof: false },
    { id: 'TX-03', obligation: 'Retenue à la source (CEL)', entite: 'Holding S.A.', montant: '850 000 FCFA', deadline: '31 Mars 2026', status: 'Déclaré (Attente)', proof: false },
    { id: 'TX-04', obligation: 'Acompte IS', entite: 'SCI Les Almadies', montant: '18 000 000 FCFA', deadline: '15 Février 2026', status: 'Payé', proof: true },
];

const TAX_IMPACT = [
    { year: '2023', gains: 85, taxPre: 15, taxOpt: 8 },
    { year: '2024', gains: 110, taxPre: 19, taxOpt: 11 },
    { year: '2025', gains: 145, taxPre: 25, taxOpt: 14 },
];

export default function LegalTax() {
    const [activeTab, setActiveTab] = useState('declarations');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #022c22, #042f2e)', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(16,185,129,0.2)' }}>
                        <FileSignature size={22} color="#34d399" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Légal & Fiscalité Automatisée</h1>
                        <p style={{ marginBottom: 0 }}>Génération des liasses (DGID), calcul d'IRVM/Plus-values et stratégie d'optimisation.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #10b981', color: '#6ee7b7' }}><Calculator size={14} style={{ marginRight: 6 }} /> Simuler Restructuration</button>
                    <button className="btn btn-primary" style={{ background: '#10b981', color: '#022c22', fontWeight: 800, border: 'none' }}><UploadCloud size={14} style={{ marginRight: 6 }} /> Télétransmettre (e-Tax)</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #10b981', background: 'rgba(16,185,129,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#34d399' }}><Calculator size={20} /></div>
                    <div className="stat-value" style={{ color: '#a7f3d0' }}>56.5M FCFA</div>
                    <div className="stat-label">Économies Fiscales (Stratégies)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="stat-icon"><FileText size={20} color="#f59e0b" /></div>
                    <div className="stat-value">2</div>
                    <div className="stat-label">Déclarations Imminentes (J-15)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--text-muted)' }}>
                    <div className="stat-icon"><CheckCircle2 size={20} color="var(--text-muted)" /></div>
                    <div className="stat-value">100%</div>
                    <div className="stat-label">Conformité Fiscale (Quitus OK)</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['declarations', '📜 Calendrier & Liasses (DGID)'], ['optimization', '📉 Optimisation & Déductions (IA)'], ['documents', '📁 Quitus & Reçus Fiscaux']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'declarations' && (
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FileSignature size={18} /> Calendrier des Échéances DGID (Sénégal)</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Toutes vos plus-values boursières, dividendes perçus et cessions immobilières pré-remplissent automatiquement les formulaires CERFA locaux.</p>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Imposition / Formulaire</th>
                                <th>Entité Sous-Jacente</th>
                                <th>Échéance Réglementaire</th>
                                <th>Montant Impôt</th>
                                <th>Statut & Transmission</th>
                                <th>Preuve Paiement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TAX_CALENDAR.map(tax => (
                                <tr key={tax.id}>
                                    <td style={{ fontWeight: 800 }}>{tax.obligation}</td>
                                    <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{tax.entite}</td>
                                    <td style={{ fontWeight: 600, color: tax.status === 'À Calculer' ? '#f59e0b' : 'var(--text-muted)' }}>{tax.deadline}</td>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#fca5a5' }}>{tax.montant}</td>
                                    <td>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 4, background: tax.status === 'Payé' ? 'rgba(16,185,129,0.1)' : tax.status === 'À Calculer' ? 'rgba(245,158,11,0.1)' : 'rgba(59,130,246,0.1)', color: tax.status === 'Payé' ? '#10B981' : tax.status === 'À Calculer' ? '#F59E0B' : '#60a5fa' }}>
                                            {tax.status}
                                        </span>
                                    </td>
                                    <td>
                                        {tax.proof ?
                                            <button className="btn btn-ghost btn-sm" style={{ color: '#10b981', padding: '4px 8px', fontSize: 11 }}><Download size={12} style={{ marginRight: 4 }} /> Reçu PDF</button> :
                                            <button className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: 11, background: '#10b981', color: 'black' }}><ArrowRight size={12} style={{ marginRight: 4 }} /> Déclarer</button>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'optimization' && (
                <div className="grid-2-1">
                    <div className="card">
                        <div className="card-header">
                            <h3>Impact des Véhicules d'Optimisation</h3>
                            <span className="badge badge-success">Gains Fiscaux : +45%</span>
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Comparaison des impôts payés "Brut" vs via vos holdings et pactes Dutreil ("Opt").</p>
                        <div style={{ height: 260 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={TAX_IMPACT}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="year" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `${v}M`} />
                                    <Tooltip contentStyle={{ background: '#0a0e17', border: '1px solid #10b981', borderRadius: 8 }} />
                                    <Bar dataKey="taxPre" name="Impôt Brut (Sans montage)" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar dataKey="taxOpt" name="Impôt Payé (Optimisé)" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#34d399' }}><Calculator size={18} /> Diambar Tax Assistant</h3>
                        </div>
                        <div style={{ padding: 'var(--space-4)', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid #10b981', marginTop: 'var(--space-3)' }}>
                            <div style={{ fontWeight: 800, fontSize: 14, color: '#10b981', marginBottom: 8 }}>💡 Recommandation Exécutive</div>
                            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
                                Vous projetez de céder votre participation dans la clinique "Santé Plus" (Plus-Value latente : 450M FCFA).<br /><br />
                                <strong style={{ color: 'white' }}>L'IA suggère d'apporter vos titres à une Holding (Régime mère-fille) avant cession.</strong>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-elevated)', borderRadius: 8, fontSize: 13, marginBottom: 8 }}>
                                <span>Impôt direct (Actuel)</span>
                                <span style={{ fontWeight: 800, color: '#ef4444' }}>~67.5M FCFA (15%)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(16,185,129,0.1)', borderRadius: 8, fontSize: 13 }}>
                                <span>Impôt via Holding (Déféré)</span>
                                <span style={{ fontWeight: 900, color: '#10b981', fontSize: 15 }}>0 FCFA (Différé)</span>
                            </div>

                            <button className="btn btn-primary" style={{ marginTop: 24, width: '100%', background: '#10b981', color: 'black', fontWeight: 800 }}>Simuler le montage holding</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
