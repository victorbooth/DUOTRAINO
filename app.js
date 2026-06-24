// DUOTRAINO - Interactive Git & GitHub Learning App

// State management with profile support
let state = {
    currentScreen: 'profile-select',
    currentLevel: 1,
    currentLesson: 0,
    streak: 0,
    gems: 0,
    completedLevels: [],
    selectedOption: null,
    currentProfile: null,
    missedQuestions: [],
    inReviewMode: false
};

// Profile management
let profiles = JSON.parse(localStorage.getItem('duotraino_profiles')) || {};

function saveProfiles() {
    localStorage.setItem('duotraino_profiles', JSON.stringify(profiles));
}

function saveState() {
    if (state.currentProfile) {
        profiles[state.currentProfile] = {
            streak: state.streak,
            gems: state.gems,
            completedLevels: state.completedLevels
        };
        saveProfiles();
    }
}

function loadProfile(profileName) {
    state.currentProfile = profileName;
    if (profiles[profileName]) {
        state.streak = profiles[profileName].streak || 0;
        state.gems = profiles[profileName].gems || 0;
        state.completedLevels = profiles[profileName].completedLevels || [];
    } else {
        state.streak = 0;
        state.gems = 0;
        state.completedLevels = [];
    }
    updateStats();
    showPath();
}

function showProfileSelect() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('profile-select-screen').classList.add('active');
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.bottom-nav').style.display = 'none';
    renderProfileList();
}

function renderProfileList() {
    const list = document.getElementById('profile-list');
    const profileNames = Object.keys(profiles);
    
    if (profileNames.length === 0) {
        list.innerHTML = '<p style="text-align:center;color:#666;">No profiles yet. Create one to get started!</p>';
    } else {
        list.innerHTML = profileNames.map(name => `
            <button class="btn btn-primary" style="width:100%;margin:10px 0;padding:15px;font-size:18px;" onclick="loadProfile('${name}')">
                👤 ${name}
                ${profiles[name].completedLevels ? `<span style="float:right;">${profiles[name].completedLevels.length} levels</span>` : ''}
            </button>
        `).join('');
    }
}

function showCreateProfile() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('create-profile-screen').classList.add('active');
}

function createProfile() {
    const nameInput = document.getElementById('new-profile-name');
    const name = nameInput.value.trim();
    
    if (!name) {
        alert('Please enter a name!');
        return;
    }
    
    if (profiles[name]) {
        alert('Profile already exists! Choose a different name.');
        return;
    }
    
    profiles[name] = {
        streak: 0,
        gems: 0,
        completedLevels: []
    };
    saveProfiles();
    nameInput.value = '';
    loadProfile(name);
}

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
                'A parallel line of development',
                'A deleted file',
                'A remote server'
            ],
            correct: 1,
            explanation: 'A branch is a parallel line of development that allows you to work on features without affecting the main codebase.'
        },
        {
            type: 'question',
            question: 'Which command creates a new branch?',
            image: '🌱',
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
            title: 'Branch Operations',
            instruction: 'Match the branch command with its action!',
            pairs: [
                { command: 'git branch', purpose: 'List branches' },
                { command: 'git checkout', purpose: 'Switch branch' },
                { command: 'git merge', purpose: 'Combine branches' }
            ]
        }
    ],
    4: [ // Merging
        {
            type: 'question',
            question: 'What is a merge conflict?',
            image: '⚠️',
            options: [
                'When Git can\'t automatically combine changes',
                'When two branches are identical',
                'When a file is deleted',
                'When the repository is corrupted'
            ],
            correct: 0,
            explanation: 'A merge conflict occurs when Git cannot automatically resolve differences between two commits.'
        },
        {
            type: 'question',
            question: 'How do you resolve a merge conflict?',
            image: '🔧',
            options: [
                'Delete the conflicting file',
                'Manually edit the file and commit',
                'Run git reset',
                'Create a new branch'
            ],
            correct: 1,
            explanation: 'You must manually edit the conflicted file to choose which changes to keep, then commit the resolution.'
        },
        {
            type: 'game',
            title: 'Merge Scenarios',
            instruction: 'Decide the best approach for each scenario!',
            scenarios: [
                { situation: 'Small feature addition', answer: 'Fast-forward merge' },
                { situation: 'Long-running feature branch', answer: 'Squash merge' },
                { situation: 'Preserve all history', answer: 'Regular merge' }
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
            explanation: 'A Pull Request is a proposal to merge your changes into another branch, allowing for discussion and review.'
        },
        {
            type: 'question',
            question: 'Where are Pull Requests commonly used?',
            image: '🌐',
            options: [
                'Only in Git CLI',
                'GitHub, GitLab, Bitbucket',
                'Local repositories only',
                'Text editors'
            ],
            correct: 1,
            explanation: 'Pull Requests are a feature of Git hosting platforms like GitHub, GitLab, and Bitbucket.'
        },
        {
            type: 'game',
            title: 'PR Workflow',
            instruction: 'Order the Pull Request steps correctly!',
            steps: [
                'Create a branch',
                'Make changes and commit',
                'Push to remote',
                'Open Pull Request',
                'Review and merge'
            ]
        }
    ],
    6: [ // Collaboration
        {
            type: 'question',
            question: 'What does "git fetch" do?',
            image: '📥',
            options: [
                'Downloads changes without merging',
                'Deletes remote branches',
                'Creates a new repository',
                'Uploads your changes'
            ],
            correct: 0,
            explanation: 'git fetch downloads commits and refs from a remote repository but doesn\'t merge them into your work.'
        },
        {
            type: 'question',
            question: 'What is the difference between fetch and pull?',
            image: '🔄',
            options: [
                'They are the same',
                'Pull also merges the changes',
                'Fetch is faster',
                'Pull only works on main branch'
            ],
            correct: 1,
            explanation: 'git pull is equivalent to git fetch followed by git merge - it downloads AND merges changes.'
        },
        {
            type: 'game',
            title: 'Collaboration Commands',
            instruction: 'Match the command with its collaboration use!',
            pairs: [
                { command: 'git push', purpose: 'Share your changes' },
                { command: 'git pull', purpose: 'Get others\' changes' },
                { command: 'git remote', purpose: 'Manage connections' }
            ]
        }
    ]
};

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    showProfileSelect();
});

function updateStats() {
    document.getElementById('streak').textContent = state.streak;
    document.getElementById('gems').textContent = state.gems;
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    // Show/hide header and nav based on screen
    const hideNavScreens = ['profile-select-screen', 'create-profile-screen'];
    const shouldHide = hideNavScreens.includes(screenId);
    document.querySelector('.header').style.display = shouldHide ? 'none' : 'flex';
    document.querySelector('.bottom-nav').style.display = shouldHide ? 'none' : 'flex';
}

function showPath() {
    showScreen('path-screen');
    renderPath();
}

function renderPath() {
    document.querySelectorAll('.level-node').forEach((node, index) => {
        const levelNum = index + 1;
        const isCompleted = state.completedLevels.includes(levelNum);
        const isLocked = levelNum > 1 && !state.completedLevels.includes(levelNum - 1);
        
        node.classList.toggle('locked', isLocked);
        node.classList.toggle('completed', isCompleted);
        
        const starsDiv = node.parentElement.querySelector('.stars');
        if (isCompleted) {
            starsDiv.innerHTML = '⭐⭐⭐';
        } else if (isLocked) {
            starsDiv.innerHTML = '';
        } else {
            starsDiv.innerHTML = '🔒';
        }
    });
}

function selectLevel(level) {
    const isLocked = level > 1 && !state.completedLevels.includes(level - 1);
    if (isLocked) return;
    
    state.currentLevel = level;
    state.currentLesson = 0;
    state.missedQuestions = [];
    state.inReviewMode = false;
    startLesson();
}

function startLesson() {
    showScreen('lesson-screen');
    renderLesson();
}

function renderLesson() {
    const lessonData = lessons[state.currentLevel][state.currentLesson];
    const content = document.getElementById('lesson-content');
    const feedbackContainer = document.getElementById('feedback-container');
    feedbackContainer.style.display = 'none';
    feedbackContainer.innerHTML = '';
    
    if (!lessonData) {
        // Level complete!
        completeLevel();
        return;
    }
    
    // Update progress
    const progress = ((state.currentLesson) / lessons[state.currentLevel].length) * 100;
    document.getElementById('lesson-progress').style.width = `${progress}%`;
    
    if (lessonData.type === 'question') {
        content.innerHTML = `
            <div class="mascot-large">${lessonData.image}</div>
            <h3>${lessonData.question}</h3>
            <div class="options-grid">
                ${lessonData.options.map((opt, i) => `
                    <button class="option-btn" onclick="selectAnswer(${i})">${opt}</button>
                `).join('')}
            </div>
            <button id="continue-btn" class="btn btn-primary btn-large" style="display:none;margin-top:20px;" onclick="nextQuestion()">Continue</button>
        `;
    } else if (lessonData.type === 'game') {
        startGame(lessonData);
    }
}

function selectAnswer(index) {
    const lessonData = lessons[state.currentLevel][state.currentLesson];
    const buttons = document.querySelectorAll('.option-btn');
    const feedbackContainer = document.getElementById('feedback-container');
    const continueBtn = document.getElementById('continue-btn');
    
    // Disable all buttons after selection
    buttons.forEach(btn => btn.disabled = true);
    
    if (index === lessonData.correct) {
        // Correct!
        buttons[index].classList.add('correct');
        feedbackContainer.style.display = 'block';
        feedbackContainer.className = 'feedback-correct';
        feedbackContainer.innerHTML = `
            <strong>✅ Correct!</strong><br>
            ${lessonData.explanation}
        `;
        state.gems += 5;
        updateStats();
        saveState();
        continueBtn.style.display = 'block';
    } else {
        // Incorrect
        buttons[index].classList.add('incorrect');
        buttons[lessonData.correct].classList.add('correct');
        
        // Track missed question for review
        if (!state.inReviewMode && !state.missedQuestions.includes(state.currentLesson)) {
            state.missedQuestions.push(state.currentLesson);
        }
        
        feedbackContainer.style.display = 'block';
        feedbackContainer.className = 'feedback-incorrect';
        feedbackContainer.innerHTML = `
            <strong>❌ Not quite!</strong><br>
            ${lessonData.explanation}
        `;
        continueBtn.style.display = 'block';
    }
}

function nextQuestion() {
    state.currentLesson++;
    renderLesson();
}

function startGame(lessonData) {
    const content = document.getElementById('lesson-content');
    
    if (lessonData.pairs) {
        // Matching game
        let shuffledLeft = [...lessonData.pairs].sort(() => Math.random() - 0.5);
        let shuffledRight = [...lessonData.pairs].sort(() => Math.random() - 0.5);
        
        content.innerHTML = `
            <h3>${lessonData.title}</h3>
            <p>${lessonData.instruction}</p>
            <div class="match-game">
                <div class="match-column">
                    ${shuffledLeft.map((item, i) => `
                        <div class="match-item" data-id="${i}" data-type="left" onclick="selectMatch(this)">${item.command}</div>
                    `).join('')}
                </div>
                <div class="match-column">
                    ${shuffledRight.map((item, i) => `
                        <div class="match-item" data-id="${i}" data-type="right" onclick="selectMatch(this)">${item.purpose}</div>
                    `).join('')}
                </div>
            </div>
            <button id="continue-btn" class="btn btn-primary btn-large" style="display:none;margin-top:20px;" onclick="nextQuestion()">Continue</button>
        `;
        
        state.selectedMatch = null;
        state.matchedPairs = 0;
        state.totalPairs = lessonData.pairs.length;
    } else if (lessonData.steps) {
        // Ordering game
        let shuffledSteps = [...lessonData.steps].sort(() => Math.random() - 0.5);
        
        content.innerHTML = `
            <h3>${lessonData.title}</h3>
            <p>${lessonData.instruction}</p>
            <div class="order-game" id="order-container">
                ${shuffledSteps.map((step, i) => `
                    <div class="order-item" draggable="true" data-index="${i}">${step}</div>
                `).join('')}
            </div>
            <button id="continue-btn" class="btn btn-primary btn-large" style="display:none;margin-top:20px;" onclick="nextQuestion()">Continue</button>
        `;
        
        initOrderGame(lessonData.steps);
    } else if (lessonData.scenarios) {
        // Scenario game
        state.currentScenario = 0;
        state.scenarioCorrect = 0;
        renderScenario(lessonData);
    }
}

function selectMatch(element) {
    if (element.classList.contains('matched')) return;
    
    if (!state.selectedMatch) {
        state.selectedMatch = element;
        element.classList.add('selected');
    } else {
        const first = state.selectedMatch;
        const second = element;
        
        if (first === second) {
            first.classList.remove('selected');
            state.selectedMatch = null;
            return;
        }
        
        // Check if they match
        const leftItem = first.dataset.type === 'left' ? first : second;
        const rightItem = first.dataset.type === 'right' ? first : second;
        
        const leftIndex = parseInt(leftItem.dataset.id);
        const rightIndex = parseInt(rightItem.dataset.id);
        
        const lessonData = lessons[state.currentLevel][state.currentLesson];
        const isMatch = lessonData.pairs[leftIndex].command === 
                       lessonData.pairs.find(p => p.purpose === rightItem.textContent)?.command &&
                       lessonData.pairs[leftIndex].purpose === rightItem.textContent;
        
        if (isMatch) {
            leftItem.classList.add('matched', 'correct');
            rightItem.classList.add('matched', 'correct');
            state.matchedPairs++;
            
            if (state.matchedPairs === state.totalPairs) {
                document.getElementById('continue-btn').style.display = 'block';
                state.gems += 10;
                updateStats();
                saveState();
            }
        } else {
            leftItem.classList.add('incorrect');
            rightItem.classList.add('incorrect');
            setTimeout(() => {
                leftItem.classList.remove('selected', 'incorrect');
                rightItem.classList.remove('incorrect');
            }, 1000);
        }
        
        state.selectedMatch = null;
    }
}

function initOrderGame(correctOrder) {
    const container = document.getElementById('order-container');
    let draggedItem = null;
    
    container.querySelectorAll('.order-item').forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            if (afterElement == null) {
                container.appendChild(draggedItem);
            } else {
                container.insertBefore(draggedItem, afterElement);
            }
        });
        
        item.addEventListener('dragend', () => {
            draggedItem.classList.remove('dragging');
            checkOrder(correctOrder);
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.order-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function checkOrder(correctOrder) {
    const container = document.getElementById('order-container');
    const currentOrder = [...container.querySelectorAll('.order-item')].map(el => el.textContent);
    
    if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
        container.querySelectorAll('.order-item').forEach(el => el.classList.add('correct'));
        document.getElementById('continue-btn').style.display = 'block';
        state.gems += 10;
        updateStats();
        saveState();
    }
}

function renderScenario(lessonData) {
    if (state.currentScenario >= lessonData.scenarios.length) {
        // All scenarios done
        document.getElementById('lesson-content').innerHTML = `
            <h3>Great job!</h3>
            <p>You completed all scenarios!</p>
            <button class="btn btn-primary btn-large" onclick="nextQuestion()">Continue</button>
        `;
        state.gems += 10;
        updateStats();
        saveState();
        return;
    }
    
    const scenario = lessonData.scenarios[state.currentScenario];
    const content = document.getElementById('lesson-content');
    
    content.innerHTML = `
        <h3>${lessonData.title}</h3>
        <p>${scenario.situation}</p>
        <div class="options-grid">
            <button class="option-btn" onclick="checkScenario('${scenario.answer}', true)">${scenario.answer}</button>
            ${lessonData.scenarios.filter(s => s.answer !== scenario.answer).slice(0, 2).map(s => `
                <button class="option-btn" onclick="checkScenario('${s.answer}', false)">${s.answer}</button>
            `).join('')}
        </div>
    `;
}

function checkScenario(answer, isCorrect) {
    const lessonData = lessons[state.currentLevel][state.currentLesson];
    
    if (isCorrect) {
        state.scenarioCorrect++;
        state.currentScenario++;
        renderScenario(lessonData);
    } else {
        alert('Not quite! Try again.');
    }
}

function completeLevel() {
    // Check if there are missed questions to review
    if (!state.inReviewMode && state.missedQuestions.length > 0) {
        state.inReviewMode = true;
        state.reviewQueue = [...state.missedQuestions];
        state.currentLesson = state.reviewQueue.shift();
        startLesson();
        return;
    }
    
    // Level truly complete
    if (!state.completedLevels.includes(state.currentLevel)) {
        state.completedLevels.push(state.currentLevel);
        state.streak++;
    }
    
    state.gems += 20;
    updateStats();
    saveState();
    
    showScreen('completion-screen');
    document.getElementById('gems-earned').textContent = '+20';
}

function showWelcome() {
    showScreen('welcome-screen');
}

function showProfile() {
    showScreen('profile-screen');
    renderProfileView();
}

function renderProfileView() {
    const profileContent = document.getElementById('profile-screen');
    profileContent.innerHTML = `
        <div class="profile-content">
            <div class="profile-avatar">👨‍💻</div>
            <h2>${state.currentProfile || 'Guest'}</h2>
            <div class="profile-stats">
                <div class="stat-row">
                    <span>🔥 Streak:</span>
                    <span>${state.streak} days</span>
                </div>
                <div class="stat-row">
                    <span>💎 Gems:</span>
                    <span>${state.gems}</span>
                </div>
                <div class="stat-row">
                    <span>✅ Levels Completed:</span>
                    <span>${state.completedLevels.length}/6</span>
                </div>
            </div>
            <button class="btn btn-secondary" onclick="showPath()">Back to Path</button>
            <button class="btn btn-danger" onclick="switchProfile()" style="margin-top:10px;">Switch Profile</button>
        </div>
    `;
}

function switchProfile() {
    state.currentProfile = null;
    showProfileSelect();
}
