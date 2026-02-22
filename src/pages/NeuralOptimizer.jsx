import { useState } from 'react';
import { Brain, Cpu, Zap, Activity, Target, Shield, ArrowRight, LineChart, TrendingUp, RefreshCcw } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function NeuralOptimizer() {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [optimized, setOptimized] = useState(false);

    const runOptimization = () => {
        setIsOptimizing(true);
        setProgress(0);
        setOptimized(false);

        let current = 0;
        const interval = setInterval(() => {
            current += 5;
            setProgress(current);
            if (current >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsOptimizing(false);
                    setOptimized(true);
                }, 500);
            }
        }, 100);
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg, #1e1b4b, #312e81)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(49,46,129,0.5)', color: '#818cf8' }}>
                        <Cpu size={24} />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                            Neural Portfolio Optimizer <span className="badge" style={{ background: 'rgba(129,140,248,0.1)', color: '#818cf8', borderColor: 'rgba(129,140,248,0.2)' }}>BETA</span>
                        </h1>
                        <p style={{ marginBottom: 0 }}>Optimisation d'allocation via Deep Learning & Modèle Black-Litterman</p>
                    </div>
                </div>
                <button className="btn btn-primary" onClick={runOptimization} disabled={isOptimizing}>
                    {isOptimizing ? <><RefreshCcw size={14} className="spin" /> Calcul Tensor en cours...</> : <><Zap size={14} /> Lancer l'Époque d'Entraînement</>}
                </button>
            </div>

            <div className="grid-2">
                <div className="card" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(129,140,248,0.1) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />
                    <div className="card-header" style={{ position: 'relative', zIndex: 1 }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Brain size={18} color="#818cf8" /> Réseau de Neurones & Inputs</h3>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, marginTop: 'var(--space-4)' }}>
                        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)', borderLeft: '3px solid #818cf8' }}>
                            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Variables Macro (UEMOA)</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13, fontWeight: 600 }}>
                                <span>Inflation BCEAO</span><span style={{ color: '#10B981' }}>Proj: 3.2% ↓</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 13, fontWeight: 600 }}>
                                <span>Croissance PIB Sénégal</span><span style={{ color: '#10B981' }}>8.8% ↑</span>
                            </div>
                        </div>

                        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-3)', borderLeft: '3px solid #6366f1' }}>
                            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Contraintes d'Investissement</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }}>
                                <span>Volatilité Maximale Tolérée</span><span style={{ fontWeight: 600 }}>12.5%</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 13 }}>
                                <span>Filtre ESG Carbone</span><span style={{ fontWeight: 600 }}>Activé</span>
                            </div>
                        </div>

                        <div style={{ padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #4f46e5' }}>
                            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Views (Sentiment IA)</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 13 }}>
                                <span>Surperformance Télécoms vs Bancaire</span><span style={{ fontWeight: 600, color: '#10B981' }}>+4.5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="card-header">
                        <h3>📈 Frontière Efficiente Modélisée (Markowitz)</h3>
                    </div>

                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 250, border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md)', background: '#0f172a', marginTop: 'var(--space-3)', overflow: 'hidden' }}>
                        {/* Grille */}
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={`h-${i}`} style={{ position: 'absolute', top: `${20 + i * 15}%`, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.05)' }} />
                        ))}
                        {[0, 1, 2, 3, 4].map(i => (
                            <div key={`v-${i}`} style={{ position: 'absolute', left: `${20 + i * 15}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.05)' }} />
                        ))}

                        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                            <path d="M 50 200 Q 150 100 350 50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
                            {optimized && (
                                <>
                                    <path d="M 50 200 Q 150 50 350 20" fill="none" stroke="#818cf8" strokeWidth="3" className="path-anim" />
                                    {/* Current Portfolio */}
                                    <circle cx="150" cy="180" r="6" fill="#ef4444" />
                                    <text x="160" y="185" fill="#ef4444" fontSize="10" fontWeight="bold">Allocation Actuelle</text>

                                    {/* Optimized Portfolio */}
                                    <circle cx="200" cy="90" r="8" fill="#10b981" />
                                    <circle cx="200" cy="90" r="16" fill="rgba(16,185,129,0.2)" className="pulse-anim" />
                                    <text x="215" y="95" fill="#10b981" fontSize="10" fontWeight="bold">Optimum Diambar AI</text>

                                    {/* Arrow connecting */}
                                    <path d="M 155 175 L 195 98" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" markerEnd="url(#arrow)" />
                                    <defs>
                                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                                            <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
                                        </marker>
                                    </defs>
                                </>
                            )}
                        </svg>

                        {!optimized && !isOptimizing && (
                            <div style={{ zIndex: 10, textAlign: 'center', color: 'var(--text-muted)' }}>
                                <Activity size={32} style={{ marginBottom: 12, opacity: 0.5 }} />
                                <p>En attente de paramètres de calcul</p>
                            </div>
                        )}

                        {isOptimizing && (
                            <div style={{ zIndex: 10, textAlign: 'center', width: '80%' }}>
                                <div style={{ fontSize: 13, color: '#818cf8', fontWeight: 700, marginBottom: 8 }}>Entraînement (Epoch {Math.floor(progress / 5)}/20)</div>
                                <div className="progress-bar" style={{ height: 8, background: 'rgba(129,140,248,0.2)' }}>
                                    <div className="progress-fill" style={{ width: `${progress}%`, background: '#818cf8', transition: 'width 0.1s linear' }} />
                                </div>
                            </div>
                        )}

                        <div style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', fontSize: 10, color: 'var(--text-muted)' }}>Risque (Volatilité)</div>
                        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', fontSize: 10, color: 'var(--text-muted)' }}>Rendement Espéré</div>
                    </div>
                </div>
            </div>

            {optimized && (
                <div className="fade-in" style={{ marginTop: 'var(--space-4)' }}>
                    <div className="card" style={{ border: '1px solid #10B981', background: 'rgba(16,185,129,0.02)' }}>
                        <div className="card-header">
                            <h3 style={{ color: '#10B981' }}>Résultat de l'Optimisation</h3>
                            <button className="btn btn-primary btn-sm">Appliquer l'Allocation (Auto-Rééquilibrage)</button>
                        </div>

                        <table className="data-table" style={{ marginTop: 'var(--space-3)' }}>
                            <thead>
                                <tr>
                                    <th>Classe d'Actifs</th>
                                    <th>Poids Actuel</th>
                                    <th>Objectif IA</th>
                                    <th>Delta</th>
                                    <th>Ordres (Estimation)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Actions (BRVM)</td><td>58.0%</td><td style={{ fontWeight: 800, color: '#10b981' }}>65.5%</td><td><span className="badge badge-green">+7.5%</span></td>
                                    <td style={{ color: 'var(--text-secondary)' }}>Achat SNTS (+2500)</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Obligations (UEMOA)</td><td>18.0%</td><td style={{ fontWeight: 800, color: '#ef4444' }}>12.0%</td><td><span className="badge badge-red">-6.0%</span></td>
                                    <td style={{ color: 'var(--text-secondary)' }}>Vente TPCI (+1500)</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Cash & Eq.</td><td>16.0%</td><td style={{ fontWeight: 800, color: '#ef4444' }}>10.0%</td><td><span className="badge badge-red">-6.0%</span></td>
                                    <td style={{ color: 'var(--text-secondary)' }}>Retrait USDC (1 FCFA2k)</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 600 }}>Alternatifs (RWA)</td><td>8.0%</td><td style={{ fontWeight: 800, color: '#10b981' }}>12.5%</td><td><span className="badge badge-green">+4.5%</span></td>
                                    <td style={{ color: 'var(--text-secondary)' }}>Invest. KD Real Estate</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="grid-3" style={{ marginTop: 'var(--space-4)' }}>
                            <div style={{ textAlign: 'center', padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Sharpe Actuel → Optimisé</div>
                                <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>1.15 <ArrowRight size={14} style={{ display: 'inline', color: 'var(--text-muted)' }} /> <span style={{ color: '#10B981' }}>1.85</span></div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Rendement Attendu</div>
                                <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>11.2% <ArrowRight size={14} style={{ display: 'inline', color: 'var(--text-muted)' }} /> <span style={{ color: '#10B981' }}>14.8%</span></div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Volatilité (Risque)</div>
                                <div style={{ fontSize: 20, fontWeight: 800, marginTop: 4 }}>10.5% <ArrowRight size={14} style={{ display: 'inline', color: 'var(--text-muted)' }} /> <span style={{ color: '#ef4444' }}>11.2%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        .spin { animation: spin 2s linear infinite; }
        .path-anim { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dash 2s ease-out forwards; }
        .pulse-anim { animation: pulse 2s infinite; }
        .fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes dash { to { stroke-dashoffset: 0; } }
        @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(0.95); opacity: 0.5; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
        </div>
    );
}
