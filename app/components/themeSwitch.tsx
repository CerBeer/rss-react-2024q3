export const Theme = {
  Light: "Light",
  Dark: "Dark",
};

export type ThemeType = (typeof Theme)[keyof typeof Theme];

interface Props {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}
function ThemeSwitch({ theme, setTheme }: Props) {
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
