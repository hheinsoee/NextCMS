import { NextResponse } from "next/server";

const errCode: Record<string, number> = {
  P2025: 404,
  default: 500,
};

export const errorResponse = (err: string | any, code: string | number) => {
  if (code in errCode) {
    return NextResponse.json(
      typeof err == "string"
        ? { message: err }
        : { ...err },
      {
        status: errCode[code],
      }
    );
  } else {
    return NextResponse.json(
      typeof err == "string" ? { message: err } : { ...err },
      {
        status: errCode["default"],
      }
    );
  }
};
