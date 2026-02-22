import { useState, useRef, useEffect } from 'react';
import {
    MessageCircle, Send, Search, Paperclip, Archive, Star,
    Clock, CheckCheck, Lock, Filter, Plus, Image, FileText,
    Download, MoreVertical, Phone, Video, Smile, Pin, Trash2
} from 'lucide-react';
import { clients } from '../data/mockData';
import { formatDate } from '../utils/helpers';

/* ── Données de conversations simulées ── */
const mockConversations = [
    {
        id: 'conv1', clientId: 'C001', clientName: 'Aminata Sow',
        lastMessage: 'Moussa, je vais recevoir un bonus de 150K $ le mois prochain. Comment l\'investir au mieux ?',
        lastTime: '2025-02-22T09:15:00', unread: 2, pinned: true, starred: true, archived: false,
        messages: [
            { id: 'm1', sender: 'client', text: 'Bonjour Moussa, j\'espère que vous allez bien !', time: '2025-02-21T14:30:00', read: true },
            { id: 'm2', sender: 'advisor', text: 'Bonjour Aminata ! Oui très bien, merci. Comment puis-je vous aider aujourd\'hui ?', time: '2025-02-21T14:35:00', read: true },
            { id: 'm3', sender: 'client', text: 'J\'ai une excellente nouvelle. Mon entreprise m\'a confirmé un bonus annuel de 150 000 $ qui sera versé début mars.', time: '2025-02-21T15:00:00', read: true },
            { id: 'm4', sender: 'advisor', text: 'Félicitations ! C\'est une belle somme. Avant de vous faire des recommandations, quelques questions :\n\n1. Avez-vous des engagements financiers prévus prochainement ?\n2. Souhaitez-vous augmenter votre allocation en actions ou diversifier vers d\'autres classes ?\n3. Avez-vous budgeté une part pour votre fonds d\'urgence ?', time: '2025-02-21T15:10:00', read: true },
            { id: 'm5', sender: 'client', text: 'Moussa, je vais recevoir un bonus de 150K $ le mois prochain. Comment l\'investir au mieux ?', time: '2025-02-22T09:15:00', read: false },
            { id: 'm6', sender: 'client', text: 'J\'aimerais aussi en parler à mon mari avant de prendre une décision finale.', time: '2025-02-22T09:16:00', read: false },
        ],
    },
    {
        id: 'conv2', clientId: 'C002', clientName: 'Ousmane N\'Diaye',
        lastMessage: 'Les documents fiscaux ont bien été reçus. Merci pour la rapidité !',
        lastTime: '2025-02-21T18:00:00', unread: 0, pinned: false, starred: false, archived: false,
        messages: [
            { id: 'm10', sender: 'advisor', text: 'Ousmane, les formulaires 1099-B et le résumé fiscal YTD sont disponibles sur votre portail client. Je vous les envoie également en pièce jointe ici.', time: '2025-02-21T16:30:00', read: true, attachment: { name: '1099-B_NDiaye_2024.pdf', size: '245 Ko' } },
            { id: 'm11', sender: 'client', text: 'Les documents fiscaux ont bien été reçus. Merci pour la rapidité !', time: '2025-02-21T18:00:00', read: true },
        ],
    },
    {
        id: 'conv3', clientId: 'C006', clientName: 'Fondation Modou Gueye',
        lastMessage: 'Pouvons-nous planifier une revue trimestrielle la semaine prochaine ?',
        lastTime: '2025-02-20T10:00:00', unread: 1, pinned: true, starred: false, archived: false,
        messages: [
            { id: 'm20', sender: 'client', text: 'Moussa, le conseil d\'administration souhaite une mise à jour sur la performance du portefeuille ce trimestre.', time: '2025-02-20T09:00:00', read: true },
            { id: 'm21', sender: 'advisor', text: 'Bien sûr. Votre portefeuille affiche +12,4% YTD, surperformant le benchmark de 2,3 points. Je prépare un rapport détaillé avec les recommandations pour le prochain trimestre.', time: '2025-02-20T09:30:00', read: true },
            { id: 'm22', sender: 'client', text: 'Pouvons-nous planifier une revue trimestrielle la semaine prochaine ?', time: '2025-02-20T10:00:00', read: false },
        ],
    },
    {
        id: 'conv4', clientId: 'C007', clientName: 'Cheikh K. Ba',
        lastMessage: 'Votre transfert ACAT depuis TD Ameritrade est en cours. Délai estimé : 5 jours ouvrés.',
        lastTime: '2025-02-19T14:00:00', unread: 0, pinned: false, starred: true, archived: false,
        messages: [
            { id: 'm30', sender: 'client', text: 'Moussa, est-ce que mon transfert depuis TD Ameritrade a bien été initié ?', time: '2025-02-19T11:00:00', read: true },
            { id: 'm31', sender: 'advisor', text: 'Votre transfert ACAT depuis TD Ameritrade est en cours. Délai estimé : 5 jours ouvrés.', time: '2025-02-19T14:00:00', read: true },
        ],
    },
    {
        id: 'conv5', clientId: 'C004', clientName: 'Ibrahima Fall',
        lastMessage: 'Merci pour les explications sur la récolte de pertes fiscales.',
        lastTime: '2025-02-18T16:45:00', unread: 0, pinned: false, starred: false, archived: false,
        messages: [
            { id: 'm40', sender: 'client', text: 'Moussa, j\'ai vu une opération PYPL → XLF dans mon relevé. Pouvez-vous m\'expliquer ?', time: '2025-02-18T14:00:00', read: true },
            { id: 'm41', sender: 'advisor', text: 'Bien sûr Ibrahima ! C\'est une opération de **récolte de pertes fiscales** (Tax-Loss Harvesting). Voici comment ça fonctionne :\n\n📉 Votre position PYPL était en perte de 2 100 $\n🔄 Nous avons vendu PYPL et acheté XLF (ETF financier similaire)\n💰 La perte de 2 100 $ est maintenant **déductible** de vos impôts\n✅ Votre exposition au marché reste identique\n\nRésultat net : vous économisez environ 780 $ d\'impôts sans changer votre stratégie d\'investissement.', time: '2025-02-18T15:30:00', read: true },
            { id: 'm42', sender: 'client', text: 'Merci pour les explications sur la récolte de pertes fiscales.', time: '2025-02-18T16:45:00', read: true },
        ],
    },
    {
        id: 'conv6', clientId: 'C008', clientName: 'Mariama Tall',
        lastMessage: 'Bienvenue chez Koppar-Diambar ! Votre compte courtage individuel est maintenant actif.',
        lastTime: '2025-02-17T10:00:00', unread: 0, pinned: false, starred: false, archived: true,
        messages: [
            { id: 'm50', sender: 'advisor', text: 'Bienvenue chez Koppar-Diambar ! Votre compte courtage individuel est maintenant actif. Voici les prochaines étapes :\n\n1. ✅ Compte ouvert\n2. 🔄 Transfert depuis Schwab en cours\n3. 📊 Modèle KD Bouclier Conservateur assigné\n\nN\'hésitez pas à me contacter pour toute question.', time: '2025-02-17T10:00:00', read: true },
        ],
    },
];

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getAvatarColor(name) {
    let hash = 0;
    for (const c of name) hash = c.charCodeAt(0) + ((hash << 5) - hash);
    const h = Math.abs(hash) % 360;
    return `hsl(${h}, 45%, 45%)`;
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'Hier';
    if (days < 7) return `${days}j`;
    return formatDate(dateStr);
}

export default function Messaging() {
    const [conversations, setConversations] = useState(mockConversations);
    const [activeConv, setActiveConv] = useState(mockConversations[0]);
    const [input, setInput] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all'); // all, unread, starred, pinned, archived
    const [showNewMessage, setShowNewMessage] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [activeConv]);

    const totalUnread = conversations.reduce((sum, c) => sum + c.unread, 0);

    const filtered = conversations.filter(c => {
        if (filter === 'unread') return c.unread > 0;
        if (filter === 'starred') return c.starred;
        if (filter === 'pinned') return c.pinned;
        if (filter === 'archived') return c.archived;
        if (filter === 'all') return !c.archived;
        return true;
    }).filter(c =>
        c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.lastTime) - new Date(a.lastTime);
    });

    const handleSend = () => {
        if (!input.trim()) return;
        const newMsg = {
            id: `m_${Date.now()}`, sender: 'advisor', text: input,
            time: new Date().toISOString(), read: true,
        };
        const updated = conversations.map(c => {
            if (c.id === activeConv.id) {
                return { ...c, messages: [...c.messages, newMsg], lastMessage: input, lastTime: newMsg.time };
            }
            return c;
        });
        setConversations(updated);
        setActiveConv(prev => ({ ...prev, messages: [...prev.messages, newMsg], lastMessage: input, lastTime: newMsg.time }));
        setInput('');

        // Simulate auto-reply
        setTimeout(() => {
            const responses = [
                "Merci Moussa, je reviendrai vers vous rapidement.",
                "Bien noté, je vais en discuter avec mon conjoint.",
                "Parfait, c'est exactement ce que je cherchais.",
                "Pouvez-vous m'envoyer plus de détails par portail ?",
                "Merci pour votre réactivité !",
            ];
            const reply = {
                id: `m_${Date.now() + 1}`, sender: 'client',
                text: responses[Math.floor(Math.random() * responses.length)],
                time: new Date().toISOString(), read: false,
            };
            setConversations(prev => prev.map(c => {
                if (c.id === activeConv.id) {
                    return { ...c, messages: [...c.messages, reply], lastMessage: reply.text, lastTime: reply.time, unread: c.unread + 1 };
                }
                return c;
            }));
            setActiveConv(prev => ({ ...prev, messages: [...prev.messages, reply], lastMessage: reply.text, lastTime: reply.time }));
        }, 2500);
    };

    const toggleStar = (convId) => {
        setConversations(prev => prev.map(c => c.id === convId ? { ...c, starred: !c.starred } : c));
    };

    const togglePin = (convId) => {
        setConversations(prev => prev.map(c => c.id === convId ? { ...c, pinned: !c.pinned } : c));
    };

    const archiveConv = (convId) => {
        setConversations(prev => prev.map(c => c.id === convId ? { ...c, archived: !c.archived } : c));
    };

    const selectConversation = (conv) => {
        setActiveConv(conv);
        // Mark as read
        setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, unread: 0 } : c));
    };

    return (
        <div className="page-content" style={{ height: 'calc(100vh - 80px)', padding: 0, display: 'flex', overflow: 'hidden' }}>
            {/* ── Panneau gauche : Liste des conversations ── */}
            <div style={{
                width: 360, borderRight: '1px solid var(--border-primary)',
                display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)',
                flexShrink: 0,
            }}>
                {/* Header conversations */}
                <div style={{
                    padding: 'var(--space-4) var(--space-4) var(--space-3)',
                    borderBottom: '1px solid var(--border-primary)',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Messages</h2>
                            {totalUnread > 0 && (
                                <span style={{
                                    background: 'var(--kd-copper)', color: 'white',
                                    fontSize: 11, fontWeight: 700, padding: '2px 8px',
                                    borderRadius: 'var(--radius-full)', minWidth: 20, textAlign: 'center',
                                }}>{totalUnread}</span>
                            )}
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={() => setShowNewMessage(!showNewMessage)}>
                            <Plus size={14} /> Nouveau
                        </button>
                    </div>

                    {/* Barre de recherche */}
                    <div className="header-search" style={{ width: '100%', marginBottom: 'var(--space-3)' }}>
                        <Search size={14} />
                        <input type="text" placeholder="Rechercher un message..."
                            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                    </div>

                    {/* Filtres */}
                    <div style={{ display: 'flex', gap: 4 }}>
                        {[
                            ['all', 'Tous'], ['unread', `Non lus (${conversations.filter(c => c.unread > 0).length})`],
                            ['starred', '⭐'], ['pinned', '📌'], ['archived', '📦'],
                        ].map(([key, label]) => (
                            <button key={key}
                                className={`btn btn-sm ${filter === key ? 'btn-primary' : 'btn-ghost'}`}
                                style={{ fontSize: 11, padding: '4px 8px' }}
                                onClick={() => setFilter(key)}
                            >{label}</button>
                        ))}
                    </div>
                </div>

                {/* Liste des conversations */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {filtered.map(conv => (
                        <div key={conv.id}
                            onClick={() => selectConversation(conv)}
                            style={{
                                display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-3) var(--space-4)',
                                cursor: 'pointer', borderBottom: '1px solid var(--border-primary)',
                                background: activeConv?.id === conv.id ? 'var(--bg-tertiary)' : 'transparent',
                                transition: 'background 0.15s',
                            }}
                        >
                            <div style={{
                                width: 42, height: 42, borderRadius: 'var(--radius-full)', flexShrink: 0,
                                background: getAvatarColor(conv.clientName),
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 14, fontWeight: 700, color: 'white', position: 'relative',
                            }}>
                                {getInitials(conv.clientName)}
                                {conv.unread > 0 && (
                                    <div style={{
                                        position: 'absolute', top: -2, right: -2, width: 18, height: 18,
                                        background: 'var(--kd-copper)', borderRadius: '50%',
                                        fontSize: 10, fontWeight: 700, color: 'white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: '2px solid var(--bg-secondary)',
                                    }}>{conv.unread}</div>
                                )}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                                    <span style={{ fontSize: 13, fontWeight: conv.unread > 0 ? 700 : 500, color: 'var(--text-primary)' }}>
                                        {conv.pinned && <span style={{ marginRight: 4 }}>📌</span>}
                                        {conv.clientName}
                                    </span>
                                    <span style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0 }}>
                                        {timeAgo(conv.lastTime)}
                                    </span>
                                </div>
                                <div style={{
                                    fontSize: 12, color: conv.unread > 0 ? 'var(--text-secondary)' : 'var(--text-muted)',
                                    fontWeight: conv.unread > 0 ? 500 : 400,
                                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                }}>
                                    {conv.lastMessage}
                                </div>
                            </div>
                            {conv.starred && (
                                <Star size={12} fill="var(--kd-warning)" style={{ color: 'var(--kd-warning)', flexShrink: 0, marginTop: 4 }} />
                            )}
                        </div>
                    ))}

                    {filtered.length === 0 && (
                        <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-muted)', fontSize: 13 }}>
                            Aucune conversation trouvée
                        </div>
                    )}
                </div>
            </div>

            {/* ── Panneau droit : Conversation active ── */}
            {activeConv ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header conversation */}
                    <div style={{
                        padding: 'var(--space-3) var(--space-5)',
                        borderBottom: '1px solid var(--border-primary)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        background: 'var(--bg-primary)',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 'var(--radius-full)',
                                background: getAvatarColor(activeConv.clientName),
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 13, fontWeight: 700, color: 'white',
                            }}>
                                {getInitials(activeConv.clientName)}
                            </div>
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 600 }}>{activeConv.clientName}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                                    <Lock size={10} />
                                    <span>Chiffré de bout en bout</span>
                                    <span>•</span>
                                    <span>Archivage conforme SEC/FINRA</span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                            <button className="btn btn-ghost btn-sm" title="Appel vocal"><Phone size={15} /></button>
                            <button className="btn btn-ghost btn-sm" title="Visioconférence"><Video size={15} /></button>
                            <button className="btn btn-ghost btn-sm" title="Épingler"
                                onClick={() => togglePin(activeConv.id)}
                                style={{ color: activeConv.pinned ? 'var(--kd-copper)' : undefined }}>
                                <Pin size={15} />
                            </button>
                            <button className="btn btn-ghost btn-sm" title="Favori"
                                onClick={() => toggleStar(activeConv.id)}
                                style={{ color: activeConv.starred ? 'var(--kd-warning)' : undefined }}>
                                <Star size={15} fill={activeConv.starred ? 'var(--kd-warning)' : 'none'} />
                            </button>
                            <button className="btn btn-ghost btn-sm" title="Archiver"
                                onClick={() => archiveConv(activeConv.id)}>
                                <Archive size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Zone messages */}
                    <div style={{
                        flex: 1, overflowY: 'auto', padding: 'var(--space-5)',
                        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
                    }}>
                        {/* Avis de conformité */}
                        <div style={{
                            textAlign: 'center', padding: 'var(--space-3)',
                            background: 'rgba(126, 184, 218, 0.08)', borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(126, 184, 218, 0.15)', marginBottom: 'var(--space-3)',
                        }}>
                            <Lock size={12} style={{ marginRight: 6, verticalAlign: 'middle', color: 'var(--kd-diamond)' }} />
                            <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                                Cette conversation est chiffrée et archivée conformément aux réglementations SEC Rule 17a-4 et FINRA Rule 4511.
                            </span>
                        </div>

                        {activeConv.messages.map(msg => (
                            <div key={msg.id} style={{
                                display: 'flex', justifyContent: msg.sender === 'advisor' ? 'flex-end' : 'flex-start',
                                maxWidth: '100%',
                            }}>
                                <div style={{
                                    maxWidth: '70%', padding: 'var(--space-3) var(--space-4)',
                                    borderRadius: msg.sender === 'advisor'
                                        ? 'var(--radius-lg) var(--radius-lg) 4px var(--radius-lg)'
                                        : 'var(--radius-lg) var(--radius-lg) var(--radius-lg) 4px',
                                    background: msg.sender === 'advisor'
                                        ? 'linear-gradient(135deg, var(--kd-copper-dark), var(--kd-copper))'
                                        : 'var(--bg-tertiary)',
                                    border: msg.sender === 'advisor' ? 'none' : '1px solid var(--border-primary)',
                                    color: msg.sender === 'advisor' ? 'white' : 'var(--text-primary)',
                                }}>
                                    {msg.text.split('\n').map((line, j) => (
                                        <span key={j}>
                                            {line.split('**').map((part, k) =>
                                                k % 2 === 1 ? <strong key={k}>{part}</strong> : part
                                            )}
                                            {j < msg.text.split('\n').length - 1 && <br />}
                                        </span>
                                    ))}

                                    {msg.attachment && (
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
                                            marginTop: 'var(--space-2)', padding: 'var(--space-2) var(--space-3)',
                                            background: 'rgba(0,0,0,0.15)', borderRadius: 'var(--radius-sm)',
                                        }}>
                                            <FileText size={14} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 12, fontWeight: 500 }}>{msg.attachment.name}</div>
                                                <div style={{ fontSize: 10, opacity: 0.7 }}>{msg.attachment.size}</div>
                                            </div>
                                            <Download size={14} style={{ cursor: 'pointer', opacity: 0.8 }} />
                                        </div>
                                    )}

                                    <div style={{
                                        display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4,
                                        marginTop: 4, fontSize: 10,
                                        opacity: 0.6,
                                    }}>
                                        {new Date(msg.time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                        {msg.sender === 'advisor' && (
                                            <CheckCheck size={12} style={{ color: msg.read ? '#34D399' : 'currentColor' }} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Zone de saisie */}
                    <div style={{
                        padding: 'var(--space-3) var(--space-5)',
                        borderTop: '1px solid var(--border-primary)',
                        background: 'var(--bg-primary)',
                    }}>
                        {/* Suggestions rapides */}
                        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
                            {[
                                'Je reviens vers vous rapidement.',
                                'Voulez-vous planifier un appel ?',
                                'Je prépare une proposition.',
                            ].map(suggestion => (
                                <button key={suggestion}
                                    className="btn btn-ghost btn-sm"
                                    style={{ fontSize: 11, padding: '3px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-secondary)' }}
                                    onClick={() => setInput(suggestion)}
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end' }}>
                            <button className="btn btn-ghost btn-sm" title="Joindre un fichier"><Paperclip size={18} /></button>
                            <button className="btn btn-ghost btn-sm" title="Envoyer une image"><Image size={18} /></button>
                            <div style={{
                                flex: 1, position: 'relative',
                            }}>
                                <textarea
                                    placeholder="Écrivez un message sécurisé..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                                    rows={1}
                                    style={{
                                        width: '100%', resize: 'none', padding: 'var(--space-3) var(--space-4)',
                                        background: 'var(--bg-tertiary)', border: '1px solid var(--border-secondary)',
                                        borderRadius: 'var(--radius-lg)', color: 'var(--text-primary)',
                                        fontSize: 13, fontFamily: 'var(--font-primary)',
                                        outline: 'none', transition: 'border-color 0.2s',
                                    }}
                                />
                            </div>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={handleSend}
                                disabled={!input.trim()}
                                style={{ borderRadius: 'var(--radius-full)', width: 40, height: 40, padding: 0 }}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'var(--text-muted)' }}>
                            <span><Lock size={9} style={{ marginRight: 3, verticalAlign: 'middle' }} />Chiffré • Archivé • Conforme SEC</span>
                            <span>Entrée pour envoyer • Shift+Entrée pour nouvelle ligne</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', gap: 'var(--space-3)', color: 'var(--text-muted)',
                }}>
                    <MessageCircle size={48} strokeWidth={1} />
                    <p style={{ fontSize: 15 }}>Sélectionnez une conversation</p>
                </div>
            )}
        </div>
    );
}
