import type { SidebarProps } from "../Components/shop/sidebar/Sidebar";
import type { PaginatedProductoResponseDTO } from "../Dashboard/models/Producto/Producto_response_dto";

export const mockSidebar: SidebarProps = {
  arrayCategories: [
    { id: 1, name: "Categoría 1", quantity: 10 },
    { id: 2, name: "Categoría 2", quantity: 5 },
    { id: 3, name: "Categoría 3", quantity: 8 },
  ],
};

export const mockProducts: PaginatedProductoResponseDTO[] = [
  {
    id: 1,
    nombre: "Producto 1",
    imagenUrl:
      "https://tuberiasperuanito.com/wp-content/uploads/2025/04/Tuberias-para-Alcantarillado-110mm-UF-scaled-e1750736328578-300x300.jpg",
    imagenAlt: "Imagen del producto 1",
  },
  {
    id: 2,
    nombre: "Producto 2",
    imagenUrl:
      "https://tuberiasperuanito.com/wp-content/uploads/2025/04/Tuberias-para-Alcantarillado-110mm-UF-scaled-e1750736328578-300x300.jpg",
    imagenAlt: "Imagen del producto 2",
  },
  {
    id: 3,
    nombre: "Producto 3",
    imagenUrl:
      "https://tuberiasperuanito.com/wp-content/uploads/2025/04/Tuberias-para-Alcantarillado-110mm-UF-scaled-e1750736328578-300x300.jpg",
    imagenAlt: "Imagen del producto 3",
  },
  {
    id: 4,
    nombre: "Producto 4",
    imagenUrl:
      "https://tuberiasperuanito.com/wp-content/uploads/2025/04/Tuberias-para-Alcantarillado-110mm-UF-scaled-e1750736328578-300x300.jpg",
    imagenAlt: "Imagen del producto 4",
  },
];
