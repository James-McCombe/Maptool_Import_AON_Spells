[h: "UI macro: opens dialog and calls worker macro with JSON args"]

[dialog5("Spell Search Setup"): {
<html>
  <body>
    <form action="[r: macroLinkText('_UpdateSpellLists@Lib:AON', 'none', '', 'self')]" method="json">
      <label>
        <input type="checkbox" name="remasterOnly" value="1" />
        Remaster only (release_date > 2023-11-01)
      </label>
      <br/><br/>
      <input type="submit" value="Search" />
    </form>
  </body>
</html>
}]