import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import client from '../../../utils/cms';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get('secret');
  const draftKey = searchParams.get('draftKey');
  const contentId = searchParams.get('contentId');
  const redirect = searchParams.get('redirect') || '/';

  if (secret !== process.env.MICROCMS_PREVIEW_SECRET) {
    return new NextResponse('Invalid secret', { status: 401 });
  }

  if (!draftKey) {
    return new NextResponse('Missing draftKey', { status: 400 });
  }

  // draftKey が有効か MicroCMS に確認
  if (contentId) {
    try {
      await client.get({
        endpoint: 'blogs',
        contentId,
        queries: { draftKey },
      });
    } catch {
      return new NextResponse('Invalid draftKey', { status: 401 });
    }
  }

  const draft = await draftMode();
  draft.enable();

  const response = NextResponse.redirect(new URL(redirect, request.url));
  response.cookies.set('microcms-draft-key', draftKey, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return response;
}
