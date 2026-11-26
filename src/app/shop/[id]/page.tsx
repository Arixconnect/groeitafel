import { accessories } from "@/data/products";
import { ProductDetail } from "@/components/Pages";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return accessories.map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: accessories.find((p) => p.id === id)?.name || "Product" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = accessories.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
