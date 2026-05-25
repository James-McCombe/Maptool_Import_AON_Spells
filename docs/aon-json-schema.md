# AON JSON Storage Shape

Store this in token property AON_JSON.

Store the raw AoN source object in token property AON_JSON_RAW.

Example:

{
  "Metadata": {
    "SourceID": "Creature-3046",
    "AONID": "3046",
    "Type": "Creature",
    "Source": "AoN",
    "URL": "https://2e.aonprd.com/Monsters.aspx?ID=3046",
    "ImporterVersion": "1.00",
    "ImportDate": "value from getInfo(\"client\") timeDate"
  },
  "Parsed": {}
}

Parsed may be empty on day one.
