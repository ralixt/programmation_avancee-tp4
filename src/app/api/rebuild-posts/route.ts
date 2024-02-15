import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {

    const apiKey = process.env.SUPABASE_WEBHOOK_KEY;

    const apiKeyHeader = request.headers.get('API-Key');

    if (!apiKeyHeader) return NextResponse.json({
        error : "API-Key header is missing"
    }, {status: 401});

    if(apiKeyHeader !== apiKey) return NextResponse.json({
        error : "API Key is not valid"
    }, {status: 403});

    console.log("apiKeyHeader :", apiKeyHeader);

    return NextResponse.json({
        revalidated: true,
        date: new Date()
    });

}
