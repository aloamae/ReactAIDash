```markdown
## 🛠️ Installation Pas à Pas

Suivez ces **9 étapes dans l'ordre** pour une installation sans erreur (3 minutes) :

### 1️⃣ Vérifier les Prérequis
```
node --version  # ≥ v18
npm --version   # ≥ v9
```
**❌ Si manquant** : [Téléchargez Node.js LTS](https://nodejs.org) [web:45]

### 2️⃣ Créer le Projet Vite React-TS
```
# IMPORTANT : Dossier VIDE requis
npm create vite@latest mon-projet -- --template react-ts
cd mon-projet
```

### 3️⃣ Installer les Dépendances de Base
```
npm install
```

### 4️⃣ Installer Tailwind CSS v3
```
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

### 5️⃣ Configurer `tailwind.config.js`
**Remplacez le contenu** :
```
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

### 6️⃣ Ajouter Tailwind dans `src/index.css`
**Remplacez tout le contenu** :
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 7️⃣ Placer Votre Composant
```
src/
└── Vision-collaboratifs.tsx  # 📂 Copiez ICI votre fichier
```

### 8️⃣ Importer dans `src/App.tsx`
**Modifiez `App.tsx`** :
```
import VisionCollaboratifs from './Vision-collaboratifs'

function App() {
  return (
    <div className="p-8">
      <VisionCollaboratifs />
    </div>
  )
}

export default App
```

### 9️⃣ Lancer le Serveur
```
npm run dev
```
**✅ Ouvrez http://localhost:5173/**

---

## ✅ Vérification Réussie
- ✅ Page chargée sans erreur
- ✅ `className="bg-blue-500 p-4"` → fond bleu
- ✅ Hot reload : modifiez → rechargement auto

**🎉 Installation terminée !** [web:71][web:82][web:78]
```
