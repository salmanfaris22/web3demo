import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { routers } from "./common/Constants";
import Loading from "./common/UI/Loading/Loading";
import AISignals from "./pages/AISignals/AISignals";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";
import Projects from "./pages/Projects/Projects";
import HasWatchList from "./pages/WatchList/HasWatchList";
import { FilterProvider } from "./store/context/filterContext";
const AnnouncementDetails = lazy(
  () => import("./pages/AnnouncementDetails/AnnouncementDetails")
);
const BlogDetails = lazy(() => import("./pages/BlogDetails/BlogDetails"));
const Announcements = lazy(() => import("./pages/Announcements/Announcements"));
const BlogsListing = lazy(() => import("./pages/BlogsListing/BlogsListing"));
const DexGemPicks = lazy(() => import("./pages/DexGemPicks/DexGemPicks"));

const Trading = lazy(() => import("./pages/Trading/Trading"));
const Academy = lazy(() => import("./pages/Academy/Academy"));
const Broker = lazy(() => import("./pages/Broker/Broker"));
const SupportTicketList = lazy(
  () => import("./pages/SupportTicketList/SupportTicketList")
);
const SupportTicketDetails = lazy(
  () => import("./pages/SupportTicketDetails/SupportTicketDetails")
);
const ParticipationAgreement = lazy(
  () => import("./pages/ParticipationAgreement/ParticipationAgreement")
);
const AIWatchlist = lazy(() => import("./pages/AIWatchlist/AIWatchlist"));

const Authentication = lazy(() => import("./pages/Auth/Auth"));
const Login = lazy(() => import("./pages/Auth/pages/Login/Login"));
const Register = lazy(() => import("./pages/Auth/pages/Register/Register"));
const Forgot = lazy(() => import("./pages/Auth/pages/Forgot/Forgot"));
const Otp = lazy(() => import("./pages/Auth/pages/Otp/Otp"));
const Reset = lazy(() => import("./pages/Auth/pages/Reset/Reset"));
const Verify = lazy(() => import("./pages/Auth/pages/Verify/Verify"));

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Discover = lazy(() => import("./pages/Dashboard/Discover/Discover"));
const Overview = lazy(() => import("./pages/Dashboard/Overview/Overview"));
const Packages = lazy(() => import("./pages/Dashboard/Packages/Package"));
const PackagePlan = lazy(
  () => import("./pages/Dashboard/PackagePlan/PackagePlan")
);
const Checkout = lazy(() => import("./pages/Dashboard/Checkout/Checkout"));
const PaymentResponse = lazy(
  () =>
    import("./pages/Dashboard/Checkout/pages/PaymentResponse/PaymentResponse")
);
const Receipt = lazy(
  () => import("./pages/Dashboard/Checkout/pages/Receipt/Receipt")
);
const Profile = lazy(
  () => import("./pages/Dashboard/Profile/BasicInfo/BasicInfo")
);
const MyPackage = lazy(() => import("./pages/Dashboard/MyPackages/MyPackages"));
const PackageListing = lazy(
  () => import("./pages/Dashboard/MyPackages/pages/Packages/Packages")
);
const PackageDetails = lazy(
  () => import("./pages/Dashboard/MyPackages/pages/Details/Details")
);
const PackageHistory = lazy(
  () => import("./pages/Dashboard/MyPackages/pages/History/History")
);

const NonAuth = lazy(() => import("./pages/NonAuth/NonAuth"));
const CryptoNews = lazy(() => import("./pages/CryptoNews/CryptoNews"));
const Forex = lazy(() => import("./pages/Forex/CryptoNews"));
const AboutUs = lazy(() => import("./pages/AboutUs/AboutUs"));
const AffiliateMarketing = lazy(
  () => import("./pages/AffiliateMarketing/AffiliateMarketing")
);
const SignupForm = lazy(() => import("./pages/SignupForm/SignupFormPage"));
const TermsOfService = lazy(
  () => import("./pages/TermsOfService/TermsOfService")
);

const ReferalProgram = lazy(
  () => import("./pages/ReferalProgram/ReferalProgram")
);
const HelpCenter = lazy(() => import("./pages/HelpCenter/HelpCenter"));
const QustionInfo = lazy(() => import("./pages/QustionInfo/QustionInfo"));
const TicketDetails = lazy(() => import("./pages/TicketDetails/TicketDetails"));
const TopGainer = lazy(() => import("./pages/TopGainer/TopGainer"));
const AISignalReport = lazy(
  () => import("./pages/AISignalReport/AISignalReport")
);
const CreateTicket = lazy(
  () => import("./pages/CreateSupportTickets/CreateSupportTickets")
);

const router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <NonAuth />
      </Suspense>
    ),
    children: [
      {
        path: routers.trade,
        element: (
          <Suspense fallback={<Loading />}>
            <Trading />
          </Suspense>
        ),
      },
      {
        path: routers.blogs,
        element: (
          <Suspense fallback={<Loading />}>
            <BlogsListing />
          </Suspense>
        ),
      },
      {
        path: routers.announcements,
        element: (
          <Suspense fallback={<Loading />}>
            <Announcements />
          </Suspense>
        ),
      },
      {
        path: routers.blogDetails,
        element: (
          <Suspense fallback={<Loading />}>
            <BlogDetails />
          </Suspense>
        ),
      },
      {
        path: routers.announceDetails,
        element: (
          <Suspense fallback={<Loading />}>
            <AnnouncementDetails />
          </Suspense>
        ),
      },

      {
        path: routers.academy,
        element: (
          <Suspense fallback={<Loading />}>
            <Academy />
          </Suspense>
        ),
      },
      {
        path: "crypto-news",
        element: (
          <Suspense fallback={<Loading />}>
            <CryptoNews />
          </Suspense>
        ),
      },
      {
        path: routers.aboutUs,
        element: (
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: routers.affiliateMarketing,
        element: (
          <Suspense fallback={<Loading />}>
            <AffiliateMarketing />
          </Suspense>
        ),
      },
      {
        path: routers.referal,
        element: (
          <Suspense fallback={<Loading />}>
            <SignupForm />
          </Suspense>
        ),
      },
      {
        path: routers.termsOfService,
        element: (
          <Suspense fallback={<Loading />}>
            <TermsOfService />
          </Suspense>
        ),
      },
      {
        path: routers.referalProgram,
        element: (
          <Suspense fallback={<Loading />}>
            <ReferalProgram />
          </Suspense>
        ),
      },
      {
        path: routers.helpCenter,
        element: (
          <Suspense fallback={<Loading />}>
            <HelpCenter />
          </Suspense>
        ),
      },
      {
        path: routers.QuestionInfo,
        element: (
          <Suspense fallback={<Loading />}>
            <QustionInfo />
          </Suspense>
        ),
      },
      {
        path: routers.TicketInfo,
        element: (
          <Suspense fallback={<Loading />}>
            <TicketDetails />
          </Suspense>
        ),
      },
      {
        path: routers.topGainer,
        element: (
          <Suspense fallback={<Loading />}>
            <TopGainer />
          </Suspense>
        ),
      },
      {
        path: routers.aiSignalReport,
        element: (
          <Suspense fallback={<Loading />}>
            <AISignalReport />
          </Suspense>
        ),
      },

      {
        path: routers.brokerPage,
        element: (
          <Suspense fallback={<Loading />}>
            <Broker />
          </Suspense>
        ),
      },
      {
        path: routers.forex,
        element: (
          <Suspense fallback={<Loading />}>
            <Forex />
          </Suspense>
        ),
      },
      {
        path: routers.createTicket,
        element: (
          <Suspense fallback={<Loading />}>
            <CreateTicket />
          </Suspense>
        ),
      },
      {
        path: routers.tickets,
        element: (
          <Suspense fallback={<Loading />}>
            <SupportTicketList />
          </Suspense>
        ),
      },
      {
        path: routers.ticketDetails,
        element: (
          <Suspense fallback={<Loading />}>
            <SupportTicketDetails />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "",
    element: (
      <Suspense fallback={<Loading />}>
        <Authentication />
      </Suspense>
    ),
    children: [
      {
        path: "login",
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
        path: "verify",
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
        path: "profile",
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },
      {
        path: "package",
        element: (
          <Suspense fallback={<Loading />}>
            <MyPackage />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Loading />}>
                <PackageListing />
              </Suspense>
            ),
          },
          {
            path: "detail/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <PackageDetails />
              </Suspense>
            ),
          },
          {
            path: "history",
            element: (
              <Suspense fallback={<Loading />}>
                <PackageHistory />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "overview",
        element: (
          <Suspense fallback={<Loading />}>
            <Overview />
          </Suspense>
        ),
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <Discover />
          </Suspense>
        ),
      },
      {
        path: "autotrade",
        element: (
          <Suspense fallback={<Loading />}>
            <Packages />
          </Suspense>
        ),
      },
      {
        path: "/autotrade/plan/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <PackagePlan />
          </Suspense>
        ),
      },
      {
        path: "/checkout/:type/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: "payment-status/:id/:id2",
        element: (
          <Suspense fallback={<Loading />}>
            <PaymentResponse />
          </Suspense>
        ),
      },
      {
        path: "receipt/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <Receipt />
          </Suspense>
        ),
      },
      {
        path: routers.participationAgreement,
        element: (
          <Suspense fallback={<Loading />}>
            <ParticipationAgreement />
          </Suspense>
        ),
      },
      {
        path: routers.aiSignal,
        element: (
          <Suspense fallback={<Loading />}>
            <FilterProvider>
              <AISignals />
            </FilterProvider>
          </Suspense>
        ),
      },
      {
        path: routers.projects,
        element: (
          <Suspense fallback={<Loading />}>
            <Projects />
          </Suspense>
        ),
      },
      {
        path: routers.watchlist,
        element: (
          <Suspense fallback={<Loading />}>
            <HasWatchList />
          </Suspense>
        ),
      },
      {
        path: routers.projectDetails,
        element: (
          <Suspense fallback={<Loading />}>
            <ProjectDetails />
          </Suspense>
        ),
      },
      {
        path: routers.aiSignalWatchList,
        element: (
          <Suspense fallback={<Loading />}>
            <AIWatchlist />
          </Suspense>
        ),
      },
      {
        path: routers.dexGemPicks,
        element: (
          <Suspense fallback={<Loading />}>
            <DexGemPicks />
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
