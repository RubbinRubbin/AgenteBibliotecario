/**
 * Algoritmo Quick Sort
 * Divide l'array in partizioni usando un pivot e ordina ricorsivamente
 *
 * Caratteristiche:
 * - Complessità temporale: O(n log n) caso medio, O(n²) caso peggiore
 * - Complessità spaziale: O(log n) per lo stack di ricorsione
 * - NON stabile (nella versione standard)
 * - In-place
 * - Molto efficiente in pratica
 */

class QuickSort {
    constructor() {
        this.metrics = null;
        this.funzioneConfronto = null;
    }

    /**
     * Esegue il Quick Sort sull'array
     * @param {Array} array - Array di libri da ordinare
     * @param {Function} funzioneConfronto - Funzione di confronto (a, b) => -1, 0, 1
     * @param {Metrics} metrics - Oggetto per raccogliere metriche
     * @returns {Array} Array ordinato
     */
    ordina(array, funzioneConfronto, metrics) {
        this.metrics = metrics;
        this.funzioneConfronto = funzioneConfronto;

        // Avvia il cronometro
        this.metrics.avviaCronometro();

        // Aggiungi stato iniziale
        this.aggiungiStep('inizio', [], array);

        // Esegui Quick Sort ricorsivo
        this.quickSortRicorsivo(array, 0, array.length - 1);

        // Stato finale
        this.aggiungiStep('completato', [], array);

        // Ferma il cronometro
        this.metrics.fermaCronometro();

        return array;
    }

    /**
     * Funzione ricorsiva del Quick Sort
     * @param {Array} array - Array da ordinare
     * @param {number} low - Indice inferiore
     * @param {number} high - Indice superiore
     */
    quickSortRicorsivo(array, low, high) {
        if (low < high) {
            // Evidenzia il range corrente
            this.aggiungiStep('range-corrente', [low, high], array);

            // Partiziona l'array e ottieni l'indice del pivot
            const pivotIndex = this.partizione(array, low, high);

            // Pivot in posizione finale
            this.aggiungiStep('pivot-finale', [pivotIndex], array);

            // Ordina ricorsivamente le due partizioni
            this.quickSortRicorsivo(array, low, pivotIndex - 1);
            this.quickSortRicorsivo(array, pivotIndex + 1, high);

            // Range completato
            this.aggiungiStep('range-ordinato', [low, high], array);
        } else if (low === high) {
            // Singolo elemento, già ordinato
            this.aggiungiStep('elemento-singolo', [low], array);
        }
    }

    /**
     * Partiziona l'array usando l'ultimo elemento come pivot
     * @param {Array} array - Array da partizionare
     * @param {number} low - Indice inferiore
     * @param {number} high - Indice superiore (pivot)
     * @returns {number} Indice finale del pivot
     */
    partizione(array, low, high) {
        // Sceglie l'ultimo elemento come pivot
        const pivot = array[high];
        this.aggiungiStep('scelta-pivot', [high], array);

        // Indice dell'elemento più piccolo
        let i = low - 1;

        // Attraversa il range e sposta gli elementi minori del pivot a sinistra
        for (let j = low; j < high; j++) {
            this.metrics.incrementaComparazioni();
            this.aggiungiStep('confronto-pivot', [j, high], array);

            if (this.funzioneConfronto(array[j], pivot) <= 0) {
                // Elemento minore o uguale al pivot
                i++;

                if (i !== j) {
                    this.aggiungiStep('pre-scambio', [i, j], array);
                    this.scambia(array, i, j);
                    this.metrics.incrementaScambi();
                    this.aggiungiStep('post-scambio', [i, j], array);
                }
            }
        }

        // Posiziona il pivot nella sua posizione finale
        const pivotFinalIndex = i + 1;
        if (pivotFinalIndex !== high) {
            this.aggiungiStep('pre-scambio-pivot', [pivotFinalIndex, high], array);
            this.scambia(array, pivotFinalIndex, high);
            this.metrics.incrementaScambi();
            this.aggiungiStep('post-scambio-pivot', [pivotFinalIndex, high], array);
        }

        return pivotFinalIndex;
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
            nome: 'Quick Sort',
            descrizione: 'Divide l\'array in partizioni usando un pivot e ordina ricorsivamente',
            complessitaTempo: {
                migliore: 'O(n log n)',
                media: 'O(n log n)',
                peggiore: 'O(n²)'
            },
            complessitaSpazio: 'O(log n)',
            stabile: false,
            inPlace: true,
            caratteristiche: [
                'Molto efficiente in pratica',
                'Divide et impera',
                'Performance dipende dalla scelta del pivot',
                'Cache-friendly',
                'Preferito per array grandi'
            ],
            casiUso: [
                'Array grandi',
                'Dati random',
                'Quando la velocità media è critica',
                'Quando lo spazio è limitato'
            ],
            casoPeggiore: 'Array già ordinato con pivot sempre all\'estremo',
            ottimizzazioni: [
                'Scelta pivot mediana-di-tre',
                'Passaggio a Insertion Sort per sottoarray piccoli',
                'Randomizzazione del pivot'
            ]
        };
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuickSort;
}
