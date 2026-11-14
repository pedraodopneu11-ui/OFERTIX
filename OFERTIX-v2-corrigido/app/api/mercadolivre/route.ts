
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q) return NextResponse.json({ results: [] });

  try {
    const r = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=24`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          "User-Agent": "OFERTIX/2.1"
        }
      }
    );

    if (!r.ok) {
      const details = await r.text();

      return NextResponse.json({
        error: "Mercado Livre indisponível.",
        status: r.status,
        details: details.slice(0, 500)
      }, { status: 502 });
    }

    const d = await r.json();

    return NextResponse.json({
      results: (d.results || []).map((p: any) => ({
        id: String(p.id),
        title: p.title,
        price: p.price,
        currency: p.currency_id,
        condition: p.condition,
        permalink: p.permalink,
        thumbnail: p.thumbnail,
        seller: p.seller?.nickname || "Vendedor",
        free_shipping: !!p.shipping?.free_shipping
      }))
    });

  } catch (error) {
    return NextResponse.json({
      error: "Falha ao consultar o Mercado Livre.",
      details: String(error)
    }, { status: 500 });
  }
}
