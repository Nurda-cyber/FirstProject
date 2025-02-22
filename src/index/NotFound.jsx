import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <div>
            <h1>NotFound</h1>
            <p>Go to the <Link to="/FirstPage">HomePage</Link>.</p>
        </div>

    );
}