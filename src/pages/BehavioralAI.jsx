import { useState, useEffect } from 'react';
import {
    Brain, TrendingUp, AlertTriangle, Clock, User,
    BarChart3, Eye, MessageCircle, Zap, Target,
    Activity, Calendar, ChevronRight, Sparkles, ArrowUp, ArrowDown
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

// ─── Profils comportementaux simulés ─────────────────────────────────────────
const ADVISOR_PROFILE = {
    name: 'Moussa Diallo',
    peakHours: [9, 10, 14, 15],
    topModules: [
        { name: 'Gestion de portefeuille', usage: 84, trend: 'up' },
        { name: 'CRM Pipeline', usage: 71, trend: 'up' },
        { name: 'Audit Trail', usage: 45, trend: 'stable' },
        { name: 'Reporting', usage: 38, trend: 'down' },
        { name: 'Transferts', usage: 32, trend: 'stable' },
    ],
    adaptations: [
        { type: 'layout', desc: 'Widget "Top Clients par AUM" déplacé en position 1 (utilisé 23x/semaine)' },
        { type: 'shortcut', desc: 'Raccourci "CRM + Portefeuille" créé automatiquement' },
        { type: 'report', desc: 'Rapport de performance pré-généré chaque lundi à 8h30' },
    ],
};

// ─── Churn Prediction ─────────────────────────────────────────────────────────
const CHURN_RISK = [
    {
        client: 'Ibrahim Ndiaga', score: 82, trend: 'up', monthlyChurn: 14, signals: [
            { icon: '📉', text: 'Connexions portail : -70% vs mois dernier' },
            { icon: '❓', text: '3 questions sans réponse depuis 18 jours' },
            { icon: '💬', text: 'Ton du dernier email : neutre → négatif (NLP)' },
            { icon: '💰', text: 'Retrait partiel de 80K$ il y a 3 semaines' },
        ],
        recommendation: 'Appel personnel ce vendredi. Préparer comparaison performance vs benchmark. Proposer revue gratuite.',
        value: 2_800_000,
    },
    {
        client: 'Khady Fall', score: 61, trend: 'up', monthlyChurn: 8, signals: [
            { icon: '🔕', text: 'N\'a pas ouvert les 2 derniers rapports' },
            { icon: '⏳', text: 'Dernier RDV : il y a 7 mois' },
        ],
        recommendation: 'Envoyer rapport personnalisé avec graphique retraite. Planifier RDV juin.',
        value: 1_200_000,
    },
    {
        client: 'Mamadou Sarr', score: 45, trend: 'down', monthlyChurn: 4, signals: [
            { icon: '📈', text: 'Engagement portail en hausse ce mois' },
            { icon: '✅', text: 'Vient d\'augmenter ses versements +15%' },
        ],
        recommendation: 'Client en amélioration — envoyer message de félicitations, proposer parrainage.',
        value: 950_000,
    },
];

// ─── Pre-Meeting Intelligence ─────────────────────────────────────────────────
const UPCOMING_MEETINGS = [
    {
        client: 'Ousmane N\'Diaye', date: '25 fév.', time: '14:00', duration: '1h',
        aiPrep: {
            mood: '😊 Positif (hausse portefeuille)',
            topicsProbable: [
                { prob: 92, question: 'Performance vs S&P 500 — suis-je mieux loti que le marché ?' },
                { prob: 84, question: 'Concentration tech à 22% — dois-je m\'inquiéter ?' },
                { prob: 71, question: 'Rééquilibrage vers les actifs africains — timing ?' },
            ],
            opportunities: ['Augmenter exposition BRVM', 'Plan successoral incomplet', 'Cash idle de 120K$'],
            riskTopics: ['Actualités Angola — client inquiet'],
            prepTime: '~8 min de lecture',
        }
    },
    {
        client: 'Aminata Sow', date: '28 fév.', time: '10:00', duration: '45min',
        aiPrep: {
            mood: '😐 Neutre (pas d\'événement récent)',
            topicsProbable: [
                { prob: 88, question: 'Mon projet immobilier à Saly — puis-je débloquer 180K$ ?' },
                { prob: 65, question: 'Couverture contre la baisse du FCFA ?' },
            ],
            opportunities: ['Assurance décès inexistante', 'Objectif éducation enfants non formalisé'],
            riskTopics: [],
            prepTime: '~5 min de lecture',
        }
    },
];

// ─── Tone Adaptation ──────────────────────────────────────────────────────────
const TONE_PROFILES = [
    { client: 'Ousmane N\'Diaye', detectedTone: 'Analytique', score: 'chiffré', style: 'Précis, graphiques, comparatifs', example: '"Votre TRI de 19,2% se situe au 78e percentile de notre base clients..."', accuracy: 94 },
    { client: 'Aminata Sow', detectedTone: 'Émotionnel', score: 'narratif', style: 'Pédagogique, rassurant, métaphores concrètes', example: '"Votre patrimoine progresse régulièrement — comme une plante bien arrosée..."', accuracy: 88 },
    { client: 'Fondation Gueye', detectedTone: 'Institutionnel', score: 'formel', style: 'Rapport structuré, tableaux, conformité', example: '"En accordance avec les objectifs fiduciaires, le portefeuille de dotation..."', accuracy: 96 },
    { client: 'Cheikh K. Ba', detectedTone: 'Direct', score: 'synthétique', style: 'Court, bullet points, chiffres clés', example: '"Résumé : +18,5%, frais 0,75%, prochain RDV : mars."', accuracy: 91 },
];

export default function BehavioralAI() {
    const [activeTab, setActiveTab] = useState('churn');
    const [expandedMeeting, setExpandedMeeting] = useState(null);
    const [expandedChurn, setExpandedChurn] = useState(null);
    const [currentHour] = useState(new Date().getHours());

    const isActivePeriod = ADVISOR_PROFILE.peakHours.includes(currentHour);

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #4F46E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>
                        <Brain size={22} color="white" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Hyper-Personnalisation IA</h1>
                        <p style={{ marginBottom: 0 }}>Profil comportemental • Anti-churn prédictif • Préparation RDV • Ton adaptatif</p>
                    </div>
                </div>
                <div style={{ padding: 'var(--space-2) var(--space-3)', background: isActivePeriod ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)', borderRadius: 'var(--radius-md)', border: `1px solid ${isActivePeriod ? 'rgba(52,211,153,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: isActivePeriod ? 'var(--kd-success)' : 'var(--kd-warning)' }}>
                        {isActivePeriod ? '🟢 Pic d\'activité' : '🟡 Activité modérée'}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Profil : Moussa Diallo</div>
                </div>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-4)' }}>
                <div className="stat-card" style={{ borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.04)' }}>
                    <div className="stat-icon" style={{ background: 'rgba(124,58,237,0.1)', color: '#7C3AED' }}><AlertTriangle size={20} /></div>
                    <div className="stat-value" style={{ color: '#7C3AED' }}>3</div>
                    <div className="stat-label">Clients à risque churn</div>
                </div>
                <div className="stat-card copper">
                    <div className="stat-icon"><Calendar size={20} /></div>
                    <div className="stat-value">{UPCOMING_MEETINGS.length}</div>
                    <div className="stat-label">RDV à préparer (7 jours)</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><Activity size={20} /></div>
                    <div className="stat-value">94%</div>
                    <div className="stat-label">Précision prédictions ton</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><Sparkles size={20} /></div>
                    <div className="stat-value">23</div>
                    <div className="stat-label">Adaptations UI ce mois</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['churn', '🚨 Anti-Churn Prédictif'], ['meetings', '🎯 Préparation RDV'], ['tone', '🎭 Ton Adaptatif'], ['profile', '🧠 Profil Comportemental']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {/* ── CHURN ───────────────────────────────────────────────────────────── */}
            {activeTab === 'churn' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-3)', background: 'rgba(124,58,237,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(124,58,237,0.2)', marginBottom: 'var(--space-2)' }}>
                        <Brain size={14} style={{ color: '#7C3AED' }} />
                        <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Score calculé sur <strong>40 signaux comportementaux</strong> : fréquence de connexion, ouverture des emails, NLP sur les messages, retraits, durée depuis le dernier RDV, évolution du ton...</span>
                    </div>
                    {CHURN_RISK.map((client, i) => {
                        const isExpanded = expandedChurn === i;
                        const riskColor = client.score >= 70 ? 'var(--kd-danger)' : client.score >= 50 ? 'var(--kd-warning)' : 'var(--kd-success)';
                        return (
                            <div key={i} className="card" style={{ cursor: 'pointer', borderLeft: `4px solid ${riskColor}` }}
                                onClick={() => setExpandedChurn(isExpanded ? null : i)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                        {/* Score gauge */}
                                        <div style={{ position: 'relative', width: 52, height: 52 }}>
                                            <svg width="52" height="52" viewBox="0 0 52 52">
                                                <circle cx="26" cy="26" r="22" fill="none" stroke="var(--border-primary)" strokeWidth="4" />
                                                <circle cx="26" cy="26" r="22" fill="none" stroke={riskColor} strokeWidth="4"
                                                    strokeDasharray={`${client.score * 1.38} 138`} strokeLinecap="round"
                                                    transform="rotate(-90 26 26)" />
                                            </svg>
                                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: riskColor }}>{client.score}</div>
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 14 }}>{client.client}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formatCurrency(client.value, true)} AUM • Risque churn mensuel : {client.monthlyChurn}%</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: riskColor }}>
                                            {client.score >= 70 ? '🔴 Élevé' : client.score >= 50 ? '🟡 Modéré' : '🟢 Faible'}
                                        </span>
                                        {client.trend === 'up' ? <ArrowUp size={14} style={{ color: 'var(--kd-danger)' }} /> : <ArrowDown size={14} style={{ color: 'var(--kd-success)' }} />}
                                        <ChevronRight size={14} style={{ color: 'var(--text-muted)', transform: isExpanded ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
                                    </div>
                                </div>

                                {isExpanded && (
                                    <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--border-primary)' }}>
                                        <div style={{ marginBottom: 'var(--space-3)' }}>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>📍 Signaux détectés</div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                                                {client.signals.map((s, j) => (
                                                    <div key={j} style={{ fontSize: 11, padding: 'var(--space-1) var(--space-2)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', color: 'var(--text-secondary)' }}>
                                                        {s.icon} {s.text}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div style={{ padding: 'var(--space-3)', background: 'rgba(52,211,153,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(52,211,153,0.2)', marginBottom: 'var(--space-3)' }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--kd-success)', marginBottom: 4 }}>💡 Action recommandée par l'IA</div>
                                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{client.recommendation}</div>
                                        </div>
                                        <div className="btn-group">
                                            <button className="btn btn-primary btn-sm"><MessageCircle size={12} /> Envoyer message</button>
                                            <button className="btn btn-secondary btn-sm"><Calendar size={12} /> Planifier RDV</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── MEETINGS ────────────────────────────────────────────────────────── */}
            {activeTab === 'meetings' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    {UPCOMING_MEETINGS.map((mtg, i) => {
                        const isExp = expandedMeeting === i;
                        return (
                            <div key={i} className="card" style={{ cursor: 'pointer' }}
                                onClick={() => setExpandedMeeting(isExp ? null : i)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'rgba(200,121,65,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👤</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 15 }}>{mtg.client}</div>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{mtg.date} à {mtg.time} • {mtg.duration} • Humeur prédite : {mtg.aiPrep.mood}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>⏱️ {mtg.aiPrep.prepTime}</span>
                                        <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); }}>
                                            <Sparkles size={11} /> Préparer
                                        </button>
                                        <ChevronRight size={14} style={{ color: 'var(--text-muted)', transform: isExp ? 'rotate(90deg)' : 'none', transition: '0.2s' }} />
                                    </div>
                                </div>

                                {isExp && (
                                    <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-primary)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--kd-copper-light)', marginBottom: 'var(--space-2)' }}>❓ Questions probables</div>
                                            {mtg.aiPrep.topicsProbable.map((t, j) => (
                                                <div key={j} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', padding: 'var(--space-2)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)' }}>
                                                    <div style={{ minWidth: 36, height: 20, background: t.prob >= 80 ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: t.prob >= 80 ? 'var(--kd-danger)' : 'var(--kd-warning)' }}>{t.prob}%</div>
                                                    <span style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t.question}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--kd-success)', marginBottom: 'var(--space-2)' }}>💼 Opportunités à saisir</div>
                                            {mtg.aiPrep.opportunities.map((opp, j) => (
                                                <div key={j} style={{ fontSize: 12, padding: 'var(--space-2)', marginBottom: 4, background: 'rgba(52,211,153,0.06)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--kd-success)', color: 'var(--text-secondary)' }}>
                                                    ✅ {opp}
                                                </div>
                                            ))}
                                            {mtg.aiPrep.riskTopics.length > 0 && (
                                                <>
                                                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--kd-danger)', marginBottom: 'var(--space-2)', marginTop: 'var(--space-3)' }}>⚠️ Points sensibles</div>
                                                    {mtg.aiPrep.riskTopics.map((r, j) => (
                                                        <div key={j} style={{ fontSize: 12, padding: 'var(--space-2)', background: 'rgba(239,68,68,0.05)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--kd-danger)', color: 'var(--text-secondary)' }}>
                                                            ⚠️ {r}
                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── TONE ────────────────────────────────────────────────────────────── */}
            {activeTab === 'tone' && (
                <div>
                    <div style={{ padding: 'var(--space-3)', background: 'rgba(124,58,237,0.06)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(124,58,237,0.15)', marginBottom: 'var(--space-4)', fontSize: 12, color: 'var(--text-secondary)' }}>
                        <Brain size={13} style={{ color: '#7C3AED', marginRight: 6, verticalAlign: 'middle' }} />
                        L'IA analyse l'historique de vos échanges avec chaque client (emails, messages, notes CRM) pour détecter leur style de communication préféré et adapter automatiquement le ton de vos rapports et communications.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                        {TONE_PROFILES.map((p, i) => (
                            <div key={i} className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                                    <h3 style={{ fontSize: 14 }}>{p.client}</h3>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                        <span className="tag" style={{ fontSize: 10 }}>{p.detectedTone}</span>
                                        <span style={{ fontSize: 10, padding: '2px 7px', background: 'rgba(52,211,153,0.1)', color: 'var(--kd-success)', borderRadius: 4, fontWeight: 700 }}>{p.accuracy}% précis</span>
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-2)' }}>
                                    <strong>Style adapté :</strong> {p.style}
                                </div>
                                <div style={{ padding: 'var(--space-3)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #7C3AED', fontSize: 12, fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                                    {p.example}
                                </div>
                                <div style={{ marginTop: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Précision du modèle</span>
                                        <span style={{ color: '#7C3AED', fontWeight: 700 }}>{p.accuracy}%</span>
                                    </div>
                                    <div className="progress-bar" style={{ height: 5 }}>
                                        <div className="progress-fill" style={{ width: `${p.accuracy}%`, background: '#7C3AED' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── PROFILE ─────────────────────────────────────────────────────────── */}
            {activeTab === 'profile' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header"><h3>📊 Modules les plus utilisés</h3></div>
                        {ADVISOR_PROFILE.topModules.map(mod => (
                            <div key={mod.name} style={{ marginBottom: 'var(--space-3)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                        {mod.name}
                                        {mod.trend === 'up' ? <ArrowUp size={10} style={{ color: 'var(--kd-success)' }} /> : mod.trend === 'down' ? <ArrowDown size={10} style={{ color: 'var(--kd-danger)' }} /> : null}
                                    </span>
                                    <span style={{ fontWeight: 700, color: 'var(--kd-copper-light)' }}>{mod.usage}</span>
                                </div>
                                <div className="progress-bar" style={{ height: 6 }}>
                                    <div className="progress-fill" style={{ width: `${mod.usage}%`, background: 'var(--kd-copper)' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="card">
                        <div className="card-header"><h3>🤖 Adaptations IA activées</h3></div>
                        {ADVISOR_PROFILE.adaptations.map((a, i) => (
                            <div key={i} style={{ padding: 'var(--space-3)', marginBottom: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${a.type === 'layout' ? 'var(--kd-copper)' : a.type === 'shortcut' ? '#7C3AED' : 'var(--kd-success)'}` }}>
                                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2, color: a.type === 'layout' ? 'var(--kd-copper-light)' : a.type === 'shortcut' ? '#A78BFA' : 'var(--kd-success)' }}>{a.type === 'layout' ? '🎨 Interface' : a.type === 'shortcut' ? '⚡ Raccourci' : '📊 Rapport'}</div>
                                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.desc}</div>
                            </div>
                        ))}
                        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'rgba(124,58,237,0.06)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(124,58,237,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>
                            💡 <strong>Prochaine adaptation suggérée :</strong> Créer un raccourci "Nouveau RDV" directement depuis la liste clients — utilisé 14x la semaine dernière via 3 clics.
                        </div>
                    </div>

                    {/* Heatmap des heures */}
                    <div className="card" style={{ gridColumn: '1 / -1' }}>
                        <div className="card-header"><h3>📅 Carte d'activité horaire (cette semaine)</h3></div>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {Array.from({ length: 24 }, (_, h) => {
                                const activity = ADVISOR_PROFILE.peakHours.includes(h) ? Math.random() * 40 + 60 : Math.random() * 30;
                                const isNow = h === currentHour;
                                return (
                                    <div key={h} title={`${h}h — Activité ${Math.round(activity)}%`} style={{
                                        flex: 1, minWidth: 28, height: 50, borderRadius: 4,
                                        background: `rgba(200,121,65,${activity / 100})`,
                                        border: isNow ? '2px solid var(--kd-copper)' : '1px solid transparent',
                                        position: 'relative', cursor: 'default',
                                    }}>
                                        <div style={{ position: 'absolute', bottom: 2, left: 0, right: 0, textAlign: 'center', fontSize: 9, color: 'var(--text-muted)' }}>{h}h</div>
                                        {isNow && <div style={{ position: 'absolute', top: 2, left: 0, right: 0, textAlign: 'center', fontSize: 8, color: 'var(--kd-copper)', fontWeight: 700 }}>▲</div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
