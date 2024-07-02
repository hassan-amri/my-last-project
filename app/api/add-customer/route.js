import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function POST(request) {
  try {
    const { name, email } = await request.json(); // Assuming the data is sent as JSON
    
    // Additional validation/sanitization of input values
    
    const db = await pool.getConnection();
    if(name && email) {
const query = "INSERT INTO customer (name, email) VALUES (?, ?)";
    await db.execute(query, [name, email]);
    db.release();
    }else{
      return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
    }
    

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
