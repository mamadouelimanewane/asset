import { useState, useEffect } from 'react';
import { Shield, Eye, AlertTriangle, CheckCircle, Lock, Fingerprint, Zap, Activity, TrendingDown } from 'lucide-react';

// ── ZKP Identity ───────────────────────────────────────────────────────────
const ZKP_CREDENTIALS = [
    { id: 'ZKP01', type: 'Identité KYC', status: 'verified', issuer: 'CNIE Sénégal', hash: '0x3f9a...2e1d', date: '2024-01-15', zkpProof: 'zk-STARK-v2', level: 'Niveau 4 — KYC Avancé' },
    { id: 'ZKP02', type: 'Accréditation CREPMF', status: 'verified', issuer: 'CREPMF UEMOA', hash: '0x7b2c...4f8a', date: '2024-03-20', zkpProof: 'zk-SNARK', level: 'Investisseur qualifié' },
    { id: 'ZKP03', type: 'Résidence Sénégal', status: 'pending', issuer: 'Mairie Dakar', hash: null, date: null, zkpProof: null, level: 'En cours de vérification' },
    { id: 'ZKP04', type: 'Statut PEP*', status: 'clean', issuer: 'GIABA / FATF', hash: '0x1a5e...9c3b', date: '2024-06-01', zkpProof: 'zk-STARK-v2', level: 'Non-PEP confirmé' },
];

// ── Fraud Detection ────────────────────────────────────────────────────────
const FRAUD_ALERTS = [
    { id: 'FA01', severity: 'high', type: '🚨 Connexion géographique anormale', detail: 'Connexion depuis Lagos (Nigeria) — 3 200 km de la dernière session à Dakar. Bloqué automatiquement.', time: '22/02 08:14', status: 'blocked', riskScore: 92 },
    { id: 'FA02', severity: 'medium', type: '⚠️ Comportement inhabituel', detail: 'Tentative de virement de 5M FCFA à 03h22 — hors de vos habitudes (max. 500K FCFA la nuit).', time: '18/02 03:22', status: 'flagged', riskScore: 71 },
    { id: 'FA03', severity: 'low', type: '💡 Nouvelle signature biométrique', detail: 'Nouvelle empreinte digitale enregistrée depuis iPhone 15. Confirmée par OTP.', time: '15/02 11:45', status: 'cleared', riskScore: 12 },
];

const BEHAVIORAL_PATTERNS = [
    { pattern: 'Heure de connexion habituelle', value: '07h30 - 21h00', status: 'normal', icon: '🕐' },
    { pattern: 'Appareil principal', value: 'iPhone 15 Pro — Dakar', status: 'normal', icon: '📱' },
    { pattern: 'Virement moyen', value: '180 000 FCFA', status: 'normal', icon: '💸' },
    { pattern: 'Localisation fréquente', value: 'Dakar, Almadies, Plateau', status: 'normal', icon: '📍' },
    { pattern: 'Fréquence de consultation', value: '4x / jour', status: 'elevated', icon: '👁️' },
    { pattern: 'Délai moyen avant transaction', value: '8 minutes de réflexion', status: 'normal', icon: '⏱️' },
];

const SECURITY_SCORE = {
    global: 94,
    dimensions: [
        { label: 'Authentification', score: 98, color: '#52B788' },
        { label: 'Comportemental IA', score: 95, color: '#52B788' },
        { label: 'Chiffrement', score: 100, color: '#52B788' },
        { label: 'Géolocalisation', score: 87, color: '#E9A319' },
        { label: 'Conformité FATF', score: 100, color: '#52B788' },
        { label: 'Session management', score: 96, color: '#52B788' },
    ],
};

function RiskMeter({ score }) {
    const color = score >= 80 ? '#52B788' : score >= 50 ? '#E9A319' : '#F87171';
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }}>
                <div style={{ height: '100%', width: `${score}%`, background: color, borderRadius: 4, transition: 'width 1s' }} />
            </div>
            <span style={{ fontFamily: 'monospace', fontWeight: 800, color, fontSize: 13, width: 36 }}>{score}%</span>
        </div>
    );
}

export default function SecurityNext() {
    const [activeTab, setActiveTab] = useState('zkp');
    const [animScore, setAnimScore] = useState(0);
    useEffect(() => { const t = setTimeout(() => setAnimScore(SECURITY_SCORE.global), 500); return () => clearTimeout(t); }, []);

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1D4ED8, #7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(29,78,216,0.4)' }}>🔐</div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Sécurité & Confiance Next-Gen</h1>
                        <p style={{ marginBottom: 0 }}>Zero-Knowledge Proofs · IA Comportementale · Détection fraude temps réel · FATF</p>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <span className="badge badge-green" style={{ fontSize: 13, padding: '8px 16px' }}>🛡️ Score Sécurité : {animScore}/100</span>
                </div>
            </div>

            {/* Security Score Overview */}
            <div className="card" style={{ marginBottom: 'var(--space-5)', background: 'rgba(29,78,216,0.04)', border: '1px solid rgba(29,78,216,0.2)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', alignItems: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ position: 'relative', width: 120, height: 120, margin: '0 auto' }}>
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                                <circle cx="60" cy="60" r="50" stroke="#52B788" strokeWidth="8" fill="none" strokeLinecap="round"
                                    strokeDasharray={`${animScore * 3.14} 314`} strokeDashoffset="78"
                                    style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px', transition: 'stroke-dasharray 1.5s ease' }} />
                                <text x="60" y="60" textAnchor="middle" fill="#52B788" fontSize="24" fontWeight="900" dy="8">{animScore}</text>
                                <text x="60" y="78" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="9">/100</text>
                            </svg>
                        </div>
                        <div style={{ fontWeight: 800, color: 'var(--kd-success)', marginTop: 4 }}>Excellent</div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                            <span style={{ fontWeight: 700 }}>Dimensions de sécurité</span>
                            <span className="badge badge-green">6/6 actives</span>
                        </div>
                        {SECURITY_SCORE.dimensions.map(d => (
                            <div key={d.label} style={{ marginBottom: 'var(--space-2)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3, fontSize: 12 }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
                                </div>
                                <RiskMeter score={d.score} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['zkp', '🔑 ZKP Identity'], ['fraud', '🚨 Détection fraude IA'], ['behavioral', '🧠 Analyse comportementale']].map(([k, l]) => (
                    <button key={k} className={`tab ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>{l}</button>
                ))}
            </div>

            {/* ── ZKP ───────────────────────────────────────────────────── */}
            {activeTab === 'zkp' && (
                <div>
                    <div style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(29,78,216,0.06)', border: '1px solid rgba(29,78,216,0.2)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <Lock size={14} style={{ marginRight: 6, verticalAlign: 'middle', color: '#6366F1' }} />
                        <strong>Zero-Knowledge Proof (ZKP)</strong> — Votre identité est vérifiée cryptographiquement <em>sans divulguer vos données personnelles</em>. Vous prouvez que vous êtes qui vous dites être, sans jamais partager votre numéro CNI, date de naissance, ou adresse.
                    </div>
                    <div className="grid-2">
                        {ZKP_CREDENTIALS.map(cred => (
                            <div key={cred.id} className="card" style={{ borderLeft: `4px solid ${cred.status === 'verified' ? 'var(--kd-success)' : cred.status === 'clean' ? 'var(--kd-success)' : 'var(--kd-warning)'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 'var(--space-1)' }}>{cred.type}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Émis par : {cred.issuer}</div>
                                    </div>
                                    <span style={{
                                        fontSize: 10, padding: '3px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700,
                                        background: cred.status === 'verified' || cred.status === 'clean' ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)',
                                        color: cred.status === 'verified' || cred.status === 'clean' ? 'var(--kd-success)' : 'var(--kd-warning)',
                                    }}>{cred.status === 'verified' ? '✓ Vérifié' : cred.status === 'clean' ? '✓ Clean' : '⏳ En cours'}</span>
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--kd-success)', marginBottom: 4 }}>{cred.level}</div>
                                {cred.hash && (
                                    <>
                                        <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-primary)', padding: '4px 8px', borderRadius: 4, marginBottom: 4 }}>{cred.hash}</div>
                                        <div style={{ fontSize: 10, color: 'rgba(99,102,241,0.8)', fontWeight: 600 }}>🔑 Preuve : {cred.zkpProof}</div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── FRAUD ─────────────────────────────────────────────────── */}
            {activeTab === 'fraud' && (
                <div>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                        {[['🚨 Bloqué', 1, '#F87171'], ['⚠️ Signalé', 1, '#E9A319'], ['✅ Résolu', 1, '#52B788']].map(([label, count, color]) => (
                            <div key={label} style={{ flex: 1, textAlign: 'center', padding: 'var(--space-4)', background: `${color}10`, borderRadius: 'var(--radius-md)', border: `1px solid ${color}30` }}>
                                <div style={{ fontSize: 22, fontWeight: 900, color, fontFamily: 'monospace' }}>{count}</div>
                                <div style={{ fontSize: 11, fontWeight: 700, color }}>{label}</div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>30 derniers jours</div>
                            </div>
                        ))}
                    </div>
                    {FRAUD_ALERTS.map(alert => (
                        <div key={alert.id} className="card" style={{ marginBottom: 'var(--space-3)', borderLeft: `4px solid ${alert.severity === 'high' ? '#F87171' : alert.severity === 'medium' ? '#E9A319' : '#52B788'}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                                <div style={{ fontWeight: 700, fontSize: 13 }}>{alert.type}</div>
                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                    <span style={{ fontFamily: 'monospace', fontSize: 11, color: alert.severity === 'high' ? '#F87171' : alert.severity === 'medium' ? '#E9A319' : 'var(--text-muted)', fontWeight: 700 }}>Risque : {alert.riskScore}%</span>
                                    <span style={{
                                        fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 700,
                                        background: alert.status === 'blocked' ? 'rgba(239,68,68,0.1)' : alert.status === 'cleared' ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)',
                                        color: alert.status === 'blocked' ? '#F87171' : alert.status === 'cleared' ? 'var(--kd-success)' : '#E9A319',
                                    }}>{alert.status === 'blocked' ? '🔴 Bloqué' : alert.status === 'cleared' ? '✅ Résolu' : '⚠️ Signalé'}</span>
                                </div>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>{alert.detail}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{alert.time}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── BEHAVIORAL ────────────────────────────────────────────── */}
            {activeTab === 'behavioral' && (
                <div>
                    <div style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        🧠 <strong>Analyse comportementale IA</strong> — Koppar-Diambar modélise vos habitudes financières pour détecter toute déviation suspecte. Le modèle est entièrement local — vos données ne quittent jamais nos serveurs sécurisés en Europe.
                    </div>
                    <div className="grid-2">
                        {BEHAVIORAL_PATTERNS.map(p => (
                            <div key={p.pattern} className="card" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', borderLeft: `4px solid ${p.status === 'normal' ? 'var(--kd-success)' : 'var(--kd-warning)'}` }}>
                                <span style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>{p.pattern}</div>
                                    <div style={{ fontWeight: 700, fontSize: 13 }}>{p.value}</div>
                                </div>
                                <span style={{
                                    fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 700, flexShrink: 0,
                                    background: p.status === 'normal' ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)',
                                    color: p.status === 'normal' ? 'var(--kd-success)' : 'var(--kd-warning)',
                                }}>{p.status === 'normal' ? '✓ Normal' : '⚠ Élevé'}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
