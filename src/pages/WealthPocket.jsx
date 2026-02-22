import { useState, useEffect } from 'react';
import {
    Smartphone, Fingerprint, Wifi, WifiOff, Bell, QrCode,
    Battery, Signal, Zap, TrendingUp, TrendingDown, Eye,
    Lock, CheckCircle, BarChart3, Shield, Star, Download
} from 'lucide-react';

const PORTFOLIO_DATA = [
    { label: 'Actions', value: 4_120_000, pct: 48.5, color: '#C87941', change: +2.4 },
    { label: 'Obligations', value: 1_850_000, pct: 21.8, color: '#7EA9C5', change: -0.3 },
    { label: 'Immobilier', value: 1_680_000, pct: 19.8, color: '#52B788', change: +0.8 },
    { label: 'Cash', value: 540_000, pct: 6.4, color: '#F4CC6B', change: 0 },
    { label: 'Alternatifs', value: 290_000, pct: 3.5, color: '#A78BFA', change: +1.2 },
];

const NOTIFICATIONS = [
    { icon: '🎉', text: 'Votre portefeuille a progressé de +2,4% cette semaine !', time: '2h', type: 'success', unread: true },
    { icon: '⚡', text: 'Opportunité détectée : BRVM en hausse de 3,2% ce matin', time: '5h', type: 'alert', unread: true },
    { icon: '📄', text: 'Rapport mensuel de janvier disponible', time: '1j', type: 'info', unread: false },
    { icon: '🎯', text: 'Objectif Retraite 2035 : vous êtes à 78% de la trajectoire', time: '3j', type: 'info', unread: false },
];

const SCREEN_VIEWS = ['home', 'portfolio', 'notifications', 'qrcode', 'biometric', 'offline'];

function PhoneFrame({ children, screen }) {
    const [time, setTime] = useState(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    useEffect(() => {
        const i = setInterval(() => setTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })), 30000);
        return () => clearInterval(i);
    }, []);

    return (
        <div style={{ width: 300, margin: '0 auto', position: 'relative' }}>
            {/* Phone body */}
            <div style={{ background: '#1a1a1a', borderRadius: 40, padding: 4, boxShadow: '0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)', position: 'relative' }}>
                {/* Screen */}
                <div style={{ borderRadius: 36, overflow: 'hidden', background: '#0a0f08', height: 580, position: 'relative' }}>
                    {/* Status bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', background: 'rgba(0,0,0,0.3)' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'white' }}>{time}</span>
                        <div style={{ width: 100, height: 24, background: '#1a1a1a', borderRadius: 12, margin: '-8px auto 0' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Signal size={11} color="white" />
                            <Wifi size={11} color="white" />
                            <Battery size={11} color="white" />
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            {/* Side button */}
            <div style={{ position: 'absolute', right: -3, top: 120, width: 3, height: 60, background: '#333', borderRadius: '0 2px 2px 0' }} />
        </div>
    );
}

function HomeScreen({ setScreen }) {
    const [blinkDot, setBlinkDot] = useState(true);
    useEffect(() => {
        const i = setInterval(() => setBlinkDot(b => !b), 800);
        return () => clearInterval(i);
    }, []);

    return (
        <div style={{ padding: '8px 16px 16px', height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg, #0d1a0e 0%, #0a1000 100%)' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Bonjour</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'white' }}>Ousmane N'Diaye 👋</div>
                </div>
                <div style={{ position: 'relative' }} onClick={() => setScreen('notifications')}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(82,183,136,0.15)', border: '1px solid rgba(82,183,136,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Bell size={16} color="#52B788" />
                    </div>
                    <div style={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#DC2626', border: '1.5px solid #0a1000', opacity: blinkDot ? 1 : 0.3 }} />
                </div>
            </div>

            {/* Portfolio card */}
            <div style={{ background: 'linear-gradient(135deg, #2D6A4F, #52B788)', borderRadius: 20, padding: 16, marginBottom: 12, cursor: 'pointer' }} onClick={() => setScreen('portfolio')}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Valeur du portefeuille</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'white', fontVariantNumeric: 'tabular-nums', marginBottom: 2 }}>8 480 000 FCFA</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingUp size={12} color="rgba(255,255,255,0.8)" />
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', fontWeight: 700 }}>+2,4% cette semaine (+203 520 FCFA)</span>
                </div>
                {/* Mini chart */}
                <svg width="100%" height="36" viewBox="0 0 240 36" style={{ marginTop: 8 }}>
                    <polyline points="0,30 40,22 80,25 120,15 160,18 200,8 240,4" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                    <polyline points="0,30 40,22 80,25 120,15 160,18 200,8 240,4 240,36 0,36" fill="rgba(255,255,255,0.1)" />
                </svg>
            </div>

            {/* Quick actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                {[
                    { icon: '📊', label: 'Performance', fn: 'portfolio' },
                    { icon: '📤', label: 'Virement', fn: null },
                    { icon: '📝', label: 'QR Signature', fn: 'qrcode' },
                    { icon: '📄', label: 'Documents', fn: null },
                ].map(a => (
                    <div key={a.label} onClick={() => a.fn && setScreen(a.fn)} style={{ background: 'rgba(82,183,136,0.08)', border: '1px solid rgba(82,183,136,0.2)', borderRadius: 14, padding: '10px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 18 }}>{a.icon}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{a.label}</span>
                    </div>
                ))}
            </div>

            {/* Offline badge */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                <div onClick={() => setScreen('biometric')} style={{ flex: 1, background: 'rgba(233,163,25,0.1)', border: '1px solid rgba(233,163,25,0.3)', borderRadius: 12, padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Fingerprint size={14} color="#E9A319" />
                    <span style={{ fontSize: 10, color: '#E9A319', fontWeight: 600 }}>Biométrie active</span>
                </div>
                <div onClick={() => setScreen('offline')} style={{ flex: 1, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 12, padding: '8px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <WifiOff size={14} color="#A5B4FC" />
                    <span style={{ fontSize: 10, color: '#A5B4FC', fontWeight: 600 }}>Mode hors-ligne</span>
                </div>
            </div>

            {/* Allocations */}
            {PORTFOLIO_DATA.slice(0, 3).map(p => (
                <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', flex: 1 }}>{p.label}</span>
                    <span style={{ fontSize: 11, fontVariantNumeric: 'tabular-nums', color: 'white', fontWeight: 600 }}>{p.pct}%</span>
                    <span style={{ fontSize: 10, color: p.change > 0 ? '#52B788' : p.change < 0 ? '#DC2626' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{p.change > 0 ? '+' : ''}{p.change}%</span>
                </div>
            ))}
        </div>
    );
}

function PortfolioScreen({ setScreen }) {
    return (
        <div style={{ padding: '8px 16px 16px', height: '100%', overflowY: 'auto', background: '#0a1000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#52B788', cursor: 'pointer', fontSize: 18 }}>←</button>
                <span style={{ fontWeight: 800, color: 'white', fontSize: 15 }}>Portefeuille</span>
            </div>
            {PORTFOLIO_DATA.map(p => (
                <div key={p.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 12, marginBottom: 8, borderLeft: `3px solid ${p.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>{p.label}</span>
                        <span style={{ fontSize: 12, color: p.change > 0 ? '#52B788' : p.change < 0 ? '#DC2626' : 'rgba(255,255,255,0.4)', fontWeight: 700 }}>{p.change > 0 ? '+' : ''}{p.change}%</span>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 16, color: p.color, marginBottom: 4 }}>{p.value.toLocaleString('fr-FR')} FCFA</div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                        <div style={{ height: '100%', width: `${p.pct}%`, background: p.color, borderRadius: 2 }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

function NotificationsScreen({ setScreen }) {
    return (
        <div style={{ padding: '8px 16px 16px', height: '100%', background: '#0a1000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#52B788', cursor: 'pointer', fontSize: 18 }}>←</button>
                <span style={{ fontWeight: 800, color: 'white', fontSize: 15 }}>Notifications</span>
            </div>
            {NOTIFICATIONS.map((n, i) => (
                <div key={i} style={{ background: n.unread ? 'rgba(82,183,136,0.08)' : 'rgba(255,255,255,0.04)', borderRadius: 14, padding: 12, marginBottom: 8, borderLeft: `3px solid ${n.type === 'success' ? '#52B788' : n.type === 'alert' ? '#E9A319' : 'rgba(255,255,255,0.2)'}`, display: 'flex', gap: 10 }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{n.icon}</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, color: n.unread ? 'white' : 'rgba(255,255,255,0.6)', lineHeight: 1.4, marginBottom: 3 }}>{n.text}</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{n.time}</div>
                    </div>
                    {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#52B788', flexShrink: 0, marginTop: 4 }} />}
                </div>
            ))}
        </div>
    );
}

function QRScreen({ setScreen }) {
    const [signed, setSigned] = useState(false);
    useEffect(() => { if (!signed) return; }, [signed]);
    return (
        <div style={{ padding: '8px 16px 24px', height: '100%', background: '#0a1000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, width: '100%' }}>
                <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#52B788', cursor: 'pointer', fontSize: 18 }}>←</button>
                <span style={{ fontWeight: 800, color: 'white', fontSize: 15 }}>QR Signature</span>
            </div>
            {!signed ? (
                <>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 16 }}>
                        Scannez ce QR pour signer<br />la proposition commerciale Sow
                    </div>
                    {/* QR Code simulé */}
                    <div style={{ width: 180, height: 180, background: 'white', borderRadius: 16, padding: 12, marginBottom: 16, display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 1 }}>
                        {Array.from({ length: 81 }).map((_, i) => {
                            const row = Math.floor(i / 9), col = i % 9;
                            const corner = (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);
                            const random = ((i * 37 + 13) % 7) < 4;
                            return <div key={i} style={{ background: corner || random ? '#000' : 'white', borderRadius: 1 }} />;
                        })}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>📄 Proposition Aminata Sow • 180 000 FCFA • Valide 24h</div>
                    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
                        <button onClick={() => setSigned(true)} style={{ flex: 1, background: 'linear-gradient(135deg, #2D6A4F, #52B788)', border: 'none', borderRadius: 12, padding: '12px', color: 'white', fontWeight: 800, cursor: 'pointer', fontSize: 13 }}>
                            ✓ Signer maintenant
                        </button>
                    </div>
                </>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 16 }}>
                    <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(82,183,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={36} color="#52B788" />
                    </div>
                    <div style={{ fontWeight: 800, color: 'white', fontSize: 16, textAlign: 'center' }}>Document signé !</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Horodatage blockchain : {new Date().toLocaleString('fr-FR')}</div>
                    <button onClick={() => { setSigned(false); setScreen('home'); }} style={{ background: 'rgba(82,183,136,0.15)', border: '1px solid rgba(82,183,136,0.3)', borderRadius: 12, padding: '10px 24px', color: '#52B788', fontWeight: 700, cursor: 'pointer' }}>Retour</button>
                </div>
            )}
        </div>
    );
}

function BiometricScreen({ setScreen }) {
    const [state, setState] = useState('idle');
    useEffect(() => {
        if (state === 'scanning') {
            setTimeout(() => setState('success'), 1500);
        }
    }, [state]);
    return (
        <div style={{ padding: '8px 16px 24px', height: '100%', background: '#0a1000', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, width: '100%' }}>
                <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#52B788', cursor: 'pointer', fontSize: 18 }}>←</button>
                <span style={{ fontWeight: 800, color: 'white', fontSize: 15 }}>Authentification biométrique</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <div style={{
                    width: 120, height: 120, borderRadius: '50%', border: `3px solid ${state === 'success' ? '#52B788' : state === 'scanning' ? '#E9A319' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: state === 'success' ? 'rgba(82,183,136,0.1)' : state === 'scanning' ? 'rgba(233,163,25,0.1)' : 'rgba(255,255,255,0.05)',
                    boxShadow: state === 'scanning' ? '0 0 30px rgba(233,163,25,0.3)' : state === 'success' ? '0 0 30px rgba(82,183,136,0.4)' : 'none',
                    transition: 'all 0.5s', cursor: 'pointer'
                }}
                    onClick={() => state === 'idle' && setState('scanning')}>
                    {state === 'success' ? <CheckCircle size={50} color="#52B788" /> : <Fingerprint size={50} color={state === 'scanning' ? '#E9A319' : 'rgba(255,255,255,0.4)'} />}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: 'white', fontSize: 15, marginBottom: 6 }}>
                        {state === 'idle' ? 'Touchez pour vous identifier' : state === 'scanning' ? 'Scan en cours...' : '✓ Identité vérifiée'}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Face ID • Empreinte • Ultra-rapide</div>
                </div>
                {state === 'idle' && (
                    <button onClick={() => setState('scanning')} style={{ background: 'linear-gradient(135deg, #2D6A4F, #52B788)', border: 'none', borderRadius: 14, padding: '12px 32px', color: 'white', fontWeight: 800, cursor: 'pointer', fontSize: 13 }}>
                        🖐️ Scanner mon empreinte
                    </button>
                )}
                {state === 'success' && (
                    <div style={{ width: '100%' }}>
                        <div style={{ background: 'rgba(82,183,136,0.1)', border: '1px solid rgba(82,183,136,0.3)', borderRadius: 14, padding: 12, textAlign: 'center', marginBottom: 10 }}>
                            <div style={{ fontSize: 11, color: '#52B788', fontWeight: 700 }}>Connexion simultanée à</div>
                            <div style={{ fontSize: 12, color: 'white', marginTop: 4 }}>Wave • Ecobank • Portefeuille KD</div>
                        </div>
                        <button onClick={() => setState('idle')} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 12 }}>Réinitialiser</button>
                    </div>
                )}
            </div>
        </div>
    );
}

function OfflineScreen({ setScreen }) {
    return (
        <div style={{ padding: '8px 16px 16px', height: '100%', background: '#0a1000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#52B788', cursor: 'pointer', fontSize: 18 }}>←</button>
                <span style={{ fontWeight: 800, color: 'white', fontSize: 15 }}>Mode hors-ligne</span>
                <div style={{ marginLeft: 'auto', padding: '2px 8px', background: 'rgba(99,102,241,0.2)', borderRadius: 8, fontSize: 10, color: '#A5B4FC', fontWeight: 700 }}>● ACTIF</div>
            </div>
            <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 16, padding: 12, marginBottom: 12, fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                📶 Aucune connexion internet détectée. Toutes les données ci-dessous sont issues du dernier cache (22/02 14h30).
            </div>
            {PORTFOLIO_DATA.map(p => (
                <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{p.label}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'white', fontVariantNumeric: 'tabular-nums' }}>{p.value.toLocaleString('fr-FR')} FCFA</div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>{p.pct}%</div>
                    </div>
                </div>
            ))}
            <div style={{ marginTop: 14, padding: 12, background: 'rgba(233,163,25,0.08)', borderRadius: 14, border: '1px solid rgba(233,163,25,0.2)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
                🔒 Données chiffrées AES-256 en cache local • Rapport PDF disponible hors-ligne • Synchronisation dès reconnexion
            </div>
        </div>
    );
}

export default function WealthPocket() {
    const [screen, setScreen] = useState('home');
    const [activeFeature, setActiveFeature] = useState('overview');

    const features = [
        { id: 'overview', emoji: '📱', label: 'Vue générale', desc: "Application équivalente aux meilleures néobanques mondiales" },
        { id: 'widget', emoji: '🖼️', label: 'Widget Écran', desc: "Valeur du portefeuille visible en direct sur l'écran d'accueil" },
        { id: 'biometric', emoji: '🖐️', label: 'Biométrie', desc: "Face ID & empreinte — connexion en 0,3 seconde" },
        { id: 'offline', emoji: '📶', label: 'Mode hors-ligne', desc: "Consultation complète sans internet — zones rurales" },
        { id: 'notifications', emoji: '🔔', label: 'Notifications IA', desc: "Alertes personnalisées intelligentes" },
        { id: 'qrcode', emoji: '📷', label: 'QR Signature', desc: "Signer un contrat en scannant un code" },
    ];

    const screenMap = { 'biometric': 'biometric', 'offline': 'offline', 'notifications': 'notifications', 'qrcode': 'qrcode' };

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #2D6A4F, #52B788)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(82,183,136,0.4)' }}>📱</div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Wealth Pocket — App Client Premium</h1>
                        <p style={{ marginBottom: 0 }}>Simulateur interactif de l'application mobile dédiée aux clients</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn-ghost"><Download size={14} /> APK Demo</button>
                    <button className="btn btn-primary">🚀 Publier sur App Store</button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 'var(--space-7)', alignItems: 'start' }}>
                {/* Feature selector */}
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
                        {features.map(f => (
                            <div key={f.id} className="card" style={{ cursor: 'pointer', borderLeft: activeFeature === f.id ? '4px solid var(--kd-success)' : '4px solid transparent', background: activeFeature === f.id ? 'rgba(82,183,136,0.05)' : 'var(--bg-secondary)' }}
                                onClick={() => { setActiveFeature(f.id); if (screenMap[f.id]) setScreen(screenMap[f.id]); else setScreen('home'); }}>
                                <div style={{ fontSize: 24, marginBottom: 'var(--space-2)' }}>{f.emoji}</div>
                                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{f.label}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>{f.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* Widget preview */}
                    <div className="card" style={{ background: 'rgba(82,183,136,0.03)', border: '1px solid rgba(82,183,136,0.2)' }}>
                        <div className="card-header"><h3>📲 Widget écran d'accueil iOS/Android</h3></div>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                            {/* Small widget */}
                            <div style={{ width: 130, height: 130, background: 'linear-gradient(135deg, #1a2a1b, #0d1a0e)', borderRadius: 24, padding: 14, border: '1px solid rgba(82,183,136,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', marginBottom: 4, textTransform: 'uppercase' }}>Wealth Pocket</div>
                                <div style={{ fontSize: 18, fontWeight: 900, color: '#52B788', lineHeight: 1.1 }}>8,48M<br />FCFA</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 6 }}>
                                    <TrendingUp size={10} color="#52B788" />
                                    <span style={{ fontSize: 10, color: '#52B788', fontWeight: 700 }}>+2,4%</span>
                                </div>
                            </div>
                            {/* Large widget */}
                            <div style={{ width: 280, height: 130, background: 'linear-gradient(135deg, #1a2a1b, #0d1a0e)', borderRadius: 24, padding: 14, border: '1px solid rgba(82,183,136,0.3)', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                    <div>
                                        <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Portfolio</div>
                                        <div style={{ fontSize: 20, fontWeight: 900, color: '#52B788' }}>8,48M FCFA</div>
                                        <div style={{ fontSize: 11, color: '#52B788', fontWeight: 700 }}>↑ +2,4% cette semaine</div>
                                    </div>
                                    <div style={{ fontSize: 20 }}>📊</div>
                                </div>
                                <svg width="240" height="40" viewBox="0 0 240 40">
                                    <polyline points="0,35 40,28 80,30 120,18 160,22 200,10 240,5" fill="none" stroke="#52B788" strokeWidth="2" />
                                    <polyline points="0,35 40,28 80,30 120,18 160,22 200,10 240,5 240,40 0,40" fill="rgba(82,183,136,0.15)" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Stats techniques */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                        {[['iOS & Android', '📱', '2 plateformes'], ['0,3s', '⚡', 'Connexion biométrique'], ['AES-256', '🔒', 'Chiffrement local'], ['100%', '📶', 'Fonctionnel hors-ligne']].map(([val, ico, lbl]) => (
                            <div key={lbl} style={{ textAlign: 'center', padding: 'var(--space-4)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)' }}>
                                <div style={{ fontSize: 22, marginBottom: 4 }}>{ico}</div>
                                <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--kd-success)', marginBottom: 2 }}>{val}</div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{lbl}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Phone simulator */}
                <div style={{ position: 'sticky', top: 20 }}>
                    <PhoneFrame screen={screen}>
                        {screen === 'home' && <HomeScreen setScreen={setScreen} />}
                        {screen === 'portfolio' && <PortfolioScreen setScreen={setScreen} />}
                        {screen === 'notifications' && <NotificationsScreen setScreen={setScreen} />}
                        {screen === 'qrcode' && <QRScreen setScreen={setScreen} />}
                        {screen === 'biometric' && <BiometricScreen setScreen={setScreen} />}
                        {screen === 'offline' && <OfflineScreen setScreen={setScreen} />}
                    </PhoneFrame>
                    <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>
                        ⬆ Simulateur interactif — cliquez sur les éléments
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                        {[['🏠', 'home'], ['📊', 'portfolio'], ['🔔', 'notifications'], ['📷', 'qrcode'], ['🖐️', 'biometric'], ['📶', 'offline']].map(([ico, s]) => (
                            <button key={s} onClick={() => setScreen(s)} style={{ padding: '4px 10px', borderRadius: 8, border: `1px solid ${screen === s ? 'rgba(82,183,136,0.6)' : 'rgba(255,255,255,0.1)'}`, background: screen === s ? 'rgba(82,183,136,0.1)' : 'transparent', color: 'white', cursor: 'pointer', fontSize: 14 }}>{ico}</button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
