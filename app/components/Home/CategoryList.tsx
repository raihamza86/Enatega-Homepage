"use client";

import React, { useState, useEffect } from "react";
import Data from "@/app/shared/Data";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
  icon: string;
  value: string;
}

interface CategoryListProps {
  onCategoryChange: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryChange }) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);  // Initialize with empty array
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    // Ensure Data.CategoryListData exists before setting it
    if (Data) {
      setCategoryList(Data);
    }
  }, []); // Runs only once on mount

  return (
    <div>
      <h2 className="font-bold">Select Food Type</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {categoryList.length > 0 ? (
          categoryList.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col justify-center items-center bg-gray-100 p-2 m-2 rounded-lg grayscale hover:grayscale-0 cursor-pointer 
                    border-purple-400  ${
                      selectedCategory === index ? "border-[1px] grayscale-0" : ""
                    }`}
              onClick={() => {
                setSelectedCategory(index);
                onCategoryChange(item.value);
              }}
            >
              <Image src={item.icon} alt={item.name} width={40} height={40} />
              {item.name}
            </div>
          ))
        ) : (
          <div>No categories available</div> // Display a fallback message if no categories are available
        )}
      </div>
    </div>
  );
};

export default CategoryList;
