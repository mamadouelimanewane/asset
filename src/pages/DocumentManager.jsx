import { useState } from 'react';
import {
    FileText, Upload, Download, Search, Folder, FolderOpen,
    File, Eye, Trash2, Clock, Lock, CheckCircle, AlertTriangle,
    Share2, Tag, Filter, Plus, MoreVertical
} from 'lucide-react';

const mockDocuments = [
    { id: 'DOC-001', name: 'Testament notarié — O. N\'Diaye', type: 'pdf', size: '1.2 MB', client: 'Ousmane N\'Diaye', category: 'Succession', status: 'valid', uploadedAt: '2025-02-21', expiresAt: null, encrypted: true },
    { id: 'DOC-002', name: 'Passeport — O. N\'Diaye', type: 'pdf', size: '3.4 MB', client: 'Ousmane N\'Diaye', category: 'KYC', status: 'expiring', uploadedAt: '2024-06-15', expiresAt: '2025-06-15', encrypted: true },
    { id: 'DOC-003', name: 'Contrat de gestion — Fondation Gueye', type: 'pdf', size: '890 KB', client: 'Fondation Modou Gueye', category: 'Contrats', status: 'valid', uploadedAt: '2024-11-20', expiresAt: '2026-11-20', encrypted: true },
    { id: 'DOC-004', name: 'Relevé fiscal 2024 — C. Ba', type: 'pdf', size: '450 KB', client: 'Cheikh K. Ba', category: 'Fiscalité', status: 'valid', uploadedAt: '2025-01-31', expiresAt: null, encrypted: false },
    { id: 'DOC-005', name: 'Procuration — A. Sow', type: 'pdf', size: '320 KB', client: 'Aminata Sow', category: 'Légal', status: 'expired', uploadedAt: '2023-03-10', expiresAt: '2024-03-10', encrypted: true },
    { id: 'DOC-006', name: 'Attestation d\'assurance vie', type: 'pdf', size: '1.8 MB', client: 'Ousmane N\'Diaye', category: 'Assurance', status: 'valid', uploadedAt: '2025-01-05', expiresAt: '2026-01-05', encrypted: true },
    { id: 'DOC-007', name: 'Statuts société — F. Diop Ind.', type: 'pdf', size: '2.1 MB', client: 'Fatou Diop Industries', category: 'Légal', status: 'valid', uploadedAt: '2024-08-22', expiresAt: null, encrypted: false },
    { id: 'DOC-008', name: 'Formulaire W-9', type: 'pdf', size: '180 KB', client: 'Cheikh K. Ba', category: 'KYC', status: 'valid', uploadedAt: '2025-02-10', expiresAt: null, encrypted: false },
    { id: 'DOC-009', name: 'Rapport d\'audit interne Q4', type: 'pdf', size: '4.5 MB', client: 'Interne', category: 'Audit', status: 'valid', uploadedAt: '2025-01-20', expiresAt: null, encrypted: true },
    { id: 'DOC-010', name: 'Police d\'assurance RC Pro', type: 'pdf', size: '1.1 MB', client: 'Interne', category: 'Assurance', status: 'expiring', uploadedAt: '2024-04-01', expiresAt: '2025-04-01', encrypted: false },
];

const categories = ['Tous', 'KYC', 'Succession', 'Contrats', 'Fiscalité', 'Légal', 'Assurance', 'Audit'];
const statusConfig = {
    valid: { label: 'Valide', color: 'var(--kd-success)', bg: 'rgba(52,211,153,0.1)' },
    expiring: { label: 'Expire bientôt', color: 'var(--kd-warning)', bg: 'rgba(245,158,11,0.1)' },
    expired: { label: 'Expiré', color: 'var(--kd-danger)', bg: 'rgba(239,68,68,0.1)' },
};

export default function DocumentManager() {
    const [filterCat, setFilterCat] = useState('Tous');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list');

    const filtered = mockDocuments
        .filter(d => filterCat === 'Tous' || d.category === filterCat)
        .filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const expiring = mockDocuments.filter(d => d.status === 'expiring').length;
    const expired = mockDocuments.filter(d => d.status === 'expired').length;
    const encrypted = mockDocuments.filter(d => d.encrypted).length;

    return (
        <div className="page-content">
            <div className="page-header">
                <div><h1>Gestion documentaire</h1><p>Coffre-fort numérique sécurisé — documents clients et réglementaires</p></div>
                <button className="btn btn-primary"><Upload size={14} /> Uploader</button>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper"><div className="stat-icon"><FileText size={20} /></div><div className="stat-value">{mockDocuments.length}</div><div className="stat-label">Documents</div></div>
                <div className="stat-card success"><div className="stat-icon"><Lock size={20} /></div><div className="stat-value">{encrypted}</div><div className="stat-label">Chiffrés AES-256</div></div>
                <div className="stat-card warning"><div className="stat-icon"><AlertTriangle size={20} /></div><div className="stat-value">{expiring}</div><div className="stat-label">Expirent bientôt</div></div>
                <div className="stat-card" style={{ borderColor: 'rgba(239,68,68,0.3)' }}><div className="stat-icon" style={{ background: 'rgba(239,68,68,0.1)', color: 'var(--kd-danger)' }}><Trash2 size={20} /></div><div className="stat-value" style={{ color: 'var(--kd-danger)' }}>{expired}</div><div className="stat-label">Expirés</div></div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                <div className="header-search" style={{ width: 280 }}><Search size={14} /><input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button key={cat} className={`btn btn-sm ${filterCat === cat ? 'btn-primary' : 'btn-ghost'}`} style={{ fontSize: 10 }}
                            onClick={() => setFilterCat(cat)}>{cat}</button>
                    ))}
                </div>
            </div>

            <div className="card">
                <table className="data-table">
                    <thead><tr><th>Document</th><th>Client</th><th>Catégorie</th><th>Taille</th><th>Date</th><th>Statut</th><th>Actions</th></tr></thead>
                    <tbody>
                        {filtered.map(doc => {
                            const st = statusConfig[doc.status];
                            return (
                                <tr key={doc.id}>
                                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <File size={14} style={{ color: 'var(--kd-copper)', flexShrink: 0 }} />
                                        <span style={{ fontWeight: 500, fontSize: 13 }}>{doc.name}</span>
                                        {doc.encrypted && <Lock size={10} style={{ color: 'var(--kd-success)' }} />}
                                    </div></td>
                                    <td style={{ fontSize: 12 }}>{doc.client}</td>
                                    <td><span className="tag" style={{ fontSize: 10 }}>{doc.category}</span></td>
                                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{doc.size}</td>
                                    <td style={{ fontSize: 12 }}>{new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}</td>
                                    <td><span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: st.bg, color: st.color, fontWeight: 600 }}>{st.label}</span></td>
                                    <td><div className="btn-group"><button className="btn btn-ghost btn-sm"><Eye size={12} /></button><button className="btn btn-ghost btn-sm"><Download size={12} /></button><button className="btn btn-ghost btn-sm"><Share2 size={12} /></button></div></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
