import { ObjectId } from 'mongodb';
import { collections } from '../db.js';



export const stockOut = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Product ID and quantity required' });
    }
    const product = await collections.inventory().findOne({ _id: new ObjectId(String(productId)) });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const profitPerUnit = product.salePrice - product.purchasePrice;
    const totalProfit = profitPerUnit * quantity;

    await collections.inventory().updateOne({ _id: new ObjectId(String(productId)) }, { $inc: { quantity: -quantity } });
    //  await saveFruitStockReport();
    let salesmanName = 'Unknown Seller';
    if (req.user?.id) {
      const user = await collections.user().findOne({
        _id: new ObjectId(String(req.user.id)),
      });
      if (user) salesmanName = user.name;
    }

    await collections.stockLogs().insertOne({
      productId: new ObjectId(String(productId)),
      productName: product.name,
      quantity,
      unit: product.unit,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      profit: totalProfit,
      soldBy: req.user?.id || null,
      salesmanName,
      soldAt: new Date(),
    });

    res.json({ success: true, message: 'Sale recorded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const getStockLogs = async (req, res) => {
  try {
    const { type } = req.query;
    const now = new Date();
    let start, end;

    if (type === 'daily') {
      start = new Date();
      start.setHours(0, 0, 0, 0);
      end = new Date();
      end.setHours(23, 59, 59, 999);
    } else if (type === 'monthly') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    } else if (type === 'yearly') {
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    } else {
      start = new Date(0);
      end = new Date();
    }

    const query = {
      soldAt: { $gte: start, $lte: end },
    };

    // console.log("User from token:", req.user);

    if (req.user?.role === 'salesman') {
      query.soldBy = String(req.user.id);
    }

    const logs = await collections.stockLogs().find(query).toArray();

    return res.json({ success: true, logs });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getReports = async (req, res) => {
  try {
    const { type } = req.query;
    let start, end;
    const now = new Date();

    if (type === 'daily') {
      start = new Date();
      start.setHours(0, 0, 0, 0);
      end = new Date();
      end.setHours(23, 59, 59, 999);
    } else if (type === 'monthly') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
    } else if (type === 'yearly') {
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
    }
    let query = {};
    if (type !== 'all') {
      query = { soldAt: { $gte: start, $lte: end } };
    }
    const logs = await collections.stockLogs().find(query).toArray();
    const products = await collections.inventory().find().toArray();
    const users = await collections.user().find().toArray();

    let totalProfit = 0;
    const logsWithNames = logs.map((log) => {
      const product = products.find((p) => String(p._id) === String(log.productId));
      const user = users.find((u) => String(u._id) === String(log.soldBy));

      const purchasePrice = Number(log.purchasePrice) || 0;
      const salePrice = Number(log.salePrice) || 0;
      const quantity = Number(log.quantity) || 0;

      totalProfit += (salePrice - purchasePrice) * quantity;
      return {
        ...log,
        productName: product ? product.name : 'Unknown Product',
        sellerName: user ? user.name : 'Unknown Seller',
        profit: (salePrice - purchasePrice) * quantity,
      };
    });
    res.json({
      success: true,
      range: type || 'all',
      logs,
      totalProfit,
    });
  } catch (err) {
    res.json({
      success: true,
      range: type || 'all',
      logs,
      totalProfit,
    });
  }
};

export const getStockSummary = async (req, res) => {
  try {
    const now = new Date();

    const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

    const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
    const endOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));

    const startOfYear = new Date(Date.UTC(now.getUTCFullYear(), 0, 1, 0, 0, 0, 0));
    const endOfYear = new Date(Date.UTC(now.getUTCFullYear(), 11, 31, 23, 59, 59, 999));

    const [dailyOut, monthlyOut, yearlyOut] = await Promise.all([
      collections
        .stockLogs()
        .aggregate([
          { $match: { soldAt: { $gte: startOfDay, $lte: endOfDay } } },
          { $group: { _id: null, total: { $sum: { $toInt: '$quantity' } } } },
        ])
        .toArray(),
      collections
        .stockLogs()
        .aggregate([
          { $match: { soldAt: { $gte: startOfMonth, $lte: endOfMonth } } },
          { $group: { _id: null, total: { $sum: { $toInt: '$quantity' } } } },
        ])
        .toArray(),
      collections
        .stockLogs()
        .aggregate([
          { $match: { soldAt: { $gte: startOfYear, $lte: endOfYear } } },
          { $group: { _id: null, total: { $sum: { $toInt: '$quantity' } } } },
        ])
        .toArray(),
    ]);

    const [dailyIn, monthlyIn, yearlyIn] = await Promise.all([
      collections
        .stockIn()
        .aggregate([{ $match: { stockInDate: { $gte: startOfDay, $lte: endOfDay } } }, { $group: { _id: null, total: { $sum: '$quantity' } } }])
        .toArray(),
      collections
        .stockIn()
        .aggregate([{ $match: { stockInDate: { $gte: startOfMonth, $lte: endOfMonth } } }, { $group: { _id: null, total: { $sum: '$quantity' } } }])
        .toArray(),
      collections
        .stockIn()
        .aggregate([{ $match: { stockInDate: { $gte: startOfYear, $lte: endOfYear } } }, { $group: { _id: null, total: { $sum: '$quantity' } } }])
        .toArray(),
    ]);

    const inventory = await collections.inventory().find().toArray();

    const totalProducts = inventory.length;

    const remainingstock = inventory.reduce((acc, item) => acc + Number(item.quantity || 0), 0);

    const totalValue = inventory.reduce((acc, item) => acc + Number(item.quantity || 0) * Number(item.purchasePrice || 0), 0);

    const lowStockItems = inventory.filter((item) => Number(item.quantity || 0) <= 5);

    const itemSummaries = await Promise.all(
      inventory.map(async (item) => {
        const [dailyInItem, monthlyInItem, yearlyInItem] = await Promise.all([
          collections
            .inventory()
            .aggregate([
              {
                $match: {
                  _id: item._id,
                  stockInDate: { $gte: startOfDay, $lte: endOfDay },
                },
              },
              { $group: { _id: null, total: { $sum: '$quantity' } } },
            ])
            .toArray(),
          collections
            .inventory()
            .aggregate([
              {
                $match: {
                  _id: item._id,
                  stockInDate: { $gte: startOfMonth, $lte: endOfMonth },
                },
              },
              { $group: { _id: null, total: { $sum: '$quantity' } } },
            ])
            .toArray(),
          collections
            .inventory()
            .aggregate([
              {
                $match: {
                  _id: item._id,
                  stockInDate: { $gte: startOfYear, $lte: endOfYear },
                },
              },
              { $group: { _id: null, total: { $sum: '$quantity' } } },
            ])
            .toArray(),
        ]);

        const [dailyOutItem, monthlyOutItem, yearlyOutItem] = await Promise.all([
          collections
            .stockLogs()
            .aggregate([
              {
                $match: {
                  productId: item._id,
                  soldAt: { $gte: startOfDay, $lte: endOfDay },
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: { $toInt: '$quantity' } },
                },
              },
            ])
            .toArray(),
          collections
            .stockLogs()
            .aggregate([
              {
                $match: {
                  productId: item._id,
                  soldAt: { $gte: startOfMonth, $lte: endOfMonth },
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: { $toInt: '$quantity' } },
                },
              },
            ])
            .toArray(),
          collections
            .stockLogs()
            .aggregate([
              {
                $match: {
                  productId: item._id,
                  soldAt: { $gte: startOfYear, $lte: endOfYear },
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: { $toInt: '$quantity' } },
                },
              },
            ])
            .toArray(),
        ]); // Calculate percentage for each item

        const percentage = remainingstock > 0 ? (Number(item.quantity) / remainingstock) * 100 : 0;
        return {
          itemId: item._id,
          name: item.name,
          remaining: item.quantity || 0,
          percentage: parseFloat(percentage.toFixed(2)), 
          unit: item.unit || 0,
          purchasePrice: item.purchasePrice || 0,
          salePrice: item.salePrice || 0,
          stockIn: {
            daily: dailyInItem[0]?.total || 0,
            monthly: monthlyInItem[0]?.total || 0,
            yearly: yearlyInItem[0]?.total || 0,
          },
          stockOut: {
            daily: dailyOutItem[0]?.total || 0,
            monthly: monthlyOutItem[0]?.total || 0,
            yearly: yearlyOutItem[0]?.total || 0,
          },
        };
      }),
    );

    res.json({
      success: true,
      stockIn: {
        daily: dailyIn[0]?.total || 0,
        monthly: monthlyIn[0]?.total || 0,
        yearly: yearlyIn[0]?.total || 0,
      },
      stockOut: {
        daily: dailyOut[0]?.total || 0,
        monthly: monthlyOut[0]?.total || 0,
        yearly: yearlyOut[0]?.total || 0,
      },
      remainingstock,
      items: itemSummaries,
      totalProducts,
      totalValue: totalValue.toFixed(2),
      lowStockItems: lowStockItems.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const saveMonthlySalesData = async () => {
  try {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();

    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59, 999);

    const salesData = await collections
      .stockLogs()
      .aggregate([
        {
          $match: {
            soldAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
          },
        },

        {
          $group: {
            _id: null,
            totalSales: {
              $sum: { $multiply: [{ $toDouble: '$quantity' }, { $toDouble: '$salePrice' }] },
            },
            totalProfit: {
              $sum: { $toDouble: '$profit' },
            },
          },
        },
      ])
      .toArray();

    if (salesData.length > 0) {
      const { totalSales, totalProfit } = salesData[0];
      const monthName = monthNames[lastMonthStart.getMonth()];

      const newDoc = {
        type: 'monthly_summary',
        month: monthName,
        year: lastMonthStart.getFullYear(),
        totalSales: totalSales,
        totalProfit: totalProfit,
        createdAt: new Date(),
      };

      await collections.profitGraph().insertOne(newDoc);
      console.log(`Monthly sales and profit data for ${monthName} saved to profitGraph.`);
      return { success: true, data: newDoc };
    } else {
      console.log('No sales data found for the last month.');
      return { success: false, message: 'No data found.' };
    }
  } catch (error) {
    console.error('Error saving monthly sales data:', error);
    return { success: false, message: error.message };
  }
};

export const getProfitGraphData = async (req, res) => {
  try {
    const data = await collections.profitGraph().find({ type: 'monthly_summary' }).sort({ year: 1, month: 1 }).toArray();

    res.json(data);
  } catch (error) {
    console.error('Error fetching profit graph data:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
