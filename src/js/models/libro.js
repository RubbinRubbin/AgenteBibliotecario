/**
 * Classe Libro
 * Rappresenta un libro con titolo, autore e anno di pubblicazione
 */

class Libro {
    constructor(titolo, autore, anno) {
        this.titolo = titolo;
        this.autore = autore;
        this.anno = parseInt(anno);
    }

    /**
     * Crea un oggetto Libro da un oggetto JSON
     */
    static fromJSON(json) {
        return new Libro(json.titolo, json.autore, json.anno);
    }

    /**
     * Converte il libro in oggetto JSON
     */
    toJSON() {
        return {
            titolo: this.titolo,
            autore: this.autore,
            anno: this.anno
        };
    }

    /**
     * Rappresentazione stringa del libro
     */
    toString() {
        return `"${this.titolo}" di ${this.autore} (${this.anno})`;
    }

    /**
     * Crea una copia del libro
     */
    clone() {
        return new Libro(this.titolo, this.autore, this.anno);
    }

    /**
     * Verifica uguaglianza con un altro libro
     */
    equals(altroLibro) {
        return this.titolo === altroLibro.titolo &&
               this.autore === altroLibro.autore &&
               this.anno === altroLibro.anno;
    }

    /**
     * Calcola un hash univoco per il libro
     */
    getHash() {
        return `${this.titolo}|${this.autore}|${this.anno}`;
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Libro;
}
