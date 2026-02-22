import { useState } from 'react';
import { Calculator, TrendingDown, Scan, RefreshCw, BarChart3 } from 'lucide-react';
import {
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { taxHarvestingData, taxSavingsSummary } from '../data/mockData';
import { formatCurrency, formatDate, getStatusBadge } from '../utils/helpers';

const monthlyTLH = [
    { month: 'Sept', harvested: 4200 },
    { month: 'Oct', harvested: 8100 },
    { month: 'Nov', harvested: 6300 },
    { month: 'Déc', harvested: 12400 },
    { month: 'Jan', harvested: 8800 },
    { month: 'Fév', harvested: 12020 },
];

export default function TaxManagement() {
    const [activeTab, setActiveTab] = useState('overview');

    const statusLabels = { 'Completed': 'Terminé', 'Pending Review': 'En révision' };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Gestion fiscale</h1>
                    <p>Récolte de pertes automatisée, rééquilibrage fiscal et rapports</p>
                </div>
                <button className="btn btn-primary">
                    <Scan size={14} /> Lancer un scan TLH
                </button>
            </div>

            <div className="stat-grid">
                <div className="stat-card copper">
                    <div className="stat-icon"><TrendingDown size={20} /></div>
                    <div className="stat-value">{formatCurrency(taxSavingsSummary.totalHarvested, true)}</div>
                    <div className="stat-label">Pertes récoltées (YTD)</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><Calculator size={20} /></div>
                    <div className="stat-value">{formatCurrency(taxSavingsSummary.estimatedSavings, true)}</div>
                    <div className="stat-label">Économies fiscales estimées</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><RefreshCw size={20} /></div>
                    <div className="stat-value">{taxSavingsSummary.ytdHarvestEvents}</div>
                    <div className="stat-label">Événements TLH (YTD)</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><BarChart3 size={20} /></div>
                    <div className="stat-value">{taxSavingsSummary.avgSavingsPerClient} $</div>
                    <div className="stat-label">Économie moy. / client</div>
                </div>
            </div>

            <div className="tabs">
                {[['overview', 'Aperçu'], ['harvesting', 'Activité TLH'], ['settings', 'Paramètres fiscaux']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`}
                        onClick={() => setActiveTab(key)}>
                        {label}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Pertes récoltées par mois</h3>
                        </div>
                        <div style={{ height: 280 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyTLH}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                                    <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={11} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickFormatter={v => `${(v / 1000).toFixed(0)}K $`} />
                                    <Tooltip
                                        formatter={v => formatCurrency(v)}
                                        contentStyle={{
                                            background: 'var(--bg-elevated)', border: '1px solid var(--border-secondary)',
                                            borderRadius: 8, fontSize: 12,
                                        }}
                                    />
                                    <Bar dataKey="harvested" name="Pertes récoltées" fill="#C87941" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h3>Fonctionnalités fiscales</h3>
                        </div>
                        {[
                            { icon: '🔄', title: 'Rééquilibrage fiscal', desc: 'Arbitrages intelligents entre impact fiscal et suivi de l\'allocation cible', active: true },
                            { icon: '📉', title: 'Récolte de pertes (TLH)', desc: 'Réalisation opportuniste de pertes pour réduire la charge fiscale', active: true },
                            { icon: '⚙️', title: 'Taux fiscaux personnalisés', desc: 'Taux court terme et long terme personnalisés par client', active: true },
                            { icon: '📊', title: 'Rapports de gestion fiscale', desc: 'Pertes récoltées et économies estimées dans les rapports', active: true },
                            { icon: '🎯', title: 'Scan TLH quotidien', desc: 'Scan automatique quotidien pour détecter les opportunités', active: false },
                        ].map(feature => (
                            <div key={feature.title} style={{
                                display: 'flex', gap: 'var(--space-3)', alignItems: 'center',
                                padding: 'var(--space-3)', background: 'var(--bg-tertiary)',
                                borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-2)',
                                border: `1px solid ${feature.active ? 'var(--kd-copper-glow)' : 'var(--border-primary)'}`,
                            }}>
                                <span style={{ fontSize: 20 }}>{feature.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 500 }}>{feature.title}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{feature.desc}</div>
                                </div>
                                <span className={`badge ${feature.active ? 'badge-success' : 'badge-warning'}`}>
                                    {feature.active ? 'Actif' : 'Configurer'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'harvesting' && (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Client</th>
                                    <th>Titre vendu</th>
                                    <th>Perte récoltée</th>
                                    <th>Remplacement</th>
                                    <th>Date</th>
                                    <th>Statut</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taxHarvestingData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.client}</td>
                                        <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--kd-danger)' }}>
                                            {item.security}
                                        </td>
                                        <td style={{ fontWeight: 600, color: 'var(--kd-success)', fontVariantNumeric: 'tabular-nums' }}>
                                            {formatCurrency(item.lossHarvested)}
                                        </td>
                                        <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--kd-diamond-light)' }}>
                                            {item.replacement}
                                        </td>
                                        <td style={{ fontSize: 12 }}>{formatDate(item.date)}</td>
                                        <td><span className={`badge ${getStatusBadge(item.status)}`}>{statusLabels[item.status] || item.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="grid-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>Paramètres fiscaux globaux</h3>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Taux d'imposition court terme par défaut</label>
                            <input className="form-input" type="number" defaultValue="37" placeholder="%" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Taux d'imposition long terme par défaut</label>
                            <input className="form-input" type="number" defaultValue="20" placeholder="%" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Seuil TLH</label>
                            <input className="form-input" type="number" defaultValue="500" placeholder="Perte minimum" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Période de prévention (wash sale)</label>
                            <select className="form-select">
                                <option>30 jours (standard)</option>
                                <option>31 jours (conservateur)</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" style={{ marginTop: 'var(--space-3)' }}>Enregistrer</button>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h3>Automatisation TLH</h3>
                        </div>
                        {[
                            { label: 'Activer le scan TLH quotidien', checked: true },
                            { label: 'Exécution automatique si perte > 1 000 $', checked: false },
                            { label: 'Rééquilibrage fiscal par défaut', checked: true },
                            { label: 'Notifier le conseiller avant exécution', checked: true },
                            { label: 'Inclure dans les rapports trimestriels', checked: true },
                        ].map(opt => (
                            <label key={opt.label} style={{
                                display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                                padding: 'var(--space-3)', borderBottom: '1px solid var(--border-primary)',
                                cursor: 'pointer', fontSize: 13,
                            }}>
                                <input type="checkbox" defaultChecked={opt.checked} style={{ accentColor: 'var(--kd-copper)' }} />
                                {opt.label}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
