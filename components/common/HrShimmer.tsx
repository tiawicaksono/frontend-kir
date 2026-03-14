interface Props {
  loading?: boolean;
}

export default function HrShimmer({ loading }: Props) {
  if (!loading) {
    return <hr className="-mx-4 sm:-mx-6 my-5 border-gray-200" />;
  }

  return (
    <div className="-mx-4 sm:-mx-6 my-5 h-[2px] overflow-hidden relative bg-red-200">
      <div className="absolute inset-0 animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
    </div>
  );
}
