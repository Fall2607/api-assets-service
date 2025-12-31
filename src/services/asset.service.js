import { pool } from "../db.js";

export async function create(asset) {
  const query = `
    INSERT INTO assets (
      name,
      category,
      brand,
      model,
      serial_number,
      location,
      department,
      condition,
      status,
      purchase_date,
      warranty_expiry
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *
  `;

  const values = [
    asset.name,
    asset.category,
    asset.brand || null,
    asset.model || null,
    asset.serialNumber,
    asset.location || null,
    asset.department || null,
    asset.condition,
    asset.status,
    asset.purchaseDate || null,
    asset.warrantyExpiry || null
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
}

export const findAll = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM assets ORDER BY created_at DESC`
  );
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM assets WHERE id = $1`, [id]);
  return rows[0];
};

export const update = async (id, data) => {
  const { rows } = await pool.query(
    `UPDATE assets SET
      name=$1, category=$2, brand=$3, model=$4,
      serial_number=$5, location=$6, department=$7,
      condition=$8, status=$9, purchase_date=$10, warranty_expiry=$11,
      updated_at=NOW()
     WHERE id=$12
     RETURNING *`,
    [
      data.name,
      data.category,
      data.brand,
      data.model,
      data.serialNumber,
      data.location,
      data.department,
      data.condition,
      data.status,
      data.purchaseDate,
      data.warrantyExpiry,
      id,
    ]
  );
  return rows[0];
};

export const remove = async (id) => {
  await pool.query(`DELETE FROM assets WHERE id=$1`, [id]);
};
