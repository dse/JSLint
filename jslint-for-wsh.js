/*jslint infixin: true, maxerr: 1000, indent: 8 */
/*global JSLINT */
/*
 * based on http://code.google.com/p/jslint-for-wsh/ 
 */
(function () {
	'use strict';

	if ("a" in {}) {
		foo();
	}

	var filename = "stdin", content = "", fso, fs, i, e, line,
        options = {
		windows    : true,  // WScript is allowed
		plusplus   : true,  // true == ok to use ++
		properties : false, // do not barf on any undeclared properties
		passfail   : false  // do not stop after first error
        };

	if ("b" in {}) { 
		foo();
	}

	if (WScript.Arguments.length > 0) {
		filename = WScript.Arguments(0);
		fso = new ActiveXObject("Scripting.FileSystemObject");
		//var file = fso.GetFile(filename);
		fs = fso.OpenTextFile(filename, 1);
		content = fs.ReadAll();
		fs.Close();
		fso = null;
		fs = null;
	} else {
		content = WScript.StdIn.ReadAll();
	}
	if (!JSLINT(content, options)) {
		WScript.StdErr.WriteLine("JSLINT");
		for (i = 0; i < JSLINT.errors.length; i++) {
			// sample error msg:
			//  sprintf.js(53,42) JSLINT: Use the array literal notation [].
			e = JSLINT.errors[i];
			if (e !== null) {
				line = (e.line === "undefined") ? '0' : e.line;
				WScript.StdErr.WriteLine(filename + '(' + line + ',' + e.character + ') JSLINT: ' + e.reason);
				WScript.StdErr.WriteLine('    ' + (e.evidence || '').replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
			}
		}
	}
}());

