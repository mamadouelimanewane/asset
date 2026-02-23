import React from 'react';
import { Book, FileText, Download, ShieldCheck, Video, HelpCircle } from 'lucide-react';

export default function Documentation() {
    const docs = [
        {
            id: 'marketing',
            title: 'Plaquette Commerciale (Marketing)',
            description: 'Présentation de haut niveau des 42 modules de Koppar-Diambar, ses 6 pôles d\'expertise et sa proposition de valeur UHNWI.',
            type: 'Markdown / PDF',
            file: '/docs/KOPPAR_DIAMBAR_BROCHURE_COMMERCIALE.md',
            icon: ShieldCheck,
            color: 'var(--kd-success)'
        },
        {
            id: 'manual',
            title: 'Manuel Utilisateur (Aperçu)',
            description: 'Guide complet pour la prise en main du CRM, du Portfolio Management, du Trading et de l\'intelligence artificielle Diambar.',
            type: 'Markdown / PDF',
            file: '/docs/KOPPAR_DIAMBAR_MANUEL_UTILISATEUR.md',
            icon: Book,
            color: 'var(--kd-copper)'
        }
    ];

    return (
        <div className="page-content">
            <div className="page-header">
                <div>
                    <h1>Documentation & Ressources</h1>
                    <p>Retrouvez ici tous les documents de présentation et d'accompagnement de la plateforme.</p>
                </div>
            </div>

            <div className="grid-2">
                {docs.map((doc) => (
                    <div key={doc.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="card-header" style={{ marginBottom: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 'var(--radius-md)',
                                    background: 'var(--bg-secondary)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <doc.icon size={24} style={{ color: doc.color }} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700 }}>{doc.title}</h3>
                                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Format: {doc.type}</div>
                                </div>
                            </div>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, flex: 1, marginBottom: 'var(--space-4)' }}>
                            {doc.description}
                        </p>
                        <a
                            href={doc.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ display: 'inline-flex', width: 'fit-content', gap: 8 }}
                        >
                            <Download size={16} />
                            Télécharger le document
                        </a>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginTop: 'var(--space-5)', border: '1px solid var(--border-secondary)', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: 'var(--space-2)' }}>
                    <HelpCircle size={32} style={{ color: 'var(--text-muted)' }} />
                    <div>
                        <h4 style={{ fontSize: 16, marginBottom: 4 }}>Besoin d'aide supplémentaire ?</h4>
                        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                            Notre Centre Éducatif centralise les tutoriels vidéo et l'intégration pas-à-pas de chaque module de la plateforme.
                            Contactez notre équipe de support disponible 24/7.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
