import { useContext } from "react";
import { ThemeContext, Theme } from "../../contexts/theme";

function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  function changeTheme(checked: boolean) {
    if (!setTheme) return;
    setTheme(checked ? Theme.Dark : Theme.Light);
  }

  return (
    <label
      htmlFor="ThemeChange"
      className="theme-change"
      data-noclosecard="true"
    >
      <input
        className="change-input"
        data-noclosecard="true"
        id="ThemeChange"
        type="checkbox"
        checked={theme === Theme.Dark}
        onChange={(e) => {
          changeTheme(e.target.checked);
        }}
      />
      Dark mode
    </label>
  );
}

export default ThemeSwitch;
