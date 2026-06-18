import { product } from "@/data/site";
import { getSupabaseAdminClient, isSupabaseConfigured } from "./supabase";

export type OrderStatus = "new" | "confirmed" | "packed" | "delivered" | "cancelled";

export type OrderInput = {
  name: string;
  phone: string;
  city: string;
  address: string;
  quantity: number;
  productName?: string;
  unitPrice?: number;
  source?: string;
  whatsappMessage?: string;
};

export type SalesOrder = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  city: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  status: OrderStatus;
  source: string;
};

const demoOrders: SalesOrder[] = [
  {
    id: "demo-1001",
    created_at: new Date().toISOString(),
    customer_name: "Simran K.",
    phone: "+91 90000 10001",
    city: "Ludhiana",
    quantity: 2,
    unit_price: product.price,
    total_amount: product.price * 2,
    status: "confirmed",
    source: "whatsapp"
  },
  {
    id: "demo-1002",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    customer_name: "Manpreet A.",
    phone: "+91 90000 10002",
    city: "Patiala",
    quantity: 1,
    unit_price: product.price,
    total_amount: product.price,
    status: "new",
    source: "website"
  },
  {
    id: "demo-1003",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 38).toISOString(),
    customer_name: "Gurleen P.",
    phone: "+91 90000 10003",
    city: "Jalandhar",
    quantity: 3,
    unit_price: product.price,
    total_amount: product.price * 3,
    status: "delivered",
    source: "whatsapp"
  }
];

export function validateOrder(input: Partial<OrderInput>) {
  const quantity = Math.max(1, Number(input.quantity) || 1);
  const name = String(input.name || "").trim();
  const phone = String(input.phone || "").trim();
  const city = String(input.city || "").trim();
  const address = String(input.address || "").trim();

  if (!name || name.length < 2) {
    return { ok: false as const, error: "Please enter the customer name." };
  }

  if (!/^[0-9+\-\s]{8,18}$/.test(phone)) {
    return { ok: false as const, error: "Please enter a valid phone number." };
  }

  if (!city || city.length < 2) {
    return { ok: false as const, error: "Please enter the city." };
  }

  if (!address || address.length < 6) {
    return { ok: false as const, error: "Please enter the delivery address." };
  }

  return {
    ok: true as const,
    order: {
      name,
      phone,
      city,
      address,
      quantity,
      productName: input.productName || product.name,
      unitPrice: Number(input.unitPrice) || product.price,
      source: input.source || "website",
      whatsappMessage: input.whatsappMessage || ""
    }
  };
}

export async function createOrder(input: OrderInput) {
  const supabase = getSupabaseAdminClient();
  const unitPrice = Number(input.unitPrice) || product.price;
  const quantity = Math.max(1, Number(input.quantity) || 1);
  const totalAmount = unitPrice * quantity;

  if (!supabase) {
    return {
      ok: true,
      demoMode: true,
      orderId: `demo-${Date.now()}`
    };
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: input.name,
      phone: input.phone,
      city: input.city,
      address: input.address,
      quantity,
      product_name: input.productName || product.name,
      unit_price: unitPrice,
      total_amount: totalAmount,
      source: input.source || "website",
      status: "new",
      whatsapp_message: input.whatsappMessage || ""
    })
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ok: true,
    demoMode: false,
    orderId: data?.id
  };
}

export async function getSalesDashboard() {
  const supabase = getSupabaseAdminClient();
  let orders = demoOrders;
  let errorMessage = "";

  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .select("id, created_at, customer_name, phone, city, quantity, unit_price, total_amount, status, source")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      errorMessage = error.message;
    } else {
      orders = (data || []) as SalesOrder[];
    }
  }

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const previousMonthDate = new Date(thisYear, thisMonth - 1, 1);

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  const totalOrders = orders.length;
  const currentMonthRevenue = orders
    .filter((order) => {
      const date = new Date(order.created_at);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    })
    .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  const previousMonthRevenue = orders
    .filter((order) => {
      const date = new Date(order.created_at);
      return (
        date.getMonth() === previousMonthDate.getMonth() &&
        date.getFullYear() === previousMonthDate.getFullYear()
      );
    })
    .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

  const monthlyBuckets = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(thisYear, thisMonth - (5 - index), 1);
    const label = date.toLocaleString("en-IN", { month: "short" });
    const value = orders
      .filter((order) => {
        const orderDate = new Date(order.created_at);
        return (
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((sum, order) => sum + Number(order.total_amount || 0), 0);

    return { label, value };
  });

  const maxBucket = Math.max(...monthlyBuckets.map((bucket) => bucket.value), 1);

  return {
    configured: isSupabaseConfigured(),
    errorMessage,
    orders,
    summary: {
      totalRevenue,
      totalOrders,
      currentMonthRevenue,
      previousMonthRevenue,
      averageOrderValue: totalOrders ? Math.round(totalRevenue / totalOrders) : 0,
      whatsappLeads: orders.filter((order) => order.source === "whatsapp").length,
      pendingOrders: orders.filter((order) => order.status === "new").length
    },
    monthlyBuckets: monthlyBuckets.map((bucket) => ({
      ...bucket,
      percentage: Math.round((bucket.value / maxBucket) * 100)
    }))
  };
}
