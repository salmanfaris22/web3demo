import React from 'react';
import styles from './Appreciate.module.scss';

export interface AppreciateProps {
  data: {
    user_appreciated: boolean;
    appreciate_count: number;
    view_count: number;
    comment_count: number;
    published_at: string;
  };
  saveAppreciation: (data: boolean) => void;
}

const Appreciate: React.FC<AppreciateProps> = ({ data, saveAppreciation }) => {
  return (
    <div className={styles.appreciate__container}>
      <div className={styles.appreciate__heart} onClick={()=>saveAppreciation(!data?.user_appreciated )}>
        <svg width="82" height="82" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="41" cy="41" r="41" fill="white" className={data?.user_appreciated ? styles.selected : ''} />
          <path
            d="M41.9929 26.7694L40.5774 28.2728L39.162 26.7694C35.2534 22.618 28.9163 22.618 25.0076 26.7694C21.099 30.9209 21.099 37.6535 25.0076 41.8073L26.4231 43.3106L40.0033 57.7362C40.3146 58.0669 40.8402 58.0669 41.1515 57.7362L54.7318 43.3083L56.1472 41.805C60.0558 37.6535 60.0558 30.9209 56.1472 26.7671C52.2386 22.6157 45.9015 22.6156 41.9929 26.7694Z"
            fill="black"
          />
        </svg>
      </div>
      <h4>Appreciate</h4>
      <div className={styles.appreciate__count}>
        <div className={styles.appreciate__count__heart}>
          <span>
            <img decoding="async" loading="eager" src="/assets/images/signal_cards/heart.png" alt="heart" />
          </span>
          <span>{data?.appreciate_count}</span>
        </div>
        <div className={styles.appreciate__count__views}>
          <span>
            <img decoding="async" loading="eager" src="/assets/images/signal_cards/eye.png" alt="eye" />
          </span>
          <span>{data?.view_count}</span>
        </div>
        <div className={styles.appreciate__count__comments}>
          <span>
            <img decoding="async" loading="eager" src="/assets/images/signal_cards/comment.png" alt="comment" />
          </span>
          <span>{data?.comment_count}</span>
        </div>
      </div>
      <div className={styles.appreciate__published}>
        Published {new Date(data?.published_at).toLocaleDateString()}
      </div>
    </div>
  );
};

export default Appreciate;
