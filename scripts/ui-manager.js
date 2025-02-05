class UIManager {
    static showHome() {
        document.getElementById('home').classList.remove('hidden');
        document.getElementById('flashcard').classList.add('hidden');
        document.getElementById('scoreScreen').classList.add('hidden');
    }

    static showFlashcard(word, currentIndex, totalWords) {
        document.getElementById('definition').classList.add('hidden');
        document.querySelector('.show-meaning-btn').textContent = 'Show Definition';
        document.getElementById('word').textContent = word.word;
        document.getElementById('partOfSpeech').textContent = word.partOfSpeech;
        document.getElementById('definition').textContent = word.definition;
        
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