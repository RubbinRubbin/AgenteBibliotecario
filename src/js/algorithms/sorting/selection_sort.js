/**
 * Algoritmo Selection Sort
 * Ordina un array trovando ripetutamente l'elemento minimo e posizionandolo all'inizio
 *
 * Caratteristiche:
 * - Complessità temporale: O(n²) in tutti i casi
 * - Complessità spaziale: O(1) - in-place
 * - NON stabile
 * - Numero di scambi: O(n) - minimale
 */

class SelectionSort {
    constructor() {
        this.metrics = null;
    }

    /**
     * Esegue il Selection Sort sull'array
     * @param {Array} array - Array di libri da ordinare
     * @param {Function} funzioneConfronto - Funzione di confronto (a, b) => -1, 0, 1
     * @param {Metrics} metrics - Oggetto per raccogliere metriche
     * @returns {Array} Array ordinato
     */
    ordina(array, funzioneConfronto, metrics) {
        this.metrics = metrics;
        const n = array.length;

        // Avvia il cronometro
        this.metrics.avviaCronometro();

        // Aggiungi stato iniziale
        this.aggiungiStep('inizio', [], array);

        // Selection Sort principale
        for (let i = 0; i < n - 1; i++) {
            // Trova l'indice dell'elemento minimo nel resto dell'array
            let minIndex = i;

            // Evidenzia la posizione corrente
            this.aggiungiStep('posizione-corrente', [i], array);

            for (let j = i + 1; j < n; j++) {
                // Confronta elementi
                this.metrics.incrementaComparazioni();
                this.aggiungiStep('confronto', [minIndex, j], array);

                if (funzioneConfronto(array[j], array[minIndex]) < 0) {
                    // Trovato un nuovo minimo
                    minIndex = j;
                    this.aggiungiStep('nuovo-minimo', [minIndex], array);
                }
            }

            // Se il minimo non è nella posizione corretta, scambia
            if (minIndex !== i) {
                this.aggiungiStep('pre-scambio', [i, minIndex], array);
                this.scambia(array, i, minIndex);
                this.metrics.incrementaScambi();
                this.aggiungiStep('post-scambio', [i, minIndex], array);
            }

            // Elemento in posizione finale
            this.aggiungiStep('ordinato', [i], array);
        }

        // L'ultimo elemento è automaticamente al posto giusto
        this.aggiungiStep('ordinato', [n - 1], array);

        // Stato finale
        this.aggiungiStep('completato', [], array);

        // Ferma il cronometro
        this.metrics.fermaCronometro();

        return array;
    }

    /**
     * Scambia due elementi nell'array
     */
    scambia(array, i, j) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    /**
     * Aggiunge uno step per l'animazione
     */
    aggiungiStep(tipo, indici, array) {
        this.metrics.aggiungiStep({
            tipo: tipo,
            indici: [...indici],
            stato: array.map(libro => libro.clone ? libro.clone() : { ...libro })
        });
    }

    /**
     * Informazioni sull'algoritmo
     */
    static getInfo() {
        return {
            nome: 'Selection Sort',
            descrizione: 'Trova ripetutamente il minimo e lo posiziona all\'inizio',
            complessitaTempo: {
                migliore: 'O(n²)',
                media: 'O(n²)',
                peggiore: 'O(n²)'
            },
            complessitaSpazio: 'O(1)',
            stabile: false,
            inPlace: true,
            caratteristiche: [
                'Sempre O(n²) comparazioni',
                'Minimo numero di scambi: O(n)',
                'Buono per dati con costo di scrittura alto',
                'Non adattivo (stesso tempo anche se già ordinato)',
                'Semplice da implementare'
            ],
            casiUso: [
                'Array piccoli',
                'Quando il costo di scrittura è molto alto',
                'Quando il numero di scambi deve essere minimizzato'
            ]
        };
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SelectionSort;
}
