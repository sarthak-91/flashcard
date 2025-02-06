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
        document.getElementById('definition').textContent = word.definition;
        document.getElementById('usage').textContent =  word.usage;
        
        // Update difficulty badge
        const badge = document.getElementById('difficulty-badge');
        badge.textContent = word.difficulty;
        badge.className = 'difficulty-badge ' + word.difficulty;
        
        // Update progress bar
        const progressPercent = ((currentIndex + 1) / totalWords) * 100;
        document.getElementById('progress-fill').style.width = `${progressPercent}%`;
    }

    static showScore(correct, total) {
        document.getElementById('score').textContent = `You got ${correct} out of ${total} correct.`;
    }
}