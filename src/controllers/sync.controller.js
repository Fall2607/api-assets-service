import { pool } from "../db.js";

export const syncDepartments = async (req, res) => {
  try {
    // 1. Ambil data dari HR API
    const response = await fetch("http://182.253.37.107:3000/api/departments");

    if (!response.ok) {
      throw new Error("Gagal mengambil data dari HR API");
    }

    const departments = await response.json();

    if (!Array.isArray(departments)) {
      throw new Error("Format data HR tidak valid");
    }

    // 2. Sync ke unit_cache
    for (const dept of departments) {
      await pool.query(
        `
        INSERT INTO unit_cache (
          id_departemen_hr,
          nama_departemen,
          jenis_departemen,
          last_sync_at,
          updated_at
        )
        VALUES ($1, $2, $3, NOW(), NOW())
        ON CONFLICT (id_departemen_hr)
        DO UPDATE SET
          nama_departemen  = EXCLUDED.nama_departemen,
          jenis_departemen = EXCLUDED.jenis_departemen,
          last_sync_at     = NOW(),
          updated_at       = NOW()
        `,
        [dept.id, dept.nama_departemen, dept.jenis_departemen]
      );
    }

    return res.json({
      status: "success",
      total: departments.length,
    });
  } catch (error) {
    console.error("SYNC DEPARTEMEN ERROR:", error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
