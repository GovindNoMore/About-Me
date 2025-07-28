// covers.js
class CoverPlayer {
    constructor() {
        this.currentSongIndex = 0;
        this.isPlaying = false;
        this.songs = [
            {
                title: "No Surprises",
                artist: "Radiohead Cover",
                file: "audios/New Recording 2.mp3" 
            },
            {
                title: "Lovers Rock", 
                artist: "Tv Girl",
                file: "audios/Lovers rock cover try 2.mp3"
            },
            {
                title: "City of Stars",
                artist: "Ryan Gossling", 
                file: "audios/City of star.mp3"
            },
            {
                title: "Remember You",
                artist: "Adventue Time",
                file: "audios/Remember you-1.mp3"
            }
        ];
        
        this.initializePlayer();
        this.setupEventListeners();
    }
    
    initializePlayer() {
        this.audioPlayer = document.getElementById('audio-player');
        this.playBtn = document.getElementById('play-btn');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.vinylDisc = document.getElementById('vinyl-disc');
        this.progressBar = document.getElementById('progress');
        this.progressContainer = document.querySelector('.progress-bar');
        this.currentTimeEl = document.getElementById('current-time');
        this.durationEl = document.getElementById('duration');
        this.currentSongEl = document.getElementById('current-song');
        this.currentArtistEl = document.getElementById('current-artist');
        
        // Load first song
        this.loadSong(0);
    }
    
    setupEventListeners() {
        // Play/Pause button
        this.playBtn.addEventListener('click', () => this.togglePlay());
        
        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        
        // Progress bar click
        this.progressContainer.addEventListener('click', (e) => this.setProgress(e));
        
        // Audio events
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('ended', () => this.nextTrack());
        this.audioPlayer.addEventListener('loadstart', () => this.showLoading());
        this.audioPlayer.addEventListener('canplay', () => this.hideLoading());
        
        // Cover card clicks
        document.querySelectorAll('.cover-card[data-song]').forEach(card => {
            card.addEventListener('click', (e) => {
                const songIndex = parseInt(e.currentTarget.dataset.song);
                this.loadSong(songIndex);
                this.updateActiveCard(songIndex);
            });
        });
        
        // Vinyl disc click (play/pause)
        this.vinylDisc.addEventListener('click', () => this.togglePlay());
    }
    
    loadSong(index) {
        if (index >= 0 && index < this.songs.length) {
            this.currentSongIndex = index;
            const song = this.songs[index];
            
            this.audioPlayer.src = song.file;
            this.currentSongEl.textContent = song.title;
            this.currentArtistEl.textContent = song.artist;
            
            // Reset player state
            this.isPlaying = false;
            this.playBtn.textContent = '▶';
            this.vinylDisc.classList.remove('spinning');
            
            this.updateActiveCard(index);
        }
    }
    
    togglePlay() {
        if (this.audioPlayer.src === '' || this.audioPlayer.src === window.location.href) {
            // No song loaded, load first song
            this.loadSong(0);
            return;
        }
        
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }
    
    play() {
        this.audioPlayer.play().then(() => {
            this.isPlaying = true;
            this.playBtn.textContent = '⏸';
            this.vinylDisc.classList.add('spinning');
        }).catch(error => {
            console.error('Error playing audio:', error);
            this.showError('Unable to play audio file');
        });
    }
    
    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.playBtn.textContent = '▶';
        this.vinylDisc.classList.remove('spinning');
    }
    
    previousTrack() {
        const prevIndex = this.currentSongIndex > 0 ? this.currentSongIndex - 1 : this.songs.length - 1;
        this.loadSong(prevIndex);
    }
    
    nextTrack() {
        const nextIndex = this.currentSongIndex < this.songs.length - 1 ? this.currentSongIndex + 1 : 0;
        this.loadSong(nextIndex);
    }
    
    setProgress(e) {
        const width = this.progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audioPlayer.duration;
        
        if (duration) {
            this.audioPlayer.currentTime = (clickX / width) * duration;
        }
    }
    
    updateProgress() {
        const { duration, currentTime } = this.audioPlayer;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            this.progressBar.style.width = `${progressPercent}%`;
            this.currentTimeEl.textContent = this.formatTime(currentTime);
        }
    }
    
    updateDuration() {
        const duration = this.audioPlayer.duration;
        if (duration) {
            this.durationEl.textContent = this.formatTime(duration);
        }
    }
    
    formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    
    updateActiveCard(index) {
        // Remove active class from all cards
        document.querySelectorAll('.cover-card').forEach(card => {
            card.classList.remove('active');
        });
        
        // Add active class to current card
        const activeCard = document.querySelector(`[data-song="${index}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
    }
    
    showLoading() {
        this.currentSongEl.textContent = 'Loading...';
    }
    
    hideLoading() {
        // Loading complete, song info already updated
    }
    
    showError(message) {
        this.currentSongEl.textContent = `Error: ${message}`;
        this.currentArtistEl.textContent = 'Please check your audio files';
    }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CoverPlayer();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    switch(e.code) {
        case 'Space':
            e.preventDefault();
            document.getElementById('play-btn').click();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            document.getElementById('prev-btn').click();
            break;
        case 'ArrowRight':
            e.preventDefault();
            document.getElementById('next-btn').click();
            break;
    }
});