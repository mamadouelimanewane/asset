import { Landmark, TrendingUp, Shield, Plus } from 'lucide-react';
import { cashAccounts } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/helpers';

export default function HighYieldCash() {
    const totalCash = cashAccounts.reduce((sum, a) => sum + a.balance, 0);

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Cash haut rendement</h1>
                    <p>Faites fructifier la trésorerie — rendement 8x supérieur à la moyenne nationale, garanti FDIC</p>
                </div>
                <button className="btn btn-primary">
                    <Plus size={14} /> Ouvrir un compte cash
                </button>
            </div>

            <div className="stat-grid">
                <div className="stat-card copper">
                    <div className="stat-icon"><Landmark size={20} /></div>
                    <div className="stat-value">{formatCurrency(totalCash, true)}</div>
                    <div className="stat-label">Trésorerie totale gérée</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><TrendingUp size={20} /></div>
                    <div className="stat-value">4,85%</div>
                    <div className="stat-label">Taux annuel actuel</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><Shield size={20} /></div>
                    <div className="stat-value">FDIC</div>
                    <div className="stat-label">Protection des dépôts</div>
                </div>
            </div>

            {/* Comparaison des taux */}
            <div className="card" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="card-header">
                    <h3>Comparaison des rendements</h3>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end', height: 200, padding: 'var(--space-4) 0' }}>
                    {[
                        { label: 'Moy. nationale', rate: 0.60, color: 'var(--text-muted)' },
                        { label: 'Grandes banques', rate: 0.45, color: 'var(--text-tertiary)' },
                        { label: 'Épargne en ligne', rate: 3.80, color: 'var(--kd-diamond)' },
                        { label: 'Koppar-Diambar', rate: 4.85, color: 'var(--kd-copper)' },
                    ].map(item => (
                        <div key={item.label} style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <div style={{
                                width: '60%',
                                height: `${(item.rate / 5) * 140}px`,
                                background: item.color,
                                borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
                                transition: 'height 0.5s ease',
                                minHeight: 20,
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop: 8,
                            }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{item.rate}%</span>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 8, whiteSpace: 'nowrap' }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tableau comptes cash */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--border-primary)' }}>
                    <h3 style={{ fontSize: 15, fontWeight: 600 }}>Comptes cash clients</h3>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Solde</th>
                                <th>Taux</th>
                                <th>Dernier dépôt</th>
                                <th>Garantie FDIC</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cashAccounts.map(account => (
                                <tr key={account.id}>
                                    <td style={{ fontWeight: 500 }}>{account.client}</td>
                                    <td style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--kd-copper-light)' }}>
                                        {formatCurrency(account.balance)}
                                    </td>
                                    <td style={{ color: 'var(--kd-success)', fontWeight: 600 }}>{account.yield}%</td>
                                    <td style={{ fontSize: 12 }}>{formatDate(account.lastDeposit)}</td>
                                    <td><span className="badge badge-success">{account.insurance}</span></td>
                                    <td>
                                        <div className="btn-group">
                                            <button className="btn btn-secondary btn-sm">Déposer</button>
                                            <button className="btn btn-ghost btn-sm">Détails</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Avantages */}
            <div className="grid-4" style={{ marginTop: 'var(--space-5)' }}>
                {[
                    { icon: '🏦', title: 'Garanti FDIC', desc: 'Jusqu\'à 3M $ individuel, 6M $ conjoint' },
                    { icon: '⚡', title: 'Transferts instantanés', desc: 'Déplacez la trésorerie en temps réel' },
                    { icon: '📊', title: 'Sans minimum', desc: 'Commencez avec n\'importe quel montant' },
                    { icon: '🔐', title: 'Plateforme sécurisée', desc: 'Sécurité de niveau bancaire' },
                ].map(f => (
                    <div key={f.title} className="card" style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                        <div style={{ fontSize: 28, marginBottom: 'var(--space-2)' }}>{f.icon}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{f.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{f.desc}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
