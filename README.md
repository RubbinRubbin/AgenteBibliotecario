# 📚 Agente Bibliotecario

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square&logo=javascript)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-Open%20Source-green?style=flat-square)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-blue?style=flat-square)

> 🎓 **Applicazione web didattica interattiva** per visualizzare e comprendere gli algoritmi di ordinamento e ricerca attraverso animazioni step-by-step su un dataset di libri.

---

## 📋 Indice

- [Descrizione](#descrizione)
- [Demo Rapida](#-come-utilizzare)
- [Funzionalità Principali](#-funzionalità-principali)
- [Algoritmi Implementati](#-algoritmi-implementati)
- [Tecnologie](#-tecnologie-utilizzate)
- [Installazione](#-come-utilizzare)
- [Pubblicazione GitHub](#-pubblicazione-su-github)
- [Come Contribuire](#-come-contribuire)
- [Roadmap](#-roadmap)

---

## Descrizione

**Agente Bibliotecario** è un'applicazione web interattiva e didattica che visualizza e confronta algoritmi di ordinamento e ricerca su un dataset di libri.

### 🎯 Cosa Puoi Fare

| Funzionalità | Descrizione |
|-------------|-------------|
| 📊 **Genera Dataset** | Crea 100-500 libri casuali o importa il tuo JSON |
| 🔄 **Ordina** | Confronta Selection Sort vs Quick Sort in tempo reale |
| 🔍 **Cerca** | Vedi la differenza tra Ricerca Lineare e Binaria |
| 🎬 **Anima** | Visualizza ogni passo degli algoritmi con colori |
| 📈 **Analizza** | Confronta performance (tempo, comparazioni, scambi) |
| 💾 **Esporta** | Salva i dataset generati per riutilizzo |

### ⚡ Quick Start

```bash
cd src && npx http-server -p 8000
```

Apri `http://localhost:8000` e inizia a esplorare!

---

## 🚀 Come Utilizzare

### 1. Apertura dell'Applicazione

**Metodo Consigliato: Server Locale**

Per garantire il corretto funzionamento del caricamento dei file JSON, è necessario utilizzare un server HTTP locale:

```bash
# Con Node.js (consigliato)
cd src
npx http-server -p 8000

# OPPURE con Python 3
cd src
python -m http.server 8000

# OPPURE con PHP
cd src
php -S localhost:8000
```

Poi apri il browser e vai su `http://localhost:8000`

**Metodo Alternativo: Apertura Diretta**

Apri il file `src/index.html` direttamente nel browser (potrebbero esserci limitazioni CORS per il caricamento dei JSON).

### 2. Setup Dataset

**Opzione A: Genera Dataset Casuale**
1. Usa lo slider per selezionare il numero di libri (100-500)
2. Clicca su "Genera Dataset"

**Opzione B: Carica File JSON**
1. Prepara un file JSON con il formato:
```json
[
  {
    "titolo": "Il Nome della Rosa",
    "autore": "Umberto Eco",
    "anno": 1980
  },
  ...
]
```
2. Clicca su "Carica File" e seleziona il tuo JSON

### 3. Scegli Criterio di Ordinamento

Seleziona come vuoi ordinare i libri:
- **Per Titolo**: Ordine alfabetico dei titoli
- **Per Autore**: Ordine alfabetico degli autori
- **Per Anno**: Ordine cronologico (dal più vecchio al più recente)

### 4. Avvia Ordinamento

Clicca su "Avvia Ordinamento" e osserva le animazioni!

**Controlli disponibili:**
- ▶ **Play**: Avvia animazione automatica
- ⏸ **Pause**: Metti in pausa
- ⏮/⏭ **Prev/Next**: Vai avanti/indietro di uno step
- 🔄 **Reset**: Torna all'inizio
- **Velocità**: Regola la velocità dell'animazione

### 5. Confronto Ordinamento

Analizza la tabella comparativa che mostra:
- Tempo di esecuzione
- Numero di comparazioni
- Numero di scambi
- Algoritmo più efficiente per ogni metrica

### 6. Ricerca Libro

1. Inserisci il titolo del libro da cercare
2. Clicca su "Cerca Libro"
3. Osserva le animazioni di entrambi gli algoritmi

### 7. Risultato

Visualizza il libro trovato con tutti i dettagli della ricerca!

---

## ✨ Funzionalità Principali

### 🎯 Gestione Dataset
- **Generazione Casuale**: Crea dataset di 100-500 libri con titoli, autori e anni casuali
- **Import JSON**: Carica il tuo dataset personalizzato da file JSON
- **Preview Interattiva**: Visualizza statistiche in tempo reale (totale libri, range anni, autori unici)
- **Campionamento Visivo**: Anteprima dei primi 5 libri del dataset

### 🔄 Algoritmi di Ordinamento
- **Doppio Confronto**: Esegue Selection Sort e Quick Sort simultaneamente
- **Criteri Multipli**: Ordina per titolo, autore o anno di pubblicazione
- **Visualizzazione Animata**: Barre verticali colorate che mostrano ogni passo dell'algoritmo
- **Ottimizzazione Display**: Su dataset grandi (>25 elementi), mostra una versione semplificata per chiarezza didattica
- **Controlli Animazione**:
  - Play/Pause per avvio e pausa automatica
  - Step avanti/indietro per analisi dettagliata
  - Regolazione velocità (100ms - 2000ms per step)
  - Reset per riavviare l'animazione

### 🔍 Algoritmi di Ricerca
- **Confronto Parallelo**: Esegue Ricerca Lineare e Binaria contemporaneamente
- **Visualizzazione a Box**: Elementi orizzontali colorati che evidenziano il processo di ricerca
- **Suggerimenti Automatici**: Campo di ricerca con autocomplete dei titoli disponibili
- **Animazione Sincronizzata**: Mostra passo dopo passo come ogni algoritmo trova (o non trova) il libro

### 📊 Metriche e Performance
- **Raccolta Automatica**: Tempo di esecuzione, comparazioni, scambi, iterazioni
- **Tabelle Comparative**: Confronto diretto tra algoritmi con percentuali di differenza
- **Indicatore Migliore**: Evidenzia automaticamente l'algoritmo più efficiente per ogni metrica
- **Analisi Visiva**: Card informative con complessità temporale e spaziale

### 🎨 Visualizzazione e UX
- **Codifica Colori**:
  - 🟦 Grigio: Elemento non processato
  - 🟨 Giallo: Elementi in confronto
  - 🟥 Rosso: Elementi scartati/in scambio
  - 🟦 Blu: Pivot o range attivo
  - 🟩 Verde: Elemento in posizione finale/trovato
- **Design Responsive**: Si adatta a qualsiasi dimensione schermo
- **Interfaccia Intuitiva**: Flusso guidato passo dopo passo
- **Feedback Visivo**: Animazioni fluide e transizioni CSS

### 💾 Esportazione Dati
- **Download JSON**: Salva il dataset generato per riutilizzo futuro
- **Formato Standard**: JSON compatibile con import successivi

---

## 📂 Struttura del Progetto

```
AgenteBibliotecario/
├── data/                           # Dataset generati
├── src/
│   ├── js/
│   │   ├── models/
│   │   │   └── libro.js           # Classe Libro
│   │   ├── generator/
│   │   │   └── dataset_generator.js  # Generatore dataset
│   │   ├── algorithms/
│   │   │   ├── sorting/
│   │   │   │   ├── selection_sort.js
│   │   │   │   └── quick_sort.js
│   │   │   └── searching/
│   │   │       ├── linear_search.js
│   │   │       └── binary_search.js
│   │   ├── animation/
│   │   │   ├── sort_visualizer.js    # Animazioni ordinamento
│   │   │   └── search_visualizer.js  # Animazioni ricerca
│   │   ├── utils/
│   │   │   ├── comparator.js         # Funzioni confronto
│   │   │   └── metrics.js            # Raccolta metriche
│   │   └── main.js                   # Controller principale
│   ├── css/
│   │   ├── style.css                 # Stili generali
│   │   ├── dashboard.css             # Layout dashboard
│   │   └── animations.css            # Animazioni CSS
│   └── index.html                    # Pagina principale
├── assets/
│   └── data/
│       ├── titoli.json               # Pool titoli (140+)
│       └── autori.json               # Pool autori (140+)
└── README.md
```

---

## 🎓 Algoritmi Implementati

### Ordinamento

#### Selection Sort
- **Complessità temporale**: O(n²) in tutti i casi
- **Complessità spaziale**: O(1)
- **Stabilità**: No
- **Caratteristiche**: Minimo numero di scambi, semplice ma inefficiente

#### Quick Sort
- **Complessità temporale**: O(n log n) medio, O(n²) peggiore
- **Complessità spaziale**: O(log n)
- **Stabilità**: No
- **Caratteristiche**: Divide et impera, molto efficiente in pratica

### Ricerca

#### Ricerca Lineare
- **Complessità temporale**: O(n)
- **Complessità spaziale**: O(1)
- **Vincoli**: Nessuno (funziona su array non ordinati)
- **Caratteristiche**: Semplice, scorre sequenzialmente

#### Ricerca Binaria
- **Complessità temporale**: O(log n)
- **Complessità spaziale**: O(1)
- **Vincoli**: Richiede array ordinato
- **Caratteristiche**: Molto veloce, divide a metà il range ad ogni passo

---

## 🎨 Animazioni

### Ordinamento (Barre Verticali)

**Colori:**
- 🟦 **Grigio**: Elemento non ancora processato
- 🟨 **Giallo**: Elementi in confronto
- 🟥 **Rosso**: Elementi in scambio
- 🟦 **Blu**: Pivot (Quick Sort) / Minimo (Selection Sort)
- 🟩 **Verde**: Elemento in posizione finale corretta

### Ricerca (Box Orizzontali)

**Colori:**
- ⬜ **Bianco**: Elemento non controllato
- 🟨 **Giallo**: Elemento in esame corrente
- 🟥 **Rosso**: Elemento scartato
- 🟩 **Verde**: Elemento trovato!
- 🟦 **Blu**: Range attivo (Ricerca Binaria)

---

## 📊 Metriche Raccolte

Per ogni algoritmo vengono tracciati:
- ⏱ **Tempo di esecuzione** (millisecondi)
- 🔄 **Numero di comparazioni**
- ↔️ **Numero di scambi** (solo ordinamento)
- 🔢 **Numero di iterazioni** (solo ricerca)
- 📸 **Steps per animazione**

---

## 🛠 Tecnologie Utilizzate

- **HTML5**: Struttura della pagina
- **CSS3**: Styling e animazioni (flexbox, grid, transitions, animations)
- **JavaScript ES6**: Logica, algoritmi e gestione stato (classi, arrow functions, async/await)
- **No framework/librerie esterne**: Zero dipendenze - Progetto puro e leggero

### Architettura del Codice

**Pattern MVC-like**:
- **Model**: [libro.js](src/js/models/libro.js) - Rappresentazione dati
- **View**: HTML + CSS + Visualizzatori
- **Controller**: [main.js](src/js/main.js) (BibliotecarioApp)

**Modularità**:
- Ogni algoritmo è una classe separata e indipendente
- Visualizzatori riusabili per ordinamento e ricerca
- Utilities condivise (comparator, metrics)
- Separazione logica/presentazione

---

## 🔄 Flusso dell'Applicazione

```
1. Setup Dataset
   ↓
   Genera Casuale → DatasetGenerator → Pool JSON (titoli.json + autori.json)
   Carica File    → File Reader → Parse JSON
   ↓
2. Preview & Configurazione
   ↓
   Mostra statistiche (totale, range anni, autori unici)
   Seleziona criterio (titolo/autore/anno)
   ↓
3. Esecuzione Ordinamento
   ↓
   Selection Sort ────────┬──────→ Metriche & Steps
   Quick Sort     ────────┘
   ↓
4. Visualizzazione Animata
   ↓
   SortVisualizer → Render barre → Animazione step-by-step
   ↓
5. Confronto Performance
   ↓
   Tabella comparativa (tempo, comparazioni, scambi, % differenza)
   ↓
6. Ricerca Libro
   ↓
   Input titolo → Ricerca Lineare + Ricerca Binaria
   ↓
7. Visualizzazione Ricerca
   ↓
   SearchVisualizer → Render box → Animazione ricerca
   ↓
8. Risultato Finale
   ↓
   Mostra libro trovato + Metriche ricerca
   ↓
   Nuova ricerca / Restart
```

### Gestione dello Stato

L'applicazione mantiene lo stato in [main.js](src/js/main.js):
- `libriOriginali[]` - Dataset iniziale
- `libriOrdinatiSelection[]` - Risultato Selection Sort
- `libriOrdinatiQuick[]` - Risultato Quick Sort
- `metricsSelection/Quick/Linear/Binary` - Oggetti Metrics per ogni algoritmo
- `criterio` - Criterio di ordinamento corrente ('titolo', 'autore', 'anno')

### Sistema di Animazione

Ogni algoritmo registra "steps" durante l'esecuzione:
```javascript
{
    tipo: 'confronto' | 'scambio' | 'pivot' | 'ordinato',
    indici: [i, j],        // Indici coinvolti
    stato: [...libri]      // Snapshot dell'array
}
```

I visualizzatori riproducono questi steps con:
- Colori dinamici basati sul tipo di step
- Transizioni CSS smooth
- Controlli play/pause/step
- Velocità regolabile

---

## 🎯 Obiettivi Didattici

Questo progetto ti permette di:
1. ✅ Comprendere visivamente come funzionano gli algoritmi
2. ✅ Confrontare le performance in tempo reale
3. ✅ Vedere l'impatto del criterio di ordinamento
4. ✅ Capire la differenza tra O(n) e O(log n)
5. ✅ Apprezzare l'importanza dell'ordinamento per la ricerca binaria

---

## 💡 Casi d'Uso

### Selection Sort vs Quick Sort

**Usa Selection Sort quando:**
- Dataset molto piccolo (< 50 elementi)
- Il costo di scrittura è molto alto
- Vuoi minimizzare il numero di scambi

**Usa Quick Sort quando:**
- Dataset grande (> 100 elementi)
- Vuoi massima velocità media
- La memoria è limitata

### Ricerca Lineare vs Ricerca Binaria

**Usa Ricerca Lineare quando:**
- L'array NON è ordinato
- Ricerche occasionali
- Dataset piccolo (< 100 elementi)

**Usa Ricerca Binaria quando:**
- L'array è ordinato
- Ricerche frequenti
- Dataset grande (la differenza è drammatica!)

**Esempio**: Su 500 elementi, la ricerca lineare può fare fino a 500 confronti, mentre quella binaria ne fa al massimo 9!

---

## 🔧 Personalizzazione

### Modifica i Pool di Dati

Puoi aggiungere titoli e autori personalizzati nei file:
- `assets/data/titoli.json`
- `assets/data/autori.json`

### Modifica i Range

Nel file `src/js/generator/dataset_generator.js`:
```javascript
this.minLibri = 100;  // Cambia il minimo
this.maxLibri = 500;  // Cambia il massimo
this.minAnno = 1900;  // Cambia anno minimo
this.maxAnno = 2024;  // Cambia anno massimo
```

### Cambia i Colori

Nel file `src/css/style.css`, modifica le variabili CSS:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    /* ... */
}
```

---

## 📝 Note Tecniche

- Il generatore crea combinazioni casuali anche se storicamente non corrette (didattico!)
- Gli algoritmi tracciano ogni singolo step per l'animazione
- Le animazioni usano transizioni CSS per fluidità
- Il progetto funziona completamente offline (no CDN)
- Compatibile con tutti i browser moderni

---

## 🐛 Troubleshooting

**Problema**: Le animazioni non partono
- **Soluzione**: Controlla la console per errori, verifica che tutti i file JS siano caricati

**Problema**: Il file JSON non si carica
- **Soluzione**: Verifica che il formato JSON sia corretto (usa un validator online)

**Problema**: Le barre non si vedono
- **Soluzione**: Prova a cambiare criterio di ordinamento o rigenerare il dataset

---

## 📚 Riferimenti

- [Selection Sort - Wikipedia](https://it.wikipedia.org/wiki/Selection_sort)
- [Quick Sort - Wikipedia](https://it.wikipedia.org/wiki/Quicksort)
- [Ricerca Lineare - Wikipedia](https://it.wikipedia.org/wiki/Ricerca_lineare)
- [Ricerca Binaria - Wikipedia](https://it.wikipedia.org/wiki/Ricerca_binaria)
- [Big O Notation](https://it.wikipedia.org/wiki/O-grande)

---

## 🤝 Come Contribuire

Contributi sono benvenuti! Ecco come puoi aiutare:

### Idee per Miglioramenti
- [ ] Aggiungere altri algoritmi (Merge Sort, Heap Sort, Insertion Sort)
- [ ] Implementare altre ricerche (Interpolation Search, Jump Search)
- [ ] Aggiungere grafici comparativi delle performance
- [ ] Modalità "Challenge" con quiz sugli algoritmi
- [ ] Export delle metriche in CSV/PDF
- [ ] Tema dark/light mode
- [ ] Internazionalizzazione (EN, ES, FR)
- [ ] Progressive Web App (PWA)

### Come Contribuire
1. Fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

### Guidelines
- Mantieni il codice vanilla (no framework)
- Documenta le funzioni con JSDoc
- Segui lo stile esistente del codice
- Testa su diversi browser
- Aggiorna il README se necessario

---

## 🗺 Roadmap

### Versione 1.0 (Attuale)
- ✅ Selection Sort e Quick Sort
- ✅ Ricerca Lineare e Binaria
- ✅ Animazioni interattive
- ✅ Metriche e confronti
- ✅ Import/Export JSON

### Versione 2.0 (Futuro)
- ⏳ Merge Sort e Heap Sort
- ⏳ Visualizzazione complessità Big O
- ⏳ Grafici performance
- ⏳ Sound effects per gli step
- ⏳ Modalità "Race" tra algoritmi
- ⏳ Salvataggio stato su localStorage

### Versione 3.0 (Idee)
- 💡 Algoritmi su alberi (BST, AVL)
- 💡 Algoritmi su grafi (DFS, BFS, Dijkstra)
- 💡 Algoritmi di hashing
- 💡 Backend opzionale per statistiche globali
- 💡 Leaderboard e sfide

---

## 📄 Licenza

Progetto didattico open source - Usa e modifica liberamente!

---

## 👨‍💻 Autore

Progetto sviluppato come esercizio didattico sugli algoritmi di ordinamento e ricerca - 2025

---

## 🌐 Pubblicazione su GitHub

### Sicurezza dei Dati
✅ **Questo progetto è sicuro per la pubblicazione su GitHub**

Il progetto contiene:
- ✅ Solo codice HTML, CSS e JavaScript vanilla
- ✅ Dati fittizi di esempio (titoli e autori di libri)
- ✅ Nessuna API key o credenziali
- ✅ Nessun dato sensibile o personale
- ✅ Nessuna dipendenza esterna o pacchetti npm

### Prima di Pubblicare
1. **Aggiungi .gitignore** (opzionale):
```
# Output generati
data/*.json
output/*.json

# File di sistema
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
```

2. **Verifica che il README sia aggiornato** ✅

3. **Testa localmente** che tutto funzioni:
```bash
cd src
npx http-server -p 8000
```

### Comandi Git per Pubblicare

```bash
# Inizializza repository (se non già fatto)
git init

# Aggiungi tutti i file
git add .

# Primo commit
git commit -m "Initial commit: Agente Bibliotecario - Algoritmi Ordinamento e Ricerca"

# Crea repository su GitHub.com (via web interface)
# Poi collega il repository locale

# Aggiungi remote origin (sostituisci con il tuo URL)
git remote add origin https://github.com/TUO_USERNAME/AgenteBibliotecario.git

# Push su GitHub
git branch -M main
git push -u origin main
```

### Suggerimenti per GitHub
- **Topics consigliati**: `algorithms`, `sorting-algorithms`, `search-algorithms`, `data-structures`, `visualization`, `educational`, `javascript`, `vanilla-js`
- **Descrizione breve**: "🔄 Visualizzazione interattiva di algoritmi di ordinamento e ricerca su dataset di libri"
- **GitHub Pages**: Attiva GitHub Pages per avere una demo live gratuita!
  - Settings → Pages → Source: `main` branch, folder: `/src`
  - URL sarà: `https://TUO_USERNAME.github.io/AgenteBibliotecario/`

### Attivare GitHub Pages
1. Vai su Settings del repository
2. Sezione "Pages"
3. Source: Seleziona branch `main` e folder `/src` (o `/(root)` se sposti index.html in root)
4. Save
5. Aspetta qualche minuto e il tuo sito sarà live!

---

## 🎉 Buon Apprendimento!

Esplora, sperimenta e divertiti a capire come funzionano gli algoritmi!
