class VocabularyLoader {
    static async loadWordsFromCSV() {
        try {
            const response = await fetch('vocab_output.csv');
            const csvText = await response.text();
            
            return this.parseCSV(csvText);
        } catch (error) {
            console.error('Error loading vocabulary:', error);
            alert('Error loading vocabulary. Please try again later.');
            return [];
        }
    }

    static parseCSV(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        lines.shift(); // Remove header

        return lines.map(line => {
            const firstCommaIndex = line.indexOf(',');
            const word = line.slice(0, firstCommaIndex).trim();
            
            const restOfLine = line.slice(firstCommaIndex + 1);
            const secondCommaIndex = restOfLine.indexOf(',');
            const partOfSpeech = restOfLine.slice(0, secondCommaIndex).trim();
            
            const remainingText = restOfLine.slice(secondCommaIndex + 1);
            const lastCommaIndex = remainingText.lastIndexOf(',');
            
            const definition = remainingText.slice(0, lastCommaIndex).trim();
            const difficulty = remainingText.slice(lastCommaIndex + 1).trim();

            return {
                word,
                partOfSpeech: `(${partOfSpeech})`,
                definition,
                difficulty
            };
        });
    }
}

