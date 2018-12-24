/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { assert } from "chai";
import { DummyAuthenticationProvider } from '../DummyAuthenticationProvider';
import { Client } from "../../src/index";

const client = new Client({
    authProvider: new DummyAuthenticationProvider()
});

let testCases = {
    "/me": "https://graph.microsoft.com/v1.0/me",
    "/me/": "https://graph.microsoft.com/v1.0/me/",
    "me": "https://graph.microsoft.com/v1.0/me",
    "me/events": "https://graph.microsoft.com/v1.0/me/events",
    "/me/events": "https://graph.microsoft.com/v1.0/me/events",
    "https://graph.microsoft.com/v1.0/me/events": "https://graph.microsoft.com/v1.0/me/events",
    "https://graph.microsoft.com/beta/me/events?$filter=startswith(subject, 'update')": "https://graph.microsoft.com/beta/me/events?$filter=startswith(subject, 'update')",
    "me/events?$filter=startswith(subject, 'update')": "https://graph.microsoft.com/v1.0/me/events?$filter=startswith(subject, 'update')",
    "/me?a=b": "https://graph.microsoft.com/v1.0/me?a=b",
    "/me?$filter=b&c=d": "https://graph.microsoft.com/v1.0/me?$filter=b&c=d",
    "me?$filter=b&c=d": "https://graph.microsoft.com/v1.0/me?$filter=b&c=d",

    // oData params should work with and without $
    "me?$select=displayName": "https://graph.microsoft.com/v1.0/me?$select=displayName",
    "me?select=displayName": "https://graph.microsoft.com/v1.0/me?select=displayName",
    "https://graph.microsoft.com/beta/me?select=displayName": "https://graph.microsoft.com/beta/me?select=displayName"
}

describe("urlParsing.ts", function () {
    describe('parsePath', function () {
        for (let path in testCases) {
            it('should correctly parse ' + path, () => {
                var request = client.api(path);
                assert.equal(request["buildFullUrl"](), testCases[path]);
            });
        }
    });
});
