import React from 'react';
import styles from './SliderCard.module.scss';
import { motion } from 'framer-motion';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide  } from 'swiper/react';

const slides = [
  { id: 1, image: 'https://via.placeholder.com/300?text=Slide+1' },
  { id: 2, image: 'https://via.placeholder.com/300?text=Slide+2' },
  { id: 3, image: 'https://via.placeholder.com/300?text=Slide+3' },
  { id: 4, image: 'https://via.placeholder.com/300?text=Slide+4' },
  { id: 5, image: 'https://via.placeholder.com/300?text=Slide+5' },
];



const SliderCard = () => {
  return (
    <motion.div
      // initial={{ opacity: 0, scale: 0.5 }}
      // whileInView={{ opacity: 1, scale: 1 }}
      // transition={{
      //   duration: 0.5,
      //   delay: 0.3,
      //   ease: [0, 0.71, 0.2, 1.01],
      // }}
      // viewport={{ once: true, amount: 0.1 }}
      className={styles.container}
    >

      <div className={styles.fadeSwiperContainer}>
        <h2>
        Unlock Your Earning Potential – Up to $1 Million a Month Awaits
        </h2>
        <p>Start Today and Discover How ExDex Can Turn Your Influence into a Million-Dollar Income.</p>
        <div
        className={styles.imageWrapper}
        >
              <img src="/assets/images/impact/avatar2.png" alt="Avatar"/>
        </div>
      </div>
     
    </motion.div>
  );
};

export default SliderCard;
