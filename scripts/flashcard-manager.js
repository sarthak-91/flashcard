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
            console.log('Filtering with difficulties:', difficulties);
            console.log('Start letters:', startLetters);
            console.log('End letters:', endLetters);
            console.log('Total words before filtering:', this.words.length);
    
            const filteredWords = this.words.filter(word => {
                const wordDifficulty = word.difficulty.trim();
                const matchesDifficulty = difficulties.some(diff => 
                    wordDifficulty.toLowerCase() === diff.toLowerCase()
                );
    
                if (!matchesDifficulty) return false;
                const difficultyKey = difficulties.find(diff => 
                    wordDifficulty.toLowerCase() === diff.toLowerCase()
                );
                

                const startLetter = (startLetters[difficultyKey] || 'a').toLowerCase();
                const endLetter = (endLetters[difficultyKey] || 'z').toLowerCase();
    
                const firstLetter = word.word[0].toLowerCase();
    
                return firstLetter >= startLetter && firstLetter <= endLetter;
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