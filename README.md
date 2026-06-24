#This is a readme file.. it is currently empty and was only created because of a need to have something in github

# GitLingo - Learn GitHub the Fun Way! 🦉

A Duolingo-style interactive web app that teaches you GitHub from absolute basics to advanced usage!

## 🎮 Features

- **Bright, Colorful UI** - Inspired by Duolingo's engaging design
- **Learning Path** - 6 levels progressing from beginner to advanced
- **Mini Games** - Interactive exercises to reinforce learning
- **Progress Tracking** - Earn gems, maintain streaks, and track your progress
- **Generated Characters** - Fun emoji mascots guide your learning
- **Mobile Responsive** - Works great on phones and desktops

## 📚 Learning Levels

1. **Git Basics** 🌱 - What is Git, git init, git add, git commit
2. **Repositories** 📁 - Understanding repos, git clone
3. **Branching** 🔄 - Creating and managing branches
4. **Merging** 🤝 - Combining branches, handling conflicts
5. **Pull Requests** 🚀 - Code review workflow
6. **Collaboration** 👥 - git fetch, git pull, teamwork

## 🚀 Deploy to GitHub Pages

### Option 1: Using GitHub UI (Easiest)

1. Create a new repository on GitHub (e.g., `gitlingo`)
2. Upload these three files:
   - `index.html`
   - `styles.css`
   - `app.js`
3. Go to **Settings** → **Pages**
4. Under "Source", select **main branch** and click **Save**
5. Wait 1-2 minutes, then visit: `https://yourusername.github.io/gitlingo/`

### Option 2: Using Git Command Line

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: GitLingo app"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/gitlingo.git

# Push to GitHub
git push -u origin main

# Enable GitHub Pages in Settings > Pages on GitHub website
```

## 🎯 How to Use

1. **Start Learning** - Click "Start Learning!" on the welcome screen
2. **Follow the Path** - Complete levels in order (each unlocks the next)
3. **Answer Questions** - Select the correct answer from multiple choices
4. **Play Mini Games** - Interactive exercises to test your knowledge
5. **Earn Rewards** - Get gems for correct answers, maintain your streak!

## 💡 Tips

- You have 5 hearts per lesson - use them wisely!
- Correct answers earn you 10-25 gems
- Maintain your streak by completing lessons daily
- Your progress is saved automatically in your browser

## 🛠️ Tech Stack

- Pure HTML5, CSS3, JavaScript (no frameworks needed!)
- LocalStorage for progress persistence
- Mobile-first responsive design
- Works offline after initial load

## 📝 License

Free to use and modify for educational purposes!

---

Made with ❤️ for learning GitHub! Happy coding! 🎉 
