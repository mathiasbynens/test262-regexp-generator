// Copyright (C) 2018 Leo Balter.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: prod-CharacterClassEscape
description: >
    Compare range (Non whitespace class escape)
info: |
    This is a generated test
---*/

var re = /\S+/;

// Positive Values

// Negative Values
var negatives = ["\u9", "\uA", "\uB", "\uC", "\uD", "\u20", "\uA0", "\u1680", "\u2000", "\u2001", "\u2002", "\u2003", "\u2004", "\u2005", "\u2006", "\u2007", "\u2008", "\u2009", "\u200A", "\u2028", "\u2029", "\u202F", "\u205F", "\u3000", "\uFEFF"];

positives.forEach(function(index) {
    assert.sameValue(index.replace(re, 'test262'), 'test262', 'char should match /\\S+/');
});