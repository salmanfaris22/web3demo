import NoData from "../../../../../common/Components/NoData/NoData";
import Loading from "../../../../../common/UI/Loading/Loading";
import TeamTree from "../TeamTree/TeamTree";
import classes from "./TeamSection.module.scss";

interface TeamSectionProps {
  data: any[];
  isLoading: boolean;
  getChildren: (data: any) => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  data,
  isLoading,
  getChildren,
}) => {
  const teamData = [
    {
      name: "Alex",
      members: 200,
      image: "/path/to/alex-image.jpg",
      children: [
        {
          name: "Alex",
          members: 200,
          image: "/path/to/alex-image.jpg",
          children: [
            {
              name: "Alex",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
            {
              name: "Alex",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
          ],
        },
        {
          name: "Alex",
          members: 200,
          image: "/path/to/alex-image.jpg",
          children: [
            {
              name: "Alex",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
            {
              name: "Alex",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
          ],
        },
      ],
    },
    {
      name: "Alex",
      members: 200,
      image: "/path/to/alex-image.jpg",
      children: [
        {
          name: "Alex",
          members: 200,
          image: "/path/to/alex-image.jpg",
          children: [
            {
              name: "Alex",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
            {
              name: "Alexoisdjoijdsoidsjoidsjodsidosijdsoijdsoijds",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
          ],
        },
        {
          name: "Alex",
          members: 200,
          image: "/path/to/alex-image.jpg",
          children: [
            {
              name: "Alex",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
            {
              name: "Alexsjsoidsjoidsjoidsjdsoijdsoijdsoijds",
              members: 200,
              image: "/path/to/alex-image.jpg",
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className={classes.teamOuter}>
      {data &&
        data.map((item, index) => (
          <TeamTree
            data={item}
            level={1}
            key={index}
            getChildren={getChildren}
          />
        ))}
      {/* {isLoading && <Loading />} */}
      {!isLoading && (!data || !data.length) && (
        <NoData title={"No Data"} description="" />
      )}
    </div>
  );
};

export default TeamSection;
