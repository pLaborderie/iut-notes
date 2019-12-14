# IUT Notes

## Statut CircleCI
[![CircleCI](https://circleci.com/gh/pLaborderie/iut-notes/tree/master.svg?style=svg)](https://circleci.com/gh/pLaborderie/iut-notes/tree/master)

## Objectifs
L'application IUT Notes a pour objectif de faciliter la prise de notes en cours, ainsi que leur partage
avec les autres membres de l'IUT. Pour l'instant, uniquement l'IUT Informatique de Bayonne et du Pays Basque
est visé par cette application (ce qui pourra changer dans l'avenir).
En mettant à disposition un site web et une application mobile (PWA) avec une interface simple et épurée,
l'objectif est d'apporter une expérience intuitive et fluide. Pas d'animations dans tout les sens, de page
de trois kilomètres avec très peu de contenu.
La prise de note peut se faire en Markdown, afin de faciliter la mise en forme du texte (comme Github/Discord pour ne citer qu'eux).

## Structure
Veuillez respecter la structure mise en place :
- Backend
  - Les modèles vont dans le dossier `models`
  - Pour tout changement au niveau backend (requête ou modèle), modifier au besoin :
    - Le schéma dans `schema.js`
    - Les fonctions dans `resolvers.js`
  - Ne pas toucher aux migrations manuellement (utiliser le CLI Sequelize)
- Frontend
  - Les composants réutilisables vont dans `src/components`
  - Les pages vont dans `src/pages`
  - Les requêtes GraphQL dans `src/queries`, et les mutations dans `src/mutations`
  - Éviter de toucher aux fichiers à la racine de `src`.
  - Dans `public`, les fichiers statiques (images, son...), l'`index.html` et le `manifest.json`.

## Contribuer
- Respecter la structure ci-dessus
- Faire une pull request expliquant l'objectif ainsi que les façons d'y arriver
- Une fois la pull request mergée sur master, une nouvelle image docker est taggée et déployée sur le serveur automatiquement.
