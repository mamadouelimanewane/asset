import { ArrowLeftRight, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { transfersACATs } from '../data/mockData';
import { formatCurrency, formatDate, getStatusBadge } from '../utils/helpers';

export default function Transfers() {
    const statusLabels = { 'In Progress': 'En cours', 'Completed': 'Terminé', 'Pending Approval': 'Approbation requise' };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Transferts & ACATs</h1>
                    <p>Transférez des comptes en quelques minutes — 100% digital, sans papier ni relevés</p>
                </div>
                <button className="btn btn-primary">
                    <ArrowLeftRight size={14} /> Initier un transfert
                </button>
            </div>

            <div className="stat-grid">
                <div className="stat-card copper">
                    <div className="stat-icon"><ArrowLeftRight size={20} /></div>
                    <div className="stat-value">2</div>
                    <div className="stat-label">En cours</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><CheckCircle size={20} /></div>
                    <div className="stat-value">18</div>
                    <div className="stat-label">Terminés (YTD)</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><AlertCircle size={20} /></div>
                    <div className="stat-value">1</div>
                    <div className="stat-label">Approbation requise</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><Clock size={20} /></div>
                    <div className="stat-value">5 jours</div>
                    <div className="stat-label">Délai moyen</div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Établissement d'origine</th>
                                <th>Type de compte</th>
                                <th>Valeur estimée</th>
                                <th>Statut</th>
                                <th>Initié le</th>
                                <th>Fin estimée</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transfersACATs.map(transfer => (
                                <tr key={transfer.id}>
                                    <td style={{ fontWeight: 500 }}>{transfer.client}</td>
                                    <td>{transfer.fromInstitution}</td>
                                    <td><span className="tag">{transfer.accountType}</span></td>
                                    <td style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                                        {formatCurrency(transfer.estimatedValue)}
                                    </td>
                                    <td><span className={`badge ${getStatusBadge(transfer.status)}`}>{statusLabels[transfer.status] || transfer.status}</span></td>
                                    <td style={{ fontSize: 12 }}>{formatDate(transfer.initiated)}</td>
                                    <td style={{ fontSize: 12 }}>{formatDate(transfer.estimatedCompletion)}</td>
                                    <td>
                                        <button className="btn btn-secondary btn-sm">Détails</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Avantages des transferts */}
            <div className="grid-3" style={{ marginTop: 'var(--space-5)' }}>
                {[
                    { icon: '📱', title: 'ACATs digitaux', desc: 'Transférez en quelques minutes au lieu de plusieurs jours, sans avoir besoin du relevé de l\'ancien établissement.' },
                    { icon: '📦', title: 'Transferts en lot', desc: 'Travaillez avec notre équipe dédiée pour migrer l\'intégralité de votre carnet clients en une seule fois.' },
                    { icon: '🔗', title: 'Liaison de comptes', desc: 'Les clients peuvent immédiatement connecter et vérifier leur compte bancaire via notre plateforme sécurisée.' },
                ].map(item => (
                    <div key={item.title} className="card" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 36, marginBottom: 'var(--space-3)' }}>{item.icon}</div>
                        <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 'var(--space-2)' }}>{item.title}</h3>
                        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
