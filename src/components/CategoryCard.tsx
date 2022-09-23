import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/getCategories';

type Props = {
  categoryState: string;
  categoryError: string;
  handleOnClick: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const CategoryCard = ({ handleOnClick, categoryError }: Props) => {
  const [category, setCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      setCategory(await getCategories());
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-3">
      <h4>Select category: </h4>
      {!loading ? (
        <div className="flex flex-col space-y-2">
          <select
            defaultValue={'DEFAULT'}
            onChange={handleOnClick}
            className="w-[20rem] text-center p-1 rounded-lg">
            <option value="DEFAULT" disabled>
              Choose one
            </option>
            {Object.keys(category).map((item) => {
              return (
                <option
                  key={item}
                  value={item}
                  className="border p-2 hover:bg-slate-200  cursor-pointer">
                  {item}
                </option>
              );
            })}
          </select>
          <span className="text-red-500 text-sm">{categoryError}</span>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default CategoryCard;
