import { useRouter } from 'next/dist/client/router';

export default function Home() {
  const router = useRouter();
  router.push('/dashboard');
  return <></>;
}
