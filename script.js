document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const audio = document.getElementById("audio");
    const progressBar = document.getElementById("progress-bar");
    const songTitle = document.getElementById("song-title");
    const artist = document.getElementById("artist");
    const songItems = document.querySelectorAll(".song-item");

    let isPlaying = false;
    let currentSongIndex = 0;

    // Updated Song List
    const songs = [
        { title: "Hawayein", artist: "Arijit Singh", src: "hawayein.mp3" },
        { title: "Barish Banke", artist: "Chetan", src: "barish-banke.mp3" },
        { title: "Sanam Teri Kasam", artist: "Ankit Tiwari & Palak Muchhal", src: "sanam-teri-kasam.mp3" }
    ];

    function loadSong(index) {
        audio.src = songs[index].src;
        songTitle.textContent = songs[index].title;
        artist.textContent = songs[index].artist;
        highlightCurrentSong(index);
    }

    function togglePlay() {
        if (isPlaying) {
            audio.pause();
            playButton.innerHTML = "▶";
        } else {
            audio.play();
            playButton.innerHTML = "⏸";
        }
        isPlaying = !isPlaying;
    }

    function highlightCurrentSong(index) {
        songItems.forEach((item, i) => {
            item.style.background = i === index ? "rgba(255, 255, 255, 0.2)" : "transparent";
        });
    }

    playButton.addEventListener("click", togglePlay);

    prevButton.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        audio.play();
        playButton.innerHTML = "⏸";
        isPlaying = true;
    });

    nextButton.addEventListener("click", () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        audio.play();
        playButton.innerHTML = "⏸";
        isPlaying = true;
    });

    songItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(index);
            audio.play();
            playButton.innerHTML = "⏸"; // Ensure play button updates
            isPlaying = true;
        });
    });

    // Update progress bar
    audio.addEventListener("timeupdate", () => {
        if (audio.duration) {
            progressBar.value = (audio.currentTime / audio.duration) * 100;
        }
    });

    // Seek song
    progressBar.addEventListener("input", () => {
        audio.currentTime = (progressBar.value / 100) * audio.duration;
    });

    // Auto play next song when current song ends
    audio.addEventListener("ended", () => {
        nextButton.click();
    });

    loadSong(currentSongIndex);
});
