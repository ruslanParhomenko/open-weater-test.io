"use client";

import Link from "next/link";
import { useContextValue } from "../context/context";
import { Action } from "../type/data-type";

export default function ButtonFavoritCity({
  data,
}: {
  data: Action["payload"];
}) {
  const { dispatch } = useContextValue();
  return (
    <div className="flex w-full justify-between  items-center pb-3 pt-9">
      <button
        onClick={() => dispatch({ type: "ADD_FAVORIT", payload: data })}
        className="border border-transparent bg-foreground text-white text-xs p-2 rounded-lg hover:bg-background hover:text-foreground"
      >
        Add Favorit
      </button>
      <button className="border border-transparent bg-foreground text-white text-xs p-2 rounded-lg hover:bg-background hover:text-foreground">
        <Link href="/favorits">Favorite Cities</Link>
      </button>
    </div>
  );
}
