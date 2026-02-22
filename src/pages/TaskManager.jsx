import { useState } from 'react';
import {
    CheckSquare, Plus, Clock, User, AlertTriangle,
    Calendar, Tag, ChevronRight, CheckCircle, Circle,
    Flag, Filter, Search, Zap
} from 'lucide-react';

const mockTasks = [
    { id: 'T01', title: 'Revue annuelle portefeuille N\'Diaye', client: 'Ousmane N\'Diaye', assignee: 'Moussa', priority: 'high', status: 'in-progress', dueDate: '2025-02-25', category: 'Revue', notes: 'Rebalancer vers 60/40 et discuter objectif retraite.' },
    { id: 'T02', title: 'Renouveler KYC — Passeport', client: 'Ousmane N\'Diaye', assignee: 'Aïda', priority: 'high', status: 'todo', dueDate: '2025-03-01', category: 'Conformité', notes: 'Passeport expire en juin. Demander copie avant renouvellement.' },
    { id: 'T03', title: 'Préparer proposition ACAT', client: 'Dr. Abdoulaye Diallo', assignee: 'Moussa', priority: 'medium', status: 'todo', dueDate: '2025-02-28', category: 'Acquisition', notes: 'Prospect chaud. Préparer comparaison vs TD Ameritrade.' },
    { id: 'T04', title: 'Rééquilibrage trimestriel', client: 'Tous les clients', assignee: 'Système', priority: 'medium', status: 'done', dueDate: '2025-02-15', category: 'Trading', notes: '12 comptes rééquilibrés automatiquement.' },
    { id: 'T05', title: 'Appel de suivi — Sow', client: 'Aminata Sow', assignee: 'Moussa', priority: 'low', status: 'todo', dueDate: '2025-03-05', category: 'Relation', notes: 'Discuter achat immobilier à Saly et ajuster objectif.' },
    { id: 'T06', title: 'Signer contrat Fondation', client: 'Fondation Modou Gueye', assignee: 'Moussa', priority: 'high', status: 'in-progress', dueDate: '2025-02-23', category: 'Légal', notes: 'Contrat de gestion de la dotation perpétuelle. Avocat validé.' },
    { id: 'T07', title: 'Form ADV mise à jour', client: 'Interne', assignee: 'Aïda', priority: 'medium', status: 'todo', dueDate: '2025-03-31', category: 'Conformité', notes: 'Mise à jour annuelle obligatoire. Deadline SEC 31 mars.' },
    { id: 'T08', title: 'Rapport fiscal envoyé', client: 'Cheikh K. Ba', assignee: 'Moussa', priority: 'low', status: 'done', dueDate: '2025-02-10', category: 'Fiscalité', notes: '1099-DIV et TLH summary envoyés.' },
    { id: 'T09', title: 'Onboarding Prof. Kane', client: 'Prof. Mamadou Kane', assignee: 'Aïda', priority: 'high', status: 'done', dueDate: '2025-02-20', category: 'Acquisition', notes: 'KYC validé. Compte IB ouvert. Premier virement reçu.' },
    { id: 'T10', title: 'Réunion ESG — Investissement Impact', client: 'Fondation Modou Gueye', assignee: 'Moussa', priority: 'medium', status: 'todo', dueDate: '2025-03-10', category: 'ESG', notes: 'Présenter les options de fonds ESG africains.' },
];

const priorityConfig = {
    high: { label: 'Haute', color: 'var(--kd-danger)', icon: '🔴' },
    medium: { label: 'Moyenne', color: 'var(--kd-warning)', icon: '🟡' },
    low: { label: 'Basse', color: 'var(--kd-info)', icon: '🔵' },
};

const statusConfig = {
    todo: { label: 'À faire', color: 'var(--text-muted)' },
    'in-progress': { label: 'En cours', color: 'var(--kd-copper-light)' },
    done: { label: 'Terminé', color: 'var(--kd-success)' },
};

export default function TaskManager() {
    const [tasks] = useState(mockTasks);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = tasks.filter(t => filterStatus === 'all' || t.status === filterStatus)
        .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const todo = tasks.filter(t => t.status === 'todo').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const done = tasks.filter(t => t.status === 'done').length;
    const overdue = tasks.filter(t => t.status !== 'done' && new Date(t.dueDate) < new Date()).length;

    return (
        <div className="page-content">
            <div className="page-header">
                <div><h1>Gestion des tâches</h1><p>Suivez les actions à mener pour vos clients et la conformité</p></div>
                <button className="btn btn-primary"><Plus size={14} /> Nouvelle tâche</button>
            </div>

            <div className="stat-grid" style={{ marginBottom: 'var(--space-5)' }}>
                <div className="stat-card copper"><div className="stat-icon"><Circle size={20} /></div><div className="stat-value">{todo}</div><div className="stat-label">À faire</div></div>
                <div className="stat-card warning"><div className="stat-icon"><Clock size={20} /></div><div className="stat-value">{inProgress}</div><div className="stat-label">En cours</div></div>
                <div className="stat-card success"><div className="stat-icon"><CheckCircle size={20} /></div><div className="stat-value">{done}</div><div className="stat-label">Terminées</div></div>
                <div className="stat-card" style={{ borderColor: overdue > 0 ? 'rgba(239,68,68,0.3)' : undefined }}><div className="stat-icon" style={overdue > 0 ? { background: 'rgba(239,68,68,0.1)', color: 'var(--kd-danger)' } : {}}><AlertTriangle size={20} /></div><div className="stat-value" style={overdue > 0 ? { color: 'var(--kd-danger)' } : {}}>{overdue}</div><div className="stat-label">En retard</div></div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', flexWrap: 'wrap', alignItems: 'center' }}>
                <div className="header-search" style={{ width: 260 }}><Search size={14} /><input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></div>
                {['all', 'todo', 'in-progress', 'done'].map(s => (
                    <button key={s} className={`btn btn-sm ${filterStatus === s ? 'btn-primary' : 'btn-ghost'}`} style={{ fontSize: 11 }}
                        onClick={() => setFilterStatus(s)}>{s === 'all' ? 'Toutes' : statusConfig[s].label}</button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {filtered.map(task => {
                    const pr = priorityConfig[task.priority];
                    const st = statusConfig[task.status];
                    const isOverdue = task.status !== 'done' && new Date(task.dueDate) < new Date();
                    return (
                        <div key={task.id} className="card" style={{ padding: 'var(--space-3) var(--space-4)', borderLeft: `4px solid ${st.color}` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flex: 1 }}>
                                    {task.status === 'done' ? <CheckCircle size={18} style={{ color: 'var(--kd-success)', flexShrink: 0 }} /> : task.status === 'in-progress' ? <Clock size={18} style={{ color: 'var(--kd-copper-light)', flexShrink: 0 }} /> : <Circle size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                            <span style={{ fontSize: 14, fontWeight: 600, textDecoration: task.status === 'done' ? 'line-through' : 'none', opacity: task.status === 'done' ? 0.6 : 1 }}>{task.title}</span>
                                            <span style={{ fontSize: 9 }}>{pr.icon}</span>
                                            <span className="tag" style={{ fontSize: 9 }}>{task.category}</span>
                                        </div>
                                        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                                            {task.client} • {task.assignee} • {isOverdue ? <span style={{ color: 'var(--kd-danger)', fontWeight: 600 }}>⚠️ En retard</span> : new Date(task.dueDate).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
