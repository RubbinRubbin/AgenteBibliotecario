/**
 * Visualizzatore Animazioni Ricerca
 * Gestisce la visualizzazione animata degli algoritmi di ricerca
 */

class SearchVisualizer {
    constructor(containerId, nomeAlgoritmo) {
        this.container = document.getElementById(containerId);
        this.nomeAlgoritmo = nomeAlgoritmo;
        this.steps = [];
        this.currentStep = 0;
        this.isPlaying = false;
        this.speed = 800; // millisecondi per step (più lento per vedere meglio)
        this.target = '';
        this.animationTimer = null;
        this.isBinary = nomeAlgoritmo.toLowerCase().includes('binaria');
    }

    /**
     * Inizializza il visualizzatore con gli steps dell'algoritmo
     */
    init(steps, target) {
        this.steps = steps;
        this.target = target;
        this.currentStep = 0;
        this.isPlaying = false;

        // Crea la struttura HTML
        this.createVisualization();

        // Mostra lo stato iniziale
        this.renderStep(0);
    }

    /**
     * Crea la struttura HTML del visualizzatore
     */
    createVisualization() {
        this.container.innerHTML = `
            <div class="visualizer-header">
                <h3>${this.nomeAlgoritmo}</h3>
                <div class="visualizer-stats">
                    <span class="stat">Cercando: <strong>${this.target}</strong></span>
                    <span class="stat">Step: <strong id="${this.container.id}-step">0</strong>/<strong>${this.steps.length - 1}</strong></span>
                    <span class="stat">Iterazioni: <strong id="${this.container.id}-iterations">0</strong></span>
                </div>
            </div>
            <div class="search-canvas" id="${this.container.id}-canvas"></div>
            <div class="visualizer-controls">
                <button id="${this.container.id}-play" class="btn btn-play">Play</button>
                <button id="${this.container.id}-pause" class="btn btn-pause" disabled>Pause</button>
                <button id="${this.container.id}-prev" class="btn btn-step">Prev</button>
                <button id="${this.container.id}-next" class="btn btn-step">Next</button>
                <button id="${this.container.id}-reset" class="btn btn-reset">Reset</button>
                <label>
                    Velocità:
                    <select id="${this.container.id}-speed" class="speed-select">
                        <option value="1500">Lenta</option>
                        <option value="800" selected>Normale</option>
                        <option value="400">Veloce</option>
                        <option value="100">Molto Veloce</option>
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
        const step = this.steps[stepIndex];
        const canvas = document.getElementById(`${this.container.id}-canvas`);

        // Aggiorna contatori
        document.getElementById(`${this.container.id}-step`).textContent = stepIndex;

        // Conta le iterazioni effettive (escludi step di setup)
        const iterazioniStep = this.steps.slice(0, stepIndex + 1)
            .filter(s => s.tipo === 'esame' || s.tipo === 'confronto').length;
        document.getElementById(`${this.container.id}-iterations`).textContent = iterazioniStep;

        // Limita il numero di elementi visualizzati per performance
        const maxDisplay = 50;
        const displayData = step.stato.length > maxDisplay
            ? this.getRelevantItems(step, maxDisplay)
            : { items: step.stato, startIndex: 0 };

        // Crea i box per i libri
        const itemsHtml = displayData.items.map((libro, displayIndex) => {
            const actualIndex = displayData.startIndex + displayIndex;
            const titolo = libro.titolo;

            // Determina la classe CSS in base al tipo di step
            let itemClass = 'search-item';

            if (step.indiceTrovato === actualIndex) {
                itemClass += ' item-found';
            } else if (step.indici.includes(actualIndex)) {
                if (step.tipo === 'esame' || step.tipo === 'confronto') {
                    itemClass += ' item-examining';
                } else if (step.tipo === 'non-corrispondente') {
                    itemClass += ' item-rejected';
                }
            }

            // Per ricerca binaria, evidenzia il range attivo
            if (this.isBinary && step.left !== undefined && step.right !== undefined) {
                if (actualIndex >= step.left && actualIndex <= step.right) {
                    itemClass += ' item-in-range';
                } else {
                    itemClass += ' item-out-range';
                }
            }

            return `
                <div class="${itemClass}" data-index="${actualIndex}">
                    <div class="item-index">${actualIndex}</div>
                    <div class="item-title">${titolo}</div>
                </div>
            `;
        }).join('');

        // Aggiungi indicatori per ricerca binaria
        let indicators = '';
        if (this.isBinary && step.left !== undefined && step.right !== undefined) {
            const mid = step.indici[0];
            indicators = `
                <div class="binary-indicators">
                    <span class="indicator">Left: ${step.left}</span>
                    ${mid !== undefined ? `<span class="indicator">Mid: ${mid}</span>` : ''}
                    <span class="indicator">Right: ${step.right}</span>
                </div>
            `;
        }

        canvas.innerHTML = indicators + '<div class="search-items-container">' + itemsHtml + '</div>';

        // Aggiungi messaggio di stato
        this.updateStatusMessage(step);
    }

    /**
     * Ottiene gli elementi rilevanti da visualizzare (per array grandi)
     */
    getRelevantItems(step, maxDisplay) {
        const stato = step.stato;
        if (stato.length <= maxDisplay) {
            return { items: stato, startIndex: 0 };
        }

        // Trova l'indice di interesse
        let focusIndex = 0;
        if (step.indici.length > 0) {
            focusIndex = step.indici[0];
        } else if (this.isBinary && step.left !== undefined) {
            focusIndex = Math.floor((step.left + step.right) / 2);
        }

        // Calcola il range da mostrare centrato sull'indice di interesse
        const half = Math.floor(maxDisplay / 2);
        let start = Math.max(0, focusIndex - half);
        let end = Math.min(stato.length, start + maxDisplay);

        // Aggiusta se siamo vicino alla fine
        if (end - start < maxDisplay) {
            start = Math.max(0, end - maxDisplay);
        }

        return {
            items: stato.slice(start, end),
            startIndex: start
        };
    }

    /**
     * Aggiorna il messaggio di stato
     */
    updateStatusMessage(step) {
        let message = '';
        switch (step.tipo) {
            case 'inizio':
                message = '🔍 Iniziando la ricerca...';
                break;
            case 'esame':
            case 'confronto':
                message = '👀 Esaminando elemento...';
                break;
            case 'non-corrispondente':
                message = '❌ Non corrisponde, continuo...';
                break;
            case 'trovato':
                message = '✅ Libro trovato!';
                break;
            case 'non-trovato':
                message = '😞 Libro non trovato nell\'array';
                break;
            case 'cerca-destra':
                message = '➡️ Il target è nella metà destra';
                break;
            case 'cerca-sinistra':
                message = '⬅️ Il target è nella metà sinistra';
                break;
        }

        // Cerca o crea il contenitore del messaggio
        let messageDiv = this.container.querySelector('.status-message');
        if (!messageDiv) {
            messageDiv = document.createElement('div');
            messageDiv.className = 'status-message';
            const canvas = document.getElementById(`${this.container.id}-canvas`);
            canvas.insertAdjacentElement('afterend', messageDiv);
        }
        messageDiv.textContent = message;
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
    module.exports = SearchVisualizer;
}
