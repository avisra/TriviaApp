# 🦁 Trivia Time - Kid-Friendly Quiz Game

A fun, kid-friendly multiplayer trivia game built as a Progressive Web App (PWA). Designed for ages 6+ with large buttons, bright colors, and simple pass-and-play gameplay.

## ✨ Features

- **🎮 Multiplayer Pass-and-Play**: Support for 1-8 players on a single device
- **� Player Customization**: Each player can set their name, choose a color, and enter their age
- **🎨 Personalized Colors**: Each player gets a unique gradient color throughout the game
- **⚖️ Age-Based Difficulty Scaling**: Optional feature that adjusts question difficulty based on each player's age
- **📱 Progressive Web App**: Installable on mobile devices, works offline
- **👶 Kid-Friendly UX**: Large tap targets, minimal text, bright colors, fun animations
- **🎯 Multiple Categories**: Animals, Pokemon, and Prehistoric (79+ questions each), can select multiple
- **🎲 3-Tier Difficulty System**: ✨ Easy (44 questions), ⭐ Medium (79 questions), ⭐⭐ Hard (30 questions) per category
- **🔄 Turn Rotation**: Players alternate answering questions, keeping everyone engaged
- **🏆 Victory Celebration**: Winner announcement with personalized color display and celebratory sound
- **✅ Instant Feedback**: Correct/incorrect animations with clear visual cues

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser at http://localhost:5173
```

### Build for Production

```bash
# Build static files
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
TriviaApp/
├── public/
│   ├── icon.svg              # App icon (PWA)
│   └── manifest.webmanifest  # PWA manifest
├── src/
│   ├── data/
│   │   ├── animals.json      # Animal trivia questions (79 questions)
│   │   ├── pokemon.json      # Pokemon trivia questions (79 questions)
│   │   └── prehistoric.json  # Prehistoric trivia questions (79 questions)
│   ├── hooks/
│   │   └── useGameLogic.ts   # Question generation, shuffling & age-based difficulty
│   ├── screens/
│   │   ├── WelcomeScreen.tsx              # Player count selection
│   │   ├── PlayerCustomizationScreen.tsx  # Player names, colors & ages
│   │   ├── SetupScreen.tsx                # Category selection & age scaling toggle
│   │   ├── GameScreen.tsx                 # Question display & answering
│   │   └── ResultsScreen.tsx              # Final scores & winner celebration
│   ├── types/
│   │   └── index.ts          # TypeScript definitions
│   ├── utils/
│   │   └── playerColors.ts   # Player color gradients
│   ├── App.tsx               # Main app & state management
│   ├── App.css               # Global styles
│   └── main.tsx              # Entry point
├── index.html
├── vite.config.ts            # Vite + PWA configuration
└── package.json
```

## 🎯 Game Flow

1. **Welcome Screen**: Select number of players (1-8)
2. **Player Customization**: Each player enters:
   - Name (up to 20 characters)
   - Color preference (8 unique gradient options)
   - Age (4-99, used for optional difficulty scaling)
3. **Setup Screen**: 
   - Review players (shows names, ages, colors)
   - Toggle "Scale by Age" option
   - Select categories (Animals, Pokemon, Prehistoric - can choose multiple)
   - Choose questions per player (10/20/30/50)
4. **Game Screen**: 
   - Background changes to current player's color
   - Player name displayed in header
   - Players alternate answering one question at a time
   - Multiple choice questions with A/B/C/D answers
   - Difficulty badges: ✨ Easy, ⭐ Medium, or ⭐⭐ Hard
   - Instant feedback with animations
   - Automatic progression
5. **Results Screen**: 
   - Victory sound plays
   - Winner announcement with their personalized color
   - Final scoreboard with color indicators
   - "Play Again" to restart

## 📊 Question Format

Questions are stored in separate JSON files by category in `src/data/`:

```json
{
  "id": "animals_m_0001",
  "category": "animals",
  "difficulty": "medium",
  "question": "What is the largest land animal?",
  "options": ["Giraffe", "African Elephant", "Polar Bear", "Rhinoceros"],
  "answerIndex": 1
}
```

### Adding New Questions

1. Open the appropriate category file:
   - `src/data/animals.json` for animals
   - `src/data/pokemon.json` for Pokemon
   - `src/data/prehistoric.json` for dinosaurs/prehistoric
2. Add questions to the array
3. Follow the schema: unique ID, category, difficulty (medium/hard), 4 options, answerIndex (0-3)
4. Maintain ~70% medium, ~30% hard ratio for balanced gameplay

### Adding New Categories

1. Create a new JSON file in `src/data/` (e.g., `space.json`)
2. Add an array of questions following the schema
3. Update types in `src/types/index.ts` (add to GameConfig.category union type)
4. Update `src/hooks/useGameLogic.ts` (add case to getQuestionsByCategory switch)
5. Update UI in `src/screens/SetupScreen.tsx` (add button to category grid)

## 🎨 Design Decisions

### UX Choices
- **Large buttons**: Minimum 48x48px tap targets (child-friendly)
- **One action per screen**: Reduces cognitive load
- **Bright gradients**: Engaging for kids, different per screen
- **Pass-and-play transitions**: Clear "hand device to next player" prompts
- **Instant feedback**: Correct answers pulse green, incorrect shake red
- **No typing**: Tap-only interface for young users

### Technical Choices
- **Vite + React**: Fast dev experience, simple PWA setup
- **TypeScript**: Type safety for maintainability
- **CSS Modules**: Scoped styles per component
- **Local JSON**: Simple question storage, easy to extend
- **Service Worker**: Automatic via vite-plugin-pwa for offline support

## 📱 PWA Features

The app is fully installable and works offline:

- **Manifest**: Configured in `public/manifest.webmanifest` and `vite.config.ts`
- **Service Worker**: Auto-generated by vite-plugin-pwa
- **Offline Support**: All assets cached on first load
- **Install Prompt**: Automatic on supported browsers/devices

### Testing PWA

1. Build production version: `npm run build`
2. Preview: `npm run preview`
3. Open in Chrome DevTools → Application → Manifest
4. Use "Add to Home Screen" on mobile

### Production Icons (TODO)

Replace `public/icon.svg` with proper PNG icons:
- 192×192px
- 512×512px
- Use tools like [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator)

## 🚢 Deployment to Azure Static Web Apps

### Prerequisites
- Azure account (free tier available)
- GitHub account
- GitHub repository for this project

### Step-by-Step Deployment

#### 1. Push Your Code to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/trivia-app.git
git branch -M main
git push -u origin main
```

#### 2. Create Azure Static Web App

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"** → Search for **"Static Web App"**
3. Click **"Create"**
4. Fill in the details:
   - **Subscription**: Select your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `trivia-time` (or your preferred name)
   - **Plan type**: **Free** (perfect for this app!)
   - **Region**: Choose closest to your users (e.g., East US 2)
   - **Source**: **GitHub**
   - **Sign in to GitHub** and authorize Azure
   - **Organization**: Your GitHub username
   - **Repository**: Select your trivia app repo
   - **Branch**: `main`
5. **Build Details**:
   - **Build Presets**: `React`
   - **App location**: `/` (leave as root)
   - **Api location**: (leave empty)
   - **Output location**: `dist`
6. Click **"Review + Create"** → **"Create"**

#### 3. Automatic CI/CD Setup

Azure will automatically:
- Create a GitHub Actions workflow in `.github/workflows/`
- Add a deployment secret to your GitHub repository
- Trigger the first deployment

**Note**: The workflow file has already been created in this repo at `.github/workflows/azure-static-web-apps.yml`. Azure will update it with your deployment token.

#### 4. Verify Deployment

1. Go to **Actions** tab in your GitHub repo
2. Watch the deployment workflow run
3. Once complete (usually 2-3 minutes), Azure will provide a URL
4. Visit your app at: `https://YOUR_APP_NAME.azurestaticapps.net`

### CI/CD Workflow

The GitHub Actions workflow automatically:
- ✅ Runs on every push to `main` branch
- ✅ Builds the Vite app (`npm run build`)
- ✅ Deploys to Azure Static Web Apps
- ✅ Creates preview environments for pull requests
- ✅ Closes preview environments when PRs are merged

To trigger a deployment:
```bash
git add .
git commit -m "Update trivia questions"
git push origin main
```

### Custom Domain (Optional)

1. In Azure Portal, go to your Static Web App
2. Click **"Custom domains"** → **"Add"**
3. Follow instructions to add your domain
4. Azure provides free SSL certificates automatically

### Configuration

The app includes a `staticwebapp.config.json` file with:
- ✅ SPA routing fallback (all routes → index.html)
- ✅ Proper MIME types for PWA files
- ✅ Optimized cache headers for assets
- ✅ PWA manifest caching

### Cost

**Azure Static Web Apps Free Tier includes:**
- ✅ 100 GB bandwidth per month
- ✅ Free SSL certificate
- ✅ Custom domains
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ GitHub Actions integration
- ✅ Preview environments

Perfect for a trivia game with moderate traffic!

### Troubleshooting

**Deployment fails?**
- Check Actions tab for error logs
- Verify `output_location: "dist"` in workflow file
- Ensure `npm run build` works locally

**404 errors on routes?**
- `staticwebapp.config.json` handles SPA routing
- All routes redirect to `index.html`

**PWA not working?**
- Check manifest in DevTools
- HTTPS required (Azure provides automatically)
- Clear cache and reload

## 🔧 Configuration

### Difficulty Mix

By default, questions are distributed as **40% easy, 40% medium, 20% hard**.

When **"Scale by Age"** is enabled, distribution is personalized per player:
- **Age ≤6**: 70% easy, 25% medium, 5% hard
- **Age 7-8**: 50% easy, 35% medium, 15% hard
- **Age 9-10**: 40% easy, 40% medium, 20% hard (default)
- **Age 11-12**: 25% easy, 50% medium, 25% hard
- **Age 13-15**: 10% easy, 50% medium, 40% hard
- **Age 16+**: 0% easy, 40% medium, 60% hard

Edit distributions in `src/hooks/useGameLogic.ts`:

```typescript
function getDifficultyDistributionByAge(age: number): [number, number, number] {
  if (age <= 6) return [0.70, 0.25, 0.05];
  // ... customize age brackets and percentages
}
```

### Theme Colors

Edit gradients in screen CSS files:
- Welcome: `#667eea → #764ba2` (purple)
- Setup: `#f093fb → #f5576c` (pink)
- Game: `#4facfe → #00f2fe` (blue)
- Results: `#ffecd2 → #fcb69f` (peach)

### PWA Theme

Edit `vite.config.ts` and `index.html`:

```typescript
theme_color: '#667eea', // App header color
background_color: '#ffffff', // Splash screen background
```

## 🧪 Testing Checklist

- [ ] All 8 player counts work
- [ ] Questions shuffle properly (no duplicates in same game)
- [ ] 70/30 difficulty split maintained
- [ ] Correct/incorrect animations play
- [ ] Player transitions show correct player number
- [ ] Final scores calculate correctly
- [ ] Winner/tie detection works
- [ ] "Play Again" resets game state
- [ ] PWA installs on mobile
- [ ] Offline mode works after first load
- [ ] Responsive on phones, tablets, desktops

## 🎯 Future Enhancements

- [ ] Age-based scaling (easy/medium/hard distribution by age)
- [ ] More categories (Space, History, Math, Geography, etc.)
- [ ] Sound effects toggle
- [ ] Leaderboard persistence (localStorage)
- [ ] Question timer (optional)
- [ ] Power-ups/bonuses
- [ ] Multiplayer over network (future v2.0)
- [ ] Custom question packs

## 📄 License

Open source for personal and educational use.

## 🤝 Contributing

To add more trivia questions:
1. Fork the repo
2. Add questions to the appropriate category file in `src/data/`
3. Test locally
4. Submit a pull request

---

Built with ❤️ using React, TypeScript, and Vite. Designed for kids, enjoyed by all ages! 🎉
