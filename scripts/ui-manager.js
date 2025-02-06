class UIManager {
    static showHome() {
        // Show home screen and hide others
        document.getElementById('home').classList.remove('hidden');
        document.getElementById('flashcard').classList.add('hidden');
        document.getElementById('scoreScreen').classList.add('hidden');

        // Reset difficulty checkboxes
        ['easy', 'medium', 'hard'].forEach(diff => {
            const checkbox = document.getElementById(diff);
            if (checkbox) {
                checkbox.checked = false;
                // Reset the range inputs
                const rangeDiv = document.getElementById(`${diff}Range`);
                if (rangeDiv) {
                    rangeDiv.classList.add('hidden');
                    const startInput = document.getElementById(`${diff}Start`);
                    const endInput = document.getElementById(`${diff}End`);
                    if (startInput) startInput.value = '';
                    if (endInput) endInput.value = '';
                }
            }
        });

        // Reset select all checkbox
        const selectAll = document.getElementById('selectAll');
        if (selectAll) selectAll.checked = false;

        // Reset flashcard view
        const definition = document.getElementById('definition');
        if (definition) {
            definition.classList.add('hidden');
        }
        const usage = document.getElementById('usage');
        if (usage) {
            usage.classList.add('hidden');
        }
        
        const showMeaningBtn = document.querySelector('.show-meaning-btn');
        if (showMeaningBtn) {
            showMeaningBtn.textContent = 'Show Definition';
        }

        // Reset progress bar
        const progressFill = document.getElementById('progress-fill');
        if (progressFill) {
            progressFill.style.width = '0%';
        }
    }

    static showFlashcard(word, currentIndex, totalWords) {
        document.getElementById('definition').classList.add('hidden');
        document.getElementById('usage').classList.add('hidden');
        document.querySelector('.show-meaning-btn').textContent = 'Show Definition';
        document.getElementById('word').textContent = word.word;
        document.getElementById('partOfSpeech').textContent = word.partOfSpeech;
        document.getElementById('definition').textContent ='Definition: ' +  word.definition;
        document.getElementById('usage').textContent =  'Usage: ' + word.usage;
        
        // Update difficulty badge
        const badge = document.getElementById('difficulty-badge');
        badge.textContent = word.difficulty;
        badge.className = 'difficulty-badge ' + word.difficulty;
        
        // Update progress bar
        const progressPercent = ((currentIndex + 1) / totalWords) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    }

    static showScore(correct, total) {
            const percentage = ((correct / total) * 100).toFixed(1);
            const scoreElement = document.getElementById('score');
            
            // Enhanced score display with performance feedback
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
        }
}