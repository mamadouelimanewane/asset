import { Shield, AlertTriangle, CheckCircle, Info, Clock, FileText } from 'lucide-react';
import { complianceAlerts } from '../data/mockData';

export default function Compliance() {
    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Conformité & Sécurité</h1>
                    <p>Conforme aux normes les plus strictes — réglementé SEC, FINRA, OCC</p>
                </div>
            </div>

            <div className="stat-grid">
                <div className="stat-card success">
                    <div className="stat-icon"><Shield size={20} /></div>
                    <div className="stat-value">Conforme</div>
                    <div className="stat-label">Statut global</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><CheckCircle size={20} /></div>
                    <div className="stat-value">SIPC</div>
                    <div className="stat-label">Membre + Excédent Lloyd's</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><AlertTriangle size={20} /></div>
                    <div className="stat-value">3</div>
                    <div className="stat-label">Alertes actives</div>
                </div>
                <div className="stat-card copper">
                    <div className="stat-icon"><FileText size={20} /></div>
                    <div className="stat-value">T4</div>
                    <div className="stat-label">Dernier audit</div>
                </div>
            </div>

            <div className="grid-2" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="card">
                    <div className="card-header">
                        <h3>Normes réglementaires</h3>
                    </div>
                    {[
                        { icon: '🏛️', title: 'Réglementé SEC & FINRA', desc: 'Conformité totale avec les régulateurs étatiques et fédéraux', status: 'Actif' },
                        { icon: '🛡️', title: 'Garantie de protection des actifs', desc: 'Remboursement des pertes dues à une activité non autorisée', status: 'Actif' },
                        { icon: '🔒', title: 'Règle de protection des clients', desc: 'Actifs clients séparés des fonds de la société', status: 'Actif' },
                        { icon: '🏦', title: 'Assurance FDIC', desc: 'Jusqu\'à 3M $ individuel, 6M $ conjoint sur les comptes cash', status: 'Actif' },
                        { icon: '📋', title: 'Excédent SIPC via Lloyd\'s', desc: 'Couverture supplémentaire au-delà du SIPC standard', status: 'Actif' },
                        { icon: '🔐', title: 'SOC 2 Type II', desc: 'Audit indépendant des systèmes et contrôles', status: 'Certifié' },
                    ].map(item => (
                        <div key={item.title} style={{
                            display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                            padding: 'var(--space-3)', borderBottom: '1px solid var(--border-primary)',
                        }}>
                            <span style={{ fontSize: 20 }}>{item.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 500 }}>{item.title}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{item.desc}</div>
                            </div>
                            <span className="badge badge-success">{item.status}</span>
                        </div>
                    ))}
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>Alertes & Tâches</h3>
                    </div>
                    {complianceAlerts.map(alert => (
                        <div key={alert.id} style={{
                            padding: 'var(--space-4)',
                            background: alert.type === 'warning' ? 'var(--kd-warning-bg)' :
                                alert.type === 'success' ? 'var(--kd-success-bg)' : 'var(--kd-info-bg)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: 'var(--space-3)',
                            borderLeft: `3px solid ${alert.type === 'warning' ? 'var(--kd-warning)' :
                                    alert.type === 'success' ? 'var(--kd-success)' : 'var(--kd-info)'
                                }`,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                {alert.type === 'warning' && <AlertTriangle size={14} />}
                                {alert.type === 'info' && <Info size={14} />}
                                {alert.type === 'success' && <CheckCircle size={14} />}
                                <span style={{ fontSize: 13, fontWeight: 600 }}>{alert.title}</span>
                            </div>
                            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{alert.description}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Clock size={10} /> {alert.time}
                            </div>
                        </div>
                    ))}

                    <div className="divider" />
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-3)' }}>Échéances à venir</h4>
                    {[
                        { task: 'Dépôt ADV — Mise à jour annuelle', due: '31 mars 2025', status: 'En attente' },
                        { task: 'Distribution avis de confidentialité', due: '15 avr. 2025', status: 'Programmé' },
                        { task: 'Revue des procédures de supervision', due: '30 juin 2025', status: 'Non commencé' },
                    ].map(item => (
                        <div key={item.task} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border-primary)',
                            fontSize: 13,
                        }}>
                            <span>{item.task}</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.due}</span>
                                <span className={`badge ${item.status === 'En attente' ? 'badge-warning' : item.status === 'Programmé' ? 'badge-info' : 'badge-copper'}`}>
                                    {item.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3>Journal d'audit</h3>
                    <button className="btn btn-secondary btn-sm">Exporter le journal</button>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Horodatage</th>
                            <th>Utilisateur</th>
                            <th>Action</th>
                            <th>Détail</th>
                            <th>Catégorie</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['21 fév. 2025 14:30', 'Moussa Diallo', 'Ordre exécuté', 'Rééquilibrage : Ousmane N\'Diaye — 150 parts AAPL', 'Trading'],
                            ['21 fév. 2025 10:15', 'Système', 'Scan fiscal auto', 'Scan TLH quotidien terminé — 2 opportunités détectées', 'Fiscalité'],
                            ['20 fév. 2025 16:45', 'Moussa Diallo', 'Compte ouvert', 'Mariama Tall — Courtage individuel', 'Intégration'],
                            ['20 fév. 2025 09:00', 'Système', 'Rapport généré', 'Résumés mensuels de solde pour 142 ménages', 'Rapports'],
                            ['19 fév. 2025 11:30', 'Moussa Diallo', 'Facturation configurée', 'Mise à jour du barème Fondation Gueye', 'Facturation'],
                        ].map(([time, user, action, detail, cat], i) => (
                            <tr key={i}>
                                <td style={{ fontSize: 12, fontFamily: 'var(--font-mono)' }}>{time}</td>
                                <td>{user}</td>
                                <td style={{ fontWeight: 500 }}>{action}</td>
                                <td style={{ maxWidth: 300 }}>{detail}</td>
                                <td><span className="tag">{cat}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
