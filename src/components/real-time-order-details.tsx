'use client'
import {OrderDetailsLayout} from "tp-kit/components";
import {useEffect, useState} from "react";
import {OrderData} from "tp-kit/types";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

type Order = {
    order: OrderData;
}


export default function RealTimeOrderDetails({order} : {order : Order}) {


    const supabase = createClientComponentClient()


    useEffect(() => {
        const channel = supabase.channel('realtime order')
            .on('postgres_changes',
                {
                    event:'UPDATE',
                    schema: 'public',
                    table: 'Order',
                    filter: `id=eq.${order.id}`,
                }, (payload) => {
                console.log("payload")
                console.log({payload})
            }).subscribe()

        return () => {
            supabase.removeChannel(channel)
        }


    }, [supabase]);




    return <OrderDetailsLayout order={order} />
}