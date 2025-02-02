import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const DownloadCSV = () => {
  const handleDownload = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/download_csv");
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "macronutrients.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <div className="font text-center mt-3">
      <button onClick={handleDownload} className="btn btn-warning shadow w-100">
        <FontAwesomeIcon icon={faDownload} className="me-2" />
        Download CSV
      </button>
    </div>
  );
};

export default DownloadCSV;
