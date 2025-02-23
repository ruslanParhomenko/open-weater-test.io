import Link from "next/link";

export default function ButtonFavoritCity() {
  return (
    <div className="flex w-full justify-between  items-center pb-3 pt-9">
      <button className="border border-transparent bg-foreground text-white text-xs p-2 rounded-lg hover:bg-background hover:text-foreground">
        Add Favorit
      </button>
      <button className="border border-transparent bg-foreground text-white text-xs p-2 rounded-lg hover:bg-background hover:text-foreground">
        <Link href="/favorits">Favorite Cities</Link>
      </button>
    </div>
  );
}
