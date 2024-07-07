import db from '../config/database.js';

export const createReceiptModel = async (data) => {
  console.log(data);
  const { user_id, total_amount, discount_amount, total_amount_with_discount, delivery_street, delivery_house_number, delivery_city, delivery_postal_code, cart_items } = data;

  const receiptQuery = `
    INSERT INTO racun (user_id, total_amount, discount_amount, total_amount_with_discount, delivery_street, delivery_house_number, delivery_city, delivery_postal_code)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [receiptResult] = await db.query(receiptQuery, [
    user_id,
    total_amount,
    discount_amount,
    total_amount_with_discount,
    delivery_street,
    delivery_house_number,
    delivery_city,
    delivery_postal_code
  ]);

  const receiptId = receiptResult.insertId;

  const itemsQuery = `
    INSERT INTO racun_stavke (racun_id, product_id, quantity, unit_price, total_price)
    VALUES (?, ?, ?, ?, ?)
  `;

  if (!Array.isArray(cart_items)) {
    throw new Error('cart_items should be an array');
  }

  for (const item of cart_items) {
    const { product_id, quantity, unit_price, total_price } = item;
    await db.query(itemsQuery, [
      receiptId,
      product_id,
      quantity,
      unit_price,
      total_price
    ]);
  }

  return receiptId;
};
