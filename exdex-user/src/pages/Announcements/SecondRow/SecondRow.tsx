import React from "react";
import { Announcement } from "../Announcements";
import Type1Card from "../Cards/Type1Card";
import Type2Card from "../Cards/Type2Card";
import Type3Card from "../Cards/Type3Card";
import Type3Single from "../Cards/Type3Single";

interface IFirtsRow {
  data: Announcement[];
}

const SecondRow = ({ data }: IFirtsRow) => {
  const getCardByIndex = (index: number, data: Announcement) => {
    switch (index) {
        case 0:
            return (
              <Type3Single
                //@ts-ignore
                data={data as Announcement[]}
              />
            );
            
      case 1:
        case 2:
        return (
          <Type1Card
            date={data.updated_at}
            id={data.id}
            heading={data.name}
            description={data.description}
            thummbNail={data.thumbnail_url}
          />
        );
      case 3:
        return (
          <Type2Card
            full
            date={data.updated_at}
            id={data.id}
            heading={data.name}
            description={data.description}
            thummbNail={data.thumbnail_url}
          />
        );
 

      default:
        return null;
    }
  };

  return (
    <>
      {data?.map((d, index) => {
        return getCardByIndex(index, d);
      })}
    </>
  );
};

export default SecondRow;
