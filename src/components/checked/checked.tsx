import { addCharacter, delCharacter } from "../../features/checkedSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Character } from "../../api/swapiTypes";

interface Props {
  character: Character;
  title: string;
  className: string;
  idPrefix: string;
}

function Checked({ character, title, className, idPrefix }: Props) {
  const checked = useAppSelector((state) => state.checkedSlice.checked);
  const dispatch = useAppDispatch();
  const isChecked = !!checked.find((item) => item.id === character.id);

  function changeCheck(check: boolean) {
    if (check) dispatch(addCharacter(character));
    else dispatch(delCharacter(character));
  }

  return (
    <label
      htmlFor={`${idPrefix}${character.id}`}
      className={className}
      data-noclosecard="true"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        className="change-input"
        data-noclosecard="true"
        data-testid="checked-input"
        id={`${idPrefix}${character.id}`}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          changeCheck(e.target.checked);
        }}
      />
      {title}
    </label>
  );
}

export default Checked;
