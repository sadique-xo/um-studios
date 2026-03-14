import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/db";
import { STATUS_COLORS } from "@/lib/constants";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek } from "date-fns";

export default async function AdminDashboardPage() {
  const now = new Date();
  const todayStart = startOfDay(now);
  const todayEnd = endOfDay(now);
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const [todayCount, weekCount, pendingCount, totalCount, recentBookings] =
    await Promise.all([
      prisma.booking.count({
        where: {
          preferredDate: { gte: todayStart, lte: todayEnd },
        },
      }),
      prisma.booking.count({
        where: {
          preferredDate: { gte: weekStart, lte: weekEnd },
        },
      }),
      prisma.booking.count({
        where: { status: "pending" },
      }),
      prisma.booking.count(),
      prisma.booking.findMany({
        take: 10,
        include: { service: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const stats = [
    {
      label: "Today's Bookings",
      value: todayCount,
      icon: Calendar,
    },
    {
      label: "This Week",
      value: weekCount,
      icon: LayoutDashboard,
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: Clock,
    },
    {
      label: "Total Bookings",
      value: totalCount,
      icon: Users,
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-serif text-[#F5F0E8] mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-5 h-5 text-[#C8A35F]" />
              </div>
              <p className="text-3xl font-semibold text-[#F5F0E8]">
                {stat.value}
              </p>
              <p className="text-sm text-[#F5F0E8]/60 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-[#1A1A1A] rounded-xl border border-[#8B6914]/20 p-6">
        <h2 className="text-lg font-serif text-[#F5F0E8] mb-4">
          Recent Bookings
        </h2>

        {recentBookings.length === 0 ? (
          <p className="text-[#F5F0E8]/40 text-sm py-8 text-center">
            No bookings yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#F5F0E8]/60">
                  <th className="text-left py-3 px-2 font-medium">Date</th>
                  <th className="text-left py-3 px-2 font-medium">Time</th>
                  <th className="text-left py-3 px-2 font-medium">Customer</th>
                  <th className="text-left py-3 px-2 font-medium">Service</th>
                  <th className="text-left py-3 px-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-white/5 text-[#F5F0E8]/80"
                  >
                    <td className="py-3 px-2">
                      {format(new Date(booking.preferredDate), "dd MMM yyyy")}
                    </td>
                    <td className="py-3 px-2">{booking.preferredTime}</td>
                    <td className="py-3 px-2">{booking.customerName}</td>
                    <td className="py-3 px-2">{booking.service.name}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs border capitalize ${
                          STATUS_COLORS[booking.status] || ""
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
