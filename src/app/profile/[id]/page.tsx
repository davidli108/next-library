import { Metadata } from "next";
import { getUser } from "@/lib/user";
import { formatDate } from "@/lib/utils";
import { getLoans } from "@/lib/loan";
import { listBooks } from "@/lib/book";
import { CurrentlyReading } from "@/components/currently-reading";
import { PreviouslyRead } from "@/components/previously-read";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const id = params.id;
  const user = await getUser(id);
  return {
    title: user?.name || "User Not Found",
  };
}

export default async function User({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const userLoans = await getLoans(params.id);

  const activeLoans = userLoans?.filter((loan) => loan.active);
  const deactivateLoans = userLoans?.filter((loan) => !loan.active);

  const books = await listBooks();
  const currentlyReading = books
    ? activeLoans?.map((loan) =>
        books.find((book) => book.isbn === loan.bookId),
      )
    : [];
  const previouslyRead = books
    ? deactivateLoans?.map((loan) =>
        books.find((book) => book.isbn === loan.bookId),
      )
    : [];

  return (
    <main className="mx-auto w-full max-w-7xl flex-grow rounded-md border border-taupe border-opacity-40 bg-white p-16 text-text shadow-search">
      {user ? (
        <>
          <div>
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p>Member since {formatDate(user.createdAt)}</p>
          </div>
          {currentlyReading && currentlyReading?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold">Currently reading:</h2>
              <CurrentlyReading
                currentlyReading={currentlyReading}
                activeLoans={activeLoans}
                userId={params.id}
              />
            </div>
          )}
          {previouslyRead && previouslyRead?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold">Previously read:</h2>
              <PreviouslyRead previouslyRead={previouslyRead} />
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
