import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";
import AntrianUjiTable from "@/components/antrian-uji/AntrianUjiTable";

export default function Page() {
  return (
    <div>
      <AutoBreadcrumb />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <AntrianUjiTable />
        </div>
      </div>
    </div>
  );
}
