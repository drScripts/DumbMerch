import React from "react";

const ProfileItems = ({ title = "", value = "" }) => {
  return (
    <div className="mb-4">
      <h4 className="text-orange">{title}</h4>
      <h5 className="text-light">
        {value}
        {"\n "}
      </h5>
    </div>
  );
};

export default ProfileItems;
