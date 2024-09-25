import Categories from "./components/Categories";
import PropertyList from "./components/properties/PropertyList";
import { getUserId } from "./lib/actions";


export default  async function Home() {
  const userId = await getUserId()
  return (
    <main className="max-w-[1200px] mx-auto px-6">
      <Categories />
      <div className="mt-4 mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <PropertyList userId={userId} />
      </div>
    </main>
  );
}
