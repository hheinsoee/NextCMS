import { NextResponse } from "next/server";

const errCode: Record<string, number> = {
  P2025: 404,
  default: 500,
};

export const errorResponse = (err: any | number, message?: string) => {
  const code = err.code || "default";
  const m = message || null;
  if (code in errCode) {
    return NextResponse.json(m || { code: errCode[code] }, {
      status: errCode[code],
    });
  } else {
    return NextResponse.json(m || { code: errCode[code] }, {
      status: errCode["default"],
    });
  }
};
