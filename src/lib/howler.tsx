import { Howl } from "howler";
import { Song, Updaters } from "../utils/types";

export class SoundPlayer {
  private sound: Howl | undefined;
  private playlist: Song[] = [];
  private selectedSong: string | undefined;
  private index: number = 0;
  private timer: any;
  private timeContainer: Element | null | undefined;
  private updateTime!: (arg0: number) => void;
  private updateDuration!: (arg0: number) => void;
  private progressTimer: any;
  private volume: number = 0.5;

  constructor() {
    this.timer = null;
    this.progressTimer = null;
  }

  setPlaylist(playlist: Song[]) {
    this.playlist = playlist.map((song) => {
      return {
        ...song,
        howl: undefined,
      };
    });
  }

  playSong(songId: string) {
    this.timeContainer = document.querySelector("#timer");
    const data = this.playlist.find((song) => song.id === songId);
    this.index = this.playlist.findIndex((song) => song.id === songId);
    if (!data) {
      return;
    }
    if (data.howl) {
      this.sound = data.howl;
      this.sound.seek(0);
    } else {
      this.updateTime(0);
      this.updateDuration(0);
      this.sound = data.howl = new Howl({
        src: [`https://yt-music-songs.s3.amazonaws.com/${data.src}`],
        volume: this.volume,
        onplay: () => {
          this.trackProgress();
        },
        onload: () => {
          this.audioFinishLoaded();
        },
        onpause: () => {
          this.clearTimers();
        },
        onstop: () => {
          this.stopAnimations();
        },
        onend: () => {
          this.skip("next");
          this.stopAnimations();
        },
      });
    }
    this.sound.play();

    this.trackTime();
    this.selectedSong = songId;
  }

  setUpdaterFunction({ updateTime, updateDuration }: Updaters) {
    this.updateTime = updateTime;
    this.updateDuration = updateDuration;
  }

  trackProgress = () => {
    this.progressTimer = setInterval(() => {
      if (this.sound) {
        const actualTime = this.sound.seek();
        if (actualTime && typeof actualTime === "number") {
          this.updateTime(actualTime);
        }
      }
    }, 1000);
  };

  audioFinishLoaded() {
    if (this.sound) {
      this.updateDuration(this.sound.duration());
    }
  }

  getDuration() {
    return this.sound?.duration();
  }

  format(val: number) {
    return `0${Math.floor(val)}`.slice(-2);
  }

  formatSeconds(duration: any) {
    if (typeof duration === "number") {
      const mins = ~~((duration % 3600) / 60);
      const secs = ~~duration % 60;

      let ret = "";

      ret += "" + mins + ":" + (secs < 10 ? "0" : "");
      ret += "" + secs;
      return ret;
    }
    return `0:00`;
  }

  stopAnimations = () => {
    this.clearTimers();
    // @ts-ignore
    this.timeContainer.innerHTML = `${this.formatSeconds(
      this.sound?.seek()
    )} / ${this.formatSeconds(this.sound?.duration())}`;
  };

  clearTimers() {
    clearInterval(this.timer);
    clearInterval(this.progressTimer);
  }

  trackTime = () => {
    this.timer = setInterval(() => {
      // @ts-ignore
      this.timeContainer.innerHTML = `${this.formatSeconds(
        this.sound?.seek()
      )} / ${this.formatSeconds(this.sound?.duration())}`;
    }, 300);
  };

  replay() {
    this.sound?.play();
  }

  pauseSong() {
    this.sound?.pause();
  }

  seek(time: number | undefined) {
    if (this.sound) {
      this.sound.seek(time);
    }
  }

  setVolume(level: number) {
    if (this.sound) {
      this.sound.volume(level / 100);
      this.volume = level / 100;
    }
  }

  skip(direction: string) {
    let index = 0;
    if (direction === "prev") {
      index = this.index - 1;
      if (index < 0) {
        index = this.playlist.length - 1;
      }
    } else {
      index = this.index + 1;
      if (index >= this.playlist.length) {
        index = 0;
      }
    }
    this.updateTime(0);
    this.updateDuration(0);
    this.skipTo(index);
    return this.playlist[index].id;
  }

  skipTo(index: number) {
    this.sound?.stop();
    const songId = this.playlist[index].id;
    this.playSong(songId);
  }
}
