"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderTree, Package, ExternalLink, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";

interface AdminNavProps {
  userEmail?: string | null;
}

export function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin",
      label: "Overview",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: Package,
      active: pathname.startsWith("/admin/products"),
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: FolderTree,
      active: pathname.startsWith("/admin/categories"),
    },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div>
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-black">
              P
            </span>
            <span>Pickora Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-1">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Management
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  link.active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <Icon className={cn("h-4 w-4", link.active ? "text-blue-700" : "text-slate-400")} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-slate-100 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
            View Public Site
          </span>
          <span className="text-slate-400">↗</span>
        </Link>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="truncate mr-2">
            <p className="text-xs font-medium text-slate-900 truncate">
              {userEmail || "Admin"}
            </p>
            <p className="text-[11px] text-slate-400">Administrator</p>
          </div>
          <button
            onClick={() => logoutAction()}
            title="Sign out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

