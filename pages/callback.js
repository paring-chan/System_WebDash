import React from 'react';

const Callback = () => {
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        if (!code) {
            window.opener.location.reload()
            return window.close()
        }
    }, [])
    return (
        <div>
            로그인 처리중...
        </div>
    );
};

export default Callback;