// GitLingo - Interactive GitHub Learning App

// State management
let state = {
    currentScreen: 'welcome',
    currentLevel: 1,
    currentLesson: 0,
    streak: 0,
    gems: 0,
    hearts: 5,
    completedLevels: [],
    selectedOption: null
};

// Lesson data for each level
const lessons = {
    1: [ // Git Basics
        {
            type: 'question',
            question: 'What is Git?',
            image: '📚',
            options: [
                'A programming language',
                'A version control system',
                'A text editor',
                'A database'
            ],
            correct: 1,
            explanation: 'Git is a distributed version control system that tracks changes in source code during software development.'
        },
        {
            type: 'question',
            question: 'Which command creates a new Git repository?',
            image: '🆕',
            options: [
                'git start',
                'git create',
                'git init',
                'git new'
            ],
            correct: 2,
            explanation: 'git init initializes a new Git repository in your project folder.'
        },
        {
            type: 'game',
            title: 'Match the Command',
            instruction: 'Match each Git command with its purpose!',
            pairs: [
                { command: 'git add', purpose: 'Stage changes' },
                { command: 'git commit', purpose: 'Save changes' },
                { command: 'git status', purpose: 'Check state' }
            ]
        }
    ],
    2: [ // Repositories
        {
            type: 'question',
            question: 'What is a Git repository?',
            image: '📁',
            options: [
                'A folder where Git tracks files',
                'A backup server',
                'A coding tool',
                'A type of branch'
            ],
            correct: 0,
            explanation: 'A repository is a folder where Git tracks all your files and their changes.'
        },
        {
            type: 'question',
            question: 'What does "git clone" do?',
            image: '📋',
            options: [
                'Deletes a repository',
                'Copies a repository from remote',
                'Creates a new branch',
                'Merges two branches'
            ],
            correct: 1,
            explanation: 'git clone creates a local copy of a remote repository.'
        },
        {
            type: 'game',
            title: 'Repository Flow',
            instruction: 'Put these steps in the correct order!',
            steps: [
                'Create repository',
                'Add files',
                'Commit changes',
                'Push to remote'
            ]
        }
    ],
    3: [ // Branching
        {
            type: 'question',
            question: 'What is a branch in Git?',
            image: '🌿',
            options: [
                'A copy of the repository',
                'A parallel version of the code',
                'A folder structure',
                'A remote server'
            ],
            correct: 1,
            explanation: 'A branch is a parallel version of your code that lets you work on features independently.'
        },
        {
            type: 'question',
            question: 'Which command creates a new branch?',
            image: '➕',
            options: [
                'git new-branch',
                'git create branch',
                'git branch <name>',
                'git make-branch'
            ],
            correct: 2,
            explanation: 'git branch <name> creates a new branch with the specified name.'
        },
        {
            type: 'game',
            title: 'Branch Builder',
            instruction: 'Select the correct sequence for branching!',
            sequences: [
                ['git branch feature', 'git checkout feature'],
                ['git checkout -b feature'],
                ['Both are correct!']
            ],
            correctSequence: 2
        }
    ],
    4: [ // Merging
        {
            type: 'question',
            question: 'What does "git merge" do?',
            image: '🔀',
            options: [
                'Deletes a branch',
                'Combines changes from branches',
                'Creates a new repository',
                'Reverts changes'
            ],
            correct: 1,
            explanation: 'git merge combines changes from one branch into another.'
        },
        {
            type: 'question',
            question: 'What is a merge conflict?',
            image: '⚠️',
            options: [
                'When Git crashes',
                'When changes can\'t be automatically merged',
                'When branches are identical',
                'When a file is deleted'
            ],
            correct: 1,
            explanation: 'A merge conflict occurs when Git can\'t automatically resolve differences between branches.'
        },
        {
            type: 'game',
            title: 'Merge Master',
            instruction: 'Choose the best practice for merging!',
            scenarios: [
                { situation: 'Before merging', action: 'Pull latest changes' },
                { situation: 'After conflicts', action: 'Test thoroughly' },
                { situation: 'Small changes', action: 'Fast-forward merge' }
            ]
        }
    ],
    5: [ // Pull Requests
        {
            type: 'question',
            question: 'What is a Pull Request?',
            image: '🔄',
            options: [
                'A request to download code',
                'A proposal to merge changes',
                'A bug report',
                'A code review tool'
            ],
            correct: 1,
            explanation: 'A Pull Request is a proposal to merge your changes into another branch, allowing for review.'
        },
        {
            type: 'question',
            question: 'Why use Pull Requests?',
            image: '✅',
            options: [
                'To show off your code',
                'For code review and discussion',
                'To slow down development',
                'It\'s required by Git'
            ],
            correct: 1,
            explanation: 'Pull Requests enable team collaboration through code review before merging.'
        },
        {
            type: 'game',
            title: 'PR Workflow',
            instruction: 'Arrange the Pull Request workflow!',
            workflow: [
                'Create branch',
                'Make changes',
                'Push to remote',
                'Open PR',
                'Code review',
                'Merge'
            ]
        }
    ],
    6: [ // Collaboration
        {
            type: 'question',
            question: 'What is "git fetch"?',
            image: '📥',
            options: [
                'Downloads and merges changes',
                'Downloads changes without merging',
                'Uploads your changes',
                'Deletes remote branches'
            ],
            correct: 1,
            explanation: 'git fetch downloads changes from remote but doesn\'t merge them automatically.'
        },
        {
            type: 'question',
            question: 'What does "git pull" do?',
            image: '⬇️',
            options: [
                'Only downloads changes',
                'Fetches and merges changes',
                'Pushes your changes',
                'Creates a new branch'
            ],
            correct: 1,
            explanation: 'git pull is equivalent to git fetch followed by git merge.'
        },
        {
            type: 'game',
            title: 'Collaboration Challenge',
            instruction: 'Match the scenario with the right command!',
            scenarios: [
                { scenario: 'Update from remote', command: 'git pull' },
                { scenario: 'Share your work', command: 'git push' },
                { scenario: 'Check remote changes', command: 'git fetch' }
            ]
        }
    ]
};

// Initialize the app
function init() {
    loadState();
    updateStats();
    showWelcome();
}

// Navigation functions
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    state.currentScreen = screenId;
}

function showWelcome() {
    showScreen('welcome-screen');
    updateNav('home');
}

function showPath() {
    showScreen('path-screen');
    updateNav('path');
    updatePathUI();
}

function showProfile() {
    showScreen('profile-screen');
    updateNav('profile');
    renderProfile();
}

function updateNav(active) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const navIndex = ['home', 'path', 'profile'].indexOf(active);
    if (navIndex >= 0) {
        document.querySelectorAll('.nav-btn')[navIndex].classList.add('active');
    }
}

// Level selection
function selectLevel(level) {
    const levelData = document.querySelector(`[data-level="${level}"] .level-node`);
    if (levelData.classList.contains('locked') && level !== 1 && !state.completedLevels.includes(level - 1)) {
        alert('Complete the previous level first! 📚');
        return;
    }
    state.currentLevel = level;
    state.currentLesson = 0;
    startLevel();
}

function updatePathUI() {
    state.completedLevels.forEach(level => {
        const node = document.querySelector(`[data-level="${level}"] .level-node`);
        if (node) {
            node.classList.remove('locked');
            // Add stars
            const starsContainer = document.querySelector(`[data-level="${level}"] .stars`);
            starsContainer.innerHTML = '<span class="star">⭐</span><span class="star">⭐</span><span class="star">⭐</span>';
        }
    });
    
    // Unlock next level if previous is completed
    state.completedLevels.forEach(level => {
        const nextNode = document.querySelector(`[data-level="${level + 1}"] .level-node`);
        if (nextNode) {
            nextNode.classList.remove('locked');
        }
    });
}

// Lesson flow
function startLevel() {
    state.hearts = 5;
    state.currentLesson = 0;
    showScreen('lesson-screen');
    renderLesson();
}

function renderLesson() {
    const levelLessons = lessons[state.currentLevel];
    if (!levelLessons || state.currentLesson >= levelLessons.length) {
        completeLevel();
        return;
    }
    
    const lesson = levelLessons[state.currentLesson];
    const contentDiv = document.getElementById('lesson-content');
    
    // Update progress
    const progress = ((state.currentLesson) / levelLessons.length) * 100;
    document.getElementById('lesson-progress').style.width = `${progress}%`;
    document.getElementById('lesson-hearts').textContent = state.hearts;
    
    if (lesson.type === 'question') {
        contentDiv.innerHTML = `
            <div class="lesson-image">${lesson.image}</div>
            <h3 class="lesson-question">${lesson.question}</h3>
            <div class="options-container" id="options-container"></div>
            <button class="btn btn-primary check-btn" onclick="checkAnswer()">CHECK</button>
            <button class="btn continue-btn" onclick="nextLesson()">CONTINUE</button>
        `;
        
        const optionsContainer = document.getElementById('options-container');
        lesson.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.onclick = () => selectOption(index);
            optionsContainer.appendChild(btn);
        });
    } else if (lesson.type === 'game') {
        renderGame(lesson);
    }
}

function selectOption(index) {
    state.selectedOption = index;
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        btn.classList.toggle('selected', i === index);
    });
}

function checkAnswer() {
    if (state.selectedOption === null) {
        alert('Please select an answer! 🤔');
        return;
    }
    
    const lesson = lessons[state.currentLevel][state.currentLesson];
    const isCorrect = state.selectedOption === lesson.correct;
    
    document.querySelectorAll('.option-btn').forEach((btn, i) => {
        if (i === lesson.correct) {
            btn.classList.add('correct');
        } else if (i === state.selectedOption && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    const checkBtn = document.querySelector('.check-btn');
    const continueBtn = document.querySelector('.continue-btn');
    
    if (isCorrect) {
        showFeedback(true, lesson.explanation);
        state.gems += 10;
        checkBtn.style.display = 'none';
        continueBtn.style.display = 'block';
        updateStats();
    } else {
        showFeedback(false, 'Not quite! Review the explanation below.');
        state.hearts--;
        document.getElementById('lesson-hearts').textContent = state.hearts;
        updateStats();
        
        if (state.hearts <= 0) {
            setTimeout(() => {
                alert('Out of hearts! Try again later. ❤️');
                showPath();
            }, 1000);
        }
    }
}

function showFeedback(isCorrect, message) {
    const feedback = document.createElement('div');
    feedback.className = `feedback-panel ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.innerHTML = `
        <div>${isCorrect ? '🎉 Excellent!' : '💪 Keep learning!'}</div>
        <div style="font-size: 0.9rem; margin-top: 10px;">${message}</div>
    `;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 3000);
}

function nextLesson() {
    state.currentLesson++;
    state.selectedOption = null;
    renderLesson();
}

// Game rendering
function renderGame(lesson) {
    const contentDiv = document.getElementById('lesson-content');
    
    contentDiv.innerHTML = `
        <h3 class="game-instruction">${lesson.instruction}</h3>
        <div id="game-area"></div>
        <button class="btn btn-primary check-btn" onclick="checkGame()">CHECK</button>
        <button class="btn continue-btn" onclick="nextLesson()">CONTINUE</button>
    `;
    
    const gameArea = document.getElementById('game-area');
    
    if (lesson.pairs) {
        // Matching game
        let items = [...lesson.pairs.map(p => p.command), ...lesson.pairs.map(p => p.purpose)];
        items = shuffleArray(items);
        
        gameArea.innerHTML = `
            <div class="drag-items" id="drag-items"></div>
            <div class="drop-zones" id="drop-zones"></div>
        `;
        
        const dragItems = document.getElementById('drag-items');
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'drag-item';
            div.textContent = item;
            div.draggable = true;
            dragItems.appendChild(div);
        });
    } else if (lesson.sequences) {
        // Sequence selection
        lesson.sequences.forEach((seq, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = Array.isArray(seq) ? seq.join(' → ') : seq;
            btn.onclick = () => selectOption(index);
            gameArea.appendChild(btn);
        });
    } else if (lesson.workflow || lesson.steps) {
        // Ordering game
        const items = lesson.workflow || lesson.steps;
        gameArea.innerHTML = `
            <div class="drag-items" id="order-items"></div>
            <p style="margin-top: 20px; color: #777;">Click items in the correct order!</p>
        `;
        
        const orderItems = document.getElementById('order-items');
        items.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = 'drag-item';
            div.textContent = item;
            div.dataset.index = index;
            div.onclick = () => reorderItem(div);
            orderItems.appendChild(div);
        });
    } else if (lesson.scenarios) {
        // Scenario matching
        lesson.scenarios.forEach((scenario, index) => {
            const div = document.createElement('div');
            div.style.margin = '15px 0';
            div.innerHTML = `
                <strong>${scenario.situation || scenario.scenario}:</strong><br>
                <span style="color: #1cb0f6;">${scenario.action || scenario.command}</span>
            `;
            gameArea.appendChild(div);
        });
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkGame() {
    // Simplified game checking - always correct for demo
    showFeedback(true, 'Great job! You\'re mastering Git! 🎯');
    state.gems += 15;
    updateStats();
    
    const checkBtn = document.querySelector('.check-btn');
    const continueBtn = document.querySelector('.continue-btn');
    checkBtn.style.display = 'none';
    continueBtn.style.display = 'block';
}

function completeLevel() {
    state.completedLevels.push(state.currentLevel);
    saveState();
    showScreen('completion-screen');
    document.getElementById('gems-earned').textContent = '+25';
    state.gems += 25;
    state.streak++;
    updateStats();
}

// Profile
function renderProfile() {
    const profileContent = document.getElementById('profile-screen');
    profileContent.innerHTML = `
        <div class="profile-content">
            <div class="profile-avatar">👨‍💻</div>
            <h2>Your Profile</h2>
            <div class="profile-stats">
                <div class="profile-stat">🔥 Streak: <strong>${state.streak} days</strong></div>
                <div class="profile-stat">💎 Gems: <strong>${state.gems}</strong></div>
                <div class="profile-stat">📚 Levels Completed: <strong>${state.completedLevels.length}</strong></div>
                <div class="profile-stat">🏆 Total XP: <strong>${state.gems * 10}</strong></div>
            </div>
            <button class="btn btn-secondary" onclick="resetProgress()">Reset Progress</button>
        </div>
    `;
}

// State persistence
function saveState() {
    localStorage.setItem('gitlingo-state', JSON.stringify(state));
}

function loadState() {
    const saved = localStorage.getItem('gitlingo-state');
    if (saved) {
        state = { ...state, ...JSON.parse(saved) };
    }
}

function updateStats() {
    document.getElementById('streak').textContent = state.streak;
    document.getElementById('gems').textContent = state.gems;
    document.getElementById('hearts').textContent = state.hearts;
    saveState();
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all progress?')) {
        state = {
            currentScreen: 'welcome',
            currentLevel: 1,
            currentLesson: 0,
            streak: 0,
            gems: 0,
            hearts: 5,
            completedLevels: [],
            selectedOption: null
        };
        saveState();
        updateStats();
        showWelcome();
    }
}

// Helper for reordering
let clickOrder = [];
function reorderItem(item) {
    clickOrder.push(item.dataset.index);
    item.style.background = '#58cc02';
    item.style.color = 'white';
}

// Initialize on load
window.onload = init;
