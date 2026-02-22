import { useState } from 'react';
import {
    FileText, Plus, Download, Eye, Send, Edit3, Copy,
    User, DollarSign, TrendingUp, Shield, PieChart, Clock,
    CheckCircle, ChevronRight, Printer, Share2, Star, Zap,
    BarChart3, Target, Award, ArrowRight
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/helpers';
import { portfolioModels } from '../data/mockData';

const mockProposals = [
    {
        id: 'PR001', status: 'draft', createdAt: '2025-02-21',
        prospect: { name: 'Dr. Abdoulaye Diallo', email: 'a.diallo@clinique.sn', phone: '+221 77 890 1234' },
        currentSituation: { broker: 'TD Ameritrade', aum: 4_200_000, fees: 1.25, yearlyReturn: 8.2 },
        proposedModel: 'KD Croissance Dynamique', risk: 'Modéré-Agressif',
        proposedFees: 0.75, projectedReturn: 12.4, projectedFees: 31_500,
        savingsVsCurrent: 21_000, fiveYearProjection: 6_180_000,
    },
    {
        id: 'PR002', status: 'sent', createdAt: '2025-02-19',
        prospect: { name: 'Groupe Seck Holdings', email: 'finance@seck-holdings.com', phone: '+221 77 555 9999' },
        currentSituation: { broker: 'Morgan Stanley', aum: 12_500_000, fees: 1.40, yearlyReturn: 9.1 },
        proposedModel: 'KD Institutionnel', risk: 'Modéré',
        proposedFees: 0.55, projectedReturn: 11.8, projectedFees: 68_750,
        savingsVsCurrent: 106_250, fiveYearProjection: 19_200_000,
    },
    {
        id: 'PR003', status: 'signed', createdAt: '2025-02-10',
        prospect: { name: 'Prof. Mamadou Kane', email: 'kane@univ.sn', phone: '+221 77 666 5544' },
        currentSituation: { broker: 'Schwab', aum: 950_000, fees: 1.00, yearlyReturn: 7.5 },
        proposedModel: 'KD Équilibré Diamant', risk: 'Modéré',
        proposedFees: 0.80, projectedReturn: 10.2, projectedFees: 7_600,
        savingsVsCurrent: 1_900, fiveYearProjection: 1_420_000,
    },
];

const proposalTemplates = [
    { id: 'T01', name: 'Standard — Client individuel', description: 'Proposition complète pour un investisseur individuel', sections: 8 },
    { id: 'T02', name: 'Institutionnel — Entreprise', description: 'Proposition pour gestion de trésorerie et pension', sections: 10 },
    { id: 'T03', name: 'Fondation / OBNL', description: 'Proposition orientée impact et dotation', sections: 9 },
    { id: 'T04', name: 'Transfert ACAT', description: 'Focus sur les avantages du transfert depuis un autre courtier', sections: 7 },
];

const statusConfig = {
    draft: { label: 'Brouillon', color: 'var(--text-muted)', bg: 'rgba(148,163,184,0.1)' },
    sent: { label: 'Envoyée', color: 'var(--kd-info)', bg: 'rgba(126,184,218,0.1)' },
    viewed: { label: 'Consultée', color: 'var(--kd-warning)', bg: 'rgba(245,158,11,0.1)' },
    signed: { label: 'Signée', color: 'var(--kd-success)', bg: 'rgba(52,211,153,0.1)' },
    expired: { label: 'Expirée', color: 'var(--kd-danger)', bg: 'rgba(239,68,68,0.1)' },
};

export default function ProposalGenerator() {
    const [activeTab, setActiveTab] = useState('proposals');
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewProposal, setPreviewProposal] = useState(null);

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Générateur de propositions</h1>
                    <p>Créez des propositions d'investissement personnalisées et professionnelles</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={14} /> Nouvelle proposition
                </button>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper">
                    <div className="stat-icon"><FileText size={20} /></div>
                    <div className="stat-value">{mockProposals.length}</div>
                    <div className="stat-label">Propositions créées</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><Send size={20} /></div>
                    <div className="stat-value">{mockProposals.filter(p => p.status === 'sent').length}</div>
                    <div className="stat-label">En attente de réponse</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><CheckCircle size={20} /></div>
                    <div className="stat-value">{Math.round(mockProposals.filter(p => p.status === 'signed').length / mockProposals.length * 100)}%</div>
                    <div className="stat-label">Taux de conversion</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><DollarSign size={20} /></div>
                    <div className="stat-value">{formatCurrency(mockProposals.reduce((s, p) => s + p.savingsVsCurrent, 0), true)}</div>
                    <div className="stat-label">Économies promises aux prospects</div>
                </div>
            </div>

            {/* Onglets */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['proposals', '📋 Propositions'], ['templates', '📝 Modèles'], ['builder', '🛠️ Créer']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {/* LISTE PROPOSITIONS */}
            {activeTab === 'proposals' && (
                <div>
                    {mockProposals.map(proposal => {
                        const st = statusConfig[proposal.status];
                        return (
                            <div key={proposal.id} className="card" style={{
                                marginBottom: 'var(--space-3)', cursor: 'pointer',
                            }} onClick={() => { setPreviewProposal(proposal); setShowPreview(true); }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 4 }}>
                                            <h3 style={{ fontSize: 16, fontWeight: 600 }}>{proposal.prospect.name}</h3>
                                            <span style={{
                                                fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)',
                                                background: st.bg, color: st.color, fontWeight: 600,
                                            }}>{st.label}</span>
                                        </div>
                                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                            {proposal.prospect.email} • Créée le {new Date(proposal.createdAt).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--kd-copper-light)' }}>
                                            {formatCurrency(proposal.currentSituation.aum, true)}
                                        </div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>AUM potentiel</div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--space-5)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Modèle proposé</div>
                                        <div style={{ fontSize: 13, fontWeight: 600 }}>{proposal.proposedModel}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Frais actuels → KD</div>
                                        <div style={{ fontSize: 13 }}>
                                            <span style={{ textDecoration: 'line-through', color: 'var(--kd-danger)' }}>{proposal.currentSituation.fees}%</span>
                                            <ArrowRight size={12} style={{ margin: '0 4px', verticalAlign: 'middle' }} />
                                            <span style={{ color: 'var(--kd-success)', fontWeight: 700 }}>{proposal.proposedFees}%</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Économie annuelle</div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--kd-success)' }}>
                                            +{formatCurrency(proposal.savingsVsCurrent)}
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Projection 5 ans</div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--kd-copper-light)' }}>
                                            {formatCurrency(proposal.fiveYearProjection, true)}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
                                    <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); setPreviewProposal(proposal); setShowPreview(true); }}>
                                        <Eye size={12} /> Prévisualiser
                                    </button>
                                    {proposal.status === 'draft' && (
                                        <button className="btn btn-secondary btn-sm" onClick={e => e.stopPropagation()}>
                                            <Send size={12} /> Envoyer
                                        </button>
                                    )}
                                    <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}>
                                        <Download size={12} /> PDF
                                    </button>
                                    <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}>
                                        <Copy size={12} /> Dupliquer
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* MODÈLES */}
            {activeTab === 'templates' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
                    {proposalTemplates.map(tmpl => (
                        <div key={tmpl.id} className="card" style={{ cursor: 'pointer' }}>
                            <div style={{ fontSize: 36, marginBottom: 'var(--space-3)' }}>📄</div>
                            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{tmpl.name}</h3>
                            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                                {tmpl.description}
                            </p>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                                {tmpl.sections} sections prédéfinies
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%' }}>
                                <Plus size={14} /> Utiliser ce modèle
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* CRÉATEUR */}
            {activeTab === 'builder' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header"><h3>👤 Informations prospect</h3></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {[
                                ['Nom complet', 'Dr. Abdoulaye Diallo'],
                                ['Email', 'a.diallo@clinique.sn'],
                                ['Téléphone', '+221 77 890 1234'],
                                ['Courtier actuel', 'TD Ameritrade'],
                                ['AUM actuel', '4 200 000 $'],
                                ['Frais actuels (%)', '1.25'],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{label}</label>
                                    <input type="text" defaultValue={value} style={{
                                        width: '100%', padding: 'var(--space-2) var(--space-3)',
                                        background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)',
                                        borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 13,
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header"><h3>📊 Proposition d'investissement</h3></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <div>
                                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Modèle de portefeuille</label>
                                <select defaultValue="growth" style={{
                                    width: '100%', padding: 'var(--space-2) var(--space-3)',
                                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)',
                                    borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 13,
                                }}>
                                    {portfolioModels.map(m => (
                                        <option key={m.id} value={m.id}>{m.name} ({m.risk})</option>
                                    ))}
                                </select>
                            </div>
                            {[
                                ['Frais proposés (%)', '0.75'],
                                ['Rendement historique projeté (%)', '12.4'],
                                ['Horizon de projection (années)', '5'],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{label}</label>
                                    <input type="text" defaultValue={value} style={{
                                        width: '100%', padding: 'var(--space-2) var(--space-3)',
                                        background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)',
                                        borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', fontSize: 13,
                                    }} />
                                </div>
                            ))}

                            <div style={{ marginTop: 'var(--space-2)' }}>
                                <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>Sections incluses</label>
                                {[
                                    'Page de couverture co-brandée', 'Lettre personnalisée', 'Analyse de la situation actuelle',
                                    'Modèle de portefeuille recommandé', 'Comparaison des frais', 'Projections de performance',
                                    'Avantages Koppar-Diambar', 'Barème de frais', 'Signature électronique',
                                ].map(section => (
                                    <label key={section} style={{
                                        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                                        fontSize: 12, padding: '4px 0',
                                    }}>
                                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--kd-copper)' }} />
                                        {section}
                                    </label>
                                ))}
                            </div>

                            <button className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }}>
                                <Zap size={14} /> Générer la proposition
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL PRÉVISUALISATION */}
            {showPreview && previewProposal && (
                <div className="modal-overlay" onClick={() => setShowPreview(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 700, maxHeight: '90vh', overflowY: 'auto' }}>
                        {/* Page de couverture */}
                        <div style={{
                            padding: 'var(--space-8) var(--space-6)',
                            background: 'linear-gradient(160deg, #1a1208 0%, #2d1d0e 50%, #0f1a24 100%)',
                            borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                            textAlign: 'center', position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{
                                position: 'absolute', top: -50, right: -50, width: 200, height: 200,
                                background: 'radial-gradient(circle, rgba(200,121,65,0.15) 0%, transparent 70%)',
                                borderRadius: '50%',
                            }} />
                            <div style={{
                                width: 60, height: 60, borderRadius: 'var(--radius-full)', margin: '0 auto var(--space-4)',
                                background: 'linear-gradient(135deg, var(--kd-copper-dark), var(--kd-copper-light))',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 22, fontWeight: 800, color: 'white',
                            }}>KD</div>
                            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.5px' }}>
                                Proposition d'investissement
                            </h2>
                            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                                Préparée pour <strong style={{ color: 'var(--kd-copper-light)' }}>{previewProposal.prospect.name}</strong>
                            </p>
                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 'var(--space-4)' }}>
                                KD Wealth Advisors • Moussa Diallo, CFA<br />
                                {new Date(previewProposal.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                            </div>
                        </div>

                        <div style={{ padding: 'var(--space-6)' }}>
                            {/* Section 1 — Situation actuelle */}
                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--kd-copper-light)' }}>
                                    1. Votre situation actuelle
                                </h3>
                                <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
                                    {[
                                        ['Courtier actuel', previewProposal.currentSituation.broker],
                                        ['Actifs sous gestion', formatCurrency(previewProposal.currentSituation.aum)],
                                        ['Frais annuels', `${previewProposal.currentSituation.fees}% (${formatCurrency(previewProposal.currentSituation.aum * previewProposal.currentSituation.fees / 100)}/an)`],
                                        ['Rendement YTD', `${previewProposal.currentSituation.yearlyReturn}%`],
                                    ].map(([label, value]) => (
                                        <div key={label} style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                                            <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 2 — Notre proposition */}
                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--kd-copper-light)' }}>
                                    2. Notre proposition
                                </h3>
                                <div style={{
                                    padding: 'var(--space-4)', background: 'rgba(200,121,65,0.05)',
                                    borderRadius: 'var(--radius-md)', border: '1px solid rgba(200,121,65,0.15)',
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                                        <div>
                                            <div style={{ fontSize: 18, fontWeight: 700 }}>{previewProposal.proposedModel}</div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Profil de risque : {previewProposal.risk}</div>
                                        </div>
                                        <Award size={32} style={{ color: 'var(--kd-copper)', opacity: 0.5 }} />
                                    </div>
                                    <div className="grid-2" style={{ gap: 'var(--space-3)' }}>
                                        {[
                                            ['Frais de gestion', `${previewProposal.proposedFees}%`, null],
                                            ['Commissions de trading', '0 $', 'Zéro commission'],
                                            ['Rendement projeté', `${previewProposal.projectedReturn}%`, null],
                                            ['Cash haut rendement', '4,85% APY', 'Inclus'],
                                        ].map(([label, value, badge]) => (
                                            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                                <span style={{ fontSize: 12 }}>{label}</span>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--kd-copper-light)' }}>{value}</span>
                                                    {badge && <span className="badge badge-success" style={{ fontSize: 8 }}>{badge}</span>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 — Comparaison */}
                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--kd-copper-light)' }}>
                                    3. Comparaison des frais
                                </h3>
                                <table className="data-table" style={{ fontSize: 13 }}>
                                    <thead>
                                        <tr><th></th><th>{previewProposal.currentSituation.broker}</th><th>Koppar-Diambar</th><th>Économie</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Frais de gestion</td>
                                            <td style={{ color: 'var(--kd-danger)' }}>{previewProposal.currentSituation.fees}%</td>
                                            <td style={{ color: 'var(--kd-success)', fontWeight: 700 }}>{previewProposal.proposedFees}%</td>
                                            <td style={{ color: 'var(--kd-success)', fontWeight: 700 }}>
                                                -{(previewProposal.currentSituation.fees - previewProposal.proposedFees).toFixed(2)}%
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Commissions</td>
                                            <td style={{ color: 'var(--kd-danger)' }}>4,95 $ / ordre</td>
                                            <td style={{ color: 'var(--kd-success)', fontWeight: 700 }}>0 $</td>
                                            <td style={{ color: 'var(--kd-success)', fontWeight: 700 }}>-100%</td>
                                        </tr>
                                        <tr>
                                            <td>Coût annuel total</td>
                                            <td>{formatCurrency(previewProposal.currentSituation.aum * previewProposal.currentSituation.fees / 100)}</td>
                                            <td style={{ fontWeight: 700 }}>{formatCurrency(previewProposal.proposedFees * previewProposal.currentSituation.aum / 100)}</td>
                                            <td style={{ color: 'var(--kd-success)', fontWeight: 700, fontSize: 15 }}>
                                                +{formatCurrency(previewProposal.savingsVsCurrent)}/an
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Section 4 — Projection */}
                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--kd-copper-light)' }}>
                                    4. Projection à 5 ans
                                </h3>
                                <div style={{
                                    display: 'flex', gap: 'var(--space-4)',
                                }}>
                                    {[1, 2, 3, 4, 5].map(year => {
                                        const currentVal = previewProposal.currentSituation.aum * Math.pow(1 + (previewProposal.currentSituation.yearlyReturn - previewProposal.currentSituation.fees) / 100, year);
                                        const kdVal = previewProposal.currentSituation.aum * Math.pow(1 + (previewProposal.projectedReturn - previewProposal.proposedFees) / 100, year);
                                        return (
                                            <div key={year} style={{ flex: 1, textAlign: 'center' }}>
                                                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>An {year}</div>
                                                <div style={{
                                                    height: Math.max(30, (kdVal / previewProposal.fiveYearProjection) * 80),
                                                    background: 'var(--kd-copper)', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                                    marginBottom: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                                                }}>
                                                    <span style={{ fontSize: 8, color: 'white', padding: 2 }}>{formatCurrency(kdVal, true)}</span>
                                                </div>
                                                <div style={{
                                                    height: Math.max(20, (currentVal / previewProposal.fiveYearProjection) * 80),
                                                    background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                                                }} />
                                            </div>
                                        );
                                    })}
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-2)', justifyContent: 'center', fontSize: 10 }}>
                                    <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--kd-copper)', borderRadius: 2, marginRight: 4 }} />Koppar-Diambar</span>
                                    <span><span style={{ display: 'inline-block', width: 10, height: 10, background: 'var(--bg-tertiary)', borderRadius: 2, marginRight: 4 }} />{previewProposal.currentSituation.broker}</span>
                                </div>
                            </div>

                            {/* Section 5 — Avantages */}
                            <div style={{ marginBottom: 'var(--space-6)' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 'var(--space-4)', color: 'var(--kd-copper-light)' }}>
                                    5. Pourquoi Koppar-Diambar ?
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                                    {[
                                        ['⚡', 'Zéro commission', 'Trading sans frais d\'exécution sur actions et ETF'],
                                        ['💰', 'Cash haut rendement', '4,85% APY sur la trésorerie non investie'],
                                        ['🤖', 'Diambar AI', 'Assistant IA proactif pour l\'optimisation des portefeuilles'],
                                        ['📉', 'Tax-Loss Harvesting', 'Récolte automatisée des pertes fiscales'],
                                        ['📊', 'Portail client', 'Accès 24/7 à votre portefeuille et vos rapports'],
                                        ['🛡️', 'Conformité SEC', 'Supervision réglementaire complète et transparente'],
                                    ].map(([icon, title, desc]) => (
                                        <div key={title} style={{
                                            padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                                            border: '1px solid var(--border-primary)',
                                        }}>
                                            <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
                                            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2 }}>{title}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{desc}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Signature */}
                            <div style={{
                                padding: 'var(--space-5)', textAlign: 'center',
                                borderTop: '2px solid var(--kd-copper-glow)',
                                marginTop: 'var(--space-4)',
                            }}>
                                <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                                    Prêt à embarquer ? Signez ci-dessous pour initier le transfert.
                                </p>
                                <div style={{
                                    border: '2px dashed var(--border-secondary)', borderRadius: 'var(--radius-md)',
                                    padding: 'var(--space-6)', margin: '0 auto', maxWidth: 350,
                                    color: 'var(--text-muted)', fontSize: 13,
                                }}>
                                    ✍️ Zone de signature électronique
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 'var(--space-3)' }}>
                                    Cette proposition est valable 30 jours à compter de la date de création.
                                </div>
                            </div>
                        </div>

                        {/* Actions du modal */}
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowPreview(false)}>Fermer</button>
                            <div className="btn-group">
                                <button className="btn btn-secondary btn-sm"><Printer size={13} /> Imprimer</button>
                                <button className="btn btn-secondary btn-sm"><Download size={13} /> PDF</button>
                                <button className="btn btn-primary btn-sm"><Send size={13} /> Envoyer au prospect</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
