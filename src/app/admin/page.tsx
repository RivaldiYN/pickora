import Link from "next/link";
import { Package, FolderTree, Star, Plus, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, featuredCount, recentProducts] =
    await Promise.all([
      db.product.count().catch(() => 0),
      db.category.count().catch(() => 0),
      db.product.count({ where: { featured: true } }).catch(() => 0),
      db.product
        .findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { category: true },
        })
        .catch(() => []),
    ]);

  const stats = [
    {
      title: "Total Recommendations",
      value: productCount,
      icon: Package,
      description: "Live affiliate items across all categories",
    },
    {
      title: "Active Categories",
      value: categoryCount,
      icon: FolderTree,
      description: "Curated filter segments",
    },
    {
      title: "Featured Picks",
      value: featuredCount,
      icon: Star,
      description: "Prioritized recommendations on homepage",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your affiliate catalog, categories, and recommendation feeds.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Manage Products
            </Button>
          </Link>
          <Link href="/admin/categories">
            <Button size="sm" variant="outline" className="gap-2">
              <FolderTree className="h-4 w-4" />
              Categories
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.title}
                </span>
                <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Items Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-semibold">
              Recently Added Recommendations
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              The latest items in your affiliate catalog
            </p>
          </div>
          <Link href="/admin/products" className="text-xs font-medium text-blue-600 hover:underline">
            View all →
          </Link>
        </CardHeader>
        <CardContent>
          {recentProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              <Package className="h-8 w-8 mx-auto text-slate-300 mb-2" />
              <p>No products yet. Click &quot;Manage Products&quot; to add your first item.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentProducts.map((p) => (
                <div key={p.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="h-11 w-11 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                        <Badge variant="secondary" className="text-[10px] py-0 px-2">
                          {p.category.name}
                        </Badge>
                        {p.price && <span>{formatCurrency(p.price.toString())}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      title="Open affiliate link"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
