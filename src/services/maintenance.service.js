import { pool } from "../db.js";

export const findAll = async () => {
  const { rows } = await pool.query(`
    SELECT
      m.id,
      m.date,
      m.type,
      m.technician,
      m.notes,
      m.status,
      m.created_at,
      a.id AS asset_id,
      a.name AS asset_name,
      a.serial_number
    FROM maintenance_records m
    JOIN assets a ON a.id = m.asset_id
    ORDER BY m.date DESC
  `);
  return rows;
};

export const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM maintenance_records WHERE id = $1`,
    [id]
  );
  return rows[0];
};

export const create = async (data) => {
  const { asset_id, date, type, technician, notes, status } = data;

  const { rows } = await pool.query(
    `
    INSERT INTO maintenance_records
    (asset_id, date, type, technician, notes, status)
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [asset_id, date, type, technician, notes, status]
  );

  return rows[0];
};

export const update = async (id, data) => {
  const { date, type, technician, notes, status } = data;

  const { rows } = await pool.query(
    `
    UPDATE maintenance_records
    SET date = $1,
        type = $2,
        technician = $3,
        notes = $4,
        status = $5
    WHERE id = $6
    RETURNING *
    `,
    [date, type, technician, notes, status, id]
  );

  return rows[0];
};

export const remove = async (id) => {
  await pool.query(`DELETE FROM maintenance_records WHERE id = $1`, [id]);
};
