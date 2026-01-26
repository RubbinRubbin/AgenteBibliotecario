/**
 * Visualizzatore Didattico Ricerca
 * Visualizzazione puramente didattica e ipotetica per confrontare Ricerca Lineare e Binaria
 * Non riflette i dati reali del dataset
 */

class SearchVisualizer {
    constructor(containerId, nomeAlgoritmo) {
        this.container = document.getElementById(containerId);
        this.nomeAlgoritmo = nomeAlgoritmo;
        this.isBinary = nomeAlgoritmo.toLowerCase().includes('binaria');
        this.currentFrame = 0;
        this.isPlaying = false;
        this.speed = 1200;
        this.animationTimer = null;

        // Dataset ipotetico per visualizzazione didattica (15 frutti ordinati alfabeticamente)
        this.demoData = [
            'Ananas', 'Arancia', 'Banana', 'Ciliegia', 'Cocco',
            'Fragola', 'Kiwi', 'Limone', 'Mango', 'Mela',
            'Pera', 'Pesca', 'Pompelmo', 'Uva', 'Anguria'
        ].sort();

        // Target da cercare (presente nell'array)
        this.demoTarget = 'Mango';
        this.frames = [];
    }

    /**
     * Inizializza il visualizzatore (ignora gli steps reali, usa dati didattici)
     */
    init(steps, target) {
        // Ignora gli steps reali, genera frames didattici
        this.generateDemoFrames();
        this.createVisualization();
        this.renderFrame(0);
    }

    /**
     * Genera frames didattici per l'algoritmo
     */
    generateDemoFrames() {
        if (this.isBinary) {
            this.generateBinarySearchFrames();
        } else {
            this.generateLinearSearchFrames();
        }
    }

    /**
     * Genera frames didattici per Ricerca Lineare
     */
    generateLinearSearchFrames() {
        this.frames = [];

        // Frame iniziale
        this.frames.push({
            array: [...this.demoData],
            examining: [],
            rejected: [],
            found: -1,
            message: `🔍 Inizio ricerca lineare di "${this.demoTarget}"`
        });

        // Cerca sequenzialmente
        for (let i = 0; i < this.demoData.length; i++) {
            // Esamina elemento
            this.frames.push({
                array: [...this.demoData],
                examining: [i],
                rejected: Array.from({length: i}, (_, k) => k),
                found: -1,
                message: `Controllo posizione ${i}: "${this.demoData[i]}" === "${this.demoTarget}"?`
            });

            if (this.demoData[i] === this.demoTarget) {
                // Trovato!
                this.frames.push({
                    array: [...this.demoData],
                    examining: [],
                    rejected: Array.from({length: i}, (_, k) => k),
                    found: i,
                    message: `✅ Trovato "${this.demoTarget}" alla posizione ${i}!`
                });
                break;
            } else {
                // Non corrisponde
                this.frames.push({
                    array: [...this.demoData],
                    examining: [],
                    rejected: Array.from({length: i + 1}, (_, k) => k),
                    found: -1,
                    message: `❌ "${this.demoData[i]}" ≠ "${this.demoTarget}", continuo...`
                });
            }
        }

        // Frame finale
        const foundIdx = this.demoData.indexOf(this.demoTarget);
        this.frames.push({
            array: [...this.demoData],
            examining: [],
            rejected: Array.from({length: foundIdx}, (_, k) => k),
            found: foundIdx,
            message: `🎯 Ricerca completata! Elemento trovato dopo ${foundIdx + 1} controlli`
        });
    }

    /**
     * Genera frames didattici per Ricerca Binaria
     */
    generateBinarySearchFrames() {
        this.frames = [];

        // Frame iniziale
        this.frames.push({
            array: [...this.demoData],
            examining: [],
            rejected: [],
            found: -1,
            left: 0,
            right: this.demoData.length - 1,
            message: `🔍 Inizio ricerca binaria di "${this.demoTarget}" (array ordinato)`
        });

        let left = 0;
        let right = this.demoData.length - 1;
        let iterations = 0;

        while (left <= right) {
            iterations++;
            const mid = Math.floor((left + right) / 2);

            // Mostra range corrente
            this.frames.push({
                array: [...this.demoData],
                examining: [],
                rejected: [],
                found: -1,
                left: left,
                right: right,
                mid: mid,
                message: `Range attivo: [${left}, ${right}], calcolo punto medio: ${mid}`
            });

            // Esamina elemento centrale
            this.frames.push({
                array: [...this.demoData],
                examining: [mid],
                rejected: [],
                found: -1,
                left: left,
                right: right,
                mid: mid,
                message: `Controllo posizione ${mid}: "${this.demoData[mid]}" vs "${this.demoTarget}"`
            });

            if (this.demoData[mid] === this.demoTarget) {
                // Trovato!
                this.frames.push({
                    array: [...this.demoData],
                    examining: [],
                    rejected: [],
                    found: mid,
                    left: left,
                    right: right,
                    message: `✅ Trovato "${this.demoTarget}" alla posizione ${mid}!`
                });
                break;
            } else if (this.demoData[mid] < this.demoTarget) {
                // Cerca a destra
                this.frames.push({
                    array: [...this.demoData],
                    examining: [],
                    rejected: Array.from({length: mid + 1}, (_, k) => k),
                    found: -1,
                    left: left,
                    right: right,
                    mid: mid,
                    message: `"${this.demoData[mid]}" < "${this.demoTarget}", cerco a DESTRA →`
                });
                left = mid + 1;
            } else {
                // Cerca a sinistra
                this.frames.push({
                    array: [...this.demoData],
                    examining: [],
                    rejected: Array.from({length: this.demoData.length - mid}, (_, k) => mid + k),
                    found: -1,
                    left: left,
                    right: right,
                    mid: mid,
                    message: `"${this.demoData[mid]}" > "${this.demoTarget}", cerco a SINISTRA ←`
                });
                right = mid - 1;
            }
        }

        // Frame finale
        const foundIdx = this.demoData.indexOf(this.demoTarget);
        this.frames.push({
            array: [...this.demoData],
            examining: [],
            rejected: [],
            found: foundIdx,
            message: `🎯 Ricerca completata! Elemento trovato dopo ${iterations} divisioni (log₂ n)`
        });
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
                        🍎 Visualizzazione didattica (dati ipotetici, non reali)
                    </span>
                    <span class="stat">Target: <strong>"${this.demoTarget}"</strong></span>
                    <span class="stat">Frame: <strong id="${this.container.id}-frame">0</strong>/<strong>${this.frames.length - 1}</strong></span>
                </div>
            </div>
            <div class="demo-message" id="${this.container.id}-message"></div>
            <div class="search-canvas demo-search-canvas" id="${this.container.id}-canvas"></div>
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
                        <option value="1200" selected>Normale</option>
                        <option value="600">Veloce</option>
                        <option value="300">Molto Veloce</option>
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

        // Crea i box per gli elementi
        const itemsHtml = frame.array.map((item, index) => {
            let itemClass = 'demo-search-item';

            if (frame.found === index) {
                itemClass += ' item-found';
            } else if (frame.examining && frame.examining.includes(index)) {
                itemClass += ' item-examining';
            } else if (frame.rejected && frame.rejected.includes(index)) {
                itemClass += ' item-rejected';
            }

            // Per ricerca binaria, evidenzia range
            if (this.isBinary && frame.left !== undefined && frame.right !== undefined) {
                if (index >= frame.left && index <= frame.right && frame.found !== index) {
                    if (!frame.examining || !frame.examining.includes(index)) {
                        itemClass += ' item-in-range';
                    }
                }

                // Evidenzia il mid
                if (frame.mid !== undefined && index === frame.mid && frame.found !== index) {
                    if (!itemClass.includes('item-examining')) {
                        itemClass += ' item-mid';
                    }
                }
            }

            return `
                <div class="${itemClass}">
                    <div class="item-index">${index}</div>
                    <div class="item-content">${item}</div>
                </div>
            `;
        }).join('');

        // Indicatori per ricerca binaria
        let indicators = '';
        if (this.isBinary && frame.left !== undefined && frame.right !== undefined && frame.found === -1) {
            indicators = `
                <div class="binary-indicators">
                    <span class="indicator">Left: ${frame.left}</span>
                    ${frame.mid !== undefined ? `<span class="indicator">Mid: ${frame.mid}</span>` : ''}
                    <span class="indicator">Right: ${frame.right}</span>
                </div>
            `;
        }

        canvas.innerHTML = indicators + '<div class="demo-search-items">' + itemsHtml + '</div>';
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
    module.exports = SearchVisualizer;
}
