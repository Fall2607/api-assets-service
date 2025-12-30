import { pool } from "../db.js";

async function seedAssets() {
  const assets = [
    [
      "Dell OptiPlex 7090",
      "Computer",
      "Dell",
      "OptiPlex 7090",
      "DL-2024-001",
      "Emergency Department",
      "Emergency",
      "excellent",
      "active",
      "2024-01-15",
      "2027-01-15",
    ],
    [
      "HP LaserJet Pro M404n",
      "Printer",
      "HP",
      "LaserJet Pro M404n",
      "HP-2024-045",
      "Radiology",
      "Radiology",
      "good",
      "active",
      "2023-08-20",
      "2026-08-20",
    ],
    [
      "Dell UltraSharp U2720Q",
      "Monitor",
      "Dell",
      "UltraSharp U2720Q",
      "DL-2023-198",
      "ICU Station 2",
      "Intensive Care",
      "fair",
      "maintenance",
      "2023-03-10",
      "2026-03-10",
    ],
    [
      "Cisco Catalyst 9300",
      "Network Equipment",
      "Cisco",
      "Catalyst 9300",
      "CS-2022-089",
      "IT Server Room",
      "IT",
      "excellent",
      "active",
      "2022-11-05",
      "2027-11-05",
    ],
    [
      "HP EliteBook 850",
      "Computer",
      "HP",
      "EliteBook 850 G8",
      "HP-2024-112",
      "Cardiology",
      "Cardiology",
      "poor",
      "damaged",
      "2023-05-12",
      "2026-05-12",
    ],
    [
      "Epson WorkForce ES-500W",
      "Scanner",
      "Epson",
      "WorkForce ES-500W",
      "EP-2023-067",
      "Administration",
      "Administration",
      "good",
      "active",
      "2023-09-18",
      "2026-09-18",
    ],
    [
      "Dell PowerEdge R750",
      "Server",
      "Dell",
      "PowerEdge R750",
      "DL-2023-234",
      "IT Server Room",
      "IT",
      "excellent",
      "active",
      "2023-02-28",
      "2028-02-28",
    ],
    [
      "HP Color LaserJet M455dn",
      "Printer",
      "HP",
      "Color LaserJet M455dn",
      "HP-2022-156",
      "Pharmacy",
      "Pharmacy",
      "good",
      "active",
      "2022-07-22",
      "2025-07-22",
    ],
    [
      "Lenovo ThinkCentre M90a",
      "Computer",
      "Lenovo",
      "ThinkCentre M90a",
      "LN-2021-099",
      "Outpatient",
      "Outpatient",
      "fair",
      "disposed",
      "2021-04-10",
      "2024-04-10",
    ],
    [
      'Samsung 32" Curved Monitor',
      "Monitor",
      "Samsung",
      "C32H711",
      "SM-2024-023",
      "Laboratory",
      "Laboratory",
      "excellent",
      "active",
      "2024-02-05",
      "2027-02-05",
    ],
  ];

  const query = `
    INSERT INTO assets
    (name, category, brand, model, serial_number, location, department, condition, status, purchase_date, warranty_expiry)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    ON CONFLICT (serial_number) DO NOTHING
  `;

  for (const asset of assets) {
    await pool.query(query, asset);
  }

  console.log("Assets seeded");
}

async function seedMaintenance() {
  const records = [
    [
      "DL-2023-198",
      "2024-12-15",
      "Repair",
      "John Smith",
      "Replaced faulty display cable",
      "completed",
    ],
    [
      "HP-2024-112",
      "2024-12-20",
      "Diagnostic",
      "Sarah Johnson",
      "Water damage assessment",
      "pending",
    ],
    [
      "HP-2024-045",
      "2024-11-28",
      "Preventive Maintenance",
      "Mike Davis",
      "Routine cleaning and toner replacement",
      "completed",
    ],
    [
      "CS-2022-089",
      "2024-12-10",
      "Firmware Update",
      "John Smith",
      "Security patch installation",
      "completed",
    ],
    [
      "DL-2023-234",
      "2025-01-05",
      "Preventive Maintenance",
      "Mike Davis",
      "Scheduled system health check",
      "scheduled",
    ],
  ];

  const query = `
    INSERT INTO maintenance_records
    (asset_id, date, type, technician, notes, status)
    SELECT id, $2, $3, $4, $5, $6
    FROM assets
    WHERE serial_number = $1
  `;

  for (const record of records) {
    await pool.query(query, record);
  }

  console.log("Maintenance records seeded");
}

async function runSeeder() {
  try {
    await seedAssets();
    await seedMaintenance();
    console.log("Seeding completed");
  } catch (err) {
    console.error("Seeder error:", err);
  } finally {
    await pool.end();
    process.exit();
  }
}

runSeeder();
