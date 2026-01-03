import { NextResponse } from "next/server";
import { buildPortfolio } from "@/services/portfolio";

export async function GET() {
  try {
    const data = await buildPortfolio();

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch portfolio",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
