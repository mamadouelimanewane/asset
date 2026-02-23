# Manuel Utilisateur - Koppar-Diambar Platform
Version : 1.0 — Destiné aux Conseillers (Wealth Managers)

**Sommaire**
1. [Prise en main : Tableau de bord](#1-tableau-de-bord)
2. [Clients & Intégration (CRM)](#2-gestion-clients-et-intégration)
3. [Ordres, Transferts & Trading](#3-ordres-transferts-et-trading)
4. [Gestion de Portefeuille (Modélisation)](#4-gestion-de-portefeuille)
5. [Reporting & Facturation](#5-reporting-et-facturation)
6. [L'Assistant IA (Diambar Copilot)](#6-lassistant-ia)
7. [Paramétrage système](#7-paramétrage-système)

---

### 1. Tableau de bord
Le Tableau de bord (`/dashboard`) est votre hub principal. Il consolide les KPI vitaux (AUM Total, Clients Actifs, Revenu annuel). Le **Custom Dashboard** (`/custom-dashboard`) vous permet de personnaliser (glisser-déposer) des "Widgets" tels que les listes de flux locatifs, les alertes de conformité ou les données sectorielles.

### 2. Gestion Clients et Intégration
- **Visualiser les clients (`/clients`) :** Recherchez instantanément dans votre CRM, avec filtres par type (Individuel, Institutionnel, etc.) ou niveau de risque (code couleur). Cliquez sur l'enveloppe ou le téléphone pour engager une communication avec le client, ou sur l'œil pour ouvrir sa modale de détail 360°.
- **Onboarding (`/onboarding`) :** L'intégration suit 5 étapes fluides :
  1. *Infos Client*
  2. *Sélection du compte*
  3. *Signature* (e-signature via la plateforme)
  4. *Alimentation* (ACAT / Virement)
  5. *Affectation* (Profil de risque et modèle de portefeuille)

### 3. Ordres, Transferts et Trading
- **Suivi des ACATs (`/transfers`) :** Tableau détaillé des migrations de comptes : initiez vos nouveaux transferts et suivez les estimations de fin (Terminé, En cours, Approbation requise).
- **Plateforme de Trading (`/trading`) :** Exécutez vos ordres d'achat ou de vente avec un support des fractions d'actions. L'exécution est sans frais (0,00 $ de commission). Visualisez les ordres groupés en important un fichier `.csv` ou `.xlsx`.

### 4. Gestion de Portefeuille
- **Aperçu des Modèles (`/portfolio`) :** Clônez, créez, attribuez des modèles de portefeuille à vos clients. Le rééquilibrage automatisé affiche les disparités d'allocation ("Dérives") et permet d'ajuster simultanément sur l'ensemble de vos carnets de comptes.
- **Récolte des Pertes ("Tax Loss Harvesting" - `/tax`) :** Un algorithme scrute au quotidien vos portefeuilles et déclenche des reventes intelligentes pour gommer les plus-values d'autres positions. 

### 5. Reporting et Facturation
- **Édition de Rapports (`/reporting`) :** Grâce au "Report Center", accolez vos propres logo et thème graphique (White label) sur des rapports trimestriels. Programmez un envoi automatisé via l'Espace Client (Mockup) ou directement par email.
- **Cycles de facturation (`/billing`) :** Les frais (au pourcentage AUM ou forfaitaires) sont gérés de façon centralisée. Prélèvements automatiques et historique.

### 6. L'Assistant IA (Diambar Copilot)
Accessibles via le bouton flottant "Robot" en bas à droite, ou via sa propre page dédiée (`/copilot`), l'Intelligence Artificielle de Koppar-Diambar analyse vos données en direct. Demandez-lui :
> *"Rédige-moi un rapport périodique pour la performance YTD de M. N'diaye"*
> *"Y a t-il une incohérence réglementaire ou de risque sur les portefeuilles de type 'Agressif' ce mois-ci ?"*

Son moteur comprend l'OHADA/UEMOA et fournit des résumés structurés (avec du texte enrichi comme des Tableaux ou du gras).

### 7. Paramétrage système
Rendez-vous sur (`/settings`) pour éditer vos infos personnelles (Avatar, coordonnées directes), la personnalisation visuelle de l'extranet, vos notifications ciblées et la devise globale (XOF, USD, EUR). En tant que CIO, sécurisez votre plateforme par 2FA et consultez le journal inaltérable (« Audit Trail » - `/audit`).

---
_Conservez ce manuel à portée de main ou consultez la section « Centre Éducatif » de Koppar-Diambar pour retrouver l'intégralité des vidéos de présentation et tutoriels d'onboarding._
