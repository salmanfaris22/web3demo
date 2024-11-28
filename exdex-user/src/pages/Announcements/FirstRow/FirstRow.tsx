import React from "react";
import { Announcement } from "../Announcements";
import Type1Card from "../Cards/Type1Card";
import Type2Card from "../Cards/Type2Card";
import Type3Card from "../Cards/Type3Card";

interface IFirtsRow {
  data: Announcement[];
}

const FirstRow = ({ data }: IFirtsRow) => {
  const getCardByIndex = (index: number, data: Announcement) => {
    switch (index) {
      case 0:
        case 3:
        return (
          <Type1Card
            date={data.updated_at}
            id={data.id}
            heading={data.name}
            description={data.description}
            thummbNail={data.thumbnail_url}
          />
        );
      case 1:
        return (
          <Type2Card
            date={data.updated_at}
            id={data.id}
            heading={data.name}
            description={data.description}
            thummbNail={data.thumbnail_url}
          />
        );
      case 2:
        console.log("case 3 ", data);
        return (
          <Type3Card
            //@ts-ignore
            data={data as Announcement[]}
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

export default FirstRow;
