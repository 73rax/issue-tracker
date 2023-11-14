import Pagination from "./components/Pagination";

export default function Home() {
  return <Pagination itemCount={20} pageSize={5} currentPage={4} />;
}
