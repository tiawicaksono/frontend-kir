import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ApiKeys } from "@/types/api-keys.type";
import ApiKeyRow from "./ApiKeyRow";
import { useApiKeyDropdown } from "../hook/useApiKeyDropdown";
import { useApiKeyActions } from "../hook/useApiKeyAction";

const headerCellClass = "py-3 font-medium text-left";

interface Props {
  apiKeys: ApiKeys[];
  loading: boolean;
  dropdown: ReturnType<typeof useApiKeyDropdown>;
  actions: ReturnType<typeof useApiKeyActions>;
}

export default function ApiKeyTable({
  apiKeys,
  loading,
  dropdown,
  actions,
}: Props) {
  return (
    <div className="max-w-full overflow-x-auto">
      {loading && (
        <div className="flex items-center gap-2 pb-5">
          <div className="h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
          Reloading...
        </div>
      )}

      {!loading && (
        <Table>
          <TableHeader className="border-y">
            <TableRow>
              <TableCell isHeader className={headerCellClass}>
                Name
              </TableCell>
              <TableCell isHeader className={headerCellClass}>
                URL Api
              </TableCell>
              <TableCell isHeader className={headerCellClass}>
                Disable/Enable
              </TableCell>
              <TableCell isHeader className={headerCellClass}>
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y">
            {apiKeys.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>No Data Found</TableCell>
              </TableRow>
            )}

            {apiKeys.map((item) => (
              <ApiKeyRow
                key={item.id}
                item={item}
                dropdown={dropdown}
                actions={actions}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
