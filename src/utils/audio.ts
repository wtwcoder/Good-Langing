/**
 * Web Audio API synthesizer for humorous sound effects
 * Requires zero external audio files and handles autoplay restrictions safely.
 */

class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Playful cartoon whoosh / dodge sound
  public playDodge() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const startTime = this.ctx.currentTime;
      osc.type = 'sine';
      // Pitch bends upward then swoops down quickly
      osc.frequency.setValueAtTime(320 + Math.random() * 100, startTime);
      osc.frequency.exponentialRampToValueAtTime(750, startTime + 0.08);
      osc.frequency.exponentialRampToValueAtTime(180, startTime + 0.18);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.19);
    } catch {
      // Audio errors safely suppressed
    }
  }

  // Cash register / celebratory chord when user actually clicks or buys
  public playCatchSuccess() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5 major arpeggio
      const startTime = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        const noteStart = startTime + idx * 0.06;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.15, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.26);
      });
    } catch {
      // Audio errors safely suppressed
    }
  }

  // Panic / urgency beep
  public playGlitchTick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880 + Math.random() * 200, now);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio errors safely suppressed
    }
  }

  // Turbo siren alarm
  public playTurbo() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(900, now + 0.15);
      osc.frequency.linearRampToValueAtTime(450, now + 0.3);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Audio errors safely suppressed
    }
  }
}

export const soundManager = new SoundController();
