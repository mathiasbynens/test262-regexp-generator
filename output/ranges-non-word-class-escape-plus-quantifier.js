// Copyright (C) 2018 Leo Balter.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: prod-CharacterClassEscape
description: >
    Compare range (Non Word class escape)
info: |
    This is a generated test
---*/

var re = /\W+/;

// Positive Values

// Negative Values
var negatives = ["\u30", "\u31", "\u32", "\u33", "\u34", "\u35", "\u36", "\u37", "\u38", "\u39", "\u41", "\u42", "\u43", "\u44", "\u45", "\u46", "\u47", "\u48", "\u49", "\u4A", "\u4B", "\u4C", "\u4D", "\u4E", "\u4F", "\u50", "\u51", "\u52", "\u53", "\u54", "\u55", "\u56", "\u57", "\u58", "\u59", "\u5A", "\u5F", "\u61", "\u62", "\u63", "\u64", "\u65", "\u66", "\u67", "\u68", "\u69", "\u6A", "\u6B", "\u6C", "\u6D", "\u6E", "\u6F", "\u70", "\u71", "\u72", "\u73", "\u74", "\u75", "\u76", "\u77", "\u78", "\u79", "\u7A"];

positives.forEach(function(index) {
    assert.sameValue(index.replace(re, 'test262'), 'test262', 'char should match /\\W+/');
});