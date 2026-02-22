import { useState } from 'react';
import { Zap, Search, RefreshCw } from 'lucide-react';
import { integrations } from '../data/mockData';
import { getStatusBadge } from '../utils/helpers';

export default function Integrations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCat, setFilterCat] = useState('Tous');

    const categories = ['Tous', ...new Set(integrations.map(i => i.category))];
    const filtered = integrations.filter(i => {
        const matchSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = filterCat === 'Tous' || i.category === filterCat;
        return matchSearch && matchCat;
    });

    const statusLabels = { 'Connected': 'Connecté', 'Available': 'Disponible' };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Intégrations</h1>
                    <p>25+ intégrations avec CRM, planification financière, comptabilité et plus</p>
                </div>
            </div>

            <div className="stat-grid">
                <div className="stat-card copper">
                    <div className="stat-icon"><Zap size={20} /></div>
                    <div className="stat-value">6</div>
                    <div className="stat-label">Connexions actives</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><RefreshCw size={20} /></div>
                    <div className="stat-value">25+</div>
                    <div className="stat-label">Intégrations disponibles</div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
                <div className="header-search" style={{ width: 300 }}>
                    <Search size={14} />
                    <input type="text" placeholder="Rechercher une intégration..."
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
                {filtered.map(integ => (
                    <div key={integ.id} className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 'var(--radius-md)',
                                background: 'var(--bg-tertiary)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', fontSize: 24,
                            }}>
                                {integ.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 600 }}>{integ.name}</h3>
                                <span className="tag" style={{ fontSize: 10 }}>{integ.category}</span>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: 'var(--space-3)', background: 'var(--bg-tertiary)',
                            borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-3)',
                        }}>
                            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>Statut</span>
                            <span className={`badge ${getStatusBadge(integ.status)}`}>{statusLabels[integ.status] || integ.status}</span>
                        </div>

                        {integ.lastSync && (
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>
                                Dernière synchro : {integ.lastSync}
                            </div>
                        )}

                        <button className={`btn btn-sm ${integ.status === 'Connected' ? 'btn-secondary' : 'btn-primary'}`}
                            style={{ width: '100%' }}>
                            {integ.status === 'Connected' ? 'Configurer' : 'Connecter'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
