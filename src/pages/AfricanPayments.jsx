import { useState } from 'react';
import {
    Smartphone, Globe, Building, Coins, Users,
    ArrowUpRight, ArrowDownLeft, RefreshCw, CheckCircle,
    Clock, AlertTriangle, ChevronRight, Zap, Shield,
    TrendingUp, Search, Plus, Send, Download
} from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

// ── Données Mobile Money ────────────────────────────────────────────────────
const MOBILE_MONEY = [
    {
        provider: 'Wave', logo: '🌊', color: '#1BA1E2', bgColor: 'rgba(27,161,226,0.1)',
        balance: 2_850_000, currency: 'FCFA', fees: '0%',
        status: 'connected', country: '🇸🇳 Sénégal',
        lastSync: '2 min', limit: 5_000_000,
        transactions: [
            { date: '22/02', type: 'depot', label: 'Dépôt Ousmane N\'Diaye', montant: 500_000, statut: 'success' },
            { date: '21/02', type: 'retrait', label: 'Retrait client Sow', montant: 200_000, statut: 'success' },
            { date: '20/02', type: 'depot', label: 'Dépôt Cheikh K. Ba', montant: 750_000, statut: 'success' },
        ],
    },
    {
        provider: 'Orange Money', logo: '🟠', color: '#FF6600', bgColor: 'rgba(255,102,0,0.1)',
        balance: 1_200_000, currency: 'FCFA', fees: '0.5%',
        status: 'connected', country: '🇸🇳 🇨🇮 🇲🇱',
        lastSync: '15 min', limit: 3_000_000,
        transactions: [
            { date: '22/02', type: 'depot', label: 'Dépôt Aminata Sow', montant: 300_000, statut: 'success' },
            { date: '19/02', type: 'depot', label: 'Dépôt Coumba Diop', montant: 450_000, statut: 'pending' },
        ],
    },
    {
        provider: 'Free Money', logo: '🟢', color: '#00A651', bgColor: 'rgba(0,166,81,0.1)',
        balance: 680_000, currency: 'FCFA', fees: '0%',
        status: 'connected', country: '🇸🇳 Sénégal',
        lastSync: '1h', limit: 2_000_000,
        transactions: [
            { date: '20/02', type: 'depot', label: 'Dépôt Ibrahim Ndiaga', montant: 180_000, statut: 'success' },
        ],
    },
    {
        provider: 'M-Pesa', logo: '📱', color: '#4CAF50', bgColor: 'rgba(76,175,80,0.1)',
        balance: 0, currency: 'KES', fees: '1%',
        status: 'inactive', country: '🇰🇪 Kenya',
        lastSync: null, limit: 1_000_000,
        transactions: [],
    },
];

// ── Virements RTGS / SWIFT ────────────────────────────────────────────────
const SWIFT_TRANSFERS = [
    { id: 'SW001', montant: 125_000, devise: 'USD', destinataire: 'HSBC London', iban: 'GB29 NWBK 6016...1234', swift: 'NWBKGB2LXXX', motif: 'Investissement ETF Vanguard', statut: 'executed', date: '2025-02-20', type: 'SWIFT', delai: '2 jours' },
    { id: 'RT001', montant: 45_000_000, devise: 'FCFA', destinataire: 'Banque Atlantique Abidjan', iban: 'CI12 3456 7890...', swift: 'ATCIABAB', motif: 'Achat obligations souveraines', statut: 'processing', date: '2025-02-22', type: 'RTGS BCEAO', delai: 'En cours' },
    { id: 'SW002', montant: 80_000, devise: 'EUR', destinataire: 'BNP Paribas Paris', iban: 'FR76 3000 6000...5678', swift: 'BNPAFRPPXXX', motif: 'Frais patrimoine Paris', statut: 'pending', date: '2025-02-23', type: 'SWIFT', delai: '1-3 jours' },
];

// ── Banques africaines connectées ──────────────────────────────────────────
const AFRICAN_BANKS = [
    { name: 'Ecobank', logo: '🏦', color: '#0066B3', balance: 85_200_000, currency: 'FCFA', pays: 'Sénégal', status: 'synced', synced: '10 min', comptes: 3, iban: 'SN08 1234...' },
    { name: 'Coris Bank', logo: '🏛️', color: '#C8102E', balance: 12_500_000, currency: 'FCFA', pays: 'Burkina Faso / Sénégal', status: 'synced', synced: '30 min', comptes: 1, iban: 'SN08 5678...' },
    { name: 'UBA (United Bank Africa)', logo: '🌍', color: '#E31837', balance: 22_800_000, currency: 'FCFA', pays: '20 pays Afrique', status: 'synced', synced: '1h', comptes: 2, iban: 'SN08 9012...' },
    { name: 'Banque Atlantique', logo: '🌊', color: '#003087', balance: 5_100_000, currency: 'FCFA', pays: "Côte d'Ivoire / Sénégal", status: 'error', synced: null, comptes: 1, iban: 'CI12 3456...' },
    { name: 'Orabank', logo: '🔶', color: '#F7941D', balance: 0, currency: 'FCFA', pays: '12 pays Afrique', status: 'inactive', synced: null, comptes: 0, iban: null },
];

// ── Stablecoins & eXOF ────────────────────────────────────────────────────
const STABLECOINS = [
    { name: 'eXOF (BCEAO)', symbol: 'eXOF', logo: '🇸🇳', status: 'pilot', pilotPhase: true, exposure: 0, yield: '4.2% APY', backing: 'Gouvernement BCEAO', description: 'CBDC officielle de la zone UEMOA — déploiement pilote phase 2 en 2025. Koppar-Diambar est partenaire de test.', color: '#2D6A4F' },
    { name: 'USDC', symbol: 'USDC', logo: '🔵', status: 'active', pilotPhase: false, exposure: 85_000, yield: '5.1% APY', backing: 'Circle — Réserves USD', description: 'Stablecoin USD le plus régulé, utilisé pour les transferts instantanés USD.', color: '#2775CA' },
    { name: 'EURC', symbol: 'EURC', logo: '🇪🇺', status: 'active', pilotPhase: false, exposure: 42_000, yield: '3.8% APY', backing: 'Circle — Réserves EUR', description: 'Stablecoin EUR pour les clients avec exposition européenne.', color: '#003087' },
    { name: 'XAUT (Or tokenisé)', symbol: 'XAUT', logo: '🥇', status: 'monitoring', pilotPhase: false, exposure: 15_000, yield: '1.2% APY', backing: '1 XAUT = 1 troy oz or', description: 'Or tokenisé — exposition à l\'or physique via blockchain Ethereum.', color: '#E9A319' },
];

// ── Crowdfunding PME ───────────────────────────────────────────────────────
const CROWDFUNDING_PROJECTS = [
    {
        id: 'CF01', nom: 'Atlantic Fresh — Poissonnerie industrielle', secteur: '🐟 Agroalimentaire',
        ville: 'Dakar, Sénégal', objectif: 250_000_000, collecte: 187_500_000,
        rendementCible: '14% / an', duree: '3 ans', promoteur: 'Abdou Diaw & Associés',
        investisseurs: 12, minInvestissement: 5_000_000, statut: 'open',
        riskScore: 'B+', daysLeft: 18,
        description: 'Création d\'une poissonnerie industrielle avec chambre froide de 500T et distribution B2B vers les restaurants et hôtels de la CEDEAO.',
    },
    {
        id: 'CF02', nom: 'SolarSen — Énergie solaire rurale', secteur: '☀️ Énergie verte',
        ville: 'Kaolack & Tambacounda', objectif: 500_000_000, collecte: 500_000_000,
        rendementCible: '12% / an', duree: '5 ans', promoteur: 'SolarSen SA',
        investisseurs: 28, minInvestissement: 10_000_000, statut: 'funded',
        riskScore: 'A-', daysLeft: 0,
        description: 'Déploiement de 500 kWc de panneaux solaires dans 3 régions sénégalaises. Contrat de rachat garanti par SENELEC.',
    },
    {
        id: 'CF03', nom: 'DigiFarm — Agritech Sénégal', secteur: '🌾 Agriculture numérique',
        ville: 'Saint-Louis, Sénégal', objectif: 150_000_000, collecte: 45_000_000,
        rendementCible: '16% / an', duree: '4 ans', promoteur: 'DigiFarm SARL',
        investisseurs: 5, minInvestissement: 2_500_000, statut: 'open',
        riskScore: 'B', daysLeft: 35,
        description: 'Plateforme tech d\'optimisation des rendements agricoles via IoT et IA — 2 000 hectares déjà sous contrat.',
    },
];

// ── Helpers ───────────────────────────────────────────────────────────────
function prog(c, t) { return Math.min(100, Math.round((c / t) * 100)); }
function fmtFCFA(v) { return v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + 'M FCFA' : v.toLocaleString('fr-FR') + ' FCFA'; }

export default function AfricanPayments() {
    const [activeTab, setActiveTab] = useState('mobile');
    const [modal, setModal] = useState(null);
    const [swiftForm, setSwiftForm] = useState({ montant: '', devise: 'FCFA', destinataire: '', iban: '', motif: '', type: 'SWIFT' });

    const totalMobileMoney = MOBILE_MONEY.filter(m => m.status === 'connected').reduce((s, m) => s + (m.currency === 'FCFA' ? m.balance : 0), 0);
    const totalBanques = AFRICAN_BANKS.filter(b => b.status === 'synced').reduce((s, b) => s + b.balance, 0);
    const totalStable = STABLECOINS.filter(s => s.exposure > 0).reduce((s, c) => s + c.exposure, 0);
    const crowdfundingInvesti = CROWDFUNDING_PROJECTS.filter(p => p.investisseurs > 0).reduce((s, p) => s + p.collecte, 0);

    const tabs = [
        ['mobile', '📱 Mobile Money'],
        ['swift', '🌐 SWIFT & RTGS BCEAO'],
        ['banks', '🏦 Multi-Banques Africaines'],
        ['stablecoin', '🪙 Stablecoins & eXOF'],
        ['crowdfunding', '🤝 Crowdfunding PME'],
    ];

    return (
        <div className="page-content">
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #E9A319)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 0 20px rgba(5,150,105,0.4)' }}>🌍</div>
                    <div>
                        <h1 style={{ marginBottom: 0 }}>Paiements Africains Natifs</h1>
                        <p style={{ marginBottom: 0 }}>Wave · Orange Money · RTGS BCEAO · SWIFT · eXOF · Crowdfunding PME</p>
                    </div>
                </div>
                <button className="btn btn-primary"><Plus size={14} /> Nouvelle opération</button>
            </div>

            {/* KPIs */}
            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper">
                    <div className="stat-icon"><Smartphone size={20} /></div>
                    <div className="stat-value">{fmtFCFA(totalMobileMoney)}</div>
                    <div className="stat-label">Soldes Mobile Money</div>
                </div>
                <div className="stat-card diamond">
                    <div className="stat-icon"><Building size={20} /></div>
                    <div className="stat-value">{fmtFCFA(totalBanques)}</div>
                    <div className="stat-label">Soldes bancaires Afrique</div>
                </div>
                <div className="stat-card success">
                    <div className="stat-icon"><Coins size={20} /></div>
                    <div className="stat-value">${totalStable.toLocaleString()}</div>
                    <div className="stat-label">Exposition stablecoins</div>
                </div>
                <div className="stat-card warning">
                    <div className="stat-icon"><Users size={20} /></div>
                    <div className="stat-value">{fmtFCFA(crowdfundingInvesti)}</div>
                    <div className="stat-label">Crowdfunding investi</div>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
                {tabs.map(([k, l]) => (
                    <button key={k} className={`tab ${activeTab === k ? 'active' : ''}`}
                        onClick={() => setActiveTab(k)}>{l}</button>
                ))}
            </div>

            {/* ── MOBILE MONEY ────────────────────────────────────────────────── */}
            {activeTab === 'mobile' && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                        {MOBILE_MONEY.map(mm => (
                            <div key={mm.provider} className="card" style={{ borderLeft: `4px solid ${mm.color}`, opacity: mm.status === 'inactive' ? 0.5 : 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: mm.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{mm.logo}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 13 }}>{mm.provider}</div>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{mm.country}</div>
                                        </div>
                                    </div>
                                    <span style={{
                                        fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700,
                                        background: mm.status === 'connected' ? 'rgba(52,211,153,0.1)' : 'rgba(255,255,255,0.06)',
                                        color: mm.status === 'connected' ? 'var(--kd-success)' : 'var(--text-muted)'
                                    }}>{mm.status === 'connected' ? '● Connecté' : '○ Inactif'}</span>
                                </div>
                                {mm.status === 'connected' ? (
                                    <>
                                        <div style={{ fontSize: 20, fontWeight: 900, color: mm.color, fontVariantNumeric: 'tabular-nums', marginBottom: 2 }}>{mm.balance.toLocaleString('fr-FR')} FCFA</div>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>Frais : {mm.fees} • Synco : il y a {mm.lastSync}</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                                            <button className="btn btn-primary btn-sm" style={{ fontSize: 10 }} onClick={() => setModal({ type: 'depot', provider: mm })}>⬇️ Déposer</button>
                                            <button className="btn btn-ghost btn-sm" style={{ fontSize: 10 }} onClick={() => setModal({ type: 'retrait', provider: mm })}>⬆️ Retirer</button>
                                        </div>
                                    </>
                                ) : (
                                    <button className="btn btn-ghost btn-sm" style={{ width: '100%', fontSize: 11, marginTop: 'var(--space-2)' }}>+ Connecter</button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Transactions récentes */}
                    <div className="card">
                        <div className="card-header"><h3>📋 Transactions Mobile Money récentes</h3></div>
                        <table className="data-table">
                            <thead><tr><th>Provider</th><th>Date</th><th>Opération</th><th>Client</th><th>Montant</th><th>Statut</th></tr></thead>
                            <tbody>
                                {MOBILE_MONEY.flatMap(mm => mm.transactions.map(tx => ({ ...tx, provider: mm.provider, color: mm.color, logo: mm.logo }))).sort((a, b) => b.date > a.date ? 1 : -1).map((tx, i) => (
                                    <tr key={i}>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}><span style={{ fontSize: 16 }}>{tx.logo}</span><span style={{ fontWeight: 600 }}>{tx.provider}</span></div></td>
                                        <td style={{ fontSize: 12 }}>{tx.date}/2025</td>
                                        <td><span style={{ fontSize: 10, padding: '2px 7px', background: tx.type === 'depot' ? 'rgba(52,211,153,0.1)' : 'rgba(239,68,68,0.1)', color: tx.type === 'depot' ? 'var(--kd-success)' : 'var(--kd-danger)', borderRadius: 4, fontWeight: 700 }}>{tx.type === 'depot' ? '⬇️ Dépôt' : '⬆️ Retrait'}</span></td>
                                        <td style={{ fontSize: 12 }}>{tx.label.replace('Dépôt ', '').replace('Retrait ', '')}</td>
                                        <td style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: tx.type === 'depot' ? 'var(--kd-success)' : 'var(--kd-danger)' }}>{tx.type === 'depot' ? '+' : '-'}{tx.montant.toLocaleString('fr-FR')} FCFA</td>
                                        <td><span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 700, background: tx.statut === 'success' ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)', color: tx.statut === 'success' ? 'var(--kd-success)' : 'var(--kd-warning)' }}>{tx.statut === 'success' ? '✓ Exécuté' : '⏳ En attente'}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── SWIFT & RTGS ────────────────────────────────────────────────── */}
            {activeTab === 'swift' && (
                <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {SWIFT_TRANSFERS.map(tr => (
                            <div key={tr.id} className="card" style={{ borderLeft: `4px solid ${tr.type === 'RTGS BCEAO' ? 'var(--kd-copper)' : 'var(--kd-info)'}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                    <div>
                                        <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                                            <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, fontWeight: 700, background: tr.type === 'RTGS BCEAO' ? 'rgba(200,121,65,0.1)' : 'rgba(126,184,218,0.1)', color: tr.type === 'RTGS BCEAO' ? 'var(--kd-copper-light)' : 'var(--kd-info)' }}>{tr.type}</span>
                                            <span className="tag" style={{ fontSize: 10 }}>{tr.id}</span>
                                        </div>
                                        <div style={{ fontWeight: 600, fontSize: 14 }}>{tr.destinataire}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{tr.iban} • SWIFT: {tr.swift}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{tr.motif}</div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--kd-copper-light)', fontVariantNumeric: 'tabular-nums' }}>{tr.montant.toLocaleString('fr-FR')} {tr.devise}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{tr.date} • {tr.delai}</div>
                                        <span style={{
                                            fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700, marginTop: 4, display: 'inline-block',
                                            background: tr.statut === 'executed' ? 'rgba(52,211,153,0.1)' : tr.statut === 'processing' ? 'rgba(200,121,65,0.1)' : 'rgba(245,158,11,0.1)',
                                            color: tr.statut === 'executed' ? 'var(--kd-success)' : tr.statut === 'processing' ? 'var(--kd-copper-light)' : 'var(--kd-warning)',
                                        }}>{tr.statut === 'executed' ? '✓ Exécuté' : tr.statut === 'processing' ? '⏳ En cours' : '🕐 En attente'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Formulaire nouveau virement */}
                    <div className="card" style={{ border: '1px solid rgba(200,121,65,0.2)' }}>
                        <div className="card-header"><h3>💸 Nouveau virement international</h3></div>
                        {[
                            { label: 'Type', field: 'type', type: 'select', opts: ['SWIFT', 'RTGS BCEAO', 'SEPA'] },
                            { label: 'Montant', field: 'montant', type: 'number', placeholder: 'Ex: 50000' },
                            { label: 'Devise', field: 'devise', type: 'select', opts: ['FCFA', 'USD', 'EUR', 'GBP', 'GHS', 'NGN'] },
                            { label: 'Destinataire', field: 'destinataire', type: 'text', placeholder: 'Nom de la banque / personne' },
                            { label: 'IBAN / Numéro de compte', field: 'iban', type: 'text', placeholder: 'FR76 3000...' },
                            { label: 'Motif', field: 'motif', type: 'text', placeholder: 'Objet du virement' },
                        ].map(f => (
                            <div className="form-group" key={f.field}>
                                <label htmlFor={f.field}>{f.label}</label>
                                {f.type === 'select' ? (
                                    <select id={f.field} value={swiftForm[f.field]} onChange={e => setSwiftForm(p => ({ ...p, [f.field]: e.target.value }))}>
                                        {f.opts.map(o => <option key={o}>{o}</option>)}
                                    </select>
                                ) : (
                                    <input type={f.type} id={f.field} placeholder={f.placeholder} value={swiftForm[f.field]} onChange={e => setSwiftForm(p => ({ ...p, [f.field]: e.target.value }))} />
                                )}
                            </div>
                        ))}
                        <div style={{ padding: 'var(--space-3)', background: 'rgba(200,121,65,0.06)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
                            🛡️ Virement soumis à validation 2FA • SWIFT messaging sécurisé • Conformité FATF
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%' }}><Send size={14} /> Initier le virement</button>
                    </div>
                </div>
            )}

            {/* ── MULTI-BANQUES ────────────────────────────────────────────────── */}
            {activeTab === 'banks' && (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                        {AFRICAN_BANKS.map(bank => (
                            <div key={bank.name} className="card" style={{ opacity: bank.status === 'inactive' ? 0.5 : 1, borderTop: `3px solid ${bank.color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                        <span style={{ fontSize: 22 }}>{bank.logo}</span>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 13 }}>{bank.name}</div>
                                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{bank.pays}</div>
                                        </div>
                                    </div>
                                    <span style={{
                                        fontSize: 10, padding: '2px 7px', borderRadius: 'var(--radius-full)', fontWeight: 700,
                                        background: bank.status === 'synced' ? 'rgba(52,211,153,0.1)' : bank.status === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.06)',
                                        color: bank.status === 'synced' ? 'var(--kd-success)' : bank.status === 'error' ? 'var(--kd-danger)' : 'var(--text-muted)',
                                    }}>{bank.status === 'synced' ? '● Synco' : bank.status === 'error' ? '⚠ Erreur' : '○ Inactif'}</span>
                                </div>
                                {bank.status !== 'inactive' ? (
                                    <>
                                        <div style={{ fontSize: 18, fontWeight: 800, color: bank.color, fontVariantNumeric: 'tabular-nums', marginBottom: 4 }}>{fmtFCFA(bank.balance)}</div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>{bank.comptes} compte(s) • {bank.status === 'synced' ? `Synco il y a ${bank.synced}` : '⚠️ Reconnexion requise'}</div>
                                        {bank.iban && <div style={{ fontFamily: 'monospace', fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '4px 8px', borderRadius: 4, marginBottom: 'var(--space-3)' }}>{bank.iban}</div>}
                                        <button className="btn btn-ghost btn-sm" style={{ width: '100%', fontSize: 11 }}>
                                            {bank.status === 'error' ? '🔄 Reconnecter' : '📋 Voir détails'}
                                        </button>
                                    </>
                                ) : (
                                    <button className="btn btn-ghost btn-sm" style={{ width: '100%', fontSize: 11 }}>+ Connecter {bank.name}</button>
                                )}
                            </div>
                        ))}
                        {/* Ajouter une banque */}
                        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-3)', cursor: 'pointer', border: '1px dashed var(--border-primary)', background: 'transparent', minHeight: 160 }}>
                            <Plus size={24} style={{ color: 'var(--text-muted)' }} />
                            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>Connecter une banque africaine</span>
                        </div>
                    </div>

                    <div className="card" style={{ background: 'rgba(200,121,65,0.03)', border: '1px solid rgba(200,121,65,0.15)' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--kd-copper-light)', marginBottom: 'var(--space-3)' }}>🌍 Couverture Open Banking Afrique — Partenariats Koppar-Diambar</div>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)' }}>
                            {['Sénégal', "Côte d'Ivoire", 'Burkina Faso', 'Mali', 'Niger', 'Togo', 'Bénin', 'Guinée-Bissau'].map(pays => (
                                <span key={pays} style={{ padding: '3px 10px', background: 'rgba(82,183,136,0.1)', borderRadius: 'var(--radius-full)', color: 'var(--kd-success)', fontWeight: 600 }}>🌿 {pays}</span>
                            ))}
                            <span style={{ padding: '3px 10px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-full)', fontStyle: 'italic' }}>+ Nigeria, Ghana, Kenya (Q3 2025)</span>
                        </div>
                    </div>
                </div>
            )}

            {/* ── STABLECOINS & eXOF ──────────────────────────────────────────── */}
            {activeTab === 'stablecoin' && (
                <div>
                    {/* Bannière eXOF */}
                    <div style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', background: 'linear-gradient(135deg, rgba(45,106,79,0.15), rgba(82,183,136,0.08))', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(82,183,136,0.3)', display: 'flex', alignItems: 'center', gap: 'var(--space-5)' }}>
                        <div style={{ fontSize: 48 }}>🇸🇳</div>
                        <div>
                            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--kd-success)' }}>eXOF — CBDC Officielle BCEAO</div>
                            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, maxWidth: 600, lineHeight: 1.6 }}>
                                Koppar-Diambar est <strong style={{ color: 'var(--kd-copper-light)' }}>partenaire officiel de la phase pilote eXOF</strong> de la BCEAO. Le franc CFA numérique est en déploiement progressif dans les 8 pays UEMOA avec un objectif de lancement grand public en Q4 2025.
                            </div>
                            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
                                <span className="badge badge-green">✓ Statut : Partenaire Phase Pilote 2</span>
                                <span className="badge badge-indigo">📨 Allocation testeurs : 50 000 eXOF</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid-2">
                        {STABLECOINS.map(sc => (
                            <div key={sc.symbol} className="card" style={{ borderLeft: `4px solid ${sc.color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: `${sc.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{sc.logo}</div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 14 }}>{sc.name}</div>
                                            <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-muted)' }}>{sc.symbol}</div>
                                        </div>
                                    </div>
                                    <span style={{
                                        fontSize: 10, padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700,
                                        background: sc.status === 'active' ? 'rgba(52,211,153,0.1)' : sc.status === 'pilot' ? 'rgba(200,121,65,0.1)' : 'rgba(255,255,255,0.06)',
                                        color: sc.status === 'active' ? 'var(--kd-success)' : sc.status === 'pilot' ? 'var(--kd-copper-light)' : 'var(--text-muted)',
                                    }}>{sc.status === 'active' ? '● Actif' : sc.status === 'pilot' ? '🧪 Pilote' : '👁 Surveillance'}</span>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                                    <div style={{ padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Exposition</div>
                                        <div style={{ fontWeight: 800, fontSize: 14, color: sc.color }}>{sc.exposure > 0 ? `$${sc.exposure.toLocaleString()}` : '—'}</div>
                                    </div>
                                    <div style={{ padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Rendement</div>
                                        <div style={{ fontWeight: 800, fontSize: 14, color: 'var(--kd-success)' }}>{sc.yield}</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-3)' }}>{sc.description}</div>
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', padding: 'var(--space-2)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-sm)' }}>
                                    🔒 Backing : {sc.backing}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── CROWDFUNDING PME ────────────────────────────────────────────── */}
            {activeTab === 'crowdfunding' && (
                <div>
                    <div style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-5)', background: 'rgba(200,121,65,0.06)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(200,121,65,0.2)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        <Shield size={14} style={{ color: 'var(--kd-copper)', marginRight: 6, verticalAlign: 'middle' }} />
                        <strong>Crowdfunding réglementé CREPMF</strong>{' '}— Projets vérifiés et approuvés par le Conseil Régional de l&apos;Épargne Publique. Réservé aux clients HNW (&gt;5M FCFA min). Rendements non garantis — investissements à risque.
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                        {CROWDFUNDING_PROJECTS.map(proj => {
                            const pct = prog(proj.collecte, proj.objectif);
                            return (
                                <div key={proj.id} className="card" style={{ borderTop: `4px solid ${proj.statut === 'funded' ? 'var(--kd-success)' : 'var(--kd-copper)'}` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                                                <span className="tag" style={{ fontSize: 11 }}>{proj.secteur}</span>
                                                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: proj.riskScore.startsWith('A') ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)', color: proj.riskScore.startsWith('A') ? 'var(--kd-success)' : 'var(--kd-warning)', fontWeight: 700 }}>Risque {proj.riskScore}</span>
                                                <span className={`${proj.statut === 'funded' ? 'badge-green' : 'badge-gold'} badge`} style={{ fontSize: 10 }}>{proj.statut === 'funded' ? '✅ Financé' : `🕐 ${proj.daysLeft}j restants`}</span>
                                            </div>
                                            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 'var(--space-2)' }}>{proj.nom}</h3>
                                            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-3)' }}>📍 {proj.ville} • 👤 {proj.promoteur}</div>
                                            <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 600 }}>{proj.description}</p>
                                        </div>
                                        <div style={{ width: 180, flexShrink: 0, textAlign: 'right', paddingLeft: 'var(--space-4)' }}>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 2 }}>Rendement cible</div>
                                            <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--kd-success)', marginBottom: 4 }}>{proj.rendementCible}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Durée : {proj.duree}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Ticket min : {fmtFCFA(proj.minInvestissement)}</div>
                                            <div style={{ fontSize: 11, color: 'var(--kd-copper-light)', marginTop: 4 }}>👥 {proj.investisseurs} investisseurs KD</div>
                                        </div>
                                    </div>

                                    {/* Progression */}
                                    <div style={{ marginBottom: 'var(--space-4)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 'var(--space-2)' }}>
                                            <span style={{ color: 'var(--text-muted)' }}>Collecté : <strong style={{ color: 'var(--kd-copper-light)' }}>{fmtFCFA(proj.collecte)}</strong></span>
                                            <span style={{ color: 'var(--text-muted)' }}>Objectif : {fmtFCFA(proj.objectif)} — <strong style={{ color: pct === 100 ? 'var(--kd-success)' : 'var(--kd-copper-light)' }}>{pct}%</strong></span>
                                        </div>
                                        <div className="progress-bar" style={{ height: 10 }}>
                                            <div className="progress-fill" style={{ width: `${pct}%`, background: pct === 100 ? 'var(--kd-success)' : 'var(--kd-copper)' }} />
                                        </div>
                                    </div>

                                    {proj.statut === 'open' && (
                                        <button className="btn btn-primary"><TrendingUp size={13} /> Investir dans ce projet</button>
                                    )}
                                    {proj.statut === 'funded' && (
                                        <button className="btn btn-ghost"><Download size={13} /> Voir le rapport d'impact</button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── MODAL DÉPÔT / RETRAIT ────────────────────────────────────────── */}
            {modal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: 'var(--radius-xl)', width: 420, padding: 'var(--space-7)', boxShadow: '0 24px 48px rgba(0,0,0,0.5)' }}>
                        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 'var(--space-2)' }}>
                            {modal.type === 'depot' ? '⬇️ Dépôt via' : '⬆️ Retrait vers'} {modal.provider.provider}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 'var(--space-5)' }}>
                            Solde disponible : <strong>{modal.provider.balance.toLocaleString('fr-FR')} FCFA</strong> • Frais : {modal.provider.fees}
                        </div>
                        <div className="form-group">
                            <label>Client</label>
                            <select><option>Ousmane N'Diaye</option><option>Aminata Sow</option><option>Cheikh K. Ba</option></select>
                        </div>
                        <div className="form-group">
                            <label>Montant (FCFA)</label>
                            <input type="number" placeholder="Ex: 500000" />
                        </div>
                        <div className="form-group">
                            <label>Numéro {modal.provider.provider}</label>
                            <input type="tel" placeholder="+221 77 XXX XX XX" />
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
                            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setModal(null)}>Annuler</button>
                            <button className="btn btn-primary" style={{ flex: 1 }}>✓ Confirmer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
