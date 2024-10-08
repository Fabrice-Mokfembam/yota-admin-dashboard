import "./Loader.css";

function Loader({message}) {
  return (
    <div className="loader-container">
      <div className="overlay" />
      <div className="loader">
        <div className="loader-circle"></div>
        <p>{message}...</p>
      </div>
    </div>
  );
}

export default Loader;
