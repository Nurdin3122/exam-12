import React from 'react';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {userState} from "../../Components/User/SliceUser.tsx";
import {logout} from "../../Components/User/UserThunks.tsx";
import logoForAnonUser from "../../assets/logoForAnnonUser.jpg"
import {apiURL} from "../../AxiosApi/baseUrl.ts";

const HeaderForLogin = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(userState);

    const handleLogout = () => {
        dispatch(logout());
    };

    let cardImage = logoForAnonUser
    if (!user.image) {
        cardImage = apiURL + "/" + user.image;
    }

    return (
        <>
            <nav className="d-flex navbar navbar-expand-lg">
                <div className="container-fluid">

                    <Link to="/" className="navbar-brand mb-0 h1">Logo</Link>

                    <div className="d-flex justify-content-end collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="me-3 navbar-nav">
                            <li className="nav-item dropdown">
                                <p className="nav-link dropdown-toggle" data-bs-toggle="dropdown"
                                   aria-expanded="false" style={{
                                    margin: 0,
                                    padding: 0,
                                    display: "inline-block",
                                    verticalAlign: "middle"
                                }}>
                                    {user.displayName ? user.displayName : user.username}
                                </p>
                                <ul className="dropdown-menu text-center">
                                    <li>
                                        <button type="button" className="btn btn-close-white" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div style={{
                        width: "50px",
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        overflow: 'hidden'
                    }}>
                        <img style={{width: '100%', height: "auto"}} src={`${cardImage}`}
                             alt={user.displayName}/>
                    </div>

                </div>
            </nav>

        </>
    );
};

export default HeaderForLogin;