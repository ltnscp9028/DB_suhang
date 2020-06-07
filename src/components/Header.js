import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'
import '../style/Header.css';
class Header extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN)
        return (
            // <div className="flex pa1 justify-between nowrap orange">
            <div className="header_wrapper">
                <div className="title_flex">
                    {/* <div className="link_font">DB SUHANG!</div> */}
                    <div className="link_wrapper"><Link to="/new/1" className="link_noneWeight">Home</Link></div>
                    <div className="link_wrapper"><Link to="/top" className="link_noneWeight">
                        top
                    </Link></div>
                    <div className="link_wrapper"><Link to="/search" className="link_noneWeight">
                        search
                    </Link></div>
                    {authToken && (
                        <div className="link_wrapper">
                            <div className="flex">
                                <Link to="/create" className="link_noneWeight">
                                    submit
                  </Link>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-fixed">
                    {authToken ? (
                        <div className="link_wrapper">
                            <div
                                className="link_noneWeight"
                                onClick={() => {
                                    localStorage.removeItem(AUTH_TOKEN)
                                    this.props.history.push(`/`)
                                }}
                            >
                                logout
                        </div></div>
                    ) : (
                            <div className="link_wrapper"><Link to="/login" className="link_noneWeight">
                                login
                            </Link></div>
                        )}
                </div>
            </div >
        )
    }
}

export default withRouter(Header)