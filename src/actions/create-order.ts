"use server";

import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import getUser from "../utils/supabase";

export async function createOrder(cart: CartData):Promise<{ error: string | null, success: boolean }> {

  const supabase = createServerComponentClient({cookies});
  const user = await getUser(supabase)

  if(!user) {
    return{ error:  "Impossible de créer la commance, vous n'êtes pas connecté", success: true }
  }

  console.log(await prisma.order.create({
    data: {
      total: computeCartTotal(cart.lines),
      userId: user.id,
      lines: {
        create: cart.lines.map(line => ({
          productId: line.product.id,
          qty: line.qty,
          subtotal: computeLineSubtotal(line)
        }))
      }
    }
  }));

  return{ error:  null, success: true }
}