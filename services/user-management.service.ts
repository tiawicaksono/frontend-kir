import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUserManagementCounts = async () => {
  const res = await api.get(`${API_URL}/pengaturan/user-management/counts`);
  return res.data;
};

export async function fetchTableData(params: Record<string, any> = {}) {
  const res = await api.get(`${API_URL}/pengaturan/user-management`, {
    params,
  });

  return res.data;
}

export async function createUser(data: any) {
  const res = await api.post(
    `${API_URL}/pengaturan/user-management/create`,
    data,
  );
  return res.data.data;
}

/**
 * ROLE
 */
export async function fetchRoles(params?: any) {
  const res = await api.get(`${API_URL}/pengaturan/role-management`, {
    params,
  });

  return res.data;
}
