"use client";

import { Row, Col } from "antd";
import FieldRenderer from "../FieldRenderer";
import { buildFieldExtra } from "@/utils/for-schema/buildFieldExtra";

type Props = {
  section: any;

  selectMap?: any;

  wilayah?: any;

  values?: any;
};

export default function StepRenderer({
  section,
  selectMap,
  wilayah,
  values,
}: Props) {
  const safeSection = section ?? {};

  const rows = safeSection.rows ?? [];

  const fields = safeSection.fields ?? [];

  // ====================================
  // GRID MODE
  // ====================================

  if (rows.length > 0) {
    return (
      <>
        {rows.map((row: any, i: number) => (
          <Row gutter={16} key={i}>
            {(row?.cols ?? []).map((col: any, j: number) => {
              const field = col?.field;

              if (!field) {
                return null;
              }

              const extra = buildFieldExtra({
                field,
                values,
                selectMap,
                wilayah,
              });

              return (
                <Col span={col?.span ?? 12} key={j}>
                  <FieldRenderer field={field} extra={extra} />
                </Col>
              );
            })}
          </Row>
        ))}
      </>
    );
  }

  // ====================================
  // SIMPLE FIELD MODE
  // ====================================

  return (
    <Row gutter={16}>
      {fields.map((field: any) => {
        const extra = buildFieldExtra({
          field,
          values,
          selectMap,
          wilayah,
        });

        return (
          <Col span={field.span || 12} key={field.name}>
            <FieldRenderer field={field} extra={extra} />
          </Col>
        );
      })}
    </Row>
  );
}
