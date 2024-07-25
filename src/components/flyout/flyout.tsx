import "./flyout.css";
import { clearChecked } from "../../redux/store/checkedSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

function Flyout() {
  const dispatch = useAppDispatch();
  const checkedItems = useAppSelector((state) => state.checkedSlice.checked);
  const countItems = checkedItems.length;
  const selectedCounter = `${countItems} item${countItems > 1 ? "s" : ""} selected`;

  const csvHeader = `id;name;gender;birth_year;height;mass;url\n`;
  const csvFile = checkedItems.reduce((acc, ch) => {
    const newLine = `${ch.id};${ch.name};${ch.gender};${ch.birth_year};${ch.height};${ch.mass};${ch.url}\n`;
    return `${acc}${newLine}`;
  }, csvHeader);

  const onDownload = () => {
    try {
      const csvData = new Blob([csvFile], { type: "text/csv" });
      const csvURL = URL.createObjectURL(csvData);
      const link = document.createElement("a");
      link.href = csvURL;
      link.download = `${countItems}_people.csv`;
      link.click();
    } catch (err) {
      /* empty */
    }
  };

  function onUnselectAll() {
    dispatch(clearChecked());
  }

  return (
    <div className={`flyout ${!countItems && "flyout-hide"}`}>
      <button type="button" data-noclosecard="true" onClick={onUnselectAll}>
        Unselect all
      </button>
      <div className="flyout-selected-counter">{selectedCounter}</div>
      <button type="button" data-noclosecard="true" onClick={onDownload}>
        Download
      </button>
    </div>
  );
}

export default Flyout;
