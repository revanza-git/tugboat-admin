import {
  IconBoxMultiple,
  IconCircleDot,
  IconHome,
  IconInfoCircle,
  IconLayout,
  IconLayoutGrid,
  IconPhoto,
  IconPoint,
  IconStar,
  IconTable,
  IconUser,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Tugboat",
    icon: IconHome,
    href: "/",
  },
];

export default Menuitems;
