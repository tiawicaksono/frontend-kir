import { Button, Space } from "antd";
import { EditOutlined, BookOutlined } from "@ant-design/icons";

export default function DetailHeaderAction({
  id,
  onEdit,
}: {
  id: string;
  onEdit: () => void;
  onRefresh?: () => void;
}) {
  const handlePrint = () => {
    window.open(`/master/data-kendaraan/${id}/print-kartu-kuning`, "_blank");
  };

  return (
    <Space>
      <Button onClick={onEdit} type="primary" icon={<EditOutlined />}>
        Edit
      </Button>

      <Button onClick={handlePrint} icon={<BookOutlined />}>
        Cetak Kartu Kuning
      </Button>
    </Space>
  );
}
