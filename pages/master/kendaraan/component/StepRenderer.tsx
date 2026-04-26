import { Row, Col } from "antd";
import FieldRenderer from "./FieldRenderer";

export default function StepRenderer({ section, selectMap }: any) {
  return section.rows ? (
    section.rows.map((row: any, i: number) => (
      <Row gutter={16} key={i}>
        {row.cols.map((col: any, j: number) => (
          <Col span={col.span} key={j}>
            {col.field && (
              <FieldRenderer
                field={col.field}
                extra={selectMap[col.field.name]}
              />
            )}
          </Col>
        ))}
      </Row>
    ))
  ) : (
    <Row gutter={16}>
      {section.fields?.map((field: any) => (
        <Col span={12} key={field.name}>
          <FieldRenderer field={field} extra={selectMap[field.name]} />
        </Col>
      ))}
    </Row>
  );
}
