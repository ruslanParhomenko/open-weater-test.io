"use client";

import { useContextValue } from "../context/context";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
export default function FavoritsPage() {
  const router = useRouter();
  const left = "/";
  const handlers = useSwipeable({
    onSwipedRight: () => router.push(left),
  });
  const { state, dispatch } = useContextValue();
  if (!state) return null;
  return (
    <div
      {...handlers}
      className="flex flex-col items-beetween justify-center gap-4 w-screen h-screen max-w-[340px] px-4"
    >
      {state.map((data) => (
        <div key={data.city.id} className="flex justify-between items-center  ">
          <button
            onClick={() => router.push(`/${data.city.id}`)}
            className="border border-background bg-white rounded-3xl  gap-4 px-3 py-1 flex  justify-between items-center w-[75%]"
          >
            <h1 className="text-lg font-bold ">
              {data.city.name.toUpperCase()}
            </h1>
            <p>{"day:" + data.list[0].dt_txt.split(" ")[0].split("-")[2]}</p>
            <p className="font-bold">
              {(data.list[0].main.temp - 273.15).toFixed(1) + "°C"}
            </p>
          </button>
          <button
            onClick={() => dispatch({ type: "REMOVE_FAVORIT", payload: data })}
            className="border border-foreground rounded-3xl px-3 py-1 hover:bg-red-900 hover:text-white"
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}
