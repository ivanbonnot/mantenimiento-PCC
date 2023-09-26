import { CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
  display: "block",
  margin: "2",
  borderColor: "red",
};

function Spinner() {

  return (
    <div className="sweet-loading">
      <RingLoader color={"#ffffff"} loading={true} cssOverride={override} size={100} aria-label="Loading Spinner" />
    </div>
  );
}

export default Spinner;