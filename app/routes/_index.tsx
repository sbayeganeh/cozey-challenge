import moment from "moment";
import type { Orders, Packages } from "@prisma/client";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchOrders } from "prisma/helpers/orders";
import { fetchPackages } from "prisma/helpers/packages";
import { useEffect, useState } from "react";


export const meta: MetaFunction = () => {
  return [
    { title: "New Cozey App" },
    { name: "description", content: "Welcome to Cozey!" },
  ];
};

type LoaderData = {
  orders: Orders[],
  packages: Packages[]
};

export const loader: LoaderFunction = async () => {
  const orders = await fetchOrders();
  const packages = await fetchPackages();
  return json({ packages, orders });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  let itemsToGrabFromShelve: any = [];
  let orderDates: any = [];

  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState<string>();

  // Find day intervals
  {
    data.orders.map((order: any) => {
      const orderDate = moment(order.date).format("YYYY-MM-DD");
      orderDates[orderDate] = true
    })
  }

  {
    orders.map((order: any) => {
      return order.orderPackages.map((pack: any) => {
        const package_id = pack.package_id;
        const productsPackage = data.packages.find((pack: Packages) => pack.id == package_id)
        return (productsPackage as any).products.map((product: any) => {
          itemsToGrabFromShelve.push(product.product_name)
        })
      })
    })
  }

  itemsToGrabFromShelve = itemsToGrabFromShelve.sort()

  const handleDateChage = (event:any) => {
    setSelectedDate(event.target.value);
    setOrders((data.orders as any).filter((order: any) => {
      if (moment(order.date).format("YYYY-MM-DD") == selectedDate) return true
      else return false
    }))
  }


  useEffect(() => {
    setSelectedDate(Object.keys(orderDates).sort()[0]);
  }, []);

  useEffect(() => {
    setOrders((data.orders as any).filter((order: any) => {
      if (moment(order.date).format("YYYY-MM-DD") == selectedDate) return true
      else return false
    }))
  }, [selectedDate]);


  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h2>Inventory Management</h2>
      Select Date:
      <select onChange={handleDateChage} name="date">
        {Object.keys(orderDates).sort().map((date: string) => <option key={date}>{date}</option>)}
      </select>
      <hr />
      <h3>Items to grab from the shelve for the day</h3>
      <ul>
        {itemsToGrabFromShelve.map((item: string, index: number) => <li key={index}>{item}</li>)}
      </ul>
      <hr />
      <h2>Orders</h2>
      {orders.map((order: any) => {
        return <div key={order.id}>
          id: {order.id} <br />
          total: {order.total} <br />
          date: {order.date} <br />
          customer name: {order.customer_name} <br />
          customer email: {order.customer_email} <br />
          shipping address: {order.address} <br />
          packages:<br />
          {
            orders.map((order: any) => {
              return order.orderPackages.map((pack: any) => {
                const package_id = pack.package_id;
                const productsPackage : any= data.packages.find((pack: Packages) => pack.id == package_id)
                return <div key={order.id}>- {productsPackage?.name}
                  <ul>
                    {
                      productsPackage.products.map((product: any, index:number) => {
                        return <li key={index}>{product.product_name}</li>
                        })
                        
                    }
                  </ul>
                </div>
              })
            })
          }
          <hr />
        </div>
      })}
    </div>
  );
}
