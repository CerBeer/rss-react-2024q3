import { PureComponent } from "react";
import spinner from "../assets/spinner.gif";

class Spinner extends PureComponent {
  render() {
    return (
      <div className="spinner">
        <img className="spinner-img" src={spinner} alt="loading..." />
      </div>
    );
  }
}

export default Spinner;
