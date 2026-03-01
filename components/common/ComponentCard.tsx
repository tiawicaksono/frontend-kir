import React from "react";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  borderTop?: boolean;
  headerRight?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  borderTop = false,
  headerRight,
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="flex flex-col gap-2 mb-4 pt-5 px-5 sm:px-6 sm:flex-row sm:items-center sm:justify-between">
        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>

        {/* Right (Optional) */}
        {headerRight && (
          <div className="flex items-center gap-2">{headerRight}</div>
        )}
      </div>

      {/* Card Body */}
      <div
        className={`px-4 ${
          borderTop
            ? "pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-800"
            : ""
        } sm:px-6`}
      >
        {children}
      </div>
    </div>
  );
};

export default ComponentCard;
