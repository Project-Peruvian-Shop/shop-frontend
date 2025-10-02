// src/Icons/icons.ts
// import view1 from "./actions/view-1.svg";
// import edit1 from "./actions/edit-1.svg";
import delete1 from "./actions/delete-1.svg";
import view2 from "./actions/view-2.svg";
import edit2 from "./actions/edit-2.svg";
import delete2 from "./actions/delete-2.svg";

export const Icons = {
  // "view-primary": view1,
  // "edit-primary": edit1,
  "delete-primary": delete1,
  "view-secondary": view2,
  "edit-secondary": edit2,
  "delete-secondary": delete2,
};

export type IconName = keyof typeof Icons;
