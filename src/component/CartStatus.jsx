import React from "react";
import { GrCart } from "react-icons/gr";
import useCart from "../hooks/useCart";

export default function CartStatus() {
  const {
    cartQuery: { data: products },
  } = useCart();
  return (
    <div className="relative">
      <GrCart className="text-3xl" />
      {products && (
        <p className="w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-2 -right-2">
          {products.length}
        </p>
      )}
    </div>
  );
}
