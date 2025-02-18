interface Category {
    id: number;
    name: string;
    value: string;
    icon: string;
  }
  
  const CategoryListData: Category[] = [
    {
      id: 1,
      name: "Pakistani",
      value: "Pakistani restaurant",
      icon: "/mutton.jpeg",
    },
    {
      id: 2,
      name: "Maxican",
      value: "Maxican restaurant",
      icon: "/taco.jpeg",
    },
    {
      id: 3,
      name: "Italian",
      value: "Italian restaurant",
      icon: "/ramen.jpeg",
    },
    {
      id: 4,
      name: "Chinese",
      value: "Chinese restaurant",
      icon: "/pizza.jpeg",
    },
  ];
  
  export default CategoryListData;
  