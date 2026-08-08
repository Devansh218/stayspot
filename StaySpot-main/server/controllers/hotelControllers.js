const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET ALL HOTELS / SEARCH / FEATURED
// GET ALL HOTELS / MULTI-CITY / DATE & PRICE FILTER
const getHotels = async (req, res) => {
  try {
    const { min, max, featured, city, limit } = req.query;
    const whereCondition = {};

    // Multi-city selection support (e.g., ?city=kanpur,delhi,lucknow)
    if (city && city.trim() !== "") {
      const cityList = city
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c.length > 0);

      if (cityList.length === 1) {
        whereCondition.city = {
          equals: cityList[0],
          mode: "insensitive",
        };
      } else if (cityList.length > 1) {
        whereCondition.OR = cityList.map((c) => ({
          city: { equals: c, mode: "insensitive" },
        }));
      }
    }

    // Featured Filter
    if (featured !== undefined && featured !== "") {
      whereCondition.featured = featured === "true";
    }

    // Price Range Filter
    const minPrice = parseInt(min);
    const maxPrice = parseInt(max);

    if (!isNaN(minPrice) || !isNaN(maxPrice)) {
      whereCondition.cheapestPrice = {
        gte: !isNaN(minPrice) ? minPrice : 0,
        lte: !isNaN(maxPrice) ? maxPrice : 999999,
      };
    }

    const hotels = await prisma.hotel.findMany({
      where: whereCondition,
      take: limit ? parseInt(limit) : undefined,
    });

    res.status(200).json(hotels || []);
  } catch (err) {
    console.error("Error in getHotels:", err.message);
    res.status(200).json([]);
  }
};

// COUNT BY CITY
const countByCity = async (req, res) => {
  try {
    const citiesParam = req.query.cities || req.query.city || "";
    const cities = citiesParam ? citiesParam.split(",") : [];

    const list = await Promise.all(
      cities.map(async (city) => {
        try {
          return await prisma.hotel.count({
            where: { city: { equals: city.trim(), mode: 'insensitive' } },
          });
        } catch {
          return 0;
        }
      })
    );
    res.status(200).json(list);
  } catch (err) {
    console.error("DEBUG ERR [countByCity]:", err.message);
    res.status(200).json([]);
  }
};

// COUNT BY TYPE
const countByType = async (req, res) => {
  try {
    const types = ['hotel', 'apartment', 'resort', 'villa', 'cabin'];
    const result = await Promise.all(
      types.map(async (type) => {
        const count = await prisma.hotel.count({
          where: { type: { equals: type, mode: 'insensitive' } }
        }).catch(() => 0);
        return { type, count };
      })
    );

    res.status(200).json(result);
  } catch (err) {
    console.error("DEBUG ERR [countByType]:", err.message);
    res.status(200).json([]);
  }
};

const createHotel = async (req, res) => {
  try {
    const savedHotel = await prisma.hotel.create({ data: req.body });
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await prisma.hotel.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteHotel = async (req, res) => {
  try {
    await prisma.hotel.delete({ where: { id: req.params.id } });
    res.status(200).json("Hotel deleted successfully.");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHotel = async (req, res) => {
  try {
    const hotel = await prisma.hotel.findUnique({ where: { id: req.params.id } });
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
};