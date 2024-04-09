const sbox = [
    [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76], 
    [0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0],
    [0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15],
    [0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75],
    [0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84],
    [0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf],
    [0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8],
    [0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2],
    [0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73],
    [0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb],
    [0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79],
    [0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08],
    [0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a],
    [0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e],
    [0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf],
    [0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16]

];
const rcon = [
    0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1B, 0x36
];
const mixColumnsMatrix = [
    [2, 3, 1, 1],
    [1, 2, 3, 1],
    [1, 1, 2, 3],
    [3, 1, 1, 2]
];

// Function to convert a character to its hexadecimal representation with '0x' prefix
function charToHex(character) {
    const codePoint = character.charCodeAt(0);
    const hexString = "0x" + codePoint.toString(16).toUpperCase(); // Ensure uppercase and add '0x' prefix
    return hexString;
}

// Function to convert a hexadecimal string with '0x' prefix to its corresponding character
function hexToChar(hexString) {

    hexString = String(hexString).replace(/^0x/i, '');

    const char = String.fromCharCode(hexString);
    return char;
}

//Encrypt
// Example usage:
let plaintext = "This is a sample";
let keyText = "aesEncryptionKey";

plaintextField = document.getElementById("plainText");
TextkeyField = document.getElementById("keyText");

function convertInput(Text) {
    const state = [];
    for (let i = 0; i < 4; i++) {
        state.push([]);
        for (let j = 0; j < 4; j++) {
            state[i].push(charToHex(Text[i * 4 + j]));
        }
    }
    return state;
    
}

function convertOutput(state) {
    let Text = "";
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            Text += hexToChar(state[i][j]);
        }
    }
    return Text;
}
let state;
state = convertInput(plaintext); // OK
let key = convertInput(keyText); // OK
console.log(key);
console.log(state);


function subBytes(state) {
    const newState = [];
    for (let i = 0; i < 4; i++) {
        newState.push([]);
        for (let j = 0; j < 4; j++) {
            const row = state[i][j] >> 4;
            const col = state[i][j] & 0xf;
            const safeRow = row % 16; // Ensure row index stays within bounds
            const safeCol = col % 16; // Ensure col index stays within bounds
            newState[i].push(sbox[safeRow][safeCol]);
        }
    }
    return newState;
}

//OK
function shiftRows(state) {
    const newState = [];
    for (let i = 0; i < 4; i++) {
        newState.push(rotateLeft(state[i], i));
    }
    return newState;
}

 //OK
function rotateLeft(word, number) {
    if (number === 1) {
        // Rotate left by one position
        const tmp = word[0];
        word[0] = word[1]; word[1] = word[2]; word[2] = word[3]; word[3] = tmp;    
    } else if (number === 2) {
        // Rotate left by two positions
        const tmp = word[0];
        const tmp1 = word[1];
        word[0] = word[2]; word[1] = word[3]; word[2] = tmp; word[3] = tmp1;
        
    } else if (number === 3) {
        // Rotate left by three positions
        const tmp = word[0];
        const tmp1 = word[1];
        const tmp2 = word[2];
        word[0] = word[3]; word[1] = tmp; word[2] = tmp1; word[3] = tmp2;
        
    }
    return word;
}

// console.log(rotateLeft(state[2], 2)); //OK
function mixColumns(state) {
    const newState = [];
    for (let i = 0; i < 4; i++) {
        newState.push([]);
        for (let j = 0; j < 4; j++) {
            newState[i].push(0);
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                newState[i][j] ^= multiplyHex(mixColumnsMatrix[i][k], state[k][j]);
            }
        }
    }
    return newState;
}
//OK
function multiplyHex(a, b) {
    let result = 0;
    for (let i = 0; i < 8; i++) {
        if (b & 1) {
            result ^= a;
        }
        const carry = a & 0x80;
        a <<= 1;
        if (carry) {
            a ^= 0x1B;
        }
        b >>= 1;
    }
    return result;
}
// console.log(multiplyHex(0x57, 0x13).toString(16)); //OK
function addRoundKey(state, roundKey) {
    const newState = [];
    for (let i = 0; i < 4; i++) {
        newState.push([]);
        for (let j = 0; j < 4; j++) {
            newState[i].push(state[i][j] ^ roundKey[i][j]);
            
        }
    }
    return newState;
}

 //OK
function keyExpansion(key) {
    const roundKeys = [key];
    for (let i = 1; i <= 10; i++) {
        const prevRoundKey = roundKeys[i - 1];
        const newRoundKey = [];
        newRoundKey.push([]);
        for (let j = 0; j < 4; j++) {
            newRoundKey[0].push(prevRoundKey[3][j]);
        }
        newRoundKey[0] = rotateLeft(newRoundKey[0], 1);
        for (let j = 0; j < 4; j++) {
            newRoundKey[0][j] = sbox[newRoundKey[0][j] >> 4][newRoundKey[0][j] & 0xf];
            newRoundKey[0][j] ^= rcon[i] ^ prevRoundKey[0][j];
        }
        newRoundKey.push([]);
        for (let j = 0; j < 4; j++) {
            newRoundKey[1].push(prevRoundKey[0][j] ^ newRoundKey[0][j]);
        }
        newRoundKey.push([]);
        for (let j = 0; j < 4; j++) {
            newRoundKey[2].push(prevRoundKey[1][j] ^ newRoundKey[1][j]);
        }
        newRoundKey.push([]);
        for (let j = 0; j < 4; j++) {
            newRoundKey[3].push(prevRoundKey[2][j] ^ newRoundKey[2][j]);
        }
        roundKeys.push(newRoundKey);
    }
    return roundKeys;
}


 //OK

 function aesEncryptBlock(state, key) {
    const roundKeys = keyExpansion(key);
    console.log(state);
    let state2 = addRoundKey(state, roundKeys[0]);
    console.log(state2);
    for (let i = 1; i < 10; i++) {
        state2 = addRoundKey(mixColumns(shiftRows(subBytes(state2))), roundKeys[i]);
        // console.log(state2);
    }
    let stage12 = addRoundKey(shiftRows(subBytes(state2)), roundKeys[10]);
    // console.log(stage12);
    // console.log("------------------------------------------------------------------------");
    return stage12;
}
 //OK






function encrypt(){
    plaintext = plaintextField.value;
    keyText = TextkeyField.value;
    state = convertInput(plaintext);
    key = convertInput(keyText);
    let finalState = aesEncryptBlock(state, key);
    let output = convertOutput(finalState);
    document.getElementById("EncryptedValue").innerHTML = output;
    
    return finalState;
} //OK


//Decrypt

const invSbox = [  
        [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb],
        [0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb],
        [0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e],
        [0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25],
        [0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92],
        [0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84],
        [0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06],
        [0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b],
        [0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73],
        [0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e],
        [0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b],
        [0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4],
        [0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f],
        [0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef],
        [0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61],
        [0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d]
];

const invMixColumnsMatrix = [
    [0x0e, 0x0b, 0x0d, 0x09],
    [0x09, 0x0e, 0x0b, 0x0d],
    [0x0d, 0x09, 0x0e, 0x0b],
    [0x0b, 0x0d, 0x09, 0x0e]
];

function invSubBytes(state) {
    const newState = [];
    for (let i = 0; i < 4; i++) {
        newState.push([]);
        for (let j = 0; j < 4; j++) {
            const row = state[i][j] >> 4;
            const col = state[i][j] & 0xf;
            const safeRow = row % 16; // Ensure row index stays within bounds
            const safeCol = col % 16; // Ensure col index stays within bounds
            newState[i].push(invSbox[safeRow][safeCol]);
        }
    }
    return newState;
}
function invShiftRows(state) {
    const newState = [];
    for (let i = 0; i < 4; i++) {
        newState.push(rotateRight(state[i], i));
    }
    return newState;
}
function rotateRight(word, number) {
    if (number === 1) {
        // Rotate right by one position
        const tmp = word[3];
        word[3] = word[2]; word[2] = word[1]; word[1] = word[0]; word[0] = tmp;
    } else if (number === 2) {
        // Rotate right by two positions
        const tmp = word[3];
        const tmp1 = word[2];
        word[3] = word[1]; word[2] = word[0]; word[1] = tmp; word[0] = tmp1;
    } else if (number === 3) {
        // Rotate right by three positions
        const tmp = word[3];
        const tmp1 = word[2];
        const tmp2 = word[1];
        word[3] = word[0]; word[2] = tmp; word[1] = tmp1; word[0] = tmp2;
    }
    return word;
}
function invMixColumns(state) {
    const newState = [];
    for (let i = 0; i < 4; i++) {
        newState.push([]);
        for (let j = 0; j < 4; j++) {
            newState[i].push(0);
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                newState[i][j] ^= multiplyHex(invMixColumnsMatrix[i][k], state[k][j]);
            }
        }
    }
    return newState;
}


    

function aesDecryptBlock(state, key) {
    console.log("------------------------------------------------------------------------");
    console.log(state);
    const roundKeys = keyExpansion(key);
    let state2 = addRoundKey(state, roundKeys[10]);
    console.log(state2);
    for (let i = 9; i > 0; i--) {
        state2 = invMixColumns(addRoundKey(invSubBytes(invShiftRows(state2)), roundKeys[i]));
        console.log(state2);
    }
    let state12 = addRoundKey(invSubBytes(invShiftRows(state2)), roundKeys[0]);
    return state12;
}
// console.log(state);
state = aesEncryptBlock(state, key);
console.log(state);
console.log(aesDecryptBlock(state, key));

//OK
function decrypt(){
    plaintext = plaintextField.value;
    keyText = TextkeyField.value;
    state = convertInput(plaintext);
    console.log(state);
    key = convertInput(keyText);
    console.log(key);
    let finalState = aesDecryptBlock(state, key);
    let output = convertOutput(finalState);
    document.getElementById("DecryptedValue").innerHTML = output;
}
// console.log("------------------------------------------------------------------------");