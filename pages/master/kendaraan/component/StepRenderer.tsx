import { Row, Col } from "antd";
import FieldRenderer from "./FieldRenderer";

export default function StepRenderer({ section, selectMap }: any) {
  // 👇 SAFE GUARD
  const safeSection = section ?? {};
  const rows = safeSection.rows ?? [];
  const fields = safeSection.fields ?? [];

  if (rows.length > 0) {
    return (
      <>
        {rows.map((row: any, i: number) => (
          <Row gutter={16} key={i}>
            {(row?.cols ?? []).map((col: any, j: number) => (
              <Col span={col?.span ?? 12} key={j}>
                {col?.field && (
                  <FieldRenderer
                    field={col.field}
                    extra={selectMap?.[col.field?.name]}
                  />
                )}
              </Col>
            ))}
          </Row>
        ))}
      </>
    );
  }

  return (
    <Row gutter={16}>
      {fields.map((field: any) => (
        <Col span={12} key={field.name}>
          <FieldRenderer field={field} extra={selectMap?.[field.name]} />
        </Col>
      ))}
    </Row>
  );
}
