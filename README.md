# Portfolio — Page d'accueil

Page d'accueil statique (HTML/CSS/JS) servie par Nginx dans un conteneur Docker,
intégré à Traefik comme reverse proxy.

## Arborescence du projet

```
portfolio/
├── Dockerfile                  # Build de l'image Nginx
├── docker-compose.yml          # Orchestration Docker + labels Traefik
├── nginx.conf                  # Config Nginx (compression, cache, PDF)
├── README.md                   # Ce fichier
└── html/                       # Tout ce qui est servi par Nginx
    ├── index.html              # Page principale (unique fichier HTML)
    ├── assets/
    │   ├── css/
    │   │   └── style.css       # Tous les styles
    │   └── js/
    │       └── main.js         # JS minimal (scroll, animations)
    └── cv/
        └── mon-cv.pdf          # ⚠️  À ajouter manuellement
```

## Mise en route

### 1. Ajouter ton CV
Place ton fichier PDF dans `html/cv/` et nomme-le `mon-cv.pdf`
(ou modifie les références dans `index.html`).

### 2. Personnaliser le contenu
Dans `html/index.html`, remplace :
- `Prénom` / `Nom` → ton prénom et nom
- `ton@email.com` → ton adresse e-mail
- `tonprofil` → ton pseudo GitHub et LinkedIn
- Les descriptions de projets
- Les URLs des projets déployés

### 3. Construire et démarrer
```bash
# Depuis le dossier portfolio/
docker compose up -d --build
```

### 4. Vérifier
```bash
docker compose ps       # État du conteneur
docker compose logs -f  # Logs Nginx en temps réel
```

## Mise à jour du contenu

Après modification du HTML/CSS :
```bash
docker compose up -d --build   # Rebuild + restart automatique
```

## Passage au nom de domaine (Phase 2)

Dans `docker-compose.yml` :
1. Commente les 4 lignes "PHASE 1"
2. Décommente les 4 lignes "PHASE 2"
3. Remplace `mondomaine.dev` par ton domaine
4. Relance : `docker compose up -d --force-recreate`

## Stack technique

| Composant | Rôle |
|-----------|------|
| HTML/CSS  | Structure et style de la page |
| JS vanilla| Animations légères, scroll actif |
| Nginx Alpine | Serveur de fichiers statiques (~25MB) |
| Docker    | Conteneurisation |
| Traefik   | Reverse proxy (routing HTTP/HTTPS) |
