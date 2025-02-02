const MacroTable = ({ macros }) => {
  return (
    <div className="card mt-4 p-3 shadow-sm">
      <h2 className="font1 text-center text-dark">Macronutrient Breakdown</h2>
      <div class="table-responsive-sm">
      <table className="table table-striped mt-3">
        <thead className="table-dark">
          <tr>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Calories</th>
            <th>Carbs</th>
            <th>Protein</th>
            <th>Fats</th>
          </tr>
        </thead>
        <tbody>
          {macros.data.map((row, idx) => (
            <tr key={idx}>
              <td>{row["Food Item"]}</td>
              <td>{row["Quantity"]}</td>
              <td>{row["Calories"]}</td>
              <td>{row["Carbs"]}</td>
              <td>{row["Protein"]}</td>
              <td>{row["Fats"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default MacroTable;
