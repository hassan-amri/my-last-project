import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET() {
  try {
    // Obtain a database connection from the pool
    const db = await pool.getConnection();
    
    // Define the SQL query to fetch all rows from the 'customer' table
    const query = "select * from customer";
    
    // Execute the SQL query
    const [rows] = await db.execute(query);
    
    // Release the database connection back to the pool
    db.release();
    
    // Return the fetched rows as a JSON response
    return NextResponse.json(rows);
  } catch (error) {
    // Return an error response in case of an exception
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
