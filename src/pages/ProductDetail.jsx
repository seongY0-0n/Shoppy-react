import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "./../component/ui/Button";
import { useAuthContext } from "../context/AuthContext";
import { addOrUpdateToCarts } from "../api/firebase";

export default function ProductDetail() {
  const { user } = useAuthContext();
  const {
    state: {
      product: { id, image, title, category, price, options, description },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const handleClick = (e) => {
    //firebase에 carts 등록
    const product = { id, image, title, price, option: selected, quantity: 1 };
    addOrUpdateToCarts(user.uid, product);
  };
  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">
            {price}원
          </p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <lable className="text-brand font-bold" htmlFor="select">
              옵션:
            </lable>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, index) => (
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>

          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
