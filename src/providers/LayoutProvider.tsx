"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import { Popover, message } from "antd";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "@/redux/userSlice";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isPrivatePage =
    pathname !== "/auth/login" && pathname !== "/auth/register";

  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isPrivatePage) {
      getCurrentUser();
    }
  }, [isPrivatePage, pathname]);

  const onLogout = async () => {
    try {
      setIsLoading(true);
      await axios.get("/api/auth/logout");
      message.success("Logout Successfully");
      router.push("/auth/login");
    } catch (error: any) {
      message.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const content = (
    <div className="flex flex-col gap-2 p-2">
      <div
        className="flex gap-5 items-center cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        <i className="ri-shield-user-line text-lg"></i>
        <span>Profile</span>
      </div>
      <div
        className="flex gap-5 items-center cursor-pointer"
        onClick={() => onLogout()}
      >
        <i className="ri-logout-box-r-line text-lg"></i>
        <span>Logout</span>
      </div>
    </div>
  );
  return (
    <div>
      {isLoading && <Loader />}
      {isPrivatePage && currentUser && (
        <>
          <div className="bg-primary p-3 flex justify-between items-center">
            <div className="flex">
              <h1 className="text-2xl font-bold text-red-500">Shey</h1>
              <h1 className="text-2xl font-bold text-yellow-500">Shop</h1>
            </div>
            <div className="flex gap-5 items-center">
              <i className="ri-shopping-cart-line text-white text-2xl"></i>
              <Popover content={content} trigger="click">
                <div className="flex h-8 w-8 bg-white p-2 rounded-full items-center justify-center cursor-pointer">
                  <span>{currentUser.name[0]}</span>
                </div>
              </Popover>
            </div>
          </div>
          {children}
        </>
      )}
      {!isPrivatePage && children}
    </div>
  );
}

export default LayoutProvider;
