[h: 'This macro will update a token with a statblock from Archives of Nethys']
[h: ids = getSelected()]
[h: assert(json.length(ids) > 0, "Select at least one token.", 0)]

[h: status = input("spellID|1439|Enter URL|TEXT|WIDTH=60")]
[h: abort(status)]

[h: url = 'https://elasticsearch.aonprd.com/json-data/aon73-index.json']
[h: htmlIndex = REST.get(url, '{"Accept": ["text/html"], "Accept-Encoding": [""]}', 0)]

