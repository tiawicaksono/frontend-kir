import api from "@/services/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type RollingAlatItem = {
  key: number;
  title: string;
  direction: "left" | "right";
  gedung_uji: number;

  prauji: boolean;
  emisi: boolean;
  lampu: boolean;
  pitlift: boolean;
  rem: boolean;
};

// =========================
// GET DATA
// =========================
export async function getRollingAlatFull(from: number, to: number) {
  const res = await api.get(`${API_URL}/pengaturan/rolling-alat`, {
    params: { from, to },
  });
  return res.data;
}

export async function getRollingAlatByGedung(gedung: number) {
  const res = await api.get(`${API_URL}/pengaturan/rolling-alat`, {
    params: { gedung_uji: gedung },
  });
  return res.data;
}

// =========================
// SAVE DATA
// =========================
export async function saveRollingAlat(data: RollingAlatItem[]) {
  const res = await api.post(`${API_URL}/pengaturan/rolling-alat`, {
    data: data.map((item) => ({
      user_id: item.key,
      gedung_uji: item.gedung_uji,
      prauji: item.prauji,
      emisi: item.emisi,
      lampu: item.lampu,
      pitlift: item.pitlift,
      rem: item.rem,
    })),
  });

  return res.data;
}
