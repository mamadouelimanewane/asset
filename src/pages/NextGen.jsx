import { useState } from 'react';
import {
    GraduationCap, Gamepad2, ShieldCheck, Users, Vote, BookOpen, LineChart, Target
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';
import { formatCurrency } from '../utils/helpers';

const NEXTGEN_ACHIEVEMENTS = [
    { id: 'MOD-1', module: 'Éducation Financière 101', score: 100, status: 'Complété', icon: <BookOpen size={16} /> },
    { id: 'MOD-2', module: 'Comprendre l\'Inflation (FCFA)', score: 85, status: 'Complété', icon: <LineChart size={16} /> },
    { id: 'MOD-3', module: 'Allocation d\'Actifs (Bourse)', score: 60, status: 'En cours', icon: <Target size={16} /> },
    { id: 'MOD-4', module: 'Gouvernance de la Holding', score: 0, status: 'Verrouillé', icon: <ShieldCheck size={16} /> },
];

const SIMULATOR_PERFORMANCE = [
    { month: 'M1', balance: 5000000, market: 5000000 },
    { month: 'M2', balance: 5250000, market: 4900000 },
    { month: 'M3', balance: 5100000, market: 5150000 },
    { month: 'M4', balance: 5600000, market: 5300000 },
];

const COUNCIL_VOTES = [
    { id: 'VOTE-01', subject: 'Cession de l\'actif "Villa Riviera Mall"', initiator: 'Moussa Ndiaye (Fondateur)', deadline: 'J-5', yes: 60, no: 0, pending: 40, status: 'Vote en cours' },
    { id: 'VOTE-02', subject: 'Donation de 50M FCFA Fdn. Santé', initiator: 'Ami Fall (Génération 2)', deadline: 'Clôturé', yes: 100, no: 0, pending: 0, status: 'Adopté' },
];

export default function NextGen() {
    const [activeTab, setActiveTab] = useState('academy');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #164e63, #083344)', border: '1px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
                        <GraduationCap size={22} color="#67e8f9" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>NextGen & Héritiers (Académie Familiale)</h1>
                        <p style={{ marginBottom: 0 }}>Transmission du patrimoine, éducation financière gamifiée et Conseil de Famille Virtuel.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #06b6d4', color: '#67e8f9' }}><Users size={14} style={{ marginRight: 6 }} /> Inviter un Héritier</button>
                    <button className="btn btn-primary" style={{ background: '#06b6d4', border: 'none', color: '#083344', fontWeight: 800 }}><Vote size={14} style={{ marginRight: 6 }} /> Lancer Résolution</button>
                </div>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card" style={{ borderLeft: '4px solid #06b6d4', background: 'rgba(6,182,212,0.05)' }}>
                    <div className="stat-icon" style={{ color: '#67e8f9' }}><GraduationCap size={20} /></div>
                    <div className="stat-value" style={{ color: '#cffafe' }}>Niveau 3</div>
                    <div className="stat-label">Grades Académie / Progression G2</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                    <div className="stat-icon"><Gamepad2 size={20} color="#3b82f6" /></div>
                    <div className="stat-value">5M FCFA</div>
                    <div className="stat-label">Poche "Junior Vault" (Papertrading)</div>
                </div>
                <div className="stat-card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <div className="stat-icon"><Vote size={20} color="#f59e0b" /></div>
                    <div className="stat-value">1</div>
                    <div className="stat-label">Résolution Active (Conseil de Famille)</div>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['academy', '📚 Académie Financière'], ['simulator', '🎮 Simulateur de Gestion'], ['council', '🏛️ Conseil de Famille']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'academy' && (
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><BookOpen size={18} /> Parcours de Transmission et Préparation (NextGen)</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Débloquez la gestion de comptes réels une fois les modules de certification atteints. Assurez la pérennité de la fortune familiale.</p>

                    <div className="grid-2">
                        {NEXTGEN_ACHIEVEMENTS.map(mod => (
                            <div key={mod.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 'var(--space-4)', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', opacity: mod.status === 'Verrouillé' ? 0.5 : 1 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: mod.score === 100 ? 'rgba(16,185,129,0.2)' : mod.score > 0 ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: mod.score === 100 ? '#10b981' : mod.score > 0 ? '#60a5fa' : 'var(--text-muted)' }}>
                                    {mod.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 4 }}>{mod.module}</div>
                                    <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, marginBottom: 4 }}>
                                        <div style={{ width: `${mod.score}%`, height: '100%', background: mod.score === 100 ? '#10b981' : '#3b82f6', borderRadius: 3 }}></div>
                                    </div>
                                    <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{mod.status}</span>
                                        <span style={{ fontWeight: 800 }}>{mod.score}%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'simulator' && (
                <div className="card">
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Gamepad2 size={18} color="#60a5fa" /> Simulateur de Gestion (Paper Trading)</h3>
                        <span className="badge badge-info">Solde Virtuel: +12.0%</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Apprentissage sans risque : l'héritier gère un portefeuille factice de 5M FCFA adossé au marché boursier en temps réel.</p>
                    <div style={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={SIMULATOR_PERFORMANCE}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 100000', 'dataMax + 100000']} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                                <Tooltip contentStyle={{ background: '#0a0e17', borderRadius: 8, border: '1px solid #06b6d4' }} />
                                <Area type="monotone" dataKey="market" name="S&P 500 (Benchmark)" stroke="var(--text-muted)" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                                <Area type="monotone" dataKey="balance" name="Solde Junior" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                        <button className="btn btn-primary" style={{ background: '#3b82f6', border: 'none' }}>Débloquer Argent Réel (Accès Fondateur)</button>
                    </div>
                </div>
            )}

            {activeTab === 'council' && (
                <div className="card" style={{ border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                    <div className="card-header">
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#f59e0b' }}><Vote size={18} /> Gouvernance & Conseil de Famille Virtuel</h3>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Engagez toute la famille sur les décisions critiques (fondations, vente d'actifs illiquides) en pondérant le droit de vote au statut (G1 vs G2).</p>

                    {COUNCIL_VOTES.map(vote => (
                        <div key={vote.id} style={{ display: 'flex', flexDirection: 'column', padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 8, marginBottom: 12, borderLeft: vote.status === 'Adopté' ? '3px solid #10b981' : '3px solid #f59e0b' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div style={{ fontWeight: 800, fontSize: 14, color: 'white' }}>{vote.subject}</div>
                                <span className={`badge ${vote.status === 'Adopté' ? 'badge-success' : 'badge-warning'}`}>{vote.status}</span>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>Initié par: <strong style={{ color: 'white' }}>{vote.initiator}</strong> • Délai: {vote.deadline}</div>

                            <div style={{ width: '100%', height: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 6, display: 'flex', overflow: 'hidden' }}>
                                <div style={{ width: `${vote.yes}%`, height: '100%', background: '#10b981' }}></div>
                                <div style={{ width: `${vote.no}%`, height: '100%', background: '#ef4444' }}></div>
                                <div style={{ width: `${vote.pending}%`, height: '100%', background: 'rgba(255,255,255,0.2)' }}></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginTop: 4 }}>
                                <span style={{ color: '#10b981' }}>POUR ({vote.yes}%)</span>
                                <span style={{ color: 'var(--text-muted)' }}>EN ATTENTE ({vote.pending}%)</span>
                                <span style={{ color: '#ef4444' }}>CONTRE ({vote.no}%)</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
