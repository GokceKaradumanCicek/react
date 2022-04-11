import { Fragment } from "react"
import MainHeader from "../components/MainHeader"

const Layout=(props)=>{
    return <div>
        <MainHeader/>
        <main>{props.children}</main>
    </div>
}
export default Layout;