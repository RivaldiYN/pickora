"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderTree, Package, ExternalLink, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/lib/actions/auth";

interface AdminNavProps {
  userEmail?: string | null;
}

export function AdminNav({ userEmail }: AdminNavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
    <>
      {/* Mobile top bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-rule bg-surface sticky top-0 z-30">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Pickora"
            width={116}
            height={24}
            className="h-6 w-auto object-contain"
          />
          <span className="font-mono text-[10px] text-muted border border-rule px-1.5 py-0.5 rounded">
            ADMIN
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="size-9 inline-flex items-center justify-center rounded-md border border-rule text-ink"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-ink/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "w-60 border-r border-rule bg-surface flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 transition-transform md:translate-x-0",
          mobileOpen ? "fixed inset-y-0 left-0 translate-x-0 shadow-lg" : "fixed inset-y-0 left-0 -translate-x-full md:static"
        )}
      >
        <div>
          <div className="h-16 px-6 flex items-center justify-between border-b border-rule">
            <Link href="/admin" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Pickora"
                width={116}
                height={24}
                className="h-6 w-auto object-contain"
              />
              <span className="font-mono text-[10px] text-muted border border-rule px-1.5 py-0.5 rounded">
                ADMIN
              </span>
            </Link>
            {mobileOpen && (
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="md:hidden size-8 inline-flex items-center justify-center text-muted"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <nav className="p-3 space-y-1">
            <p className="px-3 text-[10px] font-mono uppercase tracking-wider text-muted mb-2">
              Catalog
            </p>
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 min-h-10 rounded-md text-sm font-medium transition-colors",
                    link.active
                      ? "bg-ink text-white"
                      : "text-muted hover:text-ink hover:bg-paper"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-rule space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 min-h-9 rounded-md text-xs font-medium text-muted hover:text-ink hover:bg-paper transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="size-3.5" />
              Public Site
            </span>
          </Link>

          <div className="pt-3 border-t border-rule flex items-center justify-between">
            <div className="truncate mr-2">
              <p className="text-xs font-medium text-ink truncate">
                {userEmail || "Admin"}
              </p>
              <p className="text-[10px] font-mono text-muted uppercase">Administrator</p>
            </div>
            <button
              type="button"
              onClick={() => logoutAction()}
              title="Sign out"
              className="size-8 inline-flex items-center justify-center rounded-md text-muted hover:text-accent hover:bg-accent/5 transition-colors cursor-pointer"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
