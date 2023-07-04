import Background from "@/components/Backgrounds/Background";
import ResetForm from "@/components/forms/Reset";
import { NextPageContext } from "next";

export default function Reset({ token }: { token: string }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/*--Background here--*/}
        <Background image={`"../../auth/reset.jpg"`} />

        {/*----Form----*/}
        <div className="w-full sm:w5/6 md:w-2/3 lg:w1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white flex flex-col items-center justify-center">
          <ResetForm token={token} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const { query } = ctx;
  const token = query.token;
  return {
    props: { token },
  };
}
