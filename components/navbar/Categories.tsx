"use client";

import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { GiWindmill } from "react-icons/gi";
import { HiHomeModern } from "react-icons/hi2";
import CategoryBox from "../CategoryBox";
import { FaMountainCity } from "react-icons/fa6";
import { FaSwimmingPool } from "react-icons/fa";
import { GrDiamond } from "react-icons/gr";
import { GiCastle } from "react-icons/gi";
import { FaCampground } from "react-icons/fa";
import { FaRegSnowflake } from "react-icons/fa";
import { GiCaveEntrance } from "react-icons/gi";
import { GiDesert } from "react-icons/gi";
import { GiBarn } from "react-icons/gi";
import { GiRiver } from "react-icons/gi";
import { GiIsland } from "react-icons/gi";
export const categories = [
  {
    label: "Beach",
    icon: FaUmbrellaBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: HiHomeModern,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: FaMountainCity,
    description: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: FaSwimmingPool,
    description: "This is property has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiRiver,
    description: "This property is close to a lake!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is in a castle!",
  },
  {
    label: "Camping",
    icon: FaCampground,
    description: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: FaRegSnowflake,
    description: "This property is in the arctic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property is in a cave!",
  },
  {
    label: "Desert",
    icon: GiDesert,
    description: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: GrDiamond,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-2 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            description={item.description}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
