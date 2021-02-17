import React from 'react';
import {NextPageContext} from "next";

const Callback = () => {
    React.useEffect(() => {
        if (!window.opener) return
        window.opener.location.reload()
        window.close()
    }, [])
    return (
        <div>
            로그인 처리중...
        </div>
    );
};

export const getServerSideProps = (ctx: NextPageContext) => {
    console.log(ctx.query.code)
    return {
        props: {}
    }
}

export default Callback;