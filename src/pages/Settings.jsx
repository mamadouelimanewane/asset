import { useState } from 'react';
import { Settings as SettingsIcon, User, Building, Bell, Shield, Palette, Globe, Save } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Paramètres</h1>
                    <p>Configurez les préférences de votre cabinet, intégrations et compte</p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-5)' }}>
                {/* Barre latérale paramètres */}
                <div style={{ width: 220, flexShrink: 0 }}>
                    {[
                        { key: 'profile', icon: User, label: 'Profil du conseiller' },
                        { key: 'firm', icon: Building, label: 'Paramètres du cabinet' },
                        { key: 'notifications', icon: Bell, label: 'Notifications' },
                        { key: 'security', icon: Shield, label: 'Sécurité' },
                        { key: 'branding', icon: Palette, label: 'Image de marque' },
                        { key: 'general', icon: Globe, label: 'Général' },
                    ].map(item => (
                        <div
                            key={item.key}
                            className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.key)}
                        >
                            <item.icon size={16} />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Contenu paramètres */}
                <div style={{ flex: 1 }}>
                    {activeTab === 'profile' && (
                        <div className="card">
                            <div className="card-header">
                                <h3>Profil du conseiller</h3>
                            </div>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Nom complet</label>
                                    <input className="form-input" defaultValue="Moussa Diallo" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Titre</label>
                                    <input className="form-input" defaultValue="Directeur des investissements" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input className="form-input" defaultValue="moussa@kd-wealth.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Téléphone</label>
                                    <input className="form-input" defaultValue="+221 77 555 4321" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Numéro CRD</label>
                                    <input className="form-input" defaultValue="7654321" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Certifications</label>
                                    <input className="form-input" defaultValue="CFP, CFA, CAIA" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Biographie</label>
                                <textarea className="form-input" defaultValue="Conseiller patrimonial expérimenté avec plus de 15 ans de gestion de portefeuilles fortunés à travers l'Afrique et les marchés internationaux." />
                            </div>
                            <button className="btn btn-primary"><Save size={14} /> Enregistrer le profil</button>
                        </div>
                    )}

                    {activeTab === 'firm' && (
                        <div className="card">
                            <div className="card-header">
                                <h3>Paramètres du cabinet</h3>
                            </div>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Nom du cabinet</label>
                                    <input className="form-input" defaultValue="KD Wealth Advisors" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Identifiant réglementaire</label>
                                    <input className="form-input" defaultValue="ADV-2019-4582" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Adresse</label>
                                    <input className="form-input" defaultValue="Almadies, Dakar" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Pays</label>
                                    <select className="form-select">
                                        <option>Sénégal</option>
                                        <option>États-Unis</option>
                                        <option>France</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Barème de frais par défaut</label>
                                <select className="form-select">
                                    <option>Basé sur l'AUM (par paliers)</option>
                                    <option>Forfaitaire</option>
                                    <option>Mixte</option>
                                </select>
                            </div>
                            <button className="btn btn-primary"><Save size={14} /> Enregistrer</button>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="card">
                            <div className="card-header">
                                <h3>Préférences de notification</h3>
                            </div>
                            {[
                                { label: 'Alertes d\'exécution d\'ordres', desc: 'Soyez notifié quand un ordre est exécuté', checked: true },
                                { label: 'Alertes de dérive du portefeuille', desc: 'Alerte quand un compte dépasse le seuil de dérive', checked: true },
                                { label: 'Opportunités TLH', desc: 'Notification quand des opportunités de récolte de pertes sont détectées', checked: true },
                                { label: 'Rappels de facturation', desc: 'Notifications du prochain cycle de facturation', checked: true },
                                { label: 'Activité des clients', desc: 'Quand les clients se connectent au portail ou demandent des modifications', checked: false },
                                { label: 'Mises à jour du marché', desc: 'Résumé quotidien du marché et mouvements notables', checked: false },
                                { label: 'Échéances de conformité', desc: 'Dates limites de dépôt réglementaire et conformité', checked: true },
                                { label: 'Insights IA', desc: 'Recommandations et analyses de Diambar AI', checked: true },
                            ].map(opt => (
                                <label key={opt.label} style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    padding: 'var(--space-3)', borderBottom: '1px solid var(--border-primary)',
                                    cursor: 'pointer',
                                }}>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 500 }}>{opt.label}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{opt.desc}</div>
                                    </div>
                                    <input type="checkbox" defaultChecked={opt.checked} style={{ accentColor: 'var(--kd-copper)' }} />
                                </label>
                            ))}
                            <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}><Save size={14} /> Enregistrer les préférences</button>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="card">
                            <div className="card-header">
                                <h3>Paramètres de sécurité</h3>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Authentification à deux facteurs</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <span className="badge badge-success">Activée</span>
                                    <button className="btn btn-secondary btn-sm">Configurer</button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Expiration de session</label>
                                <select className="form-select">
                                    <option>15 minutes</option>
                                    <option>30 minutes</option>
                                    <option>1 heure</option>
                                    <option>4 heures</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Liste blanche IP</label>
                                <textarea className="form-input" placeholder="Entrez les adresses IP de confiance, une par ligne" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Accès API</label>
                                <div style={{
                                    padding: 'var(--space-3)', background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)',
                                    fontSize: 12, color: 'var(--text-tertiary)',
                                }}>
                                    sk_live_kd_••••••••••••••••4582
                                </div>
                                <button className="btn btn-secondary btn-sm" style={{ marginTop: 'var(--space-2)' }}>Régénérer la clé</button>
                            </div>
                            <button className="btn btn-primary"><Save size={14} /> Enregistrer la sécurité</button>
                        </div>
                    )}

                    {activeTab === 'branding' && (
                        <div className="card">
                            <div className="card-header">
                                <h3>Image de marque personnalisée</h3>
                            </div>
                            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
                                Personnalisez le portail client, les rapports et les factures avec l'identité visuelle de votre cabinet.
                            </p>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Logo du cabinet</label>
                                    <div style={{
                                        width: '100%', height: 100, background: 'var(--bg-tertiary)',
                                        border: '2px dashed var(--border-secondary)', borderRadius: 'var(--radius-md)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'var(--text-muted)', fontSize: 13, cursor: 'pointer',
                                    }}>
                                        Cliquez pour télécharger un logo
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Couleur principale</label>
                                    <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                                        <input type="color" defaultValue="#C87941" style={{
                                            width: 42, height: 36, border: 'none', cursor: 'pointer',
                                            background: 'none', borderRadius: 'var(--radius-sm)',
                                        }} />
                                        <input className="form-input" defaultValue="#C87941" style={{ fontFamily: 'var(--font-mono)' }} />
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-primary"><Save size={14} /> Enregistrer l'image de marque</button>
                        </div>
                    )}

                    {activeTab === 'general' && (
                        <div className="card">
                            <div className="card-header">
                                <h3>Préférences générales</h3>
                            </div>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Langue</label>
                                    <select className="form-select">
                                        <option>Français</option>
                                        <option>English</option>
                                        <option>Wolof</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Fuseau horaire</label>
                                    <select className="form-select">
                                        <option>Africa/Dakar (GMT+0)</option>
                                        <option>America/New_York (EST)</option>
                                        <option>Europe/Paris (CET)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Devise d'affichage</label>
                                    <select className="form-select">
                                        <option>USD ($)</option>
                                        <option>XOF (FCFA)</option>
                                        <option>EUR (€)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Format de date</label>
                                    <select className="form-select">
                                        <option>JJ/MM/AAAA</option>
                                        <option>MM/JJ/AAAA</option>
                                        <option>AAAA-MM-JJ</option>
                                    </select>
                                </div>
                            </div>
                            <button className="btn btn-primary"><Save size={14} /> Enregistrer les préférences</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
