class VocabularyLoader {
    static async loadWordsFromCSV() {
        try {
            const response = await fetch('vocab_output.csv');
            const csvText = await response.text();
            
            console.log('Total CSV lines:', csvText.split('\n').length);
            const words = this.parseCSV(csvText);
            console.log('Parsed words count:', words.length);
            
            return words;
            }
         catch (error) {
            console.error('Error loading vocabulary:', error);
            alert('Error loading vocabulary. Please try again later.');
            return [];
        }
    }

    static parseCSV(csvText) {
        // More robust CSV parsing
        const lines = csvText.split('\n').filter(line => line.trim() !== '');
        const headers = lines.shift().split(',').map(header => header.trim());

        return lines.map(line => {
            // Handle quoted fields and escaped commas
            const columns = this.splitCSVLine(line);

            // Validate we have enough columns
            if (columns.length < headers.length) {
                console.warn(`Skipping malformed line: ${line}`);
                return null;
            }

            return {
                word: columns[0].trim(),
                partOfSpeech: `(${columns[1].trim()})`,
                definition: columns[2].trim(),
                difficulty: columns[3].trim(),
                usage: columns[4].trim()
            };
        }).filter(word => word !== null);
    }


    static splitCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        
        result.push(current);
        
        // Remove quotes from entries
        return result.map(entry => entry.replace(/^"|"$/g, '').trim());
    }
}

