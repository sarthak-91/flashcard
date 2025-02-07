class UIManager {
    static ELEMENTS = {
        screens: {
            home: 'home',
            flashcard: 'flashcard',
            scoreScreen: 'scoreScreen'
        },
        difficulties: ['easy', 'medium', 'hard'],
        flashcard: {
            word: 'word',
            partOfSpeech: 'partOfSpeech',
            definition: 'definition',
            usage: 'usage',
            showMeaningBtn: '.show-meaning-btn',
            progressFill: 'progress-fill',
            difficultyBadge: 'difficulty-badge'
        }
    };

    static showHome() {
        // Use screen transition with feedback
        this._switchScreen(this.ELEMENTS.screens.home);
        this._resetHomeScreen();
        this._resetFlashcardState();
    }

    static showFlashcard(word, currentIndex, totalWords) {
        if (!word) {
            console.error('No word provided to showFlashcard');
            return;
        }
        this._updateFlashcardContent(word);
        this._updateProgress(currentIndex, totalWords);
        this._updateDifficultyBadge(word.difficulty);
    }

    static showScore(correct, total) {
        const percentage = ((correct / total) * 100).toFixed(1);
        const scoreElement = document.getElementById('score');
        
        
        let performanceMessage = '';
        if (percentage >= 90) performanceMessage = 'Excellent job! 🎉';
        else if (percentage >= 70) performanceMessage = 'Well done! 👏';
        else if (percentage >= 50) performanceMessage = 'Good effort! 💪';
        else performanceMessage = 'Keep practicing! 📚';

        scoreElement.innerHTML = `
            <div class="score-details">
                <h3>Your Results</h3>
                <p class="score-numbers">Score: ${correct}/${total} (${percentage}%)</p>
                <p class="score-message">${performanceMessage}</p>
            </div>
        `;

        this._switchScreen(this.ELEMENTS.screens.scoreScreen);
    }

    static _switchScreen(screenId) {
        // Hide all screens first
        Object.values(this.ELEMENTS.screens).forEach(screen => {
            document.getElementById(screen).classList.add('hidden');
        });
        
        // Show requested screen with fade effect
        const screenElement = document.getElementById(screenId);
        screenElement.classList.remove('hidden');
        screenElement.classList.add('fade-in');
        
        // Remove fade class after animation
        setTimeout(() => {
            screenElement.classList.remove('fade-in');
        }, 500);
    }

    static _resetHomeScreen() {
        // Reset difficulty selections
        this.ELEMENTS.difficulties.forEach(diff => {
            const checkbox = document.getElementById(diff);
            const rangeDiv = document.getElementById(`${diff}Range`);
            
            if (checkbox && rangeDiv) {
                checkbox.checked = false;
                rangeDiv.classList.add('hidden');
                
                // Reset and clear range inputs
                ['Start', 'End'].forEach(type => {
                    const input = document.getElementById(`${diff}${type}`);
                    if (input) {
                        input.value = '';
                        input.classList.remove('valid', 'invalid');
                    }
                });
            }
        });
    }

    static _resetFlashcardState() {
        const elements = this.ELEMENTS.flashcard;
        
        // Reset flashcard content
        ['definition', 'usage'].forEach(element => {
            const el = document.getElementById(elements[element]);
            if (el) {
                el.classList.add('hidden');
                el.textContent = '';
            }
        });

        // Reset show meaning button
        const showMeaningBtn = document.querySelector(elements.flashcard.showMeaningBtn);
        if (showMeaningBtn) {
            showMeaningBtn.textContent = 'Show Definition';
            showMeaningBtn.classList.remove('active');
        }

        // Reset progress
        const progressFill = document.getElementById(elements.progressFill);
        if (progressFill) {
            progressFill.style.width = '0%';
            progressFill.classList.remove('complete');
        }
    }

    static _updateFlashcardContent(word) {
        // Update word display with error handling
        Object.entries({
            [this.ELEMENTS.flashcard.word]: word.word,
            [this.ELEMENTS.flashcard.partOfSpeech]: word.partOfSpeech,
            [this.ELEMENTS.flashcard.definition]: `Definition: ${word.definition}`,
            [this.ELEMENTS.flashcard.usage]: `Usage: ${word.usage}`
        }).forEach(([elementId, content]) => {
            const element = document.getElementById(elementId);
            if (element) element.textContent = content;
        });
        const showMeaningBtn = document.querySelector(this.ELEMENTS.flashcard.showMeaningBtn);
        if (showMeaningBtn) {
            showMeaningBtn.textContent = 'Show Definition';
        }

        // Reset visibility states
        document.getElementById(this.ELEMENTS.flashcard.definition).classList.add('hidden');
        document.getElementById(this.ELEMENTS.flashcard.usage).classList.add('hidden');
    }

    static _updateProgress(currentIndex, totalWords) {
        const progressFill = document.getElementById(this.ELEMENTS.flashcard.progressFill);
        if (!progressFill) return;

        const progressPercent = ((currentIndex + 1) / totalWords) * 100;
        progressFill.style.width = `${progressPercent}%`;
        
        // Add completion effect
        if (progressPercent === 100) {
            progressFill.classList.add('complete');
        }
    }

    static _updateDifficultyBadge(difficulty) {
        const badge = document.getElementById(this.ELEMENTS.flashcard.difficultyBadge);
        if (!badge) return;

        badge.textContent = difficulty;
        badge.className = `difficulty-badge ${difficulty.toLowerCase()}`;
    }
}