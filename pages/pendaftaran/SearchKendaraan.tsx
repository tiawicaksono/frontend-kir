"use client";

import { Card, Row, Col, Form, Select } from "antd";

import Search from "antd/es/input/Search";

import { useState } from "react";

export default function SearchKendaraan({
  form,
  statusOptions,
  onSearch,
}: any) {
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    try {
      setLoading(true);

      await onSearch(value);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      style={{
        marginBottom: 16,
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Jenis Uji"
            name="status_penerbitan_id"
            rules={[
              {
                required: true,
                message: "Jenis uji wajib dipilih",
              },
            ]}
          >
            <Select
              options={statusOptions}
              showSearch
              allowClear
              placeholder="Pilih jenis uji"
              optionFilterProp="label"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label="Search" name="q">
            <Search
              enterButton="Search"
              loading={loading}
              onSearch={handleSearch}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
}
