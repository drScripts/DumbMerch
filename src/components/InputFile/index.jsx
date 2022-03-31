import React from "react";

const Index = ({ onChange, fileName }) => {
  const onFileChange = (e) => {
    onChange(e.target.files[0]);
  };

  return (
    <div className="d-flex align-items-center gap-3 mb-3">
      <label htmlFor="file" className="btn btn-danger">
        Upload Image
        <input
          id="file"
          hidden
          type="file"
          accept={"image/*"}
          onChange={onFileChange}
        />
      </label>
      <p className="text-light mb-0">{fileName ? fileName : "File Name"}</p>
    </div>
  );
};

export default Index;
