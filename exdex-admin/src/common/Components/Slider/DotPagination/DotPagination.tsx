import classes from "./DotPagination.module.scss";

interface DotPaginationProps {
  totalSlides: number;
  currentIndex: number;
  position?: string;
  onDotClick: (index: number) => void;
}

const DotPagination: React.FC<DotPaginationProps> = ({
  totalSlides,
  currentIndex,
  position = "normal",
  onDotClick,
}) => {
  const dots = Array.from({ length: totalSlides });
  return (
    <div
      className={`${classes.customPagination} ${
        position == "top" ? classes.dotTop : ""
      }`}
    >
      {dots.map((_, index) => (
        <div
          key={index}
          className={`${classes.dot} ${
            currentIndex === index ? classes.active : ""
          }`}
          onClick={() => onDotClick(index)}
        ></div>
      ))}
    </div>
  );
};

export default DotPagination;
