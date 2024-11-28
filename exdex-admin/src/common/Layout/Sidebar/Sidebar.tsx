import { useEffect, useState } from "react";
import { routes } from "../../../constants/routes";
import { getPermissions } from "../../../services/permission";
import Menu from "../../Components/Menu/Menu";
import classes from "./Sidebar.module.scss";
import { useSelector } from "react-redux";
import { selectPermissions } from "../../../store/authSlice";

const Sidebar = () => {
  const [filteredMenuItems, setFilteredMenuItems] = useState<any>([]);
  const userPermissions = useSelector(selectPermissions);
  const [menuItems, setMenuItems] = useState([
    {
      name: "Overview",
      url: "/overview",
      active: false,
      icon: "/assets/images/sidebar/overview.png",
      iconHover: "/assets/images/sidebar/overviewHover.png",
      permissionId: 1,
      permissionName: "overview",
    },
    {
      name: "User",
      url: "/user",
      active: false,
      icon: "/assets/images/sidebar/user.png",
      iconHover: "/assets/images/sidebar/userHover.png",
      permissionId: 2,
      permissionName: "user",
    },
    {
      name: "Influencer",
      url: routes.influencers,
      active: false,
      icon: "/assets/images/sidebar/user.png",
      iconHover: "/assets/images/sidebar/userHover.png",
      permissionId: 3,
      permissionName: "influencer",
    },
    {
      name: "Permission",
      url: "/permission",
      active: false,
      icon: "/assets/images/sidebar/permission.png",
      iconHover: "/assets/images/sidebar/permissionHover.png",
      permissionId: 4,
      permissionName: "permission",
    },
    {
      name: "Finance",
      url: "/finance",
      active: false,
      icon: "/assets/images/sidebar/finance.png",
      iconHover: "/assets/images/sidebar/financeHover.png",
      permissionId: 5,
      permissionName: "finance",
    },
    {
      name: "Support",
      url: routes.helpCenter,
      active: false,
      icon: "/assets/images/sidebar/support.png",
      iconHover: "/assets/images/sidebar/supportHover.png",
      permissionId: 6,
      permissionName: "support",
    },
    {
      name: "Tickets",
      url: routes.tickets,
      active: false,
      icon: "/assets/images/sidebar/support.png",
      iconHover: "/assets/images/sidebar/supportHover.png",
      permissionId: 7,
      permissionName: "tickets",
    },
    {
      name: "ROI",
      url: "/percent",
      active: false,
      icon: "/assets/images/sidebar/discount.png",
      iconHover: "/assets/images/sidebar/discountHover.png",
      permissionId: 8,
      permissionName: "roi",
    },
    {
      name: "Blog",
      url: routes.blogListing,
      permissionId :9,
      active: true,
      icon: "/assets/images/sidebar/dex.png",
      iconHover: "/assets/images/sidebar/dexHover.png",
    },
    {
      name: "Announcement",
      url: routes.announcement,
      permissionId :10,
      active: true,
      icon: "/assets/images/sidebar/dex.png",
      iconHover: "/assets/images/sidebar/dexHover.png",
    },
    {
      name: "Academy",
      url: "/academy",
      active: false,
      icon: "/assets/images/sidebar/academy.png",
      iconHover: "/assets/images/sidebar/academyHover.png",
    },
    {
      name: "Prup Trading",
      url: "/prup",
      active: false,
      icon: "/assets/images/sidebar/prup.png",
      iconHover: "/assets/images/sidebar/prupHover.png",
    },

    {
      name: "AI Signal",
      url: "/signal",
      active: false,
      icon: "/assets/images/sidebar/ai.png",
      iconHover: "/assets/images/sidebar/aiHover.png",
    },
 
    {
      name: "Refund",
      url: "/refund",
      active: false,
      icon: "/assets/images/sidebar/refund.png",
      iconHover: "/assets/images/sidebar/refundHover.png",
    },
    {
      name: "Discount",
      url: "/discount",
      active: false,
      icon: "/assets/images/sidebar/discount.png",
      iconHover: "/assets/images/sidebar/discountHover.png",
    },
    {
      name: "Segment",
      url: "/segment",
      active: false,
      icon: "/assets/images/sidebar/segment.png",
      iconHover: "/assets/images/sidebar/segmentHover.png",
    },
    {
      name: "Insights",
      url: "/insight",
      active: false,
      icon: "/assets/images/sidebar/insights.png",
      iconHover: "/assets/images/sidebar/insightsHover.png",
    },
    {
      name: "Commission",
      url: "/commission",
      active: false,
      icon: "/assets/images/sidebar/commission.png",
      iconHover: "/assets/images/sidebar/commissionHover.png",
    },
  ]);

  useEffect(() => {
    console.log(userPermissions);
    if (userPermissions.length) {
      getPermissionsMethod();
    }
  }, [userPermissions]);

  const filterMenuItems = (apiPermissions: any) => {
    // Combine permissions from Redux store and API
    const permissionIds: any = userPermissions || []; // From Redux store
    const permissionNames = apiPermissions.map((p: any) => p.name);

    // Filter menu items based on both permission IDs and names
    const filtered = menuItems.filter((item: any) => {
      return permissionIds.includes(item.permissionId);
    });

    setFilteredMenuItems(filtered);
  };

  const getPermissionsMethod = async () => {
    try {
      const response = await getPermissions();
      // let response = {
      //   code: 200,
      //   status: true,
      //   data: {
      //     administrative_permissions: [
      //       {
      //         id: 1,
      //         name: "overview",
      //         description: "Allows viewing of user details",
      //         display_name: "Overview",
      //         created_at: "2024-11-02T15:24:58.504047Z",
      //         updated_at: "2024-11-02T15:24:58.504047Z",
      //       },
      //       {
      //         id: 2,
      //         name: "user",
      //         description: "Allows access to user details and management",
      //         display_name: "User",
      //         created_at: "2024-11-02T15:24:58.506891Z",
      //         updated_at: "2024-11-02T15:24:58.506891Z",
      //       },
      //       {
      //         id: 3,
      //         name: "influencer",
      //         description: "Allows access to influencer settings",
      //         display_name: "Influencer",
      //         created_at: "2024-11-02T15:24:58.509165Z",
      //         updated_at: "2024-11-02T15:24:58.509165Z",
      //       },
      //       {
      //         id: 4,
      //         name: "permission",
      //         description: "Allows management of permissions",
      //         display_name: "Permission",
      //         created_at: "2024-11-02T15:24:58.511396Z",
      //         updated_at: "2024-11-02T15:24:58.511396Z",
      //       },
      //       {
      //         id: 5,
      //         name: "finance",
      //         description: "Allows access to finance and billing",
      //         display_name: "Finance",
      //         created_at: "2024-11-02T15:24:58.513616Z",
      //         updated_at: "2024-11-02T15:24:58.513616Z",
      //       },
      //       {
      //         id: 6,
      //         name: "support",
      //         description: "Allows access to support system",
      //         display_name: "Support",
      //         created_at: "2024-11-02T15:24:58.515818Z",
      //         updated_at: "2024-11-02T15:24:58.515818Z",
      //       },
      //       {
      //         id: 7,
      //         name: "tickets",
      //         description: "Allows access to tickets management",
      //         display_name: "Tickets",
      //         created_at: "2024-11-02T15:24:58.518203Z",
      //         updated_at: "2024-11-02T15:24:58.518203Z",
      //       },
      //       {
      //         id: 8,
      //         name: "roi",
      //         description: "Allows access to return on investment metrics",
      //         display_name: "ROI",
      //         created_at: "2024-11-02T15:24:58.520393Z",
      //         updated_at: "2024-11-02T15:24:58.520393Z",
      //       },
      //     ],
      //     finance_permissions: [],
      //   },
      // };
      if (response.status) {
        if (response.data?.administrative_permissions) {
          filterMenuItems(response.data.administrative_permissions);
        }
      } else {
        console.error("Response status is false");
      }
    } catch (err) {
      console.error("Error fetching binary data:", err);
    } finally {
    }
  };

  return (
    <div className={classes.sideBar}>
      <Menu menu={filteredMenuItems} />
    </div>
  );
};

export default Sidebar;
