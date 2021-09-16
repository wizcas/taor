import classNames from "classnames";
import { useState } from "react";
import styles from "./Selector.module.css";

const categories = [
  { label: "General", value: "general" },
  { label: "Anime", value: "anime" },
  { label: "People", value: "people" },
];

const purities = [
  { label: "SFW", value: "sfw" },
  { label: "Sketchy", value: "sketchy" },
  { label: "NSFW", value: "nsfw" },
];

const resolutions = [
  { label: "Any", value: undefined },
  { label: "1440x900", value: "1440x900" },
  { label: "1920x1080 (1080p)", value: "1920x1080" },
  { label: "2560x1004 (2K)", value: "2560x1440" },
  { label: "3840x2160 (4K)", value: "3840x2160" },
];
export function WallhavenSelector() {
  return (
    <div>
      <section className={styles.toolbar}>
        <input type="text" placeholder="Search by keywords" />
        <ToggleGroup options={categories} />
        <ToggleGroup options={purities} />
        <select value="3840x2160">
          {resolutions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button>Search</button>
      </section>
      <section></section>
    </div>
  );
}

function ToggleGroup(props) {
  const { options } = props;

  const [checkState, setCheckState] = useState([]);

  function onToggleButtonChange(index) {
    console.log("make toggle change", index);
    function fn(checked) {
      checkState[index] = checked;
      setCheckState((prev) => {
        const next = [...prev];
        next[index] = checked;
        return next;
      });
    }
    return fn;
  }

  return (
    <div className={styles.toggleGroup}>
      {options.map(({ label, value }, i) => {
        return (
          <ToggleButton
            label={label}
            value={value}
            checked={checkState[i]}
            onToggle={onToggleButtonChange(i)}
          />
        );
      })}
    </div>
  );
}

function ToggleButton(props) {
  const { label, value, checked, onToggle } = props;

  function onStateChange(e) {
    onToggle?.(e.target.checked);
  }

  return (
    <label
      className={classNames({
        [styles.checked]: checked,
      })}
    >
      <input
        type="checkbox"
        key={value}
        checked={checked}
        onChange={onStateChange}
      />
      {label}
    </label>
  );
}
