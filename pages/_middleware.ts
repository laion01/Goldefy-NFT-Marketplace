import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req, ev) {
    const { pathname, origin } = req.nextUrl
    if (pathname == '/') {
        return NextResponse.redirect(`${origin}/goldypets`)
    }
    if (pathname == '/account/inventory') {
        return NextResponse.redirect(`${origin}/account/inventory/goldy`)
    }
    if (pathname == '/account/history') {
        return NextResponse.redirect(`${origin}/account/history/goldy`)
    }
    return NextResponse.next()
}