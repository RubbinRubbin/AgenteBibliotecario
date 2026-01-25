/**
 * Algoritmo Ricerca Lineare (Sequential Search)
 * Scorre l'array elemento per elemento fino a trovare il target
 *
 * Caratteristiche:
 * - Complessità temporale: O(n)
 * - Complessità spaziale: O(1)
 * - Funziona su array non ordinati
 * - Semplice ma inefficiente per array grandi
 */

class LinearSearch {
    constructor() {
        this.metrics = null;
    }

    /**
     * Esegue la ricerca lineare nell'array
     * @param {Array} array - Array di libri in cui cercare
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
        this.aggiungiStep('inizio', [], array, -1);

        // Scorre l'array elemento per elemento
        for (let i = 0; i < array.length; i++) {
            this.metrics.incrementaIterazioni();

            // Evidenzia l'elemento corrente in esame
            this.aggiungiStep('esame', [i], array, -1);

            // Confronta il titolo (case-insensitive)
            const titoloCorrente = array[i].titolo.toLowerCase().trim();

            if (titoloCorrente === targetLower) {
                // Libro trovato!
                this.aggiungiStep('trovato', [i], array, i);
                this.metrics.fermaCronometro();

                return {
                    trovato: true,
                    libro: array[i],
                    indice: i,
                    iterazioni: i + 1
                };
            } else {
                // Non corrisponde, continua
                this.aggiungiStep('non-corrispondente', [i], array, -1);
            }
        }

        // Libro non trovato
        this.aggiungiStep('non-trovato', [], array, -1);
        this.metrics.fermaCronometro();

        return {
            trovato: false,
            libro: null,
            indice: -1,
            iterazioni: array.length
        };
    }

    /**
     * Aggiunge uno step per l'animazione
     */
    aggiungiStep(tipo, indici, array, indiceTrovato) {
        this.metrics.aggiungiStep({
            tipo: tipo,
            indici: [...indici],
            indiceTrovato: indiceTrovato,
            stato: array.map(libro => libro.clone ? libro.clone() : { ...libro })
        });
    }

    /**
     * Informazioni sull'algoritmo
     */
    static getInfo() {
        return {
            nome: 'Ricerca Lineare',
            descrizione: 'Scorre sequenzialmente l\'array fino a trovare l\'elemento',
            complessitaTempo: {
                migliore: 'O(1) - elemento in prima posizione',
                media: 'O(n/2) ≈ O(n)',
                peggiore: 'O(n) - elemento in ultima posizione o assente'
            },
            complessitaSpazio: 'O(1)',
            vincoli: 'Nessuno - funziona su array non ordinati',
            caratteristiche: [
                'Semplice da implementare',
                'Non richiede array ordinato',
                'Inefficiente per array grandi',
                'Garantisce di trovare il primo elemento',
                'Nessuna preparazione necessaria'
            ],
            casiUso: [
                'Array piccoli (< 100 elementi)',
                'Array non ordinati',
                'Ricerche occasionali',
                'Quando l\'ordinamento costa troppo'
            ],
            vantaggi: [
                'Funziona su dati non ordinati',
                'Semplice e facile da capire',
                'Nessun overhead di preparazione'
            ],
            svantaggi: [
                'Lento per array grandi',
                'Non sfrutta eventuali ordinamenti',
                'Tempo proporzionale alla dimensione'
            ]
        };
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LinearSearch;
}
