import { NextPageContext } from "next";
import { useSession, signOut, getSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <h1 className="text-red-700 text-4xl bg-yellow-300">
        Welcome to the First page
      </h1>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  return {
    props: {
      session,
    },
  };
}
