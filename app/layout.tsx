import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"OFERTIX | Painel de ofertas",description:"As melhores oportunidades, em um só lugar."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
