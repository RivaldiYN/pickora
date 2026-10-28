import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@pickora.local";
  const adminPassword = process.env.ADMIN_PASSWORD || "adminpassword123";

  // Upsert Admin User
  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword },
    create: {
      email: adminEmail,
      name: "Pickora Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Admin user ensured: ${admin.email}`);

  // Seed Default Categories
  const categoriesData = [
    {
      name: "Running",
      slug: "running",
      description: "High-performance running shoes, apparel, and recovery tech.",
    },
    {
      name: "Cycling",
      slug: "cycling",
      description: "Aerodynamic helmets, bike computers, and road cycling gear.",
    },
    {
      name: "Tech & Audio",
      slug: "tech",
      description: "Cutting-edge wireless audio, smart wearables, and workspace tools.",
    },
    {
      name: "Random Finds",
      slug: "random",
      description: "Unconventional lifestyle gadgets, EDC tools, and design picks.",
    },
  ];

  const categoriesMap: Record<string, string> = {};

  for (const cat of categoriesData) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, description: cat.description },
      create: cat,
    });
    categoriesMap[cat.slug] = record.id;
  }

  console.log("Categories seeded successfully.");

  // Seed Initial Curated Products
  const productsData = [
    {
      title: "Nike Vaporfly 3 Carbon Road Shoes",
      description: "Engineered for marathoners chasing peak pace with full-length carbon Flyplate and ultra-responsive ZoomX foam.",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      affiliateUrl: "https://example.com/affiliate/nike-vaporfly-3",
      price: 259.99,
      featured: true,
      categoryId: categoriesMap["running"],
    },
    {
      title: "Garmin Forerunner 965 AMOLED GPS",
      description: "Premium titanium bezel lightweight multisport watch with brilliant AMOLED touchscreen and advanced training metrics.",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      affiliateUrl: "https://example.com/affiliate/garmin-forerunner-965",
      price: 599.99,
      featured: true,
      categoryId: categoriesMap["running"],
    },
    {
      title: "Wahoo ELEMNT BOLT V2 GPS Computer",
      description: "Aerodynamic cycling computer featuring crystal-clear 64-color screen, turnkey navigation, and wireless route sync.",
      imageUrl: "https://images.unsplash.com/photo-1502744688674-c619d3f86c9e?auto=format&fit=crop&w=800&q=80",
      affiliateUrl: "https://example.com/affiliate/wahoo-elemnt-bolt-v2",
      price: 279.00,
      featured: true,
      categoryId: categoriesMap["cycling"],
    },
    {
      title: "POC Omne Air MIPS Aero Road Helmet",
      description: "Slim profile and precision ventilation channels with integrated MIPS 360-degree rotational impact protection.",
      imageUrl: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
      affiliateUrl: "https://example.com/affiliate/poc-omne-air-mips",
      price: 180.00,
      featured: false,
      categoryId: categoriesMap["cycling"],
    },
    {
      title: "Sony WH-1000XM5 Noise Cancelling Headphones",
      description: "Industry-leading dual-processor noise cancellation, ultra-comfortable lightweight design, and 30-hour battery life.",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      affiliateUrl: "https://example.com/affiliate/sony-wh1000xm5",
      price: 349.99,
      featured: true,
      categoryId: categoriesMap["tech"],
    },
    {
      title: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
      description: "Full CNC aluminum body, hot-swappable tactile switches, and double-gasket acoustic dampening for pure typing precision.",
      imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      affiliateUrl: "https://example.com/affiliate/keychron-q1-pro",
      price: 199.00,
      featured: false,
      categoryId: categoriesMap["tech"],
    },
    {
      title: "Titanium EDC Multi-Tool Carabiner",
      description: "Precision-machined Grade 5 titanium pocket multitool with integrated bottle opener, pry bar, and hex wrenches.",
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      affiliateUrl: "https://example.com/affiliate/titanium-edc-carabiner",
      price: 45.00,
      featured: false,
      categoryId: categoriesMap["random"],
    },
  ];

  for (const prod of productsData) {
    const existing = await prisma.product.findFirst({
      where: { title: prod.title },
    });
    if (!existing) {
      await prisma.product.create({
        data: prod,
      });
    }
  }

  console.log("Curated products seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
