import { useState } from 'react';
import { Search, Star, TrendingUp, DollarSign, Users } from 'lucide-react';
import { marketplaceModels } from '../data/mockData';
import { formatPercent } from '../utils/helpers';

export default function ModelMarketplace() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCat, setFilterCat] = useState('Tous');

    const categories = ['Tous', ...new Set(marketplaceModels.map(m => m.category))];
    const filtered = marketplaceModels.filter(m => {
        const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.provider.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = filterCat === 'Tous' || m.category === filterCat;
        return matchSearch && matchCat;
    });

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Place de marché</h1>
                    <p>500+ modèles gérés professionnellement — jusqu'à 3x moins cher que les TAMP classiques</p>
                </div>
            </div>

            <div className="stat-grid">
                <div className="stat-card copper">
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-value">500+</div>
                    <div className="stat-label">Modèles disponibles</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><DollarSign size={20} /></div>
                    <div className="stat-value">0,03%</div>
                    <div className="stat-label">Frais à partir de</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><Users size={20} /></div>
                    <div className="stat-value">10K+</div>
                    <div className="stat-label">Abonnés au total</div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
                <div className="header-search" style={{ width: 300 }}>
                    <Search size={14} />
                    <input type="text" placeholder="Rechercher des modèles ou fournisseurs..."
                        value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                {categories.map(cat => (
                    <button key={cat}
                        className={`btn btn-sm ${filterCat === cat ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilterCat(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid-3">
                {filtered.map(model => (
                    <div key={model.id} className="card" style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <span className="badge badge-diamond">{model.category}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--kd-warning)' }}>
                                <Star size={12} fill="var(--kd-warning)" />
                                <span style={{ fontSize: 12, fontWeight: 600 }}>{model.rating}</span>
                            </div>
                        </div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, margin: 'var(--space-3) 0 var(--space-1)' }}>{model.name}</h3>
                        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>par {model.provider}</p>

                        <div style={{
                            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)',
                            padding: 'var(--space-3)', background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)',
                        }}>
                            <div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: model.ytdReturn >= 0 ? 'var(--kd-success)' : 'var(--kd-danger)' }}>
                                    {formatPercent(model.ytdReturn)}
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Rend. YTD</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--kd-copper-light)' }}>
                                    {model.fee}%
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Frais annuels</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>
                                    {(model.minInvestment / 1000).toFixed(0)}K $
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Investissement min.</div>
                            </div>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>
                                    {model.subscribers.toLocaleString('fr-FR')}
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Abonnés</div>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: 'var(--space-3)' }}>
                            S'abonner au modèle
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
