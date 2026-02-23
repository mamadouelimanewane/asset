import { Link } from 'react-router-dom';
import {
    ShieldCheck, Sparkles, Activity, CheckCircle2, Quote, Cpu, FileSignature, Landmark, Target, Globe
} from 'lucide-react';

export default function Landing() {
    return (
        <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', width: '100%', fontFamily: 'var(--font-sans)', overflowX: 'hidden' }}>

            {/* HERO SECTION */}
            <section style={{ position: 'relative', paddingTop: '12rem', paddingBottom: '8rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', textAlign: 'center', overflow: 'hidden' }}>
                {/* Background Decor */}
                <div style={{ position: 'absolute', top: 0, right: 0, zIndex: 0, width: 800, height: 800, background: 'radial-gradient(circle, rgba(126, 184, 218, 0.15) 0%, transparent 60%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 0, width: 600, height: 600, background: 'radial-gradient(circle, rgba(200, 121, 65, 0.15) 0%, transparent 60%)', borderRadius: '50%', transform: 'translate(-30%, 30%)' }} />

                <div style={{ maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 9999, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: 11, fontWeight: 900, letterSpacing: 2, color: 'var(--kd-copper-light)', marginBottom: 32, textTransform: 'uppercase' }}>
                        <Sparkles size={14} />
                        L'Excellence Patrimoniale à l'Ère de l'IA
                    </div>
                    <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 0.9, marginBottom: 40, letterSpacing: '-0.02em' }}>
                        <span style={{ background: 'linear-gradient(to right, #FDE68A, var(--kd-copper-light), var(--kd-copper-dark))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            VOUS INVESTISSEZ,
                        </span><br />
                        NOUS STRUCTURONS.
                    </h1>
                    <p style={{ maxWidth: 800, margin: '0 auto', color: '#94a3b8', fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', fontWeight: 300, lineHeight: 1.6, marginBottom: 48 }}>
                        Concentrez-vous sur vos objectifs de vie. Koppar-Diambar gère votre portefeuille, votre structuration juridique, votre fiscalité et votre transmission internationale. Propulsé par l'Intelligence Artificielle.
                    </p>
                    <Link to="/dashboard" style={{ display: 'inline-block', backgroundColor: 'var(--kd-copper)', color: 'white', padding: '16px 40px', borderRadius: 12, fontSize: 18, fontWeight: 800, textDecoration: 'none', boxShadow: '0 10px 30px rgba(200, 121, 65, 0.3)' }}>
                        Ouvrir le Family Office
                    </Link>
                </div>
            </section>

            {/* PRODUCT PREVIEW SECTION */}
            <section style={{ padding: '3rem 1.5rem' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(126, 184, 218, 0.1)', filter: 'blur(100px)', zIndex: 0, borderRadius: '50%' }} />
                    <div style={{ borderRadius: 48, border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.5)', padding: '6rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, position: 'relative', zIndex: 10 }}>
                        <Landmark size={120} style={{ color: 'rgba(200, 121, 65, 0.3)', marginBottom: 32 }} />
                        <div style={{ fontSize: 24, fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: 6, textTransform: 'uppercase' }}>Koppar-Diambar Elite</div>
                    </div>
                </div>
            </section>

            {/* KEY MODULES SECTION */}
            <section style={{ padding: '8rem 1.5rem' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 80 }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: 24, letterSpacing: '-0.02em' }}>
                            Une Plateforme, <span style={{ color: 'var(--kd-copper)' }}>Zéro Compromis.</span>
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1.125rem', fontWeight: 300, maxWidth: 600, margin: '0 auto' }}>
                            Plus besoin de multiplier les logiciels. Koppar-Diambar centralise chaque aspect de la gestion UHNWI.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
                        {/* 1 */}
                        <div style={{ padding: 40, borderRadius: 48, backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                            <Target size={48} color="#10b981" style={{ marginBottom: 32 }} />
                            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Gestion Patrimoniale 360°</h3>
                            <p style={{ color: '#94a3b8', fontWeight: 300, lineHeight: 1.6, marginBottom: 24 }}>
                                Investissements globaux, Private Equity, Immobilier et liquidités. Un tableau de bord unique pour votre patrimoine mondial.
                            </p>
                            <ul style={{ marginTop: 'auto', listStyle: 'none', padding: 0, color: '#64748b', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Allocations Modélisées</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Suivi UEMOA & International</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Actifs Illiquides & Club Deals</li>
                            </ul>
                        </div>

                        {/* 2 */}
                        <div style={{ padding: 40, borderRadius: 48, backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                            <Cpu size={48} color="var(--kd-copper)" style={{ marginBottom: 32 }} />
                            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Intelligence Artificielle</h3>
                            <p style={{ color: '#94a3b8', fontWeight: 300, lineHeight: 1.6, marginBottom: 24 }}>
                                Copilote patrimonial et modélisation de la frontière efficiente. Diambar AI rééquilibre vos portefeuilles et surveille l'OHADA en temps réel.
                            </p>
                            <ul style={{ marginTop: 'auto', listStyle: 'none', padding: 0, color: '#64748b', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Neural Optimizer BETA</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Risque Comportemental IA</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Rapports Narratifs Auto</li>
                            </ul>
                        </div>

                        {/* 3 */}
                        <div style={{ padding: 40, borderRadius: 48, backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                            <ShieldCheck size={48} color="#7EB8DA" style={{ marginBottom: 32 }} />
                            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Family Office Ops</h3>
                            <p style={{ color: '#94a3b8', fontWeight: 300, lineHeight: 1.6, marginBottom: 24 }}>
                                Structuration notariale, planification successorale transfrontalière et gestion des risques réglementaires stricts (CREPMF/BCEAO).
                            </p>
                            <ul style={{ marginTop: 'auto', listStyle: 'none', padding: 0, color: '#64748b', fontSize: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Estate Planning & Succession</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Conformité AML/PEP</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}><CheckCircle2 size={16} color="var(--kd-copper)" /> Portail NextGen</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* IA & INTELLIGENCE SECTION */}
            <section style={{ padding: '6rem 1.5rem', backgroundColor: 'rgba(2, 6, 23, 0.5)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 80, alignItems: 'center' }}>
                    <div style={{ flex: '1 1 400px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 9999, backgroundColor: 'rgba(126, 184, 218, 0.1)', border: '1px solid rgba(126, 184, 218, 0.2)', fontSize: 10, fontWeight: 800, color: '#7EB8DA', marginBottom: 24, textTransform: 'uppercase', letterSpacing: 2 }}>
                            Futurisme Financier
                        </div>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 900, marginBottom: 32, lineHeight: 1 }}>
                            L'Intelligence Artificielle <br /> <span style={{ color: 'var(--kd-copper)' }}>votre Directeur Financier.</span>
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: '50%', backgroundColor: 'rgba(200, 121, 65, 0.1)', border: '1px solid rgba(200, 121, 65, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Cpu size={20} color="var(--kd-copper)" />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 800, marginBottom: 8 }}>Diambar Copilot</h4>
                                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Analyses de conformité instantanées, résumés de fonds et scénarisation économique pour guider vos choix d'investissement.</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: '50%', backgroundColor: 'rgba(126, 184, 218, 0.1)', border: '1px solid rgba(126, 184, 218, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FileSignature size={20} color="#7EB8DA" />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 800, marginBottom: 8 }}>Rééquilibrage Neuronal</h4>
                                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Optimisation continue des portefeuilles selon Modèle Black-Litterman couplé à une analyse de sentiment locale.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: '1 1 400px', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(200, 121, 65, 0.1)', filter: 'blur(120px)', borderRadius: '50%' }} />
                        <div style={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 48, padding: 48, position: 'relative', zIndex: 10, boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                                <Activity size={32} color="var(--kd-copper)" />
                                <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: -0.5 }}>Neural Monitor</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                                <div style={{ height: 8, width: '100%', backgroundColor: '#1e293b', borderRadius: 4, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', backgroundColor: 'var(--kd-copper)', width: '85%' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    <div style={{ padding: 16, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', fontWeight: 900, marginBottom: 4 }}>Surperformance</div>
                                        <div style={{ fontSize: 24, fontWeight: 900, color: 'white' }}>+2.4%</div>
                                    </div>
                                    <div style={{ padding: 16, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', fontWeight: 900, marginBottom: 4 }}>Risque Maîtrisé</div>
                                        <div style={{ fontSize: 24, fontWeight: 900, color: 'white' }}>99.8%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section style={{ padding: '6rem 1.5rem', backgroundColor: 'rgba(2, 6, 23, 0.3)' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
                        <div style={{ padding: 48, borderRadius: 56, backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                            <Quote size={48} style={{ color: 'rgba(126, 184, 218, 0.2)', position: 'absolute', top: 32, left: 32 }} />
                            <p style={{ fontSize: 20, color: '#e2e8f0', fontStyle: 'italic', fontWeight: 300, marginBottom: 32, position: 'relative', zIndex: 10 }}>
                                "Koppar-Diambar a transformé notre gestion de fortune. La consolidation de nos actifs immobiliers panafricains et de nos portefeuilles internationaux est enfin limpide."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(to top right, #3b82f6, #1d4ed8)' }} />
                                <div>
                                    <div style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>Famille Sylla</div>
                                    <div style={{ color: '#7EB8DA', fontSize: 14 }}>Private Equity & Real Estate</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: 48, borderRadius: 56, backgroundColor: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                            <Quote size={48} style={{ color: 'rgba(200, 121, 65, 0.2)', position: 'absolute', top: 32, left: 32 }} />
                            <p style={{ fontSize: 20, color: '#e2e8f0', fontStyle: 'italic', fontWeight: 300, marginBottom: 32, position: 'relative', zIndex: 10 }}>
                                "L'espace Family Office me permet de suivre les participations de nos sociétés. Le simulateur de succession a été révélateur pour nos héritiers."
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(to top right, var(--kd-copper), var(--kd-copper-dark))' }} />
                                <div>
                                    <div style={{ color: 'white', fontWeight: 800, fontSize: 18 }}>Groupe K. Ndiaye</div>
                                    <div style={{ color: 'var(--kd-copper)', fontSize: 14 }}>Investisseurs Institutionnels</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section style={{ padding: '8rem 1.5rem' }}>
                <div style={{ maxWidth: 896, margin: '0 auto', textAlign: 'center', padding: '5rem', borderRadius: 64, background: 'linear-gradient(to bottom right, #1e293b, #0f172a)', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: 256, height: 256, background: 'rgba(200, 121, 65, 0.1)', filter: 'blur(100px)', borderRadius: '50%', transform: 'translate(50%, -50%)' }} />
                    <div style={{ position: 'relative', zIndex: 10 }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 900, color: 'white', marginBottom: 32, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                            Construisons votre <span style={{ color: 'var(--kd-copper)' }}>Héritage.</span>
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '1.25rem', fontWeight: 300, marginBottom: 48, maxWidth: 600, margin: '0 auto 48px auto' }}>
                            Découvrez la plateforme la plus aboutie pour les Multi-Family Offices et la Gestion de Fortune en Afrique.
                        </p>
                        <Link to="/dashboard" style={{ display: 'inline-block', backgroundColor: 'var(--kd-copper)', color: 'white', padding: '20px 48px', borderRadius: 16, fontSize: 20, fontWeight: 900, textDecoration: 'none', boxShadow: '0 20px 40px rgba(200, 121, 65, 0.3)', transition: 'transform 0.2s' }}>
                            Accéder au Portail Elite
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
