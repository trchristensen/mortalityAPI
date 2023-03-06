import { serve } from 'https://deno.land/std/http/server.ts';

const messages = await Deno.readTextFile('messages.txt')
    .then((text) => text.trim().split('\n'));

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

function requestHandler(request: Request) {
    const { url } = request;
    const { pathname } = new URL(url, `http://${request.headers.get("host")}`);

    if (pathname === '/') {
        const responseJson = { messages };
        return new Response(JSON.stringify(responseJson), {
            headers: { 'Content-Type': 'application/json' },
        });
    } else if (pathname === '/random') {
        const randomMessage = getRandomMessage();
        const responseJson = { message: randomMessage };
        return new Response(JSON.stringify(responseJson), {
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response('404 Not Found', { status: 404 });
    }
}

serve(requestHandler, { port: 8000 });
