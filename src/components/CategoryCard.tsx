import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/getCategories';

type CategoryCardProps = {
  categoryError: string;
  handleOnClick: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CategoryCard = ({ handleOnClick, categoryError }: CategoryCardProps) => {
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      setCategory(await getCategories());
      console.log(category);
    };
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-3">
      <div className="flex flex-col space-y-2">
        <select
          defaultValue={'DEFAULT'}
          placeholder="Select an category"
          onChange={handleOnClick}
          className="w-[20rem] text-center p-1 rounded-lg">
          <option value="DEFAULT" disabled>
            Select an category
          </option>
          {Object.keys(category).map((item, index) => {
            return (
              <option
                data-testid={`category-${index}`}
                key={item}
                value={item}
                role="contentinfo"
                className="border p-2 hover:bg-slate-200 cursor-pointer">
                {item}
              </option>
            );
          })}
        </select>
        <span className="text-red-500 text-sm">{categoryError}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
