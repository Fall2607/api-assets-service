import { pool } from "../db.js";

/**
 * GET /api/units
 * List unit (dropdown friendly)
 */
export const getUnits = async (req, res) => {
  try {
    const { jenis, source } = req.query;

    let query = `
      SELECT
        id_departemen_hr,
        nama_departemen,
        jenis_departemen
      FROM unit_cache
      WHERE 1=1
    `;

    const params = [];

    if (jenis) {
      params.push(jenis);
      query += ` AND jenis_departemen = $${params.length}`;
    }

    if (source) {
      params.push(source);
      query += ` AND source = $${params.length}`;
    }

    query += ` ORDER BY nama_departemen ASC`;

    const result = await pool.query(query, params);

    return res.json(result.rows);
  } catch (error) {
    console.error("Get units error:", error);
    return res.status(500).json({
      message: "Gagal mengambil data unit",
    });
  }
};

/**
 * GET /api/units/:id
 * Detail unit
 */
export const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        id_departemen_hr,
        nama_departemen,
        jenis_departemen,
        source
      FROM unit_cache
      WHERE id = $1
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Unit tidak ditemukan",
      });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Get unit detail error:", error);
    return res.status(500).json({
      message: "Gagal mengambil detail unit",
    });
  }
};
