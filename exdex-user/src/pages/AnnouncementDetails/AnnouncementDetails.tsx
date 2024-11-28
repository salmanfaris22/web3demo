import { useEffect } from "react";
import { useParams } from "react-router-dom";
import GradientBg from "../../common/Components/GradientBg/GradientBg";
import { getblogHeadId } from "../../common/Components/HTMLParser/HTMLParser";
import PageWrapper from "../../common/Components/PageWrapper/PageWrapper";
import QlDescription from "../../common/Components/QlDescription/QlDescription";
import MaxScreen from "../../common/Layout/MaxScreen/MaxScreen";
import DataError from "../../common/UI/DataError/DataError";
import FadeComponent from "../../common/UI/Loader/Loader";
import useApi from "../../hooks/useAPI";
import { getAnnoucementsById } from "../../services/announcements";
import { convertISOToLongDateFormat } from "../../utils/date";
import { Announcement } from "../Announcements/Announcements";
import styles from "./AnnouncementDetails.module.scss";

const AnnouncementDetails = () => {
  const { id } = useParams();

  const {
    data,
    executeApi: geAnnouncementsByIdAPI,
    loading: blogDetailsLoading,
    error: detailsError,
  } = useApi<{ data: Announcement }, string>(getAnnoucementsById);

  useEffect(() => {
    if (id) {
      geAnnouncementsByIdAPI(id);
    }
  }, [id]);

  const blogDetails = data?.data;

  if (blogDetailsLoading && !blogDetails) {
    return <FadeComponent />;
  }

  if (detailsError && !blogDetails) {
    return (
      <DataError
        title="Something went wrong"
        btnLabel="reload"
        btnProps={{
          onClick: () => {
            geAnnouncementsByIdAPI(String(id));
          },
        }}
      />
    );
  }

  return (
    <>
      <MaxScreen>
        <PageWrapper>
          <div className={`${styles.container} `}>
            <div className={styles.detailCard}>
              <h1 id={getblogHeadId(0)}>{blogDetails?.name}</h1>
              <div className={styles.date}>
                {convertISOToLongDateFormat(blogDetails?.updated_at || "")}
              </div>
              <div className={styles.tagWrap}>
                {blogDetails?.hashtags?.map((h) => {
                  return (
                    <div key={h} className={styles.tag}>
                      {h}
                    </div>
                  );
                })}
              </div>
              <div className={styles.imageBanner}>
                {blogDetails?.banner_url && (
                  <img src={blogDetails?.banner_url} alt="Banner" />
                )}
              </div>

              <QlDescription description={blogDetails?.description || ""} />
            </div>
          </div>
        </PageWrapper>
      </MaxScreen>
      <GradientBg />
    </>
  );
};

export default AnnouncementDetails;
