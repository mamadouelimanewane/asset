import { useState } from 'react';
import {
    Users, ShieldAlert, Key, Database, HardDrive,
    History, Fingerprint, Lock, ShieldCheck, DownloadCloud, AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const USERS = [
    { id: 'U001', name: 'Moussa Diallo', role: 'Super Admin', dept: 'Direction', twoFactor: true, lastLogin: 'Il y a 2 min', status: 'Actif' },
    { id: 'U002', name: 'Aïssatou Seck', role: 'Gestionnaire (PM)', dept: 'Investissements', twoFactor: true, lastLogin: 'Il y a 1 heure', status: 'Actif' },
    { id: 'U003', name: 'Cheikh Ba', role: 'Conseiller', dept: 'Wealth Planning', twoFactor: false, lastLogin: 'Hier', status: 'Alerte 2FA' },
    { id: 'U004', name: 'Fatou Diop', role: 'Compliance Officer', dept: 'Risques & Conformité', twoFactor: true, lastLogin: 'Ce matin', status: 'Actif' },
    { id: 'U005', name: 'Alexandre Ndiaye', role: 'Analyste', dept: 'Recherche', twoFactor: true, lastLogin: 'Il y a 3 jours', status: 'Inactif' },
];

const BACKUPS = [
    { id: 'BAK-20260222-01', type: 'Complète (Cold Storage)', size: '24.5 GB', status: 'Succès', time: 'Aujourd\'hui, 02:00 AM', node: 'AWS us-east-1' },
    { id: 'BAK-20260221-02', type: 'Incrémentale (DB)', size: '1.2 GB', status: 'Succès', time: 'Hier, 14:00 PM', node: 'Azure Paris' },
    { id: 'BAK-20260221-01', type: 'Complète (Cold Storage)', size: '24.2 GB', status: 'Succès', time: 'Hier, 02:00 AM', node: 'AWS us-east-1' },
];

const LOGIN_ATTEMPTS = [
    { day: 'Lun', success: 120, failed: 2 },
    { day: 'Mar', success: 132, failed: 1 },
    { day: 'Mer', success: 145, failed: 5 },
    { day: 'Jeu', success: 110, failed: 12 }, // Suspicious activity peak
    { day: 'Ven', success: 155, failed: 0 },
];

export default function SystemAdministration() {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1e293b, #0f172a)', border: '1px solid #3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'white', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}>
                        <Database size={22} color="#60a5fa" />
                    </div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Administration Système</h1>
                        <p style={{ marginBottom: 0 }}>Gestion des utilisateurs, privilèges, sécurité d'accès et sauvegardes.</p>
                    </div>
                </div>
                <div className="btn-group">
                    <button className="btn btn-secondary" style={{ border: '1px solid #ef4444', color: '#f87171' }}><AlertTriangle size={14} style={{ marginRight: 6 }} /> Mode Urgence (Lockdown)</button>
                    <button className="btn btn-primary" style={{ background: '#3b82f6', border: 'none' }}><DownloadCloud size={14} style={{ marginRight: 6 }} /> Forcer Sauvegarde</button>
                </div>
            </div>

            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {[['users', '👥 Utilisateurs & Rôles'], ['security', '🛡️ Sécurité & Audits'], ['backups', '💾 Sauvegardes & PRA']].map(([key, label]) => (
                    <button key={key} className={`tab ${activeTab === key ? 'active' : ''}`} onClick={() => setActiveTab(key)}>{label}</button>
                ))}
            </div>

            {activeTab === 'users' && (
                <div className="card">
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Users size={18} /> Annuaire des Collaborateurs & Privilèges</h3>
                        <button className="btn btn-primary btn-sm">+ Ajouter Utilisateur</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Identifiant</th>
                                    <th>Nom Complet</th>
                                    <th>Rôle (Privilèges)</th>
                                    <th>Département</th>
                                    <th>Authentification 2FA</th>
                                    <th>Dernière Connexion</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {USERS.map(user => (
                                    <tr key={user.id}>
                                        <td style={{ fontFamily: 'monospace', color: 'var(--text-muted)' }}>{user.id}</td>
                                        <td style={{ fontWeight: 800, color: 'white' }}>{user.name}</td>
                                        <td><span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 12, background: 'rgba(59,130,246,0.1)', color: '#60a5fa', fontWeight: 600 }}>{user.role}</span></td>
                                        <td style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{user.dept}</td>
                                        <td>
                                            {user.twoFactor
                                                ? <span style={{ color: 'var(--kd-success)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><ShieldCheck size={14} /> Activé</span>
                                                : <span style={{ color: 'var(--kd-danger)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}><ShieldAlert size={14} /> Désactivé</span>
                                            }
                                        </td>
                                        <td style={{ fontSize: 12 }}>{user.lastLogin}</td>
                                        <td>
                                            <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 8px', borderRadius: 4, background: user.status === 'Actif' ? 'rgba(16,185,129,0.1)' : user.status === 'Inactif' ? 'rgba(255,255,255,0.05)' : 'rgba(239,68,68,0.1)', color: user.status === 'Actif' ? '#10B981' : user.status === 'Inactif' ? 'var(--text-muted)' : '#EF4444' }}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td><button className="btn btn-ghost btn-sm" style={{ fontSize: 11 }}>Gérer accès</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'security' && (
                <div className="grid-2-1">
                    <div className="card">
                        <div className="card-header">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ShieldAlert size={18} /> Tentatives de Connexion (7 derniers jours)</h3>
                        </div>
                        <div style={{ height: 260, marginTop: 'var(--space-4)' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={LOGIN_ATTEMPTS}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ background: '#0a0e17', borderRadius: 8, border: '1px solid var(--border-primary)' }} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                                    <Bar dataKey="success" name="Succès" fill="#10b981" radius={[2, 2, 0, 0]} stackId="a" />
                                    <Bar dataKey="failed" name="Échecs (Bloqués)" fill="#ef4444" radius={[2, 2, 0, 0]} stackId="a" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                            <div className="card-header"><h3 style={{ fontSize: 14 }}>Politiques de Mot de Passe</h3></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>Longueur minimale</span> <strong>12 char.</strong></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>Expiration forcée</span> <strong>90 jours</strong></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>Historique bloqué</span> <strong>5 derniers</strong></div>
                                <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}>Modifier les règles</button>
                            </div>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                            <div className="card-header"><h3 style={{ fontSize: 14 }}>Contrôle de Session</h3></div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>Délai d'inactivité (Timeout)</span> <strong>15 mins</strong></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}><span>IP Whitelisting (Bureaux)</span> <strong style={{ color: '#10b981' }}>Activé (3 IPs)</strong></div>
                                <button className="btn btn-secondary btn-sm" style={{ marginTop: 8 }}>Révoquer les sessions actives (12)</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'backups' && (
                <div className="card" style={{ border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                    <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#60a5fa' }}><HardDrive size={18} color="#60a5fa" /> Plan de Reprise d'Activité (PRA) & Sauvegardes</h3>
                        <span className="badge badge-success">Sain / RPO: 4h</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>Toutes les données transactionnelles et portefeuilles sont cryptées au repos (AES-256) et répliquées sur des nœuds cloud géographiquement distants en cas de sinistre majeur.</p>

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Point de Restauration (ID)</th>
                                <th>Type de Sauvegarde</th>
                                <th>Horodatage</th>
                                <th>Nœud Cible</th>
                                <th>Taille</th>
                                <th>Statut d'Intégrité</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BACKUPS.map(bak => (
                                <tr key={bak.id}>
                                    <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{bak.id}</td>
                                    <td style={{ fontSize: 13 }}>{bak.type}</td>
                                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{bak.time}</td>
                                    <td><span style={{ fontSize: 11, padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>{bak.node}</span></td>
                                    <td style={{ fontWeight: 700, fontFamily: 'monospace' }}>{bak.size}</td>
                                    <td>
                                        <span style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontWeight: 700 }}>
                                            <ShieldCheck size={14} /> {bak.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="btn btn-ghost btn-sm" style={{ color: '#60a5fa' }}><History size={14} style={{ marginRight: 4 }} /> Restaurer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
