/**
 * Visualizzatore Didattico Ordinamento
 * Visualizzazione puramente didattica e ipotetica per confrontare Selection Sort e Quick Sort
 * Non riflette i dati reali del dataset
 */

class SortVisualizer {
    constructor(containerId, nomeAlgoritmo) {
        this.container = document.getElementById(containerId);
        this.nomeAlgoritmo = nomeAlgoritmo;
        this.isSelectionSort = nomeAlgoritmo.toLowerCase().includes('selection');
        this.currentFrame = 0;
        this.isPlaying = false;
        this.speed = 1000;
        this.animationTimer = null;

        // Dataset ipotetico per visualizzazione didattica (10 elementi)
        this.demoData = [64, 34, 25, 12, 22, 11, 90, 88, 45, 50];
        this.frames = [];
    }

    /**
     * Inizializza il visualizzatore (ignora gli steps reali, usa dati didattici)
     */
    init(steps, criterio) {
        // Ignora gli steps reali, genera frames didattici
        this.generateDemoFrames();
        this.createVisualization();
        this.renderFrame(0);
    }

    /**
     * Genera frames didattici per l'algoritmo
     */
    generateDemoFrames() {
        if (this.isSelectionSort) {
            this.generateSelectionSortFrames();
        } else {
            this.generateQuickSortFrames();
        }
    }

    /**
     * Genera frames didattici per Selection Sort
     */
    generateSelectionSortFrames() {
        const arr = [...this.demoData];
        this.frames = [];

        // Frame iniziale
        this.frames.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            message: 'Array iniziale non ordinato'
        });

        // Simulazione Selection Sort
        for (let i = 0; i < arr.length - 1; i++) {
            let minIdx = i;

            // Cerca il minimo
            for (let j = i + 1; j < arr.length; j++) {
                this.frames.push({
                    array: [...arr],
                    comparing: [i, j],
                    swapping: [],
                    sorted: Array.from({length: i}, (_, k) => k),
                    message: `Confronto elemento ${j} con il minimo corrente (posizione ${minIdx})`
                });

                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                    this.frames.push({
                        array: [...arr],
                        comparing: [],
                        swapping: [],
                        sorted: Array.from({length: i}, (_, k) => k),
                        pivot: [minIdx],
                        message: `Nuovo minimo trovato: ${arr[minIdx]} alla posizione ${minIdx}`
                    });
                }
            }

            // Scambia
            if (minIdx !== i) {
                this.frames.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [i, minIdx],
                    sorted: Array.from({length: i}, (_, k) => k),
                    message: `Scambio ${arr[i]} con ${arr[minIdx]}`
                });

                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            }

            this.frames.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: Array.from({length: i + 1}, (_, k) => k),
                message: `Elemento ${arr[i]} ora in posizione corretta`
            });
        }

        // Frame finale
        this.frames.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: arr.length}, (_, k) => k),
            message: '✅ Array completamente ordinato!'
        });
    }

    /**
     * Genera frames didattici per Quick Sort
     */
    generateQuickSortFrames() {
        const arr = [...this.demoData];
        this.frames = [];

        // Frame iniziale
        this.frames.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            pivot: [],
            message: 'Array iniziale non ordinato'
        });

        this.quickSortFrames(arr, 0, arr.length - 1);

        // Frame finale
        this.frames.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: Array.from({length: arr.length}, (_, k) => k),
            message: '✅ Array completamente ordinato!'
        });
    }

    /**
     * Ricorsione Quick Sort per generare frames
     */
    quickSortFrames(arr, low, high) {
        if (low < high) {
            // Scegli pivot (ultimo elemento)
            const pivotIdx = high;
            this.frames.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [],
                pivot: [pivotIdx],
                message: `Scelgo pivot: ${arr[pivotIdx]} (posizione ${pivotIdx})`
            });

            // Partizione
            let i = low - 1;
            for (let j = low; j < high; j++) {
                this.frames.push({
                    array: [...arr],
                    comparing: [j, pivotIdx],
                    swapping: [],
                    sorted: [],
                    pivot: [pivotIdx],
                    message: `Confronto ${arr[j]} con pivot ${arr[pivotIdx]}`
                });

                if (arr[j] < arr[pivotIdx]) {
                    i++;
                    if (i !== j) {
                        this.frames.push({
                            array: [...arr],
                            comparing: [],
                            swapping: [i, j],
                            sorted: [],
                            pivot: [pivotIdx],
                            message: `Scambio ${arr[i]} con ${arr[j]}`
                        });
                        [arr[i], arr[j]] = [arr[j], arr[i]];
                    }
                }
            }

            // Posiziona pivot
            i++;
            if (i !== pivotIdx) {
                this.frames.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [i, pivotIdx],
                    sorted: [],
                    pivot: [pivotIdx],
                    message: `Posiziono pivot ${arr[pivotIdx]} nella posizione corretta ${i}`
                });
                [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
            }

            this.frames.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [i],
                pivot: [],
                message: `Pivot ${arr[i]} ora in posizione definitiva`
            });

            // Ricorsione
            this.quickSortFrames(arr, low, i - 1);
            this.quickSortFrames(arr, i + 1, high);
        } else if (low === high) {
            // Singolo elemento già ordinato
            this.frames.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [low],
                pivot: [],
                message: `Elemento singolo ${arr[low]} già ordinato`
            });
        }
    }

    /**
     * Crea la struttura HTML del visualizzatore
     */
    createVisualization() {
        this.container.innerHTML = `
            <div class="visualizer-header">
                <h3>${this.nomeAlgoritmo}</h3>
                <div class="visualizer-stats">
                    <span class="stat" style="color: var(--text-muted); font-size: 0.85rem;">
                        📚 Visualizzazione didattica (dati ipotetici, non reali)
                    </span>
                    <span class="stat">Frame: <strong id="${this.container.id}-frame">0</strong>/<strong>${this.frames.length - 1}</strong></span>
                </div>
            </div>
            <div class="demo-message" id="${this.container.id}-message"></div>
            <div class="visualizer-canvas demo-canvas" id="${this.container.id}-canvas"></div>
            <div class="visualizer-controls">
                <button id="${this.container.id}-play" class="btn btn-play">▶ Play</button>
                <button id="${this.container.id}-pause" class="btn btn-pause" disabled>⏸ Pause</button>
                <button id="${this.container.id}-prev" class="btn btn-step">⏮ Prev</button>
                <button id="${this.container.id}-next" class="btn btn-step">⏭ Next</button>
                <button id="${this.container.id}-reset" class="btn btn-reset">🔄 Reset</button>
                <label>
                    Velocità:
                    <select id="${this.container.id}-speed" class="speed-select">
                        <option value="2000">Lenta</option>
                        <option value="1000" selected>Normale</option>
                        <option value="500">Veloce</option>
                        <option value="200">Molto Veloce</option>
                    </select>
                </label>
            </div>
        `;

        this.attachEventListeners();
    }

    /**
     * Aggiunge event listeners ai controlli
     */
    attachEventListeners() {
        document.getElementById(`${this.container.id}-play`).addEventListener('click', () => this.play());
        document.getElementById(`${this.container.id}-pause`).addEventListener('click', () => this.pause());
        document.getElementById(`${this.container.id}-prev`).addEventListener('click', () => this.previousFrame());
        document.getElementById(`${this.container.id}-next`).addEventListener('click', () => this.nextFrame());
        document.getElementById(`${this.container.id}-reset`).addEventListener('click', () => this.reset());
        document.getElementById(`${this.container.id}-speed`).addEventListener('change', (e) => {
            this.speed = parseInt(e.target.value);
        });
    }

    /**
     * Renderizza un frame specifico
     */
    renderFrame(frameIndex) {
        if (frameIndex < 0 || frameIndex >= this.frames.length) return;

        this.currentFrame = frameIndex;
        const frame = this.frames[frameIndex];
        const canvas = document.getElementById(`${this.container.id}-canvas`);
        const messageEl = document.getElementById(`${this.container.id}-message`);

        // Aggiorna contatore
        document.getElementById(`${this.container.id}-frame`).textContent = frameIndex;

        // Aggiorna messaggio
        messageEl.textContent = frame.message;

        // Calcola altezza massima per normalizzazione
        const maxValue = Math.max(...this.demoData);

        // Crea le barre
        const barsHtml = frame.array.map((value, index) => {
            const height = (value / maxValue) * 100;

            let barClass = 'demo-bar';
            if (frame.sorted.includes(index)) {
                barClass += ' bar-sorted';
            } else if (frame.pivot && frame.pivot.includes(index)) {
                barClass += ' bar-pivot';
            } else if (frame.swapping.includes(index)) {
                barClass += ' bar-swapping';
            } else if (frame.comparing.includes(index)) {
                barClass += ' bar-comparing';
            }

            return `
                <div class="${barClass}" style="height: ${height}%">
                    <div class="bar-value">${value}</div>
                    <div class="bar-index">${index}</div>
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

        if (this.currentFrame < this.frames.length - 1) {
            this.nextFrame();
            this.animationTimer = setTimeout(() => this.animate(), this.speed);
        } else {
            this.pause();
        }
    }

    /**
     * Frame successivo
     */
    nextFrame() {
        if (this.currentFrame < this.frames.length - 1) {
            this.renderFrame(this.currentFrame + 1);
        }
    }

    /**
     * Frame precedente
     */
    previousFrame() {
        if (this.currentFrame > 0) {
            this.renderFrame(this.currentFrame - 1);
        }
    }

    /**
     * Reset
     */
    reset() {
        this.pause();
        this.renderFrame(0);
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
