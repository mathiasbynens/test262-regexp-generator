const fs = require('fs');
const rewritePattern = require('regexpu-core');
const slugify = require('slugify');
const filenamify = require('filenamify');
const jsesc = require('jsesc');
const header = require('./header');

const patterns = {
    'Non whitespace class escape': '\\S',
    'Whitespace class escape': '\\s',
    'Word class escape': '\\w',
    'Non Word class escape': '\\W',
};

function buildContent(desc, reStr, positives, negatives) {
    const content = [
        header('prod-CharacterClassEscape', `Compare range (${desc})`),
        `var re = ${reStr};`,
        ...positives.map(index => `assert.sameValue('${index}'.replace(re, 'test262'), 'test262', '${jsesc(index)} should match ${jsesc(reStr)}');`),
        ...negatives.map(index => `assert.sameValue('${index}'.replace(re, 'test262'), '${index}', '${jsesc(index)} should not match ${jsesc(reStr)}');`),
    ];

    return content.join('\n');
}

function writeFile(desc, content, suffix = '') {
    const filename = `output/ranges-${slugify(filenamify(desc.toLowerCase()))}${suffix}.js`;
    fs.writeFileSync(filename, content);
}

function checkRanges(max, pattern, flags = '', cb) {
    const ranges = new RegExp(rewritePattern(pattern), flags);

    for (let i = 0; i <= max; i++) {
        let unicode = jsesc(i, { numbers: 'hexadecimal' }).replace('0x', '');

        while (unicode.length < 4) {
            unicode = `0${unicode}`;
        }

        unicode = `\\u${unicode}`;

        const test = ranges.test(String.fromCodePoint(i));
        cb(test, unicode);
    }
}

// No additions
for (const [desc, escape] of Object.entries(patterns)) {
    { // Basic
        const pattern = escape;
        const reStr = `/${pattern}/`;
        const flags = '';

        const positives = [];
        const negatives = [];

        checkRanges(0xFFFF, pattern, flags, (test, unicode) => {
            if (test) {
                positives.push(unicode);
            } else {
                negatives.push(unicode);
            }
        });

        const content = buildContent(desc, reStr, positives, negatives);

        writeFile(desc, content);
    }

    { // + quantifier
        const pattern = `${escape}+`;
        const reStr = `/${pattern}/`;
        const flags = '';

        const positives = [];
        const negatives = [];

        checkRanges(0xFFFF, pattern, flags, (test, unicode) => {
            if (test) {
                positives.push(unicode);
                positives.push(unicode + unicode);
            } else {
                negatives.push(unicode);
            }
        });

        const content = buildContent(desc, reStr, positives, negatives);

        writeFile(desc, content, '-plus-quantifier');
    }

    { // + quantifier and g flag
        const pattern = `${escape}+`;
        const flags = 'g';
        const reStr = `/${pattern}/${flags}`;

        const positives = [];
        const negatives = [];

        checkRanges(0xFFFF, pattern, flags, (test, unicode) => {
            if (test) {
                positives.push(unicode);
                positives.push(unicode + unicode);
            } else {
                negatives.push(unicode);
            }
        });

        const content = buildContent(desc, reStr, positives, negatives);

        writeFile(desc, content, '-plus-quantifier-flags-g');
    }
}
