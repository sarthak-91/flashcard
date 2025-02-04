class UIManager {
    static showHome() {
        document.getElementById('home').classList.remove('hidden');
        document.getElementById('flashcard').classList.add('hidden');
        document.getElementById('scoreScreen').classList.add('hidden');
    }

    static showFlashcard(word) {
        document.getElementById('definition').classList.add('hidden');
        document.querySelector('.show-meaning-btn').textContent = 'Show Definition'
        document.getElementById('word').textContent = word.word;
        document.getElementById('partOfSpeech').textContent = word.partOfSpeech;
        document.getElementById('definition').textContent = word.definition;
        // Other UI updates
    }

    static showScore(correct, total) {
        document.getElementById('score').textContent = `You got ${correct} out of ${total} correct.`;
        // Switch to score screen
    }
}