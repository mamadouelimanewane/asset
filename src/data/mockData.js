// ═══════════════════════════════════════════════════════════
//  KOPPAR-DIAMBAR — Couche de données simulées
// ═══════════════════════════════════════════════════════════

export const firmProfile = {
  name: "Koppar-Diambar",
  firmName: "KD Wealth Advisors",
  advisor: "Moussa Diallo",
  aum: 245_800_000,
  clientCount: 187,
  householdCount: 142,
  annualRevenue: 1_832_500,
  founded: "2019",
  regulatoryId: "ADV-2019-4582",
};

export const dashboardStats = {
  totalAUM: { value: 245_800_000, change: 3.2, label: "Total AUM" },
  clients: { value: 187, change: 5, label: "Active Clients" },
  revenue: { value: 1_832_500, change: 8.4, label: "Annual Revenue" },
  newAccounts: { value: 12, change: 20, label: "New Accounts (MTD)" },
  avgReturn: { value: 14.7, change: 2.1, label: "Avg Return (YTD)" },
  pendingTransfers: { value: 8, change: 0, label: "Pending Transfers" },
};

export const clients = [
  { id: "C001", name: "Aminata Sow", email: "aminata.sow@mail.com", phone: "+221 77 654 3210", type: "Individual", status: "Active", aum: 2_450_000, accounts: 3, riskProfile: "Moderate", household: "Famille Sow", onboardDate: "2023-03-15", lastContact: "2025-02-18" },
  { id: "C002", name: "Ousmane N'Diaye", email: "ousmane.nd@mail.com", phone: "+221 77 123 4567", type: "Individual", status: "Active", aum: 5_800_000, accounts: 5, riskProfile: "Aggressive", household: "Fiducie N'Diaye", onboardDate: "2022-01-10", lastContact: "2025-02-20" },
  { id: "C003", name: "Fatou Diop Industries", email: "fatou@diop-ind.com", phone: "+221 77 888 9900", type: "Corporate", status: "Active", aum: 18_500_000, accounts: 8, riskProfile: "Conservative", household: "Diop Industries", onboardDate: "2021-06-20", lastContact: "2025-02-15" },
  { id: "C004", name: "Ibrahima Fall", email: "ibrahima.fall@mail.com", phone: "+221 77 444 5566", type: "Individual", status: "Active", aum: 1_200_000, accounts: 2, riskProfile: "Moderate", household: "Ménage Fall", onboardDate: "2024-01-05", lastContact: "2025-02-10" },
  { id: "C005", name: "Aissatou Konaté", email: "aissatou.k@mail.com", phone: "+221 77 333 4455", type: "Individual", status: "Inactive", aum: 890_000, accounts: 2, riskProfile: "Conservative", household: "Famille Konaté", onboardDate: "2023-07-22", lastContact: "2024-12-01" },
  { id: "C006", name: "Fondation Modou Gueye", email: "contact@gueye-fdn.org", phone: "+221 77 999 1122", type: "Institutional", status: "Active", aum: 35_000_000, accounts: 12, riskProfile: "Moderate", household: "Fondation Gueye", onboardDate: "2020-09-01", lastContact: "2025-02-19" },
  { id: "C007", name: "Cheikh K. Ba", email: "cheikh.ba@mail.com", phone: "+221 77 555 6677", type: "Individual", status: "Active", aum: 3_750_000, accounts: 4, riskProfile: "Aggressive", household: "Famille Ba", onboardDate: "2022-11-14", lastContact: "2025-02-21" },
  { id: "C008", name: "Mariama Tall", email: "mariama.t@mail.com", phone: "+221 77 666 7788", type: "Individual", status: "Active", aum: 950_000, accounts: 2, riskProfile: "Conservative", household: "Ménage Tall", onboardDate: "2024-06-12", lastContact: "2025-01-28" },
];

export const accountTypes = [
  "Courtage individuel", "Co-titulaires", "Compte fiduciaire", "IRA Traditionnel",
  "IRA Roth", "SEP IRA", "Roulement 401(k)", "Compte entreprise",
  "Compte société en nom collectif", "Compte LLC", "Compte succession", "Compte de garde (UGMA)",
  "Compte de garde (UTMA)", "Compte fondation", "Fonds de pension", "Fonds orienté par le donateur",
  "Plan éducation 529", "Épargne santé (HSA)", "Entreprise individuelle", "Organisme à but non lucratif",
  "Entité gouvernementale", "Fiducie résiduaire de bienfaisance", "Fiducie principale de bienfaisance",
  "Fiducie irrévocable", "Fiducie révocable", "Biens communautaires",
  "Copropriété intégrale", "SIMPLE IRA", "Compte ABLE", "Coverdell ESA",
  "Plan de participation aux bénéfices", "Plan d'achat monétaire",
];

export const portfolioModels = [
  { id: "M001", name: "KD Croissance Alpha", category: "Croissance", strategy: "Dominante actions", allocation: { equity: 80, fixedIncome: 10, alternatives: 5, cash: 5 }, ytdReturn: 18.3, fee: 0.15, risk: "Élevé", subscribers: 45 },
  { id: "M002", name: "KD Équilibré", category: "Équilibré", strategy: "60/40", allocation: { equity: 60, fixedIncome: 30, alternatives: 5, cash: 5 }, ytdReturn: 12.1, fee: 0.12, risk: "Modéré", subscribers: 68 },
  { id: "M003", name: "KD Revenu Plus", category: "Revenu", strategy: "Dividendes & Obligations", allocation: { equity: 35, fixedIncome: 50, alternatives: 5, cash: 10 }, ytdReturn: 8.4, fee: 0.10, risk: "Faible-Modéré", subscribers: 34 },
  { id: "M004", name: "KD Opportunités Mondiales", category: "International", strategy: "Diversification mondiale", allocation: { equity: 70, fixedIncome: 15, alternatives: 10, cash: 5 }, ytdReturn: 15.7, fee: 0.18, risk: "Élevé", subscribers: 28 },
  { id: "M005", name: "KD Impact ESG", category: "ESG", strategy: "Investissement durable", allocation: { equity: 65, fixedIncome: 20, alternatives: 10, cash: 5 }, ytdReturn: 13.9, fee: 0.14, risk: "Modéré", subscribers: 52 },
  { id: "M006", name: "KD Bouclier Conservateur", category: "Conservateur", strategy: "Préservation du capital", allocation: { equity: 20, fixedIncome: 60, alternatives: 5, cash: 15 }, ytdReturn: 5.2, fee: 0.08, risk: "Faible", subscribers: 41 },
  { id: "M007", name: "KD Innovation Tech", category: "Sectoriel", strategy: "Focus technologie", allocation: { equity: 90, fixedIncome: 0, alternatives: 5, cash: 5 }, ytdReturn: 24.6, fee: 0.22, risk: "Très élevé", subscribers: 19 },
  { id: "M008", name: "KD Retraite 2040", category: "Cible temporelle", strategy: "Glissière 2040", allocation: { equity: 70, fixedIncome: 20, alternatives: 5, cash: 5 }, ytdReturn: 14.2, fee: 0.10, risk: "Modéré", subscribers: 37 },
];

export const recentTrades = [
  { id: "T001", date: "2025-02-21", client: "Ousmane N'Diaye", ticker: "AAPL", action: "Buy", shares: 150, price: 228.50, total: 34_275, status: "Executed", type: "Rebalance" },
  { id: "T002", date: "2025-02-21", client: "Fatou Diop Industries", ticker: "MSFT", action: "Sell", shares: 200, price: 415.30, total: 83_060, status: "Executed", type: "Manual" },
  { id: "T003", date: "2025-02-20", client: "Aminata Sow", ticker: "VOO", action: "Buy", shares: 50, price: 523.10, total: 26_155, status: "Executed", type: "Rebalance" },
  { id: "T004", date: "2025-02-20", client: "Cheikh K. Ba", ticker: "AMZN", action: "Buy", shares: 100, price: 215.80, total: 21_580, status: "Pending", type: "Manual" },
  { id: "T005", date: "2025-02-19", client: "Fondation Modou Gueye", ticker: "BND", action: "Buy", shares: 500, price: 72.45, total: 36_225, status: "Executed", type: "Rebalance" },
  { id: "T006", date: "2025-02-19", client: "Ibrahima Fall", ticker: "TSLA", action: "Sell", shares: 30, price: 350.20, total: 10_506, status: "Executed", type: "TLH" },
  { id: "T007", date: "2025-02-18", client: "Aminata Sow", ticker: "GOOGL", action: "Buy", shares: 75, price: 178.90, total: 13_417.50, status: "Executed", type: "Rebalance" },
  { id: "T008", date: "2025-02-18", client: "Mariama Tall", ticker: "QQQ", action: "Buy", shares: 25, price: 525.60, total: 13_140, status: "Executed", type: "Manual" },
];

export const billingSchedules = [
  { id: "B001", household: "Famille Sow", method: "AUM %", rate: "0,85%", frequency: "Quarterly", lastBilled: "2025-01-02", nextBill: "2025-04-01", lastAmount: 5_206, ytdBilled: 5_206, status: "Current" },
  { id: "B002", household: "Fiducie N'Diaye", method: "AUM %", rate: "0,75%", frequency: "Quarterly", lastBilled: "2025-01-02", nextBill: "2025-04-01", lastAmount: 10_875, ytdBilled: 10_875, status: "Current" },
  { id: "B003", household: "Diop Industries", method: "AUM % + Forfait", rate: "0,65% + 2 500 $/trim.", frequency: "Quarterly", lastBilled: "2025-01-02", nextBill: "2025-04-01", lastAmount: 32_562, ytdBilled: 32_562, status: "Current" },
  { id: "B004", household: "Ménage Fall", method: "Forfait", rate: "500 $/mois", frequency: "Monthly", lastBilled: "2025-02-01", nextBill: "2025-03-01", lastAmount: 500, ytdBilled: 1_000, status: "Current" },
  { id: "B005", household: "Fondation Gueye", method: "AUM %", rate: "0,55%", frequency: "Quarterly", lastBilled: "2025-01-02", nextBill: "2025-04-01", lastAmount: 48_125, ytdBilled: 48_125, status: "Current" },
  { id: "B006", household: "Famille Ba", method: "AUM %", rate: "0,80%", frequency: "Quarterly", lastBilled: "2025-01-02", nextBill: "2025-04-01", lastAmount: 7_500, ytdBilled: 7_500, status: "Current" },
];

export const performanceData = [
  { month: "Mars", portfolio: 4.2, benchmark: 3.8 },
  { month: "Avr", portfolio: -1.3, benchmark: -2.1 },
  { month: "Mai", portfolio: 3.8, benchmark: 2.9 },
  { month: "Juin", portfolio: 5.1, benchmark: 4.5 },
  { month: "Juil", portfolio: 2.6, benchmark: 3.1 },
  { month: "Août", portfolio: -0.8, benchmark: -1.5 },
  { month: "Sept", portfolio: 1.9, benchmark: 1.2 },
  { month: "Oct", portfolio: 4.7, benchmark: 3.9 },
  { month: "Nov", portfolio: 6.2, benchmark: 5.1 },
  { month: "Déc", portfolio: 3.4, benchmark: 2.8 },
  { month: "Jan", portfolio: 5.8, benchmark: 4.6 },
  { month: "Fév", portfolio: 2.1, benchmark: 1.7 },
];

export const aumHistoryData = [
  { month: "Mars", aum: 198 },
  { month: "Avr", aum: 195 },
  { month: "Mai", aum: 205 },
  { month: "Juin", aum: 212 },
  { month: "Juil", aum: 218 },
  { month: "Août", aum: 215 },
  { month: "Sept", aum: 220 },
  { month: "Oct", aum: 228 },
  { month: "Nov", aum: 235 },
  { month: "Déc", aum: 238 },
  { month: "Jan", aum: 242 },
  { month: "Fév", aum: 245.8 },
];

export const taxHarvestingData = [
  { id: "TH001", client: "Ousmane N'Diaye", security: "TSLA", lossHarvested: 12_340, replacement: "VTI", date: "2025-02-15", status: "Completed" },
  { id: "TH002", client: "Cheikh K. Ba", security: "NFLX", lossHarvested: 5_680, replacement: "VGT", date: "2025-02-10", status: "Completed" },
  { id: "TH003", client: "Aminata Sow", security: "META", lossHarvested: 3_200, replacement: "QQQ", date: "2025-02-08", status: "Completed" },
  { id: "TH004", client: "Fatou Diop Industries", security: "BABA", lossHarvested: 28_500, replacement: "VWO", date: "2025-01-25", status: "Completed" },
  { id: "TH005", client: "Ibrahima Fall", security: "PYPL", lossHarvested: 2_100, replacement: "XLF", date: "2025-01-18", status: "Pending Review" },
];

export const taxSavingsSummary = {
  totalHarvested: 51_820,
  estimatedSavings: 15_546,
  accountsMonitored: 142,
  avgSavingsPerClient: 830,
  ytdHarvestEvents: 34,
};

export const integrations = [
  { id: "INT01", name: "Salesforce CRM", category: "CRM", status: "Connected", lastSync: "21 fév. 2025 14:30", icon: "💼" },
  { id: "INT02", name: "Redtail CRM", category: "CRM", status: "Available", lastSync: null, icon: "📋" },
  { id: "INT03", name: "MoneyGuidePro", category: "Planification financière", status: "Connected", lastSync: "21 fév. 2025 09:00", icon: "📊" },
  { id: "INT04", name: "eMoney Advisor", category: "Planification financière", status: "Available", lastSync: null, icon: "💰" },
  { id: "INT05", name: "Riskalyze", category: "Évaluation du risque", status: "Connected", lastSync: "20 fév. 2025 18:00", icon: "⚖️" },
  { id: "INT06", name: "Orion Portfolio", category: "Analyse de portefeuille", status: "Available", lastSync: null, icon: "🔭" },
  { id: "INT07", name: "DocuSign", category: "Gestion documentaire", status: "Connected", lastSync: "21 fév. 2025 11:45", icon: "✍️" },
  { id: "INT08", name: "Wealthbox", category: "CRM", status: "Available", lastSync: null, icon: "📦" },
  { id: "INT09", name: "Right Capital", category: "Planification financière", status: "Connected", lastSync: "19 fév. 2025 16:20", icon: "🏦" },
  { id: "INT10", name: "Zapier", category: "Automatisation", status: "Connected", lastSync: "21 fév. 2025 15:00", icon: "⚡" },
];

export const transfersACATs = [
  { id: "ACT001", client: "Ibrahima Fall", fromInstitution: "Fidelity", accountType: "IRA Traditionnel", estimatedValue: 450_000, status: "In Progress", initiated: "2025-02-18", estimatedCompletion: "2025-02-25" },
  { id: "ACT002", client: "Mariama Tall", fromInstitution: "Charles Schwab", accountType: "Courtage individuel", estimatedValue: 320_000, status: "Completed", initiated: "2025-02-10", estimatedCompletion: "2025-02-17" },
  { id: "ACT003", client: "Aissatou Konaté", fromInstitution: "Vanguard", accountType: "IRA Roth", estimatedValue: 180_000, status: "Pending Approval", initiated: "2025-02-20", estimatedCompletion: "2025-02-28" },
  { id: "ACT004", client: "Cheikh K. Ba", fromInstitution: "TD Ameritrade", accountType: "Co-titulaires", estimatedValue: 750_000, status: "In Progress", initiated: "2025-02-15", estimatedCompletion: "2025-02-24" },
];

export const cashAccounts = [
  { id: "HYC001", client: "Aminata Sow", balance: 125_000, yield: 4.85, lastDeposit: "2025-02-15", insurance: "FDIC 250K $" },
  { id: "HYC002", client: "Fatou Diop Industries", balance: 850_000, yield: 4.85, lastDeposit: "2025-02-10", insurance: "FDIC 3M $ (élargi)" },
  { id: "HYC003", client: "Fondation Modou Gueye", balance: 2_500_000, yield: 4.90, lastDeposit: "2025-02-18", insurance: "FDIC 6M $ (conjoint)" },
  { id: "HYC004", client: "Ousmane N'Diaye", balance: 340_000, yield: 4.85, lastDeposit: "2025-01-28", insurance: "FDIC 500K $" },
  { id: "HYC005", client: "Ibrahima Fall", balance: 75_000, yield: 4.85, lastDeposit: "2025-02-01", insurance: "FDIC 250K $" },
];

export const recentActivity = [
  { id: "A001", type: "trade", description: "Rééquilibrage exécuté pour Ousmane N'Diaye — 150 parts AAPL achetées", time: "Il y a 2 heures", icon: "📈" },
  { id: "A002", type: "onboard", description: "Nouveau compte ouvert : Mariama Tall — Courtage individuel", time: "Il y a 4 heures", icon: "👤" },
  { id: "A003", type: "transfer", description: "Transfert ACAT terminé : Ibrahima Fall", time: "Il y a 6 heures", icon: "🔄" },
  { id: "A004", type: "billing", description: "Factures T1 générées pour 142 ménages — 458 250 FCFA au total", time: "Il y a 1 jour", icon: "💵" },
  { id: "A005", type: "tax", description: "Récolte de pertes exécutée : 12 340 FCFA de pertes captées pour Ousmane N'Diaye", time: "Il y a 1 jour", icon: "🏷️" },
  { id: "A006", type: "report", description: "Rapports de performance générés et envoyés à 45 clients", time: "Il y a 2 jours", icon: "📄" },
  { id: "A007", type: "ai", description: "Diambar AI alerte : 3 portefeuilles ont dérivé au-delà du seuil de 5%", time: "Il y a 2 jours", icon: "🤖" },
  { id: "A008", type: "cash", description: "Dépôt cash haut rendement : 250 000 FCFA de Fondation Modou Gueye", time: "Il y a 3 jours", icon: "💰" },
];

export const aiConversations = [
  { role: "bot", text: "Bonjour ! Je suis Diambar AI, votre assistant financier intelligent. Je connais votre portefeuille et peux vous aider avec l'analyse de performance, la gestion fiscale, et l'optimisation de vos opérations. Comment puis-je vous aider ?" },
  { role: "user", text: "Quels clients ont des portefeuilles mal alignés avec leur profil de risque ?" },
  { role: "bot", text: "J'ai identifié 3 portefeuilles avec un écart significatif :\n\n1. **Aminata Sow** — Profil Modéré mais allocation 75% actions (recommandé : 60%)\n2. **Mariama Tall** — Profil Conservateur mais inclut des positions spéculatives (TSLA, AMZN)\n3. **Ibrahima Fall** — Profil Modéré mais surpondéré en tech (42% vs 25% cible)\n\nVoulez-vous que je génère des propositions de rééquilibrage ?" },
];

export const sectorAllocation = [
  { name: "Technologie", value: 28, color: "#60A5FA" },
  { name: "Santé", value: 15, color: "#34D399" },
  { name: "Finance", value: 14, color: "#C87941" },
  { name: "Consommation", value: 12, color: "#FBBF24" },
  { name: "Industrie", value: 10, color: "#A78BFA" },
  { name: "Énergie", value: 8, color: "#F87171" },
  { name: "Immobilier", value: 7, color: "#7EB8DA" },
  { name: "Autres", value: 6, color: "#64748B" },
];

export const complianceAlerts = [
  { id: "COMP01", type: "warning", title: "Alerte de dérive du portefeuille", description: "3 comptes dépassent le seuil de dérive de 5%", time: "Il y a 2h" },
  { id: "COMP02", type: "info", title: "Dépôt réglementaire à venir", description: "Mise à jour annuelle de l'ADV dans 30 jours", time: "Il y a 1j" },
  { id: "COMP03", type: "success", title: "Journal d'audit mis à jour", description: "Tous les enregistrements de facturation T4 vérifiés", time: "Il y a 3j" },
];

export const onboardingSteps = [
  { step: 1, title: "Informations client", description: "Données personnelles, KYC et adéquation", status: "complete" },
  { step: 2, title: "Sélection du compte", description: "Choisir parmi 30+ types de comptes", status: "complete" },
  { step: 3, title: "Signature des documents", description: "Signature électronique des accords", status: "active" },
  { step: 4, title: "Alimentation du compte", description: "Lier une banque, ACAT ou virement", status: "pending" },
  { step: 5, title: "Affectation portefeuille", description: "Assigner un modèle ou stratégie", status: "pending" },
];

export const marketplaceModels = [
  { id: "MP001", provider: "BlackRock", name: "iShares Core Growth", fee: 0.10, minInvestment: 5000, ytdReturn: 16.8, rating: 4.8, category: "Grandes capitalisations croissance", subscribers: 2340 },
  { id: "MP002", provider: "Vanguard", name: "Total Market Index", fee: 0.03, minInvestment: 1000, ytdReturn: 14.2, rating: 4.9, category: "Marché total", subscribers: 5100 },
  { id: "MP003", provider: "PIMCO", name: "Income Opportunities", fee: 0.15, minInvestment: 10000, ytdReturn: 7.5, rating: 4.5, category: "Revenu fixe", subscribers: 1200 },
  { id: "MP004", provider: "DimensionalFA", name: "Global Core Equity", fee: 0.12, minInvestment: 2500, ytdReturn: 15.1, rating: 4.7, category: "Actions mondiales", subscribers: 890 },
  { id: "MP005", provider: "AQR Capital", name: "Style Premia Alt", fee: 0.20, minInvestment: 25000, ytdReturn: 9.3, rating: 4.3, category: "Alternatif", subscribers: 420 },
  { id: "MP006", provider: "State Street", name: "ESG Core Bond", fee: 0.08, minInvestment: 5000, ytdReturn: 5.8, rating: 4.4, category: "Revenu fixe ESG", subscribers: 780 },
];
