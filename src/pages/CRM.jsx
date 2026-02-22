import { useState } from 'react';
import {
    Users, Plus, Search, Filter, Phone, Mail, Calendar,
    Clock, DollarSign, TrendingUp, ArrowRight, Star,
    FileText, Target, Award, BarChart3, MessageCircle, Zap
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

/* ── Pipeline stages ── */
const PIPELINE_STAGES = [
    { id: 'lead', label: 'Prospect (Lead)', color: 'var(--text-muted)', icon: '🎯' },
    { id: 'contacted', label: '1er Contact', color: 'var(--kd-info)', icon: '📞' },
    { id: 'meeting', label: 'Discovery Call', color: 'var(--kd-diamond)', icon: '📅' },
    { id: 'proposal', label: 'Proposition', color: 'var(--kd-warning)', icon: '📋' },
    { id: 'negotiation', label: 'Négociation', color: 'var(--kd-copper)', icon: '🤝' },
    { id: 'won', label: 'Gagné (Onboarding)', color: 'var(--kd-success)', icon: '👑' },
];

const mockProspects = [
    { id: 'P001', name: 'Dr. Abdoulaye Diallo', email: 'a.diallo@clinique.sn', phone: '+221 77 890 1234', source: 'Recommandation', stage: 'negotiation', estimatedAUM: 420000000, probability: 80, nextAction: 'Finaliser la proposition', nextDate: '2026-03-05', notes: 'Médecin spécialiste. Intéressé par le fond KD Équilibré + RWA Immobilier.', interactions: 6, starred: true },
    { id: 'P002', name: 'Groupe Seck Holdings', email: 'finance@seck-holdings.com', phone: '+221 77 555 9999', source: 'Site web', stage: 'proposal', estimatedAUM: 1250000000, probability: 60, nextAction: 'Envoyer la grille tarifaire Dépôts', nextDate: '2026-03-02', notes: 'Conglomérat de BTP. Très sensible aux frais et à la liquidité.', interactions: 4, starred: true },
    { id: 'P003', name: 'Rama Niang', email: 'rama.n@mail.com', phone: '+221 77 222 3344', source: 'Conférence BRVM', stage: 'meeting', estimatedAUM: 180000000, probability: 50, nextAction: 'Visio de découverte initiale', nextDate: '2026-03-01', notes: 'Entrepreneure Tech. Profil agressif. Intéressée par impact ESG & Startups.', interactions: 2, starred: false },
    { id: 'P004', name: 'Assoc. Pharmaciens (Amina N.)', email: 'assoc@pharma-sn.org', phone: '+221 77 111 2233', source: 'Partenariat', stage: 'contacted', estimatedAUM: 800000000, probability: 30, nextAction: 'Appel de qualification', nextDate: '2026-02-28', notes: 'Fonds de retraite collectif. Décision collégiale — cycle long.', interactions: 1, starred: false },
    { id: 'P005', name: 'Adja Mbacké', email: 'adja.m@mail.com', phone: '+221 77 444 8899', source: 'Recommandation (Ousmane C.)', stage: 'lead', estimatedAUM: 250000000, probability: 20, nextAction: 'Premier appel', nextDate: '2026-03-10', notes: 'Héritage immobilier. Besoin urgent de structuration patrimoniale.', interactions: 0, starred: false },
];

function getInitials(name) { return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(); }
function getColor(name) {
    let h = 0; for (const c of name) h = c.charCodeAt(0) + ((h << 5) - h);
    return `hsl(${Math.abs(h) % 360}, 65%, 45%)`;
}
function fmt(v) { return v.toLocaleString('fr-FR'); }

export default function CRM() {
    const [activeView, setActiveView] = useState('pipeline');
    const [prospects, setProspects] = useState(mockProspects);
    const [searchTerm, setSearchTerm] = useState('');
    const [draggedId, setDraggedId] = useState(null);

    const totalPipeline = prospects.filter(p => p.stage !== 'won').reduce((s, p) => s + p.estimatedAUM, 0);
    const weightedPipeline = prospects.filter(p => p.stage !== 'won').reduce((s, p) => s + (p.estimatedAUM * p.probability / 100), 0);
    const wonCount = prospects.filter(p => p.stage === 'won').length;

    const moveToStage = (prospectId, newStage) => {
        setProspects(prev => prev.map(p => p.id === prospectId ? { ...p, stage: newStage } : p));
    };

    const filtered = prospects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #c87941, #8B4513)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(200,121,65,0.4)', color: 'white' }}>
                        <Target size={22} />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>CRM & Origination</h1>
                        <p style={{ marginBottom: 0 }}>Gestion du pipeline commercial et Intelligence de conversion</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary"><FileText size={14} /> Exporter Lead List</button>
                    <button className="btn btn-primary"><Plus size={14} /> Nouveau prospect</button>
                </div>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-copper-light)' }}>
                    <div className="stat-icon"><Target size={20} /></div>
                    <div className="stat-value">{fmt(totalPipeline)} FCFA</div>
                    <div className="stat-label">Valeur Totale du Pipeline</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-diamond)' }}>
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-value">{fmt(weightedPipeline)} FCFA</div>
                    <div className="stat-label">Pipeline Pondéré (Adjusted)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #8B5CF6' }}>
                    <div className="stat-icon"><Star size={20} color="#8B5CF6" /></div>
                    <div className="stat-value">62%</div>
                    <div className="stat-label">Win Rate Actuel</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid var(--kd-success)' }}>
                    <div className="stat-icon"><Award size={20} /></div>
                    <div className="stat-value">5.8 Mds FCFA</div>
                    <div className="stat-label">Nouveaux Actifs (YTD)</div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <div className="tabs" style={{ marginBottom: 0 }}>
                    {[['pipeline', '📋 Kanban Board'], ['analytics', '📈 Prévisions & IA Sales']].map(([key, label]) => (
                        <button key={key} className={`tab ${activeView === key ? 'active' : ''}`} onClick={() => setActiveView(key)}>{label}</button>
                    ))}
                </div>
                <div className="header-search" style={{ width: 300, background: 'var(--bg-tertiary)', border: '1px solid var(--border-primary)' }}>
                    <Search size={14} color="var(--text-muted)" />
                    <input type="text" placeholder="Rechercher nom, entreprise..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: 13, width: '100%' }} />
                </div>
            </div>

            {/* VUE PIPELINE (Kanban) */}
            {activeView === 'pipeline' && (
                <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-3)', minHeight: 'calc(100vh - 350px)' }}>
                    {PIPELINE_STAGES.map(stage => {
                        const stageProspects = filtered.filter(p => p.stage === stage.id);
                        const stageTotal = stageProspects.reduce((s, p) => s + p.estimatedAUM, 0);
                        return (
                            <div key={stage.id}
                                onDragOver={e => e.preventDefault()}
                                onDrop={(e) => { if (draggedId) moveToStage(draggedId, stage.id); setDraggedId(null); }}
                                style={{ minWidth: 320, width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2)' }}>
                                {/* Header colonne */}
                                <div style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                            <span style={{ fontSize: 16 }}>{stage.icon}</span>
                                            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>{stage.label}</span>
                                        </div>
                                        <span style={{ fontSize: 11, fontWeight: 800, background: `${stage.color}20`, color: stage.color, padding: '2px 8px', borderRadius: 12 }}>{stageProspects.length}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, fontWeight: 600 }}>
                                        {fmt(stageTotal)} FCFA
                                    </div>
                                </div>

                                {/* Cartes prospects */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', overflowY: 'auto' }}>
                                    {stageProspects.map(prospect => (
                                        <div key={prospect.id} draggable onDragStart={() => setDraggedId(prospect.id)}
                                            style={{
                                                padding: 'var(--space-4)', background: 'var(--bg-elevated)',
                                                borderRadius: 'var(--radius-md)', border: prospect.starred ? '1px solid var(--kd-copper)' : '1px solid var(--border-primary)',
                                                cursor: 'grab', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                            }}>
                                            {prospect.starred && <Star size={14} fill="var(--kd-copper)" color="var(--kd-copper)" style={{ position: 'absolute', top: 12, right: 12 }} />}

                                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 12 }}>
                                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: getColor(prospect.name), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'white' }}>
                                                    {getInitials(prospect.name)}
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.2, width: 190, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prospect.name}</div>
                                                    <div style={{ fontSize: 11, color: 'var(--kd-success)', fontWeight: 600 }}>{prospect.source}</div>
                                                </div>
                                            </div>

                                            <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--kd-copper-light)', marginBottom: 16, fontFamily: 'monospace' }}>
                                                {formatCurrency(prospect.estimatedAUM, true)}
                                            </div>

                                            <div style={{ background: 'var(--bg-secondary)', padding: 8, borderRadius: 8, marginBottom: 16 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 4 }}>
                                                    <span>Probabilité Closing</span>
                                                    <span style={{ fontWeight: 700, color: prospect.probability > 50 ? 'var(--kd-success)' : 'white' }}>{prospect.probability}%</span>
                                                </div>
                                                <div className="progress-bar" style={{ height: 4, background: 'rgba(255,255,255,0.05)' }}>
                                                    <div className="progress-fill" style={{ width: `${prospect.probability}%`, background: prospect.probability >= 70 ? 'var(--kd-success)' : prospect.probability >= 40 ? 'var(--kd-warning)' : 'var(--text-muted)' }} />
                                                </div>
                                            </div>

                                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 12 }}>
                                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                                                    <Calendar size={12} /> {new Date(prospect.nextDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                                </div>
                                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {prospect.nextAction}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* VUE ANALYTIQUE & PREVISIONS */}
            {activeView === 'analytics' && (
                <div className="grid-2">
                    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-header">
                            <h3>📈 Prévision de collecte (Sales Forecast SVG)</h3>
                        </div>
                        <div style={{ flex: 1, minHeight: 250, position: 'relative', marginTop: 'var(--space-4)' }}>
                            <svg width="100%" height="100%" viewBox="0 0 500 200" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="dealGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="rgba(200, 121, 65, 0.4)" />
                                        <stop offset="100%" stopColor="rgba(200, 121, 65, 0)" />
                                    </linearGradient>
                                </defs>
                                {/* Grille */}
                                {[0, 1, 2, 3].map(i => (
                                    <line key={i} x1="30" y1={180 - i * 50} x2="480" y2={180 - i * 50} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                ))}
                                <polyline
                                    points="30,180 100,160 180,140 250,90 320,110 400,50 480,20"
                                    fill="none" stroke="var(--kd-copper)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                                />
                                <polyline
                                    points="30,180 100,160 180,140 250,90 320,110 400,50 480,20 480,180 30,180"
                                    fill="url(#dealGrad)"
                                />
                                {/* Labels Mois */}
                                {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'].map((m, i) => (
                                    <text key={m} x={30 + i * 75} y="198" fill="var(--text-muted)" fontSize="10">{m}</text>
                                ))}
                                <circle cx="250" cy="90" r="6" fill="white" stroke="var(--kd-copper)" strokeWidth="2" />
                                <text x="240" y="75" fill="white" fontSize="12" fontWeight="bold">Aujourd'hui</text>
                            </svg>
                        </div>
                    </div>

                    <div className="card" style={{ border: '1px solid rgba(139, 92, 246, 0.3)', background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.05) 0%, transparent 100%)' }}>
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A78BFA' }}><Zap size={18} fill="#A78BFA" /> Diambar AI — Sales Coaching</h3>
                        </div>
                        <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #10B981' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Opportunité "Dr. Abdoulaye Diallo" 🎯</div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    Ce prospect a historiquement un taux d'ouverture de 80% sur vos emails concernant les RWA immobiliers. <strong>Action recommandée :</strong> L'appeler ce jeudi matin (son créneau de dispo habituel) pour sécuriser le dépôt initial.
                                </div>
                            </div>
                            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #F59E0B' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Deal at Risk "Groupe Seck Holdings" ⚠️</div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    La vélocité du deal ralentit (bloqué en Proposition depuis 14j). Le client compare probablement avec Oragroup Private. <strong>Action recommandée :</strong> Ajuster la grille de frais sur la tranche Dépôts > 1MM FCFA et renvoyer la doc ce jour.
                                </div>
                            </div>
                            <div style={{ padding: 'var(--space-3)', background: 'var(--bg-elevated)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #3B82F6' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Macro-Insight Marché Sénégalais 🇸🇳</div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    Les données LinkedIn montrent une augmentation des levées de fonds Seed/Series A à Dakar. <strong>Action :</strong> Créer une campagne marketing ciblée "Gestion de trésorerie pour Startups & Founders".
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
