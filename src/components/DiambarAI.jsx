import { useState } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import { aiConversations } from '../data/mockData';

export default function DiambarAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(aiConversations);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "J'analyse vos données en temps réel. Basé sur les tendances actuelles du marché et les profils de risque de vos clients, je recommande de rééquilibrer 5 portefeuilles cette semaine pour optimiser l'alignement.",
                "Votre performance YTD de 14.7% surpasse le benchmark de 2.1 points de pourcentage. Les principaux contributeurs sont l'allocation tech (+3.2%) et les positions internationales (+1.8%).",
                "J'ai détecté une opportunité de tax-loss harvesting pour 8 comptes. Le potentiel d'économie fiscale est estimé à $23,400 pour ce trimestre.",
                "Les 3 prochaines facturations trimestrielles sont programmées pour le 1er avril. Le montant total estimé est de $458,250. Tous les paramètres de facturation sont à jour.",
            ];
            const botMsg = { role: 'bot', text: responses[Math.floor(Math.random() * responses.length)] };
            setMessages(prev => [...prev, botMsg]);
        }, 1200);
    };

    return (
        <div className="ai-chat-widget">
            {isOpen && (
                <div className="ai-chat-panel">
                    <div className="ai-chat-header">
                        <div className="ai-avatar">
                            <Sparkles size={16} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4>Diambar AI</h4>
                            <span>En ligne</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map((msg, i) => (
                            <div key={i} className={`ai-message ${msg.role === 'user' ? 'user' : 'bot'}`}>
                                {msg.text.split('\n').map((line, j) => (
                                    <span key={j}>
                                        {line.split('**').map((part, k) =>
                                            k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                                        )}
                                        {j < msg.text.split('\n').length - 1 && <br />}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="ai-chat-input">
                        <input
                            type="text"
                            placeholder="Posez une question à Diambar AI..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button onClick={handleSend}>
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            )}

            <button className="ai-chat-trigger" onClick={() => setIsOpen(!isOpen)} id="diambar-ai-btn">
                {isOpen ? <X size={22} /> : <Sparkles size={22} />}
            </button>
        </div>
    );
}
