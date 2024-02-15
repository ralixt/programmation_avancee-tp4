'use client'
import {OrderDetailsLayout} from "tp-kit/components";
import {useEffect, useState} from "react";
import {OrderData} from "tp-kit/types";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {useRouter} from "next/navigation";

type RealTimeOrderDetailsProps = {
    order: OrderData;
}



export default function RealTimeOrderDetails({order} : RealTimeOrderDetailsProps) {

    const supabase = createClientComponentClient()
    const [updateOrder, setUpdateOrder] = useState<OrderData>(order);

    useEffect(() => {
        const channel = supabase.channel('realtime order')
            .on('postgres_changes',
                {
                    event:'UPDATE',
                    schema: 'public',
                    table: 'Order',
                    filter: `id=eq.${updateOrder.id}`,
                }, (payload) => {
                    setUpdateOrder({ ...(payload.new as Order), lines: order.lines });
                console.log({payload})
            }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }


    }, [supabase, updateOrder, setUpdateOrder]);


    return <OrderDetailsLayout order={updateOrder} />
}