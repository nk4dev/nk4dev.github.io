import { NextRequest, NextResponse } from 'next/server';

const IGNORED_PATHS = /^\/(api|_next\/static|_next\/image|favicon\.ico)/;

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (IGNORED_PATHS.test(pathname)) {
    return NextResponse.next();
  }

  const draftKey = searchParams.get('draftKey');

  // draftKey が付いてきた場合 → draft 有効化 API にリダイレクト
  if (draftKey) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/draft';
    url.searchParams.set('draftKey', draftKey);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
