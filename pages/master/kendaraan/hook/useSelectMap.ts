export function useSelectMap({
  current,
  merk,
  wilayah,
  jenisKendaraan,
  bahanUtama,
  kelasJalan,
  konsumbu,
  bahanBakar,
}: any) {
  const map: Record<string, any> = {
    merk_id: {
      options: merk.merk,
      loading: merk.loadingMerk,
      onChange: merk.onChangeMerk,
    },
    varian_merk_id: {
      options: merk.varianMerk,
      loading: merk.loadingVarianMerk,
      onChange: merk.onChangeVarianMerk,
    },
    tipe_varian_merk_id: {
      options: merk.tipeVarianMerk,
      loading: merk.loadingTipeVarianMerk,
    },

    jenis_kendaraan_id: {
      options: jenisKendaraan.jenisKendaraan,
      loading: jenisKendaraan.loadingJenisKendaraan,
      onChange: jenisKendaraan.onChangeJenisKendaraan,
    },
    sub_jenis_kendaraan_id: {
      options: jenisKendaraan.subJenisKendaraan,
      loading: jenisKendaraan.loadingSubJenisKendaraan,
    },

    provinsi_id: {
      options: wilayah.provinsi,
      loading: wilayah.loadingProvinsi,
      onChange: wilayah.onChangeProvinsi,
    },
    kota_id: {
      options: wilayah.kota,
      loading: wilayah.loadingKota,
      onChange: wilayah.onChangeKota,
    },
    kecamatan_id: {
      options: wilayah.kecamatan,
      loading: wilayah.loadingKecamatan,
      onChange: wilayah.onChangeKecamatan,
    },
    kelurahan_id: {
      options: wilayah.kelurahan,
      loading: wilayah.loadingKelurahan,
    },

    bahan_utama_id: {
      options: bahanUtama.bahanUtama,
      loading: bahanUtama.loadingBahanUtama,
    },
  };

  if (current === 1) {
    map.konfigurasi_sumbu_id = {
      options: konsumbu.konfigurasiSumbu,
      loading: konsumbu.loadingKonfigurasiSumbu,
    };

    map.kelas_jalan_id = {
      options: kelasJalan.kelasJalan,
      loading: kelasJalan.loadingKelasJalan,
    };

    map.bahan_bakar_id = {
      options: bahanBakar.bahanBakar,
      loading: bahanBakar.loadingBahanBakar,
    };
  }

  return map;
}
