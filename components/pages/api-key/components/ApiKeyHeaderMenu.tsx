import { MoreVerticalIcon } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/ui/dropdown";

interface Props {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onReload: () => void;
  onAdd: () => void;
}

const dropDownItem =
  "flex w-full text-sm text-gray-600 dark:text-gray-400 rounded-lg px-3 py-2 hover:bg-gray-100";
export default function ApiKeyHeaderMenu({
  isOpen,
  onToggle,
  onClose,
  onReload,
  onAdd,
}: Props) {
  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="dropdown-toggle h-9 w-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
      >
        <MoreVerticalIcon className="text-gray-500" />
      </button>

      <Dropdown isOpen={isOpen} onClose={onClose} className="w-40 p-2">
        <DropdownItem
          className={dropDownItem}
          onItemClick={() => {
            onClose();
            onAdd();
          }}
        >
          Add API Key
        </DropdownItem>

        <DropdownItem
          className={dropDownItem}
          onItemClick={() => {
            onClose();
            onReload();
          }}
        >
          Reload Data
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
