/**
 * Visualizzatore Animazioni Ordinamento
 * Gestisce la visualizzazione animata degli algoritmi di ordinamento
 */

class SortVisualizer {
    constructor(containerId, nomeAlgoritmo) {
        this.container = document.getElementById(containerId);
        this.nomeAlgoritmo = nomeAlgoritmo;
        this.steps = [];
        this.currentStep = 0;
        this.isPlaying = false;
        this.speed = 500; // millisecondi per step
        this.criterio = 'titolo';
        this.maxValue = 0;
        this.bars = [];
        this.animationTimer = null;
    }

    /**
     * Inizializza il visualizzatore con gli steps dell'algoritmo
     */
    init(steps, criterio) {
        this.steps = steps;
        this.criterio = criterio;
        this.currentStep = 0;
        this.isPlaying = false;

        // Crea steps semplificati per la visualizzazione didattica
        this.createSimplifiedSteps();

        // Calcola il valore massimo per normalizzare le altezze
        this.calculateMaxValue();

        // Crea la struttura HTML
        this.createVisualization();

        // Mostra lo stato iniziale
        this.renderStep(0);
    }

    /**
     * Crea steps semplificati con meno elementi per la visualizzazione didattica
     */
    createSimplifiedSteps() {
        const maxVisualizationItems = 25; // Numero massimo di elementi da visualizzare

        if (this.steps.length === 0 || this.steps[0].stato.length <= maxVisualizationItems) {
            // Se il dataset è già piccolo, usa gli steps originali
            return;
        }

        // Crea versioni semplificate degli steps per la visualizzazione
        // Mantiene gli steps originali ma con un subset dei dati
        const fullDataSize = this.steps[0].stato.length;
        const step = Math.floor(fullDataSize / maxVisualizationItems);

        this.visualSteps = this.steps.map(s => {
            // Prendi solo ogni N-esimo elemento per la visualizzazione
            const simplifiedState = [];
            const simplifiedIndices = [];

            for (let i = 0; i < fullDataSize; i += step) {
                if (simplifiedState.length < maxVisualizationItems) {
                    simplifiedState.push(s.stato[i]);
                }
            }

            // Ricalcola gli indici proporzionalmente
            s.indici.forEach(idx => {
                const proportionalIdx = Math.floor(idx / step);
                if (proportionalIdx < simplifiedState.length && !simplifiedIndices.includes(proportionalIdx)) {
                    simplifiedIndices.push(proportionalIdx);
                }
            });

            return {
                tipo: s.tipo,
                indici: simplifiedIndices,
                stato: simplifiedState
            };
        });
    }

    /**
     * Calcola il valore massimo per normalizzare le altezze delle barre
     */
    calculateMaxValue() {
        if (this.steps.length === 0) return;

        // Usa visualSteps se disponibile, altrimenti steps normali
        const stepsToUse = this.visualSteps || this.steps;
        const firstState = stepsToUse[0].stato;
        this.maxValue = 0;

        if (this.criterio === 'anno') {
            // Per anno, usa direttamente il valore
            this.maxValue = Math.max(...firstState.map(libro => libro.anno));
        } else {
            // Per titolo/autore, usa il valore numerico del comparatore
            firstState.forEach(libro => {
                const valore = Comparator.getValoreCriterio(libro, this.criterio);
                const numerico = Comparator.valoreNumerico(valore);
                if (numerico > this.maxValue) this.maxValue = numerico;
            });
        }
    }

    /**
     * Crea la struttura HTML del visualizzatore
     */
    createVisualization() {
        const isSimplified = this.visualSteps !== undefined;
        const visualizationNote = isSimplified ?
            `<span class="stat" style="color: var(--text-muted); font-size: 0.75rem;">Visualizzazione semplificata per didattica (${this.visualSteps[0].stato.length} elementi mostrati)</span>` : '';

        this.container.innerHTML = `
            <div class="visualizer-header">
                <h3>${this.nomeAlgoritmo}</h3>
                <div class="visualizer-stats">
                    <span class="stat">Step: <strong id="${this.container.id}-step">0</strong>/<strong>${this.steps.length - 1}</strong></span>
                    ${visualizationNote}
                </div>
            </div>
            <div class="visualizer-canvas" id="${this.container.id}-canvas"></div>
            <div class="visualizer-controls">
                <button id="${this.container.id}-play" class="btn btn-play">Play</button>
                <button id="${this.container.id}-pause" class="btn btn-pause" disabled>Pause</button>
                <button id="${this.container.id}-prev" class="btn btn-step">Prev</button>
                <button id="${this.container.id}-next" class="btn btn-step">Next</button>
                <button id="${this.container.id}-reset" class="btn btn-reset">Reset</button>
                <label>
                    Velocità:
                    <select id="${this.container.id}-speed" class="speed-select">
                        <option value="1000">Lenta</option>
                        <option value="500" selected>Normale</option>
                        <option value="200">Veloce</option>
                        <option value="50">Molto Veloce</option>
                    </select>
                </label>
            </div>
        `;

        // Aggiungi event listeners
        this.attachEventListeners();
    }

    /**
     * Aggiunge event listeners ai controlli
     */
    attachEventListeners() {
        document.getElementById(`${this.container.id}-play`).addEventListener('click', () => this.play());
        document.getElementById(`${this.container.id}-pause`).addEventListener('click', () => this.pause());
        document.getElementById(`${this.container.id}-prev`).addEventListener('click', () => this.previousStep());
        document.getElementById(`${this.container.id}-next`).addEventListener('click', () => this.nextStep());
        document.getElementById(`${this.container.id}-reset`).addEventListener('click', () => this.reset());
        document.getElementById(`${this.container.id}-speed`).addEventListener('change', (e) => {
            this.speed = parseInt(e.target.value);
        });
    }

    /**
     * Renderizza uno step specifico
     */
    renderStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= this.steps.length) return;

        this.currentStep = stepIndex;
        // Usa visualSteps se disponibile per la visualizzazione, altrimenti steps normali
        const stepsToUse = this.visualSteps || this.steps;
        const step = stepsToUse[stepIndex];
        const canvas = document.getElementById(`${this.container.id}-canvas`);

        // Aggiorna contatore step (usa sempre steps originali per il contatore)
        document.getElementById(`${this.container.id}-step`).textContent = stepIndex;

        // Crea le barre
        const barsHtml = step.stato.map((libro, index) => {
            const valore = Comparator.getValoreCriterio(libro, this.criterio);
            const numerico = this.criterio === 'anno' ? valore : Comparator.valoreNumerico(valore);
            const height = (numerico / this.maxValue) * 100;

            // Determina la classe CSS in base al tipo di step e agli indici
            let barClass = 'bar';
            if (step.indici.includes(index)) {
                if (step.tipo === 'confronto' || step.tipo === 'confronto-pivot') {
                    barClass += ' bar-comparing';
                } else if (step.tipo === 'pre-scambio' || step.tipo === 'post-scambio' ||
                           step.tipo === 'pre-scambio-pivot' || step.tipo === 'post-scambio-pivot') {
                    barClass += ' bar-swapping';
                } else if (step.tipo === 'nuovo-minimo' || step.tipo === 'scelta-pivot') {
                    barClass += ' bar-pivot';
                } else if (step.tipo === 'ordinato' || step.tipo === 'pivot-finale') {
                    barClass += ' bar-sorted';
                }
            }

            // Gestisci completamento
            if (step.tipo === 'completato') {
                barClass += ' bar-sorted';
            }

            return `
                <div class="${barClass}" style="height: ${height}%" title="${libro.titolo}">
                    <div class="bar-label">${valore}</div>
                </div>
            `;
        }).join('');

        canvas.innerHTML = barsHtml;
    }

    /**
     * Avvia l'animazione automatica
     */
    play() {
        if (this.isPlaying) return;

        this.isPlaying = true;
        document.getElementById(`${this.container.id}-play`).disabled = true;
        document.getElementById(`${this.container.id}-pause`).disabled = false;

        this.animate();
    }

    /**
     * Mette in pausa l'animazione
     */
    pause() {
        this.isPlaying = false;
        document.getElementById(`${this.container.id}-play`).disabled = false;
        document.getElementById(`${this.container.id}-pause`).disabled = true;

        if (this.animationTimer) {
            clearTimeout(this.animationTimer);
            this.animationTimer = null;
        }
    }

    /**
     * Loop di animazione
     */
    animate() {
        if (!this.isPlaying) return;

        if (this.currentStep < this.steps.length - 1) {
            this.nextStep();
            this.animationTimer = setTimeout(() => this.animate(), this.speed);
        } else {
            // Animazione completata
            this.pause();
        }
    }

    /**
     * Va allo step successivo
     */
    nextStep() {
        if (this.currentStep < this.steps.length - 1) {
            this.renderStep(this.currentStep + 1);
        }
    }

    /**
     * Va allo step precedente
     */
    previousStep() {
        if (this.currentStep > 0) {
            this.renderStep(this.currentStep - 1);
        }
    }

    /**
     * Reset allo stato iniziale
     */
    reset() {
        this.pause();
        this.renderStep(0);
    }

    /**
     * Pulisce il visualizzatore
     */
    destroy() {
        this.pause();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Esporta per l'uso in altri moduli
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SortVisualizer;
}
