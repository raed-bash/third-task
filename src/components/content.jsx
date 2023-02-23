import { useContext } from "react";
import { PageContext } from "../App";
import Users from "./users/users";

export default function Content() {

    const [page] = useContext(PageContext)
    switch (page) {
        case 'home':
            return <h1>Home</h1>
        case 'users':
            return <Users />
        default:
            return <h1>home</h1>
    }
}