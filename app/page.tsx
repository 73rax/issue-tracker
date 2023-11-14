import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <Pagination
      itemCount={20}
      pageSize={5}
      currentPage={parseInt(searchParams.page)}
    />
  );
}
