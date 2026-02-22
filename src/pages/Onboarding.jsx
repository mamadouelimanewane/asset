import { useState } from 'react';
import { CheckCircle2, Circle, ArrowRight, UserPlus, Upload, FileText, CreditCard, BarChart3 } from 'lucide-react';
import { accountTypes, onboardingSteps } from '../data/mockData';

const stepIcons = [UserPlus, Upload, FileText, CreditCard, BarChart3];

const stepsData = [
    { title: 'Informations client', description: 'Données personnelles, KYC et adéquation' },
    { title: 'Sélection du compte', description: 'Choisir parmi 30+ types de comptes' },
    { title: 'Signature des documents', description: 'Signature électronique des accords' },
    { title: 'Alimenter le compte', description: 'Lier une banque, ACAT, ou virement' },
    { title: 'Affectation portefeuille', description: 'Assigner un modèle d\'investissement' },
];

export default function Onboarding() {
    const [currentStep, setCurrentStep] = useState(2);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phone: '',
        accountType: 'Individual Brokerage', ssn: '', dob: '',
        address: '', city: '', state: '', zip: '',
        employmentStatus: 'Employed', riskTolerance: 'Moderate',
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Intégration des clients</h1>
                    <p>Ouvrez de nouveaux comptes en quelques minutes avec notre processus 100% digital</p>
                </div>
                <button className="btn btn-primary">
                    <UserPlus size={16} /> Nouvelle intégration
                </button>
            </div>

            {/* Étapes de progression */}
            <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    position: 'relative',
                    padding: '0 var(--space-4)',
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 20,
                        left: 60,
                        right: 60,
                        height: 2,
                        background: 'var(--border-primary)',
                        zIndex: 0,
                    }}>
                        <div style={{
                            width: `${(currentStep / (stepsData.length - 1)) * 100}%`,
                            height: '100%',
                            background: 'var(--kd-copper)',
                            borderRadius: 4,
                            transition: 'width 0.5s ease',
                        }} />
                    </div>
                    {stepsData.map((step, i) => {
                        const Icon = stepIcons[i];
                        const isComplete = i < currentStep;
                        const isActive = i === currentStep;
                        return (
                            <div
                                key={step.title}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    zIndex: 1,
                                    cursor: 'pointer',
                                    flex: 1,
                                }}
                                onClick={() => setCurrentStep(i)}
                            >
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: '50%',
                                    background: isComplete ? 'var(--kd-copper)' :
                                        isActive ? 'var(--kd-copper-glow)' : 'var(--bg-tertiary)',
                                    border: isActive ? '2px solid var(--kd-copper)' : '2px solid transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: isComplete ? 'white' :
                                        isActive ? 'var(--kd-copper-light)' : 'var(--text-muted)',
                                    transition: 'all 0.3s ease',
                                    marginBottom: 'var(--space-2)',
                                }}>
                                    {isComplete ? <CheckCircle2 size={20} /> : <Icon size={18} />}
                                </div>
                                <div style={{
                                    fontSize: 12,
                                    fontWeight: isActive ? 600 : 400,
                                    color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                    textAlign: 'center',
                                }}>
                                    {step.title}
                                </div>
                                <div style={{
                                    fontSize: 10,
                                    color: 'var(--text-muted)',
                                    textAlign: 'center',
                                    marginTop: 2,
                                }}>
                                    {step.description}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="grid-2-1">
                {/* Formulaire principal */}
                <div className="card">
                    <div className="card-header">
                        <h3>
                            {currentStep === 0 && 'Informations du client'}
                            {currentStep === 1 && 'Sélection du compte'}
                            {currentStep === 2 && 'Signature des documents'}
                            {currentStep === 3 && 'Alimenter le compte'}
                            {currentStep === 4 && 'Affectation du portefeuille'}
                        </h3>
                    </div>

                    {currentStep === 0 && (
                        <div>
                            <div className="grid-2">
                                <div className="form-group">
                                    <label className="form-label">Prénom</label>
                                    <input className="form-input" value={formData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        placeholder="Entrez le prénom" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Nom</label>
                                    <input className="form-input" value={formData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        placeholder="Entrez le nom" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input className="form-input" type="email" value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        placeholder="client@exemple.com" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Téléphone</label>
                                    <input className="form-input" value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        placeholder="+221 7X XXX XX XX" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Date de naissance</label>
                                    <input className="form-input" type="date" value={formData.dob}
                                        onChange={(e) => handleChange('dob', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Identifiant fiscal / NIF</label>
                                    <input className="form-input" value={formData.ssn}
                                        onChange={(e) => handleChange('ssn', e.target.value)}
                                        placeholder="XXX-XX-XXXX" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Adresse</label>
                                <input className="form-input" value={formData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    placeholder="Adresse complète" />
                            </div>
                            <div className="grid-3">
                                <div className="form-group">
                                    <label className="form-label">Ville</label>
                                    <input className="form-input" value={formData.city}
                                        onChange={(e) => handleChange('city', e.target.value)} placeholder="Ville" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Région</label>
                                    <input className="form-input" value={formData.state}
                                        onChange={(e) => handleChange('state', e.target.value)} placeholder="Région" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Code postal</label>
                                    <input className="form-input" value={formData.zip}
                                        onChange={(e) => handleChange('zip', e.target.value)} placeholder="Code postal" />
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-4)', fontSize: 13 }}>
                                Choisissez parmi plus de 30 types de comptes uniques. Sélection multiple possible pour l'ouverture groupée.
                            </p>
                            <div className="grid-2">
                                {accountTypes.map(type => (
                                    <label key={type} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-3)',
                                        padding: 'var(--space-3)',
                                        background: formData.accountType === type ? 'var(--kd-copper-glow)' : 'var(--bg-tertiary)',
                                        border: `1px solid ${formData.accountType === type ? 'var(--kd-copper)' : 'var(--border-primary)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        fontSize: 13,
                                        transition: 'all 0.15s ease',
                                    }}>
                                        <input type="radio" name="accountType" checked={formData.accountType === type}
                                            onChange={() => handleChange('accountType', type)}
                                            style={{ accentColor: 'var(--kd-copper)' }} />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)', fontSize: 13 }}>
                                Signez électroniquement tous les accords et documents obligatoires.
                            </p>
                            {['Accord de conseil en investissement', 'Politique de confidentialité', 'Formulaire de divulgation des risques', 'Accord sur le barème des frais', 'Autorisation de contact de confiance'].map((doc, i) => (
                                <div key={doc} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: 'var(--space-3) var(--space-4)',
                                    background: 'var(--bg-tertiary)',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: 'var(--space-2)',
                                    border: '1px solid var(--border-primary)',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                        <FileText size={16} style={{ color: i < 2 ? 'var(--kd-success)' : 'var(--text-muted)' }} />
                                        <span style={{ fontSize: 13 }}>{doc}</span>
                                    </div>
                                    <button className={`btn btn-sm ${i < 2 ? 'btn-secondary' : 'btn-primary'}`}>
                                        {i < 2 ? '✓ Signé' : 'Signer'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)', fontSize: 13 }}>
                                Choisissez comment alimenter le compte. ACAT digital, lien bancaire ou virement.
                            </p>
                            <div className="grid-3">
                                {[
                                    { title: 'ACAT digital', desc: 'Transfert depuis un autre courtier', icon: '🔄' },
                                    { title: 'Lier un compte bancaire', desc: 'Connexion via Plaid', icon: '🏦' },
                                    { title: 'Virement bancaire', desc: 'Envoyez un virement direct', icon: '💸' },
                                ].map(method => (
                                    <div key={method.title} className="card" style={{
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        padding: 'var(--space-6)',
                                    }}>
                                        <div style={{ fontSize: 32, marginBottom: 'var(--space-3)' }}>{method.icon}</div>
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{method.title}</div>
                                        <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{method.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 4 && (
                        <div>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-5)', fontSize: 13 }}>
                                Assignez un modèle de portefeuille ou créez une stratégie d'investissement personnalisée.
                            </p>
                            <div className="form-group">
                                <label className="form-label">Tolérance au risque</label>
                                <select className="form-select" value={formData.riskTolerance}
                                    onChange={(e) => handleChange('riskTolerance', e.target.value)}>
                                    <option>Conservateur</option>
                                    <option>Modéré</option>
                                    <option>Agressif</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Modèle de portefeuille</label>
                                <select className="form-select">
                                    <option>KD Équilibré (60/40)</option>
                                    <option>KD Croissance Alpha</option>
                                    <option>KD Revenu Plus</option>
                                    <option>KD Impact ESG</option>
                                    <option>KD Bouclier Conservateur</option>
                                    <option>Stratégie personnalisée</option>
                                </select>
                            </div>
                        </div>
                    )}

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 'var(--space-6)',
                        paddingTop: 'var(--space-4)',
                        borderTop: '1px solid var(--border-primary)',
                    }}>
                        <button
                            className="btn btn-secondary"
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        >
                            Précédent
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                        >
                            {currentStep === 4 ? 'Terminer l\'intégration' : 'Étape suivante'}
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>

                {/* Info latérale */}
                <div>
                    <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                            ✨ Chiffres clés
                        </h3>
                        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 2 }}>
                            <div>📊 <strong>30+</strong> types de comptes disponibles</div>
                            <div>⚡ <strong>5 min</strong> temps d'intégration moyen</div>
                            <div>📱 <strong>100%</strong> processus digital</div>
                            <div>🔒 <strong>Sécurisé</strong> soumissions chiffrées</div>
                            <div>🔄 <strong>Lot</strong> ouverture multi-comptes</div>
                        </div>
                    </div>
                    <div className="card">
                        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                            Besoin d'aide ?
                        </h3>
                        <p style={{ fontSize: 12, color: 'var(--text-tertiary)', lineHeight: 1.6, marginBottom: 'var(--space-3)' }}>
                            Notre équipe de transition dédiée vous accompagne à chaque étape.
                            Contactez nos experts en moins de 60 secondes.
                        </p>
                        <button className="btn btn-diamond btn-sm">Contacter le support</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
