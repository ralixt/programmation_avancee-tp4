"use client";

import React, {FC, memo, useCallback, useState} from "react";
import {ProductCartLine, FormattedPrice, Button, NoticeMessageData, NoticeMessage} from "tp-kit/components";
import {
  removeLine,
  updateLine,
  computeCartTotal,
  useCart,
  clearCart,
} from "../hooks/use-cart";
import { createOrder } from "../actions/create-order";
import {response} from "express";

type Props = {};

const Cart: FC<Props> = memo(function () {
  const lines = useCart((cart) => cart.lines);
  const wrapperClasses = "bg-white rounded-lg p-6 shadow-xl space-y-12";
  const [notices, setNotices] = useState<NoticeMessageData[]>([]);

  const handleCreateOrder = useCallback(async () => {
    const response = await createOrder(useCart.getState());
    if(response.error) {
        setNotices([
            {
                type: "error",
                message : response.error,
            }
        ])
    }
    else {
        clearCart();
    }

  }, []);

  if (lines.length === 0)
    return (
      <div className={wrapperClasses}>
        <p className="my-12 text-center text-gray-600 text-sm">
          Votre panier est vide
        </p>
      </div>
    );

  return (
    <div className={wrapperClasses}>
      <h2 className="text-sm uppercase font-bold tracking-wide">Mon panier</h2>
        {notices.map((m, index) => (
            <NoticeMessage
                key={index}
                message={m.message}
                type = {m.type}
            />
        ))
        }
      <div className="space-y-4">
        {lines.map(({ product, qty }) => (
          <ProductCartLine
            key={product.id}
            product={product}
            qty={qty}
            onDelete={() => removeLine(product.id)}
            onQtyChange={(qty) => updateLine({ product, qty })}
          />
        ))}
      </div>

      <table className="w-full">
        <tbody>
          <tr>
            <th className="text-left">Total</th>
            <td className="text-right font-bold">
              <FormattedPrice price={computeCartTotal(lines)} />
            </td>
          </tr>
        </tbody>
      </table>

      <Button fullWidth size="lg" onClick={handleCreateOrder}>
        Commander
      </Button>
    </div>
  );
});

Cart.displayName = "Cart";
export { Cart };
