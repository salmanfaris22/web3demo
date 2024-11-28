import SwiperCommon from "../../../../../common/Components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import classes from "./NFT.module.scss";
import { NFT_URL } from "../../../../../config";
import { getPlanConfig, getPlanNFT } from "../../../../../services/plan";
import { useCallback, useEffect, useState } from "react";

interface NFTProps {
  id: string;
  updateNft: (selectedNft: any) => void;
}

export const breakpoints: any = {
  300: {
    slidesPerView: 1.2,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  350: {
    slidesPerView: 1.2,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  400: {
    slidesPerView: 1.5,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  500: {
    slidesPerView: 1.8,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  600: {
    slidesPerView: 2,
    spaceBetween: 20,
    slidesPerGroup: 1,
  },
  700: {
    slidesPerView: 2.5,
    spaceBetween: 20,
    slidesPerGroup: 2,
  },
  800: {
    slidesPerView: 2.8,
    spaceBetween: 20,
    slidesPerGroup: 2,
  },
  900: {
    slidesPerView: 3,
    spaceBetween: 20,
    slidesPerGroup: 3,
  },
  1000: {
    slidesPerView: 4,
    spaceBetween: 20,
    slidesPerGroup: 4,
  },
  1330: {
    slidesPerView: 5,
    spaceBetween: 25,
    slidesPerGroup: 5,
  },
  1600: {
    slidesPerView: 6,
    spaceBetween: 25,
    slidesPerGroup: 6,
  },
};

const NFT: React.FC<NFTProps> = ({ id, updateNft }) => {
  const [nftArray, setNftArray] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (id) {
  //     fetchPlan(id);
  //   }
  // }, [id, page, limit]);

  // const fetchPlan = async (routeid: string) => {
  //   try {
  //     let url = `?page=${page}&limit=${limit}`;
  //     const response = await getPlanNFT(routeid);
  //     if (response.status) {
  //       if (response.data) {
  //         setNftArray(response.data.nft_collections);
  //         setTotal(response.data.total_count);
  //       }
  //       if (response.data.length) {
  //         updateNft(response.data[0]);
  //       }
  //     }
  //   } catch (err) {
  //     // setError(err);
  //   } finally {
  //   }
  // };

  const fetchNFTs = useCallback(
    async (routeid: string, currentPage: number) => {
      if (loading || (currentPage > 1 && nftArray.length >= total)) return;

      setLoading(true);
      try {
        const response = await getPlanNFT(routeid, currentPage, limit);
        if (response.status && response.data) {
          setNftArray((prev: any) => [
            ...prev,
            ...response.data.nft_collections,
          ]);
          setTotal(response.data.total_count);
          if (currentPage === 1 && response.data.nft_collections.length > 0) {
            updateNft(response.data.nft_collections[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching NFTs:", err);
      } finally {
        setLoading(false);
      }
    },
    [limit, loading, nftArray.length, total, updateNft]
  );

  useEffect(() => {
    if (id) {
      setNftArray([]);
      setPage(1);
      fetchNFTs(id, 1);
    }
  }, [id]);

  const handleSlideChange = (slideIndex: any) => {
    const currentIndex = slideIndex;
    setActiveIndex(currentIndex);
    if (
      currentIndex >= nftArray.length - 6 &&
      !loading &&
      nftArray.length < total
    ) {
      const nextPage = Math.floor(nftArray.length / limit) + 1;
      console.log(
        nftArray.length,
        limit,
        Math.floor(nftArray.length / limit),
        nextPage
      );
      setPage(nextPage);
      fetchNFTs(id, nextPage);
    }
  };

  const selectNft = (index: number, item: any) => {
    setActiveIndex(index);
    updateNft(item);
  };

  return (
    <div className={classes.sliderWrap}>
      <SwiperCommon
        slidesPerview={6}
        spaceBetween={25}
        slidesPerGroup={6}
        pagination={true}
        breakpoints={breakpoints}
        dotPosition={"top"}
        arrows={true}
        onActiveIndexChange={handleSlideChange}
        mousewheel={true}
        sensitivity={1.5}
      >
        {nftArray &&
          nftArray.length > 0 &&
          nftArray.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                className={`${classes.nftWrap} ${
                  activeIndex == index && classes.active
                }`}
                onClick={() => {
                  selectNft(index, item);
                }}
              >
                <div
                  className={classes.nftImage}
                  title={item.name}
                  style={{
                    backgroundImage: `url(${NFT_URL}/${item.logo})`,
                  }}
                ></div>
              </div>
            </SwiperSlide>
          ))}
      </SwiperCommon>
    </div>
  );
};

export default NFT;
