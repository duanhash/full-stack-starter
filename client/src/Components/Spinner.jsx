import PacmanLoader from "react-spinners/PacmanLoader";

const Spinner = ({ isLoading }) => {
  return (
    <div className="tw-flex tw-h-screen tw-w-screen tw-justify-center tw-items-center">
      <PacmanLoader
        color={"#F2E9E4"}
        loading={isLoading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Spinner;
