type Props = {
  title: string;
};

export default function AppDivider({ title }: Props) {
  return (
    <div style={{ margin: "24px 0 12px" }}>
      <div
        style={{
          fontWeight: 600,
          fontSize: 14,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: 1,
          background: "#f0f0f0",
        }}
      />
    </div>
  );
}
