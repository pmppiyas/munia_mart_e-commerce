import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'MUNIAMART - Your Trusted Modern E-Commerce Destination';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#09090b',
          backgroundImage:
            'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.35), transparent 70%), radial-gradient(circle at 80% 80%, rgba(29, 78, 216, 0.2), transparent 50%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Subtle decorative grid border */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '32px',
            backgroundColor: 'rgba(18, 18, 21, 0.75)',
            padding: '48px',
          }}
        >
          {/* Logo Badge Container */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '28px',
            }}
          >
            {/* Primary Blue Icon Container */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '96px',
                height: '96px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                boxShadow: '0 20px 40px rgba(37, 99, 235, 0.45)',
                marginRight: '24px',
              }}
            >
              {/* Shopping Bag SVG Icon */}
              <svg
                width="54"
                height="54"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>

            {/* Brand Text */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: '64px',
                  fontWeight: 900,
                  letterSpacing: '-2px',
                  color: '#ffffff',
                }}
              >
                MUNIA
              </span>
              <span
                style={{
                  marginLeft: '12px',
                  fontSize: '28px',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  padding: '6px 16px',
                  borderRadius: '12px',
                }}
              >
                MART
              </span>
            </div>
          </div>

          {/* Tagline / Subtitle */}
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 800,
              textAlign: 'center',
              letterSpacing: '-0.5px',
              maxWidth: '860px',
              lineHeight: 1.3,
              marginBottom: '16px',
              color: '#f4f4f5',
            }}
          >
            Your Trusted Modern E-Commerce Destination
          </h1>

          <p
            style={{
              fontSize: '20px',
              color: '#a1a1aa',
              textAlign: 'center',
              maxWidth: '720px',
              marginBottom: '36px',
            }}
          >
            Discover thousands of premium products across Electronics, Fashion, Home &amp; Living with lightning-fast delivery.
          </p>

          {/* Badges / Value Props */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '16px',
                fontWeight: 700,
                color: '#60a5fa',
              }}
            >
              ⚡ Fast Delivery
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '16px',
                fontWeight: 700,
                color: '#34d399',
              }}
            >
              🔒 100% Secure Checkout
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '9999px',
                padding: '8px 20px',
                fontSize: '16px',
                fontWeight: 700,
                color: '#fbbf24',
              }}
            >
              ✨ Authentic Products
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
