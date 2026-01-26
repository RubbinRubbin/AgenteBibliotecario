/**
 * Generatore di Dataset Libri Casuali
 * Genera sempre 500 libri combinando casualmente titoli, autori e anni
 */

class DatasetGenerator {
    constructor() {
        this.titoli = [];
        this.autori = [];
        this.numeroLibri = 500;
        this.minAnno = 1900;
        this.maxAnno = 2024;
    }

    /**
     * Carica i pool di dati (titoli e autori) dai file JSON
     */
    async caricaPool() {
        try {
            const [titoliResponse, autoriResponse] = await Promise.all([
                fetch('../../assets/data/titoli.json'),
                fetch('../../assets/data/autori.json')
            ]);

            this.titoli = await titoliResponse.json();
            this.autori = await autoriResponse.json();

            console.log(`Pool caricati: ${this.titoli.length} titoli, ${this.autori.length} autori`);
            return true;
        } catch (error) {
            console.error('Errore nel caricamento dei pool:', error);
            return false;
        }
    }

    /**
     * Genera un numero casuale tra min e max (inclusi)
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Seleziona un elemento casuale da un array
     */
    randomElement(array) {
        return array[this.randomInt(0, array.length - 1)];
    }

    /**
     * Genera un singolo libro casuale
     */
    generaLibroCasuale() {
        return {
            titolo: this.randomElement(this.titoli),
            autore: this.randomElement(this.autori),
            anno: this.randomInt(this.minAnno, this.maxAnno)
        };
    }

    /**
     * Crea una chiave univoca per un libro (per evitare duplicati esatti)
     */
    chiaveLibro(libro) {
        return `${libro.titolo}|${libro.autore}|${libro.anno}`;
    }

    /**
     * Genera un dataset di 500 libri casuali (senza duplicati esatti)
     * @returns {Array} Array di libri generati
     */
    genera() {
        // Genera sempre 500 libri
        const numeroLibri = this.numeroLibri;

        const libri = [];
        const libriSet = new Set(); // Per tracciare duplicati

        let tentativi = 0;
        const maxTentativi = numeroLibri * 10; // Limite per evitare loop infiniti

        while (libri.length < numeroLibri && tentativi < maxTentativi) {
            const libro = this.generaLibroCasuale();
            const chiave = this.chiaveLibro(libro);

            // Aggiungi solo se non è un duplicato esatto
            if (!libriSet.has(chiave)) {
                libriSet.add(chiave);
                libri.push(libro);
            }

            tentativi++;
        }

        console.log(`Dataset generato: ${libri.length} libri unici in ${tentativi} tentativi`);
        return libri;
    }

    /**
     * Genera e salva il dataset in formato JSON (sempre 500 libri)
     * @returns {Object} Oggetto con i libri e le statistiche
     */
    generaESalva() {
        const libri = this.genera();

        // Prepara i dati per il download
        const dataStr = JSON.stringify(libri, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        return {
            libri: libri,
            count: libri.length,
            dataBlob: dataBlob,
            dataStr: dataStr
        };
    }

    /**
     * Scarica il dataset come file JSON
     */
    scaricaDataset(libri, nomeFile = 'libri_generati.json') {
        const dataStr = JSON.stringify(libri, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = nomeFile;
        link.click();

        URL.revokeObjectURL(url);
        console.log(`Dataset scaricato: ${nomeFile}`);
    }

    /**
     * Ottiene statistiche sul dataset generato
     */
    getStatistiche(libri) {
        const anni = libri.map(l => l.anno);
        const autoriUnici = new Set(libri.map(l => l.autore));
        const titoliUnici = new Set(libri.map(l => l.titolo));

        return {
            totaleLibri: libri.length,
            annoMinimo: Math.min(...anni),
            annoMassimo: Math.max(...anni),
            autoriUnici: autoriUnici.size,
            titoliUnici: titoliUnici.size,
            annoMedio: Math.round(anni.reduce((a, b) => a + b, 0) / anni.length)
        };
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DatasetGenerator;
}
