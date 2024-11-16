import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  UserCircleIcon,
  ViewGridAddIcon,
} from "@heroicons/react/solid";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SettingNavigation from "../components/SettingNavigation";
import ChangePassword from "./ChangePassword";
import History from "../components/History";
import UserInfomation from "../components/UserInfomation";
import ChangeInfomation from "../components/ChangeInfomation";

const navigations = [
  {
    name: "Trang cá nhân",
    href: "#",
    icon: UserCircleIcon,
    component: ChangeInfomation,
  },
  { name: "Tài khoản", href: "#", icon: CogIcon, component: UserInfomation },
  { name: "Bảo mật", href: "#", icon: KeyIcon, component: ChangePassword },
  {
    name: "Lịch sử đặt tour",
    href: "#",
    icon: BellIcon,
    component: History,
  },
  {
    name: "Vé máy bay",
    href: "#",
    icon: CreditCardIcon,
    component: ChangePassword,
  },
  {
    name: "Khách sạn",
    href: "#",
    icon: ViewGridAddIcon,
    component: ChangePassword,
  },
];

const Setting = () => {
  const [searchParams] = useSearchParams();
  const [navActive, setNavActive] = useState(searchParams.get("nav") || 0);
  const Component = navigations[navActive].component;
  return (
    <main className="relative -mt-32">
      <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
            <SettingNavigation
              navigations={navigations}
              navActive={navActive}
              setNavActive={setNavActive}
            />
            <Component />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Setting;
