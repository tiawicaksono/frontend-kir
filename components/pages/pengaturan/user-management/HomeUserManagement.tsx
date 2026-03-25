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

  const { handleCreate, handleUpdate, handleDelete } = useUserManagementAction(
    async (newUser) => {
      userTable.prependData(newUser);

      await loadCounts(); // 🔥 real-time sync
    },
    (updatedUser) => {
      userTable.updateData?.(updatedUser);
    },
  );

  const handleDeleteWrapper = async (id: number) => {
    const success = await handleDelete(id);

    if (success) {
      await loadCounts(); // 🔥 real-time sync
    }
  };

  const handleReload = async () => {
    await Promise.all([
      userTable.fetchData(), // reload table
      loadCounts(), // 🔥 reload badge
    ]);
  };

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
            children: ({ openEdit }) => (
              <UserTab
                table={userTable}
                onEdit={openEdit}
                onDelete={handleDeleteWrapper}
                onReload={handleReload}
              />
            ),
            showAction: true,
            actionLabel: "Add User",
            renderForm: ({ close, mode, formData }) => (
              <UserForm
                mode={mode}
                initialValues={formData}
                onSubmit={mode === "create" ? handleCreate : handleUpdate}
                onSuccess={close}
              />
            ),
          },
          // {
          //   key: "role",
          //   label: (
          //     <>
          //       <SafetyOutlined /> Role
          //     </>
          //   ),
          //   badgeCount: counts.role,
          //   children: ({ openEdit }) => <RoleTab onEdit={openEdit} />,
          //   showAction: true,
          //   actionLabel: "Add Role",
          //   renderForm: ({ close, mode, formData }) => (
          //     <RoleForm
          //       mode={mode}
          //       initialValues={formData}
          //       onSubmit={mode === "create" ? handleCreate : handleUpdate}
          //       onSuccess={close}
          //     />
          //   ),
          // },
        ]}
      />
    </ComponentCard>
  );
}
