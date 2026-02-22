import { useState, useRef, useEffect } from 'react';
import {
    Brain, Cpu, MessageSquare, Send, Bot, Database,
    Sparkles, Zap, Fingerprint, Activity, Network, Layers, Shield
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const MOCK_MEMORY = [
    { type: 'Fact', content: 'Le Dr. Abdoulaye Diallo préfère les appels le jeudi matin.', source: 'Notes de réunion', date: '15/02' },
    { type: 'Insight', content: 'Aminata S. très sensible aux risques de change (XOF/USD).', source: 'Analyse d\'email', date: '21/02' },
    { type: 'Preference', content: 'Client Groupe Seck évite les investissements dans le tabac/alcool.', source: 'Formulaire ESG', date: '10/01' },
];

export default function DigitalTwin() {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Bonjour. Je suis votre Digital Twin patrimonial (Koppar AI). J\'ai analysé les 450 emails, les 120 rapports de gestion et les notes CRM de ce mois-ci. Comment puis-je vous assister aujourd\'hui pour optimiser votre temps ?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setIsTyping(true);

        // Simulation de la réponse du Digital Twin
        setTimeout(() => {
            let reply = "J'analyse cette requête en corrélant nos données internes et le flux macroéconomique...";

            if (userMsg.toLowerCase().includes('abdoulaye') || userMsg.toLowerCase().includes('diallo')) {
                reply = "D'après mes données, Dr. Diallo a un solde liquidité de 42M FCFA qui dort. Vu son historique, je lui ai préparé un jeton RWA (Immobilier Almadies) offrant 8.5% APY. Veux-tu que j'ajoute cela dans sa proposition trimestrielle et que je programme l'envoi pour jeudi matin (son créneau de lecture habituel) ?";
            } else if (userMsg.toLowerCase().includes('marché') || userMsg.toLowerCase().includes('brvm')) {
                reply = "La BRVM est actuellement en légère hausse (+0.4%). Notre surpondération sur Sonatel (+12% YTD) contribue positivement. Je détecte un signal de rotation sectorielle vers les bancaires (BOA Sénégal) selon notre modèle on-chain. Voulez-vous que je génère un rapport de rééquilibrage automatisé ?";
            }

            setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
            setIsTyping(false);
        }, 1800);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #161b22, #0d1117)', border: '1px solid #c87941', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(200, 121, 65, 0.2)' }}>
                        <Brain size={22} color="#c87941" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Digital Twin (Clone IA)</h1>
                        <p style={{ marginBottom: 0 }}>Votre assistant cognitif entraîné sur l'intégralité de vos données cabinet.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <span className="badge badge-green" style={{ padding: '8px 16px', fontSize: 13, background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', border: '1px solid #10B981' }}>
                        <Activity size={14} style={{ display: 'inline', marginRight: 6 }} /> Entraînement Continu Actif
                    </span>
                </div>
            </div>

            <div className="grid-2-1" style={{ alignItems: 'start', height: 'calc(100vh - 200px)' }}>
                {/* Interface Chatbot */}
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', border: '1px solid rgba(200, 121, 65, 0.3)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                    <div className="card-header" style={{ padding: 'var(--space-4)', borderBottom: '1px solid var(--border-primary)', margin: 0, background: 'var(--bg-elevated)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 36, height: 36, background: '#c87941', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Bot size={20} color="white" />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: 16 }}>KD Brain™ Interactive</h3>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Modèle RAG (Retrieval-Augmented Generation) exclusif</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }} />
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
                        </div>
                    </div>

                    <div style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: '#0a0e17' }}>
                        {messages.map((msg, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
                                {msg.role === 'assistant' && (
                                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(200, 121, 65, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--kd-copper)' }}>
                                        <Sparkles size={16} color="var(--kd-copper)" />
                                    </div>
                                )}
                                <div style={{
                                    padding: '12px 16px',
                                    background: msg.role === 'user' ? 'var(--kd-copper)' : '#161b22',
                                    color: msg.role === 'user' ? 'white' : '#e2e8f0',
                                    borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                                    fontSize: 14,
                                    lineHeight: 1.6,
                                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                }}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div style={{ display: 'flex', gap: 12, maxWidth: '85%' }}>
                                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(200, 121, 65, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--kd-copper)' }}>
                                    <Cpu size={16} color="var(--kd-copper)" className="spin-animation" />
                                </div>
                                <div style={{ padding: '12px 16px', background: '#161b22', borderRadius: '16px 16px 16px 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: 'pulse 1.5s infinite' }} />
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: 'pulse 1.5s infinite 0.2s' }} />
                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animation: 'pulse 1.5s infinite 0.4s' }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSend} style={{ padding: 'var(--space-3)', background: 'var(--bg-elevated)', borderTop: '1px solid var(--border-primary)', display: 'flex', gap: 'var(--space-2)' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Interrogez le Digital Twin (ex: Que faire pour le portefeuille de Diallo ?)"
                            style={{ flex: 1, padding: '14px 20px', background: 'var(--bg-input)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-full)', color: 'white', fontSize: 14, outline: 'none' }}
                        />
                        <button type="submit" disabled={!input.trim() || isTyping} style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, var(--kd-copper), var(--kd-copper-dark))', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed', opacity: input.trim() && !isTyping ? 1 : 0.5, transition: '0.2s' }}>
                            <Send size={18} style={{ marginLeft: -2 }} />
                        </button>
                    </form>
                </div>

                {/* Sidebar Cognitive (Mémoire) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%', overflowY: 'auto' }}>
                    <div className="card" style={{ background: 'var(--bg-card)' }}>
                        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                            <h3 style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}><Network size={16} color="var(--kd-copper-light)" /> Sources Vectorisées</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>📄 Notes de la plateforme</span>
                                <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>2,450 docs</span>
                            </div>
                            <div className="progress-bar" style={{ height: 4 }}><div className="progress-fill" style={{ width: '100%', background: 'var(--kd-copper-light)' }} /></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>✉️ Historique Emails</span>
                                <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>14,200 msg</span>
                            </div>
                            <div className="progress-bar" style={{ height: 4 }}><div className="progress-fill" style={{ width: '100%', background: 'var(--kd-diamond)' }} /></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                                <span style={{ color: 'var(--text-secondary)' }}>📊 Rapports de Portefeuille</span>
                                <span style={{ fontWeight: 700, fontFamily: 'monospace' }}>850 pdf</span>
                            </div>
                            <div className="progress-bar" style={{ height: 4 }}><div className="progress-fill" style={{ width: '100%', background: '#EF4444' }} /></div>
                        </div>
                    </div>

                    <div className="card" style={{ flex: 1 }}>
                        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                            <h3 style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}><Database size={16} color="#8b5cf6" /> Long-Term Memory</h3>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>Extractions sémantiques récentes du graphe de connaissances.</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {MOCK_MEMORY.map((mem, i) => (
                                <div key={i} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${mem.type === 'Fact' ? '#10B981' : mem.type === 'Insight' ? '#8B5CF6' : '#F59E0B'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                        <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', color: mem.type === 'Fact' ? '#10B981' : mem.type === 'Insight' ? '#8B5CF6' : '#F59E0B' }}>{mem.type}</span>
                                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{mem.date} • {mem.source}</span>
                                    </div>
                                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{mem.content}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pulse {
                    0%, 100% { transform: scale(0.8); opacity: 0.5; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                .spin-animation {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
