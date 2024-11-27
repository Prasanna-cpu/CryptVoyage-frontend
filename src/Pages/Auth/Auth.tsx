import React from 'react';
import "./Auth.css";
import SignUpForm from "./SignUpForm.tsx";
import {Button} from "../../components/ui/button.tsx";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import ForgotPassword from "./ForgotPassword.tsx";
import SignInForm from "./SignInForm.tsx";

const Auth : React.FunctionComponent= () => {

    const navigate:NavigateFunction=useNavigate()
    const location=useLocation()

    return (
        <div className={"h-screen relative authContainer text-white"}>
            <div className={"absolute top-0 left-0 bottom-0 right-0 bg-[#030712] bg-opacity-50"}>

                <div className={"bgBlure  absolute top-1/2 left-1/2 transform -translate-x-1/2 " +
                    " -translate-y-1/2 box flex flex-col justify-center items-center  " +
                    "h-[35rem] w-[30rem]  rounded-md z-50 bg-black bg-opacity-50 shadow-2xl shadow-white"}>

                    {/*<div className={"text-xl"}>*/}
                    {/*    <span className={"font-bold text-orange-700"}>Crypt</span>*/}
                    {/*    <span className={}>Voyage</span>*/}
                    {/*</div>*/}
                    <h1 className={"text-6xl text-orange-300 font-bold pb-9"}>
                        <span className={"text-orange-500"}>
                            Crypt
                        </span>

                        <span className={"text-white"}>
                            Voyage
                        </span>
                    </h1>

                    {
                        location.pathname==="/signup"? (
                            <section>
                                <SignUpForm/>

                                <div className={"flex items-center justify-center"}>
                            <span className={"text-white"}>
                                Already have account?
                            </span>

                                    <Button onClick={()=>navigate("/signin")}>
                                        Sign In
                                    </Button>

                                </div>

                            </section>
                        ):location.pathname==="/forgot-password"?(
                            <section>
                                <ForgotPassword/>

                                <div className={"flex items-center justify-center"}>
                            <span className={"text-white"}>
                                Back to log in
                            </span>

                                    <Button onClick={() => navigate("/signin")}>
                                        Sign In
                                    </Button>

                                </div>
                            </section>
                        ) : (
                            <section>
                                <SignInForm/>
                                <div className={"flex items-center justify-center"}>
                            <span className={""}>
                                Don't have account?
                            </span>

                                    <Button onClick={() => navigate("/signup")}>
                                        Sign Up
                                    </Button>

                                </div>
                                <div className={"flex items-center justify-center"}>
                            <span className={""}>
                                Forgot Password ?
                            </span>

                                    <Button onClick={() => navigate("/forgot-password")}>
                                        Change Password
                                    </Button>

                                </div>
                            </section>
                        )
                    }


                </div>

            </div>
        </div>
    );
};

export default Auth;