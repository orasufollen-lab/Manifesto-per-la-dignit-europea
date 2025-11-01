document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('background-audio');
    const langButton = document.getElementById('lang-switch-button');
    const italianText = document.getElementById('italian-manifesto');
    const englishText = document.getElementById('english-manifesto');

    let currentLanguage = 'it';
    const manifestoElements = [italianText, englishText];

    // --- FUNZIONI DI BASE ---

    // 1. Funzione per avviare l'audio dopo l'interazione dell'utente
    function startAudio() {
        audio.play().catch(error => {
            // Se l'autoplay fallisce, l'utente dovrà interagire
            console.warn("Autoplay audio bloccato. Attendi interazione utente.");
        });
        // Rimuove l'evento dopo il primo avvio riuscito per evitare doppi click
        document.removeEventListener('click', startAudio);
        document.removeEventListener('scroll', startAudio);
        document.removeEventListener('touchstart', startAudio);
    }

    // Tenta di avviare l'audio al primo click/scroll/touch della pagina
    document.addEventListener('click', startAudio, { once: true });
    document.addEventListener('scroll', startAudio, { once: true });
    document.addEventListener('touchstart', startAudio, { once: true });
    
    // Tenta l'autoplay all'inizio (potrebbe fallire per le policy dei browser)
    audio.play().catch(() => {}); 


    // 2. Funzione per resettare e avviare l'animazione
    function startScrollingAnimation(element) {
        // Forza un reset dell'animazione: rimuovi e riaggiungi la classe 'scrolling-text'
        element.style.animation = 'none';
        element.offsetHeight; // Trucco per forzare il reflow (riavvio) del CSS
        
        // Calcola l'altezza per determinare la durata (per una velocità costante)
        const textHeight = element.scrollHeight;
        // Velocità desiderata: es. 1000px ogni 10 secondi.
        const duration = textHeight / 100; // Ottieni la durata in secondi
        
        // Applica la nuova durata e riavvia l'animazione
        element.style.animation = `creditsRoll ${duration}s linear infinite`;
        
        // Aggiorna il keyframe per coprire l'altezza del contenuto
        // (Nota: i keyframe in CSS sono globali, ma il calcolo della durata aiuta molto)
        
        console.log(`Testo avviato in ${element.lang} con durata: ${duration.toFixed(2)}s`);
    }


    // 3. Logica di cambio lingua
    function switchLanguage() {
        // Determina la nuova lingua
        currentLanguage = currentLanguage === 'it' ? 'en' : 'it';
        
        const targetText = currentLanguage === 'it' ? italianText : englishText;
        const otherText = currentLanguage === 'it' ? englishText : italianText;

        // Nascondi il testo precedente e metti in pausa l'animazione
        otherText.classList.remove('active');
        otherText.style.animationPlayState = 'paused';
        
        // Mostra il nuovo testo e riavvia l'animazione
        targetText.classList.add('active');
        targetText.style.animationPlayState = 'running';
        
        // Resetta e riavvia l'animazione per la nuova lingua
        startScrollingAnimation(targetText);
    }

    // --- AVVIO ---

    // Collega la funzione al pulsante
    langButton.addEventListener('click', switchLanguage);

    // Avvia l'animazione del testo in italiano di default
    startScrollingAnimation(italianText);
});
