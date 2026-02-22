// Formatage devises & nombres
export const formatCurrency = (amount, compact = false) => {
    if (compact && Math.abs(amount) >= 1_000_000) {
        return `${(amount / 1_000_000).toFixed(1)}M $`;
    }
    if (compact && Math.abs(amount) >= 1_000) {
        return `${(amount / 1_000).toFixed(0)}K $`;
    }
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export const formatPercent = (value) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
};

export const formatNumber = (value) => {
    return new Intl.NumberFormat('fr-FR').format(value);
};

export const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

export const formatDateShort = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
    });
};

// Helpers de statut
export const getStatusBadge = (status) => {
    const map = {
        'Actif': 'badge-success',
        'Active': 'badge-success',
        'Inactif': 'badge-warning',
        'Inactive': 'badge-warning',
        'Terminé': 'badge-success',
        'Completed': 'badge-success',
        'En cours': 'badge-info',
        'In Progress': 'badge-info',
        'En attente': 'badge-warning',
        'Pending': 'badge-warning',
        'Pending Approval': 'badge-warning',
        'Pending Review': 'badge-warning',
        'Exécuté': 'badge-success',
        'Executed': 'badge-success',
        'Connecté': 'badge-success',
        'Connected': 'badge-success',
        'Disponible': 'badge-diamond',
        'Available': 'badge-diamond',
        'À jour': 'badge-success',
        'Current': 'badge-success',
        'En retard': 'badge-danger',
        'Overdue': 'badge-danger',
    };
    return map[status] || 'badge-info';
};

// Couleur de risque
export const getRiskColor = (risk) => {
    const map = {
        'Faible': 'var(--kd-success)',
        'Low': 'var(--kd-success)',
        'Faible-Modéré': '#86EFAC',
        'Low-Moderate': '#86EFAC',
        'Modéré': 'var(--kd-warning)',
        'Moderate': 'var(--kd-warning)',
        'Agressif': 'var(--kd-copper)',
        'Aggressive': 'var(--kd-copper)',
        'Élevé': 'var(--kd-danger)',
        'High': 'var(--kd-danger)',
        'Très élevé': '#DC2626',
        'Very High': '#DC2626',
        'Conservateur': 'var(--kd-diamond)',
        'Conservative': 'var(--kd-diamond)',
    };
    return map[risk] || 'var(--text-tertiary)';
};

// AUM abrégé
export const abbreviateAUM = (amount) => {
    if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(2)}Md $`;
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)}M $`;
    if (amount >= 1_000) return `${(amount / 1_000).toFixed(0)}K $`;
    return `${amount} $`;
};

// Générer les initiales
export const getInitials = (name) => {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
};

// Générer une couleur à partir d'une chaîne
export const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
        '#C87941', '#7EB8DA', '#34D399', '#A78BFA',
        '#F87171', '#FBBF24', '#60A5FA', '#EC4899',
    ];
    return colors[Math.abs(hash) % colors.length];
};
