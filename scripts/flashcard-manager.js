class FlashcardManager {
    constructor(words) {
        this.words = words;
        this.filteredWords = [];
        this.incorrectWords = [];
        this.currentIndex = 0;
        this.correctAnswers = 0;
        this.totalAnswered = 0;
    }

    filterWords(difficulties, startLetters, endLetters) {
        this.filteredWords = this.words.filter(word => {
            const matchesDifficulty = difficulties.includes(word.difficulty);
            const startLetter = startLetters[word.difficulty] || 'a';
            const endLetter = endLetters[word.difficulty] || 'z';
            const matchesLetterRange = word.word.toLowerCase()[0] >= startLetter 
                                    && word.word.toLowerCase()[0] <= endLetter;
            
            return matchesDifficulty && matchesLetterRange;
        }).sort(() => Math.random() - 0.5);
    }

    getCurrentWord() {
        return this.filteredWords[this.currentIndex];
    }

    markAnswer(isCorrect) {
        this.totalAnswered++;
        if (!isCorrect) {
            this.incorrectWords.push(this.getCurrentWord());
        } else {
            this.correctAnswers++;
        }
    }

    // Other methods like next, previous, etc.
}