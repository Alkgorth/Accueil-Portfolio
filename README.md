# Portfolio — Page d'accueil

Page d'accueil statique (HTML/CSS/JS) servie par Nginx dans un conteneur Docker,
intégré à Traefik comme reverse proxy pour le déploiement sur VPS.

## Arborescence du projet

```
portfolio/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── README.md
└── html/
    ├── index.html
    ├── assets/
    │   ├── css/
    │   │   └── style.css
    │   └── js/
    │       └── main.js
    └── cv/
        └── mon-cv.pdf
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
- **Ajout récent** : Section "En plus" avec tags pour technologies supplémentaires (Java/Spring Boot, Traefik, VPS)

### 3. Construire et démarrer

#### Développement local (avec port exposé)
Pour tester sur votre machine :
```bash
# Depuis le dossier portfolio/
# Décommentez la ligne "ports:" dans docker-compose.yml
docker compose up -d --build
```
Accédez via `http://localhost:3000`.

#### Production sur VPS (avec Traefik)
Pour déployer sur votre VPS avec Traefik comme reverse proxy :
```bash
# Depuis le dossier portfolio/
# Assurez-vous que "ports:" est commenté dans docker-compose.yml
docker compose up -d --build
```
Traefik gérera le routage via les labels définis.

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
| Traefik   | Reverse proxy (routing HTTP/HTTPS, gestion des sous-domaines) |
