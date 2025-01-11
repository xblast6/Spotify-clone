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
        renderizzaContenutiPlayer(brani);
      })
      .catch((err) => console.log("Errore nel fetch carosello:", err));
  }

  function renderizzaContenutiCarosello(brani) {
    let containerCarosello = document.getElementById(
      "containerCaroselloHomePage"
    );
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

  function renderizzaContenutiPlayer(brani) {
    const containerPlayer = document.getElementById("containerPlayer");
    let count = 0;

    brani.forEach((brano) => {
      if (count >= 1) {
        return;
      }
      const containerBranoPlayer = document.createElement("div");
      containerBranoPlayer.classList.add("container-brano-player");
      containerBranoPlayer.innerHTML = `
                <img src="${brano.album.cover}" alt="immagine di copertina del brano in riproduzione">
                <div class="container-dati-brano-player">
                    <p class="nome-brano-player">${brano.title}</p>
                    <p class="artista-brano-player">${brano.artist.name}</p>
                </div>
                <ion-icon name="heart-outline"></ion-icon>
            `;
      const player = document.createElement("div");
      player.classList.add("container-player");
      player.innerHTML = `
                <div class="pulsanti-player">
                    <div class="container-shuffle">
                        <ion-icon name="shuffle"></ion-icon>
                        <p></p>
                    </div>
                    <div class="container-azioni-player">
                        <ion-icon class="avanti-indietro" name="play-skip-back"></ion-icon>
                        <ion-icon class="btn-play-player" name="play-circle"></ion-icon>
                        <ion-icon class="avanti-indietro" name="play-skip-forward"></ion-icon>
                    </div>
                    <div class="container-shuffle">
                        <ion-icon name="repeat-outline"></ion-icon>
                        <p></p>
                    </div>
                </div>
                <div class="container-timeline-player">
                    <p class="durata" id="partita-da">${brano.duration}</p>
                    <div class="timeline">
                        <div class="nero-timeline">
                        </div>
                    </div>
                    <p class="durata" id="manca">${brano.duration}</p>
                </div>
            `;

      const containerIconeDxPlayer = document.createElement("div");
      containerIconeDxPlayer.classList.add("container-icone-dx-player");
      containerIconeDxPlayer.innerHTML = `
                <ion-icon name="text"></ion-icon>
                <ion-icon name="tv"></ion-icon>
                <ion-icon name="albums"></ion-icon>
                <ion-icon name="volume-medium"></ion-icon>
                <input type="range" name="" id="">
                <ion-icon name="expand"></ion-icon>
            `;

      count += 1;
      containerPlayer.appendChild(containerBranoPlayer);
      containerPlayer.appendChild(player);
      containerPlayer.appendChild(containerIconeDxPlayer);
    });
  }

  function fetchPlaylist() {
    const urlPlaylist =
      "https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/0/playlists?limit=50";
    fetch(urlPlaylist)
      .then((res) => res.json())
      .then((jsonData) => {
        const playlist = jsonData.data;
        console.log(playlist);
        renderizzaContenutiRaccoltePersonalizzate(playlist);
        renderizzaContenutiRaccolteConsigliate(playlist);
        renderizzaTitoliPlaylistPersonali(playlist);
      })
      .catch((err) => console.log("Errore nel fetch playlist:", err));
  }

  function renderizzaContenutiRaccoltePersonalizzate(playlist) {
    let containerRaccoltePersonalizzate = document.getElementById(
      "containerRaccoltePersonalizzate"
    );
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
    let countCard = 0;
    playlist.forEach((singolaRaccolta) => {
      if (countCard > 5) {
        return;
      }

      const card = document.createElement("div");
      card.classList.add("card-playlist"); // Aggiungi una classe per lo styling
      card.innerHTML = `
                <img src="${singolaRaccolta.picture_medium}" alt="Immagine di copertina della raccolta ${singolaRaccolta.title}">
                <p>${singolaRaccolta.title}</p>
              
            `;
      countCard += 1;
      console.log(countCard);

      containerRaccoltePersonalizzate.appendChild(containerCardPlaylist);
      containerCardPlaylist.appendChild(card);
    });
  }

  function renderizzaContenutiRaccolteConsigliate(playlist) {
    const containerRaccolteConsigliate = document.getElementById(
      "containerRaccolteConsigliate"
    );
    const containerCardPlaylistConsigliate = document.createElement("div");
    containerCardPlaylistConsigliate.classList.add(
      "container-card-playlist-consigliate"
    );
    let countCard = 0;
    playlist.forEach((singolaRaccolta) => {
      if (countCard > 4) {
        return;
      }
      const card = document.createElement("div");
      card.classList.add("card-playlist-consigliate");
      card.innerHTML = `
                    <img src="${singolaRaccolta.picture_medium}" alt="Immagine di copertina della plylist consigliata">
                    <p>${singolaRaccolta.title}</p>
                    <p>Descrizione della Playlist</p>
            `;
      countCard += 1;

      containerRaccolteConsigliate.appendChild(
        containerCardPlaylistConsigliate
      );
      containerCardPlaylistConsigliate.appendChild(card);
    });
  }

  function renderizzaTitoliPlaylistPersonali(playlist) {
    const containerPlaylistPersonali = document.getElementById(
      "containerPlaylistPersonali"
    );
    playlist.forEach((singolaRaccolta) => {
      const titoloPlaylist = document.createElement("p");
      titoloPlaylist.innerText = `${singolaRaccolta.title}`;
      containerPlaylistPersonali.appendChild(titoloPlaylist);
    });
  }

  contenutiCarosello();
  fetchPlaylist();
});
