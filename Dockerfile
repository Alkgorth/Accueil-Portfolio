# ─── Image de base : Nginx Alpine (légère ~25MB) ──────────────────────────
FROM nginx:alpine

# Copie tout le contenu statique dans le dossier servi par Nginx
COPY html/ /usr/share/nginx/html/

# Supprime la config Nginx par défaut et ajoute la nôtre
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Le port 80 est exposé (Traefik s'en occupera côté hôte)
EXPOSE 80

# Nginx démarre en foreground (requis par Docker)
CMD ["nginx", "-g", "daemon off;"]
