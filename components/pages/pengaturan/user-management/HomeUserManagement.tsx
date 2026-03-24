"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import UserTab from "./components/UserTab";
import RoleTab from "./components/RoleTab";
import UserForm from "./components/UserForm";
import RoleForm from "./components/RoleForm";
import { UserOutlined, SafetyOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { fetchUserManagementCounts } from "@/services/user-management.service";

import { useUserManagementTable } from "./hook/useUserManagementTable";
import { useUserManagementAction } from "./hook/useUserManagementAction";

export default function HomeUserManagement() {
  const userTable = useUserManagementTable();

  const [counts, setCounts] = useState({
    user: 0,
    role: 0,
  });

  const loadCounts = async () => {
    try {
      const res = await fetchUserManagementCounts();
      setCounts({
        user: res.user ?? 0,
        role: res.role ?? 0,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadCounts();
  }, []);

  // 🔥 FIX INTI DI SINI
  const { handleCreate } = useUserManagementAction((newUser) => {
    // console.log("INJECT KE TABLE:", newUser);

    userTable.prependData(newUser); // ✅ langsung ke table

    setCounts((prev) => ({
      ...prev,
      user: prev.user + 1,
    }));
  });

  return (
    <ComponentCard title="User Management">
      <AppTabs
        defaultActiveKey="user"
        items={[
          {
            key: "user",
            label: (
              <>
                <UserOutlined /> User
              </>
            ),
            badgeCount: counts.user,
            children: <UserTab table={userTable} />,
            showAction: true,
            actionLabel: "Add User",
            renderForm: (close) => (
              <UserForm onSubmit={handleCreate} onSuccess={close} />
            ),
          },
          {
            key: "role",
            label: (
              <>
                <SafetyOutlined /> Role
              </>
            ),
            badgeCount: counts.role,
            children: <RoleTab />,
            showAction: true,
            actionLabel: "Add Role",
            renderForm: (close) => <RoleForm onSuccess={close} />,
          },
        ]}
      />
    </ComponentCard>
  );
}
