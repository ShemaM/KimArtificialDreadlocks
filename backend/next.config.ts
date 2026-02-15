import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  serverExternalPackages: ['sharp', 'twilio'],
};

export default withPayload(nextConfig);
