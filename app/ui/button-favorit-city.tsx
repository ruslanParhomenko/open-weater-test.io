import Link from "next/link";

export default function ButtonFavoritCity() {
  return (
    <div className="flex w-full justify-around items-center py-2 ">
      <button className="border border-transparent bg-background px-2 rounded-lg hover:bg-[#183769] hover:text-white">
        Add Favorit
      </button>
      <button className="border border-transparent bg-background px-2 rounded-lg hover:bg-[#183769] hover:text-white">
        <Link href="/favorits">Favorite Cities</Link>
      </button>
    </div>
  );
}
