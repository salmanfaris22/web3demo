import { useState } from "react";

const usePopUp = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to open the popup
  const openPopUp = () => {
    setIsOpen(true);
  };

  // Function to close the popup
  const closePopUp = () => {
    setIsOpen(false);
  };

  // Function to toggle the popup state
  const togglePopUp = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    openPopUp,
    closePopUp,
    togglePopUp,
  };
};

export default usePopUp;
