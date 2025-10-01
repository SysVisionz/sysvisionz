import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/privacy",
                destination: "https://app.termly.io/policy-viewer/policy.html?policyUUID=458abc2a-6de8-4bc9-a1e6-83665904c4ad",
                basePath: false,
                permanent: false
            }
        ]
    }
};

export default nextConfig;
