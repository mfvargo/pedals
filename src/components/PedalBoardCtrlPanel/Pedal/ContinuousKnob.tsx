import { useState } from "react";

interface ContinuousKnobProps {
  label: string;
  degrees: number;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  pedalId?: number;
}

const ContinuousKnob = ({ label, degrees, min, max, value, onChange, pedalId }: ContinuousKnobProps) => {
  const valueToDegrees = (newValue: number) => {
    // convert the value to the angle of the knob
    // Interger value of startAngle plus the ratio of value to range
    // times the degress of rotation for the knob
    return Math.floor((360 - degrees) / 2 + (degrees * (newValue - min)) / (max - min));
  };

  const [val, setVal] = useState(value);

  const startDrag = (e: any) => {
    if (!e.changedTouches) {
      e.preventDefault();
    }
    // clientY doesn't exist on touch events
    // but does exist inside the array 'changedTouches'
    let startY = e.clientY ? e.clientY : e.changedTouches[0].clientY;

    const moveHandler = (e: any) => {
      const clientY = e.clientY ? e.clientY : e.changedTouches[0].clientY;
      // move value based on deltaY
      const deltaY = startY - clientY;
      const newValue = Math.min(Math.max(min, val + deltaY * 2), max);
      setVal(newValue);
      onChange(newValue);
    };

    e.target.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", () => {
      e.target.removeEventListener("mousemove", moveHandler);
    });
    e.target.addEventListener("touchmove", moveHandler);
    e.target.addEventListener("touchend", () => {
      e.target.removeEventListener("mousemove", moveHandler);
    });
  };

  const endDrag = (e: any) => {
    e.target.blur();
  };

  return (
    <div
      className="pedal__continuous-knob"
      onMouseDown={startDrag}
      onMouseUp={endDrag}
      onTouchStart={startDrag}
      onTouchEnd={endDrag}
    >
      <div
        className="pedal__knob"
        id={`${pedalId}-${label}`}
        style={{ transform: `rotate(${valueToDegrees(val)}deg)` }}
      >
        <div className="pedal__knob-line" />
      </div>
    </div>
  );
};

export default ContinuousKnob;
