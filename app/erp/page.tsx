import type { Metadata } from "next";
import { BarChart3, IndianRupee, MessageCircle, PackageCheck, ShoppingBag } from "lucide-react";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { AdminLogoutButton } from "@/components/AdminLogoutButton";
import { brand } from "@/data/site";
import { isAdminConfigured, isSuperAdminAuthenticated } from "@/lib/admin-auth";
import { getSalesDashboard } from "@/lib/orders";
import { formatPrice } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Keshamrit ERP | Super Admin Sales Dashboard",
  description:
    "Private Keshamrit super admin dashboard for sales, orders, WhatsApp leads, and monthly revenue.",
  robots: {
    index: false,
    follow: false
  }
};

export default async function ErpPage() {
  const isAuthenticated = await isSuperAdminAuthenticated();

  if (!isAuthenticated) {
    return (
      <section className="section-shell min-h-[calc(100dvh-72px)] py-16">
        <AdminLoginForm isConfigured={isAdminConfigured()} />
      </section>
    );
  }

  const dashboard = await getSalesDashboard();
  const cards = [
    {
      label: "Monthly revenue",
      value: formatPrice(dashboard.summary.currentMonthRevenue),
      helper:
        dashboard.summary.previousMonthRevenue > 0
          ? `${Math.round(
              ((dashboard.summary.currentMonthRevenue -
                dashboard.summary.previousMonthRevenue) /
                dashboard.summary.previousMonthRevenue) *
                100
            )}% vs previous month`
          : "No previous-month baseline",
      icon: IndianRupee
    },
    {
      label: "Total sales",
      value: formatPrice(dashboard.summary.totalRevenue),
      helper: `${dashboard.summary.totalOrders} orders recorded`,
      icon: ShoppingBag
    },
    {
      label: "WhatsApp leads",
      value: String(dashboard.summary.whatsappLeads),
      helper: "Orders sourced from WhatsApp flow",
      icon: MessageCircle
    },
    {
      label: "Pending orders",
      value: String(dashboard.summary.pendingOrders),
      helper: `${formatPrice(dashboard.summary.averageOrderValue)} avg order value`,
      icon: PackageCheck
    }
  ];

  return (
    <>
      <section className="section-shell py-10 lg:py-14">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-4">
              <BarChart3 aria-hidden="true" className="size-4" />
              Super admin ERP
            </p>
            <h1 className="font-display text-4xl font-black leading-tight text-leaf-900 sm:text-5xl">
              Sales and monthly revenue for {brand.name}.
            </h1>
            <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-ink/68">
              Domain target: <strong>erp.kesh-amrit.vercel.app</strong>. Data
              comes from Supabase when configured; otherwise demo rows keep the
              dashboard testable during setup.
            </p>
          </div>
          <AdminLogoutButton />
        </div>

        {!dashboard.configured || dashboard.errorMessage ? (
          <div className="mt-6 rounded-lg border border-gold-100 bg-gold-50 p-4 text-sm font-bold leading-6 text-gold-600">
            {!dashboard.configured
              ? "Supabase is not configured yet. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel to show live orders."
              : `Supabase returned: ${dashboard.errorMessage}`}
          </div>
        ) : null}
      </section>

      <section className="section-shell grid gap-4 pb-10 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <article className="safe-card p-5" key={card.label}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-ink/52">{card.label}</p>
                <p className="mt-2 font-display text-3xl font-black text-leaf-900">
                  {card.value}
                </p>
              </div>
              <span className="grid size-11 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
                <card.icon aria-hidden="true" className="size-5" />
              </span>
            </div>
            <p className="mt-4 text-sm font-bold leading-6 text-ink/58">
              {card.helper}
            </p>
          </article>
        ))}
      </section>

      <section className="section-shell grid gap-6 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="safe-card p-5">
          <h2 className="font-display text-2xl font-black text-leaf-900">
            Monthly revenue
          </h2>
          <div className="mt-6 grid gap-4">
            {dashboard.monthlyBuckets.map((bucket) => (
              <div className="grid gap-2" key={bucket.label}>
                <div className="flex items-center justify-between gap-3 text-sm font-black text-ink/66">
                  <span>{bucket.label}</span>
                  <span>{formatPrice(bucket.value)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-leaf-50">
                  <div
                    className="h-full rounded-full bg-leaf-700"
                    style={{ width: `${bucket.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="safe-card overflow-hidden">
          <div className="border-b border-leaf-700/10 p-5">
            <h2 className="font-display text-2xl font-black text-leaf-900">
              Latest orders
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-leaf-50 text-xs font-black uppercase text-ink/52">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Qty</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-leaf-700/10">
                {dashboard.orders.slice(0, 8).map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3 font-black text-leaf-900">
                      {order.customer_name}
                      <span className="block text-xs font-bold text-ink/48">
                        {order.phone}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-ink/66">{order.city}</td>
                    <td className="px-4 py-3 font-bold text-ink/66">
                      {order.quantity}
                    </td>
                    <td className="px-4 py-3 font-black text-leaf-900">
                      {formatPrice(order.total_amount)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-leaf-50 px-2.5 py-1 text-xs font-black text-leaf-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-ink/58">
                      {new Date(order.created_at).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </>
  );
}
