"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AppTabs from "@/components/ui/tabs/AppTabs";
import UserTab from "./components/UserTab";
import RoleTab from "./components/RoleTab";
import UserForm from "./components/UserForm";
import RoleForm from "./components/RoleForm";
import { UserOutlined, SafetyOutlined } from "@ant-design/icons";
import { useEffect, useState, useMemo, useCallback } from "react";
import { fetchUserManagementCounts } from "@/services/user-management.service";

import { useUserManagementTable } from "@/hooks/user-management/useUserManagementTable";
import { useUserManagementAction } from "@/hooks/user-management/useUserManagementAction";
import { useRoleManagementTable } from "@/hooks/user-management/useRoleManagementTable";
import { useRoleManagementAction } from "@/hooks/user-management/useRoleManagementAction";

import { TabItemConfig } from "@/components/ui/tabs/types";

export default function HomeUserManagement() {
  const userTable = useUserManagementTable();
  const roleTable = useRoleManagementTable();

  const [counts, setCounts] = useState({
    user: 0,
    role: 0,
  });

  // 🔥 memo biar gak berubah2
  const loadCounts = useCallback(async () => {
    try {
      const res = await fetchUserManagementCounts();
      setCounts({
        user: res.user ?? 0,
        role: res.role ?? 0,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadCounts();
  }, [loadCounts]);

  /**
   * USER
   */
  const { handleCreate, handleUpdate, handleDelete } = useUserManagementAction(
    async (newUser) => {
      userTable.prependData(newUser);
      await loadCounts();
    },
    (updatedUser) => {
      userTable.updateData?.(updatedUser);
    },
  );

  const handleDeleteWrapperUser = useCallback(
    async (id: number) => {
      const success = await handleDelete(id);
      if (success) await loadCounts();
    },
    [handleDelete, loadCounts],
  );

  const handleReloadUser = useCallback(async () => {
    await Promise.all([userTable.fetchData(), loadCounts()]);
  }, [userTable, loadCounts]);

  /**
   * ROLE
   */
  const { handleCreateRole, handleUpdateRole, handleDeleteRole } =
    useRoleManagementAction(
      async (newRole) => {
        roleTable.prependData(newRole);
        await loadCounts();
      },
      (updatedRole) => {
        roleTable.updateData?.(updatedRole);
      },
    );

  const handleDeleteWrapperRole = useCallback(
    async (id: number) => {
      const success = await handleDeleteRole(id);
      if (success) await loadCounts();
    },
    [handleDeleteRole, loadCounts],
  );

  const handleReloadRole = useCallback(async () => {
    await Promise.all([roleTable.fetchData(), loadCounts()]);
  }, [roleTable, loadCounts]);

  // 🔥 config dimemo → BIAR GAK RE-RENDER TERUS
  const userManagementConfig: TabItemConfig[] = useMemo(
    () => [
      {
        key: "user",
        label: "User",
        icon: <UserOutlined />,
        badge: counts.user,

        module: {
          table: userTable,
          handleDeleteWrapper: handleDeleteWrapperUser,
          handleReload: handleReloadUser,
          handleCreate,
          handleUpdate,
        },

        Table: UserTab,
        Form: UserForm,

        showAction: true,
        actionLabel: "Add User",
        actionType: "modal",
      },
      {
        key: "role",
        label: "Role",
        icon: <SafetyOutlined />,
        badge: counts.role,

        module: {
          table: roleTable,
          handleDeleteWrapper: handleDeleteWrapperRole,
          handleReload: handleReloadRole,
          handleCreate: handleCreateRole,
          handleUpdate: handleUpdateRole,
        },

        Table: RoleTab,
        Form: RoleForm,

        showAction: true,
        actionLabel: "Add Role",
        actionType: "modal",
      },
    ],
    [
      counts,
      userTable,
      roleTable,
      handleDeleteWrapperUser,
      handleReloadUser,
      handleDeleteWrapperRole,
      handleReloadRole,
      handleCreate,
      handleUpdate,
      handleCreateRole,
      handleUpdateRole,
    ],
  );

  return (
    <ComponentCard
      title="User & Role Management"
      desc="Pengaturan hak akses fitur aplikasi berdasarkan role"
    >
      <AppTabs defaultActiveKey="user" items={userManagementConfig} />
    </ComponentCard>
  );
}
