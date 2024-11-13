const NoteFrequencies = {
  A: 27.5,
  Bb: 29.135,
  B: 30.868,
  C: 32.703,
  Db: 34.648,
  D: 36.708,
  Eb: 38.891,
  E: 41.203,
  F: 43.654,
  Gb: 46.249,
  G: 48.999,
  Ab: 51.913,
};


interface Score {
  note: string;
  drift: number;
  cents: number;
  leftColor: number;
  rightColor: number;
  inTune: boolean;
  angle: number;
}
interface Props {
  frequency: number;
  isOn: boolean;
  channel: 0 | 1;
}

export const Tuner = ({ frequency, isOn, channel }: Props) => {
  const score = getScore();

  function getScore(): Score {
    // scale the frequency down by octaves to the range we have
    let freq = frequency;
    while (freq > NoteFrequencies.Ab) {
      freq /= 2;
    }
    // Find the closest note
    const rval = {
      note: "X",
      drift: 0,
      cents: 0,
      leftColor: 255,
      rightColor: 255,
      inTune: false,
      angle: 0,
    };

    Object.keys(NoteFrequencies).forEach((key) => {
      // @ts-ignore
      const noteFreq = NoteFrequencies[key];
      const drift = (freq - noteFreq) / noteFreq;
      if (Math.abs(drift) < 0.029727273) {
        rval.note = key;
        rval.drift = Math.round(drift * 8577);
        rval.leftColor = rval.drift < 0 ? 255 - Math.abs(rval.drift) : 255;
        rval.rightColor = rval.drift > 0 ? 255 - rval.drift : 255;
        rval.inTune = Math.abs(rval.drift) < 18;
        rval.angle = Math.floor(drift * 3028); // 3100 is 90/0.0297   so a angle is between -90 and +90
      }
    });
    return rval;
  }

  return (
    <div className={`${isOn ? "tuner" : "tuner--hide"}`}>
      {isOn && (
        <div className="tuner__lights-container">
          <div className="tuner__single-light-container">
            <div className="tuner__symbol">&#9837;</div>
            <div
              className={`tuner__light tuner__light--red ${
                !score.inTune && score.drift < 0 ? "tuner__light--red-active" : ""
              }`}
            />
          </div>

          <div className={`tuner__light tuner__light--green ${score.inTune ? "tuner__light--green-active" : ""}`} />

          <div className="tuner__single-light-container">
            <div
              className={`tuner__light tuner__light--red ${
                !score.inTune && score.drift > 0 ? "tuner__light--red-active" : ""
              }`}
            />
            <div className="tuner__symbol">&#9839;</div>
          </div>
        </div>
      )}

      {isOn && (
        <div className="tuner__meter-container">
          <div className="tuner__tuner-text">Channel {channel + 1}</div>
          <div className={`tuner__note-feedback ${score.inTune ? "tuner__note-feedback--in-tune" : ""}`}>
            {score.note}
          </div>

          <div className="tuner__meter-circle">
            <div className="tuner__meter-pointer" style={{ transform: `rotate(${score.angle}deg)` }} />
          </div>
        </div>
      )}
    </div>
  );
};
