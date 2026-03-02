[h: "UI macro: opens dialog and calls worker macro with JSON args"]
[h: lastUpdate = getProperty("AON-Spell-Last_Update")]
[h: lastUpdate = if(lastUpdate == "", "Never", lastUpdate)]

[dialog5("Spell Search Setup"): {
<html>
  <body>
    <form action="[r: macroLinkText('_AddSpellsToLibrary@Lib:AON', 'gm', '', 'self')]" method="json">
      <label>
        <input type="checkbox" name="forceSpellUpdate" value="1" />
        Force Spell Update (Last Updated: [r: lastUpdate])
      </label>
      <input type="hidden" id="runTimestamp" name="runTimestamp" value="" />
      <br/><br/>
      <input type="submit" value="Update Spell Library" />
    </form>
    <script>
      document.getElementById("runTimestamp").value = new Date().toISOString();
    </script>    
  </body>
</html>
}]
