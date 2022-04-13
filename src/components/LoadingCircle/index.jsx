import React from "react";
import loadingIcon from "../../assets/loading.gif";

const LoadingCircle = ({ isLoading = false }) => {
  if (isLoading) {
    return (
      <img
        src={loadingIcon}
        alt="loading..."
        width={30}
        height={30}
        className={"me-2"}
      />
    );
  } else {
    return <></>;
  }
};

export default LoadingCircle;
