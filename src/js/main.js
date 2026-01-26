/**
 * Main Controller - Orchestra l'intera applicazione
 */

class BibliotecarioApp {
    constructor() {
        // Stato dell'applicazione
        this.libriOriginali = [];
        this.libriOrdinatiSelection = [];
        this.libriOrdinatiQuick = [];
        this.criterio = 'titolo';
        this.generator = new DatasetGenerator();

        // Metriche
        this.metricsSelection = null;
        this.metricsQuick = null;
        this.metricsLinear = null;
        this.metricsBinary = null;

        // Visualizzatori
        this.sortVisualizerSelection = null;
        this.sortVisualizerQuick = null;
        this.searchVisualizerLinear = null;
        this.searchVisualizerBinary = null;

        // Algoritmi
        this.selectionSort = new SelectionSort();
        this.quickSort = new QuickSort();
        this.linearSearch = new LinearSearch();
        this.binarySearch = new BinarySearch();

        // Inizializza
        this.init();
    }

    /**
     * Inizializza l'applicazione
     */
    async init() {
        // Carica i pool di dati
        await this.generator.caricaPool();

        // Aggiungi event listeners
        this.setupEventListeners();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Genera dataset
        document.getElementById('btn-generate').addEventListener('click', () => {
            this.generateDataset();
        });

        // Carica file
        document.getElementById('btn-load-file').addEventListener('click', () => {
            document.getElementById('file-input').click();
        });

        document.getElementById('file-input').addEventListener('change', (e) => {
            this.loadFile(e.target.files[0]);
        });

        // Criterio di ordinamento
        document.querySelectorAll('input[name="criterio"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.criterio = e.target.value;
            });
        });

        // Avvia ordinamento
        document.getElementById('btn-start-sort').addEventListener('click', () => {
            this.startSorting();
        });

        // Procedi alla ricerca
        document.getElementById('btn-start-search').addEventListener('click', () => {
            this.showSearchSetup();
        });

        // Esegui ricerca
        document.getElementById('btn-execute-search').addEventListener('click', () => {
            this.executeSearch();
        });

        // Nuova ricerca
        document.getElementById('btn-new-search').addEventListener('click', () => {
            this.showSearchSetup();
        });

        // Restart
        document.getElementById('btn-restart').addEventListener('click', () => {
            location.reload();
        });
    }

    /**
     * Mostra una sezione specifica
     */
    showSection(section) {
        const sectionEl = document.getElementById(`section-${section}`);
        sectionEl.classList.remove('hidden');
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    /**
     * Genera dataset casuale (sempre 500 libri)
     */
    generateDataset() {
        this.libriOriginali = this.generator.genera().map(data =>
            new Libro(data.titolo, data.autore, data.anno)
        );

        this.showDatasetPreview();
    }

    /**
     * Carica file JSON
     */
    async loadFile(file) {
        if (!file) return;

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            this.libriOriginali = data.map(item =>
                new Libro(item.titolo, item.autore, item.anno)
            );

            this.showDatasetPreview();
        } catch (error) {
            alert('Errore nel caricamento del file: ' + error.message);
        }
    }

    /**
     * Mostra anteprima dataset
     */
    showDatasetPreview() {
        const preview = document.getElementById('dataset-preview');
        preview.style.display = 'block';

        // Statistiche
        const stats = this.generator.getStatistiche(this.libriOriginali);
        document.getElementById('stat-total').textContent = stats.totaleLibri;
        document.getElementById('stat-years').textContent = `${stats.annoMinimo}-${stats.annoMassimo}`;
        document.getElementById('stat-authors').textContent = stats.autoriUnici;

        // Anteprima libri (primi 10)
        const previewBooks = document.getElementById('preview-books');
        const preview10 = this.libriOriginali.slice(0, 10);
        previewBooks.innerHTML = preview10.map(libro =>
            `<p>${libro.toString()}</p>`
        ).join('');

        if (this.libriOriginali.length > 10) {
            previewBooks.innerHTML += `<p><em>... e altri ${this.libriOriginali.length - 10} libri</em></p>`;
        }
    }

    /**
     * Avvia l'ordinamento
     */
    async startSorting() {
        // Mostra sezione ordinamento
        this.showSection('sorting');

        // Crea copie per gli algoritmi
        this.libriOrdinatiSelection = this.libriOriginali.map(l => l.clone());
        this.libriOrdinatiQuick = this.libriOriginali.map(l => l.clone());

        // Ottieni funzione di confronto
        const compareFn = Comparator.getFunzioneConfronto(this.criterio);

        // Inizializza metriche
        this.metricsSelection = new Metrics('Selection Sort');
        this.metricsQuick = new Metrics('Quick Sort');

        // Esegui ordinamenti
        this.selectionSort.ordina(this.libriOrdinatiSelection, compareFn, this.metricsSelection);
        this.quickSort.ordina(this.libriOrdinatiQuick, compareFn, this.metricsQuick);

        console.log('Selection Sort:', this.metricsSelection.getRiepilogo());
        console.log('Quick Sort:', this.metricsQuick.getRiepilogo());

        // Crea visualizzatori
        this.sortVisualizerSelection = new SortVisualizer('sort-selection', 'Selection Sort');
        this.sortVisualizerQuick = new SortVisualizer('sort-quick', 'Quick Sort');

        // Inizializza con gli steps
        this.sortVisualizerSelection.init(this.metricsSelection.getSteps(), this.criterio);
        this.sortVisualizerQuick.init(this.metricsQuick.getSteps(), this.criterio);

        // Mostra confronto dopo un delay
        setTimeout(() => {
            this.showSortingComparison();
        }, 1000);
    }

    /**
     * Mostra confronto ordinamento
     */
    showSortingComparison() {
        const comparison = document.getElementById('sorting-comparison');
        comparison.style.display = 'block';

        const tbody = document.getElementById('comparison-tbody');
        const m1 = this.metricsSelection.getRiepilogo();
        const m2 = this.metricsQuick.getRiepilogo();

        // Calcola differenze percentuali
        const tempo1 = parseFloat(m1.tempoEsecuzione);
        const tempo2 = parseFloat(m2.tempoEsecuzione);
        const diffTempo = ((Math.abs(tempo1 - tempo2) / Math.min(tempo1, tempo2)) * 100).toFixed(1);
        const tempoVincitore = tempo1 < tempo2 ? 'Selection Sort' : 'Quick Sort';

        const diffComparazioni = ((Math.abs(m1.comparazioni - m2.comparazioni) / Math.min(m1.comparazioni, m2.comparazioni)) * 100).toFixed(1);
        const comparazioniVincitore = m1.comparazioni < m2.comparazioni ? 'Selection Sort' : 'Quick Sort';

        const diffScambi = ((Math.abs(m1.scambi - m2.scambi) / Math.min(m1.scambi, m2.scambi)) * 100).toFixed(1);
        const scambiVincitore = m1.scambi < m2.scambi ? 'Selection Sort' : 'Quick Sort';

        tbody.innerHTML = `
            <tr>
                <td><strong>Tempo Esecuzione</strong></td>
                <td>${m1.tempoEsecuzione} ms</td>
                <td>${m2.tempoEsecuzione} ms</td>
                <td>${tempoVincitore}</td>
                <td>+${diffTempo}%</td>
            </tr>
            <tr>
                <td><strong>Comparazioni</strong></td>
                <td>${m1.comparazioni}</td>
                <td>${m2.comparazioni}</td>
                <td>${comparazioniVincitore}</td>
                <td>+${diffComparazioni}%</td>
            </tr>
            <tr>
                <td><strong>Scambi</strong></td>
                <td>${m1.scambi}</td>
                <td>${m2.scambi}</td>
                <td>${scambiVincitore}</td>
                <td>+${diffScambi}%</td>
            </tr>
            <tr>
                <td><strong>Steps Animazione</strong></td>
                <td>${m1.numeroSteps}</td>
                <td>${m2.numeroSteps}</td>
                <td>-</td>
                <td>-</td>
            </tr>
        `;
    }

    /**
     * Mostra setup ricerca
     */
    showSearchSetup() {
        this.showSection('searching');

        // Popola suggerimenti con i titoli ordinati
        const datalist = document.getElementById('book-suggestions');
        datalist.innerHTML = this.libriOrdinatiQuick.map(libro =>
            `<option value="${libro.titolo}">`
        ).join('');

        // Aggiungi autocomplete
        const input = document.getElementById('search-input');
        input.setAttribute('list', 'book-suggestions');
        input.focus();
    }

    /**
     * Esegui ricerca
     */
    executeSearch() {
        const target = document.getElementById('search-input').value.trim();

        if (!target) {
            alert('Inserisci un titolo da cercare');
            return;
        }

        // Inizializza metriche
        this.metricsLinear = new Metrics('Ricerca Lineare');
        this.metricsBinary = new Metrics('Ricerca Binaria');

        // Esegui ricerche
        const resultLinear = this.linearSearch.cerca(this.libriOriginali, target, this.metricsLinear);
        const resultBinary = this.binarySearch.cerca(this.libriOrdinatiQuick, target, this.metricsBinary);

        console.log('Ricerca Lineare:', resultLinear);
        console.log('Ricerca Binaria:', resultBinary);

        // Inizializza visualizzatori
        this.searchVisualizerLinear = new SearchVisualizer('search-linear', 'Ricerca Lineare (Non Ordinata)');
        this.searchVisualizerBinary = new SearchVisualizer('search-binary', 'Ricerca Binaria (Ordinata)');

        this.searchVisualizerLinear.init(this.metricsLinear.getSteps(), target);
        this.searchVisualizerBinary.init(this.metricsBinary.getSteps(), target);

        // Mostra confronto e risultato
        setTimeout(() => {
            this.showSearchComparison(resultLinear, resultBinary);

            if (resultLinear.trovato || resultBinary.trovato) {
                this.showResult(resultLinear.trovato ? resultLinear.libro : resultBinary.libro,
                               resultLinear, resultBinary);
            } else {
                alert('Libro non trovato nel dataset!');
            }
        }, 1000);
    }

    /**
     * Mostra confronto ricerca
     */
    showSearchComparison(resultLinear, resultBinary) {
        const comparison = document.getElementById('search-comparison');
        comparison.style.display = 'block';

        const tbody = document.getElementById('search-comparison-tbody');
        const m1 = this.metricsLinear.getRiepilogo();
        const m2 = this.metricsBinary.getRiepilogo();

        // Calcola differenze percentuali
        const tempo1 = parseFloat(m1.tempoEsecuzione);
        const tempo2 = parseFloat(m2.tempoEsecuzione);
        const diffTempo = tempo1 > 0 && tempo2 > 0 ?
            ((Math.abs(tempo1 - tempo2) / Math.min(tempo1, tempo2)) * 100).toFixed(1) : '0.0';
        const tempoVincitore = tempo1 < tempo2 ? 'Ricerca Lineare' : 'Ricerca Binaria';

        const diffIterazioni = m1.iterazioni > 0 && m2.iterazioni > 0 ?
            ((Math.abs(m1.iterazioni - m2.iterazioni) / Math.min(m1.iterazioni, m2.iterazioni)) * 100).toFixed(1) : '0.0';
        const iterazioniVincitore = m1.iterazioni < m2.iterazioni ? 'Ricerca Lineare' : 'Ricerca Binaria';

        tbody.innerHTML = `
            <tr>
                <td><strong>Tempo Esecuzione</strong></td>
                <td>${m1.tempoEsecuzione} ms</td>
                <td>${m2.tempoEsecuzione} ms</td>
                <td>${tempoVincitore}</td>
                <td>+${diffTempo}%</td>
            </tr>
            <tr>
                <td><strong>Iterazioni</strong></td>
                <td>${m1.iterazioni}</td>
                <td>${m2.iterazioni}</td>
                <td>${iterazioniVincitore}</td>
                <td>+${diffIterazioni}%</td>
            </tr>
            <tr>
                <td><strong>Trovato</strong></td>
                <td>${resultLinear.trovato ? 'Sì' : 'No'}</td>
                <td>${resultBinary.trovato ? 'Sì' : 'No'}</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td><strong>Posizione</strong></td>
                <td>${resultLinear.trovato ? resultLinear.indice : '-'}</td>
                <td>${resultBinary.trovato ? resultBinary.indice : '-'}</td>
                <td>-</td>
                <td>-</td>
            </tr>
        `;
    }

    /**
     * Mostra risultato finale
     */
    showResult(libro, resultLinear, resultBinary) {
        this.showSection('result');

        document.getElementById('result-title').textContent = libro.titolo;
        document.getElementById('result-author').textContent = libro.autore;
        document.getElementById('result-year').textContent = libro.anno;

        const details = `
            <p><strong>Ricerca Lineare:</strong> Trovato alla posizione ${resultLinear.indice}
            dopo ${resultLinear.iterazioni} iterazioni in ${this.metricsLinear.getTempoFormattato()}</p>
            <p><strong>Ricerca Binaria:</strong> Trovato alla posizione ${resultBinary.indice}
            dopo ${resultBinary.iterazioni} iterazioni in ${this.metricsBinary.getTempoFormattato()}</p>
            <p><strong>Differenza:</strong> La ricerca binaria è stata ${
                (resultLinear.iterazioni / resultBinary.iterazioni).toFixed(1)
            }x più efficiente in termini di iterazioni!</p>
        `;
        document.getElementById('result-details').innerHTML = details;
    }
}

// Inizializza l'applicazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    const app = new BibliotecarioApp();
    console.log('Agente Bibliotecario avviato!');
});
