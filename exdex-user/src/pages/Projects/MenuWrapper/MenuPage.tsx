import React from "react";
import MenuWrapper from "./components/MenuWrapper/MenuWrapper";

interface MenuPageProps {
  onCategoryChange: (data: any) => void;
}

const MenuPage: React.FC<MenuPageProps> = ({ onCategoryChange }) => {
  const imgUrl = "https://tenx-prod-123.s3.eu-west-2.amazonaws.com/";

  return (
    <div>
      <MenuWrapper imgUrl={imgUrl} onCategoryChange={onCategoryChange} />
    </div>
  );
};

export default MenuPage;
