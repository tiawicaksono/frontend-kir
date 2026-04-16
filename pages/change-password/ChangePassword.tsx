"use client";

import { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import api from "@/services/api";
import { useShowAlert } from "@/core/alert/alert.hook";
import PasswordStrengthIndicator from "@/components/common/PasswordStrengthIndicator";
import { getPasswordStrength } from "@/utils/validatePassword";

const { Title, Text } = Typography;

type FormType = {
  old_password: string;
  password: string;
  password_confirmation: string;
};

export default function ChangePassword() {
  const [form] = Form.useForm<FormType>();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const handleSubmit = async (values: FormType) => {
    try {
      setLoading(true);

      await api.post("/change-password", values);

      showSuccessAlert("Password berhasil diubah");
      form.resetFields();
      setPassword("");
    } catch (error: any) {
      showErrorAlert(error, "Password gagal diubah");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <div className="w-full max-w-md">
        <Card className="shadow-sm rounded-xl">
          {/* HEADER */}
          <div className="mb-6 text-center">
            <Title level={4} className="!mb-1">
              Change Password
            </Title>
            <Text type="secondary">
              Pastikan password kuat dan mudah diingat
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            {/* OLD PASSWORD */}
            <Form.Item
              label="Old Password"
              name="old_password"
              rules={[{ required: true, message: "Wajib diisi" }]}
            >
              <Input.Password size="large" />
            </Form.Item>

            {/* NEW PASSWORD */}
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                { required: true, message: "Wajib diisi" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const strength = getPasswordStrength(value);
                    if (strength < 5) {
                      return Promise.reject(
                        new Error("Password belum cukup kuat"),
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password
                size="large"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            {/* STRENGTH */}
            {password && (
              <div className="mb-4">
                <PasswordStrengthIndicator password={password} />
              </div>
            )}

            {/* CONFIRM */}
            <Form.Item
              label="Confirm Password"
              name="password_confirmation"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Wajib diisi" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Password tidak sama"));
                  },
                }),
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            {/* BUTTON */}
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                className="rounded-lg"
              >
                {loading ? "Changing..." : "Change Password"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
