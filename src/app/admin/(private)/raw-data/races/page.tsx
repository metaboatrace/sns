import Container from '@/features/admin/raw-data/races/components/container';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    date?: string;
    stadium_tel_code?: string;
  };
}) {
  return (
    <Container
      page={searchParams?.page}
      date={searchParams?.date}
      stadiumTelCode={searchParams?.stadium_tel_code}
    />
  );
}
