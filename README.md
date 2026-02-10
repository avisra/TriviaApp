# 🦁 Trivia Time - Kid-Friendly Quiz Game

A fun, kid-friendly multiplayer trivia game built as a Progressive Web App (PWA). Designed for ages 6+ with large buttons, bright colors, and simple pass-and-play gameplay.

## ✨ Features

- **🎮 Multiplayer Pass-and-Play**: Support for 1-8 players on a single device
- **📱 Progressive Web App**: Installable on mobile devices, works offline
- **👶 Kid-Friendly UX**: Large tap targets, minimal text, bright colors, fun animations
- **🎯 Multiple Categories**: Animals (79 questions), Pokemon (79 questions), Prehistoric Animals (79 questions)
- **⚖️ Balanced Difficulty**: 70% medium, 30% hard questions (configurable: 10, 20, 30, or 50 questions per player)
- **🔄 Turn Rotation**: Players take turns answering one question at a time, keeping everyone engaged
- **🎨 Beautiful UI**: Gradient backgrounds, smooth transitions, celebration animations
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
│   │   ├── animals.json      # Animal trivia questions
│   │   ├── pokemon.json      # Pokemon trivia questions
│   │   └── prehistoric.json  # Prehistoric trivia questions
│   ├── hooks/
│   │   └── useGameLogic.ts   # Question generation & shuffling
│   ├── screens/
│   │   ├── WelcomeScreen.tsx     # Player selection
│   │   ├── SetupScreen.tsx       # Game configuration
│   │   ├── GameScreen.tsx        # Question display & answering
│   │   └── ResultsScreen.tsx     # Final scores & winner
│   ├── types/
│   │   └── index.ts          # TypeScript definitions
│   ├── App.tsx               # Main app & state management
│   ├── App.css               # Global styles
│   └── main.tsx              # Entry point
├── index.html
├── vite.config.ts            # Vite + PWA configuration
└── package.json
```

## 🎯 Game Flow

1. **Welcome Screen**: Select number of players (1-8)
2. **Setup Screen**: Choose category (Animals, Pokemon, or Prehistoric) and questions per player (10/20/30/50)
3. **Game Screen**: 
   - "Pass to Player X" transition
   - Players take turns answering one question at a time
   - Multiple choice questions with A/B/C/D answers
   - Difficulty badge shows ⭐ Medium or ⭐⭐ Hard
   - Instant feedback with animations
   - Automatic progression
4. **Results Screen**: Final scores with winner celebration

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
- Azure account
- Azure CLI installed
- GitHub repository (for CI/CD)

### Manual Deployment

```bash
# Build the app
npm run build

# Deploy to Azure (first time)
az staticwebapp create \
  --name trivia-time \
  --resource-group your-resource-group \
  --source ./dist \
  --location "East US 2" \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

### CI/CD with Azure DevOps

1. Create Azure Static Web App in portal
2. Link to your Azure DevOps repo
3. Azure will auto-generate a workflow
4. Customize build settings:
   - **App location**: `/`
   - **Output location**: `dist`
   - **Build command**: `npm run build`

### Recommended azure-pipeline.yml

```yaml
trigger:
  - main

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
    displayName: 'Install Node.js'

  - script: npm ci
    displayName: 'Install dependencies'

  - script: npm run build
    displayName: 'Build app'

  - task: AzureStaticWebApp@0
    inputs:
      app_location: '/'
      output_location: 'dist'
      azure_static_web_apps_api_token: $(deployment_token)
```

## 🔧 Configuration

### Difficulty Mix

Edit `src/hooks/useGameLogic.ts`:

```typescript
const mediumCount = Math.round(config.questionsPerPlayer * 0.7); // 70% medium
const hardCount = config.questionsPerPlayer - mediumCount; // 30% hard
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
