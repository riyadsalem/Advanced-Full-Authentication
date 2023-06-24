import { NextPageContext } from "next";
import { useSession, signOut, getSession, signIn } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        {session ? (
          <div className="flex flex-col gap-1 items-center">
            <h2>{session?.user?.name}</h2>
            <h6>{session?.user?.email}</h6>
            <span>
              Provider : <b>{session?.user?.provider}</b>
            </span>
            <img
              src={session?.user?.image!}
              alt=""
              className="w-32 h-32 rounded-full"
            />
            <button onClick={() => signOut()}>SIGN OUT</button>
          </div>
        ) : (
          <button onClick={() => signIn()}>SIGN IN</button>
        )}
      </div>
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
