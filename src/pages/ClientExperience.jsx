import { useState } from 'react';
import { Globe, Star, Trophy, Award, Zap, TrendingUp, MessageCircle, Mic } from 'lucide-react';

// ── Gamification ───────────────────────────────────────────────────────────
const BADGES = [
    { id: 'B01', nom: 'Pionnier Patrimonial', emoji: '🏆', obtenu: true, date: '2024-01', desc: 'Premier client à activer le portfolio automatique' },
    { id: 'B02', nom: 'Épargnant Elite', emoji: '💎', obtenu: true, date: '2024-06', desc: '3 ans sans retrait du fonds d\'urgence' },
    { id: 'B03', nom: 'Investisseur Africain', emoji: '🌍', obtenu: true, date: '2024-10', desc: 'Allocation de 20%+ en actifs africains (BRVM + RWA)' },
    { id: 'B04', nom: 'Successeur Digital', emoji: '📜', obtenu: false, desc: 'Mettre à jour votre testament numérique' },
    { id: 'B05', nom: 'Champion ESG', emoji: '🌿', obtenu: false, desc: 'Aligner 50% du portefeuille sur des critères ESG' },
    { id: 'B06', nom: 'Maître du Score', emoji: '🎯', obtenu: false, desc: 'Atteindre un FHS de 900/1000' },
];

const MISSIONS = [
    { titre: 'Lire le rapport ESG Q4', xp: 50, done: true, type: 'éducation' },
    { titre: 'Mettre à jour vos bénéficiaires', xp: 150, done: false, type: 'patrimoine', urgent: true },
    { titre: 'Répartir le virement de janvier', xp: 100, done: false, type: 'investissement' },
    { titre: 'Compléter votre profil fiscal 2025', xp: 200, done: false, type: 'fiscal' },
    { titre: 'Valider la proposition Fonds Africain', xp: 120, done: true, type: 'investissement' },
];

// ── Voice commands simulation ──────────────────────────────────────────────
const VOICE_COMMANDS = [
    { command: '"Quelle est la valeur de mon portefeuille ?"', response: '8 480 000 FCFA — en hausse de 2,4% cette semaine.', icon: '💬' },
    { command: '"Achète 3 tokens de la Tour Sunu"', response: 'Ordre créé : 3 tokens RWA Tour Sunu × 500 000 FCFA = 1 500 000 FCFA. Confirmation 2FA requise.', icon: '🏢' },
    { command: '"Montre-moi mes obligations BCEAO"', response: 'Voici vos 4 OAT BCEAO — rendement moyen de 6,2% — valeur totale 1 850 000 FCFA.', icon: '📄' },
    { command: '"Quel est mon score de santé ?"', response: 'Votre Financial Health Score est de 832/1000 — Excellent. Priorité : mettre à jour votre testament (+37 pts).', icon: '🎯' },
];

// ── Whatsapp integration ───────────────────────────────────────────────────
const WHATSAPP_MESSAGES = [
    { side: 'client', text: 'Bonjour Diambar, quel est mon solde Wave ?', time: '09:32' },
    { side: 'ai', text: '💳 Votre solde Wave est de **950 000 FCFA**. Dernière opération : -50 000 FCFA le 21/02 (cotisation tontine). Souhaitez-vous faire un virement ?', time: '09:32' },
    { side: 'client', text: 'Oui, envoie 200 000 à Aminata', time: '09:33' },
    { side: 'ai', text: '✅ Virement préparé : **200 000 FCFA → Aminata Sow (+221 77 xxx xx)**. Confirmez par "OUI" pour exécuter.', time: '09:33' },
    { side: 'client', text: 'OUI', time: '09:34' },
    { side: 'ai', text: '🎉 Virement effectué ! Référence : KD-WA-20250222. Votre nouveau solde Wave : **750 000 FCFA**.', time: '09:34' },
];

// ── 3D Globe (SVG visualization) ──────────────────────────────────────────
function PatrimonyGlobe({ allocations }) {
    const total = allocations.reduce((s, a) => s + a.value, 0);
    let cx = 0;
    return (
        <div style={{ position: 'relative', width: 240, height: 240, margin: '0 auto' }}>
            <svg width="240" height="240" viewBox="0 0 240 240">
                <defs>
                    <radialGradient id="globeGrad" cx="40%" cy="40%">
                        <stop offset="0%" stopColor="rgba(200,121,65,0.15)" />
                        <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                    </radialGradient>
                </defs>
                <circle cx="120" cy="120" r="100" fill="url(#globeGrad)" stroke="rgba(200,121,65,0.2)" strokeWidth="1" />
                {allocations.map((a, i) => {
                    const pct = a.value / total;
                    const angle = cx * 360;
                    const nextAngle = angle + pct * 360;
                    cx += pct;
                    const x1 = 120 + 100 * Math.cos((angle - 90) * Math.PI / 180);
                    const y1 = 120 + 100 * Math.sin((angle - 90) * Math.PI / 180);
                    const x2 = 120 + 100 * Math.cos((nextAngle - 90) * Math.PI / 180);
                    const y2 = 120 + 100 * Math.sin((nextAngle - 90) * Math.PI / 180);
                    const large = pct > 0.5 ? 1 : 0;
                    const midAngle = ((angle + nextAngle) / 2 - 90) * Math.PI / 180;
                    const lx = 120 + 70 * Math.cos(midAngle);
                    const ly = 120 + 70 * Math.sin(midAngle);
                    return (
                        <g key={i}>
                            <path d={`M 120 120 L ${x1} ${y1} A 100 100 0 FCFA{large} 1 FCFA{x2} ${y2} Z`}
                                fill={a.color} opacity="0.7" stroke="rgba(10,15,8,0.5)" strokeWidth="1.5" />
                            {pct > 0.07 && <text x={lx} y={ly} textAnchor="middle" fill="white" fontSize="10" fontWeight="700" dy="4">{Math.round(pct * 100)}%</text>}
                        </g>
                    );
                })}
                <circle cx="120" cy="120" r="40" fill="var(--bg-primary)" />
                <text x="120" y="116" textAnchor="middle" fill="var(--kd-copper-light)" fontSize="14" fontWeight="900">8,48M</text>
                <text x="120" y="130" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9">FCFA</text>
            </svg>
        </div>
    );
}

const ALLOCATIONS = [
    { label: 'Actions', value: 4_120_000, color: '#C87941' },
    { label: 'Obligations', value: 1_850_000, color: '#7EA9C5' },
    { label: 'Immobilier', value: 1_680_000, color: '#52B788' },
    { label: 'Cash', value: 540_000, color: '#F4CC6B' },
    { label: 'Alternatifs', value: 290_000, color: '#A78BFA' },
];

export default function ClientExperience() {
    const [activeTab, setActiveTab] = useState('globe');
    const [voiceIdx, setVoiceIdx] = useState(null);
    const [userXP] = useState(1_240);
    const [nextLevel] = useState(2_000);

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #7C3AED, #C87941)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}>✨</div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Expérience Client Révolutionnaire</h1>
                        <p style={{ marginBottom: 0 }}>Visualisation 3D · Gamification · Interface vocale · WhatsApp Banking</p>
                    </div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-5)' }}>
                {[['globe', '🌐 Visualisation 3D Patrimoine'], ['gamification', '🏆 Gamification'], ['voice', '🎙️ Interface Vocale'], ['whatsapp', '💬 WhatsApp Banking']].map(([k, l]) => (
                    <button key={k} className={`tab ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>{l}</button>
                ))}
            </div>

            {/* ── GLOBE ─────────────────────────────────────────────────── */}
            {activeTab === 'globe' && (
                <div className="grid-2" style={{ alignItems: 'start' }}>
                    <div>
                        <div className="card" style={{ marginBottom: 'var(--space-4)', background: 'rgba(200,121,65,0.04)', border: '1px solid rgba(200,121,65,0.2)' }}>
                            <div className="card-header"><h3>🌐 Globe patrimonial interactif</h3></div>
                            <PatrimonyGlobe allocations={ALLOCATIONS} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center', marginTop: 'var(--space-3)' }}>
                                {ALLOCATIONS.map(a => (
                                    <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color }} />
                                        <span style={{ color: 'var(--text-muted)' }}>{a.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="card-header"><h3>📍 Localisation des actifs</h3></div>
                            {[
                                { pays: '🇸🇳 Sénégal', valeur: '5 200 000 FCFA', pct: 61, color: '#52B788' },
                                { pays: '🇨🇮 Côte d\'Ivoire', valeur: '1 400 000 FCFA', pct: 17, color: '#C87941' },
                                { pays: '🌍 BRVM Zone', valeur: '920 000 FCFA', pct: 11, color: '#7EA9C5' },
                                { pays: '🌐 International', valeur: '960 000 FCFA', pct: 11, color: '#A78BFA' },
                            ].map(loc => (
                                <div key={loc.pays} style={{ marginBottom: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontSize: 13, fontWeight: 600 }}>{loc.pays}</span>
                                        <span style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{loc.valeur}</span>
                                    </div>
                                    <div className="progress-bar" style={{ height: 6 }}>
                                        <div className="progress-fill" style={{ width: `${loc.pct}%`, background: loc.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card">
                            <div className="card-header"><h3>📊 Performance par régions</h3></div>
                            <table className="data-table">
                                <thead><tr><th>Zone</th><th>Perf. 1 an</th><th>Perf. 5 ans</th></tr></thead>
                                <tbody>
                                    {[['🇸🇳 Sénégal', '+14,2%', '+52%'], ['🇨🇮 Côte d\'Ivoire', '+8,1%', '+34%'], ['🌍 BRVM', '+18,4%', '+71%'], ['🌐 Global', '+6,3%', '+28%']].map(([z, a, b]) => (
                                        <tr key={z}><td>{z}</td><td style={{ color: 'var(--kd-success)', fontWeight: 700 }}>{a}</td><td style={{ color: 'var(--kd-success)', fontWeight: 700 }}>{b}</td></tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* ── GAMIFICATION ──────────────────────────────────────────── */}
            {activeTab === 'gamification' && (
                <div>
                    {/* XP Bar */}
                    <div className="card" style={{ marginBottom: 'var(--space-5)', background: 'linear-gradient(135deg, rgba(200,121,65,0.08), rgba(165,180,252,0.04))' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg, #C87941, #E9A319)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 900, color: 'white', boxShadow: '0 0 16px rgba(200,121,65,0.4)' }}>12</div>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: 16 }}>Niveau 12 — Stratège Patrimoine</div>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Top 8% des clients Koppar-Diambar</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 900, fontSize: 18, color: 'var(--kd-copper-light)' }}>{userXP.toLocaleString()} XP</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Prochain niveau : {nextLevel.toLocaleString()} XP</div>
                            </div>
                        </div>
                        <div className="progress-bar" style={{ height: 10 }}>
                            <div className="progress-fill" style={{ width: `${(userXP / nextLevel) * 100}%`, background: 'linear-gradient(90deg, #C87941, #E9A319)' }} />
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 'var(--space-2)', textAlign: 'right' }}>{nextLevel - userXP} XP pour le niveau 13</div>
                    </div>

                    <div className="grid-2">
                        {/* Badges */}
                        <div className="card">
                            <div className="card-header"><h3>🏅 Mes badges</h3></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                                {BADGES.map(b => (
                                    <div key={b.id} style={{ padding: 'var(--space-3)', background: b.obtenu ? 'rgba(200,121,65,0.08)' : 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: `1px solid ${b.obtenu ? 'rgba(200,121,65,0.3)' : 'rgba(255,255,255,0.08)'}`, opacity: b.obtenu ? 1 : 0.5, textAlign: 'center' }}>
                                        <div style={{ fontSize: 28, marginBottom: 4 }}>{b.emoji}</div>
                                        <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 2 }}>{b.nom}</div>
                                        <div style={{ fontSize: 9, color: 'var(--text-muted)', lineHeight: 1.3 }}>{b.obtenu ? `✓ Obtenu ${b.date}` : b.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Missions */}
                        <div className="card">
                            <div className="card-header"><h3>🎯 Missions actives</h3></div>
                            {MISSIONS.map((m, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0', borderBottom: '1px solid rgba(255,255,255,0.05)', opacity: m.done ? 0.6 : 1 }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                                        <span style={{ fontSize: 18 }}>{m.done ? '✅' : m.urgent ? '🔴' : '⬜'}</span>
                                        <div>
                                            <div style={{ fontSize: 12, fontWeight: 600, textDecoration: m.done ? 'line-through' : 'none' }}>{m.titre}</div>
                                            <span className="tag" style={{ fontSize: 9, marginTop: 2, display: 'inline-block' }}>{m.type}</span>
                                        </div>
                                    </div>
                                    <span style={{ fontWeight: 700, color: 'var(--kd-copper-light)', fontSize: 12, flexShrink: 0 }}>+{m.xp} XP</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── VOICE ──────────────────────────────────────────────────── */}
            {activeTab === 'voice' && (
                <div>
                    <div style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'rgba(124,58,237,0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(124,58,237,0.2)', textAlign: 'center' }}>
                        <div style={{ fontSize: 48, marginBottom: 'var(--space-3)' }}>🎙️</div>
                        <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>Diambar Voice — Interface vocale patrimoniale</div>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Parlez naturellement en Français, Wolof, ou Anglais. Diambar comprend le contexte financier africain.</div>
                        <button className="btn btn-primary">🎙️ Activer la commande vocale</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {VOICE_COMMANDS.map((vc, i) => (
                            <div key={i} className="card" style={{ cursor: 'pointer', border: voiceIdx === i ? '1px solid rgba(124,58,237,0.4)' : undefined }}
                                onClick={() => setVoiceIdx(voiceIdx === i ? null : i)}>
                                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: voiceIdx === i ? 'var(--space-3)' : 0 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🎙️</div>
                                    <span style={{ fontWeight: 600, color: 'white', fontSize: 14, fontStyle: 'italic' }}>{vc.command}</span>
                                </div>
                                {voiceIdx === i && (
                                    <div style={{ padding: 'var(--space-3) var(--space-4)', background: 'rgba(82,183,136,0.07)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(82,183,136,0.2)', fontSize: 13, lineHeight: 1.6 }}>
                                        <span style={{ color: 'var(--kd-success)', fontWeight: 700 }}>⚡ Diambar : </span>{vc.response}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── WHATSAPP ───────────────────────────────────────────────── */}
            {activeTab === 'whatsapp' && (
                <div className="grid-2" style={{ alignItems: 'start' }}>
                    <div>
                        <div style={{ background: '#075e54', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}>
                            {/* WA Header */}
                            <div style={{ background: '#128C7E', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#C87941', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: 'white' }}>KD</div>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 14, color: 'white' }}>Koppar-Diambar</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)' }}>● En ligne</div>
                                </div>
                            </div>
                            {/* Messages */}
                            <div style={{ padding: 12, background: '#0d1117', minHeight: 360 }}>
                                {WHATSAPP_MESSAGES.map((msg, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: msg.side === 'client' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                                        <div style={{ maxWidth: '78%', padding: '8px 12px', borderRadius: msg.side === 'client' ? '12px 12px 2px 12px' : '12px 12px 12px 2px', background: msg.side === 'client' ? '#005c4b' : '#1e2b20', fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.87)' }}>
                                            {msg.text}
                                            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 3, textAlign: 'right' }}>{msg.time} {msg.side === 'client' ? '✓✓' : ''}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Input */}
                            <div style={{ background: '#1e2b20', padding: '8px 12px', display: 'flex', gap: 8, alignItems: 'center' }}>
                                <div style={{ flex: 1, background: '#2a3d2b', borderRadius: 20, padding: '8px 14px', fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Tapez un message...</div>
                                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>🎤</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                            <div className="card-header"><h3>💬 Commandes WhatsApp disponibles</h3></div>
                            {[
                                ['Solde', '/solde [Wave|Orange|Ecobank]', 'Consulter un solde'],
                                ['Virement', '/envoyer [montant] à [nom]', 'Initier un transfert'],
                                ['Portefeuille', '/portfolio', 'Performance du jour'],
                                ['Rapport', '/rapport [mois]', 'Télécharger un rapport PDF'],
                                ['Score', '/score', 'Votre Financial Health Score'],
                                ['Alerte', '/alerte +2% SNTS', 'Créer une alerte de cours'],
                            ].map(([name, cmd, desc]) => (
                                <div key={name} style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--kd-success)', fontWeight: 700 }}>{cmd}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{desc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="card" style={{ background: 'rgba(7,94,84,0.08)', border: '1px solid rgba(7,94,84,0.3)' }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#52B788', marginBottom: 'var(--space-3)' }}>🔒 Sécurité WhatsApp Banking</div>
                            {['Validation 2FA par OTP sur chaque opération', 'Session de 5 minutes — déconnexion automatique', 'Chiffrement de bout en bout WhatsApp + KD', 'Limites de transaction configurables'].map(s => (
                                <div key={s} style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: '#52B788' }}>✓</span> {s}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
