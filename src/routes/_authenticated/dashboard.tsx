import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { api } from "convex/_generated/api";
import { Loader } from "~/components/Loader";

export const Route = createFileRoute("/_authenticated/dashboard")({
    component: Home,
    pendingComponent: () => <Loader />,
});

function Home() {
    const boardsQuery = useSuspenseQuery(convexQuery(api.board.getBoards, {}));

    return (
        <div className="p-8 space-y-2">
            <h1 className="text-2xl font-black">Boards</h1>
            <ul className="flex flex-wrap list-disc">
                {boardsQuery.data.map((board) => (
                    <li key={board.id} className="ml-4">
                        <Link
                            to="/boards/$boardId"
                            params={{
                                boardId: board.id,
                            }}
                            className="font-bold text-blue-500"
                        >
                            {board.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
