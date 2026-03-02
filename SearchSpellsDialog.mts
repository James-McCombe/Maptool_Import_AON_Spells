[h: "UI only macro for AON spell search form (no processing yet)"]

[dialog5("Search AON Spells"): {
<html>
  <body style="font-family: Segoe UI, Tahoma, sans-serif; font-size: 13px; margin: 10px;">
    <form action="[r: macroLinkText('_SearchSpells@Lib:AON', 'gm', '', 'self')]" method="json">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="vertical-align: top; width: 50%; padding: 8px; border: 1px solid #c8c8c8; background: #f8f8f8;">
            <h3 style="margin: 0 0 8px 0;">Tradition</h3>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="tradition" value="all" checked /> All</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="tradition" value="arcane" /> Arcane</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="tradition" value="divine" /> Divine</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="tradition" value="occult" /> Occult</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="tradition" value="primal" /> Primal</label>
          </td>
          <td style="vertical-align: top; width: 50%; padding: 8px; border: 1px solid #c8c8c8; background: #f8f8f8;">
            <h3 style="margin: 0 0 8px 0;">Spell Level</h3>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="all" checked /> All</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="ritual" /> Rituals</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="0" /> Level 0</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="1" /> Level 1</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="2" /> Level 2</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="3" /> Level 3</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="4" /> Level 4</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="5" /> Level 5</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="6" /> Level 6</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="7" /> Level 7</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="8" /> Level 8</label>
            <label style="margin-right: 12px; white-space: nowrap;"><input type="radio" name="spellLevel" value="9" /> Level 9</label>
          </td>
        </tr>
      </table>

      <div style="margin-top: 12px;">
        <h3 style="margin: 0 0 8px 0;">Search Text</h3>
        <input type="text" name="searchText" value="" style="width: 100%; box-sizing: border-box; padding: 6px 8px;" />
      </div>

      <div style="margin-top: 12px;">
        <input type="submit" value="Search" />
      </div>
    </form>
  </body>
</html>
}]
