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
      description: "Prioritized recommendations",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">
            Dashboard Overview
          </h1>
          <p className="text-xs text-muted mt-1">
            Manage your affiliate catalog, categories, and recommendation feeds.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/products">
            <Button size="sm" className="gap-2">
              <Plus className="size-4" />
              Manage Products
            </Button>
          </Link>
          <Link href="/admin/categories">
            <Button size="sm" variant="outline" className="gap-2">
              <FolderTree className="size-4" />
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
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {stat.title}
                </span>
                <div className="size-8 rounded-md bg-paper text-ink flex items-center justify-center border border-rule">
                  <Icon className="size-4" />
                </div>
              </div>
              <div className="mt-3">
                <p className="font-mono text-3xl font-bold text-ink">{stat.value}</p>
                <p className="text-xs text-muted mt-1">{stat.description}</p>
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
            <p className="text-xs text-muted mt-0.5">
              The latest items in your affiliate catalog
            </p>
          </div>
          <Link href="/admin/products" className="text-xs font-medium text-ink hover:underline">
            View all
          </Link>
        </CardHeader>
        <CardContent>
          {recentProducts.length === 0 ? (
            <div className="text-center py-12 text-muted text-sm">
              <Package className="size-8 mx-auto text-muted/60 mb-2" />
              <p>No products yet. Click &quot;Manage Products&quot; to add your first item.</p>
            </div>
          ) : (
            <div className="divide-y divide-rule/60">
              {recentProducts.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="size-10 rounded-md object-cover bg-paper shrink-0 border border-rule"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink truncate">
                        {p.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-muted">
                        <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                          {p.category.name}
                        </Badge>
                        {p.price && <span className="font-mono">{formatCurrency(Number(p.price))}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="text-muted hover:text-ink p-1.5 rounded hover:bg-paper transition-colors"
                      title="Open affiliate link"
                    >
                      <ExternalLink className="size-4" />
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
