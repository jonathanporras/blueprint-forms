import Spinner from "@/components/spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full">
      <Spinner />
    </div>
  );
}
