const db = require('../models/database');

class SweetService {
  async addSweet(sweetData) {
    const { name, category, price, quantity, description } = sweetData;
    const result = await db.run(
      'INSERT INTO sweets (name, category, price, quantity, description) VALUES (?, ?, ?, ?, ?)',
      [name, category, price, quantity, description]
    );
    return { id: result.id, ...sweetData };
  }

  async getAllSweets() {
    return await db.all('SELECT * FROM sweets ORDER BY created_at DESC');
  }

  async getSweetById(id) {
    return await db.get('SELECT * FROM sweets WHERE id = ?', [id]);
  }

  async updateSweet(id, sweetData) {
    const { name, category, price, quantity, description } = sweetData;
    await db.run(
      'UPDATE sweets SET name = ?, category = ?, price = ?, quantity = ?, description = ? WHERE id = ?',
      [name, category, price, quantity, description, id]
    );
    return await this.getSweetById(id);
  }

  async deleteSweet(id) {
    const result = await db.run('DELETE FROM sweets WHERE id = ?', [id]);
    return result.changes > 0;
  }

  async purchaseSweet(id, quantityToPurchase = 1) {
    const sweet = await this.getSweetById(id);
    if (!sweet) { throw new Error('Sweet not found'); }
    if (sweet.quantity < quantityToPurchase) { throw new Error('Insufficient quantity available'); }
    const newQuantity = sweet.quantity - quantityToPurchase;
    await db.run('UPDATE sweets SET quantity = ? WHERE id = ?', [newQuantity, id]);
    return await this.getSweetById(id);
  }

  async restockSweet(id, quantityToAdd) {
    const sweet = await this.getSweetById(id);
    if (!sweet) { throw new Error('Sweet not found'); }
    const newQuantity = sweet.quantity + quantityToAdd;
    await db.run('UPDATE sweets SET quantity = ? WHERE id = ?', [newQuantity, id]);
    return await this.getSweetById(id);
  }

  async searchSweets(searchParams) {
    const { name, category, minPrice, maxPrice } = searchParams;
    let query = 'SELECT * FROM sweets WHERE 1=1';
    let params = [];
    if (name) {
      query += ' AND name LIKE ?';
      params.push(`%${name}%`);
    }
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    if (minPrice) {
      query += ' AND price >= ?';
      params.push(minPrice);
    }
    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(maxPrice);
    }
    query += ' ORDER BY created_at DESC';
    return await db.all(query, params);
  }
}

module.exports = new SweetService();