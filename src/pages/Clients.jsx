import { useState } from 'react';
import { Search, Filter, Plus, Mail, Phone, MoreHorizontal, Eye } from 'lucide-react';
import { clients } from '../data/mockData';
import { formatCurrency, getStatusBadge, getInitials, stringToColor, abbreviateAUM, formatDate } from '../utils/helpers';

export default function Clients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('Tous');
    const [selectedClient, setSelectedClient] = useState(null);

    const filtered = clients.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchType = filterType === 'Tous' ||
            (filterType === 'Individuel' && c.type === 'Individual') ||
            (filterType === 'Entreprise' && c.type === 'Corporate') ||
            (filterType === 'Institutionnel' && c.type === 'Institutional');
        return matchSearch && matchType;
    });

    const typeLabels = { 'Individual': 'Individuel', 'Corporate': 'Entreprise', 'Institutional': 'Institutionnel' };
    const riskLabels = { 'Conservative': 'Conservateur', 'Moderate': 'Modéré', 'Aggressive': 'Agressif' };
    const statusLabels = { 'Active': 'Actif', 'Inactive': 'Inactif' };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Gestion des clients</h1>
                    <p>Gérez vos {clients.length} clients et ménages</p>
                </div>
                <button className="btn btn-primary" id="add-client-btn">
                    <Plus size={16} /> Ajouter un client
                </button>
            </div>

            {/* Filtres */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
                <div className="header-search" style={{ width: 300 }}>
                    <Search size={14} />
                    <input
                        type="text"
                        placeholder="Rechercher des clients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {['Tous', 'Individuel', 'Entreprise', 'Institutionnel'].map(t => (
                    <button
                        key={t}
                        className={`btn btn-sm ${filterType === t ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilterType(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Tableau clients */}
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Type</th>
                                <th>AUM</th>
                                <th>Comptes</th>
                                <th>Profil de risque</th>
                                <th>Statut</th>
                                <th>Dernier contact</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(client => (
                                <tr key={client.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                            <div style={{
                                                width: 34,
                                                height: 34,
                                                borderRadius: 'var(--radius-full)',
                                                background: stringToColor(client.name),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: 12,
                                                fontWeight: 600,
                                                color: 'white',
                                                flexShrink: 0,
                                            }}>
                                                {getInitials(client.name)}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{client.name}</div>
                                                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{client.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td><span className="tag">{typeLabels[client.type] || client.type}</span></td>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                                        {abbreviateAUM(client.aum)}
                                    </td>
                                    <td>{client.accounts}</td>
                                    <td>
                                        <span style={{
                                            color: client.riskProfile === 'Conservative' ? 'var(--kd-diamond)' :
                                                client.riskProfile === 'Moderate' ? 'var(--kd-warning)' :
                                                    'var(--kd-danger)',
                                            fontSize: 12,
                                            fontWeight: 500,
                                        }}>
                                            {riskLabels[client.riskProfile] || client.riskProfile}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge ${getStatusBadge(client.status)}`}>
                                            {statusLabels[client.status] || client.status}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: 12 }}>{formatDate(client.lastContact)}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 4 }}>
                                            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedClient(client)}>
                                                <Eye size={14} />
                                            </button>
                                            <button className="btn btn-ghost btn-sm"><Mail size={14} /></button>
                                            <button className="btn btn-ghost btn-sm"><Phone size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal détails client */}
            {selectedClient && (
                <div className="modal-overlay" onClick={() => setSelectedClient(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Détails du client — {selectedClient.name}</h3>
                            <button className="btn btn-ghost btn-sm" onClick={() => setSelectedClient(null)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <div className="grid-2" style={{ gap: 'var(--space-4)' }}>
                                <div>
                                    <div className="form-label">Nom complet</div>
                                    <div style={{ fontSize: 14, fontWeight: 500 }}>{selectedClient.name}</div>
                                </div>
                                <div>
                                    <div className="form-label">Identifiant</div>
                                    <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)' }}>{selectedClient.id}</div>
                                </div>
                                <div>
                                    <div className="form-label">Email</div>
                                    <div style={{ fontSize: 14 }}>{selectedClient.email}</div>
                                </div>
                                <div>
                                    <div className="form-label">Téléphone</div>
                                    <div style={{ fontSize: 14 }}>{selectedClient.phone}</div>
                                </div>
                                <div>
                                    <div className="form-label">AUM total</div>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--kd-copper-light)' }}>
                                        {formatCurrency(selectedClient.aum)}
                                    </div>
                                </div>
                                <div>
                                    <div className="form-label">Comptes actifs</div>
                                    <div style={{ fontSize: 18, fontWeight: 700 }}>{selectedClient.accounts}</div>
                                </div>
                                <div>
                                    <div className="form-label">Profil de risque</div>
                                    <span className="badge badge-copper">{riskLabels[selectedClient.riskProfile] || selectedClient.riskProfile}</span>
                                </div>
                                <div>
                                    <div className="form-label">Ménage</div>
                                    <div style={{ fontSize: 14 }}>{selectedClient.household}</div>
                                </div>
                                <div>
                                    <div className="form-label">Date d'intégration</div>
                                    <div style={{ fontSize: 14 }}>{formatDate(selectedClient.onboardDate)}</div>
                                </div>
                                <div>
                                    <div className="form-label">Type</div>
                                    <span className="tag">{typeLabels[selectedClient.type] || selectedClient.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setSelectedClient(null)}>Fermer</button>
                            <button className="btn btn-primary">Modifier le client</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
