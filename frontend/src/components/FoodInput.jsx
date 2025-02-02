import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FoodInput = ({ foodItems, handleInputChange, addFoodItem, removeFoodItem }) => {
  return (
    <div className="card p-4 shadow-sm">
      {foodItems.map((item, index) => (
        <div key={index} className="input-group mb-2">
          <input
            type="text"
            value={item}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder={`Food Item ${index + 1}`}
            className="form-control"
          />
          <button className="btn btn-danger" onClick={() => removeFoodItem(index)}>
          <FontAwesomeIcon icon={faXmark} className="me-2" />
          </button>
        </div>
      ))}
      <button onClick={addFoodItem} className="get btn btn-primary mt-2">
      <FontAwesomeIcon icon={faPlus} className="me-2" /> Add More
      </button>
    </div>
  );
};

export default FoodInput;
