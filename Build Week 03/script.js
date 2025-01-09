document.addEventListener("DOMContentLoaded", () => {
    const oraCorrente = new Date(); 
    const ore = oraCorrente.getHours();
    console.log(`Ora corrente: ${ore}`);

    function contenutiCarosello() {
        fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
            .then((res) => res.json())
            .then((jsonData) => {
                const brani = jsonData.data;
                console.log(brani);
                renderizzaContenutiCarosello(brani);
            })
            .catch((err) => console.log("Errore nel fetch carosello:", err));
    }

    function renderizzaContenutiCarosello(brani) {
        let containerCarosello = document.getElementById("containerCaroselloHomePage");
        containerCarosello.innerHTML = "";
        if (brani.length === 0) {
            containerCarosello.innerHTML = "<p>Nessun brano trovato.</p>";
            return;
        }
        let branoCarosello = brani[0];
        let branoCaroselloHtml = `
            <div class="container-img-carosello-main">
                <img src="${branoCarosello.album.cover_xl}" alt="Copertina dell'album ${branoCarosello.album.title}">
            </div>
            <div class="container-info-cta-carosello-main">
                <div class="container-info-carosello-main">
                    <h3 class="titolo-brano">${branoCarosello.title}</h3>
                    <p>${branoCarosello.artist.name}</p>
                    <p>Ascolta il nuovo singolo di ${branoCarosello.artist.name}</p>
                </div>
                <div class="container-cta-carosello-main">
                    <button class="btn play">Play</button>
                    <button class="btn salva">Salva</button>
                    <ion-icon name="ellipsis-horizontal"></ion-icon>
                </div>
            </div>
        `;
        containerCarosello.innerHTML = branoCaroselloHtml;
    }

    function contenutiRaccoltePersonalizzate() {
        const urlPlaylist = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/playlists";
        fetch(urlPlaylist)
            .then((res) => res.json())
            .then((jsonData) => {
                const playlist = jsonData.data;
                console.log(playlist);
                renderizzaContenutiRaccoltePersonalizzate(playlist);
            })
            .catch((err) => console.log("Errore nel fetch playlist:", err));
    }

    function renderizzaContenutiRaccoltePersonalizzate(playlist){
        let containerRaccoltePersonalizzate = document.getElementById("containerRaccoltePersonalizzate");
        containerRaccoltePersonalizzate.innerHTML = "";

        const h3RaccoltePersonalizzate = document.createElement("h3");
        if (ore >= 1 && ore <= 5) {
            h3RaccoltePersonalizzate.textContent = "Buonanotte";
        } else if (ore >= 6 && ore <= 12) {
            h3RaccoltePersonalizzate.textContent = "Buongiorno";
        } else if (ore >= 13 && ore <= 19) {
            h3RaccoltePersonalizzate.textContent = "Buon pomeriggio";
        } else {
            h3RaccoltePersonalizzate.textContent = "Buonasera";
        }
        containerRaccoltePersonalizzate.appendChild(h3RaccoltePersonalizzate);
        const containerCardPlaylist = document.createElement("div");
        containerCardPlaylist.classList.add("container-card-playlist"); // Aggiungi una classe per lo styling

        playlist.forEach(singolaRaccolta => {
            const card = document.createElement("div");
            card.classList.add("card-playlist"); // Aggiungi una classe per lo styling
            card.innerHTML = `
            
                <img src="${singolaRaccolta.picture_medium}" alt="Immagine di copertina della raccolta ${singolaRaccolta.title}">
                <p>${singolaRaccolta.title}</p>
              
            `;
            containerRaccoltePersonalizzate.appendChild(containerCardPlaylist);
            containerCardPlaylist.appendChild(card);
        });
    }

    contenutiCarosello();
    contenutiRaccoltePersonalizzate();
});
