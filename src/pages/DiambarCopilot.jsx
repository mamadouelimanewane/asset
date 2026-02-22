import { useState, useRef, useEffect } from 'react';
import {
    Zap, Send, FileText, Users, BookOpen, AlertTriangle,
    Sparkles, Copy, Download, RefreshCw, ChevronDown,
    MessageSquare, BarChart3, Scale, Search, Mic, Paperclip,
    CheckCircle, Clock, Globe, Shield
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

// ─── Mock LLM Responses ──────────────────────────────────────────────────────
const AI_PERSONAS = {
    fr: 'Diambar AI (Français)',
    en: 'Diambar AI (English)',
    wo: 'Diambar AI (Wolof)',
};

const QUICK_PROMPTS = [
    { label: '📊 Rapport N\'Diaye', prompt: 'Génère un rapport narratif de performance pour Ousmane N\'Diaye pour le mois de février 2025.' },
    { label: '🎯 Préparer RDV Sow', prompt: 'Prépare-moi pour mon RDV avec Aminata Sow : quelles questions va-t-elle probablement poser ?' },
    { label: '📄 Analyser contrat', prompt: 'Analyse ce contrat de gestion et identifie les clauses défavorables.' },
    { label: '⚖️ Veille CREPMF', prompt: 'Y a-t-il des nouvelles réglementations BCEAO ou CREPMF qui affectent nos clients ce mois-ci ?' },
    { label: '🌍 Risque marché', prompt: 'Quel est l\'impact de la montée du dollar sur les portefeuilles de nos clients exposés au FCFA ?' },
    { label: '💼 Proposition Ba', prompt: 'Rédige une proposition commerciale pour Cheikh K. Ba, prospect avec 800K $ à investir.' },
];

const MOCK_RESPONSES = {
    default: (query) => ({
        thinking: 1800,
        content: `**Analyse Diambar AI** — *${new Date().toLocaleTimeString('fr-FR')}*\n\nJ'ai analysé votre demande concernant : **"${query.slice(0, 60)}..."**\n\nVoici mon analyse basée sur les données de la plateforme Koppar-Diambar :\n\n**Points clés identifiés :**\n1. Les données patrimoniales disponibles montrent une progression cohérente avec les objectifs définis\n2. L'environnement macro actuel (taux Fed à 4,5%, BCE à 3,25%) favorise une légère surpondération obligataire\n3. L'exposition aux devises africaines (XOF, NGN) mérite un suivi renforcé ce trimestre\n\n**Recommandation :**\nPour affiner cette analyse, précisez le client concerné ou la période souhaitée. Je peux générer un rapport complet en format PDF, préparer des points de discussion pour votre prochain RDV, ou simuler différents scénarios.\n\n*Source : Données KD en temps réel • Réglementation OHADA 2024 • BCEAO Bulletin Q4 2024*`,
        sources: ['Données portefeuille KD', 'BCEAO Bulletin Q4 2024', 'Réglementation OHADA'],
        confidence: 92,
        tokens: 347,
    }),
    rapport: {
        thinking: 2200,
        content: `**Rapport narratif de performance — Ousmane N'Diaye** *(Généré par Diambar AI)*\n\n---\n\n**📊 Synthèse Février 2025**\n\nMonsieur N'Diaye, votre portefeuille affiche une performance remarquable de **+2,4%** sur le mois de février, portant votre rendement annualisé à **+19,2%** — significativement au-dessus du benchmark MSCI World (+2,1%).\n\n**Points forts du mois :**\n- L'exposition internationale (VXUS, 500 parts récemment acquises) a contribué positivement à hauteur de **+0,8%**\n- Votre allocation en obligations africaines a joué son rôle défensif lors de la correction du 12 février\n- La stratégie TLH activée sur VTI → ITOT a permis une économie fiscale estimée à **12 500 $**\n\n**Points de vigilance :**\n- La concentration en technologies américaines atteint 22% (seuil recommandé : 20%). Une légère réduction est conseillée.\n- L'objectif retraite 2035 affiche une confiance de 78% — en ligne avec votre trajectoire.\n\n**Perspectives :**\nAvec 8,5M $ sous gestion, votre patrimoine est sur la bonne trajectoire pour atteindre **10,2M $ à horizon 5 ans** dans le scénario de base.\n\n*Rapport généré automatiquement • Données au 22/02/2025 • À valider par votre conseiller*`,
        sources: ['Portefeuille N\'Diaye (MIS)', 'Données de marché IB', 'Règles TLH KD'],
        confidence: 97,
        tokens: 412,
    },
    rdv: {
        thinking: 1500,
        content: `**Préparation RDV — Aminata Sow** *(Diambar Copilot)*\n\n---\n\n**🎯 Questions probables (par ordre de probabilité)**\n\n**Très probable (>85%)**\n1. *"Ma performance de +12,3% est-elle bonne par rapport aux autres clients ?"*\n   → Réponse suggérée : Oui, elle place Madame Sow dans le top 30% de nos clients avec profil similaire. Benchmark : +9,2% (MSCI EM).\n\n2. *"Qu'est-ce qui se passe si les taux restent élevés longtemps ?"*\n   → Réponse suggérée : Votre allocation à 40% en obligations à taux variable vous protège. Impact simulé : -2,1% sur 12 mois.\n\n**Probable (60-85%)**\n3. *"Mon projet immobilier à Saly — quand puis-je débloquer des fonds ?"*\n   → 180K $ disponibles sans impact sur objectifs. Délai de liquidation : 3 jours.\n\n4. *"La dévaluation possible du FCFA m'inquiète."*\n   → 35% de ses actifs sont en USD — couverture naturelle suffisante.\n\n**À anticiper (40-60%)**\n5. *"Peut-on intégrer mon héritage familial dans la gestion ?"*\n   → Excellente opportunité d'estate planning. Préparer proposition succession.\n\n**⚡ Opportunités commerciales détectées**\n- Solde cash idle de 85K $ sur compte courant → proposer allocation money market\n- Pas de couverture décès → proposer assurance-vie\n- Fille bientôt à l'université → objectif éducation non formalisé\n\n**📝 Tone of voice recommandé :** Chaleureux, rassurant, pédagogique. Madame Sow apprécie les exemples concrets et les chiffres arrondis.`,
        sources: ['Profil comportemental Sow', 'Historique interactions CRM', 'Données portefeuille'],
        confidence: 88,
        tokens: 523,
    },
    contrat: {
        thinking: 3100,
        content: `**Analyse de contrat — Diambar AI** *(Mode Juridique)*\n\n---\n\n**📄 Document analysé :** Contrat de gestion — Fondation Modou Gueye\n\n**🟢 Clauses favorables (7)**\n- Art. 3.2 : Objectif de rendement non garanti — conforme OHADA\n- Art. 5.1 : Frais de gestion transparents (0,75% annuel)\n- Art. 8 : Droit de résiliation à 30 jours sans pénalité\n- Art. 12 : Rapport trimestriel obligatoire — au-dessus des standards\n\n**🔴 Clauses défavorables détectées (3)**\n1. **Art. 6.3** — *"Frais de surperformance de 20% au-delà de 8%"*\n   ⚠️ Seuil bas. Négocier à 15% au-delà de 10% (standard du marché).\n\n2. **Art. 9.1** — *"KD conserve le droit de modifier les frais avec 15 jours de préavis"*\n   ⚠️ Délai insuffisant. Standard Afriq: 60 jours. Renégocier.\n\n3. **Art. 14** — *"Clause d'arbitrage à Paris"*\n   ⚠️ Préférer arbitrage CCJA (Abidjan) ou OHADA — plus favorable pour client sénégalais.\n\n**⚠️ Points d'attention réglementaires**\n- Le contrat ne mentionne pas explicitement les obligations CREPMF Art. 47 sur la transparence des conflits d'intérêts. **Ajouter obligatoirement.**\n- La clause ESG (Art. 11) n'est pas conforme aux nouvelles directives BCEAO N°12/2024.\n\n**Risque juridique global : MODÉRÉ** — 2 révisions nécessaires avant signature.`,
        sources: ['Réglementation OHADA 2024', 'Directives CREPMF 2023', 'BCEAO N°12/2024'],
        confidence: 84,
        tokens: 589,
    },
    reglementation: {
        thinking: 2800,
        content: `**Veille Réglementaire Automatique** *(Mise à jour : 22 fév. 2025)*\n\n---\n\n**🔴 URGENT — Action requise sous 30 jours**\n\n📋 **CREPMF Circulaire 2025-03** *(publiée le 15 fév. 2025)*\n> Obligation de mise à jour des profils de risque clients tous les 18 mois (vs 24 mois précédemment).\n→ **Impact KD :** 47 clients n'ont pas été profilés depuis >18 mois. Lancer campagne de mise à jour.\n\n**🟡 À SURVEILLER — Impact potentiel**\n\n📋 **BCEAO — Consultation publique** *(clôture 15 mars 2025)*\n> Projet de réglementation sur les actifs numériques dans la Zone UEMOA. Les stablecoins pourraient être reconnus comme instruments de paiement.\n→ **Opportunité :** Anticiper en proposant une allocation crypto réglementée (<5% des AUM).\n\n📋 **Loi de Finances Sénégal 2025** *(entrée en vigueur 1er jan. 2025)*\n> Nouveau seuil d'exonération des plus-values sur actifs africains côtés BRVM : 2M FCFA (était 1,5M FCFA).\n→ **Action :** Informer 12 clients concernés — opportunité de TLH supplémentaire.\n\n**🟢 CONFORME — Aucune action requise**\n- Form ADV : à jour jusqu'au 31 mars 2025\n- FATCA/CRS : reporting de janvier 2025 déposé\n- KYC/AML : taux de conformité 98,4%\n\n*Prochaine veille automatique : 01 mars 2025*`,
        sources: ['CREPMF Circulaire 2025-03', 'BCEAO Consultation', 'JO Sénégal 2025'],
        confidence: 95,
        tokens: 478,
    },
};

function getResponse(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes('rapport') || p.includes('performance') || p.includes('n\'diaye')) return MOCK_RESPONSES.rapport;
    if (p.includes('rdv') || p.includes('prépare') || p.includes('sow') || p.includes('questions')) return MOCK_RESPONSES.rdv;
    if (p.includes('contrat') || p.includes('clause') || p.includes('analys')) return MOCK_RESPONSES.contrat;
    if (p.includes('réglementation') || p.includes('bceao') || p.includes('crepmf') || p.includes('veille')) return MOCK_RESPONSES.reglementation;
    return MOCK_RESPONSES.default(prompt);
}

// ─── Regulatory Alerts ────────────────────────────────────────────────────────
const REG_ALERTS = [
    { severity: 'high', source: 'CREPMF', title: 'Circulaire 2025-03', summary: '47 clients à re-profiler sous 30 jours', date: '15 fév. 2025' },
    { severity: 'medium', source: 'BCEAO', title: 'Consultation actifs numériques', summary: 'Réponse avant le 15 mars 2025', date: '10 fév. 2025' },
    { severity: 'low', source: 'DGI Sénégal', title: 'Loi de Finances 2025', summary: 'Nouveau seuil BRVM à 2M FCFA', date: '1 jan. 2025' },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DiambarCopilot() {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: `**Bonjour ! Je suis Diambar Copilot 🤖**\n\nJe suis votre assistant patrimonial IA, entraîné sur la réglementation OHADA, le droit UEMOA, la fiscalité sénégalaise et les meilleures pratiques de gestion de patrimoine.\n\n**Je peux :**\n- 📊 Générer des rapports narratifs personnalisés pour vos clients\n- 🎯 Vous préparer pour chaque rendez-vous client\n- 📄 Analyser des contrats et détecter les clauses défavorables\n- ⚖️ Surveiller la réglementation BCEAO/CREPMF en temps réel\n- 💼 Rédiger des propositions commerciales\n- 🌍 Analyser le risque macro sur vos portefeuilles\n\nQue puis-je faire pour vous ?`,
            timestamp: new Date(),
            confidence: null,
            sources: [],
            tokens: null,
        }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [activeTab, setActiveTab] = useState('chat');
    const [language, setLanguage] = useState('fr');
    const [copiedIdx, setCopiedIdx] = useState(null);
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [messages, isThinking]);

    const sendMessage = async (text) => {
        const userMsg = text || input.trim();
        if (!userMsg || isThinking) return;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: new Date() }]);
        setIsThinking(true);

        const response = getResponse(userMsg);
        await new Promise(r => setTimeout(r, response.thinking));
        setIsThinking(false);
        setMessages(prev => [...prev, {
            role: 'assistant',
            content: response.content,
            timestamp: new Date(),
            confidence: response.confidence,
            sources: response.sources,
            tokens: response.tokens,
        }]);
    };

    const copyMessage = (idx, content) => {
        navigator.clipboard.writeText(content);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    const renderMarkdown = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br/>')
            .replace(/^/, '<p>')
            .replace(/$/, '</p>');
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--kd-copper), var(--kd-copper-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(200,121,65,0.4)' }}>
                        <Sparkles size={22} color="white" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Diambar Copilot</h1>
                        <p style={{ marginBottom: 0 }}>Assistant IA patrimonial • OHADA • UEMOA • Fiscalité sénégalaise</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    <select value={language} onChange={e => setLanguage(e.target.value)}
                        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', fontSize: 12 }}>
                        <option value="fr">🇫🇷 Français</option>
                        <option value="en">🇬🇧 English</option>
                        <option value="wo">🇸🇳 Wolof</option>
                    </select>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--kd-success)', display: 'inline-block', boxShadow: '0 0 6px rgba(52,211,153,0.6)' }} />
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>En ligne</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['chat', '💬 Copilot Chat'], ['reports', '📊 Rapports Narratifs'], ['regulations', '⚖️ Veille Réglementaire']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {/* ── CHAT ──────────────────────────────────────────────────────────────── */}
            {activeTab === 'chat' && (
                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-4)', height: 'calc(100vh - 260px)' }}>
                    {/* Sidebar suggestions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', overflowY: 'auto' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Actions rapides</div>
                        {QUICK_PROMPTS.map((qp, i) => (
                            <button key={i} className="btn btn-ghost" style={{ fontSize: 11, textAlign: 'left', justifyContent: 'flex-start', padding: 'var(--space-2)', lineHeight: 1.3 }}
                                onClick={() => sendMessage(qp.prompt)}>{qp.label}</button>
                        ))}
                        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-3)', background: 'rgba(200,121,65,0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(200,121,65,0.15)' }}>
                            <div style={{ fontSize: 10, color: 'var(--kd-copper-light)', fontWeight: 600, marginBottom: 6 }}>📡 Contexte actuel</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                                187 clients • AUM 61,5M$ • Bourse ouverte • 2 alertes conformité
                            </div>
                        </div>
                    </div>

                    {/* Chat area */}
                    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)', overflow: 'hidden' }}>
                        {/* Messages */}
                        <div ref={chatRef} style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: 'var(--space-3)', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
                                    {/* Avatar */}
                                    <div style={{
                                        flexShrink: 0, width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                                        background: msg.role === 'user' ? 'var(--kd-info)' : 'linear-gradient(135deg, var(--kd-copper), var(--kd-copper-dark))',
                                    }}>{msg.role === 'user' ? 'MD' : '✨'}</div>

                                    <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        <div style={{
                                            padding: 'var(--space-3) var(--space-4)',
                                            background: msg.role === 'user' ? 'var(--kd-info)' : 'var(--bg-tertiary)',
                                            borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                                            border: msg.role === 'assistant' ? '1px solid var(--border-primary)' : 'none',
                                            fontSize: 13, lineHeight: 1.6, color: 'var(--text-primary)',
                                        }}>
                                            {msg.role === 'assistant'
                                                ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                                                : msg.content}
                                        </div>

                                        {/* Meta info */}
                                        {msg.role === 'assistant' && msg.confidence && (
                                            <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexWrap: 'wrap' }}>
                                                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                                                    <Clock size={9} style={{ marginRight: 3 }} />{msg.timestamp.toLocaleTimeString('fr-FR')}
                                                </span>
                                                <span style={{ fontSize: 10, color: msg.confidence >= 90 ? 'var(--kd-success)' : 'var(--kd-warning)' }}>
                                                    ● Confiance {msg.confidence}%
                                                </span>
                                                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{msg.tokens} tokens</span>
                                                {msg.sources.map(s => (
                                                    <span key={s} style={{ fontSize: 9, padding: '1px 6px', background: 'rgba(200,121,65,0.1)', color: 'var(--kd-copper-light)', borderRadius: 4 }}>{s}</span>
                                                ))}
                                                <button onClick={() => copyMessage(idx, msg.content)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedIdx === idx ? 'var(--kd-success)' : 'var(--text-muted)', fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                    {copiedIdx === idx ? <CheckCircle size={10} /> : <Copy size={10} />}
                                                    {copiedIdx === idx ? 'Copié' : 'Copier'}
                                                </button>
                                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 10, display: 'flex', alignItems: 'center', gap: 3 }}>
                                                    <Download size={10} /> PDF
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Thinking indicator */}
                            {isThinking && (
                                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                                    <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--kd-copper), var(--kd-copper-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
                                    <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: '4px 16px 16px 16px', border: '1px solid var(--border-primary)' }}>
                                        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                            {[0, 1, 2].map(i => (
                                                <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--kd-copper)', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                                            ))}
                                            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 6 }}>Diambar analyse...</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div style={{ padding: 'var(--space-3)', borderTop: '1px solid var(--border-primary)', display: 'flex', gap: 'var(--space-2)', background: 'var(--bg-tertiary)' }}>
                            <button className="btn btn-ghost btn-sm"><Paperclip size={14} /></button>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                                placeholder="Demandez une analyse, un rapport, une préparation de RDV..."
                                style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', padding: '8px 14px', color: 'var(--text-primary)', fontSize: 13 }}
                            />
                            <button className="btn btn-ghost btn-sm"><Mic size={14} /></button>
                            <button className="btn btn-primary btn-sm" onClick={() => sendMessage()} disabled={!input.trim() || isThinking}>
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── RAPPORTS NARRATIFS ────────────────────────────────────────────────── */}
            {activeTab === 'reports' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    {[
                        { client: 'Ousmane N\'Diaye', type: 'Performance mensuelle', status: 'ready', tone: 'Formel & chiffré', lang: '🇫🇷', preview: 'Monsieur N\'Diaye, votre portefeuille affiche une performance remarquable de +2,4% en février 2025...' },
                        { client: 'Aminata Sow', type: 'Revue trimestrielle', status: 'draft', tone: 'Pédagogique & rassurant', lang: '🇫🇷', preview: 'Chère Madame Sow, ce trimestre a été positif pour votre patrimoine. En termes simples...' },
                        { client: 'Fondation Gueye', type: 'Rapport impact ESG', status: 'ready', tone: 'Institutionnel', lang: '🇬🇧', preview: 'Dear Foundation Board, Q4 2024 ESG performance demonstrates strong alignment...' },
                        { client: 'Cheikh K. Ba', type: 'Bilan fiscal annuel', status: 'generating', tone: 'Technique & précis', lang: '🇫🇷', preview: 'Analyse des gains/pertes réalisés, TLH effectué et optimisations pour 2025...' },
                    ].map((rpt, i) => (
                        <div key={i} className="card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                <div>
                                    <h3 style={{ fontSize: 14, marginBottom: 2 }}>{rpt.client}</h3>
                                    <span className="tag" style={{ fontSize: 10 }}>{rpt.type}</span>
                                </div>
                                <span style={{
                                    fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600,
                                    background: rpt.status === 'ready' ? 'rgba(52,211,153,0.1)' : rpt.status === 'generating' ? 'rgba(200,121,65,0.1)' : 'rgba(126,184,218,0.1)',
                                    color: rpt.status === 'ready' ? 'var(--kd-success)' : rpt.status === 'generating' ? 'var(--kd-copper-light)' : 'var(--kd-info)',
                                }}>{rpt.status === 'ready' ? '✅ Prêt' : rpt.status === 'generating' ? '⏳ Génération...' : '📝 Brouillon'}</span>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-3)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                                <span>🎭 {rpt.tone}</span>
                                <span>{rpt.lang} Langue</span>
                                <span>✨ Généré par IA</span>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic', padding: 'var(--space-2)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--kd-copper)', marginBottom: 'var(--space-3)', lineHeight: 1.5 }}>
                                "{rpt.preview}"
                            </div>
                            <div className="btn-group">
                                <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }}><RefreshCw size={11} /> Régénérer</button>
                                <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 11 }}><Copy size={11} /> Copier</button>
                                <button className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: 11 }}><Send size={11} /> Envoyer</button>
                            </div>
                        </div>
                    ))}

                    {/* Générateur de rapport */}
                    <div className="card" style={{ gridColumn: '1 / -1', border: '1px solid rgba(200,121,65,0.2)' }}>
                        <div className="card-header"><h3>✨ Générer un nouveau rapport narratif</h3></div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                            {[
                                { label: 'Client', placeholder: 'Sélectionner...', type: 'select', opts: ['Ousmane N\'Diaye', 'Aminata Sow', 'Tous les clients'] },
                                { label: 'Type de rapport', placeholder: 'Type...', type: 'select', opts: ['Performance mensuelle', 'Revue trimestrielle', 'Bilan fiscal', 'Rapport ESG'] },
                                { label: 'Ton', placeholder: 'Choisir...', type: 'select', opts: ['Formel', 'Pédagogique', 'Institutionnel', 'Chaleureux'] },
                                { label: 'Langue', placeholder: 'Langue...', type: 'select', opts: ['Français', 'English', 'Wolof'] },
                            ].map(field => (
                                <div key={field.label}>
                                    <label style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>{field.label}</label>
                                    <select style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-primary)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', fontSize: 12 }}>
                                        {field.opts.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }}>
                            <Sparkles size={14} /> Générer le rapport avec Diambar AI
                        </button>
                    </div>
                </div>
            )}

            {/* ── VEILLE RÉGLEMENTAIRE ──────────────────────────────────────────────── */}
            {activeTab === 'regulations' && (
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)' }}>
                    <div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Globe size={13} />Surveillance automatique : BCEAO • CREPMF • DGI Sénégal • OHADA • SEC • FINRA
                        </div>
                        {REG_ALERTS.map((alert, i) => (
                            <div key={i} className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: `4px solid ${alert.severity === 'high' ? 'var(--kd-danger)' : alert.severity === 'medium' ? 'var(--kd-warning)' : 'var(--kd-info)'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, background: 'rgba(200,121,65,0.1)', color: 'var(--kd-copper-light)', fontWeight: 700 }}>{alert.source}</span>
                                        <span style={{ fontWeight: 600, fontSize: 14 }}>{alert.title}</span>
                                    </div>
                                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{alert.date}</span>
                                </div>
                                <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>{alert.summary}</p>
                                <button className="btn btn-ghost btn-sm" onClick={() => { setActiveTab('chat'); setInput(`Explique-moi en détail la réglementation ${alert.source} "${alert.title}" et son impact sur nos clients.`); }}>
                                    <MessageSquare size={11} /> Analyser avec Copilot
                                </button>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="card-header"><h3>📊 Statut conformité</h3></div>
                            {[['CREPMF', 94, 'warning'], ['BCEAO', 100, 'success'], ['DGI Sénégal', 100, 'success'], ['SEC/FINRA', 98, 'success'], ['OHADA', 100, 'success']].map(([name, score, level]) => (
                                <div key={name} style={{ marginBottom: 'var(--space-2)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                                        <span>{name}</span><span style={{ fontWeight: 700, color: `var(--kd-${level})` }}>{score}%</span>
                                    </div>
                                    <div className="progress-bar" style={{ height: 5 }}><div className="progress-fill" style={{ width: `${score}%`, background: `var(--kd-${level})` }} /></div>
                                </div>
                            ))}
                        </div>
                        <div className="card" style={{ border: '1px solid rgba(200,121,65,0.2)', background: 'rgba(200,121,65,0.03)' }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--kd-copper-light)', marginBottom: 'var(--space-2)' }}>⚡ Prochaines échéances</div>
                            {[['Form ADV', '31 mars 2025', 'high'], ['Re-profilage CREPMF', '15 mars 2025', 'high'], ['Reporting FATCA', '15 avril 2025', 'medium'], ['Réponse consultation BCEAO', '15 mars 2025', 'medium']].map(([task, date, urgency]) => (
                                <div key={task} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, padding: '6px 0', borderBottom: '1px solid var(--border-primary)' }}>
                                    <span style={{ color: urgency === 'high' ? 'var(--kd-danger)' : 'var(--text-secondary)' }}>{urgency === 'high' ? '🔴' : '🟡'} {task}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>{date}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
        </div>
    );
}
