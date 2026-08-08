const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding expanded hotel database...");

  await prisma.hotel.deleteMany({});

  await prisma.hotel.createMany({
    data: [
      {
        name: "Grand Taj Palace",
        type: "hotel",
        city: "delhi",
        address: "Connaught Place, New Delhi",
        cheapestPrice: 1500,
        photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
        desc: "Luxury stay in the heart of Delhi with modern amenities and free Wi-Fi.",
        rating: 4.8,
        featured: true,
      },
      {
        name: "The Imperial Delhi",
        type: "hotel",
        city: "delhi",
        address: "Janpath, New Delhi",
        cheapestPrice: 2200,
        photos: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"],
        desc: "Heritage luxury property with fine dining and private gardens.",
        rating: 4.9,
        featured: true,
      },
      {
        name: "Kanpur Residency Stay",
        type: "hotel",
        city: "kanpur",
        address: "Civil Lines, Kanpur",
        cheapestPrice: 1100,
        photos: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d"],
        desc: "Comfortable rooms near Kanpur Central, ideal for business trips.",
        rating: 4.5,
        featured: true,
      },
      {
        name: "Kanpur Central Suites",
        type: "apartment",
        city: "kanpur",
        address: "Mall Road, Kanpur",
        cheapestPrice: 950,
        photos: ["https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"],
        desc: "Affordable luxury suites located right next to the central market.",
        rating: 4.3,
        featured: true,
      },
      {
        name: "Ganges View Resort",
        type: "resort",
        city: "varanasi",
        address: "Ghat Road, Varanasi",
        cheapestPrice: 1800,
        photos: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"],
        desc: "Serene Ganges views with luxury rooms and authentic local dining.",
        rating: 4.9,
        featured: true,
      },
      {
        name: "The Royal Residency",
        type: "hotel",
        city: "lucknow",
        address: "Hazratganj, Lucknow",
        cheapestPrice: 1400,
        photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945"],
        desc: "Premium stay experience in Hazratganj with delicious Mughlai cuisine.",
        rating: 4.6,
        featured: true,
      },
      {
        name: "Marine Drive View Hotel",
        type: "hotel",
        city: "mumbai",
        address: "Marine Drive, Mumbai",
        cheapestPrice: 2500,
        photos: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"],
        desc: "Iconic oceanview stay close to South Mumbai destinations.",
        rating: 4.7,
        featured: true,
      },
    ]
  });

  console.log("Database seeded with expanded properties!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });