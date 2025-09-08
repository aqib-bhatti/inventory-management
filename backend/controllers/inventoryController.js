import { ObjectId } from "mongodb";
import { collections } from "../db.js";
// import { saveFruitStockReport } from "./stockController.js";
export const addInventory = async (req, res) => {
  try {
    const { name, quantity, unit, purchasePrice, salePrice } = req.body;

    const existingItem = await collections.inventory().findOne({ name });

    if (existingItem) {
      const updated = await collections.inventory().updateOne(
        { _id: existingItem._id },
        {
          $inc: { quantity: Number(quantity) },
          $set: {
            unit,
            purchasePrice: Number(purchasePrice), 
            salePrice: Number(salePrice), 
            stockInDate: new Date(),
            updatedAt: new Date(),
          },
        }
      );
      // await saveFruitStockReport();

      await collections.stockIn().insertOne({
        itemId: existingItem._id,
        name,
        quantity: Number(quantity),
        unit,
        purchasePrice: Number(purchasePrice), 
        salePrice: Number(salePrice), 
        stockInDate: new Date(),
        createdAt: new Date(),
      });

      return res.status(200).json({ success: true, updated: true });
    }

    const newItem = await collections.inventory().insertOne({
      name,
      quantity: Number(quantity),
      unit,
      purchasePrice: Number(purchasePrice), 
      salePrice: Number(salePrice), 
      stockInDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // await saveFruitStockReport();
    const insertedItem = await collections
      .inventory()
      .findOne({ _id: newItem.insertedId });

    await collections.stockIn().insertOne({
      itemId: newItem.insertedId,
      name,
      quantity: Number(quantity),
      unit,
      purchasePrice: Number(purchasePrice), 
      salePrice: Number(salePrice), 
      stockInDate: new Date(),
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({ success: true, inserted: true, item: insertedItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// get All
export const getAllInventory = async (req, res) => {
  try {
    const items = await collections.inventory().find().toArray();
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get One

export const getInventoryById = async (req, res) => {
  try {
    const item = await collections.inventory().findOne({
      _id: new ObjectId(String(req.user.id)),
    });
    if (!item) {
      res.status(404).json({ error: "item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    
    
    const { name, quantity, unit, purchasePrice, salePrice } = req.body;

    const updateData = {
      name,
      unit,
      
      quantity: Number(quantity),
      purchasePrice: Number(purchasePrice),
      salePrice: Number(salePrice),
      lastStockIn: new Date(),
    };

    const update = await collections.inventory().updateOne(
      { _id: new ObjectId(String(id)) },
      {
        $set: updateData, 
      }
    );

    if (update.matchedCount === 0) {
      return res.status(404).json({ error: "item not found" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// delete item

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params; // frontend se jo id aayi
    const delItem = await collections.inventory().deleteOne({
      _id: new ObjectId(String(id)),
    });

    if (delItem.deletedCount === 0)
      return res.status(404).json({ error: "Item not found" });

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};