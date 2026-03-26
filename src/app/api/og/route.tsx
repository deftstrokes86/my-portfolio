import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const fontData = fetch(
  new URL('../../../public/og/Inter-Bold.ttf', import.meta.url)
).then((res) => res.arrayBuffer()).catch(() => undefined as unknown as ArrayBuffer);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Stephen Maclaurin Igwebuike';
  const subtitle = searchParams.get('subtitle') || 'Designer-Engineer & Author';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background:
            'radial-gradient(1200px 600px at -10% -10%, #0b1220 40%, #05070c 60%)',
          color: '#ffffff',
          padding: '72px',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        <div style={{ marginTop: 12, fontSize: 28, opacity: 0.8 }}>{subtitle}</div>
        <div style={{ position: 'absolute', bottom: 32, right: 48, fontSize: 20, opacity: 0.6 }}>
          stephenigwebuike.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        fontData
          ? { name: 'Inter', data: await fontData, weight: 700, style: 'normal' }
          : // fallback to system font if TTF not found
            { name: 'sans-serif', data: new ArrayBuffer(0) as any, weight: 700, style: 'normal' },
      ],
    }
  );
}
