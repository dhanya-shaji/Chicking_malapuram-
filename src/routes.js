import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Order from "views/Order.js";
import Step2 from "views/Step2.js";
import Step3 from "views/Step3.js";
import Step4 from "views/Step4.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";

import Outlets from "Container/Outlets/Outlets"
import Category from "Container/Category/Category"
import Menu from "Container/Menu/Menu"
import Staff from "Container/Staff/Staff"
import Index from "Container/NewOrder/Index"
import OrderDetails from "Container/Orders/OrderDetails";
var routes = [
  {
  path: "/dashboard",
  name: "Dashboard",
  icon: "nc-icon nc-bank",
  component: Dashboard,
  layout: "/portal",
},
/*{
  path: "/order",
  name: "New Order",
  icon: "nc-icon nc-cart-simple",
  component: Step4,
  layout: "/portal",
},
{
  path: "/icons",
  name: "Orders",
  icon: "nc-icon nc-cart-simple",
  component: Icons,
  layout: "/portal",
},*/
{
  path: "/orders",
  name: "New Orders",
  icon: "nc-icon nc-cart-simple",
  component: Index,
  layout: "/portal",
},
{
  path: "/Staff",
  name: "Staff",
  icon: "nc-icon nc-single-02",
  component: Staff,
  layout: "/portal",
},
{
  path: "/Menu",
  name: "Menu",
  icon: "nc-icon nc-single-copy-04",
  component: Menu,
  layout: "/portal",
},
{
  path: "/Category",
  name: "Category",
  icon: "nc-icon nc-bullet-list-67",
  component: Category,
  layout: "/portal",
},
{
  path: "/outlets",
  name: "Outlets",
  icon: "nc-icon nc-shop",
  component: Outlets,
  layout: "/portal",
},
{
  path: "/order-details",
  name: "Order Details",
  icon: "nc-icon nc-shop",
  component: OrderDetails,
  layout: "/portal",
},
/*{
  path: "/user-page",
  name: "User Profile",
  icon: "nc-icon nc-single-02",
  component: UserPage,
  layout: "/portal",
},*/
];
export default routes;