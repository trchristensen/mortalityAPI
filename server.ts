import { serve } from 'https://deno.land/std@0.178.0/http/server.ts';

const messages = await Deno.readTextFile('messages.txt')
    .then((text) => text.trim().split('\n'));

function getRandomMessage() {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

function requestHandler() {
    const randomMessage = getRandomMessage();
    return new Response(randomMessage);
}

serve(requestHandler);
