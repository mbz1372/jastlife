import Image from "next/image";

export default function ProductVisual({ product, priority = false, className = "" }) {
  if (product.image_url) {
    return <div className={`productPhoto ${className}`}>
      <Image
        src={product.image_url}
        alt={product.name}
        fill
        priority={priority}
        sizes="(max-width: 760px) 82vw, (max-width: 1100px) 42vw, 25vw"
        style={{ objectFit: "cover" }}
      />
    </div>;
  }

  const type = product.type || "case";
  return <div className={`productObject ${type} ${className}`} aria-hidden="true">
    {type === "lamp" && <><i className="ring"/><i className="core"/><i className="stand"/></>}
    {type === "power" && <><i className="body"/><i className="screen">78</i><i className="port"/></>}
    {type === "tool" && <><i className="toolBody"/><i className="arm a"/><i className="arm b"/><i className="pivot"/></>}
    {type === "pack" && <><i className="packBody"/><i className="packPocket"/><i className="strap left"/><i className="strap right"/></>}
    {type === "bottle" && <><i className="bottleBody"/><i className="bottleCap"/><i className="bottleBand"/></>}
    {type === "tent" && <><i className="tentBody"/><i className="tentDoor"/><i className="tentPole"/></>}
    {type === "rear" && <><i className="rearBody"/><i className="rearLight"/><i className="rearMount"/></>}
    {type === "case" && <><i className="caseBody"/><i className="caseZip"/><i className="caseHandle"/></>}
  </div>;
}
