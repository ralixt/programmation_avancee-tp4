import {OrderDetailsLayout} from "tp-kit/components";
import {useState} from "react";


export default function RealTimeOrderDetails(props) {

    const [realTimeOrtder, setRealTimeOrder] = useState(props.order)

    return <OrderDetailsLayout order={order} />
}