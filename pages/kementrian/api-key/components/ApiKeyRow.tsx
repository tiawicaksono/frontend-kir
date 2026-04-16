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
import { useApiKeyDropdown } from "../hook/useApiKeyDropdown";
import { useApiKeyActions } from "../hook/useApiKeyAction";

const bodyCellClass =
  "text-start py-3 text-gray-500 text-theme-sm dark:text-gray-400";

interface Props {
  item: ApiKeys;
  dropdown: ReturnType<typeof useApiKeyDropdown>;
  actions: ReturnType<typeof useApiKeyActions>;
  onEdit: (item: ApiKeys) => void;
}

export default function ApiKeyRow({ item, dropdown, actions, onEdit }: Props) {
  const isLoading = actions.loadingId === item.id;
  const isDeleting = actions.loadingDeleteId === item.id;

  return (
    <TableRow className={isLoading ? "opacity-50 pointer-events-none" : ""}>
      <TableCell className={bodyCellClass}>
        <div className="mb-2">{item.name}</div>
        <ApiKeyField value={item.token} />
      </TableCell>

      <TableCell className={bodyCellClass}>
        {item.urlApi.slice(0, 26)}********{item.urlApi.slice(-4)}
      </TableCell>

      {/* <TableCell className={bodyCellClass}>
        <DateText value={item.createdAt} withTime />
      </TableCell>

      <TableCell className={bodyCellClass}>
        <DateText value={item.updatedAt} withTime />
      </TableCell> */}

      <TableCell className={bodyCellClass}>
        <div className="flex items-center gap-2">
          <ToggleSwitch
            checked={item.isActive}
            disabled={isLoading}
            onChange={(value) => actions.handleToggle(item.id, value)}
          />

          {isLoading && (
            <div className="h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
          )}
        </div>
      </TableCell>

      <TableCell className={bodyCellClass}>
        <div className="flex items-center gap-2">
          <EditIcon
            onClick={() => onEdit(item)}
            className="text-gray-400 cursor-pointer size-4.5"
          />
          <TrashIcon
            onClick={async () => await actions.handleDelete(item.id)}
            className="text-red-500 cursor-pointer size-4.5"
          />
        </div>
        {/* <div className="relative inline-block">
          <button
            onClick={() => dropdown.toggleDropdown(item.id)}
            disabled={isDeleting}
            className="dropdown-toggle p-1 rounded-md hover:bg-gray-100"
          >
            {isDeleting ? (
              <div className="h-4 w-4 animate-spin rounded-full border border-gray-400 border-t-transparent" />
            ) : (
              <MoreHorizontalIcon className="text-gray-400" />
            )}
          </button>

          <Dropdown
            isOpen={dropdown.openId === item.id}
            onClose={dropdown.closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem onItemClick={dropdown.closeDropdown}>
              View
            </DropdownItem>

            <DropdownItem
              onItemClick={async () => {
                dropdown.closeDropdown();
                await actions.handleDelete(item.id);
              }}
              className="text-red-500"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div> */}
      </TableCell>
    </TableRow>
  );
}
