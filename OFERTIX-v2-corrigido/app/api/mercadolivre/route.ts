import {NextRequest,NextResponse} from "next/server";
export async function GET(req:NextRequest){
 const q=req.nextUrl.searchParams.get("q")?.trim();
 if(!q)return NextResponse.json({results:[]});
 try{
  const r=await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=24`,{next:{revalidate:60}});
  if(!r.ok)return NextResponse.json({error:"Mercado Livre indisponível no momento."},{status:502});
  const d=await r.json();
  return NextResponse.json({results:(d.results||[]).map((p:any)=>({id:String(p.id),title:p.title,price:p.price,currency:p.currency_id,condition:p.condition,permalink:p.permalink,thumbnail:p.thumbnail,seller:p.seller?.nickname||"Vendedor",free_shipping:!!p.shipping?.free_shipping}))});
 }catch{return NextResponse.json({error:"Falha ao consultar o Mercado Livre."},{status:500})}
}
