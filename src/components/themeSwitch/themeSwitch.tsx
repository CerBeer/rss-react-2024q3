import { useContext } from "react";
import { ThemeContext, Theme } from "../../features/theme";

function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  function changeTheme(checked: boolean) {
    if (setTheme) setTheme(checked ? Theme.Dark : Theme.Light);
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
        data-testid="theme-change-input"
        id="ThemeChange"
        type="checkbox"
        checked={theme === Theme.Dark}
        onChange={(e) => {
          changeTheme(e.target.checked);
        }}
        hidden
      />
      {theme === Theme.Light ? Theme.Dark : Theme.Light} mode
    </label>
  );
}

export default ThemeSwitch;
