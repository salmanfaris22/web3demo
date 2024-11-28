import React from "react";
import styles from "./NFTMap.module.scss";
import NFTCard from "../../components/NFTCard/NFTCard";
import NFTBgCard from "../../components/NFTCard/NFTBgCard";
import SwiperCommon from "../../../../../common/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";

const nftMap = [
  {
    title: "TORBO",
    publishDate: "07 Nov, 2023",
    avatar: "/assets/images/overview/1.png",
    graph: "/assets/images/overview/g1.png",
  },
  {
    title: "BOB",
    publishDate: "01 Nov, 2023",
    avatar: "/assets/images/overview/2.png",
    graph: "/assets/images/overview/g1.png",
  },
  {
    title: "Pooh",
    publishDate: "19 Nov, 2023",
    avatar: "/assets/images/overview/3.png",
    graph: "/assets/images/overview/g3.png",
  },
  {
    title: "Pepe",
    publishDate: "19 Nov, 2023",
    avatar: "/assets/images/overview/4.png",
    graph: "/assets/images/overview/g4.png",
  },
];

const nftBgMap = [
  {
    title: "GAMESWIFT",
    publishDate: "19 Nov, 2023",
    bgImg: "/assets/images/overview/5.png",
    graph: "/assets/images/overview/g4.png",
    footerText: "6x",
  },
  {
    title: "BRETT",
    publishDate: "19 Nov, 2023",
    bgImg: "/assets/images/overview/6.png",
    graph: "/assets/images/overview/g4.png",
    footerText: "6x",
  },
  {
    title: "TokenFi",
    publishDate: "19 Nov, 2023",
    bgImg: "/assets/images/overview/7.png",
    graph: "/assets/images/overview/g4.png",
    footerText: "6x",
  },
  {
    title: "WAGMI GAMES",
    publishDate: "19 Nov, 2023",
    bgImg: "/assets/images/overview/8.png",
    graph: "/assets/images/overview/g4.png",
    footerText: "6x",
  },
  {
    title: "GAME GPT",
    publishDate: "19 Nov, 2023",
    bgImg: "/assets/images/overview/9.png",
    graph: "/assets/images/overview/g4.png",
    footerText: "6x",
  },
  {
    title: "Credify",
    publishDate: "19 Nov, 2023",
    bgImg: "/assets/images/overview/10.png",
    graph: "/assets/images/overview/g4.png",
    footerText: "6x",
  },
  {
    title: "Ondo",
    publishDate: "19 Nov, 2023",
    bgImg: "/assets/images/overview/11.png",
    graph: "/assets/images/overview/g4.png",
    footerText: "6x",
  },
];

const NFTMap = () => {
  return (
    <div className={styles.container}>
      <div className={styles.nftMapContainer}>
        {nftMap.slice(0, 2).map((nft, index) => (
          <div className={styles.section} key={index}>
            <NFTCard {...nft} />
          </div>
        ))}

        <div className={styles.section}>
          {nftMap.slice(2, 4).map((nft, index) => (
            <div className={styles.halfSection} key={index}>
              <NFTCard
                {...nft}
                classNames={{
                  avatarClass: index === 1 ? styles.avatarFull : styles.avatar,
                  publish: styles.publish,
                  footer: styles.footer,
                  btnGroup: styles.btnGroup,
                  graph: styles.graph,
                }}
              />
            </div>
          ))}
        </div>

        <div className={styles.section}>
          {nftBgMap.slice(0, 3).map((nftBg, index) => (
            <div className={styles.tripleSection} key={index}>
              <NFTBgCard title={nftBg.title} bgImg={nftBg.bgImg}    footerText={nftBg.footerText} />
            </div>
          ))}
        </div>

        <div className={styles.section}>
          {nftBgMap.slice(3, 7).map((nftBg, index) => (
            <div className={styles.quadSection} key={index}>
              <NFTBgCard
                noGraph={true}
                title={""}
                bgImg={nftBg.bgImg}
                footerText={nftBg.footerText}
                className={styles.fullBgImg}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.swiper}>
        <SwiperCommon
          pagination={true}
          slidesPerview={1}
          spaceBetween={20}
          slidesPerGroup={1}
          arrows={false}
        >
          {Array.from({ length: 11 }).map((_, index) => (
            <SwiperSlide key={index}>
              <img
                src={`/assets/images/overview/swiper/${index + 1}.png`}
                alt={`NFT ${index + 1}`}
              />
            </SwiperSlide>
          ))}
        </SwiperCommon>
      </div>
    </div>
  );
};

export default NFTMap;
