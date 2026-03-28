"use client";

import ComponentCard from "@/components/common/ComponentCard";

export default function NoteChangePassword() {
  return (
    <ComponentCard title="Note">
      <div>
        <h1>Change Password</h1>
        <small>
          Please add all necessary characters to create safe password
        </small>
        <ul>
          <li>Minimum 6 characters</li>
          <li>At least one uppercase character</li>
          <li>At least one lowercase character</li>
          <li>At least one number</li>
          <li>At least one special character</li>
        </ul>
      </div>
    </ComponentCard>
  );
}
