import React from 'react';
import {userService} from '../services/userService';

class LogoutPage extends React.Component {
    constructor(props) {
        super(props);
        props.setLoggedIn();

    }

    render() {
        userService.logout();
        return (
            <div>
                <p>Logged out successful!</p>
            </div>
        );
    }
}

export default LogoutPage;