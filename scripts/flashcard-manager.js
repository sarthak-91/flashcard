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
    
    
            const filteredWords = this.words.filter(word => {
                // Check if the word meets difficulty criteria
                const matchesDifficulty = difficulties.some(diff => 
                    word.difficulty.toLowerCase() === diff.toLowerCase()
                );
    
                // Get start and end letters for this difficulty
                const startLetter = (startLetters[word.difficulty] || 'a').toLowerCase();
                const endLetter = (endLetters[word.difficulty] || 'z').toLowerCase();
    
                const firstLetter = word.word[0].toLowerCase();
    
                return matchesDifficulty && 
                       firstLetter >= startLetter && 
                       firstLetter <= endLetter;
            });
    
            // Random shuffle
            this.filteredWords = filteredWords.sort(() => Math.random() - 0.5);
        
        // Ensure some words are selected
        if (this.filteredWords.length === 0) {
            console.warn('No words match the selected criteria');
            this.filteredWords = this.words; // Fallback to all words
        }
        return this.filteredWords;
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

}