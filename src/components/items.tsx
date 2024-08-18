import "./items.css";
import { useAppSelector } from "../redux/hooks";

function Items() {
  const items = useAppSelector((state) => state.submitsSlice);

  return (
    <div className="submits">
      {items.map((item) => {
        const { formData } = item;
        const dateNow = Date.now() / 1000;
        const dateSubmit = parseInt(item.id, 10);
        let itemLastClass = "";
        if (dateNow - dateSubmit < 2) itemLastClass = " submits-item-last";
        return (
          <div key={item.id} className={`submits-item${itemLastClass}`}>
            <img
              className="submits-item-img"
              src={formData.image}
              alt={formData.name}
            />
            <div className="submits-item-row">Name: {formData.name} </div>
            <div className="submits-item-row">email: {formData.email} </div>
            <div className="submits-item-row">Age: {formData.age} </div>
            <div className="submits-item-row">
              Password: {formData.password}{" "}
            </div>
            <div className="submits-item-row">Gender: {formData.gender} </div>
            <div className="submits-item-row">Country: {formData.country} </div>
          </div>
        );
      })}
    </div>
  );
}
export default Items;
