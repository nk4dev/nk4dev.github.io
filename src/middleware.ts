// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get('accept') || '';

  // エージェント（text/markdownを要求）の場合
  if (acceptHeader.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    
    // /blog/123 のようなパスからIDを抽出してAPIへ転送
    // 例: /api/blog-markdown?id=123
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1];

    url.pathname = '/api/blog-markdown';
    url.searchParams.set('id', id);

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// /blog/以下のパスにのみ適用
export const config = {
  matcher: '/blog/:id*', 
};