// import { useContext } from "react";
import { useContext } from "react";
import { ThemeContext, Theme } from "../../contexts/theme";

function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  function changeTheme(checked: boolean) {
    if (!setTheme) return;
    setTheme(checked ? Theme.Dark : Theme.Light);
  }

  return (
    <label htmlFor="ThemeChange" className="theme-change">
      <input
        className="theme-change-input"
        data-noclosecard="true"
        name="ThemeChange"
        type="checkbox"
        checked={theme === Theme.Dark}
        onChange={(e) => {
          changeTheme(e.target.checked);
        }}
      />
      Use dark mode
    </label>
  );
}

export default ThemeSwitch;
