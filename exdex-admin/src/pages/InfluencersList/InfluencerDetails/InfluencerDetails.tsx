import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../common/Components/Breadcrumb/Breadcrumb";
import Button from "../../../common/Components/Button/Button";
import MainSectionTitle from "../../../common/Components/MainSectionTitle/MainSectionTitle";
import MainWrapper from "../../../common/Layout/PageWrapper/PageWrapper";
import TablePageWrapper from "../../../common/Layout/TableWrapper/TableWrapper";
import DataError from "../../../common/UI/DataError/DataError";
import FadeComponent from "../../../common/UI/Loader/Loader";
import { IMAGE_URL } from "../../../config";
import useApi from "../../../hooks/useAPI";
import useToast from "../../../hooks/useToast";
import {
  apporvRejectAffiliate,
  getInfluencerById,
  IApproveRejectAf,
} from "../../../services/affiliate";
import { formatUserName } from "../../../utils/commonUtils";
import { Submission } from "../InfluencersList";
import styles from "./InfluencerDetails.module.scss";

const InfluencerDetails = () => {
  const { id } = useParams();
  const router = useNavigate();

  const { executeApi, error, loading, data } = useApi<
    { data: Submission },
    string
  >(getInfluencerById);

  useEffect(() => {
    if (id) {
      executeApi(String(id));
    }
  }, [id]);

  const { triggerToast } = useToast();

  const { executeApi: approveReject, loading: approveRejectLoading } = useApi<
    any,
    IApproveRejectAf
  >(apporvRejectAffiliate, {
    onComplete: () => {
      router(-1);
    },
    onError: (errorMessage) => {
      triggerToast(errorMessage, "error");
      console.log("Error deleting category:", errorMessage);
    },
  });

  const userData = data?.data;
  const imageUrl = ((IMAGE_URL as string) +
    "/" +
    userData?.performance_screenshot) as string;

  return (
    <div className={styles.container}>
      {loading && <FadeComponent />}
      {error && (
        <DataError
          btnLabel="Reload Details"
          btnProps={{
            onClick: () => {
              executeApi(String(id));
            },
          }}
        />
      )}

      {data && !loading && (
        <MainWrapper>
          <TablePageWrapper title={null}>
            <div className={styles.breadCrumb}>
              <Breadcrumb sections={[]} />
            </div>
            <MainSectionTitle>{`${data?.data?.username} Information`}</MainSectionTitle>
            <div className={styles.infoWrap}>
              <MainSectionTitle>
                <div className={styles.sectionHeader}>Basic Information</div>
              </MainSectionTitle>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Name</div>
                  <div className={styles.value}>{userData?.username}</div>
                </div>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Country</div>
                  <div className={styles.value}>
                    {userData?.current_country}
                  </div>
                </div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Language</div>
                  <div className={styles.value}>{userData?.language}</div>
                </div>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Email</div>
                  <div className={styles.value}>{userData?.email}</div>
                </div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Phone Number</div>
                  <div className={styles.value}>{userData?.phone_number}</div>
                </div>
                <div className={styles.infoItems}></div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>How do we contact you</div>
                  <div className={styles.value}>{userData?.social_media}</div>
                </div>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    Username (to contact you on Social Media)
                  </div>
                  <div className={styles.value}>
                    {formatUserName(userData?.social_media_username || "")}
                  </div>
                </div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    What country or region do you plan on marketing in?
                  </div>
                  <div className={styles.value}>
                    {userData?.marketing_country}
                  </div>
                </div>
                <div className={styles.infoItems}></div>
              </div>
            </div>
            <div className={styles.infoWrap}>
              <MainSectionTitle>
                <div className={styles.sectionHeader}>
                  Marketting Information
                </div>
              </MainSectionTitle>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    What type of affiliate marketer are you?
                  </div>
                  <div className={styles.value}>{userData?.marketer_type}</div>
                </div>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Affiliate Type</div>
                  <div className={styles.value}>{userData?.affiliate_type}</div>
                </div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    Primary Platform/Channel for promoting
                  </div>
                  <div className={styles.value}>
                    {userData?.primary_social_media}
                  </div>
                </div>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Platform URL</div>
                  <div className={styles.value}>{userData?.promotion_link}</div>
                </div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    How many followers/members/users do you have on your primary
                    platform?
                  </div>
                  <div className={styles.value}>
                    {userData?.followers_count}
                  </div>
                </div>
                <div className={styles.infoItems}></div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    What kind of content do you create in your platform/for your
                    community?
                  </div>
                  <div className={styles.value}>{userData?.content_type}</div>
                </div>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    Please share a brief introduction about yourself and your
                    respective platform/community.
                  </div>
                  <div className={styles.value}>
                    {userData?.platform_description}
                  </div>
                </div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>Additional Informatio</div>
                  <div className={styles.value}>
                    {userData?.additional_info}
                  </div>
                </div>
                <div className={styles.infoItems}></div>
              </div>
              <div className={styles.infoContainer}>
                <div className={styles.infoItems}>
                  <div className={styles.label}>
                    Screenshot of performance metrics on your platforms
                  </div>
                  <div className={styles.value}>
                    <div
                      onClick={() => {
                        window.open(imageUrl);
                      }}
                      className={styles.screenshot}
                      style={{
                        backgroundImage: `url(${imageUrl})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.actnBtn}>
              {(userData?.status === "ACCEPTED" || userData?.status === "") && (
                <Button
                  onClick={() => {
                    approveReject({
                      id: String(userData.id),
                      status: "rejected",
                    });
                  }}
                  theme="bordered"
                  className={styles.rejBtn}
                  disabled={approveRejectLoading}
                >
                  Reject
                </Button>
              )}
              {(userData?.status === "REJECTED" || userData?.status === "") && (
                <Button
                  onClick={() => {
                    approveReject({
                      id: String(userData.id),
                      status: "accepted",
                    });
                  }}
                  isLoading={approveRejectLoading}
                  disabled={approveRejectLoading}
                  theme="bordered"
                  className={styles.accBtn}
                >
                  Approve
                </Button>
              )}
            </div>
          </TablePageWrapper>
        </MainWrapper>
      )}
    </div>
  );
};

export default InfluencerDetails;
