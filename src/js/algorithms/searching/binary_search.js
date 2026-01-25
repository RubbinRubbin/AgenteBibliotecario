/**
 * Algoritmo Ricerca Binaria (Binary Search)
 * Divide ripetutamente a metà il range di ricerca in un array ordinato
 *
 * Caratteristiche:
 * - Complessità temporale: O(log n)
 * - Complessità spaziale: O(1) versione iterativa
 * - RICHIEDE array ordinato
 * - Molto efficiente per array grandi
 */

class BinarySearch {
    constructor() {
        this.metrics = null;
    }

    /**
     * Esegue la ricerca binaria nell'array ORDINATO
     * @param {Array} array - Array ordinato di libri in cui cercare
     * @param {string} target - Titolo del libro da cercare
     * @param {Metrics} metrics - Oggetto per raccogliere metriche
     * @returns {Object} Risultato con il libro trovato e l'indice (o null)
     */
    cerca(array, target, metrics) {
        this.metrics = metrics;
        const targetLower = target.toLowerCase().trim();

        // Avvia il cronometro
        this.metrics.avviaCronometro();

        // Aggiungi stato iniziale
        this.aggiungiStep('inizio', [], array, -1, 0, array.length - 1);

        let left = 0;
        let right = array.length - 1;

        // Continua finché il range è valido
        while (left <= right) {
            this.metrics.incrementaIterazioni();

            // Calcola l'indice centrale
            const mid = Math.floor((left + right) / 2);

            // Evidenzia il range corrente e l'elemento centrale
            this.aggiungiStep('range', [mid], array, -1, left, right);

            const titoloMid = array[mid].titolo.toLowerCase().trim();

            // Confronta con l'elemento centrale
            this.aggiungiStep('confronto', [mid], array, -1, left, right);

            if (titoloMid === targetLower) {
                // Libro trovato!
                this.aggiungiStep('trovato', [mid], array, mid, left, right);
                this.metrics.fermaCronometro();

                return {
                    trovato: true,
                    libro: array[mid],
                    indice: mid,
                    iterazioni: this.metrics.iterazioni
                };
            } else if (titoloMid < targetLower) {
                // Il target è nella metà destra
                this.aggiungiStep('cerca-destra', [mid], array, -1, left, right);
                left = mid + 1;
            } else {
                // Il target è nella metà sinistra
                this.aggiungiStep('cerca-sinistra', [mid], array, -1, left, right);
                right = mid - 1;
            }

            // Nuovo range dopo l'aggiustamento
            if (left <= right) {
                this.aggiungiStep('nuovo-range', [], array, -1, left, right);
            }
        }

        // Libro non trovato
        this.aggiungiStep('non-trovato', [], array, -1, left, right);
        this.metrics.fermaCronometro();

        return {
            trovato: false,
            libro: null,
            indice: -1,
            iterazioni: this.metrics.iterazioni
        };
    }

    /**
     * Aggiunge uno step per l'animazione
     */
    aggiungiStep(tipo, indici, array, indiceTrovato, left, right) {
        this.metrics.aggiungiStep({
            tipo: tipo,
            indici: [...indici],
            indiceTrovato: indiceTrovato,
            left: left,
            right: right,
            stato: array.map(libro => libro.clone ? libro.clone() : { ...libro })
        });
    }

    /**
     * Informazioni sull'algoritmo
     */
    static getInfo() {
        return {
            nome: 'Ricerca Binaria',
            descrizione: 'Divide ripetutamente a metà il range di ricerca in un array ordinato',
            complessitaTempo: {
                migliore: 'O(1) - elemento al centro',
                media: 'O(log n)',
                peggiore: 'O(log n)'
            },
            complessitaSpazio: 'O(1) - versione iterativa',
            vincoli: 'RICHIEDE array ordinato',
            caratteristiche: [
                'Molto veloce per array grandi',
                'Divide et impera',
                'Dimezza il range ad ogni passo',
                'Logaritmico: 1000 elementi → max 10 passi',
                'Richiede ordinamento preliminare'
            ],
            casiUso: [
                'Array grandi ordinati',
                'Ricerche frequenti sugli stessi dati',
                'Quando l\'efficienza è critica',
                'Database e indici'
            ],
            vantaggi: [
                'Estremamente veloce: O(log n)',
                'Prevedibile e costante',
                'Scalabile a milioni di elementi',
                'Poche operazioni anche nel caso peggiore'
            ],
            svantaggi: [
                'Richiede array ordinato',
                'Costo di ordinamento preliminare',
                'Più complesso della ricerca lineare',
                'Non adatto a dati non ordinati'
            ],
            confrontoConLineare: 'Su 500 elementi: Lineare max 500 passi, Binaria max 9 passi'
        };
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BinarySearch;
}
