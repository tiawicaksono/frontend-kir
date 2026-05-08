import {
  DeleteIcon,
  EditIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import ApiKeyField from "@/pages/kementrian/api-key/components/ApiKeyField";
import DateText from "@/components/common/DateText";
import ToggleSwitch from "@/components/form/switch/ToggleSwitch";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";
import { ApiKeys } from "@/types/api-keys.type";
import { useApiKeyDropdown } from "@/hooks/api-key/useApiKeyDropdown";
import { useApiKeyActions } from "@/hooks/api-key/useApiKeyAction";

const bodyCellClass =
  "text-start py-3 text-gray-500 text-theme-sm dark:text-gray-400";

interface Props {
  item: ApiKeys;
  dropdown: ReturnType<typeof useApiKeyDropdown>;
  actions: ReturnType<typeof useApiKeyActions>;
  onEdit: (item: ApiKeys) => void;
}

export default function ApiKeyRow({ item, dropdown, actions, onEdit }: Props) {
  // 🔥 guard semua dependency
  if (!item || !actions || !dropdown) return null;

  const isLoading = actions?.loadingId === item?.id;
  const isDeleting = actions?.loadingDeleteId === item?.id;

  return (
    <TableRow className={isLoading ? "opacity-50 pointer-events-none" : ""}>
      <TableCell className={bodyCellClass}>
        <div className="mb-2">{item?.name ?? "-"}</div>
        <ApiKeyField value={item?.token ?? ""} />
      </TableCell>

      <TableCell className={bodyCellClass}>
        {item?.urlApi
          ? `${item.urlApi.slice(0, 26)}********${item.urlApi.slice(-4)}`
          : "-"}
      </TableCell>

      <TableCell className={bodyCellClass}>
        <div className="flex items-center gap-2">
          <ToggleSwitch
            checked={!!item?.isActive}
            disabled={isLoading}
            onChange={(value) => actions?.handleToggle?.(item.id, value)}
          />

          {isLoading && (
            <div className="h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
          )}
        </div>
      </TableCell>

      <TableCell className={bodyCellClass}>
        <div className="flex items-center gap-2">
          <EditIcon
            onClick={() => onEdit?.(item)}
            className="text-gray-400 cursor-pointer size-4.5"
          />

          <TrashIcon
            onClick={async () => actions?.handleDelete?.(item.id)}
            className="text-red-500 cursor-pointer size-4.5"
          />
        </div>
      </TableCell>
    </TableRow>
  );
}
