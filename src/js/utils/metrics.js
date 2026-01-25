/**
 * Modulo Raccolta Metriche
 * Traccia le performance degli algoritmi di ordinamento e ricerca
 */

class Metrics {
    constructor(nomeAlgoritmo) {
        this.nomeAlgoritmo = nomeAlgoritmo;
        this.reset();
    }

    /**
     * Resetta tutte le metriche
     */
    reset() {
        this.comparazioni = 0;
        this.scambi = 0;
        this.iterazioni = 0;
        this.tempoInizio = 0;
        this.tempoFine = 0;
        this.tempoEsecuzione = 0;
        this.steps = [];
    }

    /**
     * Avvia il cronometro
     */
    avviaCronometro() {
        this.tempoInizio = performance.now();
    }

    /**
     * Ferma il cronometro e calcola il tempo di esecuzione
     */
    fermaCronometro() {
        this.tempoFine = performance.now();
        this.tempoEsecuzione = this.tempoFine - this.tempoInizio;
    }

    /**
     * Incrementa il contatore delle comparazioni
     */
    incrementaComparazioni() {
        this.comparazioni++;
    }

    /**
     * Incrementa il contatore degli scambi
     */
    incrementaScambi() {
        this.scambi++;
    }

    /**
     * Incrementa il contatore delle iterazioni
     */
    incrementaIterazioni() {
        this.iterazioni++;
    }

    /**
     * Aggiunge uno step per l'animazione
     * @param {Object} step - Oggetto step con tipo, indici e stato array
     */
    aggiungiStep(step) {
        this.steps.push(step);
    }

    /**
     * Ottiene un riepilogo delle metriche
     */
    getRiepilogo() {
        return {
            algoritmo: this.nomeAlgoritmo,
            comparazioni: this.comparazioni,
            scambi: this.scambi,
            iterazioni: this.iterazioni,
            tempoEsecuzione: this.tempoEsecuzione.toFixed(2),
            numeroSteps: this.steps.length
        };
    }

    /**
     * Ottiene tutti gli steps per l'animazione
     */
    getSteps() {
        return this.steps;
    }

    /**
     * Formatta il tempo di esecuzione in modo leggibile
     */
    getTempoFormattato() {
        const tempo = this.tempoEsecuzione;
        if (tempo < 1) {
            return `${(tempo * 1000).toFixed(2)} μs`;
        } else if (tempo < 1000) {
            return `${tempo.toFixed(2)} ms`;
        } else {
            return `${(tempo / 1000).toFixed(2)} s`;
        }
    }

    /**
     * Genera un report testuale completo
     */
    getReport() {
        return `
========================================
REPORT: ${this.nomeAlgoritmo}
========================================
Tempo di esecuzione: ${this.getTempoFormattato()}
Comparazioni: ${this.comparazioni}
Scambi: ${this.scambi}
Iterazioni: ${this.iterazioni}
Steps animazione: ${this.steps.length}
========================================
        `.trim();
    }
}

/**
 * Classe per confrontare le metriche di due algoritmi
 */
class MetricsComparator {
    /**
     * Confronta due set di metriche
     * @param {Metrics} metrics1 - Prime metriche
     * @param {Metrics} metrics2 - Seconde metriche
     * @returns {Object} Oggetto con il confronto
     */
    static confronta(metrics1, metrics2) {
        const tempo1 = metrics1.tempoEsecuzione;
        const tempo2 = metrics2.tempoEsecuzione;
        const comp1 = metrics1.comparazioni;
        const comp2 = metrics2.comparazioni;
        const scambi1 = metrics1.scambi;
        const scambi2 = metrics2.scambi;

        return {
            tempoVincitore: tempo1 < tempo2 ? metrics1.nomeAlgoritmo : metrics2.nomeAlgoritmo,
            tempoDifferenza: Math.abs(tempo1 - tempo2).toFixed(2),
            tempoPercentuale: ((Math.abs(tempo1 - tempo2) / Math.max(tempo1, tempo2)) * 100).toFixed(1),

            comparazioniVincitore: comp1 < comp2 ? metrics1.nomeAlgoritmo : metrics2.nomeAlgoritmo,
            comparazioniDifferenza: Math.abs(comp1 - comp2),

            scambiVincitore: scambi1 < scambi2 ? metrics1.nomeAlgoritmo : metrics2.nomeAlgoritmo,
            scambiDifferenza: Math.abs(scambi1 - scambi2),

            metrics1: metrics1.getRiepilogo(),
            metrics2: metrics2.getRiepilogo()
        };
    }

    /**
     * Genera un report di confronto testuale
     */
    static getReportConfronto(metrics1, metrics2) {
        const confronto = this.confronta(metrics1, metrics2);

        return `
========================================
CONFRONTO ALGORITMI
========================================
${metrics1.nomeAlgoritmo} vs ${metrics2.nomeAlgoritmo}

TEMPO DI ESECUZIONE:
  ${metrics1.nomeAlgoritmo}: ${metrics1.getTempoFormattato()}
  ${metrics2.nomeAlgoritmo}: ${metrics2.getTempoFormattato()}
  Più veloce: ${confronto.tempoVincitore}
  Differenza: ${confronto.tempoDifferenza} ms (${confronto.tempoPercentuale}%)

COMPARAZIONI:
  ${metrics1.nomeAlgoritmo}: ${metrics1.comparazioni}
  ${metrics2.nomeAlgoritmo}: ${metrics2.comparazioni}
  Meno comparazioni: ${confronto.comparazioniVincitore}
  Differenza: ${confronto.comparazioniDifferenza}

SCAMBI:
  ${metrics1.nomeAlgoritmo}: ${metrics1.scambi}
  ${metrics2.nomeAlgoritmo}: ${metrics2.scambi}
  Meno scambi: ${confronto.scambiVincitore}
  Differenza: ${confronto.scambiDifferenza}
========================================
        `.trim();
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Metrics, MetricsComparator };
}
