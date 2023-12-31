"use client";
import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import CategoriesList from "./components/CategoriesList";
import { useRouter, useSearchParams } from "next/navigation";
import ProductList from "./components/ProductList";
function Profile() {
  const { currentUser } = useSelector((state: any) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || 1;
  const [selectedTab, setSelectedTab] = React.useState(id);
  return (
    <div>
      {currentUser.isAdmin && (
        <Tabs
          defaultActiveKey="1"
          onChange={(key) => {
            router.push(`/profile?id=${key}`);
            setSelectedTab(key);
          }}
          activeKey={selectedTab}
        >
          <Tabs.TabPane tab="Products" key="1">
            <ProductList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Categories" key="2">
            <CategoriesList />
          </Tabs.TabPane>
          <Tabs.TabPane tab=" Orders" key="3">
            Orders
          </Tabs.TabPane>
          <Tabs.TabPane tab=" Users" key="4">
            Users
          </Tabs.TabPane>
        </Tabs>
      )}
      {!currentUser.isAdmin && (
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Products" key="1">
            Orders
          </Tabs.TabPane>
          <Tabs.TabPane tab="Personal Information" key="2">
            Personal Information
          </Tabs.TabPane>
        </Tabs>
      )}
    </div>
  );
}

export default Profile;
