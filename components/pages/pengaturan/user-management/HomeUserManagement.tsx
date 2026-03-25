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
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
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

  const { handleCreate, handleUpdate } = useUserManagementAction(
    (newUser) => {
      userTable.prependData(newUser);

      setCounts((prev) => ({
        ...prev,
        user: prev.user + 1,
      }));
    },
    (updatedUser) => {
      userTable.updateData?.(updatedUser);
    },
  );

  const handleEdit = (record: any) => {
    setSelectedUser(record);
    setIsEditOpen(true);
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
              <UserTab table={userTable} onEdit={openEdit} />
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
