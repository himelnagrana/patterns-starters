// brut force
enum VideoStates {
  start = "START",
  playing = "PLAYING",
  paused = "PAUSED",
  stopped = "STOPPED",
}

/**
 * State Pattern solution
 */

abstract class AbstractVideoState {
  protected videoPlayer: VideoPlayer;

  setContext(context: VideoPlayer) {
    this.videoPlayer = context;
    this.init();
  }

  abstract init(): void;
  abstract play(): void;
  abstract stop(): void;
}

class Ready extends AbstractVideoState {
  init(): void {
    console.log('enter ready state!');
    this.videoPlayer.position = 0;
    this.videoPlayer.isPlaying = false;
  }

  play(): void {
    console.log('started playing!');
    this.videoPlayer.setState(new Play());
  }

  stop(): void {}
}

class Play extends AbstractVideoState {
  init(): void {
    console.log('Enter Play Here!');
    this.videoPlayer.isPlaying = true;
  }

  play(): void {
    console.log('Already Playing!');
  }

  stop(): void {
    console.log('Pausing!');
    this.videoPlayer.setState(new Pause());
  }
}

class Pause extends AbstractVideoState {
  init(): void {
    console.log('Enter Pause state!');
    this.videoPlayer.isPlaying = false;
  }

  play(): void {
    console.log('resuming!');
    this.videoPlayer.setState(new Play());
  }

  stop(): void {
    console.log('reseting!');
    this.videoPlayer.setState(new Ready());
  }
}

class VideoPlayer {
  private videoState: AbstractVideoState;

  position: number;
  isPlaying: boolean;

  constructor(initialState: AbstractVideoState) {
    this.setState(initialState);
  }

  setState(state: AbstractVideoState) {
    this.videoState = state;
    this.videoState.setContext(this);
  }

  public play() {
    this.videoState.play();
  }

  public stop() {
    this.videoState.stop();
  }

  /**
   * brut force solution
   */
  // private state: VideoStates = VideoStates.start;

  // public play() {
  //   if (this.state === VideoStates.start) {
  //     console.log('Start playing!');
  //     this.state = VideoStates.playing;
  //   } else if (this.state === VideoStates.playing) {
  //     console.log('Already playing!');
  //   } else if (this.state === VideoStates.paused) {
  //     console.log('Resuming playing!');
  //     this.state = VideoStates.playing;
  //   } else if (this.state === VideoStates.stopped) {
  //     console.log('Playing Again!');
  //     this.state = VideoStates.playing;
  //   }
  // }

  // public stop() {
  //   if (this.state === VideoStates.start) {
  //     console.log('Havent started!');
  //   } else if (this.state === VideoStates.playing) {
  //     console.log('Pausing playing!');
  //     this.state = VideoStates.paused;
  //   } else if (this.state === VideoStates.paused) {
  //     console.log('Reseting playing!');
  //     this.state = VideoStates.start;
  //   } else if (this.state === VideoStates.stopped) {
  //     console.log('Stopped Already!');
  //   }
  // }
}

// todo: video player starts with a video at position 0 ready to play
const videoPlayer = new VideoPlayer(new Ready());

// todo: if ready: play the video
videoPlayer.play();

// todo: if already playing: do nothing
videoPlayer.play();

// todo: if was playing: stop the video at current position (pause)
videoPlayer.stop();

// todo: if paused: return to start position
videoPlayer.stop();
