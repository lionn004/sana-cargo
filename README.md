# SANA CARGO — Prototype Visuel

Prototype fonctionnel de l'application web SANA CARGO, généré à partir des maquettes Stitch.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre ensuite [http://localhost:5173](http://localhost:5173)

## Architecture du projet

```
src/
├── context/
│   └── AuthContext.tsx       # Gestion globale de l'état de connexion
├── components/
│   └── TopNavBar.tsx         # Barre de navigation partagée (état connecté)
└── pages/
    ├── Accueil.tsx           # Page d'accueil (état connecté + déconnecté)
    ├── MesExpeditions.tsx    # Liste des expéditions
    ├── NouvelleExpedition.tsx # Formulaire création expédition (étapes 1+2)
    ├── Recapitulatif.tsx     # Récapitulatif commande (étape 3)
    ├── SuiviColis.tsx        # Suivi en temps réel
    └── MonProfil.tsx         # Profil utilisateur
```

## Navigation

| Route | Page |
|---|---|
| `/` | Accueil (formulaire login si déconnecté, hero si connecté) |
| `/expeditions` | Mes Expéditions |
| `/nouvelle-expedition` | Nouvelle Expédition |
| `/recapitulatif` | Récapitulatif |
| `/suivi` | Suivi de colis |
| `/profil` | Mon Profil |

## Parcours utilisateur

1. Arriver sur `/` → Se connecter (email/mdp quelconques)
2. Cliquer "Nouvelle expédition" → formulaire → Continuer → Récapitulatif → Confirmer → Mes Expéditions
3. Depuis Mes Expéditions → cliquer "Détails" sur une ligne → Suivi de colis
4. Icône profil (dropdown) → Mon Profil
5. Dropdown → Déconnexion → retour à l'Accueil non connecté
