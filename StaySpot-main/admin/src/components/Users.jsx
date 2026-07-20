import useFetch from "../hooks/useFetch";
import Table from "./Table";

const Users = () => {
    document.title = "StaySpot | Users";
    const { data } = useFetch("http://localhost:3000/api/user");
    return (
        <div className="w-full">
            <h1 className="bg-zinc-900 text-zinc-300 font-bold text-3xl px-5 py-3">
                All Users
            </h1>
            <Table headers={["username", "email", "isAdmin"]} data={data} />
        </div>
    );
};

export default Users;
