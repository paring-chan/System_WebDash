import React from 'react';
import {NextPageContext} from "next";
import fetch from "node-fetch";

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

export const getServerSideProps = async (ctx: NextPageContext) => {
    const code = ctx.query.code
    if (!code) {
        return {
            props: {}
        }
    }

    const res = await fetch('https://discord.com/api/v8/oauth2/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID
        })
    })

    return {
        props: {}
    }
}

export default Callback;