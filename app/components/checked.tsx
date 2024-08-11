/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { addCharacter, delCharacter } from "../store/checkedSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { CharacterRecord } from "../api/swapiTypes";

interface Props {
  character: CharacterRecord;
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
