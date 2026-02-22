import { useState } from 'react';
import {
    Target, Plus, TrendingUp, DollarSign, Calendar, Clock,
    Home, GraduationCap, Palmtree, Plane, Heart, Car,
    Award, AlertTriangle, CheckCircle, Edit3, Trash2, Zap,
    ChevronRight, ArrowUpRight, BarChart3, PieChart
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const goalIcons = {
    retirement: { icon: Palmtree, emoji: '🏖️', label: 'Retraite', color: '#F59E0B' },
    education: { icon: GraduationCap, emoji: '🎓', label: 'Études', color: '#3B82F6' },
    house: { icon: Home, emoji: '🏠', label: 'Immobilier', color: '#10B981' },
    travel: { icon: Plane, emoji: '✈️', label: 'Voyage', color: '#8B5CF6' },
    car: { icon: Car, emoji: '🚗', label: 'Véhicule', color: '#EC4899' },
    legacy: { icon: Heart, emoji: '💝', label: 'Legs', color: '#C87941' },
    emergency: { icon: AlertTriangle, emoji: '🛡️', label: 'Urgence', color: '#EF4444' },
    custom: { icon: Target, emoji: '🎯', label: 'Personnalisé', color: '#7EB8DA' },
};

const mockGoals = [
    {
        id: 'G001', clientName: 'Ousmane N\'Diaye', type: 'retirement',
        title: 'Retraite à 60 ans', targetAmount: 4_000_000, currentAmount: 2_650_000,
        targetDate: '2038-11-15', monthlyContrib: 5_000, expectedReturn: 7.5,
        priority: 'Haute', confidenceScore: 87,
        milestones: [
            { amount: 500_000, reached: true, date: '2018-06-01' },
            { amount: 1_000_000, reached: true, date: '2020-09-15' },
            { amount: 2_000_000, reached: true, date: '2023-03-01' },
            { amount: 3_000_000, reached: false, date: null },
            { amount: 4_000_000, reached: false, date: null },
        ],
        aiAdvice: 'Avec votre rythme actuel, vous atteindrez votre objectif avec 87% de probabilité. Pour atteindre 95%, augmentez les versements mensuels de 800 FCFA (5 000 → 5 800 FCFA).',
    },
    {
        id: 'G002', clientName: 'Ousmane N\'Diaye', type: 'education',
        title: 'Études d\'Amadou — MIT', targetAmount: 300_000, currentAmount: 85_000,
        targetDate: '2027-09-01', monthlyContrib: 2_500, expectedReturn: 6.0,
        priority: 'Haute', confidenceScore: 62,
        milestones: [
            { amount: 50_000, reached: true, date: '2023-01-15' },
            { amount: 100_000, reached: false, date: null },
            { amount: 200_000, reached: false, date: null },
            { amount: 300_000, reached: false, date: null },
        ],
        aiAdvice: '⚠️ Confiance à 62% seulement. Le délai est court (2,5 ans). Recommandation : augmenter à 4 200 FCFA/mois OU envisager une bourse partielle pour réduire l\'objectif à 200K FCFA.',
    },
    {
        id: 'G003', clientName: 'Aminata Sow', type: 'house',
        title: 'Résidence secondaire à Saly', targetAmount: 500_000, currentAmount: 120_000,
        targetDate: '2028-06-01', monthlyContrib: 3_000, expectedReturn: 5.5,
        priority: 'Moyenne', confidenceScore: 55,
        milestones: [
            { amount: 100_000, reached: true, date: '2024-11-01' },
            { amount: 250_000, reached: false, date: null },
            { amount: 500_000, reached: false, date: null },
        ],
        aiAdvice: 'Confiance à 55%. Deux options : (1) allonger l\'horizon à 2030 (+18 mois) pour atteindre 78% de confiance, ou (2) augmenter les versements à 4 500 FCFA/mois.',
    },
    {
        id: 'G004', clientName: 'Cheikh K. Ba', type: 'retirement',
        title: 'Indépendance financière à 55 ans', targetAmount: 3_000_000, currentAmount: 1_850_000,
        targetDate: '2035-02-14', monthlyContrib: 4_000, expectedReturn: 8.0,
        priority: 'Haute', confidenceScore: 91,
        milestones: [
            { amount: 500_000, reached: true, date: '2019-05-01' },
            { amount: 1_000_000, reached: true, date: '2021-08-15' },
            { amount: 1_500_000, reached: true, date: '2024-01-10' },
            { amount: 2_000_000, reached: false, date: null },
            { amount: 3_000_000, reached: false, date: null },
        ],
        aiAdvice: 'Excellente trajectoire ! 91% de confiance. Vous pourriez même atteindre l\'objectif avec 1 an d\'avance si le marché maintient sa performance actuelle.',
    },
    {
        id: 'G005', clientName: 'Cheikh K. Ba', type: 'education',
        title: 'Études d\'Omar — Université', targetAmount: 200_000, currentAmount: 25_000,
        targetDate: '2033-09-01', monthlyContrib: 800, expectedReturn: 6.5,
        priority: 'Moyenne', confidenceScore: 74,
        milestones: [
            { amount: 50_000, reached: false, date: null },
            { amount: 100_000, reached: false, date: null },
            { amount: 200_000, reached: false, date: null },
        ],
        aiAdvice: 'Omar n\'a que 10 ans, vous avez du temps. À 800 FCFA/mois avec un rendement de 6,5%, vous atteindrez 196K FCFA — très proche de l\'objectif. Augmenter à 850 FCFA garantirait le succès.',
    },
    {
        id: 'G006', clientName: 'Aminata Sow', type: 'travel',
        title: 'Tour du monde en famille', targetAmount: 60_000, currentAmount: 42_000,
        targetDate: '2026-07-01', monthlyContrib: 1_200, expectedReturn: 3.0,
        priority: 'Basse', confidenceScore: 95,
        milestones: [
            { amount: 20_000, reached: true, date: '2024-06-01' },
            { amount: 40_000, reached: true, date: '2025-01-15' },
            { amount: 60_000, reached: false, date: null },
        ],
        aiAdvice: '✅ En excellente voie ! 95% de confiance. Au rythme actuel, l\'objectif sera atteint 2 mois avant la date cible.',
    },
    {
        id: 'G007', clientName: 'Fondation Modou Gueye', type: 'legacy',
        title: 'Dotation perpétuelle', targetAmount: 50_000_000, currentAmount: 35_000_000,
        targetDate: '2030-12-31', monthlyContrib: 150_000, expectedReturn: 7.0,
        priority: 'Haute', confidenceScore: 82,
        milestones: [
            { amount: 10_000_000, reached: true, date: '2018-01-01' },
            { amount: 20_000_000, reached: true, date: '2020-06-01' },
            { amount: 30_000_000, reached: true, date: '2023-09-01' },
            { amount: 40_000_000, reached: false, date: null },
            { amount: 50_000_000, reached: false, date: null },
        ],
        aiAdvice: 'La fondation progresse bien vers la dotation perpétuelle. À 82%, le potentiel de croissance organique des actifs existants soutient fortement l\'objectif.',
    },
];

function ConfidenceGauge({ score, size = 120 }) {
    const radius = (size - 16) / 2;
    const circumference = Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score >= 80 ? 'var(--kd-success)' : score >= 60 ? 'var(--kd-warning)' : 'var(--kd-danger)';

    return (
        <div style={{ position: 'relative', width: size, height: size / 2 + 20, margin: '0 auto' }}>
            <svg width={size} height={size / 2 + 10} style={{ overflow: 'visible' }}>
                <path d={`M 8 FCFA{size / 2} A ${radius} ${radius} 0 0 1 FCFA{size - 8} ${size / 2}`}
                    fill="none" stroke="var(--bg-tertiary)" strokeWidth={8} strokeLinecap="round" />
                <path d={`M 8 FCFA{size / 2} A ${radius} ${radius} 0 0 1 FCFA{size - 8} ${size / 2}`}
                    fill="none" stroke={color} strokeWidth={8} strokeLinecap="round"
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    style={{ transition: 'stroke-dashoffset 1s ease' }} />
            </svg>
            <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: size / 4, fontWeight: 800, color }}>{score}%</div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>confiance</div>
            </div>
        </div>
    );
}

function ProgressTimeline({ milestones, currentAmount }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 'var(--space-2)' }}>
            {milestones.map((m, i) => {
                const pct = Math.min(100, (currentAmount / m.amount) * 100);
                return (
                    <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                            background: m.reached ? 'var(--kd-success)' : pct > 80 ? 'var(--kd-warning)' : 'var(--bg-tertiary)',
                            border: `2px solid ${m.reached ? 'var(--kd-success)' : 'var(--border-secondary)'}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {m.reached && <CheckCircle size={10} style={{ color: 'white' }} />}
                        </div>
                        {i < milestones.length - 1 && (
                            <div style={{
                                flex: 1, height: 3, background: 'var(--bg-tertiary)', margin: '0 2px',
                            }}>
                                <div style={{
                                    height: '100%', background: m.reached ? 'var(--kd-success)' : 'var(--border-secondary)',
                                    width: m.reached ? '100%' : '0%',
                                }} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function GoalsPlanning() {
    const [goals, setGoals] = useState(mockGoals);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const [filterClient, setFilterClient] = useState('all');
    const [filterType, setFilterType] = useState('all');

    const uniqueClients = [...new Set(goals.map(g => g.clientName))];
    const totalTarget = goals.reduce((s, g) => s + g.targetAmount, 0);
    const totalCurrent = goals.reduce((s, g) => s + g.currentAmount, 0);
    const avgConfidence = Math.round(goals.reduce((s, g) => s + g.confidenceScore, 0) / goals.length);
    const onTrack = goals.filter(g => g.confidenceScore >= 75).length;

    const filtered = goals
        .filter(g => filterClient === 'all' || g.clientName === filterClient)
        .filter(g => filterType === 'all' || g.type === filterType);

    const yearsLeft = (dateStr) => {
        const diff = new Date(dateStr) - Date.now();
        const y = Math.floor(diff / (365.25 * 24 * 3600 * 1000));
        const m = Math.floor((diff % (365.25 * 24 * 3600 * 1000)) / (30.44 * 24 * 3600 * 1000));
        if (y > 0) return `${y} an${y > 1 ? 's' : ''} ${m}m`;
        return `${m} mois`;
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Objectifs de vie</h1>
                    <p>Investissement basé sur les objectifs — suivez la progression vers chaque jalon</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={14} /> Nouvel objectif
                </button>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper">
                    <div className="stat-icon"><Target size={20} /></div>
                    <div className="stat-value">{goals.length}</div>
                    <div className="stat-label">Objectifs actifs</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><DollarSign size={20} /></div>
                    <div className="stat-value">{formatCurrency(totalCurrent, true)}</div>
                    <div className="stat-label">Épargne cumulée ({Math.round(totalCurrent / totalTarget * 100)}%)</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-value">{avgConfidence}%</div>
                    <div className="stat-label">Confiance moyenne</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><CheckCircle size={20} /></div>
                    <div className="stat-value">{onTrack}/{goals.length}</div>
                    <div className="stat-label">En bonne voie (≥75%)</div>
                </div>
            </div>

            {/* Filtres */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                    <button className={`btn btn-sm ${filterClient === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ fontSize: 11 }} onClick={() => setFilterClient('all')}>Tous les clients</button>
                    {uniqueClients.map(c => (
                        <button key={c} className={`btn btn-sm ${filterClient === c ? 'btn-primary' : 'btn-ghost'}`}
                            style={{ fontSize: 11 }} onClick={() => setFilterClient(c)}>{c.split(' ')[0]}</button>
                    ))}
                </div>
                <span style={{ color: 'var(--border-secondary)' }}>|</span>
                <div style={{ display: 'flex', gap: 4 }}>
                    <button className={`btn btn-sm ${filterType === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ fontSize: 11 }} onClick={() => setFilterType('all')}>Tous</button>
                    {Object.entries(goalIcons).filter(([k]) => goals.some(g => g.type === k)).map(([k, v]) => (
                        <button key={k} className={`btn btn-sm ${filterType === k ? 'btn-primary' : 'btn-ghost'}`}
                            style={{ fontSize: 11 }} onClick={() => setFilterType(k)}>{v.emoji} {v.label}</button>
                    ))}
                </div>
            </div>

            {/* Grille des objectifs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 'var(--space-4)' }}>
                {filtered.map(goal => {
                    const gi = goalIcons[goal.type];
                    const pct = Math.round(goal.currentAmount / goal.targetAmount * 100);
                    return (
                        <div key={goal.id} className="card" style={{ cursor: 'pointer', borderLeft: `4px solid ${gi.color}` }}
                            onClick={() => setSelectedGoal(goal)}>
                            {/* Header */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <span style={{ fontSize: 24 }}>{gi.emoji}</span>
                                    <div>
                                        <h3 style={{ fontSize: 14, fontWeight: 600 }}>{goal.title}</h3>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{goal.clientName}</div>
                                    </div>
                                </div>
                                <span style={{
                                    fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600,
                                    background: goal.priority === 'Haute' ? 'rgba(239,68,68,0.1)' : goal.priority === 'Moyenne' ? 'rgba(245,158,11,0.1)' : 'rgba(126,184,218,0.1)',
                                    color: goal.priority === 'Haute' ? 'var(--kd-danger)' : goal.priority === 'Moyenne' ? 'var(--kd-warning)' : 'var(--kd-info)',
                                }}>{goal.priority}</span>
                            </div>

                            {/* Jauge de confiance */}
                            <ConfidenceGauge score={goal.confidenceScore} size={110} />

                            {/* Montants */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: 'var(--space-3) 0 var(--space-2)' }}>
                                <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--kd-copper-light)' }}>
                                    {formatCurrency(goal.currentAmount, true)}
                                </span>
                                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                                    / {formatCurrency(goal.targetAmount, true)}
                                </span>
                            </div>

                            {/* Barre de progression */}
                            <div className="progress-bar" style={{ height: 8, marginBottom: 'var(--space-2)' }}>
                                <div className="progress-fill" style={{
                                    width: `${pct}%`,
                                    background: `linear-gradient(90deg, ${gi.color}CC, ${gi.color})`,
                                }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                                <span>{pct}% atteint</span>
                                <span>{formatCurrency(goal.targetAmount - goal.currentAmount, true)} restant</span>
                            </div>

                            {/* Jalons */}
                            <ProgressTimeline milestones={goal.milestones} currentAmount={goal.currentAmount} />

                            {/* Infos complémentaires */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-3)', fontSize: 11, color: 'var(--text-muted)' }}>
                                <span><Calendar size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />{yearsLeft(goal.targetDate)}</span>
                                <span><DollarSign size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />{formatCurrency(goal.monthlyContrib)}/mois</span>
                                <span><TrendingUp size={10} style={{ marginRight: 3, verticalAlign: 'middle' }} />{goal.expectedReturn}%/an</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal détail */}
            {selectedGoal && (
                <div className="modal-overlay" onClick={() => setSelectedGoal(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 580 }}>
                        <div className="modal-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <span style={{ fontSize: 32 }}>{goalIcons[selectedGoal.type].emoji}</span>
                                <div>
                                    <h3>{selectedGoal.title}</h3>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{selectedGoal.clientName}</div>
                                </div>
                            </div>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedGoal(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <ConfidenceGauge score={selectedGoal.confidenceScore} size={160} />

                            <div className="grid-2" style={{ gap: 'var(--space-3)', margin: 'var(--space-4) 0' }}>
                                {[
                                    ['Objectif', formatCurrency(selectedGoal.targetAmount)],
                                    ['Accumulé', formatCurrency(selectedGoal.currentAmount)],
                                    ['Restant', formatCurrency(selectedGoal.targetAmount - selectedGoal.currentAmount)],
                                    ['Progression', `${Math.round(selectedGoal.currentAmount / selectedGoal.targetAmount * 100)}%`],
                                    ['Versement mensuel', formatCurrency(selectedGoal.monthlyContrib)],
                                    ['Rendement attendu', `${selectedGoal.expectedReturn}%/an`],
                                    ['Date cible', new Date(selectedGoal.targetDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })],
                                    ['Temps restant', yearsLeft(selectedGoal.targetDate)],
                                ].map(([label, value]) => (
                                    <div key={label} style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</div>
                                        <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Jalons détaillés */}
                            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-3)' }}>Jalons</h4>
                            {selectedGoal.milestones.map((m, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                    padding: 'var(--space-2) var(--space-3)', marginBottom: 4,
                                    background: m.reached ? 'rgba(52,211,153,0.05)' : 'var(--bg-secondary)',
                                    borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)',
                                }}>
                                    {m.reached
                                        ? <CheckCircle size={16} style={{ color: 'var(--kd-success)', flexShrink: 0 }} />
                                        : <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border-secondary)', flexShrink: 0 }} />
                                    }
                                    <div style={{ flex: 1, fontSize: 12 }}>
                                        <span style={{ fontWeight: 600 }}>{formatCurrency(m.amount)}</span>
                                        {m.reached && m.date && (
                                            <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>
                                                Atteint le {new Date(m.date).toLocaleDateString('fr-FR')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Conseil IA */}
                            <div style={{
                                marginTop: 'var(--space-4)', padding: 'var(--space-4)',
                                background: 'rgba(200,121,65,0.05)', borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(200,121,65,0.2)',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                                    <Zap size={14} style={{ color: 'var(--kd-copper)' }} />
                                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--kd-copper-light)' }}>Recommandation Diambar AI</span>
                                </div>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                    {selectedGoal.aiAdvice}
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedGoal(null)}>Fermer</button>
                            <div className="btn-group">
                                <button className="btn btn-secondary btn-sm"><Edit3 size={13} /> Modifier</button>
                                <button className="btn btn-primary btn-sm"><TrendingUp size={13} /> Simuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
