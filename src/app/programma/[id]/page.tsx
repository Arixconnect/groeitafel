import { evenings } from "@/data/program";
import { EventDetail } from "@/components/Pages";
import { notFound } from "next/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return evenings.map((e) => ({ id: e.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return { title: evenings.find((e) => e.id === id)?.title || "Avond" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = evenings.find((e) => e.id === id);
  if (!event) notFound();
  return <EventDetail event={event} />;
}
