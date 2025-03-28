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
 
                const matchesDifficulty = difficulties.some(diff => 
                    word.difficulty.toLowerCase() === diff.toLowerCase()
                );
    

                const startLetter = (startLetters[word.difficulty] || 'a').toLowerCase();
                const endLetter = (endLetters[word.difficulty] || 'z').toLowerCase();
    
                const firstLetter = word.word[0].toLowerCase();
    
                return matchesDifficulty && 
                       firstLetter >= startLetter && 
                       firstLetter <= endLetter;
            });
    

            this.filteredWords = filteredWords.sort(() => Math.random() - 0.5);
        
        if (this.filteredWords.length === 0) {
            console.warn('No words match the selected criteria');
            this.filteredWords = this.words; 
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