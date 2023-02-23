import { Link, useLocation } from "react-router-dom"

export default function NavLiLink(props) {
    const location = useLocation()
    const activeClass = location.pathname === props.to ? 'active' : ''
    return (
        <li className={activeClass}>
            <Link {...props}></Link>
        </li>
    )
}