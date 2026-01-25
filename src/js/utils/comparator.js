/**
 * Utilities di Comparazione
 * Funzioni per confrontare libri secondo diversi criteri
 */

class Comparator {
    /**
     * Confronta due stringhe alfabeticamente (case-insensitive)
     * @returns {number} -1 se a < b, 1 se a > b, 0 se uguali
     */
    static confrontaStringhe(a, b) {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();

        if (aLower < bLower) return -1;
        if (aLower > bLower) return 1;
        return 0;
    }

    /**
     * Confronta due numeri
     * @returns {number} -1 se a < b, 1 se a > b, 0 se uguali
     */
    static confrontaNumeri(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    /**
     * Confronta due libri per TITOLO (alfabetico)
     * @param {Libro} a - Primo libro
     * @param {Libro} b - Secondo libro
     * @returns {number} -1 se a < b, 1 se a > b, 0 se uguali
     */
    static confrontaPerTitolo(a, b) {
        return this.confrontaStringhe(a.titolo, b.titolo);
    }

    /**
     * Confronta due libri per AUTORE (alfabetico)
     * Se gli autori sono uguali, ordina per titolo
     * @param {Libro} a - Primo libro
     * @param {Libro} b - Secondo libro
     * @returns {number} -1 se a < b, 1 se a > b, 0 se uguali
     */
    static confrontaPerAutore(a, b) {
        const confrontoAutore = this.confrontaStringhe(a.autore, b.autore);
        if (confrontoAutore !== 0) {
            return confrontoAutore;
        }
        // Se gli autori sono uguali, ordina per titolo
        return this.confrontaPerTitolo(a, b);
    }

    /**
     * Confronta due libri per ANNO (dal più vecchio al più recente)
     * Se gli anni sono uguali, ordina per autore
     * @param {Libro} a - Primo libro
     * @param {Libro} b - Secondo libro
     * @returns {number} -1 se a < b, 1 se a > b, 0 se uguali
     */
    static confrontaPerAnno(a, b) {
        const confrontoAnno = this.confrontaNumeri(a.anno, b.anno);
        if (confrontoAnno !== 0) {
            return confrontoAnno;
        }
        // Se gli anni sono uguali, ordina per autore
        return this.confrontaPerAutore(a, b);
    }

    /**
     * Ottiene la funzione di confronto appropriata in base al criterio
     * @param {string} criterio - 'titolo', 'autore' o 'anno'
     * @returns {Function} Funzione di confronto
     */
    static getFunzioneConfronto(criterio) {
        switch (criterio.toLowerCase()) {
            case 'titolo':
                return (a, b) => this.confrontaPerTitolo(a, b);
            case 'autore':
                return (a, b) => this.confrontaPerAutore(a, b);
            case 'anno':
                return (a, b) => this.confrontaPerAnno(a, b);
            default:
                console.warn(`Criterio sconosciuto: ${criterio}. Uso 'titolo' come default.`);
                return (a, b) => this.confrontaPerTitolo(a, b);
        }
    }

    /**
     * Verifica se due libri sono uguali secondo un criterio
     * @param {Libro} a - Primo libro
     * @param {Libro} b - Secondo libro
     * @param {string} criterio - 'titolo', 'autore' o 'anno'
     * @returns {boolean} True se sono uguali secondo il criterio
     */
    static sonoUguali(a, b, criterio) {
        const funzioneConfronto = this.getFunzioneConfronto(criterio);
        return funzioneConfronto(a, b) === 0;
    }

    /**
     * Ottiene il valore di confronto di un libro in base al criterio
     * Utile per visualizzazioni (es. altezza delle barre)
     * @param {Libro} libro - Il libro
     * @param {string} criterio - 'titolo', 'autore' o 'anno'
     * @returns {string|number} Valore del campo scelto
     */
    static getValoreCriterio(libro, criterio) {
        switch (criterio.toLowerCase()) {
            case 'titolo':
                return libro.titolo;
            case 'autore':
                return libro.autore;
            case 'anno':
                return libro.anno;
            default:
                return libro.titolo;
        }
    }

    /**
     * Converte un valore in numero per visualizzazione
     * (per stringhe, usa la somma dei codici ASCII normalizzata)
     */
    static valoreNumerico(valore) {
        if (typeof valore === 'number') {
            return valore;
        }

        // Per stringhe, calcola un valore numerico basato sui caratteri
        let sum = 0;
        const str = valore.toLowerCase();
        for (let i = 0; i < Math.min(str.length, 10); i++) {
            sum += str.charCodeAt(i);
        }
        return sum;
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Comparator;
}
