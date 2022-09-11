import AtroposImage from "./AtroposImage";
import AtroposBorder from "./AtroposBorder";
import Atropos from "atropos/react";

export default function Comics() {
  const comics = ["asm17", "asm311", "asm43", "dd35"];

  return (
    <main className="">
      {comics.map((comic, index) => (
        <div key={index} className="">
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
