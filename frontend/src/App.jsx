import { useState } from "react";
import React from "react"; 
import axios from "axios";
import FoodInput from "./components/FoodInput";
import MacroTable from "./components/MacroTable";
import DownloadCSV from "./components/DownloadCSV";
import PieChart from "./components/PieChart";
import Footer from "./components/Footer"; // Import Footer Component
import logo from './assets/KCAl-bg.png';
// import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";  // Import your personal CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [foodItems, setFoodItems] = useState([""]);
  const [macros, setMacros] = useState(null);

  const handleInputChange = (index, value) => {
    const newFoodItems = [...foodItems];
    newFoodItems[index] = value;
    setFoodItems(newFoodItems);
  };

  const addFoodItem = () => setFoodItems([...foodItems, ""]);
  const removeFoodItem = (index) => setFoodItems(foodItems.filter((_, i) => i !== index));

  const fetchMacros = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/get_macros/", {
        food_items: foodItems.filter(item => item.trim() !== ""),
      });
      setMacros(response.data);
    } catch (error) {
      console.error("Error fetching macros:", error);
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Navbar */}

      <nav className="navbar navbar-dark bg-primary fixed-top">
        <div className="container d-flex align-items-center justify-content-center py-1" >
          {/* Logo Image */}
          <img
            src={logo}  // Replace with your logo path
            alt="Logo"
            id="logoani"
            className="logo me-2"
            style={{ height: "60px", width: "60px", borderRadius: "50%" }}
          />

          {/* Title */}
          <h2 className="text-white m-0">Calorie Mate</h2>
        </div>
      </nav>

      <div className="input container mt-5 pt-5">
        <div className="row">
          <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
          <h5 className="tag mt-3 text-center text-danger">Your buddy for calorie management !</h5>
            <div className="card shadow-sm mt-3 p-4">
              <h3 className="item text-center text-primary mb-3">Enter Your Food Items</h3>
              <FoodInput
                foodItems={foodItems}
                handleInputChange={handleInputChange}
                addFoodItem={addFoodItem}
                removeFoodItem={removeFoodItem}
              />
              <div className="text-center">
                <button onClick={fetchMacros} className="get btn btn-success mt-1 w-100">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2" /> Get Macronutrients
                </button>
              </div>
            </div>
          </div>
        </div>

        {macros && (
          <div className="row mt-4 mb-5">
            <div className="col-lg-8 col-md-10 mx-auto">
              <MacroTable macros={macros} />
              <DownloadCSV />
            </div>
            <div className="col-lg-6 col-md-8 col-sm-12 mx-auto mt-4 mb-5">
              <PieChart macros={macros} />
            </div>
          </div>
        )}
      
      </div>
         {/* Footer at the bottom */}
         <Footer />
    </div>
  );
}
