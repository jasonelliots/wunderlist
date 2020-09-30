import React from "react";
import Div from "../stylingComponents/Div";
import H2 from "../stylingComponents/H2";
import NavStyling from "../stylingComponents/NavStyling";
import NavLink from "../stylingComponents/NavLink";
import ATags from "../stylingComponents/ATags";

export default function Nav() {
    return (
        <Div class='navigation'>
            <H2>wunderlist</H2>
            <NavStyling>
                <ATags
                    href='https://hungry-boyd-1bf6ae.netlify.app/'
                    target='_blank'
                >
                    Home
                </ATags>
                <ATags
                    href='https://hungry-boyd-1bf6ae.netlify.app/about_us.html'
                    target='_blank'
                >
                    Team
                </ATags>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/signup'>Signup</NavLink>
                <NavLink to='/dashboard'>Dashboard</NavLink>
            </NavStyling>
        </Div>
    );
}
