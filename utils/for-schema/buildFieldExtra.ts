export const buildFieldExtra = ({ field, values, selectMap, wilayah }: any) => {
  const extra = {
    ...(selectMap?.[field?.name] || {}),
  };

  // ====================================
  // SEARCH
  // ====================================

  if (field.name === "q") {
    return {
      onSearch: values?.handleSearch,
      loading: values?.searchLoading,
    };
  }

  // ====================================
  // WILAYAH
  // ====================================

  if (field?.name === "provinsi_id") {
    extra.options = wilayah?.provinsi;

    extra.onChange = wilayah?.onChangeProvinsi;

    extra.loading = wilayah?.loadingProvinsi;
  }

  if (field?.name === "kota_id") {
    extra.options = wilayah?.kota;

    extra.onChange = wilayah?.onChangeKota;

    extra.loading = wilayah?.loadingKota;

    extra.disabled = !values?.provinsi_id;
  }

  if (field?.name === "kecamatan_id") {
    extra.options = wilayah?.kecamatan;

    extra.onChange = wilayah?.onChangeKecamatan;

    extra.loading = wilayah?.loadingKecamatan;

    extra.disabled = !values?.kota_id;
  }

  if (field?.name === "kelurahan_id") {
    extra.options = wilayah?.kelurahan;

    extra.loading = wilayah?.loadingKelurahan;

    extra.disabled = !values?.kecamatan_id;
  }

  // ====================================
  // MERK
  // ====================================

  if (field?.name === "varian_merk_id") {
    extra.disabled = !values?.merk_id;
  }

  if (field?.name === "tipe_varian_merk_id") {
    extra.disabled = !values?.varian_merk_id;
  }

  // ====================================
  // JENIS KENDARAAN
  // ====================================

  if (field?.name === "sub_jenis_kendaraan_id") {
    extra.disabled = !values?.jenis_kendaraan_id;
  }

  return extra;
};
