# Agente Bibliotecario

## Cos'è?

Un'applicazione web didattica che visualizza e confronta **algoritmi di ordinamento e ricerca** usando un dataset di libri. Tutto funziona nel browser, zero dipendenze esterne.

## Stack Tecnologico

- **HTML5** + **CSS3** + **JavaScript ES6** (vanilla, nessun framework)
- Nessun npm, nessun build step, nessun CDN

## Struttura Progetto

```
src/
├── index.html              # Pagina principale
├── css/
│   ├── style.css           # Stili generali
│   ├── dashboard.css       # Stili dashboard
│   └── animations.css      # Animazioni CSS
├── js/
│   ├── main.js             # Controller principale (BibliotecarioApp)
│   ├── models/
│   │   └── libro.js        # Classe Libro
│   ├── generator/
│   │   └── dataset_generator.js  # Genera libri casuali
│   ├── algorithms/
│   │   ├── sorting/
│   │   │   ├── selection_sort.js
│   │   │   └── quick_sort.js
│   │   └── searching/
│   │       ├── linear_search.js
│   │       └── binary_search.js
│   ├── animation/
│   │   ├── sort_visualizer.js    # Visualizza ordinamento
│   │   └── search_visualizer.js  # Visualizza ricerca
│   └── utils/
│       ├── comparator.js   # Funzioni di confronto
│       └── metrics.js      # Raccolta metriche
└── assets/data/
    ├── titoli.json         # Pool ~140 titoli
    └── autori.json         # Pool ~140 autori
```

## Algoritmi Implementati

| Algoritmo | Tipo | Complessità |
|-----------|------|-------------|
| Selection Sort | Ordinamento | O(n²) |
| Quick Sort | Ordinamento | O(n log n) |
| Ricerca Lineare | Ricerca | O(n) |
| Ricerca Binaria | Ricerca | O(log n) |

## Come Funziona

1. **Genera dataset**: 100-500 libri casuali (o carica JSON)
2. **Ordina**: Esegue Selection Sort e Quick Sort in parallelo
3. **Confronta**: Mostra metriche (tempo, comparazioni, scambi)
4. **Cerca**: Ricerca lineare vs binaria con animazione
5. **Visualizza**: Animazioni passo-passo per capire gli algoritmi

## File Chiave

| File | Ruolo |
|------|-------|
| [main.js](src/js/main.js) | Orchestratore, gestisce tutto il flusso |
| [libro.js](src/js/models/libro.js) | Modello dati (titolo, autore, anno) |
| [dataset_generator.js](src/js/generator/dataset_generator.js) | Crea dataset casuali |
| [sort_visualizer.js](src/js/animation/sort_visualizer.js) | Animazione ordinamento (barre) |
| [search_visualizer.js](src/js/animation/search_visualizer.js) | Animazione ricerca (box) |
| [metrics.js](src/js/utils/metrics.js) | Raccoglie tempo, comparazioni, scambi |

## Avvio

Servire con un server HTTP locale (necessario per fetch dei JSON):

```bash
cd src
python -m http.server 8000
```

Poi aprire `http://localhost:8000`

## Personalizzazione

- **Titoli/Autori**: Modifica `src/assets/data/titoli.json` e `autori.json`
- **Range dataset**: In `dataset_generator.js` cambia `minLibri`/`maxLibri`
- **Tema colori**: Variabili CSS in `style.css` (`:root`)
- **Velocità animazioni**: In `sort_visualizer.js` e `search_visualizer.js`

## Punti di Forza

- Zero dipendenze, funziona offline
- Perfetto per didattica algoritmi
- Codice modulare e ben organizzato
- Animazioni fluide e intuitive
- Design responsive