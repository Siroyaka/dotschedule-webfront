import { Buffer } from 'buffer';

const stringArray = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '-', '_'
]

export const hashed = async (value: string) => {
    const rand = new Uint8Array(16);
    const randomUint = crypto.getRandomValues(rand);
    let saltText = '';
    for(const i of randomUint) {
        saltText += stringArray[i % 64];
    }
    const randNum = Math.floor(Math.random() * 6) + 14;
    return await inHashed(value, saltText, randNum);
}

const inHashed = async (value: string, salt: string, count: number) => {
    const eValue = new TextEncoder().encode(value + salt);
    const countEnd = Math.floor(Math.pow(1.25, count));
    let abf = await crypto.subtle.digest('SHA-512', eValue); 
    for(let i = 1; i < countEnd; i++) {
        abf = await crypto.subtle.digest('SHA-512', eValue);
    }
    const ui = new Uint8Array(abf);
    const hashHex = Buffer.from(ui).toString('hex');
    return `${salt}!${count}!${hashHex}`;
}

export const compareHash = async (hash: string, value: string) => {
    const ar = hash.split('!');
    if(ar.length !== 3) return false;

    const count = parseInt(ar[1]);
    if(isNaN(count)) return false;

    const salt = ar[0];

    const valueHashed = await inHashed(value, salt, count);

    return valueHashed === hash;
}
