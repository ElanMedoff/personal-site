import AtroposImage from "./AtroposImage";
import AtroposBorder from "./AtroposBorder";
import Atropos from "atropos/react";

export default function Comics() {
  const comics = ["asm17", "asm311", "asm43", "dd35"];

  return (
    <main className="flex flex-wrap items-center justify-evenly gap-2">
      {comics.map((comic, index) => (
        <div key={index} className="p-1 border-2 border-base-300">
          <Atropos
            className="relative w-max"
            rotateChildren={
              <>
                <AtroposBorder.Left base={40} color="secondary" />
                <AtroposBorder.Right base={40} color="secondary" />
                <AtroposBorder.Top base={40} color="secondary" />
                <AtroposBorder.Bottom base={40} color="secondary" />
              </>
            }
          >
            <div className="max-w-[230px] max-h-[350px]">
              <AtroposImage src={`/${comic}.jpeg`} alt={comic} offset={0} />
            </div>
          </Atropos>
        </div>
      ))}
    </main>
  );
}
