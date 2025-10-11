// src/Icons/icons.ts
// import view1 from "./actions/view-1.svg";
// import edit1 from "./actions/edit-1.svg";
import delete1 from "./actions/delete-1.svg";
import view2 from "./actions/view-2.svg";
import edit2 from "./actions/edit-2.svg";
import delete2 from "./actions/delete-2.svg";
import categoria from "./dashboard/categoria.svg";
import cotizacion from "./dashboard/cotizacion.svg";
import dashboard from "./dashboard/dashboard.svg";
import mensaje from "./dashboard/mensaje.svg";
import producto from "./dashboard/producto.svg";
import usuarioIcon from "./dashboard/usuario.svg";
import usuarioCircle from "./dashboard/user-circle.svg";
import usuarioIc from "./dashboard/user.svg";
import logout from "./dashboard/logout.svg";
import logoutWhite from "./logout-white.svg";
import cotizacionesD from "./cotizacionesD.svg";

import userIcon from "./user.svg";
import view from "./view.svg";

import about from "./About_company/user_icon.png";

import whatsappPri from "./rrss/whatsapp-primary.svg";
import whatsappSec from "./rrss/whatsapp-secondary.svg";
import outlook from "./rrss/outlook.svg";
import email from "./rrss/email.svg";
import phone from "./rrss/phone.svg";
import tiktok from "./rrss/tiktok.svg";
import facebook from "./rrss/facebook.svg";
import instagram from "./rrss/instagram.svg";

import cart from "./navbar/cart.svg";
import search from "./navbar/search.svg";
import items from "./navbar/items.svg";

export const Icons = {
  // "view-primary": view1,
  // "edit-primary": edit1,
  "delete-primary": delete1,
  "view-secondary": view2,
  "edit-secondary": edit2,
  "delete-secondary": delete2,
  categoria,
  cotizacion,
  dashboard,
  mensaje,
  producto,
  usuarioIcon,
  usuarioCircle,
  usuarioIc,
  logout,
  outlook,
  whatsappSec,
  cotizacionesD,
  logoutWhite,
  about,
  email,
  phone,
  tiktok,
  facebook,
  instagram,
  whatsappPri,
  userIcon,
  view,
  cart,
  search,
  items,
};

export type IconName = keyof typeof Icons;
