import React from 'react';
import {NextPageContext} from "next";
import axios from 'axios'
import {DiscordTokenResult} from "../types";

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

    const tokenResult = await axios.post('https://discord.com/api/v8/oauth2/token', new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        redirect_uri: process.env.DISCORD_CALLBACK_URI,
        scope: 'identify email guilds',
        code: code as string,
        grant_type: 'authorization_code'
    }))
    // const access_token = (await res.json()).access_token

    const tokenData = tokenResult.data as DiscordTokenResult



    return {
        props: {}
    }
}

export default Callback;