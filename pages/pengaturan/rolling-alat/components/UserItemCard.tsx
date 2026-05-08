import { RollingAlatItem } from "@/services/rolling-alat.service";
import { Checkbox } from "antd";

type Props = {
  item?: RollingAlatItem; // 🔥 dibuat optional biar aman saat prerender
  onCheckboxChange: (
    key: number,
    field: keyof Omit<
      RollingAlatItem,
      "key" | "title" | "direction" | "gedung_uji"
    >,
    value: boolean,
  ) => void;
};

export default function UserItemCard({ item, onCheckboxChange }: Props) {
  // 🔥 guard utama biar tidak crash saat undefined
  if (!item) return null;

  return (
    <div className="flex flex-col w-full">
      <span className="font-semibold mb-1">{item.title ?? "-"}</span>

      <div className="flex items-center gap-3 flex-nowrap">
        <Checkbox
          checked={!!item.prauji}
          onChange={(e) =>
            onCheckboxChange(item.key, "prauji", e.target.checked)
          }
        >
          Prauji
        </Checkbox>

        <Checkbox
          checked={!!item.emisi}
          onChange={(e) =>
            onCheckboxChange(item.key, "emisi", e.target.checked)
          }
        >
          Emisi
        </Checkbox>

        <Checkbox
          checked={!!item.lampu}
          onChange={(e) =>
            onCheckboxChange(item.key, "lampu", e.target.checked)
          }
        >
          Lampu
        </Checkbox>

        <Checkbox
          checked={!!item.pitlift}
          onChange={(e) =>
            onCheckboxChange(item.key, "pitlift", e.target.checked)
          }
        >
          Pitlift
        </Checkbox>

        <Checkbox
          checked={!!item.rem}
          onChange={(e) => onCheckboxChange(item.key, "rem", e.target.checked)}
        >
          Rem
        </Checkbox>
      </div>
    </div>
  );
}
