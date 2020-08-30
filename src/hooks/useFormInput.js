import { useState } from "react";

const useFormInput = (initialState) => {
  const [value, setValue] = useState(initialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialState);
  };

  return [value, { value, onChange: handleChange }, reset];
};

export default useFormInput;
