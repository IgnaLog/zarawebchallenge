import "./ProgressBar.scss";

const ProgressBar = () => {
  return (
    <div
      className="progress-bar-container"
      role="progressbar"
      aria-label="Progress"
    >
      <div className="progress-bar"></div>
    </div>
  );
};

export default ProgressBar;
