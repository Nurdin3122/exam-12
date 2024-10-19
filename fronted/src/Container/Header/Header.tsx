import React from 'react';
import {useAppSelector} from "../../app/hooks.ts";
import {userState} from "../../Components/User/SliceUser.tsx";
import HeaderForLogin from "./HeaderForLogin.tsx";
import HeaderForAnon from "./HeaderForAnon.tsx";

const Header = () => {
    const user = useAppSelector(userState)
    return (
        <div>
            {
                user ? (
                    <HeaderForLogin/>
                ) : (
                    <HeaderForAnon/>
                )
            }
        </div>
    );
};

export default Header;