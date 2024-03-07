"use client";

import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

const User = () => {
    const {
        permissions,
        isLoading,
        user,
        accessToken,
        organization,
        userOrganizations,
        getPermission,
        getBooleanFlag,
        getIntegerFlag,
        getFlag,
        getStringFlag,
        getClaim,
        getAccessToken,
        getToken,
        getIdToken,
        getOrganization,
        getPermissions,
        getUserOrganizations
    } = useKindeBrowserClient();

    // console.log(getPermission("eat:chips"));
    console.log(getBooleanFlag("flag", false));
    console.log(getIntegerFlag("eat:chips", 1));
    console.log(getStringFlag("eat:chips", "ds"));
    console.log(getFlag("eat:chips", false, "b"));

    console.log("accessToken", accessToken);
    console.log(getClaim("aud"));

    console.log(userOrganizations);
    console.log(user)
    if (isLoading) return <div>Loading...</div>;

    return (
        <main>
            Hi
        </main>
    );
}

export default User;