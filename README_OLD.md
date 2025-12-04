# README.md - Installation Automatisée Projet Vite + React + Tailwind

```markdown
# Vision Collaboratif 🚀

Projet React TypeScript avec Vite + Tailwind CSS v3 optimisé pour le développement rapide.

## 📋 Prérequis d'installation

| Outil | Version minimale | Vérification | Téléchargement |
|-------|------------------|--------------|----------------|
| **Node.js** | 18+ (LTS 20+ recommandé) | `node --version` | [nodejs.org](https://nodejs.org) [web:45] |
| **npm** | 9+ (inclus avec Node.js) | `npm --version` | Inclus avec Node.js |
| **Git** (optionnel) | 2.30+ | `git --version` | [git-scm.com](https://git-scm.com) [web:49] |
| **Éditeur** | VS Code recommandé | - | [code.visualstudio.com](https://code.visualstudio.com) [web:46] |

**🔍 Vérifiez avant de commencer :**
```
node --version  # Doit afficher v18+
npm --version   # Doit afficher 9+
```

## 🚀 Installation en 1 commande (avec Git)

```
npx degit user/repo-template/vision-collaboratif . && npm install && npm run dev
```

## 🛠️ Installation manuelle rapide (2 minutes)

```
# 1. Créer projet Vite React-TS
npm create vite@latest . -- --template react-ts

# 2. Installer dépendances + Tailwind
npm install && npm install -D tailwindcss@^3 postcss autoprefixer


# 3. Configurer Tailwind
npx tailwindcss init -p

## 3.1 Ajouter votre composant personnalisé .TSX
```
Après avoir installé les dépendances, placez votre fichier `Vision-collaboratifs.tsx` dans le dossier `src/` de votre projet.

Ensuite, ouvrez le fichier `src/App.tsx` et importez votre composant en ajoutant en haut :
```
```bash
import VisionCollaboratifs from './Vision-collaboratifs'
```
```
Puis, utilisez-le dans la fonction `App` pour qu’il soit rendu dans l’application :
```
```bash
function App() {
return (
<div>
<VisionCollaboratifs />
</div>
)
}

export default App
```


## 3.2les bonnes pratiques pour un projet React structuré avec Vite et TypeScript, et facilite la prise en main du composant personnalisé dans l’application.
[React structuré avec Vite et TypeScrip](https://www.yvonh.com/demarrer-un-projet-reactjs-typescript-avec-vitejs/)


# 4. Lancer serveur dev
npm run dev
```

**✅ Ouvrez http://localhost:5173/ - Hot reload automatique !**

## 📁 Structure de fichiers
```
src/
├── App.tsx                 # Composant principal
├── Vision-collaboratifs.tsx # Votre composant personnalisé
├── index.css              # Directives Tailwind (@tailwind base, components, utilities)
└── main.tsx
```

## 🎨 Tailwind CSS prêt à l'emploi
```
<div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl shadow-2xl">
  <h1 className="text-3xl font-bold mb-4">Hello Tailwind !</h1>
  <p className="text-lg">Hot reload fonctionne parfaitement</p>
</div>
```

## 🔧 Scripts disponibles
```
npm run dev     # 🚀 Serveur dev (localhost:5173) - Hot reload
npm run build   # 📦 Build production (dossier dist/)
npm run preview # 👁️  Test build local
npm run lint    # 🔍 Vérification code
```

## 💡 Ajouter votre composant
1. Copiez `Vision-collaboratifs.tsx` dans `src/`
2. Dans `App.tsx` :
   ```
   import VisionCollaboratifs from './Vision-collaboratifs'
   function App() { return <VisionCollaboratifs /> }
   ```
3. **Hot reload automatique sur toutes modifications !**

## 🐛 Dépannage courant

| Problème | Solution |
|----------|----------|
| **Node.js obsolète** | Réinstallez LTS depuis nodejs.org |
| **Port 5173 occupé** | `npm run dev -- --port 3000` |
| **Erreur Tailwind** | Vérifiez `@tailwind` dans `src/index.css` |
| **ERESOLVE npm** | `npm install --legacy-peer-deps` |

## 📱 Responsive par défaut
Toutes les classes Tailwind sont disponibles : `sm:`, `md:`, `lg:`, `xl:` prefixes fonctionnent immédiatement.

**Copiez ce README.md** pour vos futurs projets - **Installation garantie en 2 minutes** ! [web:45][web:46][web:48]
```
