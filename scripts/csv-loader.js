class VocabularyLoader {
    static async loadWordsFromCSV() {
        try {
            const response = await fetch('checking_output.csv');
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
            const columns = line.split(',');
    
            // Extract each column value
            const word = columns[0].trim();
            const partOfSpeech = columns[1].trim();
            const definition = columns[2].trim();
            const difficulty = columns[3].trim();
            const usage = columns[4].trim();
    
            return {
                word,
                partOfSpeech: `(${partOfSpeech})`,
                definition,
                difficulty,
                usage
            };
        });
    }
}

