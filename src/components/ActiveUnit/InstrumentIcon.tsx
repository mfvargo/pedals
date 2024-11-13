import {
  GiGuitar,
  GiDrumKit,
  GiMicrophone,
  GiTrumpet,
  GiSaxophone,
  GiMaracas,
  GiMusicalKeyboard,
  GiSpeaker,
} from "react-icons/gi";

interface InstrumtIconProps {
  instrument: number;
}

export const instrumentIconOptions = [
  ["Microphone", <GiMicrophone />],
  ["Guitar/Bass", <GiGuitar />],
  ["Drums", <GiDrumKit />],
  ["Keyboards", <GiMusicalKeyboard />],
  ["Trumpet", <GiTrumpet />],
  ["Saxophone", <GiSaxophone />],
  ["Percussion", <GiMaracas />],
];

export const InstrumentIcon = ({ instrument }: InstrumtIconProps) => {
  return instrumentIconOptions[instrument][1] || <GiSpeaker />;
};
