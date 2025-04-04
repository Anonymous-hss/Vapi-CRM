import { google } from "googleapis";
import bcrypt from "bcrypt";
import { prisma } from "../index";

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

// Function to sync data from Google Sheets
export const syncGoogleSheetData = async () => {
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const sheetName = process.env.GOOGLE_SHEET_NAME || "Sheet1";

    if (!sheetId) {
      console.error("Google Sheet ID not provided");
      return;
    }

    console.log(`Starting Google Sheet sync for sheet: ${sheetId}`);

    // Get the last sync record
    const syncRecord = await prisma.googleSheetSync.findFirst({
      where: {
        sheetId,
        sheetName,
      },
      orderBy: {
        lastSyncedAt: "desc",
      },
    });

    // Get data from Google Sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      console.log("No data found in Google Sheet");
      return;
    }

    // Get header row (column names)
    const headers = rows[0];

    // Find indices for required columns
    const nameIndex = headers.findIndex((header: string) =>
      header.toLowerCase().includes("name")
    );
    const emailIndex = headers.findIndex((header: string) =>
      header.toLowerCase().includes("email")
    );
    const phoneIndex = headers.findIndex((header: string) =>
      header.toLowerCase().includes("phone")
    );
    const sourceIndex = headers.findIndex((header: string) =>
      header.toLowerCase().includes("source")
    );

    if (nameIndex === -1) {
      console.error("Name column not found in Google Sheet");
      return;
    }

    // Skip header row and process data rows
    const dataRows = rows.slice(1);

    // If we have a sync record, only process new rows
    const startRow = syncRecord?.lastRowCount || 0;
    const newRows = dataRows.slice(startRow);

    console.log(`Processing ${newRows.length} new rows from Google Sheet`);

    // Find an admin user to assign as creator
    let adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!adminUser) {
      console.error("No admin user found to assign as creator");

      // Create a default admin user if none exists
      const hashedPassword = await bcrypt.hash("admin123", 10);

      try {
        const newAdmin = await prisma.user.create({
          data: {
            name: "Default Admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "ADMIN",
          },
        });

        console.log("Created default admin user:", newAdmin.email);

        // Use the newly created admin
        adminUser = newAdmin;
      } catch (error) {
        console.error("Failed to create default admin user:", error);
        return;
      }
    }

    // Process each new row
    for (const [index, row] of newRows.entries()) {
      const name = row[nameIndex] || "";
      const email = emailIndex !== -1 ? row[emailIndex] : null;
      const phone = phoneIndex !== -1 ? row[phoneIndex] : null;
      const source = sourceIndex !== -1 ? row[sourceIndex] : "Google Sheets";

      // Skip rows without a name
      if (!name) continue;

      // Check if customer already exists by email or phone
      let customer = null;

      if (email) {
        customer = await prisma.customer.findUnique({
          where: { email },
        });
      }

      if (!customer && phone) {
        customer = await prisma.customer.findFirst({
          where: { phone },
        });
      }

      // Create or update customer
      if (customer) {
        // Update existing customer
        await prisma.customer.update({
          where: { id: customer.id },
          data: {
            name,
            email: email || customer.email,
            phone: phone || customer.phone,
            source: "Google Sheets",
            externalId: `${sheetId}-${startRow + index + 1}`,
            updatedAt: new Date(),
          },
        });

        console.log(`Updated customer: ${name}`);
      } else {
        // Create new customer
        await prisma.customer.create({
          data: {
            name,
            email: email || null,
            phone: phone || null,
            status: "New",
            tags: ["Lead", "Google Sheets"],
            source: "Google Sheets",
            externalId: `${sheetId}-${startRow + index + 1}`,
            userId: adminUser.id,
          },
        });

        console.log(`Created new customer: ${name}`);
      }
    }

    // Update or create sync record
    if (syncRecord) {
      await prisma.googleSheetSync.update({
        where: { id: syncRecord.id },
        data: {
          lastSyncedAt: new Date(),
          lastRowCount: rows.length - 1, // Exclude header row
        },
      });
    } else {
      await prisma.googleSheetSync.create({
        data: {
          sheetId,
          sheetName,
          lastSyncedAt: new Date(),
          lastRowCount: rows.length - 1, // Exclude header row
        },
      });
    }

    console.log("Google Sheet sync completed successfully");
  } catch (error) {
    console.error("Google Sheet sync error:", error);
  }
};

// Function to start periodic sync
export const startGoogleSheetSync = () => {
  // Initial sync
  syncGoogleSheetData();

  // Set up interval for periodic sync (every 5 minutes)
  const syncInterval = 5 * 60 * 1000; // 5 minutes in milliseconds

  setInterval(() => {
    syncGoogleSheetData();
  }, syncInterval);

  console.log(
    `Google Sheet sync scheduled to run every ${syncInterval / 60000} minutes`
  );
};
