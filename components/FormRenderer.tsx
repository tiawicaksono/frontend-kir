"use client";

import { Row, Col, Card } from "antd";
import AppDivider from "@/components/common/AppDivider";
import FieldRenderer from "./FieldRenderer";
import { buildFieldExtra } from "@/utils/for-schema/buildFieldExtra";
import { SectionSchema, FieldSchema } from "@/schema/type";

type Props = {
  sections: SectionSchema[];

  values?: any;

  wilayah?: any;

  selectMap?: any;
};

export default function FormRenderer({
  sections,
  values,
  wilayah,
  selectMap,
}: Props) {
  return (
    <>
      {sections.map((section) => (
        <Card
          key={section.title}
          style={{
            marginBottom: 16,
          }}
        >
          <AppDivider title={section.title} />

          <Row gutter={16}>
            {section.fields?.map((field: FieldSchema) => {
              // ====================================
              // CONDITIONAL
              // ====================================

              if (field.visible && !field.visible(values)) {
                return null;
              }

              const extra = buildFieldExtra({
                field,
                values,
                wilayah,
                selectMap,
              });

              return (
                <Col key={field.name} span={field.span || 24}>
                  <FieldRenderer field={field} extra={extra} />
                </Col>
              );
            })}
          </Row>
        </Card>
      ))}
    </>
  );
}
