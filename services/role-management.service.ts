import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchTableData(params: Record<string, any> = {}) {
  const res = await api.get(`${API_URL}/pengaturan/role-management`, {
    params,
  });

  return res.data;
}

export async function createRole(data: any) {
  const res = await api.post(
    `${API_URL}/pengaturan/role-management/create`,
    data,
  );
  return res.data.data;
}

export async function updateRole(id: number, data: any) {
  const res = await api.put(
    `${API_URL}/pengaturan/role-management/update/${id}`,
    data,
  );
  return res.data;
}

export async function deleteRole(id: number) {
  const res = await api.delete(
    `${API_URL}/pengaturan/role-management/delete/${id}`,
  );
  return res.data;
}
