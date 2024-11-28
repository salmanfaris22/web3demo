import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Loading from "./common/UI/Loading/Loading";
import { routes } from "./constants/routes";
import AllQuestions from "./pages/Dashboard/HelpCenter/AllQuestions/AllQuestions";
import EditQuestion from "./pages/Dashboard/HelpCenter/EditQuestion/EditQuestion";
import HelpCenter from "./pages/Dashboard/HelpCenter/HelpCenter";
import PrimarySectionQns from "./pages/Dashboard/HelpCenter/PrimarySectionQns/PrimarySectionQns";
import SubCategorySection from "./pages/Dashboard/HelpCenter/SubCategorySection/SubCategorySection";
import Finance from "./pages/Finance/Finance";
import Tickets from "./pages/Dashboard/Tickets/Tickets";
import UserTickets from "./pages/Dashboard/UserTickets/Tickets";
import TicketReply from "./pages/Dashboard/TicketReply/TicketReply";
import InfluencersList from "./pages/InfluencersList/InfluencersList";
import InfluencerDetails from "./pages/InfluencersList/InfluencerDetails/InfluencerDetails";

const CreateBlog = lazy(() => import("./pages/CreateBlog/CreateBlog"));
const BlogListing = lazy(() => import("./pages/BlogListing/BlogListing"));
const CreateAnnouncements = lazy(() => import("./pages/CreateAnnouncements/CreateAnnouncements"));
const AnnouncementsListing = lazy(() => import("./pages/Announcements/Announcements"));
const Authentication = lazy(() => import("./pages/Auth/Auth"));
const Login = lazy(() => import("./pages/Auth/pages/Login/Login"));
const Register = lazy(() => import("./pages/Auth/pages/Register/Register"));
const Forgot = lazy(() => import("./pages/Auth/pages/Forgot/Forgot"));
const Otp = lazy(() => import("./pages/Auth/pages/Otp/Otp"));
const Reset = lazy(() => import("./pages/Auth/pages/Reset/Reset"));
const Verify = lazy(() => import("./pages/Auth/pages/Verify/Verify"));

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Overview = lazy(() => import("./pages/Dashboard/Overview/Overview"));
const User = lazy(() => import("./pages/Dashboard/User/User"));
const UserListing = lazy(
  () => import("./pages/Dashboard/User/Listing/Listing")
);
const UserDetail = lazy(
  () => import("./pages/Dashboard/User/UserDetail/UserDetail")
);
const BasicInfo = lazy(
  () => import("./pages/Dashboard/User/BasicInfo/BasicInfo")
);
const Permission = lazy(
  () => import("./pages/Dashboard/Permission/Permission")
);

const PermissionListing = lazy(
  () => import("./pages/Dashboard/Permission/Listing/Listing")
);

const PermissionCreate = lazy(
  () => import("./pages/Dashboard/Permission/Create/Create")
);

const Percentage = lazy(
  () => import("./pages/Dashboard/Percentage/Percentage")
);

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Authentication />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<Loading />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "forgot",
        element: (
          <Suspense fallback={<Loading />}>
            <Forgot />
          </Suspense>
        ),
      },
      {
        path: "otp/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Otp />
          </Suspense>
        ),
      },
      {
        path: "reset",
        element: (
          <Suspense fallback={<Loading />}>
            <Reset />
          </Suspense>
        ),
      },
      {
        path: "verify/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Verify />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
    children: [
      {
        path: "overview",
        element: (
          <Suspense fallback={<Loading />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "percent",
        element: (
          <Suspense fallback={<Loading />}>
            <Percentage />
          </Suspense>
        ),
      },
      {
        path: "permission",
        element: (
          <Suspense fallback={<Loading />}>
            <Permission />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Loading />}>
                <PermissionListing />
              </Suspense>
            ),
          },
          {
            path: "create/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <PermissionCreate />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "user",
        element: (
          <Suspense fallback={<Loading />}>
            <User />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Loading />}>
                <UserListing />
              </Suspense>
            ),
          },
          {
            path: "details/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <UserDetail />
              </Suspense>
            ),
          },
          {
            path: "basic/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <BasicInfo />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: routes.helpCenterManage,
        element: (
          <Suspense fallback={<Loading />}>
            <HelpCenter />
          </Suspense>
        ),
      },
      {
        path: routes.subCategory,
        element: (
          <Suspense fallback={<Loading />}>
            <SubCategorySection />
          </Suspense>
        ),
      },
      {
        path: routes.primarySectionQns,
        element: (
          <Suspense fallback={<Loading />}>
            <PrimarySectionQns />
          </Suspense>
        ),
      },
      {
        path: routes.helpCenter,
        element: (
          <Suspense fallback={<Loading />}>
            <AllQuestions />
          </Suspense>
        ),
      },
      {
        path: routes.editQuestions,
        element: (
          <Suspense fallback={<Loading />}>
            <EditQuestion title="Edit Questions" />
          </Suspense>
        ),
      },
      {
        path: routes.editQuestionFromAll,
        element: (
          <Suspense fallback={<Loading />}>
            <EditQuestion title="Edit Question" />
          </Suspense>
        ),
      },
      {
        path: routes.addQuestions,
        element: (
          <Suspense fallback={<Loading />}>
            <EditQuestion title="Add Question" />
          </Suspense>
        ),
      },
      {
        path: routes.addQuestions,
        element: (
          <Suspense fallback={<Loading />}>
            <EditQuestion title="Add Question" />
          </Suspense>
        ),
      },
      {
        path: routes.finance,
        element: (
          <Suspense fallback={<Loading />}>
            <Finance />
          </Suspense>
        ),
      },
      {
        path: routes.tickets,
        element: (
          <Suspense fallback={<Loading />}>
            <Tickets />
          </Suspense>
        ),
      },
      {
        path: routes.userTickets,
        element: (
          <Suspense fallback={<Loading />}>
            <UserTickets />
          </Suspense>
        ),
      },
      {
        path: routes.ticketReply,
        element: (
          <Suspense fallback={<Loading />}>
            <TicketReply />
          </Suspense>
        ),
      },
      {
        path: routes.influencers,
        element: (
          <Suspense fallback={<Loading />}>
            <InfluencersList />
          </Suspense>
        ),
      },
      {
        path: routes.influencerDetails,
        element: (
          <Suspense fallback={<Loading />}>
            <InfluencerDetails />
          </Suspense>
        ),
      },
      {
        path: routes.blogCreate,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateBlog />
          </Suspense>
        ),
      },
      {
        path: routes.blogListing,
        element: (
          <Suspense fallback={<Loading />}>
            <BlogListing />
          </Suspense>
        ),
      },
      {
        path: routes.blogCreate,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateBlog />
          </Suspense>
        ),
      },
      {
        path: routes.blogEdit,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateBlog />
          </Suspense>
        ),
      },
      {
        path: routes.announcement,
        element: (
          <Suspense fallback={<Loading />}>
            <AnnouncementsListing />
          </Suspense>
        ),
      },
      {
        path: routes.createAnnouncements,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateAnnouncements />
          </Suspense>
        ),
      },
      {
        path: routes.editAnnouncement,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateAnnouncements />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
