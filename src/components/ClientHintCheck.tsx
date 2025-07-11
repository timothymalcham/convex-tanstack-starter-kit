import { useRouter } from "@tanstack/react-router";
import * as React from "react";
import { hintsUtils, subscribeToSchemeChange } from "~/utils/theme";

export function ClientHintCheck({ nonce }: { nonce?: string }) {
    const router = useRouter();

    React.useEffect(
        () =>
            subscribeToSchemeChange(() => {
                // Force a page reload to rerun the loader with new hints
                window.location.reload();
            }),
        [],
    );

    return (
        <script
            nonce={nonce}
            dangerouslySetInnerHTML={{
                __html: hintsUtils.getClientHintCheckScript(),
            }}
        />
    );
}
