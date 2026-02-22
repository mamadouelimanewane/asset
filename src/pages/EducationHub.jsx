import { useState } from 'react';
import {
    BookOpen, Play, FileText, HelpCircle, Search, Clock,
    Star, Award, ChevronRight, CheckCircle, Lock, TrendingUp,
    DollarSign, Shield, PieChart, BarChart3, Zap, Filter,
    Eye, Download, Share2, Globe
} from 'lucide-react';

/* ── Données du centre éducatif ── */
const courses = [
    {
        id: 'C01', title: 'Les fondamentaux de l\'investissement', category: 'Débutant',
        duration: '45 min', lessons: 6, completionRate: 100, rating: 4.8, enrolled: 142,
        icon: '📊', color: 'var(--kd-success)',
        description: 'Apprenez les bases : actions, obligations, fonds communs, ETF et diversification.',
        chapters: ['Qu\'est-ce qu\'un investissement ?', 'Actions vs Obligations', 'Les ETF expliqués', 'La diversification', 'Comprendre le risque', 'Votre premier portefeuille'],
    },
    {
        id: 'C02', title: 'Comprendre le risque et le rendement', category: 'Débutant',
        duration: '30 min', lessons: 4, completionRate: 75, rating: 4.6, enrolled: 98,
        icon: '⚖️', color: 'var(--kd-warning)',
        description: 'La relation entre risque et rendement, et comment trouver votre équilibre.',
        chapters: ['Le spectre du risque', 'Volatilité et écart-type', 'Votre profil de risque', 'Allocation stratégique'],
    },
    {
        id: 'C03', title: 'L\'intérêt composé : la 8ème merveille', category: 'Débutant',
        duration: '20 min', lessons: 3, completionRate: 60, rating: 4.9, enrolled: 156,
        icon: '🚀', color: 'var(--kd-copper-light)',
        description: 'Einstein l\'appelait la force la plus puissante de l\'univers. Découvrez pourquoi.',
        chapters: ['Intérêt simple vs composé', 'La règle des 72', 'Simulations pratiques'],
    },
    {
        id: 'C04', title: 'Optimisation fiscale pour investisseurs', category: 'Intermédiaire',
        duration: '60 min', lessons: 8, completionRate: 40, rating: 4.7, enrolled: 67,
        icon: '💰', color: 'var(--kd-diamond)',
        description: 'Tax-Loss Harvesting, comptes à avantage fiscal, et stratégies de report d\'impôt.',
        chapters: ['Comptes imposables vs différés', 'IRA et 401(k)', 'Tax-Loss Harvesting', 'Gains long terme vs court terme', 'Plans 529', 'Donations stratégiques', 'Fiducies et fiscalité', 'Planification annuelle'],
    },
    {
        id: 'C05', title: 'Planification de la retraite', category: 'Intermédiaire',
        duration: '50 min', lessons: 7, completionRate: 20, rating: 4.5, enrolled: 83,
        icon: '🏖️', color: 'var(--kd-info)',
        description: 'Déterminez votre « nombre magique » et construisez votre plan de retraite.',
        chapters: ['Combien faut-il épargner ?', 'Le taux de retrait sécurisé (4%)', 'Social Security', 'Medicare et santé', 'Stratégies de décumulation', 'Revenus passifs', 'Estate planning'],
    },
    {
        id: 'C06', title: 'Investissement ESG et impact', category: 'Avancé',
        duration: '40 min', lessons: 5, completionRate: 0, rating: 4.4, enrolled: 45,
        icon: '🌍', color: 'var(--kd-success)',
        description: 'Investir en alignement avec vos valeurs sans sacrifier le rendement.',
        chapters: ['Qu\'est-ce que l\'ESG ?', 'Critères E, S et G', 'Performance ESG vs traditionnelle', 'Fonds et ETF ESG', 'Mesurer l\'impact'],
    },
    {
        id: 'C07', title: 'Les marchés financiers africains', category: 'Avancé',
        duration: '55 min', lessons: 6, completionRate: 0, rating: 4.3, enrolled: 38,
        icon: '🌍', color: 'var(--kd-copper)',
        description: 'BRVM, NSE, JSE : opportunités et risques des marchés africains émergents.',
        chapters: ['La BRVM (UEMOA)', 'Le Nigeria Stock Exchange', 'Le Johannesburg Stock Exchange', 'Risque de change FCFA/USD', 'Réglementation OHADA', 'Stratégies d\'allocation Afrique'],
    },
];

const articles = [
    { id: 'A01', title: 'Pourquoi la diversification est votre meilleur ami', category: 'Stratégie', readTime: '5 min', date: '2025-02-20', views: 234, icon: '📰' },
    { id: 'A02', title: '5 erreurs que font les nouveaux investisseurs', category: 'Débutant', readTime: '4 min', date: '2025-02-18', views: 412, icon: '⚠️' },
    { id: 'A03', title: 'Comprendre les frais de gestion et leur impact', category: 'Frais', readTime: '6 min', date: '2025-02-15', views: 189, icon: '💵' },
    { id: 'A04', title: 'Le cash haut rendement : comment ça marche ?', category: 'Produits', readTime: '3 min', date: '2025-02-12', views: 567, icon: '🏦' },
    { id: 'A05', title: 'Résumé marché : les perspectives 2025', category: 'Marché', readTime: '8 min', date: '2025-02-10', views: 891, icon: '📈' },
    { id: 'A06', title: 'Transmission patrimoniale en Afrique de l\'Ouest', category: 'Succession', readTime: '7 min', date: '2025-02-05', views: 156, icon: '🏠' },
];

const quizzes = [
    { id: 'Q01', title: 'Évaluez vos connaissances financières', questions: 10, avgScore: 72, completions: 98, difficulty: 'Facile', icon: '🧠' },
    { id: 'Q02', title: 'Quiz : Risque et rendement', questions: 8, avgScore: 65, completions: 67, difficulty: 'Moyen', icon: '⚖️' },
    { id: 'Q03', title: 'Quiz : Fiscalité des investissements', questions: 12, avgScore: 58, completions: 45, difficulty: 'Difficile', icon: '💰' },
    { id: 'Q04', title: 'Quiz : Planification de la retraite', questions: 8, avgScore: 61, completions: 52, difficulty: 'Moyen', icon: '🏖️' },
];

const glossary = [
    { term: 'AUM', fr: 'Actifs sous gestion', en: 'Assets Under Management', wo: 'Alal yi ñu saytu', def: 'La valeur totale des investissements gérés par un conseiller financier pour le compte de ses clients.' },
    { term: 'ETF', fr: 'Fonds négocié en bourse', en: 'Exchange-Traded Fund', wo: 'Fonds bi ñu jaay ci Bourse', def: 'Un panier d\'actions ou d\'obligations que vous pouvez acheter comme une seule action. Offre une diversification instantanée à faible coût.' },
    { term: 'Diversification', fr: 'Diversification', en: 'Diversification', wo: 'Séddalé', def: 'Ne pas mettre tous ses œufs dans le même panier. Répartir ses investissements entre différentes classes d\'actifs, secteurs et régions géographiques.' },
    { term: 'TLH', fr: 'Récolte de pertes fiscales', en: 'Tax-Loss Harvesting', wo: 'Wàññi impôt', def: 'Stratégie consistant à vendre des positions en perte pour réduire sa facture fiscale, tout en maintenant la même exposition au marché.' },
    { term: 'Rééquilibrage', fr: 'Rééquilibrage', en: 'Rebalancing', wo: 'Yemale', def: 'Ramener un portefeuille à son allocation cible en vendant les actifs surpondérés et en achetant les sous-pondérés.' },
    { term: 'Rendement', fr: 'Rendement', en: 'Yield / Return', wo: 'Njëg', def: 'Le gain (ou la perte) d\'un investissement sur une période donnée, exprimé en pourcentage.' },
    { term: 'Obligation', fr: 'Obligation', en: 'Bond', wo: 'Krédi', def: 'Un prêt que vous faites à une entreprise ou un gouvernement, en échange d\'intérêts réguliers et du remboursement du capital à l\'échéance.' },
    { term: 'Volatilité', fr: 'Volatilité', en: 'Volatility', wo: 'Deñ-dëkk', def: 'La mesure de l\'amplitude des variations de prix d\'un actif. Plus la volatilité est élevée, plus le risque est important.' },
    { term: 'Allocation d\'actifs', fr: 'Allocation d\'actifs', en: 'Asset Allocation', wo: 'Séddalé alal', def: 'La répartition stratégique d\'un portefeuille entre les différentes classes d\'actifs (actions, obligations, immobilier, cash).' },
    { term: 'Fiducie', fr: 'Fiducie / Trust', en: 'Trust', wo: 'Fiducie', def: 'Structure juridique dans laquelle un fiduciaire gère des actifs pour le bénéfice de bénéficiaires désignés. Outil clé en planification successorale.' },
    { term: 'APY', fr: 'Rendement annuel en pourcentage', en: 'Annual Percentage Yield', wo: 'Njëg at', def: 'Le taux de rendement effectif d\'un placement sur un an, incluant les intérêts composés.' },
    { term: 'ACAT', fr: 'Transfert automatisé de compte', en: 'Automated Customer Account Transfer', wo: 'Wàcci kont', def: 'Système standardisé pour transférer des actifs d\'un courtier à un autre sans les vendre et les racheter.' },
];

export default function EducationHub() {
    const [activeTab, setActiveTab] = useState('courses');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [filterLevel, setFilterLevel] = useState('all');
    const [glossarySearch, setGlossarySearch] = useState('');

    const filteredCourses = courses.filter(c => {
        if (filterLevel !== 'all' && c.category !== filterLevel) return false;
        return c.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const filteredGlossary = glossary.filter(g =>
        g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        g.fr.toLowerCase().includes(glossarySearch.toLowerCase()) ||
        g.def.toLowerCase().includes(glossarySearch.toLowerCase())
    );

    const totalLessons = courses.reduce((s, c) => s + c.lessons, 0);
    const avgCompletion = Math.round(courses.reduce((s, c) => s + c.completionRate, 0) / courses.length);

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Centre éducatif</h1>
                    <p>Renforcez la culture financière de vos clients avec du contenu expert en français</p>
                </div>
                <div className="btn-group">
                    <button className="btn btn-primary">
                        <BookOpen size={14} /> Créer un contenu
                    </button>
                </div>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper">
                    <div className="stat-icon"><BookOpen size={20} /></div>
                    <div className="stat-value">{courses.length}</div>
                    <div className="stat-label">Cours disponibles</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><FileText size={20} /></div>
                    <div className="stat-value">{totalLessons}</div>
                    <div className="stat-label">Leçons au total</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><Award size={20} /></div>
                    <div className="stat-value">{avgCompletion}%</div>
                    <div className="stat-label">Complétion moyenne</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><Globe size={20} /></div>
                    <div className="stat-value">{glossary.length}</div>
                    <div className="stat-label">Termes du glossaire (FR/EN/WO)</div>
                </div>
            </div>

            {/* Onglets */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[
                    ['courses', '📚 Cours'], ['articles', '📰 Articles'],
                    ['quizzes', '🧠 Quiz'], ['glossary', '📖 Glossaire trilingue'],
                ].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {/* COURS */}
            {activeTab === 'courses' && (
                <div>
                    <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                        <div className="header-search" style={{ width: 280 }}>
                            <Search size={14} />
                            <input type="text" placeholder="Rechercher un cours..."
                                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {['all', 'Débutant', 'Intermédiaire', 'Avancé'].map(level => (
                                <button key={level}
                                    className={`btn btn-sm ${filterLevel === level ? 'btn-primary' : 'btn-ghost'}`}
                                    style={{ fontSize: 11 }}
                                    onClick={() => setFilterLevel(level)}
                                >{level === 'all' ? 'Tous' : level}</button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
                        {filteredCourses.map(course => (
                            <div key={course.id} className="card" style={{ cursor: 'pointer' }}
                                onClick={() => setSelectedCourse(course)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                    <div style={{ fontSize: 32 }}>{course.icon}</div>
                                    <span style={{
                                        fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600,
                                        background: course.category === 'Débutant' ? 'rgba(52,211,153,0.1)' : course.category === 'Intermédiaire' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                                        color: course.category === 'Débutant' ? 'var(--kd-success)' : course.category === 'Intermédiaire' ? 'var(--kd-warning)' : 'var(--kd-danger)',
                                    }}>{course.category}</span>
                                </div>
                                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{course.title}</h3>
                                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>
                                    {course.description}
                                </p>

                                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                                    <span><Clock size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />{course.duration}</span>
                                    <span><BookOpen size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />{course.lessons} leçons</span>
                                    <span><Star size={11} fill="var(--kd-warning)" style={{ color: 'var(--kd-warning)', marginRight: 3, verticalAlign: 'middle' }} />{course.rating}</span>
                                </div>

                                {/* Barre de progression */}
                                <div style={{ marginBottom: 8 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4 }}>
                                        <span style={{ color: 'var(--text-muted)' }}>Progression</span>
                                        <span style={{ fontWeight: 600, color: course.completionRate === 100 ? 'var(--kd-success)' : 'var(--kd-copper-light)' }}>
                                            {course.completionRate}%
                                        </span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{
                                            width: `${course.completionRate}%`,
                                            background: course.completionRate === 100 ? 'var(--kd-success)' : 'var(--kd-copper)',
                                        }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                                        {course.enrolled} inscrits
                                    </span>
                                    <button className="btn btn-primary btn-sm" style={{ fontSize: 11 }}>
                                        {course.completionRate === 100 ? 'Revoir' : course.completionRate > 0 ? 'Continuer' : 'Commencer'}
                                        <ChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ARTICLES */}
            {activeTab === 'articles' && (
                <div>
                    {articles.map(article => (
                        <div key={article.id} className="card" style={{
                            marginBottom: 'var(--space-3)', display: 'flex', gap: 'var(--space-4)',
                            alignItems: 'center', cursor: 'pointer',
                        }}>
                            <div style={{ fontSize: 36, flexShrink: 0 }}>{article.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', marginBottom: 4 }}>
                                    <span className="tag" style={{ fontSize: 10 }}>{article.category}</span>
                                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                                        {new Date(article.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{article.title}</h3>
                                <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 11, color: 'var(--text-muted)' }}>
                                    <span><Clock size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />{article.readTime}</span>
                                    <span><Eye size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />{article.views} vues</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                <button className="btn btn-ghost btn-sm"><Share2 size={14} /></button>
                                <button className="btn btn-primary btn-sm">Lire <ChevronRight size={12} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* QUIZ */}
            {activeTab === 'quizzes' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                    {quizzes.map(quiz => (
                        <div key={quiz.id} className="card" style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 42, marginBottom: 'var(--space-3)' }}>{quiz.icon}</div>
                            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{quiz.title}</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                                <span>{quiz.questions} questions</span>
                                <span>•</span>
                                <span style={{
                                    color: quiz.difficulty === 'Facile' ? 'var(--kd-success)' : quiz.difficulty === 'Moyen' ? 'var(--kd-warning)' : 'var(--kd-danger)',
                                    fontWeight: 600,
                                }}>{quiz.difficulty}</span>
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'space-around', marginBottom: 'var(--space-4)',
                                padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                            }}>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--kd-copper-light)' }}>{quiz.avgScore}%</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Score moyen</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: 18, fontWeight: 700 }}>{quiz.completions}</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Complétions</div>
                                </div>
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%' }}>
                                <HelpCircle size={14} /> Lancer le quiz
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* GLOSSAIRE TRILINGUE */}
            {activeTab === 'glossary' && (
                <div>
                    <div className="header-search" style={{ width: 320, marginBottom: 'var(--space-4)' }}>
                        <Search size={14} />
                        <input type="text" placeholder="Rechercher un terme (français, anglais, wolof)..."
                            value={glossarySearch} onChange={e => setGlossarySearch(e.target.value)} />
                    </div>

                    <div className="card">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Terme</th>
                                    <th>🇫🇷 Français</th>
                                    <th>🇬🇧 English</th>
                                    <th>🇸🇳 Wolof</th>
                                    <th>Définition</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredGlossary.map(g => (
                                    <tr key={g.term}>
                                        <td style={{ fontWeight: 700, color: 'var(--kd-copper-light)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                                            {g.term}
                                        </td>
                                        <td style={{ fontSize: 12 }}>{g.fr}</td>
                                        <td style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--text-secondary)' }}>{g.en}</td>
                                        <td style={{ fontSize: 12, color: 'var(--kd-diamond)' }}>{g.wo}</td>
                                        <td style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.4, maxWidth: 350 }}>{g.def}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal cours */}
            {selectedCourse && (
                <div className="modal-overlay" onClick={() => setSelectedCourse(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 550 }}>
                        <div className="modal-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <span style={{ fontSize: 32 }}>{selectedCourse.icon}</span>
                                <div>
                                    <h3>{selectedCourse.title}</h3>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                                        {selectedCourse.category} • {selectedCourse.duration} • {selectedCourse.lessons} leçons
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedCourse(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 'var(--space-4)' }}>
                                {selectedCourse.description}
                            </p>

                            <div style={{
                                display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)',
                                padding: 'var(--space-3)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)',
                            }}>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedCourse.enrolled}</div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Inscrits</div>
                                </div>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--kd-warning)' }}>
                                        <Star size={14} fill="var(--kd-warning)" style={{ verticalAlign: 'middle', marginRight: 4 }} />
                                        {selectedCourse.rating}
                                    </div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Note</div>
                                </div>
                                <div style={{ textAlign: 'center', flex: 1 }}>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: selectedCourse.completionRate === 100 ? 'var(--kd-success)' : 'var(--kd-copper-light)' }}>
                                        {selectedCourse.completionRate}%
                                    </div>
                                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Complété</div>
                                </div>
                            </div>

                            <h4 style={{ fontSize: 13, fontWeight: 600, marginBottom: 'var(--space-3)' }}>Programme du cours</h4>
                            {selectedCourse.chapters.map((ch, i) => {
                                const completed = i < Math.floor(selectedCourse.chapters.length * selectedCourse.completionRate / 100);
                                return (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                        padding: 'var(--space-2) var(--space-3)', marginBottom: 4,
                                        background: completed ? 'rgba(52,211,153,0.05)' : 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-primary)',
                                    }}>
                                        {completed
                                            ? <CheckCircle size={16} style={{ color: 'var(--kd-success)', flexShrink: 0 }} />
                                            : <Play size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                                        }
                                        <span style={{ fontSize: 12, color: completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                                            Chapitre {i + 1} : {ch}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedCourse(null)}>Fermer</button>
                            <button className="btn btn-primary">
                                <Play size={14} /> {selectedCourse.completionRate > 0 ? 'Reprendre' : 'Commencer le cours'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
