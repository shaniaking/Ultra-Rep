import React from "react";

const sliderHeight = 6;
const markerSize = 16;
const thumbSize = 20;
const sliderColor = "#fa6d43";
const sliderBg = "#232E4D";

const sliderCss = (thumbVisible: boolean) => `
.custom-slider {
  width: 100%;
  height: ${sliderHeight}px;
  border-radius: 6px;
  appearance: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  margin-bottom: 10px;
  position: relative;
  z-index: 2;
}
.custom-slider::-webkit-slider-thumb {
  appearance: none;
  height: ${thumbSize}px;
  width: ${thumbSize}px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid ${sliderColor};
  cursor: pointer;
  margin-top: -7px;
  position: relative;
  z-index: 3;
  opacity: ${thumbVisible ? 1 : 0};
}
.custom-slider:focus::-webkit-slider-thumb,
.custom-slider::-webkit-slider-thumb:hover {
  box-shadow: 0 0 0 5px ${sliderColor}44;
}
.custom-slider::-webkit-slider-runnable-track {
  height: ${sliderHeight}px;
  border-radius: 6px;
  background: transparent;
}
.custom-slider::-moz-range-thumb {
  height: ${thumbSize}px;
  width: ${thumbSize}px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid ${sliderColor};
  cursor: pointer;
  opacity: ${thumbVisible ? 1 : 0};
}
.custom-slider:focus::-moz-range-thumb,
.custom-slider::-moz-range-thumb:hover {
  box-shadow: 0 0 0 5px ${sliderColor}44;
}
.custom-slider::-moz-range-track {
  height: ${sliderHeight}px;
  border-radius: 6px;
  background: transparent;
}

.custom-slider:focus {outline:none;}
.custom-slider::-ms-fill-lower, .custom-slider::-ms-fill-upper { background: transparent;}
.slider-marker {
  width: ${markerSize}px;
  height: ${markerSize}px;
  border: 2px solid ${sliderColor};
  border-radius: 50%;
  background: #fff;
  display: block;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
}
`;


interface RangeSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit?: string;
  showMarkers?: boolean;
}

export default function RangeSlider({
  label,
  value,
  min,
  max,
  onChange,
  unit = "",
  showMarkers = true,
}: RangeSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;
  const markerPositions = [min, Math.floor((min + max) / 2), max];
  const isAtMin = value === min;
  const isAtMax = value === max;
  const thumbVisible = !isAtMin && !isAtMax;

  // Compute marker positions (left %) for absolutely positioning
  const markerLefts = markerPositions.map(pos => ((pos - min) / (max - min)) * 100);

  return (
    <div className="mb-3" style={{ position: "relative", width: "100%" }}>
      <style>{sliderCss(thumbVisible)}</style>
      <label className="mb-1 d-block" style={{ color: "#fff" }}>
        {label}: <strong>{value}</strong> {unit}
      </label>
      {/* Slider track & thumb */}
      <div style={{ position: 'relative', width: "100%" }}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="form-range custom-slider"
          style={{
            background: `linear-gradient(to right, ${sliderColor} 0%, ${sliderColor} ${percent}%, ${sliderBg} ${percent}%, ${sliderBg} 100%)`,
            zIndex: 2,
            position: 'relative',
          }}
        />
        {/* Markers */}
        {showMarkers &&
          markerLefts.map((left, i) => {
            const markerValue = markerPositions[i];
            const reached = value >= markerValue;
            const isAtThisMarker = value === markerValue;
            const markerSize = isAtThisMarker ? 20 : 16; // Enlarge when at exact position
            return (
              <span
                key={i}
                className="slider-marker"
                style={{
                  left: `calc(${left}%)`,
                  pointerEvents: "none",
                  width: `${markerSize}px`,
                  height: `${markerSize}px`,
                  border: reached ? "2px solid #fa6d43" : "2px solid #fff",
                  background: reached ? "#fff" : "#888",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 4,
                  transition: "all 0.2s ease",
                }}
              />
            );
          })
        }
      </div>
      {/* Label numbers */}
      {showMarkers && (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: "#ccc",
          position: "relative",
          top: `-${markerSize / 5}px`,
        }}>
          {markerPositions.map(pos => (
            <span key={pos}>{pos}</span>
          ))}
        </div>
      )}
    </div>
  );
}
